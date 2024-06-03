//------------------------------------------------------------------------------ CurrentGenDupeChecking
array_duplicates = (array, sorted_arr = array.slice().sort(), results = []) => (
  [...Array(sorted_arr.length-1).keys()].forEach((item, i) =>
    (sorted_arr[i+1] == sorted_arr[i]) &&
      results.push(sorted_arr[i])),
  results);
array_duplicates(Object.values(s.discussions).flat()).forEach(
  e => (console.log('https://youtube.com/watch?v=' + e + '\n'), Object.entries(s.discussions).forEach(_e => _e[1].includes(e) && console.log(_e[0])))),
array_duplicates(d.avatar_sha.concat(d.avatar_sha_2).concat(d.avatars.map((e) => e.join('_')))).forEach(
  e => console.log("AVATARS: https://avatars.akamai.steamstatic.com/" + e + "_full.jpg")),
array_duplicates(A[0].wishlist.concat(A[0].followed).concat(A[0].ignored).concat(A[0].ignored2).concat(profile.review.slots[0]).concat(profile.review2.slots[0]).concat(Object.entries(d).filter(e => e[0].startsWith('games_dlc')).map(e => e[1]).flat(2))).forEach(
  e => console.log("GAMES: https://store.steampowered.com/app/" + e)),
array_duplicates(d.achievements).forEach(
  e => console.log("nACHIEVEMENT: https://store.steampowered.com/app/" + e)),
array_duplicates(d.completionist_array.flat()).forEach(
  e => console.log("nCOMPLETIONIST: https://store.steampowered.com/app/" + e)),
array_duplicates(Object.entries(d).filter(e => e[0].startsWith('links')).map(e => e[1]).flat(2)).forEach(
  e => console.log("LINKS: https://store.steampowered.com/app/" + e)),
array_duplicates(Object.entries(d).filter(e => e[0].startsWith('items_')).map(e => e[1]).flat(2)).forEach(
  e => console.log("ITEMS: https://steamcommunity.com/id/byteframe/inventory/#" + e)),
array_duplicates(Object.entries(d).filter((e) => e[0].includes("workshop_") || e[0].includes("screenshot_") || e[0].includes("artwork_") || e[0].includes("guide_")).map(e => e[1]).flat(2)).forEach(
  e => console.log("UGC: https://steamcommunity.com/sharedfiles/filedetails/?id=" + e)),
array_duplicates(Object.values(A[0].inventory).flat().map(e => e.name + " | " + e.market_fee_app)).forEach(
  e => console.log("duplicate items in (steam community) inventory: " + e)),
inventory = Object.values(A[0].inventory).flat().map(e => e.appid + "_" + e.contextid + "_" + e.id),
Object.entries(d).filter(e => e[0].startsWith('items')).map(e => e[1]).flat(2).forEach(e =>
  (e.startsWith("753_6") && !inventory.includes(e)) && console.log("inventory doesn't have profile item: " + e)),
A[0].inventory.emoticons.filter((e) =>
  (!d.items_emoticons_array.flat().includes("753_6_"+e.id) && !d.emotes.flat().concat(d.emotes_green_stuff.flat()).map((e) => e.toLowerCase()).includes(e.name.toLowerCase()))).forEach((e) =>
     console.log('UNUSED EMOTICONS: https://steamcommunity.com/id/byteframe/inventory/#753_6_' + e.id + "\n" + e.name));
//------------------------------------------------------------------------------ MiscDupeChecking
console.log('duplicate emoticon text vs id: '),
emotes = d.items_emoticons_array.flat().map((e) => A[0].inventory.emoticons.find((_e) => _e.id == e.substr(6)).name.toLowerCase()),
console.log(array_duplicates(emotes.concat(d.emotes.flat().map((e) => e.toLowerCase()))))
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
  console.log(array_duplicates(profile.game_favorite.slots[0].map((game) => parseInt(game.match(/\d+/)[0]))
    .concat(data.not_faking).concat(data.faker_apps)
    .concat(profile.game_collector.slots[0]).concat(profile.game_collector.slots[1])
    .concat(profile.game_collector.slots[2]).concat(profile.game_collector.slots[3])
    .concat(profile.review.slots[0]))),
  with_sc.concat(with_yt).concat(wout_mm));
