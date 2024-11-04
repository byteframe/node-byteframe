//------------------------------------------------------------------------------ AddAppidToIdForJson
E.map(e => e.map(e => e + " {" + A[0].inventory.backgrounds.find(_e => _e.id == e.substr(6)).market_fee_app + "}"))
//------------------------------------------------------------------------------ MiscDupeChecking
console.log('duplicate emoticon text vs id: '),
emotes = d.items_emoticons_array.flat().map((e) => A[0].inventory.emoticons.find((_e) => _e.id == e.substr(6)).name.toLowerCase()),
console.log(duplicates(emotes.concat(d.emotes.flat().map((e) => e.toLowerCase()))))
check_appid_duplicates = (with_sc = [], with_yt = [], wout_mm = []) => (
  Object.keys(sharedconfig).forEach((app, i) =>
    (sharedconfig[app].hidden == 1
    && data.faker_apps.indexOf(+app) == -1
    && data.not_faking.indexOf(+app) == -1) &&
      (fs.existsSync('/mnt/Datavault/Work/Steam/screenshots/760/remote/' + app)) ?
        with_sc.push(app)
      : (!sharedconfig[app].hasOwnProperty('tags') || sharedconfig[app].tags['0'] !== 'favorite') ?
        with_yt.push(app)
      : wout_mm.push(app)),
  console_log('fakersd.length: ' + data.faker_apps.length
    + '\nwith_sc.length: ' + with_sc.length
    + '\nwith_yt.length: ' + with_yt.length
    + '\nwout_mm.length: ' + wout_mm.length
    + '\nnot_faking.length: ' + data.not_faking.length),
  console.log(duplicates(profile.game_favorite.slots[0].map((game) => parseInt(game.match(/\d+/)[0]))
    .concat(data.not_faking).concat(data.faker_apps)
    .concat(profile.game_collector.slots[0]).concat(profile.game_collector.slots[1])
    .concat(profile.game_collector.slots[2]).concat(profile.game_collector.slots[3])
    .concat(profile.review.slots[0]))),
  with_sc.concat(with_yt).concat(wout_mm));
//------------------------------------------------------------------------------ FindOwnedGameFavorites
data.game_favorite.map((game) => parseInt(game.match(/\d+/)[0])).forEach((appid) => (accounts[0].ownedapps.indexOf(appid) > -1) && console.log('owned appid: ' + appid))
//------------------------------------------------------------------------------ SortInventoryByNameLength
accounts[0].inventory.cards.sort((a,b) => b.market_name.length - a.market_name.length).forEach((item) => console.log("https://steamcommunity.com/id/byteframe/inventory/#753_6_" + item.id + "\"" + item.market_name + "\" {CARD}"));
accounts[0].inventory.boosters.sort((a,b) => b.market_name.length - a.market_name.length).forEach((item) => console.log("https://steamcommunity.com/id/byteframe/inventory/#753_6_" + item.id + "\"" + item.market_name + "\" {BOOSTER}"));
accounts[0].inventory.backgrounds.sort((a,b) => b.market_name.length - a.market_name.length).forEach((item) => console.log("https://steamcommunity.com/id/byteframe/inventory/#753_6_" + item.id + "\"" + item.market_name + "\" {BACKGROUND}"));
//------------------------------------------------------------------------------ SortStoreResultsByLength
r0 = jQuery('#search_resultsRows'), r1 = r0.children("a.search_result_row"), r2 = r1.sort((e, _e) => _e.innerText.length - e.innerText.length);
r0.append(r2);
//------------------------------------------------------------------------------ ShowStoreResultsByLength
jQuery("a.search_result_row").toArray().sort((e, i) => e.innerText.length - i.innerText.length).map((e) => e.name + e.innerText.trim().replace(/\n.*/g, '') + ' -- https://store.steampowered.com/app/' + e.attributes['data-ds-appid'].value).forEach((e) => console.log(e))
//------------------------------------------------------------------------------ FindUnboughtMarketAppid
http(A[0], 'https://steamcommunity.com/id/byteframe/inventory', null, (_b1, r, x, b1 = _b1.match(/inventory_link_[0-9]*/g).map(e => e.substr(15))) =>
  http(A[0], 'https://steamcommunity.com/market/', null, (b2) => 
    b2.match(/search\?appid=[0-9]*/g).map(e => e.substr(13)).filter(e => !b1.includes(e)).sort((e, _e) => +e - +_e).map(e => "https://steamcommunity.com/market/search?appid=" + e).forEach(e => console.log(e))))
//------------------------------------------------------------------------------ CheckSetTypes
d.items_trade_array.map((e) => e[0].substr(6)).filter(
  (e) => A[0].inventory['emoticons/cards/backgrounds'].findIndex((_e) => _e.assetid == e) > -1)
d.items_showcase_array.map((e) => e[0].substr(6)).filter(
  (e) => A[0].inventory['cards'].findIndex((_e) => _e.assetid == e) > -1)
