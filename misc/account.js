//------------------------------------------------------------------------------ Quitting
(quitting > 0 && --quitting < 1) && setTimeout(process.exit, 3000, 0)),
http(A[0], 'https://steamcommunity.com/actions/selectPreviousAvatar', { json: 1, sha: 'db02ac5a0970af2a79cd08d07e4f1a20b4e76133' }),
//------------------------------------------------------------------------------ NodeCustomRequests
finish_request_haiku = (response) => {
  return Cheerio.load(response)("strong").text().replace(
    '\n\n\n', '\n').replace('\n\n', '\n').replace('\n\n', '\n').trim();
};
finish_request_bsdfortune = (response) => {
  return Cheerio.load(response)(".fortune p").text().replace('\n\n','').trim();
};
finish_request_subfushion = (response) => {
  var text = Cheerio.load(response).root().text();
  return text.substr(text.indexOf('-->')+3).trim().substr(5).trim();
};
requests = [
  { url: "http://smalltime.com/Haiku",
    translation: (response) => { return finish_request_haiku(response); } },
  { url: "http://bsdfortune.com/discworld.php",
    translation: (response) => { return finish_request_bsdfortune(response); } },
  { url: "http://www.behindthename.com/random/random.php?number=1&gender=m&surname=&randomsurname=yes&norare=yes&nodiminutives=yes&all=no&usage_eng=1",
    translation: (response) => { return Cheerio.load(response)(".heavyhuge").text().trim(); } },
  { url: "http://dfrench.hypermart.net/cgi-bin/bashFortune/mkFortune.cgi?FORTFILE=./fortunes.txt",
    translation: (response) => { return Cheerio.load(response)("table").text().trim(); } },
  { url: "http://subfusion.net/cgi-bin/quote.pl?quote=cookie&number=1",
    translation: (response) => { return finish_request_subfushion(response); } },
  { url: "http://smalltime.com/Haiku",
    translation: (response) => { return finish_request_haiku(response); } },
  { url: "http://smalltime.com/Haiku",
    translation: (response) => { return finish_request_haiku(response); } },
  { url: "http://bsdfortune.com/xfiles.php",
    translation: (response) => { return finish_request_bsdfortune(response); } },
  { url: "http://bsdfortune.com/xfiles.php",
    translation: (response) => { return finish_request_bsdfortune(response); } },
  { url: "http://subfusion.net/cgi-bin/quote.pl?quote=startrek&number=2",
    translation: (response) => { return finish_request_subfushion(response); } },
  { url: "http://www.bash.org/?random",
    translation: (response) => { return Cheerio.load(response)("td").eq(4).text(); } },
  { url: "http://subfusion.net/cgi-bin/quote.pl?quote=calvin&number=2",
    translation: (response) => { return finish_request_subfushion(response); } },
  { url: "http://subfusion.net/cgi-bin/quote.pl?quote=futurama&number=2",
    translation: (response) => { return finish_request_subfushion(response); } },
  { url: "http://subfusion.net/cgi-bin/quote.pl?quote=love&number=2",
    translation: (response) => { return finish_request_subfushion(response); } },
  { url: "http://subfusion.net/cgi-bin/quote.pl?quote=drugs&number=2",
    translation: (response) => { return finish_request_subfushion(response); } },
  { url: "http://subfusion.net/cgi-bin/quote.pl?quote=pets&number=2",
    translation: (response) => { return finish_request_subfushion(response); } },
  { url: "http://subfusion.net/cgi-bin/quote.pl?quote=zippy&number=1",
    translation: (response) => { return finish_request_subfushion(response); } },
];
request_data = (callback) => {
  request_count = requests.length
  finish_request = (i, response = '') => {
    if (response !== '') {
      requests.data = response;
    } else if (typeof requests.data == 'undefined') {
      requests.data = 'request_data_error';
    }
    request_count--;
    if (request_count === 0) {
      callback();
    }
  };
  for (var i = 0; i < requests.length; i++) {
    ((i) => {
      http_request(requests.url, {}, (body, response, err) => {
        var translation = '';
        try {
          if (!err) {
            translation = requests.translation(body);
          }
        } catch (err) {
          console.error('request error: ' + i);
        }
        finish_request(i, translation);
      }, 'GET', true);
    })(i);
  }
};
//------------------------------------------------------------------------------ Broadcast Web Chat with request text and update title
request_index = -1;
setInterval(function() {
  broadcast_log(requests[++request_index].data.replace(/\n/g, ' | ').replace(/\s+/g, ' ').trim().substr(0,750));
  if (request_index == requests.length-1) {
    request_index = -1;
  }
}, 30000);
function update_broadcast_title() {
  setTimeout(function() {
    jQuery('#BroadcastAdminTitleInput').val(profile_debug());
    BroadcastWatch.UpdateBroadcast();
    update_broadcast_title();
  }, (60-new Date().getSeconds()+5)*1000);
}
update_broadcast_title();
//------------------------------------------------------------------------------ obswebsocket
  OBSWebSocket = require('obs-websocket-js'),
  obsWebSocket = new OBSWebSocket(),
  obsWebSocket.on('error', err =>
    console.error('SOCKET ERROR:', err)))
  obsWebSocket.connect({ address: 'localhost:4444', password: state.obs_password }).catch((err) => console.error(err)).finally(() =>
    obsWebSocket.sendCallback('StopStreaming', (error) =>
      obsWebSocket.sendCallback('SetSceneItemProperties', { item: 'Browser', visible: false }, (err) =>
        setTimeout(() =>
          obsWebSocket.sendCallback('SetSceneItemProperties', { item: 'Browser', visible: true }, (err) =>
            obsWebSocket.sendCallback('StartStreaming', (error) =>
              obsWebSocket.disconnect())), 10000))))
