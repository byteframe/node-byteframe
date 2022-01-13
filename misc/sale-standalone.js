Colors = require('colors'),
SteamUser = require('steam-user'),
SteamCommunity = require('steamcommunity'),
SteamTradeOfferManager = require('steam-tradeoffer-manager'),
Crypto = require('crypto'),
accounts = [],
fs = require('fs'),
state = JSON.parse(fs.readFileSync('./state-standalone.json', 'utf8')),
pad = (i, zeros = "00") =>
  (zeros + i).substr(-zeros.length, zeros.length),
console_log = (output, date = new Date()) =>
  console.log((('[' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds()) + '] ').magenta + output).replace(
    'SUCCESS', 'SUCCESS'.green.bold.reset).replace(
    'FAILURE', 'FAILURE'.red.bold.reset).replace(
    'MESSAGE', 'MESSAGE'.cyan.bold.reset).replace(
    'SESSION', 'SESSION'.blue.bold.reset))
log = (account, output) =>
  console_log(output.replace('|', '|' + (account.index == 0 ? pad(account.index, "000").gray.inverse : pad(account.index, "000").gray) + '|')),
profile_url = (account) =>
  (account.user.vanityURL ? 'id/' + account.user.vanityURL : 'profiles/' + account.steamID),
http_request = (account, endpoint, form = null, callback = null, force = false, method = (form != null ? 'POST' : 'GET'), retries = 0) => (
  (form != null && typeof form !== 'string') && (
    form.sessionID = account.community.getSessionID(),
    form.sessionid = account.community.getSessionID()),
  account.community.httpRequest({
    "uri": (endpoint.indexOf('http') == -1 ? 'https://steamcommunity.com/' + endpoint : endpoint).replace("/my/", "/" + profile_url(account) + "/"),
    "method": method,
    "form": (typeof form == 'string' ? 'sessionID=' + account.community.getSessionID() + form : form),
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
        account.user.webLogOn())
    : (body && typeof body.success != 'undefined' && body.success != 1) ?
      ((error = (body.error) ? body.error.replace(/ /g, '').substr(0,30) : SteamCommunity.EResult[body.success]) => (
        (!body.errmsg) && (
          body.errmsg = 'ERR'),
        result = "FAILURE | " + result + ("=" + error + "-" + body.errmsg.replace("  Please try again later.<br />", "")).yellow,
        (error == 'NotLoggedOn') &&
          account.user.webLogOn()))()
    : ((body && body.toString().indexOf("g_steamID = false;") > -1) || response_code == '401' > -1) ? (
      result = "FAILURE | " + result + "=SteamIDIsFalse/401".yellow,
      account.user.webLogOn())
    : (success = true,
      result = "SUCCESS | " + result),
    (!success || state.verbose) &&
      log(account, result.replace('POST-', 'POST'.inverse + '-')),
    (callback !== null && (success || force)) &&
      callback(body, response, err))))
login = (account, delay = 0) =>
  (!account.user.steamID) &&
    setTimeout((login_details = { "rememberPassword": (account.index == 0 || account.index == 96 ? true : false), "accountName": account.name }) => (
      (state.accounts[account.index].key && login_details.rememberPassword == true) ?
        login_details.loginKey = state.accounts[account.index].key
      : login_details.password = state.accounts[account.index].pass,
      account.user.logOn(login_details)), delay),
discover = (account, first = false) =>
  http_request(account, 'https://store.steampowered.com/explore/generatenewdiscoveryqueue', { "queuetype": 0 }, (body, reponse, error) => (
    body.queue.forEach((appid, j) =>
      http_request(account, 'https://store.steampowered.com/app/10', { "appid_to_clear_from_queue": appid }, (XXX) =>
        (j == body.queue.length-1 && first) && discover(account), true)))),
start_sale_bot = (i, max_index = i) => (
  accounts[i] = { community: new SteamCommunity(), name: state.accounts[i].name, pass: state.accounts[i].pass, mail: state.accounts[i].mail, steamID: state.accounts[i].steamID, index: i, limited: false },
  accounts[i].user = new SteamUser({ "dataDirectory": null, "autoRelogin": false }),
  accounts[i].user.setSentry(Crypto.createHash('sha1').update(fs.readFileSync('share/' + accounts[i].name + '-ssfn')).digest()),
  accounts[i].tradeOfferManager = new SteamTradeOfferManager({ "steam": accounts[i].user, "community": accounts[i].community, "dataDirectory": null, "domain": "primarydataloop", "language": "en" }),
  accounts[i].user.once('loginKey', (key) => state.accounts[accounts[i].index].key = key),
  accounts[i].user.on('newItems', (count) => log(accounts[i], "SESSION | newItems: " + count)),
  accounts[i].user.on('accountLimitations', (limited, communityBanned, locked, canInviteFriends) =>
    (limited || communityBanned || locked) &&
      log(accounts[i], "FAILURE | accountLimitations: " + limited + "|" + communityBanned + "|" + locked + "|" + canInviteFriends)),
  accounts[i].user.once('webSession', (sessionID, cookies) => (
    accounts[i].tradeOfferManager.setCookies(cookies),
    accounts[i].community.setCookies(cookies),
    (!trading) ?
      http_request(accounts[i], 'https://store.steampowered.com/points/shop', {}, (body, response, error) =>
        http_request(accounts[i], 'https://api.steampowered.com/ISaleItemRewardsService/ClaimItem/v1?access_token=' + body.match(/webapi_token\&quot\;\:\&quot\;.*?\&quot\;/)[0].slice(25, -6), {}, (body, response, error) =>
          discover(accounts[i], true)))
    : (i != 96) &&
      run_trade_offer(accounts[i], accounts[96]))),
  login(accounts[i]),
  setTimeout(() =>
    (i < max_index) ? (
      (i != 96) &&
        accounts[i].user.logOff(),
      start_sale_bot(i+1, max_index))
    : console_log('MESSAGE | start_sale_bot finished'), 15000));