d.items_showcase_array.filter(e => A[0].inventory['cards'].findIndex((_e) => _e.assetid == e[0].substr(6)) > -1)
d.items_showcase_array.filter(e => A[0].inventory['cards'].findIndex((_e) => _e.assetid == e[0].substr(6)) == -1)
//------------------------------------------------------------------------------ OriginalLinkGather
d.review.forEach((e, i) => (
  review_yout_links.push(s.A[0].reviews[e].contents.match(/https:\/\/(www.)?youtu.+ \[h/)[0].slice(0,-3).slice(8).replace('www\.', '').replace('youtu.be/', '').replace('youtube.com/watch?v=', '').replace(/\?.*/, '').replace(/\&.*/, '')),
  review_item_links = review_item_links.concat(s.A[0].reviews[e].contents.match(/https:\/\/steamcommunity.com\/id\/byteframe\/inventory\/#[0-9_]+/)),
  review_game_links.push(s.A[0].reviews[e].contents.match(/https:\/\/store.steampowered.com\/app\/[0-9]+\/.+/)[0].match(/\/[0-9]+\//)[0].slice(1, -1))));
d.review_3507533.forEach((e, i) =>
  review_item_links = review_item_links.concat(s.A[0].reviews[e].contents.match(/https:\/\/steamcommunity.com\/id\/byteframe\/inventory\/#[0-9_]+/)));
//------------------------------------------------------------------------------ CheckIfAppIsDLC
checkDlcInterval = 8000;
(check_app_if_dlc = (i = 0) =>
  (!(data.game_favorite[i] in state.dlccheck)) ?
    http(accounts[0], 'https://store.steampowered.com/app/' + data.game_favorite[i], null, (body, response, error) => (
      (error) ?
        console.log(body)
      : (body.indexOf('>Downloadable Content</a>') > -1) ?
          state.dlccheck[data.game_favorite[i]] = true
        : state.dlccheck[data.game_favorite[i]] = false,
        console.log("[" + i + "/" + data.game_favorite.length + "] " + data.game_favorite[i] + " is " + state.dlccheck[data.game_favorite[i]]),
        setTimeout(check_app_if_dlc, checkDlcInterval, i+1)), true)
  : check_app_if_dlc(i+1))();
//------------------------------------------------------------------------------ print_achievement_page
print_achievement_page = (account, appid = 710780, text = '<html><head><style>.td1 { background-color: white; font-weight: bold; } .td2 { background-color: #C1C1C1; font-weight: italic; } body { font-color: #123123; background-color: #333333; }</style></head><body>\n<table border="1">') =>
  http(account, 'my/ajaxgetachievementsforgame/' + appid, {}, (body) => (
    Cheerio.load(body)('div.achievement_list_item').each((i, item) =>
      text += "\n  <tr>\n    <td><img src=\"" + item.children[1].attribs.src + "\" width=\"48\" length=\"48\"></td>\n"
        + '    <td class="td1">' + appid + '_' + item.attribs['data-statid'] + '_' + item.attribs['data-bit'] + '</td>\n'
        + '    <td class="td2">' + item.children[3].children[1].children[0].data + '</td>\n'
        + '  </tr>'),
    text += '\n</table>\n</body></html>',
    fs.writeFileSync(appid + '.html', text),
    console.log(text)));
//------------------------------------------------------------------------------ SharedConfig
sharedconfig = SimpleVDF.parse(fs.readFileSync("./sharedconfig.vdf", 'utf8')).UserLocalConfigStore.Software.Valve.steam.Apps,
sharedconfig = Object.keys(sharedconfig).filter((appid) =>
  sharedconfig[appid].hidden == 1 && !sharedconfig[appid].tags);
other.concat(sharedconfig).forEach((appid) => { try { console.log("  \"https://steamdb.info/appid/"+appid+" -- "+accounts[0].user.picsCache.apps[appid].appinfo.common.name + (accounts[0].user.picsCache.apps[appid].appinfo.common.type == 'Demo' ? " *** DEMO ***" : "")) } catch (ex) { console.log('fail: ' + appid) } });
//------------------------------------------------------------------------------ ReplicantSaleRoutine
bedazzle = (m) =>
  split_words([1,2].map(e=>
    pool([
      "","","","",
      ((m = pool(d.ascii)) => m)(),
      ((m = pool(d.emojis_people.flat(), 1)) => m)(),
      ((m = pool(d.emojis_sexy.flat(), 1)) => m)() ])).join(" " + m + " ")).map(e => Math.random() < 0.25 ? font(e, rand(0,d.fonts.length-3)) : e).join(' ').trim(),
emoticon_convert = (m, g = -1) =>
  m = m.replace(/(:|ː)[0-9a-zA-Z_]+:/g, () => g == -1 ? pool(pool(d.emojis, 1, null, false)[0]) : pool(d.emojis[g])),
sale = (i = 1, o = i, a = A[i], first = pool(d.first_female), last = pool(d.last_name), _country = pool([ 'US','CA','GB','US','CA','GB','DE','IT','FR','VG','VI','DK' ]), country = d.countries.find(e => e[0] == _country), state_index = Math.floor(Math.random()*country[1].length), hr = pool([ [ '[h1]', '[/h1]' ], [ '[h2]', '[/h2]' ], [ '[h3]', '[/h3]' ], [ '\n','\n' ], [ '\n','\n' ], [ '\n','\n' ], [ '\n','\n' ], [ '\n','\n' ], [ '\n','\n' ], [ '\n','\n' ], [ '\n','\n' ] ], 2, null)) =>
  i <= o && logon(a, '', () => (
    setTimeout((i, o) => ( logout(A[i]), sale(++i, o) ), 60000, i, o),
    Object.entries(a.u.myFriends).filter(e => e[1] == 2 || e[1] == 4).forEach(e => a.u[e[1] == 2 ? 'addFriend' : 'removeFriend'](e[0])),
    Object.keys(a.u.myGroups).includes('103582791462974104') && a.c.leaveGroup('103582791462974104'),
    mix(Object.keys(A[0].u.myGroups).filter(e => !a.u.myGroups.hasOwnProperty(e))).slice(0,4).forEach(e => a.c.joinGroup(e)),
    a.chats.find(e => e[0] == '10276749') || a.u.chat.joinGroup(10276749),
    a.chats.filter(e => e[0] != '10276749').forEach(e => a.u.chat.leaveGroup(e[0])),
    a.u.setPersona(1),
    !a.limited && (
      a.c.clearPersonaNameHistory(x => (
        x && log(a, 'FAILURE | clearPersonaNameHistory: ' + x.message.yellow),
        http(a, 'actions/selectPreviousAvatar', { sha: pool(d.avatar_sha), json: 1 })
        a.inventory.backgrounds.length && http(a, 'https://api.steampowered.com/IPlayerService/SetProfileBackground/v1', { access_token: a.access_token, communityitemid: +pool(a.inventory.backgrounds, 1, null)[0].id }),
        http(a, 'https://api.steampowered.com/IPlayerService/SetProfileTheme/v1', { access_token: a.access_token, theme_id: pool(['','Summer','Midnight','Steel','Cosmic','DarkMode' ]) }),
        ((g = pool(a.badges, 1, null)[0]) => ( http(a, 'https://api.steampowered.com/IPlayerService/SetFavoriteBadge/v1', { access_token: a.access_token, badgeid: g.badgeid, communityitemid: g.communityitemid } )))()
        a.edit_1 = "&type=profileSave&json=1&hide_profile_awards=0&weblink_1_title=&weblink_1_url=&weblink_2_title=&weblink_2_url=&weblink_3_title=&weblink_3_url=" +
          "&customURL=" + ((profile_url(a).startsWith('id/byte') || profile_url(a).startsWith('profiles/')) ? mix([ pool([ () => pool(d.pickups), () => fortune('love'), () => fortune('men-women') ], 1, null)[0]().replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()).replace(/[^a-zA-Z0-9\ ]+/g, '').split(' ').reduce((e, _e) => e.length < 22 ? e +_e : e), ""+a.i]).join('') : profile_url(a).slice(3)) +
          "&personaName=" + ((Math.random() < 0.25 ? pool(d.words_sexy.filter(e => !e.startsWith('Sex'))) : '') + " " + bedazzle(first)).trim() +
          "&real_name=" + bedazzle(first + " " + pool(['', last])) +
          "&summary=" + emoticon_convert(mix([
            pool([ "", "", "", jitter(), messages[1][2](), "[i]" + fortune('men-women', 1, 1,75) + "[/i]", "[b]" + fortune('love', 1, 1,75) + "[/b]", pool_discussion_links(rand(1,3)) + " ", fortune('jokes', 1, 1), jitter() ]),
            ((i = +(""+a.i).slice(-1)) =>
              i == 0 ? messages[0][3]()
            : i == 1 ? messages[0][5]()
            : i == 2 ? messages[0][44]()
            : i == 3 ? messages[2][0]()
            : i == 4 ? messages[0][29]()
            : i == 5 ? "[h1]" + messages[1][5]() + "[/h1]"
            : i == 6 ? "[b]" + messages[1][0]() + "[/b]"
            : i == 7 ? bedazzle(fortune('men-women', 1, 150,300).replace(/ -- .*?/, '')) + hr[0][1] + " " + hr[1][0] + bedazzle(fortune('love', 1, 150,300).replace(/ -- .*?/, ''))
            : i == 8 ? messages[0][33]() 
            : fortune('people', 1, 75).replace(/\s+--.*/, ''))() ], 1, null).join('\n') + (Math.random() < 0.25 ? "\n\n" + text_art('anime') : (Math.random() < 0.5 ? messages[2][2](a.steamID, new Date(), [ rand(1,2), rand(8,16)  ]) : '')), rand(0,3)).trim() +
          "&country=" + country[0],
        country[1].length && (
          a.edit_1 += "&state=" + country[1][state_index][0],
          country[1][state_index][1].length  && Math.random() < 0.5 && (
            a.edit_1 += "&city=" + country[1][state_index][1][Math.floor(Math.random()*country[1][state_index][1].length)] )),
        http(a, 'my/edit', a.edit_1),
        a.level > 9 && d.workshop_favorite_long[a.i].length == 5 &&
          setTimeout(http, 50000, a, 'my/edit', "&type=showcases&json=1&profile_showcase_style_5_0=1&rgShowcaseConfig[24_0][0][replay_year]=2022" + "&profile_showcase%5B%5D=" + '12' + "&profile_showcase_purchaseid%5B%5D=0" +
            d.workshop_favorite_long[a.i].map((e, i) => "&rgShowcaseConfig%5B12_0%5D%5B" + i + "%5D%5Bappid%5D=0&rgShowcaseConfig%5B12_0%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + e)))),
      setTimeout(a => http(a, 'my/edit', { type: 'favoriteclan', primary_group_steamid: mix(Object.keys(a.u.myGroups).filter(e => A[0].u.myGroups[e] && !d.group_favorite.includes(e)))[0] }), 40000, a),
      claim(a),
      wish(a),
      discover(a, true),
      s.A[a.i].privacy != 3 && http(a, 'my/ajaxsetprivacy', { eCommentPermission: 1, Privacy: JSON.stringify({ "PrivacyProfile": 3, "PrivacyInventory": 3, "PrivacyInventoryGifts": 3, "PrivacyOwnedGames": 3, "PrivacyPlaytime": 3, "PrivacyFriendsList": 3 })}, (b, r, x) => ( s.A[a.i].privacy = 3 ), false, 'POST', true))))
//------------------------------------------------------------------------------ GroupFormPriorToWikipedia
{ "abbreviation": "pdl-stm",
  "country": "PS",
  "state": "",
  "city": "",
  "customURL":
  "primarydataloop",
  "language": "english",
  "headline": "✔️║☢ נєffєяѕσиιαи-мαяχιѕт νιятυαℓ яєαℓιту ρσℓιтι¢αℓ яєfσям иσω! ☢║✔️ ⁨⁧⁧⁧⁧⁨✔️║●♒|►↑⌠☎⌡↓◄|♒●║✔️", "favorite_games": 
  "favorite_games": d.games_events.join(','),
  "summary": `
  [h1][code]alias mmute "voice_loopback 0;cl_voice_filter _primarydataloop_;-voicerecord"
  alias mhear "mmute;exec audible"
  alias mtalk "mhear;voice_loopback 1;+voicerecord"
  bind INS "mmute" ; bind HOME "mhear" ; bind PGUP "mtalk"
  bind END "voice_loopback 0" ; bind PGDN "voice_loopback 1"
  cl_voice_filter ""
  setinfo name ""[/code][/h1][hr][/hr][url=http://youtu.be/ZNYmK19-d0U]< REPORT >[/url] [url=http://youtu.be/Gs069dndIYk]< BALLAD>[/url][url=http://youtu.be/vwdynCHDGUE]< QUERY >[/url]
  [list][*][quote=😎 Lt. Cmdr. Data 🤖][u][b]"An Ode to Spot"[/b][/u]
  Felix Catus is your taxonomic nomenclature,
  An endothermic quadroped, carnivorous by nature.
  Your visual, olfactory, and auditory senses
  Contribute to your hunting skills and natural defenses.
  I find myself intrigued by your sub-vocal oscillations,
  A singular development of cat communications
  That obviates your basic hedonistic predelection
  For a rhythmic stroking of your fur to demonstrate affection.
  A tail is quite essential for your acrobatic talents:
  You would not be so agile if you lacked its counterbalance;
  And when not being utilitized to aid in locomotion,
  It often serves to illustrate the state of your emotion.
  Oh Spot, the complex levels of behavior you display
  Connote a fairly well-developed cognitive array.
  And though you are not sentient, Spot, and do not comprehend,
  I nonetheless consider you a true and valued friend.[/quote][/list]
  [spoiler]You aren't supposed to be here.[/spoiler]` }
//------------------------------------------------------------------------------ MostRecentBotChanges
((file = pool(d.artwork2)) => (
  http(bots[i], 'sharedfiles/voteup?' + file, { id: file , appid: 0 }),
  http(bots[i], 'sharedfiles/favorite?' + file, { id: file , appid: 0 })))(),
bots.forEach((bot) => bot.user.logOff())
bots.forEach((bot, index) => delete bots[index])
prep_randomize_profile(account, { countries: profile.countries, real_name: profile.real_name,
  persona_name: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [ (account, lite) => "_" + account.index ] ] },
  summary_text: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [ (account, lite) => '<< first-thought // giver of will >>' ] ] }
}, ()=> http(account, 'my/edit', account.edit_1)),
start_sale_bot(121,132);
start_sale_bot(134,196);
limited = "29, 38, 61, 76"
bot.user.gamesPlayed(440),
bot.user.setPersona(0, ''+bot.index),
bot.community.clearPersonaNameHistory(),
http(bot, 'https://steamcommunity.com/games/' + avatar[0] + '/selectAvatar', { selectedAvatar: avatar[1] }),
bot.community.editProfile({ name: "_" + bot.index, summary: '<< first-thought // giver of will >>' }, (err) => console.log(err));
http(bot, 'my/ajaxsetprivacy/', { eCommentPermission: 2, Privacy: JSON.stringify({ "PrivacyProfile": 2, "PrivacyInventory": 2, "PrivacyInventoryGifts": 1, "PrivacyOwnedGames": 2, "PrivacyPlaytime": 2, "PrivacyFriendsList": 2 }) }),
//------------------------------------------------------------------------------ OldRoutines
[ d.completionist2_array_, 'completionist2', 0 ], 
  mix(d.completionist2_array),
  d.completionist2_array_ = [],
  (arrange_completionist = (E = d.completionist2_array.splice(0,3)) =>
    E.length == 3 && (
      d.completionist2_array_.push(E.flat()),
      arrange_completionist()))(),
d.workshop_collector.flat().forEach((id, i) =>
  console.log('edit_text(' + id + ', "' + ( fortune('platitudes', 1, 75, 85).replace(/[\s\t]+--[\s\t]+/g, ' ').replace(/"/g, '\\"') + '",        "' + generate_emoji_fortune(300, 'startrek').replace(/"/g, '\\"', ' ')/*.replace(/\s+--\s+/g + "\")")*/ + '")')))
showcase('group_primary', 0, (i, e) => a.edit_1 += "&primary_group_steamid=" + e),
(a.u.playingState.blocked && profile.persona_name.hasOwnProperty('selection')) ?
  a.edit_1 += "&personaName=byteframe"
: showcase('persona_name', 0, (i, e) =>
  a.edit_1 += "&personaName=" + e),
(s.A[a.i].persona != -1) && (
  s.A[a.i].persona = pool([2,5,6])),
//------------------------------------------------------------------------------ OldElements
uiMode: { moves: [], types: [ 0 ], slots: [ [ 1, 2 ] ] },
var line = font('ITEMS = \ ', 13);
for (var i = 0; i < 19; i++)
  line += pool_elements(pool_elements(emojis, 1, null)[0]) + "-";
line.slice(0,-1) + " /", line.slice(0,-1);  
haiku = require('haiku-random'),
(args, pools = shuffle_array([8, 2, 3, 4, 5]),
  haikus = [...Array(3).keys()].map((i) =>
    haiku.random("html").toString().replace(/<br>/g, '\n').split('\n'))) =>
  pool(d.emoticons[pools[0]], 10) + "\n[i]"
  + "[b][u] Here's Some Haiku for You...[/u][/b]\n"
  + pool(d.emoticons[pools[1]], 10) + "\n"
  + " » " + haikus[0][0] + " " + pool(d.ascii) + " \n"
  + " » " + haikus[0][1] + " " + pool(d.ascii) + " \n"
  + " » " + haikus[0][2] + " " + pool(d.ascii) + " \n"
  + pool(d.emoticons[pools[2]], 10) + "\n"
  + " » " + haikus[1][0] + " " + pool(d.ascii) + " \n"
  + " » " + haikus[1][1] + " " + pool(d.ascii) + " \n"
  + " » " + haikus[1][2] + " " + pool(d.ascii) + " \n"
  + pool(d.emoticons[pools[3]], 10) + "\n"
  + " » " + haikus[2][0] + " " + pool(d.ascii) + " \n"
  + " » " + haikus[2][1] + " " + pool(d.ascii) + " \n"
  + " » " + haikus[2][2] + " " + pool(d.ascii) + " \n"
  + pool(d.emoticons[pools[4]], 10)
(f, comment_message_bot = (o = 900, format = pool([ "","i","b","u","spoiler" ]), t = ("[" + format + "]" + fortune('all') + "[/" + format + ']\n').replace(/\[\]/g, '').replace(/\[\/\]/g, '') + pool(d.emojis_smileys)) =>
  (t.length >= o) ? t : comment_message_bot()) =>
(f) => emote(12, [15]) + "\n" + emote(12, [15]) + "\n" + "[i]" + split_words(fortune('cookie')).join('\n') + "[/i]\n" + emote(12, [15]) + "\n" + emote(12, [15]),
(f) => "[i]" + reply('', 'tell me a story') + "[/i] " + pool(d.emojis_objects, Math.floor(Math.random()*7)+1, ' '),
"[h1][code]const float _damage = (((( ( 2 * level / 5 + 2f ) * attack * this.getPower() ) / defense / 50 + 2 ) * sameType * typeModifier ) * ( randGenerate.nextInt(39) + 217) ) / 255;[/code][/h1]"
profile.achievement2.slots = profile.achievement.slots.map(e => e.toReversed()),
[ d.achievement_array, 'achievement', 0 ],
a.u.gamesPlayed(mix(d.chinese.split('')).slice(0,42).join('')),
trade_text: { moves: [], types: [ 0 ], slots: [ [ () => ' ' + emote(33) + "\n\n" + font(fortune('all', 1, 84, 86), 4) ] ] },
    "[b][url=https://steamcommunity.com/tradeoffer/new/?partner=752001&token=JICW9lTq][u]Tʀᴀᴅᴇ[/u][/url][/b]",
information_title2: { moves: [], types: [ 0 ], slots: [ [ () => "[" + pool(d.emojis_bulk) + "] - " + font(fortune('zippy', 1, 80, 84), 3) ] ] },
information_text2: { moves: [], types: [ 0 ], slots: [ [ (a, lite, i, emoticon_index = Math.floor(Math.random()*20)) =>
  "[i]" + fortune('all', 1, 256, 448).replace(/\//g, ' ') + "[/i] [b][strike]" + pool(d.first_male) + " is not " + pool(d.adjectives).toLowerCase() + "[/strike][/b]\n\n[h1]" +
  font(fortune('all', 1, 55, 55), 4) + "[/h1]\n[b]#" +
  emoticon_index + ": " + emote(4, [emoticon_index]) + "[/b] / [spoiler]" + pool(d.links_social) + "[/spoiler] / - " + shuffle(d.chinese.split('')).join('').substr(0, 4) + " - [" + shuffle(d.barcode.split('')).join('') +
  "][hr][/hr][u]𝐖𝐀𝐋𝐋𝐏𝐀𝐏𝐄𝐑[/u]: " + emote(1, [1]) + ' [url=steamdb.info/app/' + profile.background.selection[0].market_fee_app + ']' + profile.background.selection[0].tags[1].name + '[/url] ' + emote(1, [1]) + ' [url=steamcommunity.com/profiles/76561197961017729/inventory/#753_6_' + profile.background.selection[0].id + ']' + profile.background.selection[0].name.replace(' (Profile Background)', '').replace(/background/gi, '') + '[/url]' ] ] }
item_showcase2: { moves: [], types: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ], slots: [ [],[],[],[],[],[],[],[],[],[],[],[],[ (a) => "753_6_"+pool(a.inventory.boosters, 1, null)[0].id ], [ (a) => "753_6_"+pool(a.inventory.boosters, 1, null)[0].id ], [ (a)=> "753_6_"+pool(a.inventory.boosters, 1, null)[0].id ], [ (a) => "753_6_"+pool(a.inventory.boosters, 1, null)[0].id ] ] }
'[b][u]Wallpaper (' + d.avatars[d.avatars.index-1] + ')[/u][/b]\n'
+ pool(d.emotes[1]) + ' [url=steamdb.info/app/' + profile.background.selection[0].appid + ']'
+ profile.background.selection[0].game + '[/url] ' + pool(d.emotes[1]) + ' [url=steamcommunity.com/id/byteframe/inventory/#753_6_'
+ profile.background.selection[0].id + ']' + profile.background.selection[0].name.replace(' (Profile Background)', '') + '[/url]\n\n'
"[i]" + fortune('all', 1, 192, 196) + "[/i]\n\n" +
"[b]#" + emoticon_index + ": " + 
//------------------------------------------------------------------------------ WeatherDiscussionPost
print_weather_discussion_post = (E) =>
  '[olist]' + E.map(e => "[*]" + fortune('zippy', 1, 50, 80) + "\n" + " " + pool(d.items_emoticons_array, 1, null)[0].map(e => A[0].inventory.emoticons.find(_e => _e.id == e.substr(6)).name).join(' - ') + " + " + mix(d.barcode.split('')).join('') + " + " + mix(d.chinese.split('')).slice(0,8).join('') + " https://www.youtube.com/watch?v=" + e).join('\n') + "\n[/olist]"
//------------------------------------------------------------------------------ OldUtilityFunctions
generate_emoticon_fortune = (text = '', length, emoticon_index, file = 'all', m = fortune(file).replace(/\n/g, ' ').split(/\s+/)) =>
  m.length < length ?
    generate_emoticon_fortune(text, length, emoticon_index, file)
  :([...Array(length).keys()].forEach(i =>
      text += pool(d.emotes[emoticon_index], i) + " " + pool(d.ascii) + " " + m[i] + "\n"),
    text.trim() + ' ' + m.slice(length).join(' ')),
generate_emoticons = (length, text = '', delimiter = '', indexes = [ 2,3,4,5,6,7,8,9,10,11 ]) => (
  pool(indexes, length, null).forEach((index) =>
    text += pool(d.emotes[index]) + delimiter),
  text), 
edit_text = (account, publishedfileid, title, description = '') =>
  http(account, 'sharedfiles/itemedittext?' + publishedfileid, { id: publishedfileid, language: 0, title: title, description: description }),
emoticon_convert = (m) => (
  m = m.replace(/ː/g, ':').replace(/:[0-9a-zA-Z_]+:/g, () => pool(pool(d.emojis, 1, null)[0])),
  d.emojis.index = 0,
  m),
shuffle_string = (s) =>
  shuffle_array(s.split("")).join(""),
pad = (i, zeros = "00") =>
  (zeros + i).substr(-zeros.length, zeros.length),
font = (input, f, output = '') => (
  [...Array(input.length).keys()].forEach((e, i) =>
    (d.fonts[f][input[i]] !== undefined) ?
      output += d.fonts[f][input[i]]
    : output += input[i]),
  output),
pool = (pool, length = 1, join = '', reset = false, E = []) => (
  (!pool.hasOwnProperty('index')) && (
    pool.index = 0),
  [...Array(length).keys()].forEach((item, i) => (
    (pool.index === 0) &&
      shuffle(pool),
    E.push(pool[pool.index]),
    (++pool.index == pool.length || reset) && (
      pool.index = 0))),
  (join !== null) ?
    E.join(join)
  : E),
//------------------------------------------------------------------------------ TodoList
modifiers = [ 'try to','avoid','skip','pretend to','help','','','','','' ]
verbs = [ 'learn', 'clean', 'buy', 'pick', 'do', 'make', 'fix', 'exercise',
  'tweet', 'promote', 'code', 'play', 'find', 'crash', 'submit',
  'skip', 'add', 'forget', 'avoid', 'throw', 'buy', 'sell' ]
nouns = [ 'Italian', 'milk', 'needle work', 'chess', 'Node.js', 'fines',
  'books', 'boots', 'fishing rod', 'distant relatives', 'charges',
  'knife', 'castle', 'laptop', 'principles', 'adults', 'bird' ]
dues = [ 'tommorow','tonight','this morning','yesterday','after lunch' ]
function suffix (modifier) {
  const modifiersToSuffix = {
    avoid: 'ing',
    skip: 'ing'
  }
  return modifiersToSuffix[modifier] || ''
}
function addSuffix (verb, suffix) {
  if (!suffix) {
    return verb
  }
  if (/e$/.test(verb)) {
    return verb.substr(0, verb.length - 1) + suffix
  }
  return verb + suffix
}
generate_todo_list = (
  modifier = pool(modifiers),
  verb = pool(verbs),
  noun = pool(nouns),
  ending = suffix(modifier),
  due = pool(dues)) =>
    console.log(modifier + (modifier ? ' ' : '') + addSuffix(verb, ending) + ' ' + noun)
//------------------------------------------------------------------------------ KnowledgeRiveScriptToFortune
knowledge = fs.readFileSync('rivescript/knowledge.rive', 'utf-8').match(/\n\n+.*\n-.*/g).filter((text) => text.indexOf('*') == -1).map((text) => text.replace(/<set .+>/g, '').replace(/{random}/g, '').trim()),
//------------------------------------------------------------------------------ Old Background+Badges Gather
account.backgrounds = [],
(a.inventory.backgrounds.length > 0) &&
  showcase('background', 0, (i, e) => a.edit_1 += "&profile_background=" + e.id),
http(account, 'https://steamcommunity.com/' + profile_url(account) + '/ajaxgetplayerbackgrounds', {}, (body, response, err) => 
  (body.d.profilebackgroundsowned) &&
    body.d.profilebackgroundsowned.forEach((background) =>
      (d.background_blacklist.indexOf(""+background.communityitemid) == -1 || account.index != 0) &&
        accounts[account.index].backgrounds.push({
          id: background.communityitemid,
          appid: background.appid,
          game: body.d.backgroundappnames[background.appid],
          name: background.name,
          image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/" + background.image_large })))//)),
(!account.badges) &&
  http(account, 'my/badges', null, (body, response, err,
    links = Cheerio.load(body)('a.btn_green_white_innerfade')) => (
    account.badges = [],
    (links.length > 0) &&
      links.each((i, link) =>
        account.badges.push(+link.attribs.href.substr(12)))))
badges = JSON.parse(body.match(/InitBadges.*}]/)[0].substr(11));
badge_favorite.slots = [[() => ( badge = badges[Math.floor(Math.random()*badges.length)], (badge.badgeid) ? "badgeid_" + badge.badgeid : "communityitemid_" + badge.communityitemid)]],  
//------------------------------------------------------------------------------ ReplicantProfile
replicant_profile = {
  lite: true,
  background: profile.background,
  countries: profile.countries,
  persona_name: {},
  real_name: profile.real_name,
  summary_text: profile.summary_text,
  showcases: { shuffle_slots: [], shuffle_types: [ 1 ], slots: [ [ 8,2,6,9 ] ] },
  information_text: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [ () => comment_message_bot(6000) ] ] },
  information_title: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [ () => generate_artwork_text() ] ] },
  game_favorite: profile.game_favorite,
  game_collector:  profile.game_collector,
  group_favorite:  profile.group_favorite,
  group_primary: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [ () => pool(d.group_favorite), ] ] },
  gamesPlayed: { shuffle_slots: [ 0 ], shuffle_types: [ 0 ], slots: [ [ (account) =>
    (account.badges && account.badges.length > 0) ?
      account.user.gamesPlayed(account.badges)
    : account.user.gamesPlayed([ +pool(d.sharedconfig), +pool(d.sharedconfig), +pool(d.sharedconfig), +pool(d.sharedconfig), +pool(d.sharedconfig), +pool(d.sharedconfig), +pool(d.sharedconfig), +pool(d.sharedconfig), +pool(d.sharedconfig) ]) ] ] } },
Object.assign(replicant_profile.persona_name, profile.persona_name),
showcases.slots = [ [ 8 ] ],
group_primary.slots[0] = group_primary.slots[0].concat(group_favorite.slots[0]),
summary_text.slots[0][0] = (summary_text = '') => (
  [...Array(3).keys()].forEach((i) => (
    [...Array(25).keys()].forEach((j) =>
      summary_text += pool_elements(pool_elements(decoration.emojis, 1, null)[0])),
    summary_text += "\n"),
  summary_text += "\n" + comment_message_bot(3000))),
information_text.slots[0][0] = () => comment_message_bot(8000),
information_title.slots[0][0] = () => artwork_selection_text()
accounts[a].user.gamesPlayed(generate_game_title()), true)))))()))
//------------------------------------------------------------------------------ OGGAvatars
http(a, 'https://steamcommunity.com/games/' + profile.game_favorite.selection[0] + '/Avatar/List', null, (b, r, x) =>
  (b.includes('<h2>Avatars</h2>')) && console.log('https://steamcommunity.com/games/' + profile.game_favorite.selection[0] + '/Avatar/List')),