//------------------------------------------------------------------------------ FriendsLevelSorter
A[0].u.getSteamLevels(Object.entries(A[0].u.myFriends).filter((i) => i[1] == 3).map((i) => i[0]), (err, users) =>
  Object.entries(users).sort((a, b) => a[1] - b[1]).forEach((e) =>
    console.dir('https://steamcommunity.com/profiles/' + e[0] + " #" + e[1])))
//------------------------------------------------------------------------------ FriendsAutoReAddInsane
(relationship == 0 && previousRelationship == 3) &&
  a.u.addFriend(f),
//------------------------------------------------------------------------------ bot one-off 2024
bot = (i = 1, o = A.length-1) =>
  (i <= o) && (
    logon(A[i]),
    setTimeout(bot, 5000, i+1, o),
    setTimeout((i) => A[i].u.logOff(), 20000, i),
    setTimeout((i) => http(A[i], 'sharedfiles/subscribe', { appid: 250820, id: 2392198506, include_dependencies: false  }), 8000, i),
    setTimeout((i) => http(A[i], 'sharedfiles/voteup', { appid: 250820, id: 2392198506, file_type: 2 }), 12000, i),
    setTimeout((i) => http(A[i], 'sharedfiles/favorite', { appid: 250820, id: 2392198506 }), 16000, i))
//------------------------------------------------------------------------------ BanFunction
ban = (steamid) => (
  accounts.forEach((account) =>
    account.user.removeFriend(steamid)),
  (state.steamid_blacklist.indexOf(steamid) == -1) &&
    state.steamid_blacklist.push(steamid)),
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
//------------------------------------------------------------------------------ OldAccessToken
setTimeout((account) =>
  http_request(account, 'https://store.steampowered.com/points/shop', {}, (body, response, error) =>
    account.access_token = body.match(/webapi_token\&quot\;\:\&quot\;.*?\&quot\;/)[0].slice(25, -6)), 5000, account))),
//------------------------------------------------------------------------------ GetGmailGuard
account.user.on('steamGuard', (domain, callback) =>
  (get_gmail_guard = (retries = 0) =>
    (retries < 3) &&
      setTimeout(() => get_gmail(account, (err, gmails, code) =>
        (code = search_gmail(gmails, /\r\n\r\n[A-Z0-9]{5}/).trim()) ? (
          account.auth_code = code,
          callback(code))
        : get_gmail_guard(retries+1)), 3000))())
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
//------------------------------------------------------------------------------ HttpDebug
(typeof http_debug != 'undefined') &&
  http_debug(h, b, r, x),
A[0].c.on('postHttpRequest', (a, b, c, d, e, f) => (
  (c.uri.includes('ugcupload')) && (
    console.dir(a,b,c,d,e,f))))
