const readline = require('readline').createInterface({ input: process.stdin }),
fs = require('fs'),
s = JSON.parse(fs.readFileSync('./state-standalone.json', 'utf8')),
data = JSON.parse(fs.readFileSync('./data.json', 'utf8')),
Colors = require('colors'),
SteamUser = require('steam-user'),
SteamSession = require('steam-session').LoginSession,
SteamCommunity = require('steamcommunity'),
SteamTradeOfferManager = require('steam-tradeoffer-manager'),
A = [],
pad = (i, zeros = "00") => (zeros + i).substr(-zeros.length, zeros.length),
console_log = (output, date = new Date()) =>
  console.log((('[' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds()) + '] ').magenta + output).replace(
    'SUCCESS', 'SUCCESS'.green.bold.reset).replace(
    'FAILURE', 'FAILURE'.red.bold.reset).replace(
    'MESSAGE', 'MESSAGE'.cyan.bold.reset).replace(
    'SESSION', 'SESSION'.blue.bold.reset))
log = (a, output) => console_log(output.replace('|', '|' + (a.index == 0 ? pad(a.index, "000").gray.inverse : pad(a.index, "000").gray) + '|')),
profile_url = (a) => (a.user.vanityURL ? 'id/' + a.user.vanityURL : 'profiles/' + a.steamID),
http = (a, endpoint, form = null, callback = null, force = false, method = (form != null ? 'POST' : 'GET')) => (
  (form != null && typeof form !== 'string') && (
    form.sessionID = a.community.getSessionID(),
    form.sessionid = a.community.getSessionID()),
  a.community.httpRequest({
    "uri": (endpoint.indexOf('http') == -1 ? 'https://steamcommunity.com/' + endpoint : endpoint).replace("/my/", "/" + profile_url(a) + "/"),
    "method": method,
    "form": (typeof form == 'string' ? 'sessionID=' + a.community.getSessionID() + form : form),
    "json": true,
    "encoding": (endpoint.slice(-4) == '.jpg' ? null : 'utf8')
  }, (err, response, body,
    success = false,
    response_code = (!response ? '999' : response.statusCode.toString()),
    result = endpoint + ": " + (method + '-' + response_code).yellow) => (
    (err && err.message == 'Malformed JSON response') ?
      err = 0 : null,
    (!response) ?
      result = "FAILURE | " + result + '=NO RESPONSE'.yellow
    : (!body && response_code != '302' && response_code != '200') ? (
      result = "FAILURE | " + result + "=NO BODY".yellow, 
      body = { success: 0 })
    : (err) ? (
      result = "FAILURE | " + result + (" # " + err.message).yellow, 
      (err.message == 'Not Logged In' || response_code == '401') &&
        a.user.webLogOn())
    : (body && typeof body.success != 'undefined' && body.success != 1) ?
      ((error = (body.error) ? body.error.replace(/ /g, '').substr(0,30) : SteamCommunity.EResult[body.success]) => (
        (!body.errmsg) && (
          body.errmsg = 'ERR'),
        result = "FAILURE | " + result + ("=" + error + "-" + body.errmsg.replace("  Please try again later.<br />", "")).yellow,
        (error == 'NotLoggedOn') &&
          a.user.webLogOn()))()
    : ((body && body.toString().indexOf("g_steamID = false;") > -1) || response_code == '401' > -1) ? (
      result = "FAILURE | " + result + "=SteamIDIsFalse/401".yellow,
      a.user.webLogOn())
    : (success = true,
      result = "SUCCESS | " + result),
    (!success || s.verbose) &&
      log(a, result.replace('POST-', 'POST'.inverse + '-')),
    (callback !== null && (success || force)) &&
      callback(body, response, err)))),
discover = (a, first = false) =>
  http(a, 'https://store.steampowered.com/explore/generatenewdiscoveryqueue', { "queuetype": 0 }, (body, reponse, error) =>
    body.queue.forEach((appid, j) =>
      http(a, 'https://store.steampowered.com/app/10', { "appid_to_clear_from_queue": appid }, () =>
        (j == body.queue.length-1 && first) && discover(a), true))),