http(a, 'https://steamcommunity.com/games/' + profile.game_favorite2.selection[0] + '/Avatar/List', null, (b, r, x) =>
  (b.includes('<h2>Avatars</h2>')) && console.log('https://steamcommunity.com/games/' + profile.game_favorite2.selection[0] + '/Avatar/List')), 
var array = avatars.pool
  , found = {}
  , new_avatars = [];
(find_avatar_url = (index = 0) => {
  if (index == array.length) {
    return console.log('done');
  }
  if (array[index][0] in found) {
    new_avatars.push([found[''+array[index][0]], array[index][1]]);
    console.log('found: ' + array[index][0] + "/" + array[index][1]);
    find_avatar_url(index+1);
  } else {
    jQuery.get('//steamcommunity.com/ogg/' + array[index][0] + '/Avatar/List'
    ).fail(function() {
      console.log('FAIL, request_avatar_url: ' + avatar[0]);
      setTimeout(find_avatar_url, 3000, index);
    }).done(function(data) {
      var url = '';
      try {
        url = jQuery(data).find('p.returnLink a')[0].href.substr(33);
      } catch (e) {
        console.log(e);
        return setTimeout(find_avatar_url, 3000, index);
      }
      found[''+array[index][0]] = url;
      new_avatars.push([url, array[index][1]]);
      console.log('new: ' + url + "/" + array[index][1]);
      setTimeout(find_avatar_url, 3000, index+1);
    });
  }
})();
avatar = pool_elements(avatars, 1, null)[0];
http('ogg/' + avatar[0] + '/Avatar/List', {}, (body, response, err) => {
  http(Cheerio.load(body)('p.returnLink a')[0].attribs.href + '/selectAvatar', { selectedAvatar: avatar[1] });
});
http('https://steamcommunity.com/games/' + avatar[0] + '/selectAvatar', { selectedAvatar: avatar[1] });
//------------------------------------------------------------------------------ Countries
alter_showcase(countries, (i, element) => {
  var state_index = Math.floor(Math.random()*element[1].length);
    , text = "&country=" + element[0] + "&state=" + element[1][state_index][0] +
      "&city=" + element[1][state_index][1][Math.floor(Math.random()*element[1][state_index][1].length)];
});
alter_showcase(countries, (i, element) => {
  var edit_process = {
      url: 'actions/EditProcess?sId=' + account.user.steamID,
      data: { xml: 1, type: "locationUpdate", country: element }
    }
  , text = "&country=" + element;
  http(edit_process.url, edit_process.data, (body, response, error) => {
    body = Cheerio(Cheerio.load(body)('state')).find('state').prevObject;
    if (body.length > 1) {
      edit_process.d.state = body[Math.floor(Math.random() * (body.length-1)+1)].attribs.key;
      text += "&state=" + edit_process.d.state;
      return http(edit_process.url, edit_process.data, (body, response, error) => {
        body = Cheerio(Cheerio.load(body)('city')).find('city').prevObject;
        if (body.length > 1) {
          edit_process.d.city = body[Math.floor(Math.random() * (body.length-1)+1)].attribs.key;
          text += "&city=" + edit_process.d.city;
        }
        post_profile();
      });
    }
    post_profile();
  });
  post_profile = () => {
    http('my/edit', edit("#editForm").serialize().replace( /&country=.*&custom/, text + "&custom"));
  };
});
fs.writeFileSync('countries.json', JSON.stringify(new_countries, null, 2));
global.hello = JSON.parse(fs.readFileSync('countries.json'));
elements = countries.slots[0];
var new_countries = [];
for_country = (e = 0) => {
  if (!elements.length) {
    return console.log('FOR_COUNTRY_DONE');
  }
  var edit_process = {
      url: 'actions/EditProcess?sId=' + account.user.steamID,
      data: { xml: 1, type: "locationUpdate", country: elements[e] }
    }
    , array = [];
  array.push(elements[e], []);
  http(edit_process.url, edit_process.data, (body, response, error) => {
    states = Cheerio(Cheerio.load(body)('state')).find('state').prevObject;
    if (states.length > 1) {
      states.slice(1).each((index, item) => {
        array[1].push([item.attribs.key, []]);
      });
      (for_state = (s = 0) => {
        if (s == array[1].length) {
          return finish();
        }
        edit_process.d.state = array[1][s][0];
        http(edit_process.url, edit_process.data, (body, response, error) => {
          cities = Cheerio(Cheerio.load(body)('city')).find('city').prevObject;
          if (cities.length > 1) {
            cities.slice(1).each((index, item) => {
              array[1][s][1].push(item.attribs.key);
            });
          }
          for_state(s+1);
        }, 'POST', false, true);
      })();
    } else {
      finish();
    }
  }, 'POST', false, true);
  finish = () => {
    new_countries.push(array);
    elements.shift();
    console.log('remaining: ' + elements.length);
    for_country();
  };
};
//------------------------------------------------------------------------------ SetShowcaseConfig
var showcase_delay = 0;
SetShowcaseConfig = (showcase, slot, data) => {
  if (account.friends_level >= 20) {
    showcase_delay++;
    d.customization_type = showcase;
    d.slot = slot;
    account.http('my/ajaxsetshowcaseconfig?' + Object.values(data).join('|'), data, null, 'POST', true, false);
  }
};
SetItemShowcaseSlot = (id, i, element) => {
  element = element.split('_');
  SetShowcaseConfig(id, i, {
    appid: element[0],
    item_contextid: element[1],
    item_assetid: element[2]
  });
};
alter_showcase(items_trade, (i, element) => { SetItemShowcaseSlot(4, i, element); });
alter_showcase(item_showcase, (i, element) => { SetItemShowcaseSlot(3, i, element); });
//------------------------------------------------------------------------------ RandomizeProcedural
run_randomized_profile = (account, profile, callback = null, lite = false) => {
  if (!account.user.steamID) {
    return account.log("FAILURE | my/edit: " + "000=LostSteamID".yellow);
  }
  if (account.edit == null) {
    return account.http('my/edit', { sessionid: account.community.getSessionID() }, (body, response, err) => {
      account.edit = Cheerio.load(body);
      account.backgrounds = { index: 0, pool: [] };
      account.badges = JSON.parse(body.match(/InitBadges.*}]/)[0].substr(11));
      account.money1 = ['XXX', "1.00"];
      account.money2 = ['XXX', "2.00"];
      if (!lite) {
        return account.http('https://store.steampowered.com/account/', null, (body, response, err) => {
          body = Cheerio.load(body);
          account.money1 = [body('.accountLabel').text()];
          account.money2 = [body('.accountd.price').text()];
          account.community.getUserInventoryContents(account.user.steamID, 753, 6, false, 'english', (err, inventory, currencies, count) => {
            inventory.forEach((item) => {
              if (item.tags[2].name == 'Profile Background') {
                account.backgrounds.pool.push(item);
              }
            });
            run_randomized_profile(account, profile, callback, lite);
          });
        });
      } else {
        run_randomized_profile(account, profile, callback, lite);
      }
    });
  }
  if (account.backgrounds.pool.length) {
    background = pool_elements(account.backgrounds, 1, null)[0];
    account.edit("#profile_background").attr("value", background.id);
  }
  account.edit("select#showcase_style_5").val(1);
  account.edit("input[name=sessionID]").attr("value", account.community.getSessionID());
  alter_showcase = (showcase, callback = '') => {
    if (!profile.hasOwnProperty(showcase)) {
      return;
    }
    showcase = profile[showcase];
    showcase.selection = [];
    if (showcase.shuffle_slots.length) {
      var to_shuffle = [];
      showcase.shuffle_slots.forEach((slot) => {
        to_shuffle.push([showcase.slots[slot], showcase.shuffle_types[slot]]);
      });
      shuffle_array(to_shuffle);
      showcase.shuffle_slots.forEach((slot, i) => {
        showcase.slots[slot] = to_shuffle[i][0];
        showcase.shuffle_types[slot] = to_shuffle[i][1];
      });
    }
    showcase.slots.forEach((slot, i) => {
      if (slot.length && typeof showcase.shuffle_types[i] !== 'undefined') {
        var element;
        if (showcase.shuffle_types[i] === 0) {
          element = slot[Math.floor(Math.random()*slot.length)];
        } else if (showcase.shuffle_types[i] < 0) {
          if (showcase.shuffle_types[i] == -1) {
            shuffle_array(slot);
          }
          element = slot[Math.abs(showcase.shuffle_types[i])-1];
          showcase.shuffle_types[i]--;
          if (Math.abs(showcase.shuffle_types[i])-1 == slot.length) {
            showcase.shuffle_types[i] = -1;
          }
        } else if (showcase.shuffle_types[i] > 0) {
          element = slot[showcase.shuffle_types[i]-1];
          showcase.shuffle_types[i]++;
          if (showcase.shuffle_types[i]-1 == slot.length) {
            showcase.shuffle_types[i] = 1;
          }
        }
        if ({}.toString.call(element) === '[object Function]') {
          element = element(account, lite);
        }
        if (lite && typeof element === 'string') {
          element = emoticon_convert(element);
        }
        showcase.selection[i] = element;
        callback(i, element);
      }
    });
  }
  alter_showcase('persona_name', (i, element) =>
    account.edit("input[name=personaName]").attr("value", element));
  alter_showcase('real_name', (i, element) =>
    account.edit("input[name=real_name]").attr("value", element));
  alter_showcase('summary_text', (i, element) =>
    account.edit("textarea#summary").text(element + "ZZZ"));
  alter_showcase('trade_text', (i, element) =>
    account.edit("textarea#showcase_4_notes").val(element));
  alter_showcase('information_text', (i, element) =>
    account.edit("#showcase_8_notes").val(element));
  alter_showcase('information_title', (i, element) =>
    account.edit("input[name=rgShowcaseConfig\\[8\\]\\[0\\]\\[title\\]]").attr("value", element));
  alter_showcase('group_primary', (i, element) =>
    account.edit("#primary_group_steamid").attr("value", element.substr(0,18)));
  alter_showcase('group_favorite', (i, element) =>
    account.edit("input[name=rgShowcaseConfig\\[9\\]\\[0\\]\\[accountid\\]]").attr("value", element.substr(0,18)));
  alter_showcase('game_favorite', (i, element) =>
    account.edit("input[name=rgShowcaseConfig\\[6\\]\\[0\\]\\[appid\\]]").attr("value", element.replace(/_.*/, '')));
  alter_showcase('review', (i, element) =>
    account.edit("input[name=rgShowcaseConfig\\[10\\]\\[0\\]\\[appid\\]]").attr("value", element));
  alter_showcase('badge_favorite', (i, element, _element = element.split('_')) =>
    account.edit("#favorite_badge_" + _element[0]).attr("value", _element[1]));
  alter_showcase('badge_collector', (i, element) =>
    account.edit("input[name=rgShowcaseConfig\\[5\\]\\[" + i + "\\]\\[appid\\]]").attr("value", element));
  alter_showcase_favorite = (id, i, element) =>
    account.edit("input[name=rgShowcaseConfig\\[" + id + "\\]\\[" + i +"\\]\\[publishedfileid\\]]").attr("value", element);
  alter_showcase('ugcfavorite', (i, element) =>
    alter_showcase_favorite(11, i, element));
  alter_showcase('ugccollector', (i, element) =>
    alter_showcase_favorite(12, i, element));
  alter_showcase('guide_favorite', (i, element) =>
    alter_showcase_favorite(15, i, element));
  alter_showcase('guide_collector', (i, element) =>
    alter_showcase_favorite(16, i, element));
  alter_showcase('screenshot', (i, element) =>
    alter_showcase_favorite(7, i, element));
  alter_showcase('artwork', (i, element) =>
    alter_showcase_favorite(13, i, element));
  alter_showcase('achievement', (i, element) => {
    account.edit("input[name=rgShowcaseConfig\\[17\\]\\[" + i + "\\]\\[appid\\]]").attr("value", element.substr(0, element.indexOf('_')));
    account.edit("input[name=rgShowcaseConfig\\[17\\]\\[" + i + "\\]\\[title\\]]").attr("value", element.substr(element.indexOf('_')+1));
  });
  if ('custom_url' in profile) {
    account.edit("input[name=customURL]").attr("value", profile.custom_url);
  }
  var text = "&country=";
  alter_showcase('countries', (i, element) => {
    var state_index = Math.floor(Math.random()*element[1].length);
    text += "&country=" + element[0];
    if (element[1].length) {
      text += "&state=" + element[1][state_index][0];
      if (element[1][state_index][1].length) {
        text += "&city=" + element[1][state_index][1][Math.floor(Math.random()*element[1][state_index][1].length)]
      }
    }
  });
  var edit_form = account.edit("#editForm").serialize().replace(/&country=.*&custom/, text + "&custom").replace(
    /&profile_showcase%5B%5D=[0-9]*/g, '&profile_showcase%5B%5D=0');
  alter_showcase('showcases', (i, element) =>
    edit_form = edit_form.replace("&profile_showcase%5B%5D=0", "&profile_showcase%5B%5D=" + element));
  alter_showcase('game_collector', (i, element) =>
    edit_form += "&rgShowcaseConfig%5B2%5D%5B" + i + "%5D%5Bappid%5D=" + element);
  SetItemShowcaseSlot = (id, i, element) => {
    element = element.split('_');
    edit_form += "&rgShowcaseConfig%5B" + id + "%5D%5B" + i + "%5D%5Bappid%5D=" + element[0];
    edit_form += "&rgShowcaseConfig%5B" + id + "%5D%5B" + i + "%5D%5Bitem_contextid%5D=" + element[1];
    edit_form += "&rgShowcaseConfig%5B" + id + "%5D%5B" + i + "%5D%5Bitem_assetid%5D=" + element[2];
  };
  alter_showcase('items_trade', (i, element) =>
    SetItemShowcaseSlot(4, i, element));
  alter_showcase('item_showcase', (i, element) =>
    SetItemShowcaseSlot(3, i, element));
  if (account.index == 97) {
    edit_form = edit_form.replace('ZZZ', encodeURIComponent('\n\n[h1]Profile Debug:[/h1]\n[b]'
      + (profile.game_favorite.selection[0]+"").replace(/_.*/, "") + "[/b] " + pool_elements(emoticon_static[12]) +  " [i]" + profile.game_collector.selection + "[/i]"));
  }
  fs.writeFileSync('edit_form.txt', edit_form.replace(/&/g,'\n&'));
  account.http('my/edit', edit_form, (body, response, err) => {
    account.edit = Cheerio.load(body);
    var avatar = pool_elements(avatars, 1, null)[0];
    account.http('https://steamcommunity.com/games/' + avatar[0] + '/selectAvatar', { selectedAvatar: avatar[1] });
    if (!lite) {
      profile_intermediate(account);
    }
    account.user.setPersona([1,2,3,4,5,6][Math.floor(Math.random()*6)]);
    if (callback !== null) {
      callback();
    }
  }, 'POST');
};
//------------------------------------------------------------------------------ ProfileIntermediateEditTexts
generate_artwork_text = (text = [ haiku.random("html").toString(), haiku.random("html").toString(), haiku.random("html").toString() ]
    .reduce((a, v) => a && a.length <= v.length ? a : v, '').toLowerCase().replace(/<br>/g, '\n').split('\n')) =>
  pool(pool(d.emojis, 1, null)[0]) + " " + text[0] + " " + pool(pool(d.emojis, 1, null)[0]) + " " + text[1] + " "
  + pool(pool(d.emojis, 1, null)[0]) + " " + text[2] + " " + pool(pool(d.emojis, 1, null)[0]),
