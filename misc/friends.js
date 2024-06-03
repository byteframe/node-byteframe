//------------------------------------------------------------------------------ StateFriendChecker
diff_array = (array1, array2) =>
  array1.filter((i) => array2.indexOf(i) < 0),
friends_check = (account,
  friends = Object.keys(account.user.myFriends).filter((friend) =>
    account.user.myFriends[friend] == 3 || account.user.myFriends[friend] == 6),
  lines = (action, players, callback, date = new Date()) =>
    (!players.length) ?
      callback()
    : account.user.getPersonas(players, (err, personas) => (
      (typeof personas == 'undefined') ?
        personas = err : null,
      Object.keys(personas).forEach((persona) =>
        state.accounts[account.index].friends_diff.push([
          date.getFullYear() + "-" + pad(date.getMonth()+1) + "/" + pad(date.getDate()) +
            "-" + pad(date.getHours()) + ":" + pad(date.getMinutes()),
          action, friends.length, persona, personas[persona].player_name.replace(
            /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '') ] )),
      state.accounts[account.index].friends_diff = state.accounts[account.index].friends_diff.slice(-100),
      callback()))) =>
  (friends.length) &&
    (!state.accounts[account.index].hasOwnProperty('friends_diff')) ? (
      state.accounts[account.index].last_friends = [],
      state.accounts[account.index].friends_diff = [])
    : ((removed = diff_array(state.accounts[account.index].last_friends, friends),
      added = diff_array(friends, state.accounts[account.index].last_friends)) =>
      lines(false, removed, () =>
        lines(true, added, () =>
          (added.length || removed.length) ?
            state.accounts[account.index].last_friends = friends: null)))(),
friends_check(accounts[0]),
      + pool(data.emotes[5]) + ' [url=sdq.st/u/49520]SideQuest[/url]\n\n'
      + '[h1]Friend (' + (profile.game_favorite.selection[0]+"").replace(/_.*/, "") + ') [/h1]\n'
      + ((friend_activity = '') => (
        state.accounts[0].friends_diff.slice(-4).reverse().forEach((entry) =>
          friend_activity += entry[0].replace('2019-', '') + " - [" + (entry[1] ? pool(data.green_icons) : pool(data.red_icons))
          + " ] [b] " + entry[2] + "[/b]| [u]" + entry[3] + "[/u] | "
          + pool(pool(data.emojis, 1, null)[0]) + " = [i]" + entry[4].slice(0, 22) + "[/i]\n"),
        friend_activity))() ] ] } },
//------------------------------------------------------------------------------ HandleInvite
accounts[a].handle_invite = (steamID) => (
  accounts[a].log('SESSION | friend: ' + ("https://steamcommunity.com/profiles/" + steamID).yellow),
  friends = Object.keys(accounts[a].user.myFriends).filter((key) => accounts[a].user.myFriends[key] == 3),
  (friends.length >= accounts[a].friends_max-2)
    ? ([...Array(friends.length-accounts[a].friends_max-2).keys()].forEach((index) =>
        accounts[a].user.removeFriend(friends[Math.floor(Math.random()*friends.length)])),
      setTimeout(accounts[a].user.addFriend(steamID), 1000))
  : accounts[a].user.addFriend(steamID))
//------------------------------------------------------------------------------ Following
account.http_request('my/following', null, (body, response, err, followed = Cheerio.load(body)('div.friend_block_v2')) =>
  (followed.length) && (
    followee = followed[Math.floor(Math.random()*followed.length)].attribs['data-steamid'],
  account.follow(followee, 'unfollow', () =>
    (config.byteframe.follows.indexOf(followee) == -1) &&
  accounts[a].follow(followee, 'follow',() =>
    config.byteframe.follows.push(followee)))))
//-------------------------------------------------------------------------------- NoFiringFriendChatEvents
a.u.chat.on('friendLeftConversation', (m) =>
  log(a, 'NOTICES | friendLeftConversation: ' + ("https://steam.pm/" + f).yellow)),
a.u.chat.on('friendLeftConversationEcho', (m) =>
  log(a, 'NOTICES | friendLeftConversationEcho: ' + ("https://steam.pm/" + f).yellow)),
//-------------------------------------------------------------------------------- GetFriendLevels
accounts[0].user.getSteamLevels(Object.entries(account.user.myFriends).filter((i) => i[1] == 3).map((i) => i[0]), (err, users) =>
  console.dir(Object.entries(users).sort((a, b) => a[1] - b[1])))