logon = async (a) =>
  (!s.A[a.index].hasOwnProperty('refreshToken')) ? (
    a.session_result = await a.session.startWithCredentials({accountName: a.name,	password: s.A[a.index].pass,	steamGuardMachineToken: '' }),
    (a.session_result.actionRequired) && 
      (a.index == 0) ?
        log(a, 'SESSION | confirm authentication... {*}')
      : (a.index == 96) ? (
        log(a, 'SESSION | input guard code... {*}'), 
        readline.question('guard code:?', async (code) =>
          await a.session.submitSteamGuardCode(code)))
      :(log(a, 'SESSION | checking email... {*}'),
        setTimeout(async (a) =>
          get_gmail(a, async (err, gmails) => 
            await a.session.submitSteamGuardCode(search_gmail(gmails, /[A-Z0-9]{5}/, '\r\n'))), 6666, a)))
  : a.user.logOn({ "refreshToken": s.A[a.index].refreshToken }),
start_sale_bot = (i, max_index = i) => (
  A[i] = { session: new SteamSession(1), community: new SteamCommunity(), name: s.A[i].name, pass: s.A[i].pass, mail: s.A[i].mail, steamID: s.A[i].steamID, index: i, limited: false },
  A[i].user = new SteamUser({ "dataDirectory": null, "autoRelogin": false }),
  A[i].tradeOfferManager = new SteamTradeOfferManager({ "steam": A[i].user, "community": A[i].community, "dataDirectory": null, "domain": "primarydataloop", "language": "en" }),
  A[i].user.on('error', (err) => (
    log(A[i], 'FAILURE | error: ' + err.message.yellow),
    (err.message == 'LogonSessionReplaced') &&
      logon(A[i], 5000))),
  A[i].user.on('loggedOn', (details, parental) => log(A[i], 'SESSION | loggedOn: ' + ("https://steamcommunity.com/" + profile_url(A[i]) + " #" + i).trim().yellow)),
  A[i].session.on('authenticated', () => (
    s.A[i].refreshToken = A[i].session.refreshToken,
    logon(A[i]))),
  A[i].session.on('timeout', () => log(A[i], 'SESSION: authenticate timeout')),
  A[i].session.on('error', (err) => log(A[i], 'SESSION: authenticate fail ' + err.message.yellow)),  
  A[i].user.on('newItems', (count) => log(A[i], "SESSION | newItems: " + count)),
  A[i].user.on('accountLimitations', (limited, communityBanned, locked, canInviteFriends) =>
    (limited || communityBanned || locked) &&
      log(A[i], "FAILURE | accountLimitations: " + limited + "|" + communityBanned + "|" + locked + "|" + canInviteFriends)),
  A[i].user.on('friendRelationship', (f, relationship, previousRelationship) => (
    log(A[i], 'SESSION | friendRelationship: ' + (SteamUser.EFriendRelationship[relationship].toUpperCase().inverse + " = https://steamcommunity.com/profiles/" + f).yellow),
    (relationship == 2) &&
      A[i].user.addFriend(f))),
  A[i].user.once('webSession', (sessionID, cookies) => (
    A[i].tradeOfferManager.setCookies(cookies),
    A[i].community.setCookies(cookies),
    (!s.trading) ? (
      discover(A[i], true)
    : (i != 96) && (
      A[i].user.setPersona(1),
      trade(A[i], A[96])))),
  (!A[i].user.steamID) &&
    logon(A[i]),
  setTimeout(() => (
    (i != 96) &&
      A[i].user.logOff(),
    (i < max_index) && 
      start_sale_bot(i+1, max_index)), 20000))),