generate_big_fortune_headline = (size, file = 'all', text = fortune(file, 1, -1, size).split(' ')) => (
  [...Array(6).keys()].forEach((i) =>
    text[(i+1)*(Math.floor((text.length+1)/6)-1)] += " YYY"),
  insert_emojis("YYY " + text.join(' ') + " YYY"))
profile_intermediate = (account,
  group_url = profile.group_favorite.selection[0].substr(19),
  rainbow = pool(d.rainbows, 1, null)[0],
  rainbow_cut = (205-rainbow.join('').length)/3,
  big_fortune = generate_big_fortune(175),
  big_fortune_split = [ big_fortune.substr(0, rainbow_cut).trim(), big_fortune.substr(rainbow_cut, rainbow_cut).trim(), big_fortune.substr((rainbow_cut*2)-1, rainbow_cut-1).trim() ]) => (
  edit_group(account, group_url, generate_big_fortune_headline(212), d.group_forms[group_url]),
  edit_text(account, profile.artwork.selection[0], generate_artwork_text()),
  edit_text(account, profile.guide_collector.selection[0], generate_big_fortune_headline(84, 'zippy')),
  edit_text(account, profile.guide_collector.selection[1], generate_big_fortune_headline(84, 'wisdom')),
  edit_text(account, profile.guide_collector.selection[2], generate_big_fortune_headline(84, 'cookie')),
  edit_text(account, profile.guide_collector.selection[3], generate_big_fortune_headline(84, 'definitions')),
  edit_text(account, profile.guide_favorite.selection[0]
    , pool(pool(d.emojis, 1, null)[0]) + " Lucky Numbers: " + Math.floor(Math.random()*9) + ',' + Math.floor(Math.random()*9) + ',' + Math.floor(Math.random()*9) + " " + pool(pool(d.emojis, 1, null)[0]) + " [̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]"
    , "\nEQ: [u]" + shuffle_array(d.equalizer).join(' ') + "[/u]\n"
    + "| " + pool(d.ascii) + " " + pool(d.guide_rainbows) + ' '
    + pool(d.ascii) + ' ' + pool(d.guide_rainbows) + ' '
    + pool(d.ascii) + ' ' + pool(d.guide_rainbows) + ' '
    + pool(d.ascii) + ' ' + pool(d.guide_rainbows) + ' '
    + pool(d.ascii) + ' ' + pool(d.guide_rainbows) + ' '
    + pool(d.ascii) + ' ' + pool(d.guide_rainbows) + ' '
    + pool(d.ascii) + ' ' + pool(d.guide_rainbows) + ' '
    + pool(d.ascii) + "\n"
    + "[i]" + haiku.random("html").toString().replace(/<br>/g, '/').trim().toLowerCase().replace(/[.,'"?!]/g, '').replace(/ \//g, '/') + "[/i] "
    + shuffle_string(d.barcode) + "_" + pool(pool(d.emojis, 1, null)[0]) + "_" + shuffle_string(d.chinese).substr(0, 4) + ' (' + pool(d.alphabet).toUpperCase() + ') + ' + pool(pool(d.emojis, 1, null)[0])),
  edit_text(account, profile.ugcfavorite.selection[0]
    , d.chinese.substr(0, 2) + " " + pool(pool(d.emojis, 1, null)[0]) + " "
    + d.chinese.substr(2, 2) + " " + pool(pool(d.emojis, 1, null)[0]) + " "
    + d.chinese.substr(4, 2) + " " + pool(pool(d.emojis, 1, null)[0]) + " "
    + d.chinese.substr(6, 2) + " " + pool(pool(d.emojis, 1, null)[0]) + " "
    + d.chinese.substr(8, 2)
    , (rainbow[0] + "●▬▬▬▬▬▬▬▬▬▬▬▬▬ 웃" + pool(pool(d.emojis, 1, null)[0]) + "유 ▬▬▬▬▬▬▬▬▬▬▬▬▬●\n"
    + rainbow[1] + "[i] → " + big_fortune_split[0] + " " + pool(pool(d.emojis, 1, null)[0]) + "\n"
    + rainbow[2] + " → " + big_fortune_split[1] + " " + pool(pool(d.emojis, 1, null)[0]) + "\n"
    + rainbow[3] + " → " + big_fortune_split[2] + " " + pool(pool(d.emojis, 1, null)[0]) + "\n"
    + rainbow[4]).replace(/[-.,"']/g, '').toLowerCase())),
//------------------------------------------------------------------------------ AltGamesPlayedRoutines
gamesPlayed: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [
  (account) => (
    account.user.gamesPlayed(),
    (!account.user.playingState.blocked) && (
      account.user.setPersona(0),
      setTimeout(() => account.user.gamesPlayed([+pool(d.faker_apps),+pool(d.faker_apps),+pool(d.faker_apps)]), 1000),
      setTimeout(() => account.user.gamesPlayed(
        pool(d.emojis[0]) + " " + pool(d.emojis[1]) + " "
        + pool(d.emojis[2]) + " " + pool(d.emojis[3]) + " "
        + pool(d.emojis[0]) + " " + pool(d.emojis[1]) + " "
        + pool(d.emojis[2]) + " " + pool(d.emojis[3]) + " "
        + pool(d.emojis[0]) + " " + pool(d.emojis[1]) + " "
        + pool(d.emojis[2])), 2000),
      setTimeout(() => account.user.setPersona(1), 3000)) ) ] ] } }