//-------------------------------------------------------------------------------- group/friend event 2023 removal
accounts[0].user.on('friendRelationship', (steamid, relationship) =>
(relationship == SteamUser.EFriendRelationship.RequestRecipient) &&
  state.adds.push(steamid.toString())),
//-------------------------------------------------------------------------------- FriendsStatsLastBroken
http_request(accounts[0], 'https://steamcommunity.com/id/byteframe', null, (body) => global.body = body);
body.match(/friendPlayerLevelNum\"\>\d+/)[0].match(/\d+/)[0];
(body.indexOf('in common') > -1) && body.match(/[\d,]+ friends\<\/a\> in common/)[0].replace(',', '').match(/\d+/)[0];
(body.indexOf('totalcount') > -1) &&  body.match(/totalcount\"\>[\d,]+/)[0].replace(',', '').match(/\d+/)[0];
body.indexOf('commentthread_textarea') > -1
Cheerio.load(body)('.profile_count_link_total').last().text().replace(',', '').trim();
//------------------------------------------------------------------------------ FollowFunctional
follow = (account, id, action = 'follow') =>
  http_request(account, 'profiles/' + id + '/' + action + "user/", {}),
//------------------------------------------------------------------------------ Following
: (a % 31 == 0) ?
  accounts[0].friends('my/following', (steamids) =>
    (steamids.length) &&
      accounts[0].follow(steamids[0], 'unfollow', () =>
        (config.byteframe.follows.indexOf(steamids[0]) == -1) &&
          accounts[a].follow(steamids[0], 'follow',() =>
            config.byteframe.follows.push(steamids.shift()))))
accounts.forEach((account, i) =>
  setTimeout((account) => follow(account, accounts[0].steamID), 2500*i, account));
(accounts[0].followers > 969 && config.byteframe.nonfollowers.indexOf(accounts[a]) == -1) ? (
  config.byteframe.nonfollowers.push(accounts[a].steamID),
  follow(accounts[a], accounts[0].steamID, 'unfollow'))
: (accounts[0].followers < 969 && config.byteframe.nonfollowers.indexOf(accounts[a]) > -1) && (
  config.byteframe.nonfollowers = config.byteframe.nonfollowers.filter((item) => item !== accounts[a].steamID),
  follow(accounts[a], accounts[0].steamID)),
  (body.indexOf('Followers') > -1) && (
    account.followers = body.substr(body.indexOf('Followers')-50).match(/\d+/)[0])
//------------------------------------------------------------------------------ EarlierFriendsCheck
run_friends_check = (account,
  friends = Object.keys(account.user.myFriends).filter((friend) => account.user.myFriends[friend] == 3 || account.user.myFriends[friend] == 6)
    , removed = config.friends_log[account.user.steamID].last_friends.diff(friends)
    , added = friends.diff(config.friends_log[account.user.steamID].last_friends)) =>
  (friends.length) && (
    (!config.friends_log[account.user.steamID].hasOwnProperty('friends_diff')) ?
      config.friends_log[account.user.steamID].friends_diff = []
    : null,
    lines = (action, players, callback) =>
      (!players.length) ?
        callback();
      : account.user.getPersonas(players, (personas, date = new Date()) =>
        Object.keys(personas).forEach((persona) =>
          config.friends_log[account.user.steamID].friends_diff.push(
            [ date.getFullYear() + "-" + pad(date.getMonth()+1) + "/" + pad(date.getDate()) +
              "-" + pad(date.getHours()) + ":" + pad(date.getMinutes()),
            action, friends.length, persona, personas[persona].player_name.replace(
              /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '') ]));
        callback());
    lines(false, removed, () =>
      lines(true, added, () =>
        (added.length || removed.length) &&
          config.friends_log[account.user.steamID].last_friends = friends)));
//------------------------------------------------------------------------------ FriendsListCheckJquery
unsafeWindow.request_friends_list_xml = function(callback) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: '//steamcommunity.com/profiles/' + g_steamID + "/friends/?xml=1",
    onerror: function() { setTimeout(request_friends_list, 5000); },
    onload: function(response) {
      friends = [];
      jQuery(response.responseText).find('friend').each(function(index, friend) {
        friends.push(friend.innerHTML);
      });
      callback();
    }
  });
};
unsafeWindow.request_profile = function(steamid, callback) {
  jQuery.get('//steamcommunity.com/profiles/' + steamid
  ).fail(function() {
    setTimeout(request_profile, 5000, steamid, callback);
  }).done(function(response) {
    var profile = { persona: '?', tp: '?????', cf: '???', tf: '????', cg: '??' };
    if (jQuery(response).find('span.actual_persona_name').length) {
      profile.persona = jQuery(response).find('span.actual_persona_name')[0].innerText;
    }
    if (jQuery(response).find('a.commentthread_allcommentslink').length) {
      profile.tp = jQuery(response).find(
        'a.commentthread_allcommentslink')[0].innerText.slice(9, -9).replace(',', '');
    }
    if (jQuery(response).find('a[href^=javascript\\:ShowFriendsInCommon]').length) {
      profile.cf = jQuery(response).find(
        'a[href^=javascript\\:ShowFriendsInCommon]')[0].innerText.slice(0, -8);
    }
    if (jQuery(response).find('a[href$=friends\\/]').last().children().length > 1) {
      profile.tf = jQuery(response).find(
        'a[href$=friends\\/]').last().children()[1].innerHTML.trim().replace(',', '');
    }
    if (jQuery(response).find('a[href$=groupscommon\\/]').length) {
      profile.cg = jQuery(response).find(
        'a[href$=groupscommon\\/]')[0].text.split(' ')[0];
    }
    callback(profile);
  });
};
var date = new Date();
function lines(action, players, callback, p = 0) {
  if (p == players.length) {
    callback()
  } else {
    request_profile(players[p], function(profile) {
      var line = pad(date.getMonth()+1) + "/" + pad(date.getDate()) +
        "-" + pad(date.getHours()) + ":" + pad(date.getMinutes()) +
        " (" + action + ")=" + friends.length +
        " '<a href=\"http://steamcommunity.com/profiles/" + players[p].steamid +
        "\">http://steamcommunity.com/profiles/" + players[p].steamid +
        "</a>', // " + profile.persona;
      diff += "\n" + line + "<br/>";
      console.log(line.replace(/<\/?[^>]+(>|$)/g, "").substr(12));
      lines(action, players, callback, p+1);
    });
  }
}
//------------------------------------------------------------------------------ FriendsListCheckConversion
var removed = config[account.user.steamID.toString()].last_friends.diff(friends)
  , added = friends.diff(config[account.user.steamID.toString()].last_friends);