//------------------------------------------------------------------------------ RenaCommentScript
var match = "*://steamcommunity.com/profiles/* + *://steamcommunity.com/id/*"
var comment = `
:icon: - :icon: - :icon: - :icon: - :icon: - :icon:
~ Have a very nice day $NAME! ~
:icon: - :icon: - :icon: - :icon: - :icon: - :icon:
`;
jQuery(document).keyup(function(event) {
  if (event.which == 27) {
    jQuery('textarea.commentthread_textarea').each(function(index, item) {
      if (jQuery(item).val() === '$$$') {
        jQuery(item).val(comment.trim().replace('$NAME', jQuery('.actual_persona_name')[0].innerText));
        jQuery(item).click();
        return false;
      }
    });
  }
});
//------------------------------------------------------------------------------ Zadey
((user, community) => (
  user.logOn({ accountName: 'USERNAME', password: 'PASSWORD' }),
  user.on('loggedOn', () => user.setPersona(SteamUser.Steam.EPersonaState.Online)),
  user.on('webSession', (sessionID, cookies) => {
    community.sessionID = sessionID;
    community.setCookies(cookies);
    (user.started) ?
      console.log('restarted connection')
    : (target = (t = 0, targets = [
      [ '76561197961017729', 'byteframe', 3],
      [ '76561198117362085', 'Zadey', 6]
    ]) =>
      (t == targets.length) ?
        process.exit(0)
      : (comment = (c = 0, comments = [
        'I think',
        'you should',
        'have five',
        'differant',
        'hearts',
        '*** HAPPY NEW YEAR, $NAME, you dumb motherstuffer! ***'
      ]) =>
        (c == comments.length || targets[t][2] == 0) ?
          target(t+1)
        : setTimeout(() =>
          community.postUserComment(targets[t][0],
            ((targets[t][2] > 1 && c < comments.length-1)
              ? comments[c] : comments[comments.length-1].replace('$NAME', targets[t][1]))
          , (err) => {
            if (err){
              if (err.message == 'The settings on this account do not allow you to add comments.') {
                target(t+1)
              }
              console.error(err.message);
              return comment(c);
            }
            console.log(`comment: ${c+1}, target: ${t+1}/${targets.length}`);
            targets[t][2]--;
            comment(c+1);
          }), 30000);
      )();
    )()
  })))(new require('steam-user'), new require('steamcommunity'));
//------------------------------------------------------------------------------ N4ZAvatars
if (typeof process.argv[2] == 'undefined') {
  console.log('username not supplied');
  process.exit(1);
}
var readline = require('readline').createInterface({
    input: process.stdin, output: process.stdout })
  , avatars = [
  ... ,
];
console.log('avatar pool size: ' + avatars.length);
(function avatar_changer(index) {
  if (index == avatars.length) {
    index = 0;
    shuffle_array(avatars);
  }
  setTimeout(function() {
    if (account.user.client.loggedOn) {
      account.community.uploadAvatar(avatars[index], null, function(err) {
        if (err) {
          return console.log('ERROR, uploadAvatar:' + err);
        }
        console.log('uploaded Avatar:' + index + " " + new Date().toString());
      });
    }
    avatar_changer(index+1);
  }, (60-new Date().getSeconds())*1000);
})(avatars.length);
//------------------------------------------------------------------------------ BrunoSardine
var names = [
  'STUFF','JUNK','CRAP','BUNK','SCRAP','FOOD','MISC','WASTE','CHAOS','OFFAL',
  'CHAFF','SLOP','LEAK','GEAR', 'ODDS','ENDS','DIRT','MIX','DRECK' ]
, emojis = [
  [ '🌂','🎈','🏓','🏀','📕','👹','💗','💄','🐠','🌸','💃','🍖','🌋','🚗', ],
  [ '🎄','🎍','⛳','🔋','📗','👽','💚','🐊','🐛','🌳','🥒','🥗','🕺','🚙', ],
  [ '🐟','🎫','🎽','👔','📘','👾','💙','💎','🐳','🍇','🍆','🍧','🌏','🚘', ],
  [ '⚡','🎁','📣','📀','📒','😺','💛','👑','🐝','👃','🌽','🥞','👳','🚕', ],]
