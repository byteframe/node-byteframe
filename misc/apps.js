//------------------------------------------------------------------------------ NexterGenDupeChecking
array_duplicates = (array, sorted_arr = array.slice().sort(), results = []) => (
  [...Array(sorted_arr.length-1).keys()].forEach((item, i) =>
    (sorted_arr[i+1] == sorted_arr[i]) &&
      results.push(sorted_arr[i])),
  results),
appid_dupes = array_duplicates(A[0].wishlist.concat(links[1].map((e) => +e.match(/[0-9]+/)[0])).concat(profile.review.slots[0]).concat(profile.review_3507533.slots[0]).concat(d.game_collector.flat()).concat(d.game_collector_dlc.flat())),
(appid_dupes.length > 0) && (
  console.dir(appid_dupes),
  appid_dupes.forEach((e) => Object.keys(s.A[0].reviews).forEach((g) =>
    s.A[0].reviews[g].contents.includes("/" + e + "/") && console.log('# ' + e + ' https://steamcommunity.com/my/recommended/' + g)))),
((link_dupes = link_dupes = array_duplicates(links.flat())).length > 0) &&
  Object.keys(s.A[0].reviews).forEach((e) => link_dupes.forEach((_e) => s.A[0].reviews[e].contents.includes(_e) && console.log('link dupe: ' + _e + ' https://steamcommunity.com/my/recommended/' + e)))
