//------------------------------------------------------------------------------ old login
Crypto = require('crypto'),
  (fs.existsSync('share/' + account.name + '-ssfn')) ?
    account.user.setSentry(Crypto.createHash('sha1').update(fs.readFileSync('share/' + account.name + '-ssfn')).digest())
  : (fs.existsSync('share/ssfn')) &&
    account.user.setSentry(Crypto.createHash('sha1').update(fs.readFileSync('share/ssfn')).digest()),
  account.user.on('sentry', (sentry) =>
    fs.writeFileSync('share/' + account.name + '-ssfn', sentry)),
login = (account, delay = 0) =>
  (!account.user.steamID) &&
    setTimeout((login_details = { "rememberPassword": (account.index == 0 || account.index == 96 ? true : false), "accountName": account.name }) => (
      (state.accounts[account.index].key && login_details.rememberPassword == true) ?
        login_details.loginKey = state.accounts[account.index].key
      : login_details.password = state.accounts[account.index].pass,
      account.user.logOn(login_details)), delay),
login(accounts[0]),
(accounts.length > 1) &&
  login(accounts[(state.account_index+1 == accounts.length ? 1 : state.account_index+1)]),
//------------------------------------------------------------------------------ old get access token
setTimeout((account) =>
  http_request(account, 'https://store.steampowered.com/points/shop', {}, (body, response, error) =>
    account.access_token = body.match(/webapi_token\&quot\;\:\&quot\;.*?\&quot\;/)[0].slice(25, -6)), 5000, account))),
//------------------------------------------------------------------------------ state-standalone-clean
state.accounts.forEach(account => delete account.backgrounds)
state.accounts.forEach(account => delete account.replies)
state.accounts.forEach(account => delete account.day)
state.accounts.forEach(account => delete account.last_steamid)
state.accounts.forEach(account => delete account.replies)
state.accounts.forEach(account => delete account.subscriptions)
state.accounts.forEach(account => delete account.wishlist_blacklist)
state.accounts.forEach(account => delete account.friends_diff)
state.accounts.forEach(account => delete account.last_friends)
state.accounts.forEach(account => delete account.post_free)
//------------------------------------------------------------------------------ Gmail
base64 = (data) =>
  new Buffer(data).toString('base64'),
google = require('googleapis').google,
google_auth = new google.auth.OAuth2(state.google_secret.installed.client_id, state.google_secret.installed.client_secret, state.google_secret.installed.redirect_uris[0]),
google_auth.setCredentials(state.google_token),
googleAPIsGmail = google.gmail({ version: 'v1', google_auth }),
base64toUTF8 = (str) =>
  Buffer.from(str, 'base64').toString('utf8'),
get_gmail = (account, callback, maxResults = 10, q = 'from:noreply@steampowered.com') =>
  googleAPIsGmail.users.messages.list({ auth: google_auth, userId: 'me', maxResults: maxResults, q: q + ",to:" + account.mail },(err, response, gmails = []) =>
    (err || !response.data.messages) ? (
      log(accounts[0], 'FAILURE | gmail error: ' + (err ? err : 'no gmail data').yellow),
      callback(true, []))
    :(read_message = (m = 0) =>
      (m == response.data.messages.length) ?
        callback(false, gmails)
      : googleAPIsGmail.users.messages.get({
        auth: google_auth, userId: 'me', id: response.data.messages[m].id
      }, (err, response, body = '') => (
        response.data.payload.parts.forEach((part) => body += base64toUTF8(part.body.data)),
        gmails.push(body),
        read_message(m+1))))())
//------------------------------------------------------------------------------ NewGmailSearch
search_gmail = (gmails, regex, match = gmails.join('\n').match(regex)) =>
  match && match[0] || '';
//------------------------------------------------------------------------------ GetGmailGuard
(account.index != 0) ?
  account.user.on('steamGuard', (domain, callback) =>
    (get_gmail_guard = (retries = 0) =>
      (retries < 3) &&
        setTimeout(() => get_gmail(account, (err, gmails, code) =>
          (code = search_gmail(gmails, /\r\n\r\n[A-Z0-9]{5}/).trim()) ? (
            account.auth_code = code,
            callback(code))
          : get_gmail_guard(retries+1)), 3000))())
