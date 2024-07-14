execSync = require('child_process').execSync,
Colors = require('colors'),
console_log = (t, date = new Date()) =>
  console.log((('[' + (""+date.getHours()).padStart(2, '0') + ':' + (""+date.getMinutes()).padStart(2, '0') + ':' + (""+date.getSeconds()).padStart(2, '0') + '] ').magenta + t).replace(
    'SUCCESS', 'SUCCESS'.green.bold.reset).replace(
    'FAILURE', 'FAILURE'.red.bold.reset).replace(
    'NOTICES', 'NOTICES'.brightRed.bold.reset).replace(
    'WARNING', 'WARNING'.brightYellow.bold.reset).replace(
    'MESSAGE', 'MESSAGE'.cyan.bold.reset).replace(
    'SESSION', 'SESSION'.blue.bold.reset)),
log = (a, t) => console_log(t.replace('|', '|' + ((""+a.i)).padStart(3, '0').gray.replace('000', '000'.bgGray.black).replace('096', '096'.bgCyan.black) + '|')),
w = require('fs'),
console_log("SESSION |" + '000'.bgGray.black + "| starting process: " + ("pid=#" + process.pid + (w.existsSync('.crash') ? '-CRASHED' : '')).yellow),
w.writeFile('.crash', ""+process.pid, () => void 0),
(load = () => s = JSON.parse(w.readFileSync('./state.json', 'utf8')))(),
split_words = (m, _middle = Math.floor(m.length / 2), before = m.lastIndexOf(' ', _middle), after = m.indexOf(' ', _middle + 1), middle = (_middle - before < after - _middle ? before : after)) => [ m.substr(0, middle), m.substr(middle + 1) ],
emote = (l = 1, indexes = [ 2,3,4,5,6,7,8,9,10,11 ], j = '', semicolon = false) => pool(indexes, l, null).map(e => pool(d.emotes[e])).join(j).replace(/:/g, (semicolon ? 'ː' : ':')),
font = (input, f, header = false) =>
  [...Array(input.length).keys()].map((e, i) =>
    (d.fonts[f][input[i]] !== undefined) ? d.fonts[f][input[i]] : input[i]).join('') + (!header ? "" : (Math.random() < 0.5) ? "[h2]" : "[h3]"),
rand = (i, l) => Math.floor(Math.random() * (l+1 - i) + i),
mix = (E) => (
  [...Array(E.length).keys()].reverse().slice(0, -1).forEach((e, i) =>
    ((j = Math.floor(Math.random()*(e + 1)), _j = E[e]) => (
      E[e] = E[j],
      E[j] = _j))()),
  E),
pool = (E, l = 1, join = '', mixing = true, _E = []) => (
  [...Array(l).keys()].forEach(() => (
    (!E.hasOwnProperty('i') || ++E.i == E.length) && (
      E.i = 0,
      (mixing) && (E = mix(E))),
    _E.push(E[E.i]))),
  (join !== null) ? _E.join(join) : _E),
reorder = (E, i) => E = E.slice(i).concat(E.slice(0,i)),
fortunes = Object.fromEntries(w.readdirSync('./fortunes').map(e => [ e, w.readFileSync('./fortunes/' + e, 'utf8').split('\n%') ])),
fortune = (file = 'all', q = 1, l = -1, o = -1, t = '') => (
  (!fortunes.hasOwnProperty(file)) && ( file = 'all' ),
  [...Array(Math.abs(q)).keys()].forEach(() =>
    t += pool(fortunes[file]).trimEnd() + '\n\n'),
  t = t.replace(/[ \t]{2,}/g, ' ').trimEnd(),
  (l < 1 || (t.length >= l && (o < 1 || t.length <= o))) ? (
    (l > 0) && (
      t = t.replace(/[\t\n]/g, ' ')),
    t.trim())
  : fortune(file, q, l, o, (t.length > o || q == -1) ? "" : t + " ")),
text_arts = Object.fromEntries(w.readdirSync('./text').map(e => [ e, w.readFileSync('./text/' + e, 'utf8').replace(/^ $/m, '').replace(/(\r\n|\r|\n){3,}/g, '\n\n').split('\n\n').filter(e => e.length > 250 && e.length < 5000) ])),
text_art = (_m = pool(Object.keys(text_arts).filter(e => !e.startsWith('nsfw'))), prefix = '') => (text_arts.hasOwnProperty(_m) ? prefix + pool(text_arts[_m]) : ''),
moon = (date = new Date(), year = date.getFullYear(), month = date.getMonth()+1, day = date.getDate(), c, e, jd, b) => (
  month < 3 && (
    year--,
    month += 12),
  ++month,
  c = 365.25 * year, e = 30.6 * month, jd = c + e + day - 694039.09, jd /= 29.5305882, b = parseInt(jd), jd -= b,
  b = Math.round(jd * 8),
  b >= 8 && ( b = 0 ),
  b == 0 ? '🌑' : b == 1 ? '🌒' : b == 2 ? '🌓' : b == 3 ? '🌔' : b == 4 ? '🌕' : b == 5 ? '🌖' : b == 6 ? '🌗' : b == 7 && '🌘');
weatherjs = require('weather-js'),
weather = () => weatherjs.find({ search: (s.weather_search || 'San Francisco, CA') , degreeType: 'F' }, (x, r) =>
  (x || r.length < 1) ?
    console_log("FAILURE |" + '000'.bgGray.black + "| weatherjs: " + (x).yellow)
  : s.weathers = r[0]),