console.log('start_sale_bot(96);');
console.log('start_sale_bot(133);\nstart_sale_bot(1,96);\n\nstart_sale_bot(101,120);\nstart_sale_bot(201,232);');
base64 = (data) => new Buffer(data).toString('base64'),
google = require('googleapis').google,
google_auth = new google.auth.OAuth2(s.google_secret.installed.client_id, s.google_secret.installed.client_secret, s.google_secret.installed.redirect_uris[0]),
google_auth.setCredentials(s.google_token),
googleAPIsGmail = google.gmail({ version: 'v1', google_auth }),
base64toUTF8 = (str) => Buffer.from(str, 'base64').toString('utf8'),
get_gmail = (a, callback, maxResults = 10, q = 'from:noreply@steampowered.com') =>
  googleAPIsGmail.users.messages.list({ auth: google_auth, userId: 'me', maxResults: maxResults, q: q + ",to:" + a.mail }, (err, response, gmails = []) => (
    (err || !response.data.messages) ? (
      log(a, 'FAILURE | gmail error: ' + (err ? err : 'no gmail data').yellow),
      callback(true, []))
    :(read_message = (m = 0) =>
      (m == response.data.messages.length) ?
        callback(false, gmails)
      : googleAPIsGmail.users.messages.get({
        auth: google_auth, userId: 'me', id: response.data.messages[m].id
      }, (err, response, body) => (
        response.data.payload.parts.forEach((part) =>
          (body += base64toUTF8(part.body.data))),
        gmails.push(body),
        read_message(m+1))))()));
search_gmail = (gmails, start, end) => {
  for (var i = 0; i < gmails.length; i++) {
    var start_index = gmails[i].search(start);
    if (start_index > -1) {
      return gmails[i].slice(start_index, gmails[i].indexOf(end, start_index));
    }
  }
  return false;
};
inventories = [ [ 753,6 ],[ 440,2 ] ],
trade = (a, receiver = A[96], sending = [], i = 0) =>
  a.trade.getInventoryContents(inventories[i][0], inventories[i][1], true, (err, inventory) => (
    (err) ?
      log(a, "FAILURE | getInventoryContents: " + ("id=" + inventories[i] + ",error=" + err).yellow)
    : (i < inventories.length-1) ?
      trade(a, receiver, sending.concat(inventory), i+1)
    : (!sending.length && !inventory.length) ?
      log(a, "SESSION | trade: " + "no items")
    : ((offer = a.trade.createOffer("https://steamcommunity.com/tradeoffer/new/?partner=16471780&token=6MrQi4mC")) => (
        offer.addMyItems(sending.concat(inventory.filter((item) => {
          var send = true;
          item.tags.forEach((tag) =>
            (tag.name == 'Profile Background' || tag.name == 'Emoticon') && (
              send = false));
          return send;
        }))),
        offer.send((err, status) =>
          (err) ?
            log(a, "FAILURE | offer.send: " + ("error=" + err).yellow)
          : (status != 'pending') ?
            log(a, "SESSION | offer.send: " + ("complete=" + status).yellow)
          : a.c.acceptConfirmationForObject("identitySecret", offer.id, (err) =>
            (get_gmail_confirmation = (attempt = 0) =>
              setTimeout(() =>
                get_gmail(a, (err, gmails, link = search_gmail(gmails, /(https:\/\/steamcommunity.com\/tradeoffer\/[0-9]+\/confirm\?accountid)/, '"')) => (
                  (link.length <= 1 || !link) ?
                    (attempt == 8) ?
                      log(a, "FAILURE | get_gmail: " + ("noLink=" + offer.id).yellow)
                    : get_gmail_confirmation(attempt+1)
                  : http(a, link.replace(/&amp;/g, '&'), {}, (body, response, error) =>
                    (!body.indexOf('has been confirmed')) ?
                      log(a, "FAILURE | http: " + ("noConfirm=" + link.substr(119,20) + "|" + offer.id).yellow)
                    : receiver.trade.getOffer(offer.id, (err, offer) =>
                        (err) ?
                          log(a, "FAILURE | getOffer: " + ("error=" + err).yellow)
                        : offer.getUserDetails((err, me, them) =>
                            offer.accept(false, (err, status) =>
                              log(a, "SUCCESS | offer.accept: " + status + "=" + me.escrowDays + "/" + them.escrowDays + "_days"))))))), 5000))()))))()));
quit = () => (
  quit = () => void 0,
  fs.writeFileSync('./state-standalone.json', JSON.stringify(s, null, 2)),
  process.exit());
process.on('SIGINT', (code) => quit());
const repl = require('repl');
repl.start().on('exit', () => quit());
