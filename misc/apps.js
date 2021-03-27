//------------------------------------------------------------------------------ print_achievement_page
print_achievement_page = (account, appid = 710780, text = '<html><head><style>.td1 { background-color: white; font-weight: bold; } .td2 { background-color: #C1C1C1; font-weight: italic; } body { font-color: #123123; background-color: #333333; }</style></head><body>\n<table border="1">') =>
  http_request(account, 'my/ajaxgetachievementsforgame/' + appid, {}, (body) => (
    Cheerio.load(body)('div.achievement_list_item').each((i, item) =>
      text += "\n  <tr>\n    <td><img src=\"" + item.children[1].attribs.src + "\" width=\"48\" length=\"48\"></td>\n"
        + '    <td class="td1">' + appid + '_' + item.attribs['data-statid'] + '_' + item.attribs['data-bit'] + '</td>\n'
        + '    <td class="td2">' + item.children[3].children[1].children[0].data + '</td>\n'
        + '  </tr>'),
    text += '\n</table>\n</body></html>',
    fs.writeFileSync(appid + '.html', text),
    console.log(text))),
//------------------------------------------------------------------------------ check_appid_duplicates
array_duplicates = (array, sorted_arr = array.slice().sort(), results = []) => (
  [...Array(sorted_arr.length-1).keys()].forEach((item, i) =>
    (sorted_arr[i+1] == sorted_arr[i]) &&
      results.push(sorted_arr[i])),
  results);
check_appid_duplicates = () =>
  console.log('fakersd.length: ' + data.faker_apps.length
    + '\nnot_faking.length: ' + data.not_faking.length
    + array_duplicates(profile.game_favorite.slots[0].map((game) => parseInt(game.match(/\d+/)[0]))
      .concat(profile.game_collector.slots[0]).concat(profile.game_collector.slots[1])
      .concat(profile.game_collector.slots[2]).concat(profile.game_collector.slots[3])
      .concat(profile.review.slots[0]))),
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