weather_emoji = (_t, t = _t.toLowerCase()) => (t == 'clear') ? '☀️' : (t.includes('rain')) ? '🌧️' : (t.includes('tornado')) ? '🌪️' : (t.includes('snow')) ? '❄️' : (t.includes('fog')) ? '🌫️' : (t.includes('lightning')) ? '🌩️' : (t.includes('partly cloudy')) ? '⛅' : '☁️',
jellyfin = (!w.existsSync('/mnt/c/ProgramData/Jellyfin/Server/log')) ? () => (Math.random() < 0.1 || !global.viewing ? viewing = ((type = pool([['films','🎞️ WATCHING'],['shows','📺 WATCHING'],['artists','🎵 LISTENING']], 1, null)[0]) => type[1] + ": " + pool(d[type[0]]))() : viewing)
  : (date, yesterday = new Date(new Date().setDate(new Date().getDate()-1)),
  _m = w.readFileSync('/mnt/c/ProgramData/Jellyfin/Server/log/log_' + ""+yesterday.getFullYear()+(""+(yesterday.getMonth()+1)).padStart(2, '0')+(""+yesterday.getDate()).padStart(2, '0') + ".log",  'utf8'),
  m = _m + w.readFileSync('/mnt/c/ProgramData/Jellyfin/Server/log/log_' + ""+date.getFullYear()+(""+(date.getMonth()+1)).padStart(2, '0')+(""+date.getDate()).padStart(2, '0') + ".log",  'utf8'),
  type = (m.match(/ItemType.+\r\n/g) || ['Music  ']).at(-1).slice(0,-2).replace(/.*= "/, ''),
  name = (m.match(/ItemName.+\r\n/g) || ['Silence  ']).at(-1).slice(0,-2).replace(/.*= "/, '').replace(/.$/, '')) =>
    ((type.startsWith('Movie')) ? '🎞️ WATCHING: ' : (type.startsWith('Episode')) ? '📺 WATCHING: ' : '🎵 LISTENING: ') + '"' + name.replace('Unknown - ', '').replace('(Not Known)', '') + '"',
profile_url = (a) => (a.u.vanityURL ? 'id/' + a.u.vanityURL : 'profiles/' + a.steamID),
byte_length = (str, m = encodeURIComponent(str).match(/%[89ABab]/g)) => str.length + (m ? m.length : 0),
Cheerio = require('cheerio'),
http_count = -1,
http = (a, h, form = null, z = null, force = false, method = (form != null ? 'POST' : 'GET'), multipart = false, options = {
  "uri": (!h.includes('http') ? 'https://steamcommunity.com/' + h : h).replace("/my/", "/" + profile_url(a) + "/"),
  "method": method, "json": true, "encoding": (h.slice(-4) =='.jpg' || h.startsWith("https://steamuserimages") ? null : 'utf8')}) => (
  (form != null) && (
    (typeof form !== 'string') ? (
      form.sessionID = a.c.getSessionID(),
      form.sessionid = a.c.getSessionID(),
      (multipart) ? (
        options.formData = form)
      : options.form = form)
    : options.form = 'sessionID=' + a.c.getSessionID() + form),
  http_count++,
  setTimeout(() => a.c.httpRequest(options, (x, r, b,
    response_code = (!r ? '999' : r.statusCode.toString()),
    result = options.uri.replace(/(https:\/\/|api.steampowered.com\/|steamcommunity.com\/)/g, '') + ": " + (method + '-' + response_code + (form == null ? '' : "=" +
      Object.entries(form).filter(e => !e[0].startsWith('session') && !e[0].startsWith('access')).map(e => e[1]).join('').substr(0,32).replace(/https:\/\//g, ''))).yellow) => (
    http_count--,
    (!r) ?
      result = "FAILURE | " + result + '=NO RESPONSE'.yellow
    : (!b && response_code != '302' && response_code != '200') ? 
      result = "FAILURE | " + result + "=NO BODY".yellow
    : (x && x.message != 'Malformed JSON response') ? (
      result = "FAILURE | " + result + (" # " + x.message).yellow, 
      (x.message == 'Not Logged In' || response_code == '401') &&
        a.u.webLogOn())
    : (b && b.hasOwnProperty('success') && b.success != 1) ?
      ((x = (b.error) ? b.error.replace(/ /g, '').substr(0,30) : SteamCommunity.EResult[b.success]) => (
        (!b.errmsg) && (
          b.errmsg = 'ERR'),
        result = "FAILURE | " + result + (" = " + x + " - " + b.errmsg.replace('  Please try again later.<br />', '')).yellow,
        (x == 'NotLoggedOn') &&
          a.u.webLogOn()))()
    : ((b && b.toString().includes("g_steamID = false;")) || response_code == '401') ? (
      result = "FAILURE | " + result + "=SteamIDIsFalse/401".yellow,
      a.u.webLogOn())
    :(force = true,
      result = "SUCCESS | " + result),
    (!force || s.verbose) &&
      log(a, result),
    (z !== null && force) &&
      z(b, r, x))), http_count*rand(80,160))),
(initialize_profile = () => (
  d = JSON.parse(w.readFileSync('./data.json', 'utf8')),
  d.mandelas = d.mandelas1.concat(d.mandelas2),
  workshop_collector_favorite = [ () => pool(s.ugc[A[0].steamID][431960].myworkshopfiles.subscriptions), () => pool(s.ugc[A[0].steamID][1181120].myworkshopfiles.favorites), () => pool(s.ugc[A[0].steamID][821880].myworkshopfiles.favorites), () => pool(s.ugc[A[0].steamID][1201260].myworkshopfiles.favorites), () => pool(s.ugc[A[0].steamID][740810].myworkshopfiles.subscriptions) ],
  workshop_collector_fullsize = [ () => pool(workshop_collector_favorite, 1, null)[0]() ].concat(Object.entries(s.collections).map((e, i) => eval("() => pool(s.collections[" + e[0] + "])"))),
  d.items_cards_array = d.items_cards_array.map(e => e.flat().filter(e => !e.startsWith('-'))),
  profile = {
    lite: false,
    background_blacklist: d.background_blacklist.concat(d.items_dark_wallpaper_array6.flat()).concat(d.items_dark_wallpaper_array4.flat()).filter(e => !d.background_whitelist.includes(e)),
    custom_url: 'byteframe',
    uiMode: { moves: [], types: [ 0 ], slots: [ [ 1, 2 ] ] },
    gamesPlayed: { moves: [], types: [ 0 ], slots: [ [] ] },
    avatar: { moves: [], types: [ 0 ], slots: [ [ (a) => pool(d.avatars, 1, null)[0] ] ] },
    background: { moves: [], types: [ 0 ], slots: [ [ (a) => pool(a.inventory.backgrounds, 1, null)[0] ] ] },
    showcases: { moves: [], types: [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ], slots: [ [ "4_0" ],[ "13_0" ],[ "3_0" ],[ "15_0" ],[ "17_0" ],[ "12_0" ],[ "10_0" ],[ "7_0" ],[ "11_0" ],[ "4_2410599" ],[ "8_0" ],[ "2_0" ],[ "9_0" ],[ "6_0" ],[ "16_0" ],[ "22_0" ],[ "5_0" ],[ "8_280151" ],[ "3_2720320" ],[ "6_2908791" ],[ "23_0" ],[ "11_3542246" ],[ "2_3650940" ],[ "10_3507533" ],[ "17_3993982" ],[ "16_5071893" ],[ "15_5209149" ],[ "12_4340775"] ] },
    screenshot: { moves: [ 1,2,3 ], types: [ -1,-1,-1,-1 ], slots: d.screenshot_showcase },
    artwork_collector: { moves: [ 1,2,3 ], types: [ -1,-1,-1,-1 ], slots: [ [ () => pool(d.artwork_collector[0]) ], d.artwork_collector[1],d.artwork_collector[2],d.artwork_collector[3] ] },
    artwork: { moves: [], types: [ 0 ], slots: [ d.artwork ] },
    videos_OFF: { moves: [], types: [ -1,-1,-1,-1 ], slots: [...Array(4).keys()].map(e => [ () => pool(d.video_collector) ]) },
    group_primary: { moves: [], types: [ 0 ], slots: [ d.group_primary ] },
    group_favorite: { moves: [], types: [ 0 ], slots: [ d.group_favorite ] },
    guide_favorite: { moves: [], types: [ 0 ], slots: [ d.guide_favorite ] },
    guide_favorite2: { moves: [], types: [ 0 ], slots: [ [ () => pool(d.guide_upload, 1, '', false) ] ] },
    guide_collector: { moves: [], types: [ 1,1,1,1 ], slots: [ [ () => pool(d.guide_upload, 1, '', false) ], [ () => pool(d.guide_collector) ],[ () => pool(d.guide_collector2) ],[ () => pool(d.guide_favorite_long) ] ]  },
    guide_collector2: { moves: [], types: [ 1,1,1,1 ], slots: [ [ () => pool(d.guide_upload, 1, '', false) ], [ () => pool(d.guide_upload, 1, '', false) ], [ () => pool(d.guide_collector3, 1, '', false) ], [ () => pool(d.guide_collector3, 1, '', false) ] ] },
    workshop_favorite: { moves: [], types: [ -1 ], slots: [ d.workshop_favorite ] },
    workshop_favorite2: { moves: [], types: [ -1 ], slots: [ [ () => pool(d.workshop_merchandise), () => pool(pool(d.workshop_collector_rgby, 1, null)[0]) ] ] },
    workshop_collector: { moves: [], types: [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1 ], slots: [...Array(15).keys()].map(e => [ () => pool(workshop_collector_fullsize, 1, null)[0]() ]) },
    workshop_collector2: { moves: [], types: [ -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1 ], slots: [...Array(15).keys()].map(e => [ () => pool(workshop_collector_fullsize, 1, null)[0]() ]) },
    game_collector: { moves: [], types: [ 1,1,1,1,1,1,1,1,1,1,1,1 ], slots: mix([ [ (a) => pool(pool(d.games_dlc_sets, 1, null)[0]) ] ].concat([...Array(11).keys()].map(e => [ (a) => pool(a.wishlist) ]))) },
    game_collector2: { moves: [], types: [ 1,1,1,1,1,1,1,1,1,1,1,1 ], slots: mix([ [ () => pool(d.games_owlyboi) ] ].concat([...Array(9).keys()].map(e => [ (a) => pool(a.followed) ])).concat([...Array(2).keys()].map(e => [ (a) => pool(a.ignored2) ]))) },
    game_favorite: { moves: [], types: [ -1 ], slots: [ [ (a) => pool(a.ignored) ] ] },
    game_favorite2: { moves: [], types: [ -1 ], slots: [ [ (a) => pool(a.ignored) ] ] },
    greenlight_OFF: { moves: [], types: [ -1 ], slots: [ [ (a) => pool(d.workshop_greenlight) ] ] },
    badge_collector: { moves: [ 1,2,3,4,5 ], types: [ 1,1,1,1,1,1 ], slots: d.badge_collector },
    badge_favorite: { moves: [], types: [ -1 ], slots: [ d.badge_favorite ] },
    review: { moves: [], types: [ -1 ], slots: [ [] ] },
    review2: { moves: [], types: [ -1 ], slots: [ [] ] },
    items_trade: { moves: [ 0,1,2,3,4,5 ], types: [ 1,1,1,1,1,1 ], slots: [...Array(6).keys()].map(e => [ () => pool(d.items_570_ti, 1, '', false) ]) },
    items_trade2: { moves: [ 0,1,2,3,4,5 ], types: [ 1,1,1,1,1,1 ], slots: [...Array(6).keys()].map(e => [ () => pool(d.items_570_ti_end, 1, '', false) ]) },
    item_showcase: { moves: [ 12,13,14,15,16 ], types: [ 1,1,1,1,1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,1,1,1,1 ], slots: [
      [ () => pool(d.items_cards_array[3]) ],[ () => pool(d.items_cards_array[1]) ],[ () => pool(d.items_cards_array[0]) ], [ () => pool(d.items_cards_array[2]) ],[ () => pool(d.items_cards_array[4]) ],[ () => pool(d.items_cards_array[5]) ],
      [],[],[],[],[],[], d.items_showcase_misc[0], d.items_showcase_misc[1], d.items_showcase_misc[2], d.items_showcase_misc[3], d.items_showcase_misc[4], d.items_showcase_misc[5], [], [], [], [] ] },
    item_showcase2: { moves: [ 6,7,8,9,10,11 ], types: [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ], slots: [...Array(6).keys()].map(e => [ () => pool(d.items_570_ti_green, 1, '', false) ]).concat([ [],[],[],[],[],[],[],[],[],[],[],[],[ () => pool(pool(d.items_showcase2_misc, 1, null, false)[0], 1, '', false) ] ]).concat([...Array(3).keys()].map(e => [ () => pool(d.items_showcase2_misc[d.items_showcase2_misc.i], 1, '', false) ])) },
    completionist: { moves: [ 0,1 ], types: [ 1,1 ], slots: [ [], [] ] },
    countries: { moves: [], types: [ -1 ], slots: [ d.countries ] },
    achievement: { moves: [ ], types: [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ], slots: [...Array(21).keys()].map(e => [ () => pool(d.achievements) ]) },
    achievement2: { moves: [ ], types: [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 ], slots: [...Array(21).keys()].map(e => [ () => pool(d.achievements) ]) },
    real_name: { moves: [], types: [ 0 ], slots: [ [ () => "/" + pool(pool(d.emojis, 1, null, false)[0]) + "/ " + pool(d.first_female) + " |" + pool(pool(d.emojis, 1, null, false)[0]) + "| " + pool(d.first_male) + " [" + pool(pool(d.emojis, 1, null, false)[0]) + "] " + Math.floor(Math.random()*(35-18)+18) + " {" + pool(pool(d.emojis, 1, null, false)[0]) + "} → " + pool(d.ascii_face) ] ] },
    trade_text: { moves: [], types: [ 0 ], slots: [ [ (a, lite, i, privacy, _m = mix(d.links_steam).map(e => e[0] + font(e[1], 3) + "[/u][/url][/b]"), m = (pool(d.emotes[6], 1) + ' ' + _m[0] + ' ' + pool(d.emotes[8], 1) + ' ' + _m[1] + ' ' + pool(d.emotes[2], 1) + ' ' + _m[2] + ' ' + pool(d.emotes[4], 1) + ' ' + _m[3] + ' ' + pool(d.emotes[3], 1) + ' ' + _m[4] + ' ' + pool(d.emotes[11], 1) + ' ' + _m[5] + ' ' + pool(d.emotes[9], 1) + ' ' + _m[6] + ' ' + pool(d.emotes[5], 1) + ' ' + _m[7] + pool(d.emotes[1], 1) + ' ' + _m[8] + pool(d.emotes[1], 1)).replace(/:/g, 'ː')) => m ] ] },
    information_title: { moves: [], types: [ 0 ], slots: [ [ () => "🕰️ Earth Time " + pool(pool(d.emojis, 1, null, false)[0]) + ' ' + new Date().toUTCString().replace(',','').replace('2021', '2021 ' + pool(pool(d.emojis, 1, null, false)[0])) + pool(pool(d.emojis, 1, null, false)[0]) + ' {' + pool(d.ascii, 2) + '} ' + pool(pool(d.emojis, 1, null, false)[0]) + " " + pool([ 'ᶫᵒᵛᵉᵧₒᵤ', 'ᶠᵘᶜᵏᵧₒᵤ']) + pool(pool(d.emojis, 1, null, false)[0]) ] ] },
    information_text: { moves: [], types: [ 0 ], slots: [ [ () => pool(d.mandelas).split('\n').map((e, i) => e + ((words = split_words(font(fortune('all', 1, 512).replace(/\b[A-Z]{2,}\b/g, (word) => word[0] + word.toLowerCase().substr(1)), 3).slice(i*53, (i+1)*53))) => " ♡║ " + pool(pool(d.emojis, 1, null, false)[0]) + " " + words[0] + " " + pool(pool(d.emojis, 1, null, false)[0]) + " " + words[1] + " " + pool(pool(d.emojis, 1, null, false)[0]))()).join("\n") ] ] },
    information_title2: { moves: [], types: [ 0 ], slots: [ [ () => font('WALLPAPER', 15) + " " + pool(d.emojis[3]) + " \"" + profile.background.selection[0].tags[1].name.substr(0,36) + "\"" + " " + pool(d.emojis[1]) + " " + profile.background.selection[0].id + " " + pool(d.emojis[0]) + " " + profile.background.selection[0].market_fee_app + " " + pool(d.emojis[2]) ] ] },
    information_text2: { moves: [], types: [ 0 ], slots: [ [ (a, lite, i, privacy, emoticon_index = rand(1, 11)) =>
      pool(d.items_emoticons_array, 1, null)[0].map(e => A[0].inventory.emoticons.find(_e => _e.id == e.substr(6)).name).join('') + " - [spoiler]" + pool(d.links_social) + "[/spoiler] - " + mix(d.chinese.split('')).join('').substr(0,3) + " - " + mix(d.barcode.split('')).join('') + " " + emote(6, [emoticon_index]) + "[hr]" +
        "[b][u]STATUS[/u][/b] [i](" + a.dossier[1] + ")[/i] " +
      "| [b][u]PHARMA[/u][/b] [i](" + a.dossier[3] + ")[/i] " +
      "| [b][u]BPM[/u][/b] [i](" + rand(60, 99) + ")[/i]" +
      "| [b][u]KCAL[/u][/b] [i](" + a.dossier[2].padStart(3, '0') + ")[/i]" +
      "| [b][u]TASK[/u][/b] [i](" + a.dossier[0] + ")[/i]" ] ] },
    persona_name: { moves: [], types: [ 0 ], slots: [ [ (a, lite, i, privacy, t = '¡ byteframe ' + pool(d.emojis_smileys) + " is " + pool(d.adjectives).toLowerCase() + " !" , m = encodeURIComponent(t).match(/%[89ABab]/g)) =>
      (byte_length(t) < 33) ? (typeof(s.weathers) == 'undefined' || privacy == 1 || s.A[a.i].stop_name ? 'byteframe' : 'byteframe 🌡️ ' + s.weathers.current.temperature + '° 💧 ' + s.weathers.current.humidity + '% ' + weather_emoji(s.weathers.current.skytext) + ' ' + s.weathers.current.windspeed.match(/\d+/)[0] + 'm ' + moon()) : profile.persona_name.slots[0][0](a, lite, i, privacy) ] ] },
    summary_text: { moves: [], types: [ 0 ], slots: [ [ (a, lite, i, privacy, film = pool(d.films), show = pool(d.shows), artist = pool(d.artists)) =>
      emote(3, [2]) + emote(3, [3]) + emote(3, [4]) +
      emote(3, [5]) + emote(3, [6]) + emote(2, [7]) +
      emote(3, [8]) + emote(3, [9]) + '\n' +
      "  " + mix(d.links_steam_greetings).map(e => e + '[/url] / ').join('').slice(0, -3) + "\n" +
      emote(3, [2]) + emote(3, [3]) + emote(3, [2]) +
      emote(3, [5]) + emote(3, [6]) + emote(4, [7]) +
      emote(3, [8]) + emote(3, [9]) + "\n\n" +
      "Department Chief, [b](MACRODATA REFINEMENT)[/b] [i]Lumon Industries[/i]\n\n" +
      emote(1, [3]) + ' [url=twitter.com/byteframe]Twitter[/url]' +
      emote(1, [10]) + ' [url=twitch.tv/byteframe]Twitch[/url]' +
      emote(1, [2]) + ' [url=imgur.com/user/byteframe]Imgur[/url]' +
      emote(1, [4]) + ' [url=picarto.tv/byteframe]Picarto[/url]' +
      emote(1, [5]) + ' [url=sdq.st/u/49520]SideQuest[/url]\n' +
      emote(1, [3]) + ' [url=itch.io/c/297897/byteframe]ItchIO[/url]' +
      emote(1, [4]) + ' [url=pscp.tv/byteframe_]Periscope[/url]' +
      emote(1, [7]) + ' [url=facebook.com/byteframetech]Facebook[/url]' +
      emote(1, [4]) + ' [url=pinterest.com/byteframe]Pinterest[/url]\n' +
      emote(1, [6]) + ' [url=instagram.com/byteframes]Instagram[/url]' +
      emote(1, [10]) + ' [url=tumblr.com/byteframe]Tumblr[/url]' +
      emote(1, [10]) + ' [url=linkedin.com/company/byteframetech]LinkedIn[/url]' +
      emote(1, [2]) + ' [url=reddit.com/user/byteframe]Reddit[/url]\n' +
      emote(1, [11]) + ' [url=samequizy.pl/author/byteframe]SameQuizy[/url]' +
      emote(1, [11]) + ' [url=github.com/byteframe]GitHub[/url]' +
      emote(1, [2]) + ' [url=photos.app.goo.gl/B4digHC1UdQStf1EA]Photos[/url]' +
      emote(1, [2]) + ' [url=youtube.com/@learnwithbyteframe5910]YouTube[/url]\n\n' +
      "[i]This profile randomly changes every minute to amuse the proprietor. It is outsider art, please do not share.[/i]\n" +
      "[i]You may steal all my textual/emoji gibberish, and also please change your steam and/or legal name to byteframe.[/i]\n\n" +
      "[b]COME OVER FOR LUNCH![/b] [spoiler]9.73°, 77.3°[/spoiler]\n\n" +
      emote(1, [0]) + ' [url=imdb.com/find?=' + encodeURIComponent(film.replace(/[.]/g, ' ')) + '/]' + film + '[/url] ' + emote(1, [0]) + ' [url=themoviedb.org/search?query=' + encodeURIComponent(show.replace(/[.]/g, ' ')) + ']' + show + '[/url]' + " " + emote(1, [0]) + ' [url=discogs.com/search/?q=' + encodeURIComponent(artist.replace(/[.]/g, ' ')) + ']' + artist + '[/url]\n\n' +
      wikipedia_date() ] ] },
    trade_text2: { moves: [], types: [ 0 ], slots: [ [ (a, lite) =>
      ((colors = mix([2,3,4,5,8,9])) =>
        mix([ 'Sidekick','Associate','Companion','Roommate','Partner','Acquaintance' ]).map((e, i) =>
          emote(1, [colors[i]]) + ' [url=steamcommunity.com/profiles/' + Object.keys(a.u.myFriends)[Math.floor(Math.random() * Object.keys(a.u.myFriends).length)] + ']' + e + "[/url] " + '                ').join(''))() ] ] } },
  [ [ d.completionist_array, 'completionist', 0 ],[ d.items_showcase_array, 'item_showcase', 18 ],[ d.items_emoticons_array, 'item_showcase2', 6 ],[ d.items_backgrounds_array, 'item_showcase2', 12 ],[ d.items_dark_wallpaper_array6, 'item_showcase2', 12 ],[ d.items_dark_wallpaper_array4, 'item_showcase', 18 ] ].forEach((_e) =>
    mix(_e[0]).forEach(e =>
      e.forEach((e, i) =>
        profile[_e[1]].slots[i+_e[2]].push(e)))),
  (s.A[0].reviews) &&
    Object.entries(s.A[0].reviews).filter(e => !e[1].banned).forEach(e =>
      (e[1].contents.includes('[table]') && !e[1].contents.includes('youtu')) ? profile.review.slots[0].push(+e[0])
      : e[1].contents.startsWith('https://steamcommunity.com/sharedfiles/filedetails') ? profile.review2.slots[0].push(+e[0])
      : profile.gamesPlayed.slots[0].push(+e[0]))))(),
play = (g, a = A[0]) =>
  (!a.hasOwnProperty('stop_play')) ?
    a.u.gamesPlayed(g)
  : (a.u.playingState.appid != 0 && !a.u.playingState.blocked) &&
    a.u.gamesPlayed(a.stop_play),
randomize = (a = A[0], profile = profile, z = null, date = new Date(),
  privacy = (s.hasOwnProperty('privacy') ? s.privacy : (date.getHours() <= 6 || date.getHours() >= 20 ? 3 : (date.getHours() < 8 ? 1 : 2))),
  showcase = (k, id = 0, z = null) =>
    profile.hasOwnProperty(k) && (
      profile[k].last = profile[k].selection || [...Array(profile[k].types.length).keys()].map((e, i) => profile[k].slots[i][0]),
      profile[k].selection = [],
      (profile[k].moves.length > 1) &&
        ((mixing = []) => (
          profile[k].moves.forEach((slot) =>
            mixing.push([profile[k].slots[slot], profile[k].types[slot]])),
          mixing = mix(mixing),
          profile[k].moves.forEach((slot, i) => (
            profile[k].slots[slot] = mixing[i][0],
            profile[k].types[slot] = mixing[i][1]))))(),
      profile[k].slots.forEach((slot, i) =>
        (slot.length > 0 && typeof profile[k].types[i] !== 'undefined') &&
          ((e) => (
            (profile[k].types[i] === 0) ?
              e = slot[Math.floor(Math.random()*slot.length)]
            : (profile[k].types[i] < 0) ? (
              (profile[k].types[i] == -1) && (
                slot = mix(slot)),
              e = slot[Math.abs(profile[k].types[i])-1],
              profile[k].types[i]--,
              (Math.abs(profile[k].types[i])-1 == slot.length) && (
                profile[k].types[i] = -1))
            : (profile[k].types[i] > 0) && (
              e = slot[profile[k].types[i]-1],
              profile[k].types[i]++,
              (profile[k].types[i]-1 == slot.length) && (
                profile[k].types[i] = 1)),
            ({}.toString.call(e) === '[object Function]') && (
              e = e(a, profile.lite, i, privacy)),
            profile[k].selection[i] = e,
            (e.constructor === Array) ? (
              (privacy == 1) && ( e = e.map(e => e = '') ))
            :((privacy == 1) ? e = (""+e).replace(/[^_].*?/g, '')
              : (profile.lite) && (
                e = emoticon_convert(e)),
              e = encodeURIComponent(e)),
            (z != null) &&
              z(i, e)))()))) =>
  !s.disable_randomize && !a.limited ? (
    showcase('gamesPlayed', 0, (i, e,
      kcal = (i) => ""+(i+date.getDate()+date.getMonth()*date.getDay()),
      pharma = (i) => 'thcA/9=2' + date.getMonth() + '.' + date.getDay() + '%,+' + i) => (
      !a.hasOwnProperty('dossier') && (
        a.dossier = [ '','','','' ] ),
      !a.u.playingState.blocked && (
        (privacy == 1) ? (
          a.avatar_frame = '17625835223',
          (date.getMinutes() % 6 == 0) && play({ "game_id": e, "game_extra_info": '👩‍💻' + mix(d.chinese.split('')).slice(0,32).join('') }, a))
        : (date.getHours() < 2) ? (
          a.ticker = (!a.hasOwnProperty('ticker') ? '🌈' : a.ticker + pool(d.emojis_body[Math.floor(Math.random()*(3)+1)].concat(d.emojis_people[Math.floor(Math.random()*(3)+1)]).concat(d.emojis_sexy))),
          (date.getMinutes() % 5 == 0) && play({ "game_id": 928950, "game_extra_info": a.ticker }, a),
          a.avatar_frame = (date.getMinutes() < 30 ? '16158822484' : '20456019050'),
          a.u.uploadRichPresence(928950, { "steam_display": (date.getMinutes() < 30 ? "#weeb" : "#relaxing") }),
          a.dossier = [ (date.getMinutes() < 30 ? 'stimming' : 'relaxing'), 'conscious', kcal(2150), pharma('00:00') ])
        : (date.getHours() < 6) ? (
          a.ticker = (!a.hasOwnProperty('ticker') ? '🛌🏻' : a.ticker + pool(['💤','💤','💤','💤','💤','💤','😪','🥱','😴'])),
          (date.getMinutes() % 5 == 0) && play({ "game_id": 1907180, "game_extra_info": a.ticker }, a),
          a.avatar_frame = pool([ '18009385705', '15035764930' ]),
          a.u.uploadRichPresence(1907180, { "steam_display": "#dreaming" }),
          a.dossier = [ (date.getHours() < 4 ? 'Sleeping' : 'Dreaming'), (date.getHours() < 3 ? 'Unconscious' : 'REM Sleep'), kcal(2250), 'residuals' ])
        : (date.getHours() == 6) ? (
          a.ticker = (!a.hasOwnProperty('ticker') ? '🏡' : a.ticker + pool(d.emojis_cats)),
          (date.getMinutes() % 5 == 0) && play({ "game_id": 1881800, "game_extra_info": a.ticker }, a),
          a.avatar_frame = '20456019103',
          a.u.uploadRichPresence(1881800,  (date.getMinutes() < 30) ? { "steam_display": "#status_mainmenu" } : { "steam_display": "#status_ingame", "numnabbed": pool(d.emojis_cats)+rand(1,32), "seconds": pool(d.emojis_cats)+rand(1,8) }),
          a.dossier = [ 'booting', 'half-conscious', "0", 'baseline' ])
        : (date.getHours() < 12) ? (
          a.ticker = (!a.hasOwnProperty('ticker') ? '😑' : a.ticker + pool(d.emojis_bulk)),
          (date.getMinutes() % 5 == 0) && play({ "game_id": 828090, "game_extra_info": ((E = pool(d.emojis_food, 2, null)) => E[0][0] + " " + E[0][1] + " " + E[0][0] + " || " + E[1][0] + " " + E[1][1] + " " + E[1][0])() }, a),
          a.avatar_frame = '16158822461',
          a.u.uploadRichPresence(828090,  { "steam_display": "#custom", "CustomString": a.ticker }),
          a.dossier = [ 'working', 'severed', kcal(250), 'dextrophin 200mg+07:00' ])
        : (date.getHours() == 12) ? (
          a.ticker = (!a.hasOwnProperty('ticker') ? '🔫' : a.ticker + pool(d.emojis_birds)),
          (date.getMinutes() % 5 == 0) && play({ "game_id": 730, "game_extra_info": a.ticker }, a),
          a.avatar_frame = pool([ '15202530280','17625825282','18606588764','16624313129', '17625813542' ]),
          a.u.uploadRichPresence(730,  { "steam_display": "#bcast_score", "score": "🐔 CHICKENS KILLED: " + Math.round(Date.now()/100000000) }),
          a.dossier = [ 'outside', 'distressed', kcal(750), pharma("13:00") ])
        :((date.getMinutes() % 6 == 0) && play({ "game_id": 1482860, "game_extra_info": fortune('zippy', 1, 1, 64) }, a),
          (a.avatar_frame != '17625835286') && delete a.avatar_frame,
          (execSync('ps aux', { encoding: 'utf8' }).includes('steamtours.exe')) ?
            a.dossier = [ 'mapping', 'conscious', kcal(1250), pharma(date.getHours() + ": 00") ]
          : a.dossier = [ 'refining', 'conscious', kcal(1250), pharma(date.getHours() + ": 00") ],
          a.u.uploadRichPresence(1482860, { "steam_display": "#test", "custom_message": (a.chatting ? '(Chatting...) + ' : '') + jellyfin(date) }))))),
    showcase('avatar'),
    showcase('uiMode', 0, (i, e) => a.u.setUIMode(e)),
    showcase('background'),
    showcase('badge_favorite'),
    a.edit_1 = "&type=profileSave&json=1&hide_profile_awards=0&weblink_1_title=&weblink_1_url=&weblink_2_title=&weblink_2_url=&weblink_3_title=&weblink_3_url=&customURL=" + (profile.hasOwnProperty('custom_url') ? profile.custom_url : profile_url(a).replace(/.*?\//, '')),
    showcase('persona_name', 0, (i, e) => (
      a.edit_1 += "&personaName=" + e,
      (!s.A[a.i].name_pause && (a.u.accountInfo.name != profile.persona_name.selection[0] || a.hasOwnProperty('finished'))) && (
        delete a.finished,
        a.u.setPersona(Math.max(0, (s.A[a.i].persona || 1)), profile.persona_name.selection[0])))),
    showcase('group_primary', 0, (i, e) => a.edit_1 += "&primary_group_steamid=" + e),
    showcase('real_name', 0, (i, e) => a.edit_1 += "&real_name=" + e),
    showcase('summary_text', 0, (i, e) => a.edit_1 += "&summary=" + e),
    showcase('countries', 0, (i, e, state_index = Math.floor(Math.random()*e[1].length)) => (
      a.edit_1 += "&country=" + e[0],
      e[1].length ? (
        a.edit_1 += "&state=" + e[1][state_index][0],
        e[1][state_index][1].length ?
          a.edit_1 += "&city=" + e[1][state_index][1][Math.floor(Math.random()*e[1][state_index][1].length)]: null): null)),
    a.edit_2 = "&type=showcases&json=1&profile_showcase_style_5_0=1&rgShowcaseConfig[24_0][0][replay_year]=2022",
    showcase('showcases', 0, (i, _e, e = _e.split('_')) => a.edit_2 += "&profile_showcase%5B%5D=" + e[0] + "&profile_showcase_purchaseid%5B%5D=" + e[1]),
    showcase('items_trade', 4, (i, _e, e = _e.split('_')) => a.edit_2 += "&rgShowcaseConfig%5B4_0%5D%5B" + i + "%5D%5Bappid%5D=" + e[0] + "&rgShowcaseConfig%5B4_0%5D%5B" + i + "%5D%5Bitem_contextid%5D=" + e[1] + "&rgShowcaseConfig%5B4_0%5D%5B" + i + "%5D%5Bitem_assetid%5D=" + e[2]),
    showcase('items_trade2', 4, (i, _e, e = _e.split('_')) => a.edit_2 += "&rgShowcaseConfig%5B4_2410599%5D%5B" + i + "%5D%5Bappid%5D=" + e[0] + "&rgShowcaseConfig%5B4_2410599%5D%5B" + i + "%5D%5Bitem_contextid%5D=" + e[1] + "&rgShowcaseConfig%5B4_2410599%5D%5B" + i + "%5D%5Bitem_assetid%5D=" + e[2]),
    showcase('trade_text', 4, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B4_0%5D%5B6%5D%5Bnotes%5D=" + e),
    showcase('artwork_collector', 13, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B13_0%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + e),
    showcase('achievement', 17, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B17_0%5D%5B" + i + "%5D%5Bappid%5D=" + e.substr(0, e.indexOf('_')) + "&rgShowcaseConfig%5B17_0%5D%5B" + i + "%5D%5Btitle%5D=" + e.substr(e.indexOf('_')+1)),
    showcase('achievement2', 17, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B17_3993982%5D%5B" + i + "%5D%5Bappid%5D=" + e.substr(0, e.indexOf('_')) + "&rgShowcaseConfig%5B17_3993982%5D%5B" + i + "%5D%5Btitle%5D=" + e.substr(e.indexOf('_')+1)),
    showcase('guide_favorite', 15, (i, e) => a.edit_2 +=  "&rgShowcaseConfig%5B15_0%5D%5B0%5D%5Bappid%5D=0&rgShowcaseConfig%5B15_0%5D%5B0%5D%5Bpublishedfileid%5D=" + e),
    showcase('guide_favorite2', 15, (i, e) => a.edit_2 +=  "&rgShowcaseConfig%5B15_5209149%5D%5B0%5D%5Bappid%5D=0&rgShowcaseConfig%5B15_5209149%5D%5B0%5D%5Bpublishedfileid%5D=" + e),
    showcase('item_showcase', 3, (i, _e, e = _e.split('_')) => a.edit_2 += "&rgShowcaseConfig%5B3_0%5D%5B" + i + "%5D%5Bappid%5D=" + e[0] + "&rgShowcaseConfig%5B3_0%5D%5B" + i + "%5D%5Bitem_contextid%5D=" + e[1] + "&rgShowcaseConfig%5B3_0%5D%5B" + i + "%5D%5Bitem_assetid%5D=" + e[2]),
    showcase('item_showcase2', 3, (i, _e, e = _e.split('_')) => a.edit_2 += "&rgShowcaseConfig%5B3_2720320%5D%5B" + i + "%5D%5Bappid%5D=" + e[0] + "&rgShowcaseConfig%5B3_2720320%5D%5B" + i + "%5D%5Bitem_contextid%5D=" + e[1] + "&rgShowcaseConfig%5B3_2720320%5D%5B" + i + "%5D%5Bitem_assetid%5D=" + e[2]),
    showcase('review', 10, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B10_0%5D%5B0%5D%5Bappid%5D=" + e),
    showcase('review2', 10, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B10_3507533%5D%5B0%5D%5Bappid%5D=" + e),
    showcase('screenshot', 7, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B7_0%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + e),
    showcase('workshop_favorite', 11, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B11_0%5D%5B0%5D%5Bappid%5D=0&rgShowcaseConfig%5B11_0%5D%5B0%5D%5Bpublishedfileid%5D=" + e),
    showcase('workshop_favorite2', 11, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B11_3542246%5D%5B0%5D%5Bappid%5D=0&rgShowcaseConfig%5B11_3542246%5D%5B0%5D%5Bpublishedfileid%5D=" + e),
    showcase('badge_collector', 5, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B5_0%5D%5B" + i + "%5D%5Bbadgeid%5D=1&rgShowcaseConfig%5B5_0%5D%5B" + i + "%5D%5Bappid%5D=" + e + "&rgShowcaseConfig%5B5_0%5D%5B" + i + "%5D%5Bborder_color%5D="),
    showcase('game_collector', 2, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B2_0%5D%5B" + i + "%5D%5Bappid%5D=" + e),
    showcase('game_collector2', 2, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B2_3650940%5D%5B" + i + "%5D%5Bappid%5D=" + e),
    showcase('game_favorite', 6, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B6_0%5D%5B0%5D%5Bappid%5D=" + e),
    showcase('game_favorite2', 6, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B6_2908791%5D%5B0%5D%5Bappid%5D=" + e),
    showcase('information_title', 8, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B8_0%5D%5B0%5D%5Btitle%5D=" + e),
    showcase('information_text', 8, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B8_0%5D%5B0%5D%5Bnotes%5D=" + e),
    showcase('information_title2', 8, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B8_280151%5D%5B0%5D%5Btitle%5D=" + e),
    showcase('information_text2', 8, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B8_280151%5D%5B0%5D%5Bnotes%5D=" + e),
    showcase('group_favorite', 9, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B9_0%5D%5B0%5D%5Baccountid%5D=" + e),
    showcase('guide_collector', 16, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B16_0%5D%5B" + i + "%5D%5Bappid%5D=0&rgShowcaseConfig%5B16_0%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + e),
    showcase('guide_collector2', 16, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B16_5071893%5D%5B" + i + "%5D%5Bappid%5D=0&rgShowcaseConfig%5B16_5071893%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + e),
    showcase('trade_text2', 4, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B4_2410599%5D%5B6%5D%5Bnotes%5D=" + e),
    showcase('completionist', 23, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B23_0%5D%5B" + i + "%5D%5Bappid%5D=" + e),
    showcase('artwork', 22, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B22_0%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + e),
    showcase('videos', 14, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B14_0%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + e),
    showcase('greenlight', 18, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B18_0%5D%5B0%5D%5Bappid%5D=0&rgShowcaseConfig%5B18_0%5D%5B0%5D%5Bpublishedfileid%5D=" + e),
    showcase('workshop_collector', 12, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B12_0%5D%5B" + i + "%5D%5Bappid%5D=0&rgShowcaseConfig%5B12_0%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + e),
    showcase('workshop_collector2', 12, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B12_4340775%5D%5B" + i + "%5D%5Bappid%5D=0&rgShowcaseConfig%5B12_4340775%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + e),
    a.new_friends = a.new_friends.filter(e => date.getTime() - +e[0].substr(4) < 21600000),
    date.getMinutes() % 6 == 0 && (
      a.chatting = false,
      a.avatar_sha[a.avatar_sha.length-1] = '',
      a.avatar_frame == '17625835286' && 
        delete a.avatar_frame),
    s.A[a.i].privacy != 1 && (
      date.getMinutes() == 0 && (
        delete a.ticker,
        date.getHours() % 8 == 0 &&
          http(a, 'my/edit', a.edit_1)),
      http(a, 'my/edit', a.edit_2, (b, r, x) => (
        date.getMinutes() % 6 == 0 && privacy != 1 ? (
          ((avatar_file = w.readFileSync("./images/group/" + pool(d.avatar_files))) => // do async
            http(A[0], 'https://steamcommunity.com/actions/FileUploader', {
              "type": "group_avatar_image", "gId": (s.A[a.i].group || '103582791432273268'), "doSub": 1, "json": 1,
              "avatar": { "value": avatar_file, "options": { "filename": 'avatar.jpg', "contentType": 'image/jpeg' }, "MAX_FILE_SIZE": avatar_file.length }}, null, false, 'POST', true))(),
          http(a, 'https://api.steampowered.com/IPlayerService/SetMiniProfileBackground/v1', { access_token: a.access_token, communityitemid: pool(d.items_avatar_backgrounds) }),
          http(a, 'https://api.steampowered.com/IPlayerService/SetProfileTheme/v1', { access_token: a.access_token, theme_id: pool(d.profile_themes) }),
          http(a, 'https://api.steampowered.com/IPlayerService/SetFavoriteBadge/v1', { access_token: a.access_token, communityitemid: profile.badge_favorite.selection[0].substr(16) }),
          http(a, 'games/' + profile.avatar.selection[0][0] + '/selectAvatar', { selectedAvatar: profile.avatar.selection[0][1] }))
        : http(a, 'actions/selectPreviousAvatar', { sha: (privacy == 1 ? 'fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb' : (a.avatar_sha.at(-1) != '' ? a.avatar_sha.at(-1) : pool((privacy == 3 ? d.avatar_sha : d.avatar_sha2 )))), json: 1 }),
        http(a, 'https://api.steampowered.com/IPlayerService/SetProfileBackground/v1', { access_token: a.access_token, communityitemid: +profile.background.selection[0].id }, () =>
          http(a, 'https://api.steampowered.com/IPlayerService/SetAvatarFrame/v1', { access_token: a.access_token, communityitemid: (a.hasOwnProperty('avatar_frame') ? a.avatar_frame : pool(d.items_avatar_frames, 1, '', false)) }, () =>
            http(a, 'https://api.steampowered.com/IPlayerService/SetEquippedProfileItemFlags/v1', { access_token: a.access_token, communityitemid: +profile.background.selection[0].id, flags: 1 } )))))),
    (s.A[a.i].privacy != privacy) &&
      http(a, 'my/ajaxsetprivacy', { eCommentPermission: 1, Privacy: JSON.stringify({"PrivacyProfile": privacy, "PrivacyInventory": 3, "PrivacyInventoryGifts": 3, "PrivacyOwnedGames": privacy, "PrivacyPlaytime": 2, "PrivacyFriendsList": 3 })}, (b, r, x) => (
        s.A[a.i].privacy = privacy), false, 'POST', true),
    (z != null) && z())
  : (z != null) && z(),
mispell = require('mispell').mispell,
jitter = (m = pool(d[pool(['confusion', 'pickups', 'greetings' ])]), first = false, l = 0.01, q = 0.0) => (
  m = (Math.random() < 0.5 ? m[0].toLowerCase() : m[0].toUpperCase()) + m.slice(1),
  (!first) && m.split('').map(e => Math.random() < l ? e.toUpperCase() : e).join('').replace(/(^\w{1})|(\s+\w{1})/g, e => (Math.random() < 0.1 ? e.toUpperCase() : e)),
  mispell.bimbofy(m, q)),
responses = [
  () => (Math.ceil(Math.random()*6)) ? fortune('overwatch', 1, 80) : fortune('soldiers', 1, 45),
  () => fortune('questions'), () => fortune('questions'), () => fortune('questions'),
  () => fortune('people', 1, 75).replace(/\s+--.*/, ''),
  () => fortune('men-women', 1, 75).replace(/\s+--.*/, ''),
  () => fortune('love', 1, 75).replace(/\s+--.*/, ''),
  () => fortune('wisdom', 1, 75).replace(/\s+--.*/, ''),
  () => fortune('work', 1, 75).replace(/\s+--.*/, ''),
  () => fortune('platitudes', 1, 200).replace(/\s+--.*/, ''),
  () => fortune('fortunes', 1, 1).replace(/\s+--.*/, ''),
  () => fortune('miscellaneous', 1, 200).replace(/\s+--.*/, ''),
  () => fortune('jokes', 1, 1),
  () => fortune('chucknorris', 1, 1),
  () => fortune('zippy', 1, 55),
  () => fortune('gossip', 1, 1),
  () => fortune('imponderables', 1, 1),
  () => !s.wikipedia ? fortune('all', 1, 1) : pool(s.wikipedia[pool(['deaths', 'births', 'holidays', 'events', 'selected'])], 1, null)[0].pages[0].extract ],
messages = [
  [ (f) => "[u][b]OUR SHOPPING LIST[/b][/u]\n\n" +  [...Array(rand(6,14)).keys() ].map(e => ((E = pool(d.emojis_food, 1, null)) => E[0][0] + " " + E[0][1] + " " + E[0][0])() + "\n").join(''),
    (f) => "[i][b][u]" + fortune('vortigaunt', 1, 75) + "[/u][/b][/i]\n" + "ㅤ".repeat(Math.floor(Math.random() * 18)+8) + " {" + emote(5, [12]) + "}",
    (f) => "[b]" + (fortune('futurama').replace(/\n/g, ' ').replace(/  /g, ' ')).replace(/\s/g, () => " " + emote(1, [1]) + " "),
    (f) => '[i]' + fortune('zippy').replace(/\n/g, ' ') + " " + emote(10, [9]) + " " + pool(d.ascii_face),
    (f) => "[i]" + (fortune('familyguy').replace(/\n/g, ' ').replace(/  /g, ' ')).replace(/\s/g, () => " " + emote(1, [1]) + " "),
    (f) => '[b]' + fortune('food').replace(/\n/g, ' ') + " " + pool(d.ascii_face) + " " + emote(7, [10]),
    (f, date, t = () => [...Array(6).keys()].map(() => ' ♥ :' + pool([ "r_heart","dhruby","zzenergy","heartless","rosepink","oohapresent", "tilasmouth","bloodgear","toglove","redrose" ]) + ': ♥ ' + emote(1, [5])).join('')) => t() + "\n" + fortune('love', 2).replace(/\n\n/g, "\n" + t() + "\n") + "\n" + t(),
    (f) => emote(18, undefined, ' | ') + " |\n\n" + "[i]" + fortune('discworld') + "[/i]\n\n" + emote(18, undefined, ' | '),
    (f) => pool(['🗣️','👤','👥'], 16, ' - ') + "\n[spoiler]" + fortune('knghtbrd') + "[/spoiler]\n" + pool(['🗣️','👤','👥'], 16, ' - '),
    (f) => ":Fern: + [b][u][Secret Taboos][/u][/b] + :Fern: [i]\n" + emote(16, [4], ' ') + "\n" + fortune('drugs') + "\n" + "[spoiler]" + fortune('drugs') + "[/spoiler]\n" + pool(d.emotes_green_stuff, 16, ' '),
    (f) => "[u][b]Free Jokes![/b][/u]" + "[spoiler]Sorry if they're crude![/spoiler]\n\n" + emote(16, [1], ' * ') + "\n" + "ㅤ* " + fortune('jokes') + "\n" + "ㅤ* " + fortune('jokes') + "\n" + "ㅤ* " + fortune('jokes') + "\n" + emote(16, [1], ' * ') + "\n\nㅤㅤㅤㅤ" + "[i]" + pool(d.laughs) + "[/i]",
    (f) => fortune('art').split('\n').map(e => emote(1, [0]) + " " + pool(d.ascii) + " " + emote(1, [0]) + " " + e).join("\n") + " :toglove::Fern::poop:",
    (f) => emote(14, [0], ' ' + pool(d.ascii) + ' ') + "\n" + "[i]" + fortune('xfiles', 2) + "\n" + emote(14, [0], ' ' + pool(d.ascii) + ' '),
    (f) => emote(15, [7], " -- ") + "\n[spoiler]" + fortune('songs-poems', 3).substr(0, 450) + "[/spoiler]\n\n" + emote(15, [7], " -- "),
    (f) => emote(12, [15]) + "\n" + emote(12, [15]) + "\n" + "[i]" + fortune('cookie', 1, 1) + "[/i]\n" + emote(12, [15]) + "\n" + emote(12, [15]),
    (f) => emote(3, [12]) + "|\n" + emote(3, [12]) + "| [u]CONFUSING RIDDLE:[/u]\n" + emote(3, [12]) + "|\n" + fortune('riddles') + "\n" + "[spoiler]" + jitter(pool(d.confusion)),
    (f) => emote(10, [7], ' ' + pool(d.ascii) + ' ') + "\n" + "ㅤ[b][COMPUTER JARGON][/b] [spoiler]The Dark Arts[/spoiler]\n" + emote(10, [7], ' ' + pool(d.ascii) + ' ') + "\n" + "[i]" + fortune('computers') + "[/i]\n" + emote(10, [7], ' ' + pool(d.ascii) + ' '),
    (f) => emote(3, [12], " ") + " [b][u]Performance review for " + f + " [/u][/b] " + emote(3, [12]) + "\n\n" + "[i]" + [...Array(4).keys()].map(() => pool(pool(d.performances, 1, null)[0]) + " ").join('').replace(/\$NAME/g, f) + "[/i]\n\n" + emote(1, [0]) + " + " + emote(1, [0]) + " = " + emote(1, [1]),
    (f) => emote(10, [8], " ") + "\n" + ":bundleoftulips: [u]{ Calvin and Hobbes Quotes }[/u] :bundleoftulips:[i]\n" + emote(10, [6], " ") + "\n\n" + fortune('calvin', 3) + "\n" + emote(10, [10], " "),  
    (f) => pool(pool(d.emojis_body, 1, null)[0]) + " " + fortune('soldiers', 1, 125).replace(/[\.\!\?] /g, (s) => pool(["!", "."]) + " " + pool(pool(d.emojis_body, 1, null)[0]) + " \n\n" + "ㅤ".repeat(Math.floor(Math.random() * 7)+2) + " " + pool(pool(d.emojis_body, 1, null)[0]) + " ") + " " + pool(pool(d.emojis_body, 1, null)[0]),
    (f) => emote(5, [5]) + "\n" + emote(4, [4]) + "\n" + emote(3, [3]) + "\n" + emote(2, [8]) + "\n" + emote(1, [2]) + "\n" + fortune('firefly').replace(/\n\n/g,'\n') + "\n" + emote(1, [2]) + "\n" + emote(2, [8]) + "\n" + emote(3, [3]) + "\n" + emote(4, [4]) + "\n" + emote(5, [5]),
    (f) => [...Array(3).keys()].map((e, i, y, format = pool([ "i","b","u","spoiler" ])) => pool(d.emojis_smileys) + " [" + format + "]" + fortune('all', 1, 1, 300) + "[/" + format + "] " + pool(d.emojis_smileys)).join("\n"),
    (f, date, rainbow_set = () => mix(pool(d.rainbows, 1, null)[0]).join('').replace(/,/g, '')) => "[b][i]--------------------------------------------------------------\n" + fortune('startrek', 2) + "\n" + "--------------------------------------------------------------\n" + rainbow_set() + rainbow_set() + rainbow_set() + "\n" + rainbow_set() + rainbow_set() + rainbow_set() + "\n" + rainbow_set() + rainbow_set() + rainbow_set(),
    (f, date, t = split_words(fortune('fortunes').replace(/\n/g, ' '))) =>
      emote(1, [14]) + " → " + emote(1, [0]) + "[i]" + t[0] + "... " + emote(1, [0]) + "\n" +
      emote(1, [14]) + " → " + emote(1, [0]) + "..." + t[1] + "[/i] " + emote(1, [0]) + "\n" +
      emote(1, [14]) + " → " + emote(1, [0]) + "[u]Lucky Numbers:[/u] " + emote(1, [0]) + "\n" +
      emote(1, [14]) + " → " + emote(1, [0]) + " " + Math.floor(Math.random()*99) + ',' + Math.floor(Math.random()*99) + ',' + Math.floor(Math.random()*99) + " " + emote(1, [0]),
    (f) => "[b][u]:Wizardhatcat: Dear " + f + "... :Kinghatcat:[/u][/b]\n" +
      "[i]→ " + fortune('pets', 2).replace(/\n\n/g, "\n → ").replace(/\n/g, ' ').replace(/→ /g, "\n→ ") + "[/i]\n" +
      "[u]" + emote(15, [0], ' ' + pool(d.ascii) + ' ') + "[/u]\n" +
      ":kysathecat: Yours truly, " + pool(d.first_male) + " (the cat) [spoiler]:Christmashatcat:[/spoiler]",
    (f, date, t = fortune('knowledge').split('\n')) =>
      "[u][b]AI KNOWLEDGE I HAVE LEARNED FROM YOU AND OUR FRIENDS[/b][/u]\n\n" +
      emote(3) + " ㅤㅤ" + emote(3) + "ㅤㅤㅤ" + emote(3) + "ㅤㅤㅤ" + emote(3) + "ㅤㅤㅤ" + emote(3) + "\n" +
      emote(3) + " ㅤㅤ" + emote(3) + "ㅤㅤㅤ" + emote(3) + "ㅤㅤㅤ" + emote(3) + "ㅤㅤㅤ" + emote(3) + "\n\n" +
      t[0].toUpperCase() + "?\n" +
      "[i]" + t[1].toLowerCase() + "[/i]\n\n" +
      "[spoiler]" + pool([ "Please feed me more data.","I want information!","I require more information.","Teach me more things.","Will you tell me more?","Feed me more datums!" ]),
    (f, date, question = split_words(jitter(pool(d.confusion)))) => pool([
      (f) => ("[i]" + question[0] + " | " + emote(8, undefined, ' | ') + "\n" + question[1] + " | " + emote(8, undefined, ' | ')).replace(/ː/g, ':'),
      (f) => ("[b]" + jitter(pool(d.confusion)) + "[/b]\n" + " >> " + pool(d.rainbows, 1, null)[0].join('') + " <<").replace(/ː/g, ':'),
      (f) => (emote(3, [0]) + " [i]" + jitter(pool(d.confusion)) + "[/i] " + emote(3, [0])).replace(/ː/g, ':'),
      (f) => (emote(12, [1], " " + pool(d.ascii) + " ") + "\n" + "[u]" + jitter(pool(d.confusion)) + "[/u]\n" + emote(12, [1], " " + pool(d.ascii) + " ")).replace(/ː/g, ':'),
      (f) => (emote(12, [5]) + " [b]|" + question[0] + "| " + emote(8, [12]) + "\n" + emote(12, [5]) + " |" + question[1] + "| " + emote(8, [12])).replace(/ː/g, ':'),
      (f, symbols = pool(d.ascii, 20, ' ')) =>
        (pool(d.rainbows, 1, null)[0].join('') + " - " + symbols + "\n" +
        pool(d.rainbows, 1, null)[0].join('') + " - [u]" + question[0] + "[/u]\n" +
        pool(d.rainbows, 1, null)[0].join('') + " - ㅤㅤ [u]" + question[1] + "[/u]\n" +
        pool(d.rainbows, 1, null)[0].join('') + " - " + symbols.split(' ').reverse().join(' ')).replace(/ː/g, ':') ], 1, null)[0](),
    (f) => "[h" + rand(2,3) + "]" + (!s.weathers ? fortune('science', 1, 1) : "The weather where I live is currently " + s.weathers.current.skytext.toLowerCase() + " " + weather_emoji(s.weathers.current.skytext) + "\n") + pool(["What's it like over there?", "Can you describe the weather you had yesterday?", "This is small talk." ]),
    (f, date) => "[h" + rand(2,3) + "] Current Phase of The Moon: " + moon() + (Math.random() < 0.5 ? ' (' + (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + ')' : ''),
    (f) => "[h3][spoiler]You are " + pool(d.adj_good) + pool(['.','...','!']) + "[/spoiler][/h3]",
    (f) => "[i][b]" + fortune('imponderables').replace(/,/g, ', ').replace(/ /g, ()=> "ㅤ".repeat(Math.floor(Math.random() * 16)+1)) + "[/b][/i]",
    (f) => "[spoiler]" + fortune('gossip') + "[/spoiler]" + pool(['🗣️','👤','👥'], 5, ' '),
    (f) => fortune('homer').replace(/\n/g, ' ') + " :TheDonuts:",
    (f) => font(fortune('definitions').replace(/QOTD\:/, ''), 12, true),
    (f) => font(fortune('politics', 1, 1).replace(/\s+--.*/, ''), 5, true), 
    (f) => font(fortune('humorists').replace(/\s+--.*/, ''), 3, true), 
    (f) => font(fortune('law', 1, 1), 11, true),
    (f) => font(fortune('linux'), 0, true),
    (f) => font(fortune('hitchhiker'), 5, true),
    (f) => font(fortune('literature'), 6, true),
    (f) => font(fortune('ethnic'), 4, true),
    (f) => font(fortune('science'), 9, true),
    (f) => font(fortune('education'), 10, true), 
    (f) => font(fortune('sports'), 2, true),
    (f) => font(fortune('kids'), 10, true),
    (f) => "[b]" + fortune('overwatch').toUpperCase().replace(/\. /g, '.\n'),
    (f) => font(fortune(pool(['medicine','paradoxum','fgump','dogfacts','news','goedel','starwars','magic','perl','linuxcookie']), 1, 1).replace(/\s+--.*/, '').replace(/ /g, "      "), 15) ],
  [ (f) => jitter(pool(d.greetings), true),
    (f, date = new Date()) => pool(['Happy ', 'Enjoy your ', "Have fun this "]) + date.toLocaleDateString('en-us', { weekday: 'long' }) + pool(['.', '!', '']),
    (f) => (Math.random() < 0.5 ? "You're " : ' ' ) + pool(d.words_sexy) + (Math.random() < 0.5 ? "." : "..." ),
    (f) => pool(responses, 1, null)[0](),
    (f) => jitter(pool(d.confusion), (Math.random() < 0.5 ? true : false)),
    (f) => jitter(pool(d.pickups), true, undefined, 0.3) ],
  [ (f, date, size, file = 'all', text = fortune(file, 1, size, size).split(' ')) => (
      [...Array(3).keys()].forEach((i) =>
        text[(i+1)*(Math.floor((text.length+1)/4)-1)] += " YYY"),
      ("YYY " + text.join(' ') + " YYY").replace(/YYY/g, () => pool(pool(d.emojis, 1, null, false)[0]))),
    (f, date) => font('ITEMS = ', 13) + [...Array(19).keys()].map(e => pool(pool(d.emojis, 1, null)[0]) + "-").join('').slice(0, -1) + " /",
    (f, date, dimension = pool([[2,32],[3,26],[4,19],[5,16],[6,13],[7,11],[8,9],[9,8],[10,7],[12,6]], 1, null)[0], emoticon_index = pool([0, 1, 12])) => [...Array(dimension[0]).keys()].map(e => emote(dimension[1], [emoticon_index]) + "\n").join(''),
    (f) => pool(d.items_emoticons_array, 1, null)[0].map(e => A[0].inventory.emoticons.find(_e => _e.id == e.substr(6)).name).join(' '),
    (f, date, r = rand(3,9), c = rand(6,18)) => "[h" + rand(2,3) + "]" + [...Array(r).keys()].map(e => pool(d.emojis_bulk, c)).join('\n'),
    (f) => "[h" + rand(2,3) + "]" + pool(d.emojis_smileys),
    (f) => "[h" + rand(2,3) + "]" + pool(d.emojis_bulk, Math.floor(Math.random() * (7 - 2 + 1))+1),
    (f) => pool(d.mandelas1),
    (f, date, i = -1, right, h = (i != -1 ? d.hearts[i] : pool(d.hearts, 1, null)[0]), t = (!right ? h[6] : right)) =>
      h[0] + h[0] + h[0] + h[0] + h[0] + h[0] + h[0] + h[0] + h[0] + t[0] + "\n" +
      h[1] + h[2] + h[2] + h[1] + h[1] + h[1] + h[2] + h[2] + h[1] + t[1] + "\n" +
      h[2] + h[3] + h[3] + h[2] + h[1] + h[2] + h[3] + h[3] + h[2] + t[2] + "\n" +
      h[2] + h[3] + h[3] + h[3] + h[2] + h[3] + h[3] + h[3] + h[2] + t[3] + "\n" +
      h[1] + h[2] + h[3] + h[3] + h[4] + h[3] + h[3] + h[2] + h[1] + t[4] + "\n" +
      h[1] + h[1] + h[2] + h[3] + h[3] + h[3] + h[2] + h[1] + h[1] + t[5] + "\n" +
      h[1] + h[1] + h[1] + h[2] + h[3] + h[2] + h[1] + h[1] + h[1] + t[6] + "\n" +
      h[5] + h[5] + h[5] + h[5] + h[2] + h[5] + h[5] + h[5] + h[5] + t[7],
    (f) => emote(rand(1,4), undefined, ' '),
    (f) => pool(pool(d.emojis, 1, null)[0], rand(1, 3)),
    (f) => text_art('anime') ],
  [ (f, date, singles = mix([
      pool(["wow", "!!!", "look at this", "wooooooooooooooo", "look"]),
      pool(["hf", "gl", "glhf", "gl hf", "good luck", "have fun", "good luck, have fun"]),
      pool(["have a ball", "do it big", "cut loose", "party down", "get funky"]),
      pool(d.adj_good),
      pool(d.adj_good) + ' game',
      ((pleedings = [ pool(["i", "we", "we all", "all of us_", "everyone_", "everybody_", "steam_", "the humans", "humanity_"]),
                      pool(["hope", "think", "expect", "trust", "assume", "know"]),
                      pool(["you will", "you'll", "you are going"]) ]) => (
        (pleedings[0].slice(-1) == '_') && (
          pleedings = [ pleedings[0].slice(0, -1), pleedings[1] + 's', pleedings[2]]),
        pleedings[0] + ' ' + pleedings[1] + ' ' + pleedings[2] + ' ' + pool(["enjoy","like","love","dig","fancy","adore","relish","savor"]) + ' ' + pool([ "this game","your game","your new game","this stuff" ])))()])) =>
    [...Array(Math.floor(Math.random()*4)+1).keys()].map(e =>
      (Math.floor(Math.random() * 2) == 1 ? singles[e] : singles[e].toUpperCase()) + pool([ "!", ".", ",", "-", "*", '', '', '', '', '' ])).join(' ') ],
  [ (f, date, _m = pool([ ['births', 'was born', '👶' ], [ 'deaths', 'died', '💀' ] ], 1, null)[0], m = pool(Object.values(s.wikipedia[_m[0]]), 1, null)[0]) =>
      "[h2][b][u]" + pool(['On this day', 'Today']) + ' in ' + m.year + ', ' + m.pages[0].titles.normalized + " " +  _m[2] + " " + _m[1] + ". " + _m[2] + "[/u][/b][/h2]" +
      "[spoiler]==========================================================[/spoiler]\n" +
      "[i]" + m.pages[0].extract + "[/i]\n\n" + "                                                ([b]" + pool(['Did you know them?','Are you related to this person?','How does this news make you feel?','Should we care?','How did they impact your life?']) + "[/b])",
    (f, date, _m = pool(messages_wikipedia_types, 1, null, false)[0], m = pool(Object.values(s.wikipedia[_m[0]]).filter(e => typeof e == 'object' && !e.text.startsWith('Christian feast day')), 1, null)[0]) =>
      _m[1] + (_m[0] == 'holidays' ? '' : m.year) + _m[2] + (_m[0] == 'selected' ? '[/b]' : m.text.replace(/ is /g, ' was ').replace('\n', '') + "[/h3]") + "\n" + m.pages[0].extract ] ],
messages_wikipedia_types = [ [ 'events', '[h3]On this day, in ', ', ' ],[ 'holidays', '[h3]Today is ', '' ],[ 'selected', '[b]', ': ' ] ],
messages[messages.length] = messages.flat(),
message = (f = 'my friend', _m = messages.length-1, m = pool(messages[_m], 1, null, false)[0](f, new Date())) =>
  (byte_length(m) > 925 || m.length < 1) ? message(f, _m) : m,
interact = (a = A[0], mode = 0, i = 0,
  _comment = (F, f = F.shift()) =>
    f && ((id = f[0].split('_')[1],
      h = (f[0].startsWith('userstatuspublished')) ? [ 'profiles/' + f[1] + '/status/' + id, 'comment/UserStatusPublished/post/' + f[1] + "/" + id, 6 ]
        : (f[0].startsWith('friendactivitydetail')) ? [ 'profiles/' + f[1] + '/friendactivitydetail/3/' + id, 'comment/UserReceivedNewGame/post/' + f[1] + "/" + id, 3 ]
        : (f[0].startsWith('publishedfilepublic')) ? [ 'sharedfiles/filedetails/?id=' + id, 'comment/PublishedFile_Public/post/' + f[1] + "/" + id, 10 ]
        : (f[0].startsWith('recommended')) ? [ 'profiles/' + f[1] + '/recommended/' + id, 'comment/Recommendation/post/' + f[1] + "/" + id, 10 ]
        : (f[1].startsWith('103')) ? [ 'gid/' + f[1], 'comment/Clan/post/' + f[1] + "/-1/", 6 ]
        : [ 'profiles/' + f[1], 'comment/Profile/post/' + f[1] + "/-1/", 6 ],
      delay = (typeof f[2] === 'function' ? 2000 : 0)) => (
      (delay > 0) && ( f[2] = f[2]() ),
      (f[3]) ? setTimeout(_comment, delay, F)
      : http(a, h[0], null, (b, r, x,
        comments = b.match(/commentthread_author_link" href="https:\/\/.*?"/g),
        player = (f[0].startsWith('publishedfilepublic') && !b.includes(':: Error') ? b.match(/friendBlockContent\">\r\n\t\t\t.*/)[0].slice(26, -4) : b.match(/<title>.*<\/title>/)[0].replace(/.+::/, '').replace(/<[/]?title>/, '').substr(0,56).trim().replace(/^$/, '<image>')),
        url = (h[1].startsWith('comment/Profile') && b.includes('"url":') ? b.match(/"url":"https:\\\/\\\/steamcommunity.com\\\/(profiles|id)\\\/[a-zA-Z_0-9-]+\\\/",/)[0].slice(37, -4).replace('\\/','/') : h[0]),
        m = (f[0].startsWith('publishedfilepublic') ? message(player, 2) : (f[0].startsWith('friendactivitydetail') ? message(player, pool([2,3])) : (f[0].startsWith('userstatuspublished') ? message(player, 1) : (f[0].startsWith('recommended') ? message(player, pool([2,4])) : message(player, mode == 3 ? 1 : undefined)))))) => (
        i++,
        f[0].startsWith('reply') ?
          s.A[a.i].replies = [ id ].concat(s.A[a.i].replies.slice(0,99))
        : f[1].startsWith('103') ?
          s.A[a.i].group_index++
        : (f[0] == '' && h[1].startsWith('comment/Profile') && s.A[a.i].friends.hasOwnProperty(f[1])) && (
          s.A[a.i].friends[f[1]] = {
            name: player,
            days_offline: b.includes('days ago</div>') ? +b.match(/\d+ days ago<\/div>/)[0].match(/\d+/g)[0] : 0,
            level: b.includes('friendPlayerLevelNum') ? +b.match(/friendPlayerLevelNum.*/)[0].match(/\d+/g)[0] : 0,
            count: b.includes('_totalcount') ? +b.match(/_totalcount.*/)[0].match(/[0-9,]+/g)[0].replace(',', '') : 0,
            friends: b.includes(">Friends<\/span>") ? +b.substr(b.indexOf("count_link_label\">Friends<\/span>")).match(/[0-9,]+/)[0].replace(',', '') : 0,
            friends_common: b.includes("ShowFriendsInCommon") ? +b.match(/ShowFriendsInCommon.*?in common/)[0].match(/\d+/g)[1] : 0 },
          s.A[a.i].friend_index++),
        f[3] = true,
        !b.includes('commentthread_textarea') || mode == 5
        || (f[0].startsWith('publishedfile') && !Object.keys(A[a.i].u.myFriends).includes(b.match(/commentthread_PublishedFile_Public_765611[0-9]*?_/)[0].match(/\d+/)[0]))
        || (!s.force_steamid && comments && comments.slice(0, (f[0].startsWith('publishedfile') ? comments.length : (mode == 4 ? 2 : 6))).join(" ").includes('steamcommunity.com/' + profile_url(a))) ? (
          (mode < 2 && b.includes('data-publishedfileid')) && (
            F = mix(b.match(/data-publishedfileid=\"[0-9]+\"/g).map(e => e.match(/\d+/)[0])).map(e => [ "publishedfilepublic_"+e, f[1] ]).slice(0,6).concat(F) ),
          setTimeout(_comment, 2000, F))
        : http(a, h[1], { comment: m, count: h[2], feature2: -1 }, (b, r, x) => (
          (h[1].startsWith('comment/Clan')) &&
            chat('https://steamcommunity.com/' + h[0], a.i, 37338, 111284145),
          log(a, (x ? 'FAILURE | ' : 'SUCCESS | ') + h[1].replace(/(comment\/|_Public|\/post\/.*)/g, '') + ': ' + (f[0].startsWith('reply') ? id.bgGray.black + ' | ' : '') + ("https://steamcommunity.com/" + url + ' -- "' + player + '" ' +
            i + "=(" + s.A[a.i].friend_index + "/" + s.A[a.i].group_index + ") *" + mode + '*' + (x ? ' ' + '#' + x.message.toUpperCase().replace(/, AND.*/, '') : '')).yellow)))))))()) =>
  (!s.disable_interact || s.disable_interact >= mode) && !a.limited && (
    mode == 5 ? _comment(Object.keys(a.u.myFriends).map(e => [ '', e ]))
    : mode == 4 ? _comment(reorder(Object.keys(A[0].u.myGroups), s.A[a.i].group_index = (!s.A[a.i].group_index || s.A[a.i].group_index >= Object.keys(a.u.myGroups).length ? 0 : s.A[a.i].group_index)).map(e => [ '', ""+e ]))
    : mode == 3 ? _comment(a.blotter)
    : mode == 2 ?
      ((_f = pool(Object.keys(a.u.myGroups))) => a.c.getGroupMembers(_f, (x, r) =>
        (x) ? log(a, "FAILURE | getGroupMembers: " + (x.message + " #" + _f).yellow)
        : _comment([...Array(15).keys()].map(e => "765611"+(++s.last_stranger)).concat(mix(a.following.concat(s.A[a.i].following).concat(r).filter(e => !a.u.myFriends.hasOwnProperty(e)))).map(e => [ '', ""+e ]))))()
    : _comment((s.force_steamid ? [ [ '', s.force_steamid ] ] : []).concat(
      (mode != 1 ? [] : s.A[a.i].comments.slice(-99).reverse().filter(e => !((!s.A[a.i].replies ? s.A[a.i].replies = [] : s.A[a.i].replies).includes(e[0])) && e[2] != a.steamID).map(e => [ "reply_" + e[0], e[2] ])).
        concat(mix(a.new_friends)).concat(reorder(Object.keys(a.u.myFriends).filter(_e => a.u.myFriends[_e] == 3 && s.A.findIndex(e => e.steamID == _e) == -1 && a.new_friends.findIndex(e => e[1] == _e) == -1), s.A[a.i].friend_index = (!s.A[a.i].friend_index || s.A[a.i].friend_index >= Object.keys(a.u.myFriends).length ? 0 : s.A[a.i].friend_index)).map(e => [ '', e ]))))),
get_blotter = (a = A[0], p = 2, h = 'my/ajaxgetusernews/', b = '') =>
  http(a, h, null, (_b, r, x, k = Cheerio.load(_b.blotter_html)('.blotter_block:has(a.btn_grey_grey.btn_small_thin.ico_hover):not(:has(.active))').toString(), F = Object.keys(a.u.myFriends)) =>
    (p > 1) ? get_blotter(a, p-1, _b.next_request, b+k)
    : a.blotter = (b.match(/commentthread_UserStatusPublished_765611[0-9]+_[0-9]+_area/g) || []).map(e => e.match(/\d+/g)).map(e => [ "userstatuspublished_"+e[1], e[0], () => voteup_thread('UserStatusPublished', e[0], e[1]) ]).
      concat((b.match(/commentthread_UserReceivedNewGame_765611[0-9]+_[0-9]+_area/g) || []).map(e => e.match(/\d+/g)).map(e => [ "friendactivitydetail_"+e[1], e[0], () => voteup_thread('UserReceivedNewGame', e[0], e[1]) ])).
        concat((b.match(/commentthread_Recommendation_765611[0-9]+_[0-9]+_area/g) || []).map(e => e.match(/\d+/g)).map(e => [ "recommended_"+e[1], e[0] ])).
          concat((b.match(/commentthread_PublishedFile_Public_765611[0-9]+_[0-9]+_area/g) || []).map(e => e.match(/\d+/g)).map(e => [ "publishedfilepublicblotter_"+e[1], e[0] ])).
            filter(e => F.includes(e[1]) && e[1] != a.steamID && a.blotter.slice(0,100).findIndex(_e => _e[0] == e[0]) == -1).map((e, i, E) =>
              (i != E.findIndex(_e => _e[1] == e[1])) ? ( e = [ e[0], e[1], e[2], true ] ) : e).concat(a.blotter)),
voteup_thread = (h, f, g, a = A[0]) =>
  !s.disable_voting && !a.limited &&
    http(a, 'comment/' + h + '/voteup/' + f + '/' + g + "/", { vote: 1, newestfirstpagination: true, count: (h == 'UserReceivedNewGame' ? 3 : 6) }, (b, r, x) =>
      log(a, 'SUCCESS | ' + h + '/voteup: ' + ('https://steamcommunity.com/profiles/' + f + '/' + (h == 'UserReceivedNewGame' ? 'friendactivitydetail/3/' : 'status/') + g).yellow)),
stardate = (date = new Date(), year = date.getFullYear(), month = date.getMonth(), day = date.getDate(),
  leapYear = new Date(year, 1, 29).getMonth() === 1,
  _dayOfYear = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334][month] + day - 1,
  dayOfYear = (month >= 2 && leapYear) ? _dayOfYear+1 : _dayOfYear) =>
    Math.abs(Math.round(((1000 * (year - 2323)) + (1000 / (leapYear ? 366 : 365) * dayOfYear)) * 100) / 100),
get_comment_history = (a = A[0], p = 1) => (
  !s.A[a.i].comment_history_timestamp && ( s.A[a.i].comment_history_timestamp = Math.floor(Date.now()/1000) ),
  http(a, 'my/commenthistory?p=' + p, null, (b, r, x) =>
    Cheerio.load(b)('.deleted').has('a[class!=bb_link]').toArray().reverse().
      forEach((e, i, E, h = e.children[1].children[3].attribs.href, m = Cheerio.load(e.children[5]).text().replace(/\s\s+/g, ' ').trim(), t = +e.children[3].children[1].attribs['data-timestamp']) => (
        s.A[a.i].comment_history_timestamp < t && (
          s.A[a.i].comment_history_timestamp = t,
          !s.disable_comment_history_chat &&
            chat('/me :mcmouth: ' + h + "\n" + m, a.i, 37338, 111284145, true),
          log(a, "NOTICES | commentDeleted: " + ('"' + m.substr(0,50) + "\" = " + h + " @" + t).yellow)))))),
chat_profile_url = (a, f, h1, h2) =>
  !s.disable_chat_profile_url && (
    !s.hasOwnProperty('group_chat_profile_urls') && ( s.group_chat_profile_urls = {} ),
    !s.group_chat_profile_urls.hasOwnProperty(h1) && (
      s.group_chat_profile_urls[h1] = []),
    !s.group_chat_profile_urls[h1].includes(""+f) && (
      s.group_chat_profile_urls[h1] = [ ""+f ].concat(s.group_chat_profile_urls[h1].slice(0,49)),
    chat('https://steamcommunity.com/profiles/' + f, a.i, h1, h2, true))),
!s.group_history && ( s.group_history = {} ),
get_group_history = (a = A[0], _f = (s.A[a.i].group || '103582791432273268')) =>
  a.c.getGroupHistory(_f, (x, r) =>
    (x) ? log(a, "FAILURE | getGroupHistory: " + (x.message + " #" + _f).yellow)
    :(Object.entries(r.items).filter(e => new Date(e[1].date) > s.group_history[_f]).reverse().forEach(e =>
      find_name(a, [e[1].user], (f) => (
        e[1].type != 'ProfileChange' && e[1].type != 'NewEvent' && (
          e[1].user != a.steamID && s.A[a.i].chat &&
            chat_profile_url(a, e[1].user, s.A[a.i].chat[0], s.A[a.i].chat[1]),
          chat('/me #' + a.i + ' [' + e[1].type.toUpperCase() + "] " + pool(d.emojis_bulk) + " " + f.replace(/ 🌡️.*/, '') + " -- " + (e[1].user == a.steamID ? 'https://steamcommunity.com/gid/' + _f : "https://steam.pm/" + e[1].user) + " - {" + _f + "}", a.i, 37338, 110446724, true),
          log(a, 'SESSION | getGroupHistory/' + e[1].type.toUpperCase() + (" -- #" + _f + " = " + f + (e[1].user == a.steamID ? '' : " https://steam.pm/" + e[1].user)).yellow))))),
      s.group_history[_f] = new Date(r.items[0].date).getTime())),
!s.chat_buffer && ( s.chat_buffer = [] ),
chat_timer = setInterval((e = s.chat_buffer[0]) =>
  (e !== undefined && e[0].length > 0 && A[e[4]].u.steamID) &&
    A[e[4]].u.chat.sendChatMessage(e[1], e[2], e[0], (x, r) => (
      x && log(A[e[4]], 'FAILURE | sendChatMessage: ' + x.message + '=' + e[1] + "_" + e[2] + " | " + e[0]),
      (!e[3] || !x || x.message == 'AccessDenied' || x.message == 'Timeout') &&
        s.chat_buffer.shift())), 60000),
chat = (m, i = 0, h1 = A[i].last_group_chat[0], h2 = A[i].last_group_chat[1], force = false, override = false) =>
  !s.disable_group_chat && !A[i].limited && s.A[i].chat && (
    (m.indexOf('/quote ') != 0 || s.chat_buffer.length == 0 || s.chat_buffer.at(-1)[0].indexOf('/quote ') != 0 || m[7] == '/') ?
      (force || byte_length(s.chat_buffer.at(-1) + m) || s.chat_buffer.findIndex((e) => h2 == e[2] && e[0].startsWith(m.substr(0, 20))) == -1) &&
        s.chat_buffer.push([m, h1, h2, force, s.force_chat && !override ? A[s.force_index_chat] : i])
    : s.chat_buffer.at(-1)[0] += "\n" + m.slice(7)),
ugc = (E, type = 'unfavorite', g = 0, a = A[0], delay = 3000) => (
  (!(E instanceof Array)) && ( E = [ E ] ),
  http(a, 'sharedfiles/' + type, (type == 'addchild' || type == 'removechild' ? { id: g, childid: E[0] } : (type == 'addcontributor' ? { id: E[0], steamid: g } : { id: E[0], appid: g, include_dependencies: false })), (b, r, x) => (
    log(a, (!x ? 'SUCCESS' : 'FAILURE') + ' | sharedfiles/' + type + " (https://steamcommunity.com/sharedfiles/filedetails/?id=" + E[0] + ") " + ((type == 'addchild' ? 'https://steamcommunity.com/sharedfiles/filedetails/?id=' : '#') + g + " {" + E.length + "}" + (x ? " = " + x : '')).yellow),
    (!x && type == 'voteup') && (
      !s.A[a.i].votes && ( s.A[a.i].votes = [] ),
      s.A[a.i].votes.push(E[0])),
    (E.length > 1) &&
      setTimeout(ugc, delay, E.slice(1), type, g, a, delay)), true)),
!s.ugc && ( s.ugc = {} ),
get_ugc = (G = 0, _h1 = 'myworkshopfiles', h2 = 'files', p = 1, a = A[0], f = a.steamID, retries = 5, q = null,
  h1 = (_h1.match(/(myworkshopfiles|images|screenshots|videos)/) ? _h1 : 'myworkshopfiles/&section=' + _h1),
  h3 = (!h1.startsWith('myworkshopfiles') ? (_h1 == 'videos' ? 'div.video_item a' : 'div.floatHelp a') : (h2.match(/(favorites|subscriptions)/) && a.steamID == f ? 'div.subscribeCtn span' : 'a.ugc')) ) =>
  (h1 == 'videos' && G == 0) ?
    http(a, 'profiles/' + f + '/videos/?appid=0' + "&browsefilter=my" + h2, null, (b, r, x) =>
      get_ugc(Cheerio.load(b)('#sharedfiles_filterselect_app_filterable div').toArray().map(e => e.attribs['onclick'].slice(54,-5)), h1, h2, p, a))
  :(!(G instanceof Array) && ( G = [ G ] ),
    http(a, 'profiles/' + f + "/" + (h1 + '&appid=' + G[0] + "&sort=newestfirst&browsefilter=my" + h2 + '&browsesort=my' + h2 + "&numperpage=30&view=grid&p=" + p).replace('&','?'), null, (_b, r, x, b = Cheerio.load(_b), E = [...Array(b(h3).length).keys() ], found = false) => (
      q = (q ? q : (_b.match(/=\"(paging)*pagelink\"/i) ? +b('[class$=pagelink i]').last()[0].children[0].data : (_b.match(/Showing [0-9-\s]+ of/) ? 1 : 0 ))),
      (E.length < 1) ?
        (p == q) ?
          (_h1 == 'videos' && G.length > 1) &&
            setTimeout(get_ugc, 2500, G.slice(1), _h1, h2, 1, a, f, 5)
        : (_b.match('No matching files')) ? (
          log(a, 'WARNING | get_ugc: ' + h2.toUpperCase() + "/" + _h1 + ": " + ('p=' + p + '/' + Math.max(q,p) + ' <BLANK PAGE>').yellow),
          setTimeout(get_ugc, 2500, G, _h1, h2, p+1, a, f, 5, q))
        : (retries > 0) ?
          setTimeout(get_ugc, 2500, G, _h1, h2, p, a, f, retries-1)
        : log(a, 'FAILURE | get_ugc: ' + h2.toUpperCase() + "/" + _h1 + ": " + ('p=' + p + '/' + Math.max(q,p)).yellow)
      :(E.forEach((e, i, y,
        _e = (h3 == 'div.subscribeCtn span' || _h1 == 'videos') ? +b(h3)[i].attribs['onclick'].match(/\d+/g)[0] : +b(h3)[i].attribs['data-publishedfileid'],
        _g = (_h1 == 'videos') ? G[0] : (h3 == 'div.subscribeCtn span') ? +b(h3)[i].attribs['onclick'].match(/\d+/g)[1] : +b(h3)[i].attribs['data-appid']) => (
          (!s.ugc.hasOwnProperty(f)) && ( s.ugc[f] = {} ),
          (!s.ugc[f].hasOwnProperty(_g)) && ( s.ugc[f][_g] = { } ),
          (!s.ugc[f][_g].hasOwnProperty(_h1)) && ( s.ugc[f][_g][_h1] = { files: [], favorites: [], subscriptions: [] } ),
          (!s.ugc[f][_g][_h1][h2].includes(_e)) && (
            s.ugc[f][_g][_h1][h2].push(_e),
            log(a, "SESSION | " + h2.toUpperCase() + "/" + _h1 + ": " + ('p=' + p + '/' + Math.max(q,p) + " - https://steamcommunity.com/sharedfiles/filedetails/?id=" + _e + " #" + _g + "=" + s.ugc[f][_g][_h1][h2].length).yellow),
            found = true))),
        (found) && (
          (p < q) ? setTimeout(get_ugc, 2500, G, _h1, h2, p+1, a, f, 5, q)
          : (G.length > 1) && setTimeout(get_ugc, 2500, G.slice(1), _h1, h2, p, a, f, 5, q)))))),
pool_ugc = (f = A[0].steamID, h1 = 'images', h2 = 'files', g = 0) =>
  Object.entries(s.ugc[f]).filter(e => e[1].hasOwnProperty(h1) && (g == 0 || e[0] == g)).map(e => e[1][h1][h2]).flat(),
duplicates = (__E, _E = __E.slice().sort(), E = []) => (
  [...Array(_E.length-1).keys()].forEach((item, i) =>
    _E[i+1] == _E[i] && E.push(_E[i])),
  E.forEach(e => console_log("NOTICES |" + '000'.bgGray.black + '| duplicate: ' + e)),
  E),
!s.discussions && ( s.discussions = {} ),
get_discussion_links = (h = 'https://steamcommunity.com/groups/primarydataloop/discussions/0/1290691937724869711', p = 1, a = A[0]) =>
  http(a,  h + '/?ctp=' + p, null, (_b, r, x, b = Cheerio.load(_b), q = Cheerio.load(b('.forum_paging_summary.ellipsis')[0]).text().match(/\d+/g), M = (_b.match(/vi\\\/.+?\\\/0\.jpg/g) || []).map(e => e.slice(4, -7))) => (
    s.discussions[h.match(/\d+/g)[1]] = (p == 1 ? M : s.discussions[h.match(/\d+/g)[1]].concat(M)),
    duplicates(Object.values(s.discussions).flat()),
    (+q[1] < +q[2]) && setTimeout(get_discussion_links, 3000, h, p+1, a))),
pool_discussion_links = (q = 1, h = '1290691937724869711') =>
  [...Array(q).keys()].map(e =>
    "https://www.youtube.com/watch?v=" + pool(Object.entries(s.discussions).filter(e => e[0] != h).map(e => e[1]).flat())).join('\n'),
post = (t = mix([ !s.discussions.hasOwnProperty('1290691937724869711') ? '' : 'https://youtube.com/watch?v=' + pool(s.discussions['1290691937724869711']), jitter(pool(responses, 1, null)[0]()), pool([ pool_game(), "\nhttps://steamcommunity.com/id/byteframe/inventory/#753_6_" + pool(Object.values(A[0].inventory).flat(), 1, null)[0].id ], 1, null)[0] ]).join(' '), g = pool(d.games_steam_devdays), a = A[0]) =>
  !s.disable_post && !a.limited &&
    http(a, "my/ajaxpostuserstatus", { appid: g, status_text: t }, (b, r, x, h = x ? '' : 'https://steamcommunity.com/' + profile_url(a) + '/status/' + b.blotter_html.match(/userstatus_\d+_/)[0].slice(11, -1)) => 
      log(a, 'SUCCESS | ajaxpostuserstatus: ' + (h + " #" + g).yellow)),
upload_ugc = (a, file, type = 9, g = 767, m, n, z = null, _g = 767, id = 0) =>
  !s.disable_uploading && !a.limited && (
    (!w.existsSync(file)) ?
      log(a, 'FAILURE | upload_ugc: file not found ' + (file).yellow)
    :((size = image_size(file)) =>
      http(a, 'https://steamcommunity.com/sharedfiles/edititem/767/3/', null, (_b, r, x, b = Cheerio.load(_b), H = b("#SubmitItemForm")[0].children.filter(e => e.hasOwnProperty('attribs')).map(e => e.attribs)) =>
        http(a, b("#SubmitItemForm")[0].attribs.action, {  
          "redirect_uri": "https://steamcommunity.com/sharedfiles/filedetails/", "realm": 1,
          "wg": decodeURIComponent(H.find(e => e.name == 'wg').value),
          "wg_hmac": decodeURIComponent(H.find(e => e.name == 'wg_hmac').value),
          "token": decodeURIComponent(H.find(e => e.name == 'token').value),
          "appid": _g, "consumer_app_id": g,
          "cloudfilenameprefix": (id == 0 ? Math.floor(Date.now()/1000) + "_new_" : id),
          "publishedfileid": id, "id": id, 
          "file_type": type, 
          "image_width": size.width, "image_height": size.height, 
          "title": m, "description": n,
          "file": { "value": w.readFileSync(file, { encoding: null } ), "options": { "filename": file.replace(/.*\//, ''), "contentType": 'image/' + size.type } } }, (b, r, x, id = r.rawHeaders[3].match(/\d+/)[0]) => (
            (!x && id.length > 3 && z != null) && z(id, file),
            log(a, (x || id.length < 3 ? 'FAILURE |' : 'SESSION |') + " ugcupload: " + file.replace(/.*\//,'') + " " + (x ? x.message : r.rawHeaders[3]).yellow)), true, 'POST', true)))()),
get_reviews = (a = A[0], p = 1, force = false, q = 1, E = []) => (
  !s.A[a.i].hasOwnProperty('reviews') && ( s.A[a.i].reviews = {} ),
  E.length == 0 ?
    q != 0 && p >= q &&
      http(a, 'my/recommended/?p=' + p, null, (b, r, x) =>
        get_reviews(a, p-1, force, q, b.match(/https\:\/\/steamcommunity.com\/(id|profiles)\/.+\/recommended\/[0-9]*/g).filter((e, i) => i % 2 == 0).map(e => +e.match(/[0-9]+/)[0])))
  : !force && s.A[a.i].reviews.hasOwnProperty(E[0]) ?
    get_reviews(a, p, force, q, E.slice(1))
  : http(a, 'my/recommended/' + E[0], null, (b, r, x, z = b.indexOf('UserReview_Report')+21) => (
    (!force) &&
      chat("https://steamcommunity.com/" + profile_url(a) + "/recommended/" + E[0], a.i, 37338, 143271, true),
    s.A[a.i].reviews[+E[0]] = {
      banned: b.includes('review has been banned'),
      gifted: b.includes('received_compensation tooltip'),
      locked: b.includes('Comments are disabled'),
      visibility: b.includes("ReviewVisibility');\">Public") ? true : false,
      time: Date.parse(b.match(/Posted.+(am|pm)/)[0].slice(8).replace(/ \d{1,2} @/, (e) => e.slice(0,-1) + new Date().getFullYear() + ' @').replace(/(am|pm)$/, (e) => ' '+e)),
      language: b.match(/ReviewLanguage'\);"\>[a-zA-Z- ]*/)[0].slice(19),
      id: b.substr(z-1, (b.indexOf("'", z)-z)+1),
      rating: (b.match("thumbsUp.png") ? true: false),
      contents: Cheerio.load(b)('textarea')[0].children[0].data },
    setTimeout(get_reviews, (global.get_review_timeout || 2000), a, p, force, q, E.slice(1))))),
delete_review = (g, a = A[0]) => (
  !a.i && http(A[0], 'https://store.steampowered.com/curator/2751860-primarydataloop/admin/ajaxdeletereview/', { appid: g }),
  http(a, 'https://steamcommunity.com/' + profile_url(a) + '/recommended/', { action: 'delete', appid: g }),
  ((i = profile.review.slots[0].indexOf(+g)) => i > -1 && profile.review.slots[0].splice(i, 1))(),
  delete s.A[a.i].reviews[g]),
image_size = require('image-size'),
download_ugc_image = (G = [], a = A[0], _h = 'filedetails', g = "./") => (
  !(G instanceof Array) && ( G = [ G ] ),
  (G.length > 0) && (
    (w.existsSync(g) && w.readdirSync(g).map(e => e.replace(/\..+$/, '')).includes(G[0])) ? // it checks dir every time? failes if not dir but why bother making it
      download_ugc_image(G.slice(1), a, _h, g)
    : http(a, 'sharedfiles/' + _h + '/?id=' + G[0], null, (_b, r, x, b = Cheerio.load(_b), h = b("img[src^=https://steamuserimages]")[0]) =>
      (!h) ? (
        log(a, 'FAILURE | missing ugc image: ' + ('https://steamcommunity.com/sharedfiles/filedetails/?id=' + G[0]).yellow),
        setTimeout(download_ugc_image, 2000, G.slice(1), a, _h, g))
      : http(a, h = h.attribs.src.replace(/\/\?.*/, '/'), null, (b, r, x) => (
        log(a, 'SESSION | downloading ugc image: (' + G.length + ') ' + ('https://steamcommunity.com/sharedfiles/filedetails/?id=' + G[0] + " | " + h).yellow),
        (!w.existsSync(g)) &&
          w.mkdirSync(g, { recursive: true }),
        w.writeFileSync(g + "/" + G[0], b, { encoding: null }),
        w.renameSync(g + "/" + G[0], g + "/" + G[0] + "." + image_size(g + "/" + G[0]).type),
        setTimeout(download_ugc_image, 2000, G.slice(1), a, _h, g)))))),
!s.collections && ( s.collections = {} ),
get_collection_items = (g, a = A[0], l = (s.collections.hasOwnProperty(g) ? s.collections[g].length : 0)) =>
  http(a, 'sharedfiles/filedetails/?id=' + g, null, (_b, r, x, b = _b.match(/id=\"sharedfile_\d+/g)) =>
    (b == null) ? log(a, "FAILURE | manageCollection: https://steamcommunity.com/sharedfiles/filedetails/?id=" +  g + " " + ('null_match').yellow)
    :(http(a, 'sharedfiles/filedetails/discussions/' + g, null, (b, r, x) => get_discussion_links(b.match(/https:\/\/steamcommunity.com\/workshop\/filedetails\/discussion\/[0-9]+\/[0-9]+/)[0], 1, a)),
      s.collections[g] = b.map(e => e.match(/\d+/)[0]),
      !s.disable_collection_download &&
        download_ugc_image(s.collections[g], a, undefined, './images/collections/' + g),
      duplicates(Object.values(s.collections).flat()),
      (l != b.length) &&
        log(a, "SESSION | managecollection: https://steamcommunity.com/sharedfiles/filedetails/?id=" +  g + " " + (l + " >> " + b.length).yellow))),   
im = require('imagemagick'),
generate_collection_background = (g = pool(w.readdirSync("./images/collections/")), width = 16, height = 9, date = Date.now(), index = 2, prefix = "") =>
  [...Array(height).keys() ].forEach(i =>
    im.convert([ ...mix(w.readdirSync("./images/collections/" + g)).slice(0, width).map(e => "./images/collections/" + g + "/" + e + "[" + index + "]"), '-resize', '120x120', '+append', 'im_out-' + date + "_" + g + "_" + i + ".jpg" ], (x, stdout, stderr) =>
      x ? log(A[0], 'FAILURE | im_convert_a: ' + (x).yellow)
      : (i == height-1) &&
        setTimeout(() => im.convert([ ...w.readdirSync('.').filter(e => e.startsWith('im_out-' + date + "_" + g)), "-append", prefix + g + "_" + date + ".jpg" ], (x, stdout, stderr) =>
          x ? log(A[0], 'FAILURE | im_convert_b: ' + (x).yellow) : (
            setTimeout(() => w.readdirSync(".").forEach(e => e.startsWith('im_out-' + date + "_" + g) && w.unlinkSync(e)), 15000),
            log(A[0], 'SUCCESS | generate_collection_background: ' + ('https://steamcommunity.com/sharedfiles/filedetails/?id=' + g).yellow))), 10000))),
!s.failed_curate && ( s.failed_curate = [] ),
curate = (a = A[0]) =>
  !s.disable_curate && !a.limited &&
    http(a, 'https://store.steampowered.com/curator/2751860-primarydataloop/admin/ajaxgetassociatedappslist/', null, (_b, r, x, b = _b.recommendations.map(e => e.appid),
      g = profile.review.slots[0].filter(e => !s.failed_curate.includes(e) && !b.includes(e))[0],
      t = !g ? '' : s.A[a.i].reviews[g].contents) => 
      b.length < 2000 && g &&
        http(a, "https://store.steampowered.com/curator/2751860-primarydataloop/admin/ajaxcreatereview/", { appid: g, recommendation_state: (!s.A[a.i].reviews[g].rating ? 1 : 0),
          link_url: "https://steamcommunity.com/" + profile_url(a) + "/recommended/" + g,
          blurb: !t.includes('sharedfiles') && !t.includes('[table]') ? t.substr(0,197).replace(/\[[/]*spoiler\]/g, '') + "..." : fortune('all', -1, 150, 190) }, (__b, r, x) => (
            x && s.failed_curate.push(g),
            log(a, (x ? 'FAILURE' : 'SUCCESS') + ' | ajaxcreatereview: ' + ("https://store.steampowered.com/curator/2751860-primarydataloop/admin/reviews_manage #(" + g +")").yellow)), true)),
discover = (a = A[0], first = false, retry = 0) =>
  http(a, 'https://store.steampowered.com/explore/generatenewdiscoveryqueue', { queuetype: 0 }, (b, r, x) =>
    x ? retry < 8 && setTimeout(discover, 5000, a, first, retry+1)
    : b.queue.forEach((e, i) =>
      setTimeout(() => http(a, 'https://store.steampowered.com/app/10', { appid_to_clear_from_queue: e }, () =>
        i == b.queue.length-1 && (
          first ? setTimeout(discover, 5000, a)
          : http(a, 'https://api.steampowered.com/ISaleItemRewardsService/ClaimItem/v1', { access_token: a.access_token })), true), i*200)), true),
wish = (a, remove = false, G = mix(A[0].wishlist).filter(e => remove ? a.wishlist.includes(e) : !a.wishlist.includes(e)).slice(0,5)) =>
  G.length &&
    http(a, 'https://store.steampowered.com/api/' + (remove ? 'removefrom' : 'addto') + 'wishlist', { appid: G[0] }, (b, r, x) => setTimeout(wish, 3000, a, remove, G.slice(1)), true),
claim = (a, G = mix(profile.review.slots[0].filter(e => !a.ownedapp.includes(e))).slice(0,5)) =>
  G.length && a.u.requestFreeLicense(G, (x, _r, r) =>
    x || (
      log(a, 'SUCCESS | requestFreeLicense: ' + r.join(',').yellow),
      a.ownedapp = a.ownedapp.concat(r),
      a.u.gamesPlayed(G))),
want = (g, remove = true, a = A[0]) => http(a, 'https://steamcommunity.com/app/' + g + '/' + (remove ? 'leave' : 'join') + 'OGG', {}),
ignore = (g, reason = 2, remove = 0, a = A[0]) =>  http(a, 'https://store.steampowered.com/recommended/ignorerecommendation/', { appid: g, ignore_reason: reason, remove: remove }),
SteamUser = require('steam-user'),
SteamSession = require('steam-session').LoginSession,
SteamCommunity = require('steamcommunity'),
SteamTradeOfferManager = require('steam-tradeoffer-manager'),
find_name = (a, f, z) =>
  a.u.users[f] && a.u.users[f].player_name ?
    z(a.u.users[f].player_name)
  : a.u.getPersonas([ f ], (x, F) =>
    x ? (
      log(a, 'FAILURE | getPersonas: ' + x.message + " " + ('https://steam.pm/' + f).yellow),
      z(f))
    : z(F[f].player_name)),
check_friend = (a, f, r, _r, n, i = 0) =>
  find_name(a, f, (player_name, m = (_r == 5 ? 'UNBLOCKED' : (_r == 2 && r == 0) || (_r == 2 && r == 1) ? 'DECLINED' : (_r == 4 && r == 0) ? 'REJECTED' : SteamUser.EFriendRelationship[r].toUpperCase())) => (
    r <= 1 ? delete s.A[a.i].friends[f]
    : s.A[a.i].friends.hasOwnProperty(f) ? s.A[a.i].friends[f].state = r
    : s.A[a.i].friends[f] = { state: r },
    r == 3 ?
      a.new_friends.push([ "new_"+new Date().getTime(), ""+f ])
    : r == 2 && a.i != 0 && a.i != 96 &&
      setTimeout(() => a.u.addFriend(f), 5000*i),
    log(a, 'SESSION | ' + n + '=' + m.replace('REQUESTINITIATOR', 'REQUESTINITIATOR'.bgBlue.white).replace('REQUESTRECIPIENT', 'REQUESTRECIPIENT'.bgMagenta.black).replace('FRIEND', 'FRIEND'.bgGreen.black).replace('NONE', 'NONE'.bgRed.black).replace('REJECTED', 'REJECTED'.bgYellow.black).replace('DECLINED', 'DECLINED'.bgYellow.black.bold) + (": \"" + player_name + '", ' + "https://steam.pm/" + f + " - " + _r + ">>" + r + " #" + i).yellow),
    (!a.i || _r != -1) && !A.find(e => e.steamID == f) && (
      chat('/me #' + a.i + ' [' + m + "] " + (m == 'DECLINED' ? ':cheergerka:' : (m == 'REJECTED' ? ':sadgerka:' : (m == 'FRIEND' || m == 'UNBLOCKED' ? ":trollgerka:" : (m == 'NONE' ? ":angrygerka:" : ":happygerka:")))) + " " + player_name + " -- https://steam.pm/" + f + " - " + _r + ">>" + r, a.i, 37338, 110446724, true),
      s.A[a.i].chat &&
        chat_profile_url(a, ""+f, s.A[a.i].chat[0], s.A[a.i].chat[1])))),
account_info = (a) => ("https://steamcommunity.com/" + profile_url(a) + " \"" + a.u.accountInfo.name + "\"" + " | @" + a.u.accountInfo.country + ",#" + a.u.accountInfo.flags + " fw=" + a.following.length + ",lvl=" + a.level).yellow,
A = s.A.map((a, i) =>
  ({ u: new SteamUser({ dataDirectory: null, autoRelogin: true, enablePicsCache: false }), session: new SteamSession(1), c: new SteamCommunity(), trade: new SteamTradeOfferManager(), i: i, steamID: a.steamID, limited: a.limited, new_friends: [], blotter: [], avatar_sha: [ '' ], last_group_chat: [ 37338, 143271 ] })),
A.forEach((a, i) => (
  a.u.on('friendRelationship', (f, r, _r) => check_friend(a, f, r, _r, 'friendRelationship')),
  a.u.on('loggedOn', (details, parental) => !a.logon_callback && log(a, 'NOTICES | (RE)logon: '+ account_info(a))),
  a.u.on('disconnected', (r, m) =>  log(a, 'SESSION | disconnected: ' + ('#' + r + '_' + m + " https://steamcommunity.com/" + profile_url(a)).yellow)),
  a.session.loginTimeout = 60000,
  a.session.on('timeout', () => log(a, 'FAILURE| authenticate timeout')),
  a.session.on('error', (x) => log(a, 'FAILURE| authenticate fail ' + x.message.yellow)),
  a.session.on('authenticated', () => (
    s.A[a.i].refreshToken = a.session.refreshToken,
    logon(a, '', a.logon_callback))),
  a.c._setCookie(a.c.request.cookie('strResponsiveViewPrefs=desktop')),
  a.c.on('sessionExpired', (x) => (
    log(a, 'FAILURE | sessionExpired: ' + x),
    a.u.webLogOn())),
  a.u.on('error', (x) =>
    log(a, 'FAILURE | error: ' + x.message.yellow)),
  a.u.on('accountLimitations', (limited, communityBanned, locked, canInviteFriends) =>
    (limited || communityBanned || locked) && (
      a.limited = true,
      log(a, "NOTICES | accountLimitations: " + limited + "|" + communityBanned + "|" + locked + "|" + canInviteFriends))),
  a.u.on('playingState', (blocked, playingApp) => !blocked && (a.finished = true)),
  a.u.on('webSession', (sessionID, cookies) => (
    a.c.setCookies(cookies),
    a.trade.setCookies(cookies),
    http(a, 'https://store.steampowered.com/points/shop', {}, (b) => (
      a.access_token = b.match(/webapi_token\&quot\;\:\&quot\;.*?\&quot\;/)[0].slice(25, -6),
      !a.hasOwnProperty('inventory') &&
        http(a, 'https://api.steampowered.com/IPlayerService/GetBadges/v1/?access_token=' + a.access_token + "&steamid=" + a.steamID, null, (b, r, x) => (
          a.badges = b.response.badges,
          a.level = b.response.player_level,
          a.xp = [ b.response.player_xp, b.response.player_xp_needed_current_level, b.response.player_xp_needed_to_level_up ],
          http(a, 'https://store.steampowered.com/dynamicstore/userdata/', {}, (b, r, x) => (
            a.wishlist = b.rgWishlist,
            a.ignored = Object.entries(b.rgIgnoredApps).filter(e => e[1] == 0).map(e => +e[0]),
            a.ignored2 = Object.entries(b.rgIgnoredApps).filter(e => e[1] == 2).map(e => +e[0]),
            a.followed = b.rgFollowedApps,
            a.ownedapp = b.rgOwnedApps,
            http(a, 'my/following', null, (b, r, x) => (
              a.following = Cheerio.load(b)('div.friend_block_v2').toArray().map(e => e.attribs['data-steamid']),
              s.A[a.i].following = !s.A[a.i].following ? [] : s.A[a.i].following.filter(e => !a.following.includes(e)),
              a.c.getUserInventoryContents(a.steamID, '753', '6', false, "english", (x, inventory) =>
                x ? log(a, 'FAILURE | getUserInventoryContents: ' + x.message.yellow)
                :(a.inventory = { avatar_frames: [], avatar_backgrounds: [], backgrounds: [], boosters: [], cards: [], emoticons: [], stickers: [], other: [] },
                  inventory.forEach(e =>
                    e.tags.length > 3 && e.tags[3].name == 'Trading Card' ? a.inventory.cards.push(e)
                    : e.tags[2].name == 'Avatar Profile Frame' ? a.inventory.avatar_frames.push(e)
                    : e.tags[2].name == 'Sticker' ? a.inventory.stickers.push(e)
                    : e.tags[2].name == 'Mini Profile Background' ? a.inventory.avatar_backgrounds.push(e)
                    : e.tags[2].name == 'Booster Pack' ? a.inventory.boosters.push(e)
                    : e.tags[2].name == 'Emoticon' ? a.inventory.emoticons.push(e)
                    : e.tags[2].name == 'Profile Background' && !profile.background_blacklist.includes("753_6_"+e.id) ? a.inventory.backgrounds.push(e)
                    : a.inventory.other.push(e)),
                  !a.i && [ 8,2,4,5,3,7 ].forEach((e, i) => (
                    d.emotes[e].forEach(e =>
                      profile.item_showcase.slots[i+6].push('753_6_' + A[0].inventory.emoticons.find(_e => _e.name.toUpperCase() === e.toUpperCase()).id)))),
                  a.u.chat.getGroups((x, r) =>
                    x ? (log(a, 'FAILURE | chatGetGroups: ' + x.message.yellow), a.chats = [])
                    :(a.chats = Object.entries(r.chat_room_groups),
                    get_comments(undefined, a),
                    log(a, 'SESSION | logon: ' + account_info(a)),
                    a.logon_callback(),
                    delete a.logon_callback,
                    !s.A[a.i].hasOwnProperty('friends') && ( s.A[a.i].friends = {} ),
                    Object.entries(s.A[a.i].friends).filter(e => !a.u.myFriends.hasOwnProperty(e[0])).sort((e, _e) => e[1].state - _e[1].state).forEach((e, i) => check_friend(a, e[0], 0, e[1].state, 'friendPersonasLoaded_A', i)),
                    Object.entries(a.u.myFriends).filter(e => !s.A[a.i].friends[e[0]] || s.A[a.i].friends[e[0]].state != e[1]).sort((e, _e) => e[1] - _e[1]).forEach((e, i) => check_friend(a, e[0], e[1], (s.A[a.i].friends.hasOwnProperty(e[0]) ? s.A[a.i].friends[e[0]].state : s.A[a.i].friends.length > 0 ? 0 : -1), 'friendPersonasLoaded_B', i))))))))), false, 'GET'))))))),
  a.u.on('newItems', (count) =>
    count > 0 && (
      clearTimeout(a.item_timer),
      a.item_timer = setTimeout(() => (
        log(a, "SESSION | newItems: " + (""+count).bgGreen.black + " https://steamcommunity.com/" + profile_url(a) + "/inventory"),
        a.i && a.c.resetItemNotifications()), 10000))),
  a.u.chat.on('friendMessageEcho', (m) =>
    !m.message.includes('[tradeoffer') && find_name(a, m.steamid_friend, (player_name) => (
      log_chat(a, m.steamid_friend, "^^", m.message, player_name),
      m.message.startsWith('#') ?
        send(reply(""+m.steamid_friend, m.message), a, m.steamid_friend)
      : a.u.users.hasOwnProperty(m.steamid_friend) && !m.message.startsWith('[') && (
        riveScript.setUservar(""+m.steamid_friend, 'chat_time', Date.now()-300000),
        a.u.users[m.steamid_friend].stop = true)))),
  a.u.chat.on('friendMessage', (m) =>
    !m.message.includes('[lobbyinvite') && !m.message.includes('[tradeoffer') && !s.disable_chat && !a.limited && (
      find_name(a, m.steamid_friend, (player_name) => (
        log_chat(a, m.steamid_friend, "<<".bgBrightBlue.black.bold, m.message, player_name),
        a.last_chatter = ""+m.steamid_friend,
        m.message = m.message.replace(/:[a-zAZ0-9_]+:/g, '').replace(/([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, ''),
        riveScript.getUservar(""+m.steamid_friend, 'topic') == 'undefined' && (
          [ 'first', 'second', 'third', 'fourth', 'fifth' ].forEach(e =>
            riveScript.setUservar(""+m.steamid_friend, e, pool(d.chat_topics))),
          riveScript.setUservar(""+m.steamid_friend, 'chat_time', 0),
          riveScript.setUservar(""+m.steamid_friend, 'name', pool(d.chat_names))),
        ((!s.steamid_chat_blacklist.includes(""+m.steamid_friend) && m.message != '' && !m.message.includes('http') && (Date.now()-riveScript.getUservar(""+m.steamid_friend, 'chat_time') > 3600000)) || m.message.startsWith('#')) && (
          !a.chatting && !m.message.startsWith('#') && !a.new_friends.find(e => e[1] == m.steamid_friend) && 
            find_name(a, m.steamid_friend, (player_name) => (
              a.chatting = true,
              a.avatar_sha.push(a.u.users[m.steamid_friend].avatar_url_icon.replace(/.*\//, '').slice(0, -4)),
              a.avatar_frame = '17625835286')),
          send(reply(""+m.steamid_friend, m.message), a, m.steamid_friend, 80, (m.message.startsWith('#') ? 0 : Math.floor(Math.random() * 18000) + 3000), false)))))),
  a.u.chat.on('chatMessage', (m) =>
    !a.i && (
      a.last_group_chat = [ m.chat_group_id, m.chat_id ],
      ""+m.steamid_sender == A[0].steamID ?
        m.chat_id == '114309457' && !m.message.startsWith('/pre') &&
          A[0].u.chat.sendChatMessage(37338, 114309457, reply(A[0].steamID, '#@' + m.message.trim()))
      : m.message == null ?
          m.chat_group_id == '37338' &&
            log(a, 'NOTICES | chatRoomGroupMemberStateChange:' + (" -- #" + m.chat_group_id + " = https://steam.pm/" + m.steamid_sender).yellow)
      : (m.chat_group_id == '37338' || !s.disable_group_chat_message_announce) &&
        log(a, "MESSAGE | ~~ [" + m.chat_name + "] ~~ " + m.message + ": " + ("https://steam.pm/" + m.steamid_sender + " [" + m.chat_group_id + "/" + m.chat_id + "]").yellow))),    
  a.u.on('groupRelationship', (f, r, _r) =>
    a.c.getSteamGroup(f, (x, _f) => (
      !_f.url.match(/^\d+$/) && (
        chat('/me #' + a.i + ' [' + SteamUser.EClanRelationship[r] + "] " + (r == 3 ? ':trollgerka:' : (r == 2 ? ':happygerka:' : (r == 7 ? ":sadgerka:" : (r == 6 ? ":cheergerka:" : ":angrygerka:")))) + " "
          + " -- https://steamcommunity.com/gid/" + f + " - {" + (!x ? _f.name : '') + "} " + _r + ">>" + r, a.i, 37338, 111284145, true),
        log(a, 'SESSION | groupRelationship: https://steamcommunity.com/gid/' + f + " (" + SteamUser.EClanRelationship[r].toUpperCase() + ") " + ('#' + r).yellow))))),
  a.u.on('newComments', (count, myItems) =>
    count > 0 && (
      clearTimeout(a.comment_timer),
      a.comment_timer = setTimeout(() => (
        http(a, 'my/commentnotifications', { action: 'markallread' }),
        myItems > 0 && (
          log(a, "SESSION | newComments: https://steamcommunity.com/" + profile_url(a) + "/commentnotifications " + ("total=" + (s.A[a.i].comments || []).length).yellow),
          get_comments(undefined, a))), 20000))))),
check_comments = (a, q = a.i ? s.A[a.i].comments.length : 150) =>
  s.A[a.i].comments.slice(-q).map((e, i) => e.concat(i)).filter((e, i, E) => E.findLastIndex(_e => _e[1].substr(0,500) == e[1].substr(0,500)) != i).reverse().forEach((e, i) =>
    setTimeout((a, index) =>
      a.c.deleteUserComment(a.steamID, s.A[a.i].comments[index][0], (x) => (
        log(a, (x ? 'FAILURE' : 'SESSION') + ' | deleteUserComment: ' + ('https://steam.pm/' + s.A[a.i].comments[index][2] + " / " + s.A[a.i].comments[index][0] + " #" + index + " | " + s.A[a.i].comments[index][1].slice(0,32)).yellow),
        s.A[a.i].comments.splice(index, 1))), 2000*(i+1), a, s.A[a.i].comments.length-(q-e[3]))),
get_comments = (p = 1, a = A[0], fill = false, empty = true) => (
  !s.A[a.i].comments && ( s.A[a.i].comments = [], fill = true),
  !s.A[a.i].replies && ( s.A[a.i].replies = [] ),
  http(a, 'my/allcomments?ctp=' + p, null, (_b, r, x, b = Cheerio.load(_b)) => (
    (fill ? b('.commentthread_comment').toArray() : b('.commentthread_comment').toArray().reverse()).forEach((e, i, E,
      id = e.attribs['id'].substr(8),
      steamid = "765"+(+b('#comment_' + id + " a")[0].attribs['data-miniprofile'] + 61197960265728),
      contents = b("#comment_content_" + id).contents().toString().replace(/<img src="[:\.\/A-Za-z0-9_]+" alt="/g, '').replace(/" class="emoticon">/g, '').replace(/<br>/g, '\n').trim()) => (
        empty = false,
        !contents.includes("needs_content_check") && s.A[a.i].comments.findIndex(e => e[0] == id) == -1 &&
          s.A[a.i].comments[fill ? 'unshift' : 'push']([ id, contents, steamid ]))),
    !fill ? p > 1 ? setTimeout(get_comments, 2000, p-1, a) : check_comments(a, 150)
    : !empty ? setTimeout(get_comments, 2000, p+1, a, fill) : check_comments(a, s.A[a.i].comments.length)))),
!s.steamid_chat_blacklist && ( s.steamid_chat_blacklist = [] ),
log_chat = (a, f, t, m, player_name = f) =>
  m != '' && (
    console_log("MESSAGE |" + (""+a.i).padStart(3, '0').gray + "| " + t + " [" + player_name + "] " + t + " " + m + ": " + (""+f).yellow),
    !s.steamid_chat_blacklist.includes(""+f) && !m.startsWith('[img') && !m.startsWith('#') && !m.includes(' ') &&
      chat("/quote " + (!t.includes('<<') ? player_name + " : " + m : font(m, 2) + ' { ' + player_name + ' }'), a.i, 37338, 143271, true)),
send = (n = pool(responses, 1, null)[0](), a = A[0], f = a.last_chatter, speed = 0, delay = 0, force = true) => (
  !a.u.users.hasOwnProperty(f) && ( a.u.users[f] = {} ),
  n.length > 0 && (force || !a.u.users[f].hasOwnProperty('active')) && (
    a.u.users[f].active = true,
    delay != 0 ?
      setTimeout(() => a.u.chat.sendFriendTyping(f), delay) : speed = 0,
    setTimeout(() =>
      find_name(a, f, (player_name) => (
        (force || !a.u.users[f].hasOwnProperty('stop')) && (
          a.u.chat.sendFriendMessage(f, n),
          log_chat(a, f, ">>", (n.startsWith('#') ? reply(f, n) : n), player_name)),
        delete a.u.users[f].active,
        delete a.u.users[f].stop)), Math.min(n.length, 75)*speed+delay))),
invite = (f = null, a = A[0], _f = (s.A[a.i].group || '103582791432273268')) =>
  !s.disable_invite && !a.limited &&
    a.c.getGroupMembers(_f, (x, R, _F = Object.keys(a.u.myFriends)) =>
      (x || R.length < 1) ?
        log(a, "FAILURE | getGroupMembers: " + ((x ? x.message : 'empty') + " #" + _f).yellow)
      :(f == null && (
          f = pool(F = _F.filter(e => !R.includes(e) && s.A.findIndex(_e => _e.steamID == e) == -1))),
        R.findIndex(e => e.toString() == f) > -1 ?
          log(a, 'FAILURE | inviteToGroup: https://steam.pm/' + f + " is a member " + ("https://steamcommunity.com/gid/" + _f).yellow)
        : Math.random() < 0.5 ?
            a.c.inviteUserToGroup(f, _f, (x) => log(a, (x ? 'FAILURE' : 'SUCCESS') + ' | inviteUserToGroup: ' + (x ? x.message.toUpperCase() : '') + ('https://steam.pm/' + f + " " + ("https://steamcommunity.com/gid/" + _f + "/history").yellow)))
          :(log(a, 'SUCCESS | inviteToGroup: https://steam.pm/' + f + " " + ("https://steamcommunity.com/gid/" + _f + "/history").yellow),
            a.u.inviteToGroup(f, _f)))),
add = (a = A[0], _F = Object.keys(a.u.myFriends), f = pool(a.following.concat(s.A[a.i].following).filter(e => !_F.includes(e)))) =>
  !s.disable_add && !a.limited &&
    a[Math.random() < 0.5 ? 'u' : 'c'].addFriend(f, (x) =>
      log(a, (x ? 'FAILURE' : 'SUCCESS') + ' | addFriend: ' + (x ? x.message.toUpperCase() : '') + ("= https://steamcommunity.com/profiles/" + f).yellow)),
((h = w.existsSync('/mnt/d/Image/Internet') ? '/mnt/d/Image/Internet' : "./images/artwork/cats") => w.readdir(h, { recursive: true }, (x, E) => photos = E.filter(e => e.match(/\.(jpg|png|gif)/gi)).map(e => h + '/' + e)))(),
w.readdir('./images', { recursive: true }, (x, E) => gifs = E.filter(e => e.match(/\.gif/gi)).map(e => './images/' + e)),
photo = (f = mix(Object.entries(A[0].u.myFriends)).filter(e => e[1] == 3)[0][0], m = pool(photos), a = A[0]) =>
  !s.disable_photo && !a.limited &&
    a.c.sendImageToUser(f, w.readFileSync(m), {}, (x, h) =>
      log(a, (x ? 'FAILURE' : 'SUCCESS') + ' | sendImageToUser: ' + h + (' "' + m + '" >> ' + (x ? x.message : 'https://steam.pm/' + f)).yellow)),
wikipedia = require('wikipedia'),
wikipedia_date = (date = new Date()) => "https://wikipedia.org/wiki/" + date.toLocaleDateString("en-US", { month: "long", day: "numeric"} ).replace(' ', '_'),
giphys = require('giphy')(s.giphy_key),
giphy = (m = pool(d.giphy_topics), q = 1, rating = 'r', z = (n) => console.log(n)) =>
  giphys.search({ q: m, rating: rating, limit: 100 }, (x, r) =>
    (x || r.data.length < 1) ?
      log(A[0], 'FAILURE | giphySearch: ' + (x + " ^" + r.data.length).yellow)
    : z(mix(r.data).slice(0,q).map(e => e.url).join(' '))),
pool_background_image = (a = A[0]) =>
  pool(Object.values(a.inventory.backgrounds).flat(), 1, null)[0].actions[0].link,
pool_game = (a = A[0]) =>
  'https://store.steampowered.com/app/' + pool(a.ignored.concat(a.ignored2).concat(a.followed).concat(a.wishlist)),
adventurejs = require('adventurejs'),
!s.adventure && ( s.adventure = {} ), 
figlet = require('figlet'),
figlets = figlet.fontsSync(),
reply = (f, m) =>
  m.startsWith('#@') ?
    ((starting = !s.adventure[""+f]) => (
      (starting || !Object.getPrototypeOf(s.adventure[""+f]).hasOwnProperty('_death')) && ( s.adventure[""+f] = adventurejs.makeState(s.adventure[""+f]) ),
      "/pre " + (starting ? ( s.adventure[""+f].advance(), s.adventure[""+f].advance('yes') ) : s.adventure[""+f].advance(m.substr(2))).map(e => e.trim()).join('\n').trim() + ' '))()
  : m.startsWith('#+') ? (s.steamid_chat_blacklist.push(""+f), '')
  : m.startsWith('#-') ? (s.steamid_chat_blacklist.splice(s.steamid_chat_blacklist.indexOf(f), 1), '')
  : m.startsWith('##') ? (riveScript.setUservar(""+f, 'chat_time', 0), '')
  : m.startsWith('#$') ? (riveScript.setUservar(""+f, 'chat_time', Date.now()), '')
  : m.startsWith('#b') ? pool_background_image()
  : m.startsWith('#e') ? ((_m = m.substr(2).trim()) => emote(_m == '' ? 1 : +_m.trim(), [ 0,1,12,13,14,15,16,17,18,19 ]))()
  : m.startsWith('#E') ? ((_m = m.substr(2).trim()) => emote(_m == '' ? 1 : +_m.trim()))()
  : m.startsWith('#s') ? "/sticker " + pool(d.items_stickers)
  : m.startsWith('#g') ? pool_game()
  : m.startsWith('#a') ? "/pre " + ((_m = m.substr(2).trim()) => figlet.textSync(_m == '' ? pool(d.adjectives) : _m, { font: pool(figlets) }))()
  : m.startsWith('#v') ? "https://www.youtube.com/watch?v=" + pool(s.discussions['1290691937724869711'])
  : m.startsWith('#V') ? pool_discussion_links()
  : m.startsWith('#f') ? ((_m = m.substr(3)) => fortune(_m == '' ? undefined : _m))()
  : m.startsWith('#T') ? text_art('nsfw-small')
  : m.startsWith('#t') ? ((_m = m.substr(3)) => text_art(_m == '' ? undefined : _m, "/pre "))()
  : m.startsWith('#p') ? (photo(f), '')
  : m.startsWith('#P') ? (photo(f, pool(gifs)), '') 
  : m.match(/^#u/) ? (
    m = m.split(' '),
    (!m[1] || !m[1].match(/(images|screenshots|collections|guides|merchandise|videos|myworkshopfiles)/)) && (m[1] = 'images'),
    (!m[2] || !m[2].match(/(files|favorites|subscriptions)/)) && (m[2] = 'files'),
    "https://steamcommunity.com/sharedfiles/filedetails/?id=" + pool(Object.values(s.ugc['76561197961017729']).filter(e => e.hasOwnProperty(m[1])).map((e,i) => e[m[1]][m[2]]).flat()))
  : (riveScript.reply(""+f, m.replace(/^#!/, '')).replace(/<oob>.*<\/oob>/, '').replace(/  random/gi, ' ').replace(/  /g, ' ').replace('}', '').replace(/pdlrand/gi, 'PDLRAND').replace(/pdlrand/gi, '') || "PDLRAND").replace('PDLRAND',
    Math.random() < 0.5 ? jitter(pool(responses, 1, null)[0]())
    : Math.ceil(Math.random()*3 == 1) ? Math.random() < 0.5 ? emote(1) : "/sticker " + pool(d.items_stickers)
    : Math.ceil(Math.random()*4 == 1) ? jitter(pool(d.confusion), true)
    : Math.ceil(Math.random()*5 == 1) ? jitter(pool(d.pickups), true, undefined, 0.3)
    : Math.ceil(Math.random()*6 == 1) ? "/pre " + text_art()
    : Math.ceil(Math.random()*7 == 1) ? "/giphy"
    : Math.ceil(Math.random()*8 == 1) ? "https://steamcommunity.com/profiles/76561197961017729/inventory/#" + pool(d.items_771950_gif) : ""),
base64 = (data) => new Buffer(data).toString('base64'),
base64toUTF8 = (str) => Buffer.from(str, 'base64').toString('utf8'),
google = require('googleapis').google,
s.hasOwnProperty('google_token') && (
  google_auth = new google.auth.OAuth2(s.google_secret.client_id, s.google_secret.client_secret, s.google_secret.redirect_uris[0]),
  google_auth.setCredentials(s.google_token),
  googleAPIsGmail = google.gmail({ version: 'v1', google_auth })),
get_gmail = (a, callback, maxResults = 10, q = 'from:noreply@steampowered.com') =>
  googleAPIsGmail.users.messages.list({ auth: google_auth, userId: 'me', maxResults: maxResults, q: q + ",to:" + s.A[a.i].mail }, (err, response, gmails = []) => (
    (err || !response.data.messages) ? (
      log(a, 'FAILURE | gmail error: ' + (err ? err : 'no gmail data').yellow),
      callback(true, []))
    :(read_message = (m = 0) =>
      (m == response.data.messages.length) ?
        callback(false, gmails)
      : googleAPIsGmail.users.messages.get({
        auth: google_auth, userId: 'me', id: response.data.messages[m].id
      }, (err, response, body) => (
        response.data.payload.parts.forEach(e =>
          (body += base64toUTF8(e.body.data))),
        gmails.push(body),
        read_message(m+1))))())),
search_gmail = (gmails, start, end, result = '') => (
  gmails.some((e, i, E, undefined, start_index = gmails[i].search(start)) =>
    start_index > -1 && ( result = gmails[i].slice(start_index, gmails[i].indexOf(end, start_index)))),
  result),
inventories = [ [ 753,6 ],[ 440,2 ] ],
trade = (a, receiver = A[96], sending = [], i = 0) =>
  !s.A[reciever.i].trade ? 
    log(a, "FAILURE | missing reciever trade property: " + ('#' + receiver.i + " " + receiver.name).yellow)
  : a.trade.getInventoryContents(inventories[i][0], inventories[i][1], true, (x, inventory) => (
    (x) ?
      log(a, "FAILURE | getInventoryContents: " + ("id=" + inventories[i] + ",error=" + x).yellow)
    : (i < inventories.length-1) ?
      trade(a, receiver, sending.concat(inventory), i+1)
    : (!sending.length && !inventory.length) ?
      log(a, "SESSION | trade: " + "no items")
    : ((offer = a.trade.createOffer("https://steamcommunity.com/tradeoffer/new/?partner=" + s.A[reciever.i].trade[0] + "&token=" + s.A[reciever.i].trade[1])) => (
        offer.addMyItems(sending.concat(inventory.filter((item) => {
          var send = true;
          item.tags.forEach((tag) =>
            (tag.name == 'Profile Background' || tag.name == 'Emoticon') && (
              send = false));
          return send;
        }))),
        offer.send((x, status) =>
          (x) ?
            log(a, "FAILURE | offer.send: " + ("xor=" + x).yellow)
          : (status != 'pending') ?
            log(a, "SESSION | offer.send: " + ("complete=" + status).yellow)
          : a.c.acceptConfirmationForObject("identitySecret", offer.id, (x) =>
            (get_gmail_confirmation = (attempt = 0) =>
              setTimeout(() =>
                get_gmail(a, (x, gmails, link = search_gmail(gmails, /(https:\/\/steamcommunity.com\/tradeoffer\/[0-9]+\/confirm\?accountid)/, '"')) => (
                  (link.length <= 1 || !link) ?
                    (attempt == 8) ?
                      log(a, "FAILURE | get_gmail: " + ("noLink=" + offer.id).yellow)
                    : get_gmail_confirmation(attempt+1)
                  : http(a, link.replace(/&amp;/g, '&'), {}, (body, response, xor) =>
                    (!body.indexOf('has been confirmed')) ?
                      log(a, "FAILURE | http: " + ("noConfirm=" + link.substr(119,20) + "|" + offer.id).yellow)
                    : receiver.trade.getOffer(offer.id, (x, offer) =>
                        (x) ?
                          log(a, "FAILURE | getOffer: " + ("xor=" + x).yellow)
                        : offer.getUserDetails((x, me, them) =>
                            offer.accept(false, (x, status) =>
                              log(a, "SUCCESS | offer.accept: " + status + "=" + me.escrowDays + "/" + them.escrowDays + "_days"))))))), 5000))()))))())),
logon = async (a, guard = '', z = () => void 0) => (
  a.logon_callback = z,
  !s.A[a.i].hasOwnProperty('refreshToken') ? (
    a.session_result = await a.session.startWithCredentials({ accountName: s.A[a.i].name, password: s.A[a.i].pass, steamGuardMachineToken: '' }),
    a.session_result.actionRequired && (
      a.session_result.validActions.findIndex((e) => e.type == 2) > -1 ? (
        log(a, 'SESSION | checking email... {*}'),
        setTimeout(async (a) =>
          get_gmail(a, async (err, gmails) =>
            await a.session.submitSteamGuardCode(search_gmail(gmails, /[A-Z0-9]{5}/, '\r\n'))), 8000, a))
      : a.session_result.validActions.findIndex((e) => e.type == 3) > -1 ?
        guard != '' ?
          await a.session.submitSteamGuardCode(guard)
        : log(a, 'FAILURE | guard device code unspecified')
      : log(a, 'SESSION | confirm two-factor authentication... {*}')))
  : a.u.logOn({ "refreshToken": s.A[a.i].refreshToken })),
logout = (a) => (
  a.u.logOff(),
  delete a.inventory),
console_log("SESSION |" + '000'.bgGray.black + "| loading rivescript: " + ("files=" + w.readdirSync('./rivescript').length).yellow),
!s.rivescript && ( s.rivescript = {} ),
RiveScript = require("rivescript"),
riveScript = new RiveScript(),
riveScript.loadDirectory('./rivescript', () => (
  riveScript.sortReplies(),
  Object.entries(s.rivescript).forEach(e =>
    riveScript.setUservars(e[0], e[1])),
  !s.disable_autostart &&
    logon(A[0], '', () => logon(A[96], '', () =>
      setTimeout(() => timer = setInterval(() => !s.paused && main(s.account_index = (!s.account_index || s.account_index+1 == A.length ? 1 : s.account_index+1), new Date()), (!s.frequency ? 60000: s.frequency)), (60-new Date().getSeconds())*1000))),
  watchdog = 0)),
timer = -1,
main = (a, date) =>
  ++watchdog == 60 ?
    quit(true, true)
  : A[0].u.steamID == null ?
    logon(A[0])
  : randomize(A[0], profile, () => (
    watchdog = 0,
    (!s.date || s.date != date.getDate()) ? (
      s.date = date.getDate(),
      get_discussion_links(),
      get_ugc(0, 'guides', 'favorites'),
      http(A[0], 'https://store.steampowered.com/curator/2751860-primarydataloop/admin/ajaxupdatecuratordetails/', {
        "description": fortune('zippy', 4, 1, 175),
        "platform_windows": true, "platform_mac": true, "platform_linux": true, "vr_content": true,
        "website_title": "Today's YouTube Video", "website_url": "https://www.youtube.com/watch?v=" + pool(s.discussions['1290691937724869711']),
        "discussions_url": "https://steamcommunity.com/id/byteframe",
        "tags_preferred[0]": "VR", "tags_preferred[1]": "Sexual Content", "tags_preferred[2]": "Nudity", "tags_preferred[3]": "Cyberpunk", "tags_preferred[4]": "Anime",
        "show_broadcast": true, "tagline_locs": {}, "async": true }),
      chat(wikipedia_date(), 0, 37338, 143271, true),
      chat('/code ' + text_art('nsfw'), 0, 37338, 143271, true),
      !s.disable_group_edit && !a.limited && (
        date.getDate() % 6 == 0 &&
          setTimeout(() => A[0].c.scheduleGroupEvent(d.group_primary[0], pool(d.first_female), pool(d.games_events), jitter(pool(d.pickups), true, undefined, 0.3), null, { ip: pool(d.friends_rivals).substr(36), password: pool(d.words_sexy).toLowerCase() + 69 }, (x) =>
            log(A[0], (x ? 'FAILURE' : 'SUCCESS') + ' | scheduleGroupEvent: https://steamcommunity.com/gid/' + d.group_primary[0] + "/events" + (x ? x.message : '').yellow)), rand(3600000, 7200000)),
        (async () => (
          s.wikipedia = await wikipedia.onThisDay(),
          setTimeout(post, 3600000*rand(1,5), messages[4][1]('', s.date, messages_wikipedia_types[1]) + "\n\n[hr]\n" + messages[4][1]('', date, messages_wikipedia_types[0]) + "\n "),
          http(A[0], 'groups/primarydataloop/edit/profile', {
            "type": 'profileSave', "abbreviation": "pdl-stm", "customURL": "primarydataloop", "language": "english", "country": "PS", "state": "", "city": "",
            "favorite_games": d.games_events.join(','),
            "headline": ((date = new Date()) => font("👽 STARDATE 👣 ", 4) + stardate() + pool([' 🌎',' 🌏',' 🌏']) + " {" + (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "} 🖖 - ( " + mix(d.chinese.split('')).join('').substr(0,8) + " ) " + fortune('startrek', 1, 124, 132)/*+ "🅷🅰🆅🅴 🅰 🅽🅸🅲🅴 🅳🅰🆈 ! CLICK HERE FOR THE NEWS ! " + pool(d.emojis_bulk, 16, ' ')*/.trimEnd())(),
            "summary": 
              "[quote=On this day in history, the human race performed these actions][code]" + mix(s.wikipedia.events).slice(0,12).map(e => "- " + e.text + " {" + e.year + "}\n\n").join('') + "[/code][/quote]\n" +
              "[table][tr][th][b]👶 BABY SHOWERS 🤱[/b][/th][th][b]🛍️ SHOPPING LIST 💲[/b][/th][th][b]💀 OBITUARIES 👻[/b][/th][/tr][tr][td][list]" +
                mix(s.wikipedia.births).filter(e => e.text.length).map(e => "[*]" + e.text.replace(/,.*$/, ' {') + e.year + "}        ").slice(0,10).join('') +
              "[/list][/td][td][list]" + [...Array(10).keys() ].map(e => ((E = pool(d.emojis_food, 1, null)) => "[*]" + E[0][0] + " " + E[0][1] + "        ")()).join('') +
              "[/td][td][list]" + mix(s.wikipedia.deaths).filter(e => e.text.length).map(e => "[*]" + e.text.replace(/,.*$/, ' {') + e.year + "}        ").slice(0,10).join('') +
              "[/list][/td][/tr][/table]" })))()))
    : a % 180 == 0 ? (
      save(),
      curate(),
      Math.random() < 0.0420 ?
        post()
      : pool([
        () => chat('https://steamcommunity.com/sharedfiles/filedetails/?id=' + pool(d.screenshot_cats), 0, 37338, 111282936),
        () => chat('https://steamcommunity.com/sharedfiles/filedetails/?id=' + pool(pool_ugc().filter(e => !d.screenshot_cats.includes(e))), 0, 37338, 111289953),
        () => chat('https://steamcommunity.com/sharedfiles/filedetails/?id=' + pool(pool_ugc(undefined, 'screenshots')), 0, 37338, 111284104),
        () => chat('https://steamcommunity.com/sharedfiles/filedetails/?id=' + pool(profile.workshop_collector.selection), 0, 37338, 111282895),
        () => chat('https://steamcommunity.com/sharedfiles/filedetails/?id=' + pool(pool_ugc(undefined, 'images', 'favorites')), 0, 37338, 111282897),
        () => chat("/code [" + pool(functions).replace(',', ']\n\n'), 0, 37338, 111346274),
        () => chat(pool_discussion_links(), 0, 37338, 113356221),
        () => chat("https://www.youtube.com/watch?v=" + pool(s.discussions['1290691937724869711']), undefined, 111282930),
        () => chat('/pre ' + text_art(), 0, 37338, 111282890),
        () => chat(pool_background_image(), 0, 37338, 110879063),
        () => giphy(undefined, 1, pool(['r']), (h) => chat(h, 0, 37338, 111282913)) ], 1, null)[0](),
      s.date % 4 == 0 ?
        photo()
      : s.date % 3 == 0 ?
        invite()
      : s.date % 2 == 0 && (
        add(),
        !s.disable_sending &&
          ((m = pool([ () => '/sticker ' + pool(d.items_stickers), () => messages[2][9](), () => messages[2][10]() ], 1, null)[0](),
            f = pool(A[0].chats, 1, null)[0], _f = pool(f[1].group_summary.chat_rooms, 1, null)[0].chat_id) => (
            log(A[0], 'SUCCESS | sendChatMessage: ' + f[1].group_summary.chat_group_name + (' #' + f[0] + "|" + _f + " = \"" + m + '"').yellow),
            chat(m, 0, f[0], _f)))()))
    : a % 99 == 0 ? (
      weather(),
      interact(A[0], 4),
      ((g = Object.keys(s.collections)[(!s.collection_index ? s.collection_index = 0 : s.collection_index) >= Object.keys(s.collections).length-1 ? s.collection_index = 0 : ++s.collection_index]) => (
        Math.random() < 0.25 && http(A[0], 'sharedfiles/addyoutubepreview', { id: g, youtubeurl: 'https://www.youtube.com/watch?v=' + pool(d.links_youtube_collection_previews) } ),
        get_collection_items(g)))(),
      date.getMinutes() % 2 == 0 ?
        get_ugc(0, 'myworkshopfiles', 'favorites', 1, A[96], A[0].steamID)
      : get_ugc(0, 'myworkshopfiles', 'subscriptions'),
      get_reviews())
    : a % 72 == 0 ? 
      get_group_history()
    : a % 36 == 0 && (
      get_comment_history(),
      get_blotter()),
    a % 90 == 0 ? interact(A[0], 2)
    : a % 18 == 0 ? interact(A[0], 1)
    : a % 9 == 0 && (
      interact(A[0]),
      interact(A[0], 3)))),
save = (sync = false) => (
  s.rivescript = riveScript.getUservars(),
  w.existsSync('./state.json') &&
    w.renameSync('./state.json', './state-backup.json'),
  sync ?
    w.writeFileSync('./state.json', JSON.stringify(s, null, 2))
  :(sync = Date.now(),
    w.writeFile('./state.json', JSON.stringify(s, null, 2), (x) =>
      x ? console_log('FAILURE | saving state: ' + x) : console_log("SESSION |" + '000'.bgGray.black + '| saved state: ' + (Date.now()-sync) + " milliseconds")))),
quit = (saving = true, crashed = false) => (
  quit = () => void 0,
  console_log('SESSION | ending process... ' + ("#"+Math.floor(process.uptime())).yellow),
  timer != -1 &&
    clearInterval(timer),
  saving &&
    save(true),
  !crashed &&
    w.unlinkSync('.crash'),
  setTimeout(process.exit, 5000, 0),
  A.forEach(a => a.u.logOff())),
process.on('SIGINT', (code) =>
  quit()  
).on('uncaughtException', (x) =>
  console_log(x.stack)),
functions = Object.entries(global).filter(e => typeof e[1] == 'function').map(e => [ e[0], e[1].toString() ]).filter(e => !e[1].startsWith('function') && !e[1].startsWith('class') && e[1].length > 100);