//------------------------------------------------------------------------------ SortStoreResultsByLength
r0 = jQuery('#search_resultsRows'), r1 = r0.children("a.search_result_row"), r2 = r1.sort((e, _e) => _e.innerText.length - e.innerText.length);
r0.append(r2);
//------------------------------------------------------------------------------ ShowStoreResultsByLength
jQuery("a.search_result_row").toArray().sort((e, i) => e.innerText.length - i.innerText.length).map((e) => e.name + e.innerText.trim().replace(/\n.*/g, '') + ' -- https://store.steampowered.com/app/' + e.attributes['data-ds-appid'].value).forEach((e) => console.log(e))
//------------------------------------------------------------------------------ GetAppidsOnPage
var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
setTimeout(() => (
  jQuery.noConflict(),
  setTimeout(() => jQuery("a.search_result_row").each((i, e) => console.log(e.href.match(/\d+/)[0])), 2000)), 1500)
//------------------------------------------------------------------------------ OriginalLinkGather
review_yout_links = [], review_item_links = [], review_game_links = [];
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
//------------------------------------------------------------------------------ StoreLinksOldAugmented
jQuery('.apphub_OtherSiteInfo a.btnv6_blue_hoverfade.btn_medium').eq(0).clone().attr('href',
  jQuery('a.btnv6_blue_hoverfade.btn_medium').eq(0).attr('href').replace(
    '/app/','/ogg/') + "/Avatar/List").html('<span>Group</span>').appendTo('.apphub_OtherSiteInfo');
//------------------------------------------------------------------------------ SharedConfig
sharedconfig = SimpleVDF.parse(fs.readFileSync("./sharedconfig.vdf", 'utf8')).UserLocalConfigStore.Software.Valve.steam.Apps,
sharedconfig = Object.keys(sharedconfig).filter((appid) =>
  sharedconfig[appid].hidden == 1 && !sharedconfig[appid].tags);
other.concat(sharedconfig).forEach((appid) => { try { console.log("  \"https://steamdb.info/appid/"+appid+" -- "+accounts[0].user.picsCache.apps[appid].appinfo.common.name + (accounts[0].user.picsCache.apps[appid].appinfo.common.type == 'Demo' ? " *** DEMO ***" : "")) } catch (ex) { console.log('fail: ' + appid) } });
//------------------------------------------------------------------------------ BashExtractGames
SRC=/home/byteframe/150_GB_SATA_25
DST=/run/media/byteframe/Games
unset UNKNOWN
find ${SRC}/ -maxdepth 2 -type f -iname "*.rar" -or -iname "*.zip" -or -iname "*.7z" \
  | grep -v __UNPLAYED > ${SRC}/filelist.tmp
while read FILE; do
  FILE="${FILE/${SRC}\//}"
  DIR="${FILE%\/*}"
  FILE="${FILE##*\/}"
  mkdir -p "${DST}/${DIR}"
  if [ ! -e "${DST}"/"${DIR}"/"${FILE}" ] ; then
    cp -v "${SRC}/${DIR}/${FILE}" "${DST}/${DIR}/${FILE}"
  fi
  mkdir -p "${DST}/${DIR}/${FILE%.*}"
  if [ ${FILE##*.} = "rar" ]; then
    COMMAND="unrar x"
  elif [ ${FILE##*.} = "zip" ]; then
    COMMAND="unzip"
  elif [ ${FILE##*.} = "7z" ]; then
    COMMAND="7z x"
  else
    UNKNOWN="${UNKNOWN}___${FILE}"
    echo "UNKNOWN FILE TYPE: ${FILE}"
    continue
  fi
  cd "${DST}/${DIR}/${FILE%.*}"
  echo "extracting: ${FILE}"
  ${COMMAND} "${DST}/${DIR}/${FILE}"
done < ${SRC}/filelist.tmp