, errors = 0;
account.user.on('loggedOn', (details, parental) => {
  account.user.gamesPlayed([399080,399220,399480]);
});
(function group_avatar_changer(index) {
  if (index == avatars.length) {
    index = 0;
    shuffle_array(avatars);
    shuffle_array(names);
  }
  setTimeout(function() {
    if (account.user.client.loggedOn) {
      account.user.setPersona(SteamUser.EPersonaState.Offline,
        names[index] + "[" + emojis[0][Math.floor(Math.random()*14)] +
        emojis[1][Math.floor(Math.random()*14)] +
        emojis[2][Math.floor(Math.random()*14)] +
        emojis[3][Math.floor(Math.random()*14)] + "]");
      account.community.uploadAvatar("./group/" + avatars[index], null, function(err) {
        if (err) {
          if (++errors == 6) {
            errors = 0;
            account.user.webLogOn();
            return console.log('restarting...');
          }
          return console.log('ERROR, uploadAvatar:' + err);
        }
        errors = 0;
        console.log('uploadAvatar (' + names[index] + '): ' + index + " " + new Date().toString());
      });
    }
    group_avatar_changer(index+1);
  }, (60-new Date().getSeconds())*1000);
})(avatars.length);
//------------------------------------------------------------------------------ SimonI
if (process.argv.length < 3) {
  console.error('username not supplied!');
  process.exit(1);
}
var logon_settings = { rememberPassword: true, accountName: process.argv[2] }
  , Cheerio = require('cheerio')
  , Crypto = require('crypto')
  , SteamUser = require('steam-user')
  , SteamCommunity = require('steamcommunity')
  , fs = require('fs')
  , readline = require('readline').createInterface({
      input: process.stdin, output: process.stdout })
  , account = { user: new SteamUser(), name: process.argv[2] }
  , RiveScript = require("rivescript")
  , riveScript = new RiveScript()
  , avatars = fs.readdirSync("./avatars")
  , avatar_index = 99999
  , backgrounds = []
  , background_index = 99999
  , errors = 0;
