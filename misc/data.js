//------------------------------------------------------------------------------ CurrentGenDupeChecking
duplicates(Object.values(s.discussions).flat()).forEach(e => (console.log('https://youtube.com/watch?v=' + e + '\n'), Object.entries(s.discussions).forEach(_e => _e[1].includes(e) && console.log(_e[0])))),
duplicates(d.avatar_sha.concat(d.avatar_sha_2).concat(d.avatars.map((e) => e.join('_')))).forEach(e => console.log("AVATARS: https://avatars.akamai.steamstatic.com/" + e + "_full.jpg")),
duplicates(A[0].wishlist.concat(A[0].followed).concat(A[0].ignored).concat(A[0].ignored2).concat(profile.review.slots[0]).concat(profile.review2.slots[0]).concat(Object.entries(d).filter(e => e[0].startsWith('games_dlc')).map(e => e[1]).flat(2))).forEach(  e => console.log("GAMES: https://store.steampowered.com/app/" + e)),
duplicates(d.achievements).forEach(e => console.log("ACHIEVEMENT: https://store.steampowered.com/app/" + e)),
duplicates(d.completionist_array.flat()).forEach(e => console.log("COMPLETIONIST: https://store.steampowered.com/app/" + e)),
duplicates(Object.entries(d).filter(e => e[0].startsWith('links')).map(e => e[1]).flat(2)).forEach(e => console.log("LINKS: https://store.steampowered.com/app/" + e)),
duplicates(Object.entries(d).filter(e => e[0].startsWith('items_')).map(e => e[1]).flat(2)).forEach(e => console.log("ITEMS: https://steamcommunity.com/id/byteframe/inventory/#" + e)),
duplicates(Object.entries(d).filter((e) => e[0].includes("workshop_") || e[0].includes("screenshot_") || e[0].includes("artwork_") || e[0].includes("guide_")).map(e => e[1]).flat(2)).forEach(e => console.log("UGC: https://steamcommunity.com/sharedfiles/filedetails/?id=" + e)),
duplicates(Object.values(A[0].inventory).flat().map(e => e.name + " | " + e.market_fee_app)).forEach(e => console.log("duplicate item in (steam community) inventory: " + e)),
items = Object.values(A[0].inventory).flat().map(e => e.appid + "_" + e.contextid + "_" + e.id),
Object.entries(d).filter(e => e[0].startsWith('items')).map(e => e[1]).flat(2).forEach(e => (e.startsWith("753_6") && !items.includes(e)) && console.log("inventory doesn't have profile item: " + e)),
items = Object.entries(d).filter(e => e[0].includes('background') || e[0].includes('wallpaper') || e[0] == 'item_showcase_array').map(e => e[1]).flat(2);
A[0].inventory.backgrounds.filter(e => !items.includes("753_6_"+e.id)).sort((e, f) => +e.market_fee_app - +f.market_fee_app).forEach(e => console.log('UNUSED backgrounds: {' + e.market_fee_app + '} https://steamcommunity.com/id/byteframe/inventory/#753_6_' + e.id + " | " + e.name));
items = d.items_cards_array.flat().concat(d.items_showcase_array.flat()),
A[0].inventory.cards.filter(e => !items.includes("753_6_"+e.id)).forEach(e => console.log('UNUSED CARDS: {' + e.market_fee_app + '} https://steamcommunity.com/id/byteframe/inventory/#753_6_' + e.id + " | " + e.name));
A[0].inventory.emoticons.filter((e) => (!d.items_emoticons_array.flat().includes("753_6_"+e.id) && !d.emotes.flat().concat(d.emotes_green_stuff.flat()).map((e) => e.toLowerCase()).includes(e.name.toLowerCase()))).forEach((e) => console.log('UNUSED EMOTICONS: https://steamcommunity.com/id/byteframe/inventory/#753_6_' + e.id + "\n" + e.name));
A[0].inventory.stickers.filter(e => !d.items_stickers.includes(e.name)).forEach(e => console.log('UNUSED STICKER: {' + e.market_name + '}'));
//------------------------------------------------------------------------------ GenerateYTDLP
Object.values(s.discussions).flat().filter(e => !s.discussions['1290691937724869711'].includes(e)).forEach(e => console.log('yt-dlp -o "%(channel)s {%(id)s} %(title)s" https://youtube.com/watch?v=' + e))
//------------------------------------------------------------------------------ CheckSetTypes
d.items_trade_array.map((e) => e[0].substr(6)).filter(
  (e) => A[0].inventory['emoticons/cards/backgrounds'].findIndex((_e) => _e.assetid == e) > -1)