//------------------------------------------------------------------------------ GetA
a = (a) =>
  accounts.find((account) => account.index == a),
//------------------------------------------------------------------------------ OldTimer
old_timer = (a = (state.account_index = (state.account_index+1 == accounts.length ? 1 : state.account_index+1))) => (
  save_state_files(),
  login(accounts[0]),
  login(accounts[(a < accounts.length-1 ? a+1 : 1)]),
  randomize_profile(accounts[0], profile, () => (
    prep_randomize_profile(accounts[0], profile),
    friends_check(accounts[0]),
    (accounts[0].comment_check > -1) && (
      http_request(accounts[0], 'my/commentnotifications', { action: 'markallread' }, (body, response, err) =>
        accounts[0].comment_check = -1),
      (accounts[0].comment_check > 0) &&
        http_request(accounts[0], 'my/allcomments', null, (_body, response, err, body = Cheerio.load(_body), players = {},
          count = +_body.match(/total_count\":[0-9]*/)[0].substr(13)) =>
          (count > 49666) && (
            body('.commentthread_comment').each((i, element, cid = element.attribs['id'].substr(8),
              steamid = translate_id(body('#comment_' + cid + " a")[0].attribs['data-miniprofile']),
              contents = body("#comment_content_" + cid).contents().toString().trim()) =>
              (!players.hasOwnProperty(steamid)) ?
                players[steamid] = [ contents ]
              : (players[steamid].indexOf(contents) == -1) ?
                players[steamid].push(contents)
              : (state.comments.indexOf(cid) == -1) &&
                state.comments.unshift(cid)),
            (state.comments.length > 0) &&
              [...Array(count-49666).keys()].forEach((item, index) =>
                http_request(accounts[0], 'comment/Profile/delete/76561197961017729/-1/', { count: 6, feature2: -1, gidcomment: state.comments.shift() }))))),
    (typeof free_game !== 'undefined' && accounts[a].free_games.indexOf(free_game) == -1) &&
      http_request(accounts[a], 'https://store.steampowered.com/checkout/addfreelicense/' + free_game, { ajax: true }, (body) =>
        accounts[a].free_games.push(free_game)),
    accounts[a].user.setPersona(SteamUser.EPersonaState.Snooze),
    (!accounts[a].limited && state.adds.length) &&
      accounts[a].user.addFriend(state.adds.shift()),
    Object.keys(accounts[a].user.myFriends).forEach((friend) =>
      (accounts[a].user.myFriends[friend] == 2 && state.steamid_blacklist.indexOf(friend) == -1) ?
        accounts[a].user.addFriend(friend)
      : (accounts[a].user.myFriends[friend] == 3 && state.steamid_blacklist.indexOf(friend) > -1 && friend != accounts[0].steamID) &&
        accounts[a].user.removeFriend(friend)),
    (!accounts[a].limited && (accounts[a].badges && accounts[a].badges.length > 0 || a % 3)) &&
      randomize_profile(accounts[a], replicant_profile),
    discover(accounts[a]),
    (a % 9 == 0) ?  (
      profile_commenter(accounts[0], true))
    : (!accounts[a].limited || "friend_spamming" === "666") &&
      profile_commenter(accounts[a]),
    (a % 49 == 0) &&
      ("upvoting" == "upvoting") &&
        ((a = Math.floor(Math.random() * (accounts.length-1) + 1)) =>
          (state.accounts[accounts[a].index].subscriptions.length > 0) &&
            ((fileid = shuffle_array(state.accounts[accounts[a].index].subscriptions).pop()) => (
              http_request(accounts[a], 'sharedfiles/favorite', { appid: 250820, id: fileid }),
              http_request(accounts[a], 'sharedfiles/subscribe', { appid: 250820, id: fileid }),
              http_request(accounts[a], 'sharedfiles/voteup', { appid: 250820, id: fileid }),
              log(accounts[a], 'SUCCESS | rateup: ' + (""+fileid).yellow)))())(),
    (a % 16 == 0) ? (
      ((group_url = profile.group_favorite.selection[0].substr(19)) =>
        edit_group(accounts[0], group_url, generate_big_fortune_headline(212), data.group_forms[group_url]))(),
      ((game_tag = pool(data.game_tags, 1, null)[0]) =>
        http_request(accounts[0], 'https://store.steampowered.com/curator/2751860-primarydataloop/admin/ajaxupdatepagesection/', {
          appid: "", index: 0, linkedhomepages: "[]", linktitle: "franchise",
          listid: game_tag[2], listid_label: "Select...", presentation: "featuredcarousel",
          sort: 'recent', tagid: game_tag[0], tagid_label: game_tag[1], type: "featured_tag" }))(),
      ("wishlisting" == "666") && (
        (accounts[0].last_wish) && (
          http_request(accounts[0], 'https://store.steampowered.com/api/removefromwishlist', { appid: accounts[0].last_wish[0] }),
          http_request(accounts[0], 'https://steamcommunity.com/app/' + accounts[0].last_wish[1] + '/leaveOGG?sessionID=' + accounts[0].community.getSessionID(), {})),
        accounts[0].last_wish = pool(profile.game_favorite.slots[0], 2, null).map((appid) => appid.match(/\d+/)[0]),
        http_request(accounts[0], 'https://store.steampowered.com/api/addtowishlist', { appid: accounts[0].last_wish[0] }),
        http_request(accounts[0], 'https://steamcommunity.com/app/' + accounts[0].last_wish[1] + '/joinOGG?sessionID=' + accounts[0].community.getSessionID(), {})))
    : (a == accounts.length-1) && (
      ("twitter" == "666") &&
        twitter_profile(accounts[0], profile.persona_name.selection[0].slice(2, -2), profile.background.selection[0].image, accounts[0].avatar_url, 'International Space Station'),
      ("activityfeed" == "666") &&
        post_status(accounts[0], comment_messages[Math.floor(Math.random()*comment_messages.length)](), pool(profile.game_favorite.slots[0]).replace(/_.*/, '')),
      ("twitter" == "666" && Math.floor(Math.random()*12) == 1 && screenshots_twitter.length > 0) &&
        screenshot_twitter(),
      ("tumblr" == "666") &&
        screenshot_tumblr(),
      ("imgur" == "666") &&
        screenshot_imgur(),
      curate_reviews(accounts[0]),
      curate_videos(accounts[0]),
      accounts.forEach((account) =>
        (account.index != 0) &&
          account.user.setPersona(SteamUser.EPersonaState.Online))))))
//------------------------------------------------------------------------------ GooglePhotos
googleAPIsPhotos = require('googlephotos'),
google_photos = new googleAPIsPhotos(google_auth.credentials.access_token),
google_photos.albums.list().then((result) =>
  ((total_count = +result.albums[0].mediaItemsCount + +result.albums[1].mediaItemsCount,
    picture = Math.floor(Math.random() * total_count),
    album = (picture > 19999 ? result.albums[0].id : result.albums[1].id) ) =>
      google_photos.mediaItems.search(album).then((result) =>
        global.result1 = result
      );
  )()
//------------------------------------------------------------------------------ GoogleOAuth2
scopes = [
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/youtubepartner",
  "https://www.googleapis.com/auth/youtube",
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/photoslibrary.readonly",
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.readonly"
];
google_auth.generateAuthUrl({ access_type: 'offline', scope: scopes.join(' ') });
code = 'CODE_FROM_GOOGLE';
google_auth.getToken(code, (err, token) => (err) ? console.error(err) : (console.log(token), state.google_token = token));
//------------------------------------------------------------------------------ OPNEvents
this.user.on('groupRelationship', (steamID, relationship) => {
  if (relationship != SteamUser.EClanRelationship.Blocked
  && relationship != SteamUser.EClanRelationship.Member) {
    this.log('SESSION | groupRelationship: '
      + (SteamUser.EClanRelationship[relationship].toUpperCase()
      + "=https://steamcommunity.com/gid/" + steamID).yellow);
  }
  if (relationship == SteamUser.EClanRelationship.Invited) {
    this.user.respondToGroupInvite(steamID, this.accept_group);
  }
  if (!this.accept_friend && relationship != SteamUser.EClanRelationship.Member
  && relationship != SteamUser.EClanRelationship.Blocked && this.index == 0) {
    OPN("https://steamcommunity.com/gid/" + steamID + "?" + SteamUser.EClanRelationship[relationship]);
  }
});
this.accept_friend = accept_friend;
this.user.on('friendRelationship', (steamID, relationship) => {
  if (this.accept_friend) {
    if (relationship == SteamUser.EFriendRelationship.RequestRecipient && steamid_blacklist.indexOf(steamID) == -1) {
      return this.user.addFriend(steamID);
    }
  } else if (relationship != SteamUser.EFriendRelationship.Friend
  && relationship != SteamUser.EFriendRelationship.RequestInitiator && this.index == 0) {
    OPN("https://steamcommunity.com/profiles/" + steamID + "?" + SteamUser.EFriendRelationship[relationship]);
  }
  this.log('SESSION | friendRelationship: '
    + (SteamUser.EFriendRelationship[relationship].toUpperCase()
    + "=https://steamcommunity.com/profiles/" + steamID).yellow);
});
//------------------------------------------------------------------------------ HttpRequestProcedure
http_request = (account, endpoint, data = null, callback = null, method = 'GET', json = true, retries = 0, force = false) => {
  if (retries == 3) {
    return;
  }
  if (data != null && typeof data !== 'string') {
    data.sessionid = account.community.getSessionID();
    method = 'POST';
  }
  endpoint = endpoint.replace(/http.*:\/\/steamcommunity.com\//, '');
  var options = {
    "uri": endpoint,
    "method": method,
    "form": (typeof data == 'string' ? 'sessionID=' + account.community.getSessionID() + data : data),
    "json": json,
  };
  if (options.uri.indexOf('http') == -1) {
    options.uri = ('https://steamcommunity.com/' + options.uri).replace("/my/", "/" + profile_url(account) + "/");
  }
  if (!json) {
    options.encoding = null;
  }
  account.community.httpRequest(options, (err, response, body) => {
    var result = endpoint.replace(/http.*:\/\//, '').replace(/^www./, '').replace(
        "steamcdn-a.akamaihd.net/steamcommunity/public/images/", '') + ": " + (method + '-').yellow
      , success = false;
    if (err && err.message == 'Malformed JSON response') {
      err = 0;
    }
    if (!response) {
      result = "FAILURE" + " | " + result + '???=NO RESPONSE'.yellow;
    } else {
      var response_code = response.statusCode.toString();
      result = result + response_code.yellow
      if (!body && response_code != '302' && response_code != '200') {
        result = "FAILURE" + " | " + result + "=NO BODY".yellow;
      } else if (err && !(endpoint == 'my/edit' && response_code == 500)) {
        if (response_code == '400' || response_code == '302') {
          return setTimeout(() =>
            http_request(account, endpoint, data, callback, method, json, retries+1), 1000);
        }
        result = "FAILURE" + " | " + result + ("=" + err.message).yellow;
      } else if (body && typeof body.success != 'undefined' && body.success != 1) {
        var error = (body.error) ? body.error.replace(/ /g, '').substr(0,30) : SteamCommunity.EResult[body.success];
        result = "FAILURE" + " | " + result + ("=" + error).yellow;
        if (error == 'NotLoggedOn') {
          account.user.webLogOn();
        }
      } else if (body && body.toString().indexOf("g_steamID = false;") > -1) {
        result = "FAILURE" + " | " + result + "=SteamIDIsFalse".yellow;
      } else {
        success = true;
        result = "SUCCESS" + " | " + result;
      }
    }
    if (!success || verbose == 1 || retries > 2) {
      log(account, result.replace('POST-', 'POST'.inverse + '-'));
    }
    if (callback !== null && (success || force)) {
      callback(body, response, err);
    }
  });
  return true;
}
//------------------------------------------------------------------------------ ReadlineExitHandler
(typeof readline == 'undefined' && account.index == 0) && (
  readline = require('readline').createInterface({ input: process.stdin, output: process.stdout }),
  readline.on('line', (input) =>
  eval(input))),
exit_handlers = [ save_config_files ],
exit_handlers.forEach((handler) =>
  handler())
//------------------------------------------------------------------------------ AccountLimitations
this.user.on('accountLimitations', (limited, communityBanned, locked, canInviteFriends) => {
  this.user.setPersona(SteamUser.EPersonaState.LookingToPlay);
  this.user.setUIMode(SteamUser.EClientUIMode.BigPicture);
  this.user.getSteamLevels([this.user.steamID], (results) => {
    this.friends_level = results[this.user.steamID];
    this.friends_max = 2000 - ((350 - Math.min(350, this.friends_level)) * 5);
    if (login_count == 0 || login_count == accounts.length+1 || communityBanned || locked) {
      this.log('SESSION | loggedOn: '+ ("https://steamcommunity.com/" + this.profile_url()).yellow
        + " | " + this.friends_level + "^" + this.friends_max + "="
        + (limited + "/" + communityBanned + "/" + locked).replace(
          /true/g, '1'.red).replace(/false/g, '0'.green));
    }
  });
});
if (this.user.limitations) {
  return finish(this);
}
this.user.once('accountLimitations', (limited, communityBanned, locked, canInviteFriends) => {
  this.user.limitations = { limited: limited };
});
//------------------------------------------------------------------------------ EmailOptOut
accounts[a].http_request('https://store.steampowered.com/account/emailoptout', { "action": "save", "opt_out_all": 1 })
//------------------------------------------------------------------------------ OldBatchStarter
REM del byteframe.js
REM xcopy /Y "Z:\\Work\node-byteframe\data-*.json" .
REM type Z:\Work\node-byteframe\node_share.js Z:\Work\node-byteframe\node_user.js Z:\Work\node-byteframe\node_chatbot.js Z:\Work\node-byteframe\node_games.js Z:\Work\node-byteframe\node_adventure.js Z:\Work\node-byteframe\node_byteframe.js Z:\Work\node-byteframe\node_activity_rater.js Z:\Work\node-byteframe\node_profile_commenter.js Z:\Work\node-byteframe\node_friend_log.js Z:\Work\node-byteframe\node_randomized_profile.js Z:\Work\node-byteframe\node_wishlister.js Z:\Work\node-byteframe\node_twitter.js Z:\Work\node-byteframe\node_status_poster.js > byteframe.js
REM node byteframe.js "Z:\\Work\node-byteframe\\"
cd ~/pdl-idler
DATE=$(date +%s)
LOCATION=/mnt/Datavault/Work/node-byteframe
mkdir -p backups/${DATE}
if [ -d ${LOCATION} ]; then
  cp ${LOCATION}/data-*.json .
  cp ${LOCATION}/../Steam/screenshots/sharedconfig.vdf .
  cp ${LOCATION}/../Steam/screenshots/760/screenshots.vdf .
  if [ ! -d text ]; then
    cp -R ${LOCATION}/text .
  fi
  if [ ! -d fortunes ]; then
    cp -R ${LOCATION}/fortunes .
  fi
  if [ ! -d rivescript ]; then
    cp -R ${LOCATION}/rivescript .
  fi
  if [ ! -d avatars ]; then
    cp -R ${LOCATION}/avatars .
  fi
  cp state-*.json ${LOCATION}
  cp ${LOCATION}/node_*.js .
fi
cp .js* backups/${DATE}
cat ./node_share.js \
  ./node_chatbot.js \
  ./node_user.js \
  ./node_byteframe.js \
  ./node_profile_commenter.js \
  ./node_friend_log.js \
  ./node_randomized_profile.js \
  ./node_activity_rater.js \
  ./node_twitter.js > byteframe.js
cat ./node_share.js ./misc/node_byteframe_test.js > byteframe_test.js
cp byteframe.js misc
cat errors.txt >> misc/errors.txt
echo > errors.txt
if [ ! -z ${1} ]; then
  node --expose-gc --inspect=newton:9229 byteframe_test.js
else
  node byteframe.js
fi
//------------------------------------------------------------------------------ OldBatchLines
mklink byteframe.bat Z:\\Work\node-byteframe\byteframe.bat
mklink config-byteframe.json Z:\\Work\node-byteframe\config-byteframe.json
mklink config-users.json Z:\\Work\node-byteframe\config-users.json
mklink data-adjectives.json Z:\\Work\node-byteframe\data-adjectives.json
mklink data-avatars.json Z:\\Work\node-byteframe\data-avatars.json
mklink data-byteframe.json Z:\\Work\node-byteframe\data-byteframe.json
mklink data-countries.json Z:\\Work\node-byteframe\data-countries.json
mklink data-decoration.json Z:\\Work\node-byteframe\data-decoration.json
mklink data-jokes.json Z:\\Work\node-byteframe\data-jokes.json
mklink data-performance-review.json Z:\\Work\node-byteframe\data-performance-review.json
mklink data-questions.json Z:\\Work\node-byteframe\data-questions.json
mklink config-friends.json Z:\\Work\node-byteframe\config-friends.json
mklink config-friends.diff Z:\\Work\node-byteframe\config-friends.diff
//------------------------------------------------------------------------------ LogSuspiciousChatEchos
friend_message_echo_handlers.push((steamid, msg, account) =>
  (msg.indexOf('http') > -1) &&
    fs.appendFileSync('hacked.txt', account.index + ": " + msg + "\n")),
//------------------------------------------------------------------------------ ApiKeys
(!accounts[a].apikey) && (
  accounts[a].apikey = true,
  http_request(accounts[a], 'https://steamcommunity.com/dev/revokekey', {}))
(check_bot_api = (i = 1) =>
  (i < 233) &&
    (a(i).limited) ?
      check_bot_api(i+1)
    :(http_request(a(i), 'https://steamcommunity.com/dev/revokekey', {}),
      setTimeout(() =>
        check_bot_api(i+1), 10000)))()
//------------------------------------------------------------------------------ CheckBotChatHistory
(check_bot_chat = (index = 1) =>
  (index < 224) &&
    http_request(a(index), 'https://help.steampowered.com/en/accountdata/GetFriendMessagesLog', {}, (body, response, err) => (
      body = Cheerio.load(body)('tr'),
      affected = false,
      [...Array(body.length).keys()].forEach((i) =>
        (body.eq(i).text().indexOf('¡') == 0 && body.eq(i).text().indexOf('http') > -1) && (
          affected = true)),
      (affected) && (
        console.log("ACCOUNT " + index)),
      setTimeout(() => check_bot_chat(index+1), 2000))))()
//------------------------------------------------------------------------------ DeauthorizeOther
http_request(a(i), 'https://store.steampowered.com/twofactor/manage_action', { action: 'deauthorize' })
//------------------------------------------------------------------------------ JQueryNicknameAndSub
(subscribe = (i) => {
  if (i == accounts.length) {
    return console.log('done');
  }
  jQuery.post('https://steamcommunity.com/comment/Profile/subscribe/' + accounts[i] + "/-1", {
    sessionid: g_sessionID, count: 6,
  });
  console.log('https://steamcommunity.com/profiles/' + accounts[i]);
  setTimeout(subscribe, 3000, i+1);
})(1);
(nickname = (i) => {
    if (i == accounts.length) {
    	return console.log('done');
    }
    jQuery.post("https://steamcommunity.com/profiles/" + accounts[i] + "/ajaxsetnickname/", {
    	sessionid: g_sessionID,
    	nickname: "[" + i + "]"
    });
	console.log('https://steamcommunity.com/profiles/' + accounts[i] );
	setTimeout(nickname, 2000, i+1);
})(1);
//------------------------------------------------------------------------------ Unsubscribe
(unsubscribe = (i) => {
  if (i == accounts.length) {
    return console.log('done');
  }
  http_request(accounts[0], 'comment/Profile/unsubscribe/' + accounts.steamID + "/-1", { count: 6});
  console.log('https://steamcommunity.com/profiles/' + accounts.steamID);
  setTimeout(unsubscribe, 1000, i+1);
})(1);
//------------------------------------------------------------------------------ BanBlockBatch
accounts.forEach((accounts[a], i) =>
  setTimeout(() => (
    Object.keys(accounts[a].user.myFriends).forEach((friend) =>
      accounts[a].community.getSteamUser(new SteamCommunity.SteamID(friend), (err, user) =>
       (user.customURL != null && user.customURL.indexOf('byte') == 0) &&
         accounts[a].user.removeFriend(friend))),
    accounts[a].user.blockUser('76561197976737508')), 5000*i))
//------------------------------------------------------------------------------