start_sale_bot(96);
console.log('start_sale_bot(133);');
console.log('start_sale_bot(1,95);');
console.log('start_sale_bot(101,120);');
console.log('start_sale_bot(201,232);');
trading = true;
base64 = (data) =>
  new Buffer(data).toString('base64'),
google = require('googleapis').google,
google_auth = new google.auth.OAuth2(state.google_secret.installed.client_id, state.google_secret.installed.client_secret, state.google_secret.installed.redirect_uris[0]),
google_auth.setCredentials(state.google_token),
googleAPIsGmail = google.gmail({ version: 'v1', google_auth }),
base64toUTF8 = (str) =>
  Buffer.from(str, 'base64').toString('utf8'),
get_gmail = (account, callback, maxResults = 10, q = 'from:noreply@steampowered.com') =>
  googleAPIsGmail.users.messages.list({ auth: google_auth, userId: 'me', maxResults: maxResults, q: q + ",to:" + account.mail },(err, response, gmails = []) => (
    (err || !response.data.messages) ? (
      log(state.accounts[0], 'FAILURE | gmail error: ' + (err ? err : 'no gmail data').yellow),
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
    var start_index = gmails[i].indexOf(start);
    if (start_index > -1) {
      return gmails[i].slice(start_index, gmails[i].indexOf(end, start_index));
    }
  }
  return false;
};
inventories = [ [ 440,2 ],[ 753,6 ] ],
run_trade_offer = (account, receiver, sending = [], i = 0) =>
  account.tradeOfferManager.getInventoryContents(inventories[i][0], inventories[i][1], true, (err, inventory) => (
    (err) &&
      log(account, "FAILURE | getInventoryContents: " + ("id=" + inventories[i] + ",error=" + err).yellow),
    (i < inventories.length-1) ?
      run_trade_offer(account, receiver, sending.concat(inventory), i+1)
    : (!sending.length && !inventory.length) ?
      log(account, "SESSION | run_trade_offer: " + "no items")
    : ((offer = account.tradeOfferManager.createOffer("https://steamcommunity.com/tradeoffer/new/?partner=16471780&token=6MrQi4mC")) => (
        offer.addMyItems(sending.concat(inventory.filter((item) => {
          var send = true;
          item.tags.forEach((tag) =>
            (tag.name == 'Profile Background' || tag.name == 'Emoticon') && (
              send = false));
          return send;
        }))),
      offer.send((err, status) =>
        (err) ?
          log(account, "FAILURE | offer.send: " + ("error=" + err).yellow)
        : (status != 'pending') ?
          log(account, "SESSION | offer.send: " + ("complete=" + status).yellow)
        : account.community.acceptConfirmationForObject("identitySecret", offer.id, (err) =>
          (get_gmail_confirmation = (attempt = 0) =>
            get_gmail(mail, (err, gmails, link = search_gmail(gmails, "https://steamcommunity.com/tradeoffer/" + offer.id + "/confirm?accountid=", '"')) => (
              (link.length <= 1 || !link) ?
                (attempt == 8) ?
                  log(account, "FAILURE | get_gmail: " + ("noLink=" + offer.id).yellow)
                : setTimeout(() => get_gmail_confirmation(attempt+1), 1500)
              : http_request(account, link.replace(/&amp;/g, '&'), {}, (body, response, error) =>
                (!body.indexOf('has been confirmed')) ?
                  log(account, "FAILURE | http_request: " + ("noConfirm=" + link.substr(119,20) + "|" + offer.id).yellow)
                : receiver.tradeOfferManager.getOffer(offer.id, (err, offer) =>
                    (err) ?
                      log(account, "FAILURE | getOffer: " + ("error=" + err).yellow)
                    : offer.getUserDetails((err, me, them) =>
                        offer.accept(false, (err, status) =>
                          log(account, "SUCCESS | offer.accept: " + status + "=" + me.escrowDays + "/" + them.escrowDays + "_days"))))))))()))))()));
const repl = require('repl');
repl.start().on('exit', () => (
  fs.writeFileSync('./state-standalone.json', JSON.stringify(state, null, 2)),
  process.exit()));