d.items_showcase_array.map((e) => e[0].substr(6)).filter(
  (e) => A[0].inventory['cards'].findIndex((_e) => _e.assetid == e) > -1)
d.items_showcase_array.filter(e => A[0].inventory['cards'].findIndex((_e) => _e.assetid == e[0].substr(6)) > -1)
d.items_showcase_array.filter(e => A[0].inventory['cards'].findIndex((_e) => _e.assetid == e[0].substr(6)) == -1)
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
//------------------------------------------------------------------------------ SortInventoryByNameLength
accounts[0].inventory.cards.sort((a,b) => b.market_name.length - a.market_name.length).forEach((item) => console.log("https://steamcommunity.com/id/byteframe/inventory/#753_6_" + item.id + "\"" + item.market_name + "\" {CARD}"));
accounts[0].inventory.boosters.sort((a,b) => b.market_name.length - a.market_name.length).forEach((item) => console.log("https://steamcommunity.com/id/byteframe/inventory/#753_6_" + item.id + "\"" + item.market_name + "\" {BOOSTER}"));
accounts[0].inventory.backgrounds.sort((a,b) => b.market_name.length - a.market_name.length).forEach((item) => console.log("https://steamcommunity.com/id/byteframe/inventory/#753_6_" + item.id + "\"" + item.market_name + "\" {BACKGROUND}"));
//------------------------------------------------------------------------------ SortStoreResultsByLength
r0 = jQuery('#search_resultsRows'), r1 = r0.children("a.search_result_row"), r2 = r1.sort((e, _e) => _e.innerText.length - e.innerText.length);
r0.append(r2);
//------------------------------------------------------------------------------ ShowStoreResultsByLength
jQuery("a.search_result_row").toArray().sort((e, i) => e.innerText.length - i.innerText.length).map((e) => e.name + e.innerText.trim().replace(/\n.*/g, '') + ' -- https://store.steampowered.com/app/' + e.attributes['data-ds-appid'].value).forEach((e) => console.log(e))
//------------------------------------------------------------------------------ OriginalLinkGather
d.review.forEach((e, i) => (
  review_yout_links.push(s.A[0].reviews[e].contents.match(/https:\/\/(www.)?youtu.+ \[h/)[0].slice(0,-3).slice(8).replace('www\.', '').replace('youtu.be/', '').replace('youtube.com/watch?v=', '').replace(/\?.*/, '').replace(/\&.*/, '')),
  review_item_links = review_item_links.concat(s.A[0].reviews[e].contents.match(/https:\/\/steamcommunity.com\/id\/byteframe\/inventory\/#[0-9_]+/)),
  review_game_links.push(s.A[0].reviews[e].contents.match(/https:\/\/store.steampowered.com\/app\/[0-9]+\/.+/)[0].match(/\/[0-9]+\//)[0].slice(1, -1))));
d.review_3507533.forEach((e, i) =>
  review_item_links = review_item_links.concat(s.A[0].reviews[e].contents.match(/https:\/\/steamcommunity.com\/id\/byteframe\/inventory\/#[0-9_]+/)));
//------------------------------------------------------------------------------ FindOwnedGameFavorites
data.game_favorite.map((game) => parseInt(game.match(/\d+/)[0])).forEach((appid) => (accounts[0].ownedapps.indexOf(appid) > -1) && console.log('owned appid: ' + appid))
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