account.user.setOption("dataDirectory", null);
account.community = new SteamCommunity();
console.log("loading rivescript files...");
riveScript.loadDirectory("./rs", () => {
  riveScript.sortReplies();
  if (fs.existsSync('users.json')) {
    var json = JSON.parse(fs.readFileSync('users.json'));
    console.log("restoring " + Object.keys(json).length + " sessions...");
    for (var key in json) {
      if (json.hasOwnProperty(key)) {
        riveScript.setUservars(key, json[key]);
      }
    }
  }
  if (fs.existsSync('ssfn')) {
    account.user.setSentry(Crypto.createHash('sha1').update(
      fs.readFileSync('ssfn')).digest()
    );
  }
  if (fs.existsSync('key-' + process.argv[2])) {
    logon_settings.loginKey = fs.readFileSync('key-' + process.argv[2], 'utf8');
    account.user.logOn(logon_settings);
  } else {
    readline.question('password: ', (input) => {
      logon_settings.password = input;
      account.user.logOn(logon_settings);
    });
  }
  account.user.on('sentry', (sentry) => fs.writeFileSync('ssfn', sentry));
  account.user.on('loginKey', (key) => fs.writeFileSync('key-' + process.argv[2], key, 'utf8'));
  account.user.on('loggedOn', (sessionID, cookies) => {
    console.log('logged on to steam: ' + process.argv[2]);
    account.user.setPersona(SteamUser.EPersonaState.LookingToPlay);
    account.user.gamesPlayed([362960,238750,2100,475150,297000,304390,211420,236430,374320,658620,238960,24810,15370,444590,372000,438420,315810,17480,24800,307780,286260,344770,221380,379430,373420,219990,236390,222880,10270,496300,242920,14221]);
  });
  account.community.on('sessionExpired', (err) => {
    console.log('sessionExpired...');
    account.user.webLogOn();
  });
  account.user.on('webSession', (sessionID, cookies) => {
    console.log('webSession...');
    account.community.sessionID = sessionID;
    account.community.setCookies(cookies);
    if (!backgrounds.length) {
      console.log('requesting inventory...');
      account.community.getUserInventoryContents(account.user.steamID, 753, 6, false, 'english', (err, inventory, currencies, count) => {
        inventory.forEach((item) => {
          if (item.tags[2].name == 'Profile Background') {
            backgrounds.push(item);
          }
        });
        console.log('total backgrounds: ' + backgrounds.length);
        function shuffle_array(array) {
          for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random()*(i + 1));
            var t = array[i];
            array[i] = array[j];
            array[j] = t;
          }
          return array;
        }
        console.log('caching edit form...');
        account.community.httpRequestGet({
          "uri": 'https://steamcommunity.com/id/Triumphofdegeneration/edit',
        }, (err, response, body) => {
          edit = Cheerio.load(body);
        });
        setInterval(() => profile_changer(), 60000);
      });
    }
  });
  function profile_changer() {
    if (++avatar_index >= avatars.length) {
      avatar_index = 0;
      shuffle_array(avatars);
    }
    if (++background_index >= backgrounds.length) {
      background_index = 0;
      shuffle_array(backgrounds);
    }
    account.community.uploadAvatar("./avatars/" + avatars[avatar_index], null, (err) => {
      if (err) {
        if (++errors == 6) {
          errors = 0;
          account.user.webLogOn();
          return console.log('restarting web session...');
        }
        return console.log('ERROR, uploadAvatar:' + err);
      }
      errors = 0;
      console.log('uploadAvatar: ' + avatar_index + " " + new Date().toString());
    });
    edit("input[name=sessionID]").attr("value", account.community.getSessionID());
    edit("#profile_background").attr("value", backgrounds[background_index].id);
    account.community.httpRequestPost({
      "uri": 'https://steamcommunity.com/id/Triumphofdegeneration/edit',
      "form": edit("#editForm").serialize()
    }, (err, response, body) => {
      console.log('profile randomized...');
    });
  }
  function get_reply(steamID, message, steamID64 = steamID.toString()) {
    var reply = riveScript.reply(steamID64, message).replace(
      /<oob><search>.*<\/search><\/oob>/, '').replace(
      /  random/g, ' ').replace(/  /g, ' ').replace('}', '');
    if (!reply.length) {
      reply = 'Huh?';
    }
    console.log(new Date() + " | " + riveScript.getUservar(steamID64, 'chat_time') +
      "\n>> " + "[" + steamID64 + "] " + reply);
    return reply + "ㅤ";
  }
  account.user.on('friendMessageEcho', (recipientID, message, steamID64 = recipientID .toString()) => {
    if (message.indexOf('#!') == 0) {
      account.user.chatMessage(recipientID, get_reply(recipientID, message.substr(2)));
    } else if (message.indexOf('##') == 0) {
      riveScript.setUservar(steamID64, 'chat_time', 0);
    } else if (message.indexOf('ㅤ') == -1) {
      riveScript.setUservar(steamID64, 'chat_time', Date.now());
    }
  });
  account.user.on('friendMessage', (steamID, message, steamID64 = steamID.toString()) => {
    if (riveScript.getUservar(steamID64, 'chat_time') == 'undefined') {
      riveScript.setUservar(steamID64, 'chat_time', 0);
      riveScript.setUservar(steamID64, 'chat_active', false);
    }
    console.log(new Date() + " | " + riveScript.getUservar(steamID64, 'chat_time') +
      "\n<< " + "[" + steamID64 + "] " + message);
    if (Date.now() - riveScript.getUservar(steamID64, 'chat_time') > 3600000
    && riveScript.getUservar(steamID64, 'chat_active') != true) {
      riveScript.setUservar(steamID64, 'chat_active', true);
      var reply = get_reply(steamID, message);
      setTimeout(() => {
        account.user.chatTyping(steamID);
        setTimeout(() => {
          account.user.chatMessage(steamID, reply);
          riveScript.setUservar(steamID64, 'chat_active', false);
        }, Math.max(Math.min(reply.length, 100)*50, 2000));
      }, 1000);
    }
  });
});
quit = () => {
  account.user.logOff();
  fs.writeFileSync('users.json', JSON.stringify(riveScript.getUservars(), null, 2));
  process.exit(0);
}
process.on('SIGINT', quit);
process.on('SIGTERM', quit);