//----------------------------------------------------------------------------- deleted_acfs
deleted_acfs = [ 1018100,1021960,1046810,1048010,1090890,1166020,1196180,1215470,1216410,1239410,1275200,
1282050,1288950,1295410,1298810,1298910,1299020,1301570,1302390,1309480,1311000,1315690,
1316580,1316930,1318710,1319240,1322530,1324800,1325250,1325830,1326980,1343170,1347280,
1379860,1404200,1405370,1411310,1416660,1417800,1432370,1432700,1434700,1436720,1438790,
1452730,1456010,1482760,1491310,1499600,1504060,1515070,1524520,1527310,1527400,1532880,
1535140,1535710,1539930,1541820,1546680,1556300,1562250,1563990,1573660,1590990,1600400,
1606390,1606440,1610340,1620610,1620930,1628040,1630950,1631460,1643130,1644120,1649180,
1654600,1710800,1715020,1719570,1724500,1726580,1745900,1748420,1754990,1756170,1757140,
1758980,1761370,1762460,1766190,1772560,1773290,1773600,1776510,1799320,1812100,1848090,
1849480,1849700,1861790,1866950,1875050,1876190,1893920,1894670,1894950,1897270,1900560,
1904500,1907260,1909480,1910710,1911110,1911190,1911240,1911920,1915570,1922160,1925120,
1950740,1956780,1956870,1965500,1971140,1974570,1996560,2001490,2013980,2014190,2015350,
2017250,2052850,2064860,2065540,2071310,2071380,2078420,2084560,2086700,2090540,2153150,
2336130,397610,459860,468180,547350,562170,587220,592950,616100,627990,633200,652180,
700550,716820,718950,720140,738600,747300,755120,805560,826510,875650,916100 ],
//------------------------------------------------------------------------------ OriginalLinkGather
review_yout_links = [], review_item_links = [], review_game_links = [];
d.review.slice(0).forEach((e, i) => (
  review_yout_links.push(s.A[0].reviews[e].contents.match(/https:\/\/(www.)?youtu.+ \[h/)[0].slice(0,-3).slice(8).replace('www\.', '').replace('youtu.be/', '').replace('youtube.com/watch?v=', '').replace(/\?.*/, '').replace(/\&.*/, '')),
  review_item_links = review_item_links.concat(s.A[0].reviews[e].contents.match(/https:\/\/steamcommunity.com\/id\/byteframe\/inventory\/#[0-9_]+/)),
  review_game_links.push(s.A[0].reviews[e].contents.match(/https:\/\/store.steampowered.com\/app\/[0-9]+\/.+/)[0].match(/\/[0-9]+\//)[0].slice(1, -1))));
d.review_3507533.slice(0).forEach((e, i) =>
  review_item_links = review_item_links.concat(s.A[0].reviews[e].contents.match(/https:\/\/steamcommunity.com\/id\/byteframe\/inventory\/#[0-9_]+/)));
//------------------------------------------------------------------------------ NextGenDupeCheckingResearch
.concat(d.completionist.flat()) 
.concat(d.game_collector_rgby.flat())
d.game_favorite.map((e) => e.match(/\d+/)[0]).filter((e) => A[0].u.picsCache.apps.hasOwnProperty(""+e)); 
console.clear();
array_duplicates = (array, sorted_arr = array.slice().sort(), results = []) => (
  [...Array(sorted_arr.length-1).keys()].forEach((item, i) =>
    (sorted_arr[i+1] == sorted_arr[i]) &&
      results.push(sorted_arr[i])),
  results),
console.dir(review_yout_dupes = array_duplicates(review_yout_links)); 
console.dir(review_item_dupes = array_duplicates(review_item_links));
console.dir(review_game_dupes = array_duplicates(review_game_links));
console.dir(array_duplicates(d.game_favorite.map((e) => +e.match(/[0-9]+/)[0]).concat(d.review_3507533).concat(review_game_links).concat(d.review).concat(d.game_collector.flat()).concat(d.game_collector_dlc.flat())));
Object.keys(s.A[0].reviews).forEach((e) => review_yout_dupes.forEach((_e) => s.A[0].reviews[e].contents.includes(_e) && console.log('yout_dupe: ' + _e + ' https://steamcommunity.com/my/recommended/' + e)));
Object.keys(s.A[0].reviews).forEach((e) => review_item_dupes.forEach((_e) => s.A[0].reviews[e].contents.includes(_e) && console.log('item_dupe: ' + _e + ' https://steamcommunity.com/my/recommended/' + e)));
Object.keys(s.A[0].reviews).forEach((e) => review_game_dupes.forEach((_e) => s.A[0].reviews[e].contents.includes(_e) && console.log('game_dupe: ' + _e + ' https://steamcommunity.com/my/recommended/' + e)));
d.review.forEach((e) => (s.A[0].reviews[e].banned || s.A[0].reviews[e].locked) && console.log(e));
d.review_3507533.forEach((e) => (s.A[0].reviews[e].banned || s.A[0].reviews[e].locked) && console.log(e));
Object.keys(s.A[0].reviews).forEach((e) => ['XXXxxx','YYYyyy'].forEach((_e) => s.A[0].reviews[e].contents.includes(_e) && console.log(_e + ' --: https://steamcommunity.com/my/recommended/' + e)));
console.log(array_duplicates(d.completionist.flat().concat(d.game_favorite.flat()).concat(d.game_collector.flat())));
d.game_favorite.map((e) => e.match(/\d+/)[0]).filter((e) => A[0].u.picsCache.apps.hasOwnProperty(""+e));
//------------------------------------------------------------------------------ NextGenDupeCheckingOther
Object.keys(s.A[0].reviews).forEach((e) =>
  [ YYY ].forEach((f) =>
    s.A[0].reviews[e].contents.includes(""+f) && console.log('https://steamcommunity.com/my/recommended/' + e)))
[XXX].forEach((e) => review_game_links.includes(e) ? console.log(e + " --- RGL") : console.log(e))
new_game_favorite = d.game_favorite.filter((e) => review_game_links.indexOf(+e.match(/[0-9]+/)[0]) == -1)
w.writeFileSync('./wasd.json', JSON.stringify(new_game_favorite, null, 2))
//------------------------------------------------------------------------------ PortedToJson
other.concat(sharedconfig).forEach((appid) => { try { console.log("  \"https://steamdb.info/appid/"+appid+" -- "+accounts[0].user.picsCache.apps[appid].appinfo.common.name + (accounts[0].user.picsCache.apps[appid].appinfo.common.type == 'Demo' ? " *** DEMO ***" : "")) } catch (ex) { console.log('fail: ' + appid) } });
//------------------------------------------------------------------------------ SharedConfigAudit2023
console.log('UNEXPLAINED REVIEW DUPES');
console.log(array_duplicates(state.reviewed).join(','));
console.log('BOOKMARK/FOLLOWED DUPES');
console.log(array_duplicates(bookmarks.concat(followed)).join(','));
http(accounts[0], 'my/followedgames', null, (body, response, error) => followed = body.match(/data-appid=\"[0-9]*/g).map((i) => parseInt(i.substr(12))))
sharedconfig.forEach(a => console.log('[' + (state.reviewed.indexOf(a) > -1 ? 'R' : ' ') + '][' + (bookmarks.indexOf(a) > -1 ? 'B' : ' ') + '][' + (followed.indexOf(a) > -1 ? 'F' : ' ') + '] ==== ' + "https://steamdb.info/app/" + a + "\t" + (accounts[0].user.picsCache.apps[a] != undefined && accounts[0].user.picsCache.apps[a].appinfo != undefined && accounts[0].user.picsCache.apps[a].appinfo.common != undefined ? (accounts[0].user.picsCache.apps[a].appinfo.common.type == 'Demo' ? 'DEMO' : '    ') + " https://store.steampowered.com/app/" + a + "/" + accounts[0].user.picsCache.apps[a].appinfo.common.name.replace(/ /g, '_') : '')));
//------------------------------------------------------------------------------ FindOwnedGameFavorites
check_me = data.game_favorite.map((game) => parseInt(game.match(/\d+/)[0]))
appids = Object.keys(accounts[0].user.picsCache.apps)
check_me.forEach((appid) => (appids.indexOf(appid) > -1) && console.log('owned appid: ' + appid))
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
//------------------------------------------------------------------------------ 2022AppHaul
new_games.forEach((appid) => (data.review.indexOf(+appid.replace(/\/.*/, '')) > -1) && console.log("data.review: " + "https://store.steampowered.com/app/" + appid)); // NO GAMES ALREADY IN REVIEW
new_games.forEach((appid) => (rgOwnedApps.indexOf(+appid.replace(/\/.*/, '')) > -1) && console.log("rgOwnedApps: " + "https://store.steampowered.com/app/" + appid)); // 311 OWNED_GAMES , 861 UNOWENED
owned_games = []; unowned_games = []; new_games.forEach((appid) => (rgOwnedApps.indexOf(+appid.replace(/\/.*/, '')) > -1) ? owned_games.push(appid) : unowned_games.push(appid));
unowned_games.forEach((appid) => (data.game_favorite.indexOf(appid) > -1) && console.log("https://store.steampowered.com/app/" + appid)); // 168 UNOWNED GAMES ALREADY IN DATA.FAVORITE
unowned_already_favorited = []; unowned_games.forEach((appid) => (data.game_favorite.indexOf(appid) > -1) && unowned_already_favorited.push(appid));
owned_games.forEach((appid) => (data.game_favorite.indexOf(appid) > -1) && console.log("https://store.steampowered.com/app/" + appid)); // 36 OWNED GAMES IN DATA.FAVORITE
owned_already_favorited = [];   owned_games.forEach((appid) => (data.game_favorite.indexOf(appid) > -1) &&   owned_already_favorited.push(appid));
new_games = new_games.filter((appid) => (unowned_already_favorited.indexOf(appid) == -1)); // CULL UNOWNED GAMES ALREADY FAVORITED
owned_games = []; unowned_games = []; new_games.forEach((appid) => (rgOwnedApps.indexOf(+appid.replace(/\/.*/, '')) > -1) ? owned_games.push(appid) : unowned_games.push(appid));  // REMAKE: OWNED 311, UNOWNED: 693
console.log("owned: " + owned_games.length + ", unowned: " + unowned_games.length);
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
//------------------------------------------------------------------------------ check_appid_duplicates_new
console.log(array_duplicates(d.avatars.map((avatar) => avatar[0] + "_" + avatar[1])) + " << avatars \n" + array_duplicates(data.review.concat(data.game_collector.join()).concat(data.game_favorite.map((game) => parseInt(game.match(/\d+/)[0])))) + " << appids" )
//------------------------------------------------------------------------------ check_appid_duplicates
console.log(array_duplicates(data.avatars.map((avatar) => avatar[0] + "_" + avatar[1])) + "\n" + array_duplicates(data.game_favorite.map((game) => parseInt(game.match(/\d+/)[0])).concat(data.game_collector.join()).concat(data.review))),
(check_appid_duplicates = () =>
  console.log(array_duplicates(data.game_favorite.map((game) => parseInt(game.match(/\d+/)[0]))
      .concat(data.game_collector[0]).concat(data.game_collector[1])
      .concat(data.game_collector[2]).concat(data.game_collector[3])
      .concat(data.review[0]))))();
//------------------------------------------------------------------------------ StoreLinksOldAugmented
jQuery('.apphub_OtherSiteInfo a.btnv6_blue_hoverfade.btn_medium').eq(0).clone().attr('href',
  jQuery('a.btnv6_blue_hoverfade.btn_medium').eq(0).attr('href').replace(
    '/app/','/ogg/') + "/Avatar/List").html('<span>Group</span>').appendTo('.apphub_OtherSiteInfo');
//------------------------------------------------------------------------------ SharedConfig
sharedconfig = SimpleVDF.parse(fs.readFileSync("./sharedconfig.vdf", 'utf8')).UserLocalConfigStore.Software.Valve.steam.Apps,
sharedconfig = Object.keys(sharedconfig).filter((appid) =>
  sharedconfig[appid].hidden == 1 && !sharedconfig[appid].tags);
//------------------------------------------------------------------------------ SamBatch
var array = [];
jQuery('div.gameListRowItemName').each(function(index, element) {
  var name = element.innerText.substr(0, element.innerText.indexOf('\n'));
  jQuery(element).find('div.es_recentAchievements').each(function(index, element) {
    var text = element.innerText.trim().replace(/[aA]chievements [eE]arned/, '');
    if (text !== '' && text.indexOf('0 of 0') == -1 && text.indexOf('100%') == -1) {
      var result = text + " " + name + " | " + element.id.replace('esapp', '');
      array.push([parseInt(text.substr(0, text.indexOf(' '))), result, element.id.replace('esapp', '')]);
    }
  });
});
array = array.sort(function(a, b) {
  return a[0]-b[0];
});
batch = 'cd "C:\Program Files (x86)\Steam\steamapps\SteamAchievementManager63_hotfix"';
array.forEach(function(appid, index) {
  if (index !== 0 && index % 25 === 0) {
    batch += '\ntimeout 2700';
  }
  batch += '\nstart SAM.Game.exe ' + appid[2];
});
console.log(batch);
//------------------------------------------------------------------------------ CheckDuplicates1
new_avatars = []; avatars.pool.forEach(function(avatar) { new_avatars.push(avatar.join(',')) });
var sorted_arr = arr.slice().sort();
var results = [];
for (var i = 0; i < sorted_arr.length - 1; i++) {
  if (sorted_arr[i + 1] == sorted_arr[i]) {
    results.push(sorted_arr[i]);
  }
}
console.log(results);
var game_collector_slots = game_collector.slots[0].concat(game_collector.slots[1]).concat(game_collector.slots[2]).concat(game_collector.slots[3]);
console.log('review');
review.slots[0].forEach((review) => {
  if (game_collector_slots.indexOf(review) > -1) {
    console.log(review);
  }
});
console.log('favorite');
game_favorite.slots[0].forEach((review) => {
  if (game_collector_slots.indexOf(review) > -1) {
    console.log(review);
  }
});
var checked = [];
myArray.forEach(function(appid) {
  if (checked.indexOf(appid) > -1) {
    console.log("duplicate: " + appid);
  } else {
    checked.push(appid);
    game_collector.slots.forEach(function(slot, slot_index) {
      if (slot.indexOf(appid) > -1) {
        console.log(slot_index + ": " + appid);
      }
    });
  }
});(edited)
//------------------------------------------------------------------------------ CheckDuplicates2
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
//------------------------------------------------------------------------------ ReorderArray
reorder_array = (array, element) => {
  if (typeof element !== 'undefined') {
    var index = array.indexOf(element)+1;
    if (index > -1) {
      var tmp = array.splice(0, index);
      array = array.concat(tmp);
    }
  }
  return array;
};
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
//------------------------------------------------------------------------------ Data
"not_faking": [
  644100,844380,466740,722180,778490,645330,398180,815320,691970,943170,
  642000,610350,563130,727310,436490,523720,534920,34270,464440,601770,
  493110,726910,512240,502820,786490,570,516940,889580,708680,571340,517620,
  682960,723610,329860,433100,525680,218620,532270,699990,451010,355860,552440,
  643610,214490,624710,812460,647990,843070,638110,805320,753060,457770,681390,
  787790,731790,648810,574940,591680,389260,673060,589460,468110,557960,662470,
  565190,253030,555880,510990,535170,643000,422860,631660,296070,340450,672020,
  558750,427760,626760,897690,296710,632080,538710,465240,486780,402260,852250,
  677380,530120,567670,553000,484350,552460,613200,529150,360970,566880,599180,
  576880,530830,242760,464400,574440,522710,371300,760680,645340,592240,466720,
  582500,471160,556770,629220,579820,639920,538950,269170,522220,363460,412770,
  396030,342260,456180,567840,418650,680430,672560,498370,499610,576840,457380,
  500660,450110,576750,522250,503410,552450,612590,473910,468240,509170,468700,
  491100,579080,665920,529590,386690,587430,408520,579110,328590,556010,576230,
  531270,523090,384990,603690,645140,580680,531990,518720,476480,489160,
  436320,613790,618350,629410,446770,587860,509250,567270,682740,578470,566180,
  436220,749490,527540,548340,450540,678520,576650,625470,544530,427240,
  499540,700170,599630,535010,866540,557730,648380,470490,341800,646200,619600,
  587830,447960,566780,450060,595300,912560,594490,270130,440630,572660,552060,
  560640,649880,619100,208200,530960,448280,978270,513320,494810,577210,621780,
  490490,422100,646080,462480,577290,627530,552230,562320,553590,459170,238280,
  529500,708580,810760,467660,576620,636450,550360,561690,771920,538410,563550,
  534440,919160,648070,598070,552870,469610,313630,617830,342180,510740,
  322770,526750,503580,553450,565380,564310,525500,572000,499620,283160,512420,
  348860,712060,588560,520010,
  774721,513280,323910,824350,494950,558770,506180,494400,474850,946960,574130,
  583710,511710,468180,512500,528690,493360,716820,487410,550690,633200,524000,
  686370,700370,538580,503170,667480,516670,950770,670860,749630,875650,702000,
  744160,503260,510470,460980,543850,758360,573990,524880,800540,575220,718950,
  629390,604320,918710,458930,501240,1002400,465950,605420,596930,563290,575180,
  631300,525320,747300,490830,883700,826510,579970,505720,494480,730230,465940,
  457800,610990,454300,630760,460450,1005150,833880,485050,875560,848130,494550,883570 ],
"old_faker_apps": [
  9040,1071170,1193060,1068620,1065110,967490,1091970,340,1210650,1161840,1081800,
  760530,488360,1015810,1142450,1018100,1088160,529640,1087190,999880,346250,
  1124000,1084050,1120850,20,1056710,745450,211,1151860,353360,1123150,1030240,
  1071310,219680,19900,40,21090,13520,1045130,1214410,263100,80,364450,1071090,
  953270,1107280,679990,494310,1059430,1122380,700620,380140,95700,906390,635040,
  1216410,644670,9030,944100,958750,1190530,586110,108800,1124070,2290,1098100,
  1072000,994610,320,1157920,1152250,244630,30,977160,1054600,736920,1101480,
  997180,1179090,1115410,1007360,1165850,914030,1300,1185310,331120,240180,
  1166020,1180020,2200,1073390,868020,925160,1510,1090370,1180800,
  992080,1002920,578840,604940,969280,958680,977450,996170,998660,970210,749180,744080,
  877770,504590,846290,856180,989320,949420,805560,934830,966420,909870,
  721930,693660,726530,636590,690690,919420,705830,740850,982830,810150,
  755120,588350,748000,708410,874110,777070,659830,716430,692960,604300,
  705900,759300,762530,947240,640250,761530,748190,680170,675510,763260,826530,889590,
  352360,366810,375190,379670,381940,420840,422500,422630,426610,754010,
  382000,390540,392230,396060,401970,410390,411620,876110,748420,
  404020,405480,407060,409020,412740,413620,416590,420020,834000,728110,
  411820,412360,431390,434430,436340,436740,436820,437400,446750,447100,
  438100,439260,441370,445140,457580,457660,457670,457880,458590,458890,
  447270,448880,448980,449130,459010,459860,460180,460510,460850,724940,
  450360,450390,450630,450740,451540,451870,451980,455160,455440,750850,
  452490,452710,453000,453170,465150,465310,465430,466260,513050,770990,
  456450,456570,456920,457230,457340,457420,457550,494380,494830,511360,
  461180,461320,461500,462530,462910,464540,483970,484870,493810,
  469650,469990,470130,471630,471710,464940,482390,483680,510930,778260,
  475050,475190,476430,476540,477130,477270,477800,478000,585310,513150,
  485230,485780,485880,487620,343730,348250,493400,768160,724910,
  490840,491230,491790,491800,498290,498510,498600,867090,513200,802020,
  495030,495300,495450,495520,495800,495830,496080,496180,496190,497820,
  499760,500360,500500,500920,501180,505700,506280,507210,512710,
  501380,501470,503160,503630,508580,504630,504650,505660,774421,743000,
  509360,509540,510130,510910,512080,512410,767690,737770,730090,
  512630,513420,513490,513760,513860,514350,515020,516550,519170,814960,
  516990,517160,517400,517550,518580,519030,521860,522600,250820,730360,
  519880,519940,520740,523170,523260,524030,524120,524210,526680,
  525100,525540,525910,526180,526470,528550,528580,606010,725510,
  526730,526770,527110,529540,529630,529670,466900,803010,763860,744660,
  528990,529040,533970,534180,534460,534480,534690,534720,537060,753090,
  535460,535660,536210,536230,536390,536530,543600,544010,544130,544410,
  537590,538000,538050,538110,538330,538660,547040,547350,547440,547580,
  539190,540630,541250,541890,542170,542520,549760,549880,549920,550160,
  542820,542960,543350,544430,544510,544590,547750,547850,549360,555160,
  550520,550700,550820,551020,551780,551960,557670,558980,559010,559920,
  552630,552770,552960,530350,531060,533910,555110,606180,510950,781320,
  553050,553200,553510,554140,555170,556170,556230,556520,556750,562170,
  560520,560970,561080,561390,561820,566130,566150,566580,608870,738350,
  562740,563160,563470,563760,563830,564330,564520,565030,565440,565730,
  565940,568600,568690,568800,569330,569370,569470,569640,572130,738310,
  570000,570230,570590,571500,571890,575420,575600,608980,611090,
  573260,573270,573360,573550,574190,576790,577660,766110,735810,781040,
  574780,575110,577780,578620,579040,579050,582030,319260,611120,750350,
  579550,579600,579720,580410,580630,595070,595490,584200,585270,612050,
  582210,583510,584170,585340,585530,585940,587580,588290,612440,775850,
  589110,589180,589240,590430,590440,600400,600650,601090,602010,
  591660,592320,592330,592450,592920,592950,593090,593350,593400,602090,
  600140,602140,602630,603630,604530,604830,607590,607860,608000,854330,
  605010,605170,605810,605830,605850,605860,607220,607260,607440,809150,
  612790,614010,614160,614700,614710,615460,635190,636580,636930,637960,
  615650,615960,616100,616810,617600,618570,633830,634060,847650,786390,
  618920,619020,619250,622290,622310,672640,673070,673080,837640,739960,
  622380,623970,624460,624920,627990,667110,668490,669440,770090,750360,
  630510,632030,645480,656770,657010,659310,660520,222500,774731,735470,
  633320,638430,638920,639190,639220,639460,639960,642700,645280,746160,
  642840,644660,644730,646290,646310,646530,646990,647670,746280,
  648870,649070,651080,651320,653150,654070,662700,663220,664450,
  665200,665430,665880,670830,672160,676470,676690,676990,677290,788540,
  673450,673590,673900,686950,687320,687870,688940,689210,689710,691930,
  693810,693900,701100,692530,713440,714780,718810,755770,
  703430,707580,711440,713060,764110,771310,776140,791040,914450,768100,
  722350,729190,730550,736400,748060,758210,763650,791380,793170,872640,
  801610,805250,809290,826480,831040,991480,343740,856640,793880,812770,
  837380,843420,845330,847790,852450,856300,856620,463290,469960,813440,
  857890,858380,859220,859240,862520,863220,866040,527160,556560,557940,
  870890,871490,871620,874760,875480,876340,879030,880270,544270,894380,
  881800,882110,885590,886250,887260,889220,891960,892170,527580,535190,
  895890,898520,903760,904820,905180,905460,535650,633750,751550,727030,
  910050,910210,910850,911250,912870,912880,619550,622270,626700,847900,
  916130,921620,923030,923460,923820,925000,471660,500380,861400,796970,
  925830,926720,933140,935110,935120,943010,943290,504990,767810,
  944840,945640,949390,950380,953440,678060,678830,797200,738100,
  954160,954370,956880,960130,960270,962640,963580,684380,798590,850500,
  970800,970980,972890,974830,974840,979100,980740,982010,440120,445390,
  394820,397610,415520,628960,630630,646360,649890,652180,686340,816580,
  512270,513790,516470,576720,584850,587470,591360,860730,779650,799300,
  541420,542790,559170,560960,564980,567730,568640,601990,327140,740250,
  591790,593210,594730,595990,600580,601550,608190,613040,832080,
  602000,602550,607770,662500,670270,671310,674160,808550,735460,
  681550,687730,689580,691570,705870,708370,892560,808810,836300,
  692060,693330,694550,698520,698570,703480,827170,814700,811800,785990,
  701010,711530,712410,713320,714100,714580,719950,871270,726620,
  714610,716260,716900,719270,720950,721090,721510,722590,831450,725920,
  720290,724180,724870,831590,22180 ],
"sharedconfig": [
649070,746280,827170,544420,602090,1082950,458890,752050,
758210,228980,493110,691970,584170,662700,512420,570590,
650460,505720,874110,978270,822730,1081390,645330,590430,
565380,800540,858380,693900,365140,856180,549920,750360,
323910,512240,885980,459170,524210,427240,529780,471710,
541420,13250,566180,476430,605830,543350,500660,538000,
468240,494830,477270,340,705900,566130,580680,467360,
557940,490840,633320,943290,530350,569470,475050,487410,
592240,590440,852830,990060,1011110,528990,523260,556750,
4000,681550,579550,733420,646990,504590,340450,716820,
511710,412140,499620,279920,1045140,547580,699990,611090,
719270,530830,446750,485880,529040,949420,889590,1061430,
556770,485230,879030,824350,351790,456570,906390,436740,
872640,570230,1047910,290060,587860,528580,619600,573260,
456450,599110,1082060,579820,456920,529500,896890,402260,
763650,1057420,618920,1084050,727310,926720,543850,1002400,
593350,2100,233720,443580,433100,328590,1069900,798590,
700170,785560,735470,802020,348250,843420,265690,585340,
875650,954370,863470,561820,944840,387860,505700,526770,
561080,619250,583710,322770,445140,451010,525500,607770,
495800,460180,974150,1022950,735810,538330,534440,544590,
470130,527160,614160,910850,592320,871270,584200,1056710,
208200,498370,689580,633830,624920,560520,947240,465150,
598070,574440,587580,496180,895890,574940,736920,605170,
522600,747250,520740,517550,766260,889860,544410,934850,
557670,556230,458930,726620,450060,648810,764110,356670,
218620,568640,549760,1056500,874870,729190,542170,735570,
577660,613790,558750,1015810,631660,576230,538050,468180,
915720,560960,526680,753060,531270,1029110,669440,670830,
214490,726530,451870,675510,611500,375190,559920,513420,
714610,487620,575600,587470,617830,585310,420840,933140,
460850,834000,565190,556560,296070,815320,482390,648070,
837380,686950,469610,499610,550820,746920,556170,461500,
518420,1048570,239200,810020,314280,562740,1069360,837640,
466460,887260,535460,578840,607260,724940,813440,566580,
725510,600400,1012940,767690,639190,858350,411820,501180,
457880,1021960,595070,1071090,707580,516550,352360,891960,
686340,563290,606010,953440,290930,711530,552450,614710,
674160,512270,622310,529590,966420,513490,735400,722590,
626700,962640,623040,622290,982710,561690,390540,607440,
483680,22180,360,280,942600,791380,578470,524000,331120,
594490,493360,427760,448880,513150,563130,589110,575110,30,
1052070,397610,380,613330,718810,730,420,562320,777070,
509360,809150,577780,727030,527540,415520,762530,389260,
450110,587430,465310,513320,882110,954290,599630,616100,
721510,496080,494810,511360,1033550,998660,934830,606180,
343740,523780,495830,603690,522710,440630,897690,714100,
968700,805320,667110,457670,570000,687320,1001550,526180,
608870,496240,612440,574130,505660,533970,535170,542820,
416590,602550,463290,646530,588560,579110,659830,688940,
431390,964350,412770,909870,458590,642840,908580,474850,
498600,513860,466740,317400,550,638430,561390,457550,787790,
1061600,534480,263100,270130,547350,639920,812460,592950,
576650,486780,604320,253030,744660,514350,1002600,744160,
774731,848130,811800,443080,568600,722350,673900,60,605420,
540630,379670,797200,767810,892560,346250,826530,515020,
588530,516670,220,656770,586110,809290,593210,417860,
676470,644730,753090,629390,705870,507210,689830,535660,
517620,636930,1012510,721930,533910,436340,861400,761560,
550160,946960,708410,529670,665430,863220,551020,759300,
854330,559170,510950,737770,605850,626760,691570,618570,
713060,730550,465240,601980,493430,743000,591660,724180,
391270,738350,1013360,576790,70,607220,551780,943010,843070,
517160,698570,670860,553000,513050,916100,734330,725920,
526470,521860,566880,544510,457420,615650,868940,571500,
465430,673060,538580,536530,611120,537060,571340,501380,
568690,866040,320,989320,524880,778260,513760,601990,
912870,386690,898080,353360,544130,445130,477130,236390,
615460,1072000,223750,923820,715750,766110,678060,711440,
977450,991480,788540,462530,786390,556010,456180,537590,
543600,519940,335210,775850,491380,364450,437400,534690,
808550,750850,925000,953290,466720,366810,1031700,847900,
996170,844880,468700,885590,567130,768100,992310,519170,
834880,547040,703030,870890,225140,448280,457770,536210,
997180,1086240,915980,691930,498290,371300,604830,1045130,
503630,457380,544270,525910,591360,512500,530120,469650,
721090,701100,646200,452490,980740,564520,552770,17710,
911250,627990,501280,716430,348860,490830,478000,208600,
572660,1045590,705860,283160,916130,613220,856640,601770,
512630,646080,689710,723420,644670,613200,605860,698520,
578620,40800,826480,565030,525680,450360,455440,651090,
635040,542790,778490,888090,422860,454300,648390,589240,
608510,1048010,886250,510930,515700,447270,865200,874760,
554140,465940,633200,552440,847640,673070,793170,608000,
468530,972890,527580,1040430,501470,1510,852250,787830,
918710,649890,1041060,979100,471630,703480,552870,862520,
95700,424280,476480,512710,730230,494400,974840,574780,
524030,889580,563470,647990,616810,576720,646440,563160,
341060,587830,553510,343730,240,945310,599180,677380,
847650,953270,513790,673590,625470,622270,653150,513200,
491790,604530,319260,450540,503580,672640,866440,761530,
748000,760680,970980,538950,881070,476540,497820,1030470,
473910,635190,535650,552960,966620,429830,958680,654070,
522250,555880,529150,555110,242760,935120,529630,491800,
643000,700550,569370,552060,373330,708680,595990,696470,
576880,857890,2320,269170,500500,766650,687870,604940,
494380,1036850,523720,485780,682740,1070910,754010,602000,
495300,444930,779650,544530,639220,477800,270370,914450,
595490,634060,619550,382000,866540,1036650,527110,648380,
563550,504630,450740,567670,816580,916390,542960,644100,
894380,636450,510470,569640,771310,380140,434430,498510,440,
342260,720290,880270,495450,532270,620,453170,992490,619100,
524120,564980,613040,461320,630760,396030,446770,910210,
464440,518720,982010,469960,1002920,457800,1300,504650,
702000,881800,538660,638920,219680,705830,994610,614010,
692960,624460,591790,455160,523090,826510,909080,657200,
890880,439260,396750,801610,863170,412360,989540,448710,
982830,438100,447100,969280,450630,841870,665880,605450,
642700,749180,748190,591680,945640,584080,528550,550360,
763860,722180,459010,1018100,738780,621780,225160,999880,
730360,676990,250820,436320,526730,559010,585940,451980,
250600,517910,585270,968310,457860,927070,1057130,536390,
604300,362890,744810,755120,870300,631300,1049400,556520,
547850,593400,520720,981310,645340,584850,892900,680430,
610990,860730,636590,535010,489160,925160,567730,490490,
13520,619020,630510,600140,720140,571890,673080,460510,
420020,693990,422100,672560,812810,992080,663220,528690,
956880,607590,970800,457660,1028170,436490,1067900,1038270,
422500,875480,883700,856300,630630,665200,394820,547280,
574190,757380,746160,464940,668490,793880,565940,535190,
856780,517400,978970,781040,592920,467660,452710,400,659310,
605810,573990,999830,796970,491230,960320,670270,673450,
1070420,646360,558770,541890,629410,494550,1072080,970210,
905460,748060,968940,572000,501240,768160,895540,905180,
612590,935110,493810,713320,550700,770990,921610,810150,
392230,506280,577290,573550,952250,563760,749490,645480,
808810,491100,529640,816540,898520,660520,372650,700370,
708580,682960,496190,712060,651080,531990,1021950,755540,
750350,974830,469990,544430,576620,736400,510740,560640,
404020,577210,632080,603630,2310,628530,1025710,553200,
610350,805560,665920,678830,522220,509540,791040,730090,40,
502820,449130,500360,738310,684380,560970,582030,859240,
238280,460450,889220,1030730,516990,355860,689210,539190,
583510,1030240,520010,740250,549880,566150,912880,672020,
510990,803010,530960,553050,977160,831590,592450,300,903760,
1024970,327140,516470,323680,527100,781320,844380,1089130,
646290,471160,49520,531060,510910,381940,627530,724910,
566530,877770,755770,1041420,500380,772680,910050,544010,
744080,550690,608190,608980,503170,652180,588290,760530,
602630,534180,912560,429180,720950,612790,592330,872440,
576840,812770,503410,557960,552460,605010,943170,602140,
445390,538410,1038420,925830,638110,570,845330,426610,
1005150,771920,620070,655620,944790,436110,963580,589180,
723610,700330,450390,646310,401970,579720,471660,595300,
495030,629220,411620,836300,672160,701010,436820,565440,
17300,1068620,389980,690690,525320,919420,614700,944900,
499540,628960,662470,647670,494480,738100,460980,34270,
563830,694550,569330,856620,639960,693660,714580,504990,
470490,493400,475190,451540,859220,219890,966870,625480,
868090,296710,530330,751690,341800,534720,494950,462910,
549360,483970,413620,954160,876110,1045020,329860,512410,
457580,485050,448980,735460,579050,612050,566780,9200,
594730,633750,805250,662500,564330,724870,636580,714780,
1014970,797390,466260,831450,642810,384990,534460,847790,
264710,509250,553590,459860,510130,468110,580410,967490,
585530,740850,407060,600650,748420,960130,639460,770090,
447960,537140,1002890,507130,833740,904820,871620,568800,
441370,693330,238210,960270,921520,846290,776140,567840,
588350,649880,409160,558980,518580,892170,509170,461180,
313630,222500,703060,983120,551960,883570,538710,580630,
623970,786490,552630,422630,436220,405480,703430,529110,
648870,693810,567270,831490,572130,457340,462480,919160,
896840,810760,814960,363460,1009990,664450,763260,579040,
555160,396060,575420,600580,617600,557730,765760,579970,
747300,1011000,720300,564310,692530,876340,525100,645280,
692060,1065110,541250,814700,624710,410390,503160,555170,
883290,525540,582210,831040,652980,731790,508580,678520,
464540,408520,676690,553450,646400,547750,651320,995720,
1004710,747210,642000,791220,550520,949390,576750,342180,
643870,850500,950770,360970,844060,622380,513280,774721,
687730,575180,484350,2450,712410,465950,418650,506180,
923460,774421,921620,503260,739960,950380,565730,852450,
632030,412740,499760,552230,665490,751550,582890,914030,
593090,686370,519030,484870,512080,867750,500580,677290,
726910,832080,914250,640250,548340,409020,542520,643610,
579600,582500,601090,637960,466900,379720,536230,867090,
833880,758360,607860,500920,718950,547440,601550,573360,
716900,519880,923030,713440,749630,671310,667480,1007360,
562170,573270,516940,695030,575220,534920,602010,708370,
716260,440120,680170,453000,529540,728110,523170,719950,
771740,785990,645140,964890,203810,596930,526750,398180,
399520,464400,457230,799300,875560,615960,681390,644660,
856070,538110,589460,495520,858900,657010,618350,871490,
890300,579080 ],