if (!config[account.user.steamID.toString()].hasOwnProperty('friends_diff')) {
  config[account.user.steamID.toString()].friends_diff = [];
      config[account.user.steamID.toString()].friends_diff.push([
      config[account.user.steamID.toString()].last_friends = friends;
fs = require('fs');
diff = fs.readFileSync('2.diff', 'utf8');
console.log("[");
diff.split('\n').forEach((line) => {
  if (/=\d\d\d\d/.test(line)) {
    date = line.substr(0,11);
    action = (line.indexOf("(add)") ? true : false);
    total = parseInt(line.match(/=\d\d\d\d/)[0].substr(1));
    steamid = line.match(/76561[0-9]*/)[0];
    player = line.match(/\/\/ .*/)[0].substr(3).replace('<br/>', '').replace(/\\/g, '').replace(/"/g, '');
    console.log('  [ "2018-' + date + '", ' + action + ", " +total + " ,\"" + steamid + "\", \"" + player + '" ], ');
  }
});
console.log("]");
diff += "\n" + pad(date.getMonth()+1) + "/" + pad(date.getDate()) +
"-" + pad(date.getHours()) + ":" + pad(date.getMinutes()) +
" (" + action + ")=" + friends.length +
" '<a href=\"http://steamcommunity.com/profiles/" + persona +
"\">http://steamcommunity.com/profiles/" + persona +
"</a>', // " + personas[persona].player_name.replace(
  /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '') + "<br/>";
line = line.replace(/'\<a .*profiles\//, '[/b]| [u]').replace(
'(add)=', " - [" + pool_elements(green_icons) + '] [b] ').replace(
'(<font color="red">DEL</font>)=', " - [" + pool_elements(red_icons) + '] [b]').replace(
'</a>\', \/\/ ', "[/u] | " + pool_elements(emoticon_static[1]) + " = [i]\"").replace(
"<br/>", "\"");
var nameLength = line.substr(line.indexOf('=')+2).length
if (nameLength > 22) {
  line = line.slice(0, -(nameLength-22));
}
friend_activity += line + "[/i]\n";
//------------------------------------------------------------------------------ GetPeopleJQuery
people = [];
jQuery(".friend_block_v2").each((n, block) =>
  people.push([block.dataset.steamid, block.outerText.split('\n')[0]]));
people.forEach((person, n, array, name = person[1].trim()) =>
  (name.length < 13 && name.length > 4 && name.indexOf('"') == -1) &&
    console.log("[ \"" + person[0] + "\", \"" + person[1] + "\" ],"))