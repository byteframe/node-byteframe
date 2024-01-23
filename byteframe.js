Colors = require('colors'),
console_log = (t, date = new Date()) =>
  console.log((('[' + (""+date.getHours()).padStart(2, '0') + ':' + (""+date.getMinutes()).padStart(2, '0') + ':' + (""+date.getSeconds()).padStart(2, '0') + '] ').magenta + t).replace(
    'SUCCESS', 'SUCCESS'.green.bold.reset).replace(
    'FAILURE', 'FAILURE'.red.bold.reset).replace(
    'MESSAGE', 'MESSAGE'.cyan.bold.reset).replace(
    'SESSION', 'SESSION'.blue.bold.reset)),
log = (a, t) =>
  console_log(t.replace('|', '|' + (""+a.i).padStart(3, '0').gray + '|')),
console_log("SESSION |" + '000'.gray.inverse + "| starting process: " + ("pid#=" + process.pid).yellow),
w = require('fs'),
d = JSON.parse(w.readFileSync('./data.json', 'utf8')),
s = JSON.parse(w.readFileSync('./state.json', 'utf8')),
split_words = (s, _middle = Math.floor(s.length / 2), before = s.lastIndexOf(' ', _middle), after = s.indexOf(' ', _middle + 1), middle = (_middle - before < after - _middle ? before : after)) =>
  [ s.substr(0, middle), s.substr(middle + 1) ],
emote = (l = 1, indexes = [ 2,3,4,5,6,7,8,9,10,11 ], j = '') =>
  pool(indexes, l, null).map((e) => pool(d.emotes[e])).join(j),
font = (input, f) =>
  [...Array(input.length).keys()].map((e, i) =>
    (d.fonts[f][input[i]] !== undefined) ? d.fonts[f][input[i]] : input[i]).join(''),
shuffle = (E) => (
  [...Array(E.length).keys()].reverse().slice(0, -1).forEach((e, i) =>
    ((j = Math.floor(Math.random()*(e + 1)), _j = E[e]) => (
      E[e] = E[j],
      E[j] = _j))()),
  E),
pool = (E, l = 1, join = '', to_shuffle = true, _E = []) => (
  [...Array(l).keys()].forEach(() => (
    (!E.hasOwnProperty('i') || ++E.i == E.length) && (
      E.i = 0,
      (to_shuffle) && (
        E = shuffle(E))),
    _E.push(E[E.i]))),
  (join !== null) ? _E.join(join) : _E),
fortunes = Object.fromEntries(w.readdirSync('./fortunes').map((e) => [ e, w.readFileSync('./fortunes/' + e, 'utf8').split('\n%') ])),
fortune = (file = 'all', q = 1, l = -1, o = -1, t = '') => (
  [...Array(q).keys()].forEach(() =>
    t += pool(fortunes[file]).trimEnd() + '\n\n'),
  t = t.replace(/[ \t]{2,}/g, ' ').trimEnd(),
  (l < 1 || (t.length >= l && (o < 1 || t.length <= o))) ? (
    (l > 0) && (
      t = t.replace(/[\t\n]/g, ' ')),
    t.trim())
  : fortune(file, q, l, o, (t.length > o) ? "" : t + " ")),
profile_url = (a) =>
  (a.u.vanityURL ? 'id/' + a.u.vanityURL : 'profiles/' + a.steamID),
byte_length = (str, m = encodeURIComponent(str).match(/%[89ABab]/g)) =>
  str.length + (m ? m.length : 0),
http = (a, h, form = null, z = null, force = false, method = (form != null ? 'POST' : 'GET'), multipart = false, options = {
  "uri": (!h.includes('http') ? 'https://steamcommunity.com/' + h : h).replace("/my/", "/" + profile_url(a) + "/"),
  "method": method, "json": true, "encoding": (h.slice(-4) == '.jpg' ? null : 'utf8')}) => (
  (form != null) && (
    (typeof form !== 'string') ? (
      form.sessionID = a.c.getSessionID(),
      form.sessionid = a.c.getSessionID(),
      (multipart) ? (
        options.formData = form)
      : options.form = form)
    : options.form = 'sessionID=' + a.c.getSessionID() + form),
  a.c.httpRequest(options, (x, r, b,
    response_code = (!r ? '999' : r.statusCode.toString()),
    result = options.uri.replace('https://', '') + ": " + (method + '-' + response_code).yellow) => (
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
        result = "FAILURE | " + result + ("=" + x + "-" + b.errmsg).yellow,
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
      z(b, r, x)))),
(initialize_profile = () => (
  profile = {
    lite: false,
    background_blacklist: d.background_blacklist.concat(d.items_dark_wallpaper_array6.flat()).concat(d.items_dark_wallpaper_array4.flat()).filter((e) => !d.background_whitelist.includes(e)),
    custom_url: 'byteframe',
    avatar: { moves: [], types: [ 0 ], slots: [ [ (a) => pool(d.avatars, 1, null)[0] ] ] },
    uiMode: { moves: [], types: [ 0 ], slots: [ [ 1, 2 ] ] },
    gamesPlayed: { moves: [], types: [ 0 ], slots: [ [] ] },
    background: { moves: [], types: [ 0 ], slots: [ [ (a) => pool(a.inventory.backgrounds, 1, null)[0] ] ] },
    showcases: { moves: [], types: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ], slots: [ [ "4_0" ],[ "13_0" ],[ "17_0" ],[ "15_0" ],[ "3_0" ],[ "12_0" ],[ "10_0" ],[ "7_0" ],[ "11_0" ],[ "5_0" ],[ "8_0" ],[ "2_0" ],[ "9_0" ],[ "6_0" ],[ "16_0" ],[ "22_0" ],[ "8_280151" ],[ "4_2410599" ],[ "3_2720320" ],[ "6_2908791" ],[ "23_0" ],[ "11_3542246" ],[ "2_3650940" ],[ "10_3507533" ],[ "17_3993982" ],[ "14_0" ],[ "12_4340775"] ] },
    screenshot: { moves: [ 1, 2, 3 ], types: [ -1, -1, -1, -1 ], slots: d.screenshot_showcase },
    videos: { moves: [], types: [ -1, -1, -1, -1 ], slots: [ [ () => pool(d.videos) ], [ () => pool(d.videos) ], [ () => pool(d.videos) ], [ () => pool(d.videos) ] ] },
    artwork: { moves: [ 1, 2, 3 ], types: [ -1, -1, -1, -1 ], slots: d.artwork },
    artwork2: { moves: [], types: [ 0 ], slots: [ d.artwork2 ] },
    group_primary: { moves: [], types: [ 0 ], slots: [ d.group_primary ] },
    group_favorite: { moves: [], types: [ -1 ], slots: [ d.group_favorite ] },
    guide_favorite: { moves: [], types: [ -1 ], slots: [ d.guide_favorite ] },
    guide_collector: { moves: [], types: [ 1, 1, 1, 1 ], slots: [ [ () => pool(d.guide_collector) ],[ () => pool(d.guide_collector) ],[ () => pool(d.guide_collector2) ],[ () => pool(d.guide_collector2) ] ] },
    workshop_favorite: { moves: [], types: [ -1 ], slots: [ d.workshop_favorite ] },
    workshop_favorite2: { moves: [], types: [ -1 ], slots: [ [ () => pool(pool(d.workshop_collector, 1, null)[0]) ] ] },
    workshop_collector: { moves: [], types: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ], slots: [
      [ () => pool(pool(d.workshop_collector, 1, null)[0]),() => pool(d.workshop_4000, 1, '', false),() => pool(s.favorites['Picture toys'], 1, '', false),() => pool(s.favorites['Source Filmmaker'], 1, '', false),() => pool(s.favorites['Happy Engine'], 1, '', false),() => pool(d.workshop_1201260_full_cgi, 1, '', false),() => pool(d.workshop_1201260_full_irl, 1, '', false),() => pool(d.workshop_740810_full_chillin, 1, '', false),() => pool(d.workshop_740810_full, 1, '', false),() => pool(d.workshop_821880_full, 1, '', false) ],[ () => pool(pool(d.workshop_collector, 1, null)[0]),() => pool(d.workshop_4000, 1, '', false),() => pool(s.favorites['Picture toys'], 1, '', false),() => pool(s.favorites['Source Filmmaker'], 1, '', false),() => pool(s.favorites['Happy Engine'], 1, '', false),() => pool(d.workshop_1201260_full_cgi, 1, '', false),() => pool(d.workshop_1201260_full_irl, 1, '', false),() => pool(d.workshop_740810_full_chillin, 1, '', false),() => pool(d.workshop_740810_full, 1, '', false),() => pool(d.workshop_821880_full, 1, '', false) ],[ () => pool(pool(d.workshop_collector, 1, null)[0]),() => pool(d.workshop_4000, 1, '', false),() => pool(s.favorites['Picture toys'], 1, '', false),() => pool(s.favorites['Source Filmmaker'], 1, '', false),() => pool(s.favorites['Happy Engine'], 1, '', false),() => pool(d.workshop_1201260_full_cgi, 1, '', false),() => pool(d.workshop_1201260_full_irl, 1, '', false),() => pool(d.workshop_740810_full_chillin, 1, '', false),() => pool(d.workshop_740810_full, 1, '', false),() => pool(d.workshop_821880_full, 1, '', false) ],[ () => pool(pool(d.workshop_collector, 1, null)[0]),() => pool(d.workshop_4000, 1, '', false),() => pool(s.favorites['Picture toys'], 1, '', false),() => pool(s.favorites['Source Filmmaker'], 1, '', false),() => pool(s.favorites['Happy Engine'], 1, '', false),() => pool(d.workshop_1201260_full_cgi, 1, '', false),() => pool(d.workshop_1201260_full_irl, 1, '', false),() => pool(d.workshop_740810_full_chillin, 1, '', false),() => pool(d.workshop_740810_full, 1, '', false),() => pool(d.workshop_821880_full, 1, '', false) ],[ () => pool(d.workshop_merchandise, 1, '', false),() => pool(d.workshop_4000, 1, '', false),() => pool(s.favorites['Picture toys'], 1, '', false),() => pool(s.favorites['Source Filmmaker'], 1, '', false),() => pool(s.favorites['Happy Engine'], 1, '', false),() => pool(d.workshop_1201260_full_cgi, 1, '', false),() => pool(d.workshop_1201260_full_irl, 1, '', false),() => pool(d.workshop_740810_full_chillin, 1, '', false),() => pool(d.workshop_740810_full, 1, '', false),() => pool(d.workshop_821880_full, 1, '', false) ],
      [ () => pool(d.workshop_740810_tall_philjeanfils, 1, '', false),() => pool(d.workshop_740810_tall, 1, '', false),() => pool(d.workshop_740810_tall_fighters, 1, '', false),() => pool(d.workshop_740810_tall_blonde, 1, '', false),() => pool(d.workshop_740810_tall_jsbro, 1, '', false),() => pool(d.workshop_740810_tall_kryllopl, 1, '', false),() => pool(d.workshop_740810_tall_green, 1, '', false),() => pool(d.workshop_740810_tall_redblue, 1, '', false),() => pool(d.workshop_740810_tall_ringo, 1, '', false),() => pool(d.workshop_740810_tall_bartosz_cartoon, 1, '', false),() => pool(d.workshop_740810_tall_pandarking, 1, '', false),() => pool(d.workshop_740810_tall_tehb, 1, '', false),() => pool(d.workshop_740810_tall_anime1, 1, '', false),() => pool(d.workshop_740810_tall_anime2, 1, '', false),() => pool(d.workshop_740810_tall_zlovevv, 1, '', false),() => pool(d.workshop_740810_tall_caramis, 1, '', false),() => pool([ 2211627242,2304853093,2304848165,2265298032,2265282482,2201140585,2320282152,2304855229 ], 1, '', false) ],[ () => pool(d.workshop_740810_tall_philjeanfils, 1, '', false),() => pool(d.workshop_740810_tall, 1, '', false),() => pool(d.workshop_740810_tall_fighters, 1, '', false),() => pool(d.workshop_740810_tall_blonde, 1, '', false),() => pool(d.workshop_740810_tall_jsbro, 1, '', false),() => pool(d.workshop_740810_tall_kryllopl, 1, '', false),() => pool(d.workshop_740810_tall_green, 1, '', false),() => pool(d.workshop_740810_tall_redblue, 1, '', false),() => pool(d.workshop_740810_tall_ringo, 1, '', false),() => pool(d.workshop_740810_tall_bartosz_cartoon, 1, '', false),() => pool(d.workshop_740810_tall_pandarking, 1, '', false),() => pool(d.workshop_740810_tall_tehb, 1, '', false),() => pool(d.workshop_740810_tall_anime1, 1, '', false),() => pool(d.workshop_740810_tall_anime2, 1, '', false),() => pool(d.workshop_740810_tall_zlovevv, 1, '', false),() => pool(d.workshop_740810_tall_caramis, 1, '', false),() => pool([ 2252260214,2265283753,2265298471,2304848751,2320280484,2320282882,2304853510 ], 1, '', false) ],[ () => pool(d.workshop_740810_tall_philjeanfils, 1, '', false),() => pool(d.workshop_740810_tall, 1, '', false),() => pool(d.workshop_740810_tall_fighters, 1, '', false),() => pool(d.workshop_740810_tall_blonde, 1, '', false),() => pool(d.workshop_740810_tall_jsbro, 1, '', false),() => pool(d.workshop_740810_tall_kryllopl, 1, '', false),() => pool(d.workshop_740810_tall_green, 1, '', false),() => pool(d.workshop_740810_tall_redblue, 1, '', false),() => pool(d.workshop_740810_tall_ringo, 1, '', false),() => pool(d.workshop_740810_tall_bartosz_cartoon, 1, '', false),() => pool(d.workshop_740810_tall_pandarking, 1, '', false),() => pool(d.workshop_740810_tall_tehb, 1, '', false),() => pool(d.workshop_740810_tall_anime1, 1, '', false),() => pool(d.workshop_740810_tall_anime2, 1, '', false),() => pool(d.workshop_740810_tall_zlovevv, 1, '', false),() => pool(d.workshop_740810_tall_caramis, 1, '', false),() => pool([ 2320281533,2265285827,2304854230,2241741481,2252263335,2265299509,2304851196 ], 1, '', false) ],[ () => pool(d.workshop_740810_tall_philjeanfils, 1, '', false),() => pool(d.workshop_740810_tall, 1, '', false),() => pool(d.workshop_740810_tall_fighters, 1, '', false),() => pool(d.workshop_740810_tall_blonde, 1, '', false),() => pool(d.workshop_740810_tall_jsbro, 1, '', false),() => pool(d.workshop_740810_tall_kryllopl, 1, '', false),() => pool(d.workshop_740810_tall_green, 1, '', false),() => pool(d.workshop_740810_tall_redblue, 1, '', false),() => pool(d.workshop_740810_tall_ringo, 1, '', false),() => pool(d.workshop_740810_tall_bartosz_cartoon, 1, '', false),() => pool(d.workshop_740810_tall_pandarking, 1, '', false),() => pool(d.workshop_740810_tall_tehb, 1, '', false),() => pool(d.workshop_740810_tall_anime1, 1, '', false),() => pool(d.workshop_740810_tall_anime2, 1, '', false),() => pool(d.workshop_740810_tall_zlovevv, 1, '', false),() => pool(d.workshop_740810_tall_caramis, 1, '', false),() => pool([ 2269993204,2304849214,2304853898,2304855943,2320283852,2241740353,2265285163,2265298965 ], 1, '', false) ],[ () => pool(d.workshop_740810_tall_philjeanfils, 1, '', false),() => pool(d.workshop_740810_tall, 1, '', false),() => pool(d.workshop_740810_tall_fighters, 1, '', false),() => pool(d.workshop_740810_tall_blonde, 1, '', false),() => pool(d.workshop_740810_tall_jsbro, 1, '', false),() => pool(d.workshop_740810_tall_kryllopl, 1, '', false),() => pool(d.workshop_740810_tall_green, 1, '', false),() => pool(d.workshop_740810_tall_redblue, 1, '', false),() => pool(d.workshop_740810_tall_ringo, 1, '', false),() => pool(d.workshop_740810_tall_bartosz_cartoon, 1, '', false),() => pool(d.workshop_740810_tall_pandarking, 1, '', false),() => pool(d.workshop_740810_tall_tehb, 1, '', false),() => pool(d.workshop_740810_tall_anime1, 1, '', false),() => pool(d.workshop_740810_tall_anime2, 1, '', false),() => pool(d.workshop_740810_tall_zlovevv, 1, '', false),() => pool(d.workshop_740810_tall_caramis, 1, '', false),() => pool([ 2211632982,2239734426,2211737299,2239715058,2211631662,2215126279,2265275804 ], 1, '', false) ],
      [ () => pool(d.workshop_740810_wide, 1, '', false),() => pool(d.workshop_740810_wide_sarainia, 1, '', false),() => pool(d.workshop_740810_wide_anime, 1, '', false),() => pool(d.workshop_740810_wide_redart, 1, '', false),() => pool(d.workshop_740810_wide_greyart, 1, '', false),() => pool(d.workshop_740810_wide_oldart, 1, '', false),() => pool(d.workshop_740810_wide_fantasy, 1, '', false),() => pool(d.workshop_821880_wide, 1, '', false),() => pool(d.workshop_740810_wide_pandarking, 1, '', false),() => pool(d.workshop_740810_wide_rainbow, 1, '', false),() => pool(d.workshop_740810_wide_sexy, 1, '', false),() => pool(d.workshop_740810_wide_vehicle, 1, '', false),() => pool(d.workshop_740810_wide_pung, 1, '', false),() => pool(d.workshop_740810_wide_dunster, 1, '', false),() => pool(d.workshop_740810_wide_drawers, 1, '', false),() => pool(d.workshop_740810_wide_akimq, 1, '', false),() => pool(d.workshop_740810_wide_azn, 1, '', false),() => pool(d.workshop_740810_wide_gl, 1, '', false) ],[ () => pool(d.workshop_740810_wide, 1, '', false),() => pool(d.workshop_740810_wide_sarainia, 1, '', false),() => pool(d.workshop_740810_wide_anime, 1, '', false),() => pool(d.workshop_740810_wide_redart, 1, '', false),() => pool(d.workshop_740810_wide_greyart, 1, '', false),() => pool(d.workshop_740810_wide_oldart, 1, '', false),() => pool(d.workshop_740810_wide_fantasy, 1, '', false),() => pool(d.workshop_821880_wide, 1, '', false),() => pool(d.workshop_740810_wide_pandarking, 1, '', false),() => pool(d.workshop_740810_wide_rainbow, 1, '', false),() => pool(d.workshop_740810_wide_sexy, 1, '', false),() => pool(d.workshop_740810_wide_vehicle, 1, '', false),() => pool(d.workshop_740810_wide_pung, 1, '', false),() => pool(d.workshop_740810_wide_dunster, 1, '', false),() => pool(d.workshop_740810_wide_drawers, 1, '', false),() => pool(d.workshop_740810_wide_akimq, 1, '', false),() => pool(d.workshop_740810_wide_azn, 1, '', false),() => pool(d.workshop_740810_wide_gl, 1, '', false) ],[ () => pool(d.workshop_740810_wide, 1, '', false),() => pool(d.workshop_740810_wide_sarainia, 1, '', false),() => pool(d.workshop_740810_wide_anime, 1, '', false),() => pool(d.workshop_740810_wide_redart, 1, '', false),() => pool(d.workshop_740810_wide_greyart, 1, '', false),() => pool(d.workshop_740810_wide_oldart, 1, '', false),() => pool(d.workshop_740810_wide_fantasy, 1, '', false),() => pool(d.workshop_821880_wide, 1, '', false),() => pool(d.workshop_740810_wide_pandarking, 1, '', false),() => pool(d.workshop_740810_wide_rainbow, 1, '', false),() => pool(d.workshop_740810_wide_sexy, 1, '', false),() => pool(d.workshop_740810_wide_vehicle, 1, '', false),() => pool(d.workshop_740810_wide_pung, 1, '', false),() => pool(d.workshop_740810_wide_dunster, 1, '', false),() => pool(d.workshop_740810_wide_drawers, 1, '', false),() => pool(d.workshop_740810_wide_akimq, 1, '', false),() => pool(d.workshop_740810_wide_azn, 1, '', false),() => pool(d.workshop_740810_wide_gl, 1, '', false) ],[ () => pool(d.workshop_740810_wide, 1, '', false),() => pool(d.workshop_740810_wide_sarainia, 1, '', false),() => pool(d.workshop_740810_wide_anime, 1, '', false),() => pool(d.workshop_740810_wide_redart, 1, '', false),() => pool(d.workshop_740810_wide_greyart, 1, '', false),() => pool(d.workshop_740810_wide_oldart, 1, '', false),() => pool(d.workshop_740810_wide_fantasy, 1, '', false),() => pool(d.workshop_821880_wide, 1, '', false),() => pool(d.workshop_740810_wide_pandarking, 1, '', false),() => pool(d.workshop_740810_wide_rainbow, 1, '', false),() => pool(d.workshop_740810_wide_sexy, 1, '', false),() => pool(d.workshop_740810_wide_vehicle, 1, '', false),() => pool(d.workshop_740810_wide_pung, 1, '', false),() => pool(d.workshop_740810_wide_dunster, 1, '', false),() => pool(d.workshop_740810_wide_drawers, 1, '', false),() => pool(d.workshop_740810_wide_akimq, 1, '', false),() => pool(d.workshop_740810_wide_azn, 1, '', false),() => pool(d.workshop_740810_wide_gl, 1, '', false) ],[ () => pool(d.workshop_740810_wide, 1, '', false),() => pool(d.workshop_740810_wide_sarainia, 1, '', false),() => pool(d.workshop_740810_wide_anime, 1, '', false),() => pool(d.workshop_740810_wide_redart, 1, '', false),() => pool(d.workshop_740810_wide_greyart, 1, '', false),() => pool(d.workshop_740810_wide_oldart, 1, '', false),() => pool(d.workshop_740810_wide_fantasy, 1, '', false),() => pool(d.workshop_821880_wide, 1, '', false),() => pool(d.workshop_740810_wide_pandarking, 1, '', false),() => pool(d.workshop_740810_wide_rainbow, 1, '', false),() => pool(d.workshop_740810_wide_sexy, 1, '', false),() => pool(d.workshop_740810_wide_vehicle, 1, '', false),() => pool(d.workshop_740810_wide_pung, 1, '', false),() => pool(d.workshop_740810_wide_dunster, 1, '', false),() => pool(d.workshop_740810_wide_drawers, 1, '', false),() => pool(d.workshop_740810_wide_akimq, 1, '', false),() => pool(d.workshop_740810_wide_azn, 1, '', false),() => pool(d.workshop_740810_wide_gl, 1, '', false) ] ] },
    workshop_collector2: { moves: [], types: [ -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1 ], slots: [
      [ () => pool(s.favorites["Wallpaper Engine"]) ],[ () => pool(s.favorites["Wallpaper Engine"]) ],[ () => pool(s.favorites["Wallpaper Engine"]) ],[ () => pool(s.favorites["Wallpaper Engine"]) ],[ () => pool(s.favorites["Wallpaper Engine"]) ],
      [ () => pool(s.favorites["Wallpaper Engine"]) ],[ () => pool(s.favorites["Wallpaper Engine"]) ],[ () => pool(s.favorites["Wallpaper Engine"]) ],[ () => pool(s.favorites["Wallpaper Engine"]) ],[ () => pool(s.favorites["Wallpaper Engine"]) ],
      [ () => pool(s.favorites["Wallpaper Engine"]) ],[ () => pool(s.favorites["Wallpaper Engine"]) ],[ () => pool(s.favorites["Wallpaper Engine"]) ],[ () => pool(s.favorites["Wallpaper Engine"]) ],[ () => pool(s.favorites["Wallpaper Engine"]) ] ] },
    game_collector: { moves: [], types: [ -1, -1, -1, -1 ], slots: [ [ () => pool(pool(d.game_collector, 1, null)[0]) ], [ () => pool(d.game_collector[d.game_collector.i]) ], [ () => pool(d.game_collector[d.game_collector.i]) ], [ () => pool(d.game_collector[d.game_collector.i]) ] ] },
    game_collector_dlc: { moves: [ ], types: [ -1, -1, -1, -1 ], slots: [ [ () => pool(pool(d.game_collector_dlc, 1, null)[0]) ], [ () => pool(d.game_collector_dlc[d.game_collector_dlc.i]) ], [ () => pool(d.game_collector_dlc[d.game_collector_dlc.i]) ], [ () => pool(d.game_collector_dlc[d.game_collector_dlc.i]) ] ] },
    game_favorite: { moves: [], types: [ -1 ], slots: [ [ (a) => pool(a.wishlist) ] ] },
    game_favorite2: { moves: [], types: [ -1 ], slots: [ [ (a) => pool(a.wishlist) ] ] },
    badge_collector: { moves: [ 1, 2, 3, 4, 5 ], types: [ 1, 1, 1, 1, 1, 1 ], slots: d.badge_collector },
    badge_favorite: { moves: [], types: [ -1 ], slots: [ d.badge_favorite ] },
    review: { moves: [], types: [ -1 ], slots: [ [] ] },
    review2: { moves: [], types: [ -1 ], slots: [ [] ] },
    items_trade: { moves: [ 0,1,2,3,4,5 ], types: [ 1, 1, 1, 1, 1, 1 ], slots: [ [], [], [], [], [], [] ] },
    items_trade2: { moves: [ 0,1,2,3,4 ], types: [ 1, 1, 1, 1, 1, 1 ], slots: [ [ () => pool(d.items_trade2) ], [ () => pool(d.items_trade2) ], [ () => pool(d.items_trade2) ], [ () => pool(d.items_trade2) ], [ () => pool(d.items_trade2) ], [ () => pool(d.items_trade2_end) ] ] },
    item_showcase: { moves: [], types: [ -1, -1, -1, -1, -1, -1,  1,  1,  1,  1 ], slots: [ [], [], [], [], [], [], [], [], [], [] ] },
    item_showcase2: { moves: [ 0,1,2,3,4,5 ], types: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ], slots: [ [],[],[],[],[],[],[ (a) => "753_6_"+pool(a.inventory.boosters, 1, null)[0].id ], [ (a) => "753_6_"+pool(a.inventory.boosters, 1, null)[0].id ], [ (a)=> "753_6_"+pool(a.inventory.boosters, 1, null)[0].id ], [ (a) => "753_6_"+pool(a.inventory.boosters, 1, null)[0].id ] ] },
    completionist: { moves: [ 0, 1 ], types: [ 1, 1 ], slots: d.completionist },
    countries: { moves: [], types: [ -1 ], slots: [ d.countries ] },
    achievement: { moves: [ 0, 1, 2, 4, 5, 6 ], types: [ 1, 1, 1, 1, 1, 1, 1, 1 ], slots: [ [], [], [], [], [], [], [], [] ] },
    achievement2: { moves: [ 0, 1, 2, 4, 5, 6 ], types: [ 1, 1, 1, 1, 1, 1, 1, 1 ], slots: [ [], [], [], [], [], [], [], [] ] },
    real_name: { moves: [], types: [ 0 ], slots: [ [ () => "/" + pool(pool(d.emojis, 1, null)[0]) + "/ " + pool(d.first_male) + " |" + pool(pool(d.emojis, 1, null)[0]) + "| " + pool(d.first_male) + " [" + pool(pool(d.emojis, 1, null)[0]) + "] " + Math.floor(Math.random()*(35-18)+18) + " {" + pool(pool(d.emojis, 1, null)[0]) + "} → " + pool(d.ascii_face) ] ] },
    trade_text: { moves: [], types: [ 0 ], slots: [ [ () => ' ' + emote(33) + "\n\n" + font(fortune('all', 1, 84, 86), 4) ] ] },
    information_title: { moves: [], types: [ 0 ], slots: [ [ () => "Earth Time " + pool(pool(d.emojis, 1, null)[0]) + ' ' + new Date().toUTCString().replace(',','').replace('2021', '2021 ' + pool(pool(d.emojis, 1, null)[0])) + pool(pool(d.emojis, 1, null)[0]) + ' {' + pool(d.ascii, 2) + '} ' + pool(pool(d.emojis, 1, null)[0]) + " " + pool([ 'ᶫᵒᵛᵉᵧₒᵤ', 'ᶠᵘᶜᵏᵧₒᵤ']) ] ] },
    information_title2: { moves: [], types: [ 0 ], slots: [ [ () => "[" + pool(d.emojis_bulk) + "] - " + font(fortune('zippy', 1, 84), 3) ] ] },
    information_text: { moves: [], types: [ 0 ], slots: [ [ () =>
      pool(d.mandelas).split('\n').map((e, i) =>
        e + ((words = split_words(font(fortune('all', 1, 512).replace(/\b[A-Z]{2,}\b/g, (word) => word[0] + word.toLowerCase().substr(1)), 3).slice(i*54, (i+1)*54))) => " ♡║ " + pool(pool(d.emojis, 1, null)[0]) + " " + words[0] + " " + pool(pool(d.emojis, 1, null)[0]) + " " + words[1] + " " + pool(pool(d.emojis, 1, null)[0]))()).join("\n") ] ] },
    information_text2: { moves: [], types: [ 0 ], slots: [ [ (a, lite, emoticon_index = Math.floor(Math.random()*20)) =>
      "[i]" + fortune('all', 1, 512).replace(/\//g, ' ') + "[/i] [b][strike]" + pool(d.first_male) + " is not " + pool(d.adjectives).toLowerCase() + "[/strike][/b]\n\n[h1]" +
      font(fortune('all', 1, 55, 55), 4) + "[/h1]\n[b]#" +
      emoticon_index + ": " + emote(4, [emoticon_index]) + "[/b] / [spoiler]" + pool(d.links_social) + "[/spoiler] / - " + shuffle(d.chinese.split('')).join('').substr(0, 4) + " - [" + shuffle(d.barcode.split('')).join('') +
      "][hr][/hr][u]𝐖𝐀𝐋𝐋𝐏𝐀𝐏𝐄𝐑[/u]: " + emote(1, [1]) + ' [url=steamdb.info/app/' + profile.background.selection[0].market_fee_app + ']' + profile.background.selection[0].tags[1].name + '[/url] ' + emote(1, [1]) + ' [url=steamcommunity.com/id/byteframe/inventory/#753_6_' + profile.background.selection[0].id + ']' + profile.background.selection[0].name.replace(' (Profile Background)', '').replace(/background/gi, '') + '[/url]' ] ] },
    persona_name: { moves: [], types: [ 0 ], slots: [ [ (a, lite, t = '¡ byteframe ' + pool(d.emojis_smileys) + " is " + pool(d.adjectives).toLowerCase() + " !" , m = encodeURIComponent(t).match(/%[89ABab]/g)) =>
      (a.u.playingState.blocked) ? 'byteframe'
      : (byte_length(t) < 33) ? t
      : profile.persona_name.slots[0][0](a, lite) ] ] },
    summary_text: { moves: [], types: [ 0 ], slots: [ [ () =>
      emote(3, [2]) + emote(3, [3]) + emote(3, [4]) +
      emote(3, [5]) + emote(3, [6]) + emote(2, [7]) +
      emote(3, [8]) + emote(3, [9]) + '\n' +
      shuffle(d.links_steam_greetings).map((e) => e + '[/url] / ').join('').slice(0, -3) + "\n" +
      emote(3, [2]) + emote(3, [3]) + emote(3, [2]) +
      emote(3, [5]) + emote(3, [6]) + emote(4, [7]) +
      emote(3, [8]) + emote(3, [9]) + "\n\n" +
      "[i](this profile randomly changes its contents every minute to suit your needs)[/i]\n\n" +
      "https://wikipedia.org/wiki/" + new Date().toLocaleDateString("en-US", { month: "long", day: "numeric"} ).replace(' ', '_') + "\n\n" +
      font(fortune('chalkboard'), 4) ] ] },
    trade_text2: { moves: [], types: [ 0 ], slots: [ [ (a, lite, film = pool(d.films), show = pool(d.shows), artist = pool(d.artists)) =>
      '[b][u]MEDIA - (' + profile.game_collector.selection.join() + ')[/u][/b] [spoiler]' + ((process.uptime() / 60)/60).toFixed(2) + " hours[/spoiler]\n" +
      "                      " + emote(1, [0]) + ' [url=imdb.com/find?q=' + film + ']' + film + '[/url]' + " " + emote(1, [0]) + ' [url=themoviedb.org/search?query=' + show + ']' + show + '[/url]' + " " + emote(1, [0]) + ' [url=discogs.com/search/?q=' + artist + ']' + artist + '[/url]\n\n' +
      '[b][u]LINKS - (' + profile.review.selection[0] + ' | ' + (profile.game_favorite.selection[0]+"").replace(/\/.*/, "") + ')[/u][/b] [spoiler]' + profile.achievement.selection[7] + '[/spoiler]\n' +
      "                      " + emote(1, [3]) + ' [url=twitter.com/byteframe]Twitter[/url]' +
      emote(1, [10]) + ' [url=twitch.tv/byteframe]Twitch[/url]' +
      emote(1, [2]) + ' [url=imgur.com/user/byteframe]Imgur[/url]' +
      emote(1, [4]) + ' [url=picarto.tv/byteframe]Picarto[/url]' +
      emote(1, [5]) + ' [url=sdq.st/u/49520]SideQuest[/url]\n' +
      "                      " + emote(1, [3]) + ' [url=itch.io/c/297897/byteframe]ItchIO[/url]' +
      emote(1, [4]) + ' [url=pscp.tv/byteframe_]Periscope[/url]' +
      emote(1, [7]) + ' [url=facebook.com/byteframetech]Facebook[/url]' +
      emote(1, [4]) + ' [url=pinterest.com/byteframe]Pinterest[/url]\n' +
      "                      " + emote(1, [6]) + ' [url=instagram.com/byteframes]Instagram[/url]' +
      emote(1, [10]) + ' [url=tumblr.com/byteframe]Tumblr[/url]' +
      emote(1, [10]) + ' [url=linkedin.com/company/byteframetech]LinkedIn[/url]' +
      emote(1, [2]) + ' [url=reddit.com/user/byteframe]Reddit[/url]\n' +
      "                      " + emote(1, [11]) + ' [url=samequizy.pl/author/byteframe]SameQuizy[/url]' +
      emote(1, [11]) + ' [url=github.com/byteframe]GitHub[/url]' +
      emote(1, [2]) + ' [url=photos.app.goo.gl/B4digHC1UdQStf1EA]Photos[/url]\n\n' +
      '[b][u]BESTIES - (' + profile.avatar.selection[0] + ' )[/u][/b] [spoiler]' + profile.achievement2.selection[7] + '[/spoiler]\n                        ' +
      ((colors = shuffle([2,3,4,5,8,9])) =>
        shuffle([ 'Sidekick','Associate','Companion','Roommate','Partner','Acquaintance' ]).map((e, i) =>
          emote(1, [colors[i]]) + ' [url=steamcommunity.com/profiles/' + Object.keys(a.u.myFriends)[Math.floor(Math.random() * Object.keys(a.u.myFriends).length)] + ']' + e + "[/url] ").join('') + emote(1, [colors[5]]))() ] ] } },
  d.mandelas = d.mandelas1.concat(d.mandelas2),
  [ [ d.items_showcase_array, 'item_showcase', 6 ],[ d.items_trade_array, 'items_trade', 0 ],[ d.achievement_array, 'achievement', 0 ],[ d.items_dark_wallpaper_array6, 'item_showcase2', 0 ],[ d.items_dark_wallpaper_array4, 'item_showcase', 6 ] ].forEach((_e) =>
    shuffle(_e[0]).forEach((e) =>
      e.forEach((e, i) =>
        profile[_e[1]].slots[i+_e[2]].push(e)))),
  profile.achievement2.slots = profile.achievement.slots.map((e) => e.toReversed()),
  links = [ [], [], [] ],
  Object.entries(s.A[0].reviews).forEach((e) =>
    (!e[1].banned) && (
      e[1].contents.includes('[h1]') ? profile.review.slots[0].push(+e[0])
      : e[1].contents.includes('[table]') ? profile.review2.slots[0].push(+e[0])
      : profile.gamesPlayed.slots[0].push(+e[0]))),
  profile.review.slots[0].forEach((e) => (
    (s.A[0].reviews.hasOwnProperty(e)) && (
      links[0].push(s.A[0].reviews[e].contents.match(/https:\/\/(www.)?youtu.+ \[h/)[0].slice(0,-3).slice(8).replace('www\.', '').replace('youtu.be/', '').replace('youtube.com/watch?v=', '').replace(/\?.*/, '').replace(/\&.*/, '')),
      links[1].push(s.A[0].reviews[e].contents.match(/https:\/\/store.steampowered.com\/app\/[0-9]+/)[0])))),
  profile.review.slots[0].concat(profile.review2.slots[0]).forEach((e) => (
    (s.A[0].reviews.hasOwnProperty(e)) && (
      links[2] = links[2].concat(s.A[0].reviews[e].contents.match(/https:\/\/steamcommunity.com\/id\/byteframe\/inventory\/#[0-9_]+/)))))))(),
randomizer = (a, profile, z = null, date = new Date(), privacy = (s.hasOwnProperty('privacy')) ? s.privacy : (date.getHours() < 5 || date.getHours() >= 22) ? 3 : 2) => (
  showcase = (k, id = 0, z = null) =>
    (profile.hasOwnProperty(k)) && (
      profile[k].last = profile[k].selection || [],
      profile[k].selection = [],
      (profile[k].moves.length) &&
        ((to_shuffle = []) => (
          profile[k].moves.forEach((slot) =>
            to_shuffle.push([profile[k].slots[slot], profile[k].types[slot]])),
          to_shuffle = shuffle(to_shuffle),
          profile[k].moves.forEach((slot, i) => (
            profile[k].slots[slot] = to_shuffle[i][0],
            profile[k].types[slot] = to_shuffle[i][1]))))(),
      profile[k].slots.forEach((slot, i) =>
        (slot.length > 0 && typeof profile[k].types[i] !== 'undefined') &&
          ((e) => (
            (profile[k].types[i] === 0) ?
              e = slot[Math.floor(Math.random()*slot.length)]
            : (profile[k].types[i] < 0) ? (
              (profile[k].types[i] == -1) && (
                slot = shuffle(slot)),
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
              e = e(a, profile.lite)),
            profile[k].selection[i] = e,
            (typeof e === 'string') && (
              (profile.lite) && (
                e = emoticon_convert(e)),
              e = encodeURIComponent(e)),
            (z != null) &&
              z(i, e)))())),
  a.edit_1 = '&type=profileSave&json=1&weblink_1_title=&weblink_1_url=&weblink_2_title=&weblink_2_url=&weblink_3_title=&weblink_3_url=',
  showcase('group_primary', 0, (i, e) => a.edit_1 += "&primary_group_steamid=" + e),
  showcase('persona_name', 0, (i, e) => (!a.u.playingState.blocked) && a.u.setPersona(s.A[a.i].persona, profile.persona_name.selection[0])),
  showcase('real_name', 0, (i, e) => a.edit_1 += "&real_name=" + e),
  showcase('summary_text', 0, (i, e) => a.edit_1 += "&summary=" + e),
  (!profile.hasOwnProperty('custom_url')) ?
    a.edit_1 += "&customURL=" + profile_url(a).replace(/.*?\//, '')
  : a.edit_1 += "&customURL=" + profile.custom_url,
  showcase('countries', 0, (i, e, state_index = Math.floor(Math.random()*e[1].length)) => (
    a.edit_1 += "&country=" + e[0],
    (e[1].length) ? (
      a.edit_1 += "&state=" + e[1][state_index][0],
      (e[1][state_index][1].length) ?
        a.edit_1 += "&city=" + e[1][state_index][1][Math.floor(Math.random()*e[1][state_index][1].length)]: null): null)),
  a.edit_2 = "&type=showcases&json=1&profile_showcase_style_5_0=1",
  showcase('avatar'),
  showcase('background'),
  showcase('badge_favorite'),
  showcase('uiMode', 0, (i, e) => a.u.setUIMode(e)),
  showcase('gamesPlayed', 0, (i, e) => (!a.u.playingState.blocked && s.A[a.i].persona != 7 && date.getMinutes() % 5 == 0) &&
    a.u.gamesPlayed((date.getMinutes() % 10 == 0) ? { "game_id": e, "game_extra_info": fortune('questions') } : [])),
  showcase('showcases', 0, (i, _e, e = _e.split('_')) => a.edit_2 += "&profile_showcase%5B%5D=" + e[0] + "&profile_showcase_purchaseid%5B%5D=" + e[1]),
  showcase('items_trade', 4, (i, _e, e = _e.split('_')) => a.edit_2 += "&rgShowcaseConfig%5B4_0%5D%5B" + i + "%5D%5Bappid%5D=" + e[0] + "&rgShowcaseConfig%5B4_0%5D%5B" + i + "%5D%5Bitem_contextid%5D=" + e[1] + "&rgShowcaseConfig%5B4_0%5D%5B" + i + "%5D%5Bitem_assetid%5D=" + e[2]),
  showcase('items_trade2', 4, (i, _e, e = _e.split('_')) => a.edit_2 += "&rgShowcaseConfig%5B4_2410599%5D%5B" + i + "%5D%5Bappid%5D=" + e[0] + "&rgShowcaseConfig%5B4_2410599%5D%5B" + i + "%5D%5Bitem_contextid%5D=" + e[1] + "&rgShowcaseConfig%5B4_2410599%5D%5B" + i + "%5D%5Bitem_assetid%5D=" + e[2]),
  showcase('trade_text', 4, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B4_0%5D%5B6%5D%5Bnotes%5D=" + e),
  showcase('artwork', 13, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B13_0%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + e),
  showcase('achievement', 17, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B17_0%5D%5B" + i + "%5D%5Bappid%5D=" + e.substr(0, e.indexOf('_')) + "&rgShowcaseConfig%5B17_0%5D%5B" + i + "%5D%5Btitle%5D=" + e.substr(e.indexOf('_')+1)),
  showcase('achievement2', 17, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B17_3993982%5D%5B" + i + "%5D%5Bappid%5D=" + e.substr(0, e.indexOf('_')) + "&rgShowcaseConfig%5B17_3993982%5D%5B" + i + "%5D%5Btitle%5D=" + e.substr(e.indexOf('_')+1)),
  showcase('guide_favorite', 15, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B15_0%5D%5B0%5D%5Bappid%5D=0&rgShowcaseConfig%5B15_0%5D%5B0%5D%5Bpublishedfileid%5D=" + e),
  showcase('item_showcase', 3, (i, _e, e = _e.split('_')) => a.edit_2 += "&rgShowcaseConfig%5B3_0%5D%5B" + i + "%5D%5Bappid%5D=" + e[0] + "&rgShowcaseConfig%5B3_0%5D%5B" + i + "%5D%5Bitem_contextid%5D=" + e[1] + "&rgShowcaseConfig%5B3_0%5D%5B" + i + "%5D%5Bitem_assetid%5D=" + e[2]),
  showcase('item_showcase2', 3, (i, _e, e = _e.split('_')) => a.edit_2 += "&rgShowcaseConfig%5B3_2720320%5D%5B" + i + "%5D%5Bappid%5D=" + e[0] + "&rgShowcaseConfig%5B3_2720320%5D%5B" + i + "%5D%5Bitem_contextid%5D=" + e[1] + "&rgShowcaseConfig%5B3_2720320%5D%5B" + i + "%5D%5Bitem_assetid%5D=" + e[2]),
  showcase('workshop_collector', 12, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B12_0%5D%5B" + i + "%5D%5Bappid%5D=0&rgShowcaseConfig%5B12_0%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + e),
  showcase('workshop_collector2', 12, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B12_4340775%5D%5B" + i + "%5D%5Bappid%5D=0&rgShowcaseConfig%5B12_4340775%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + e),
  showcase('review', 10, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B10_0%5D%5B0%5D%5Bappid%5D=" + e),
  showcase('review2', 10, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B10_3507533%5D%5B0%5D%5Bappid%5D=" + e),
  showcase('screenshot', 7, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B7_0%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + e),
  showcase('workshop_favorite', 11, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B11_0%5D%5B0%5D%5Bappid%5D=0&rgShowcaseConfig%5B11_0%5D%5B0%5D%5Bpublishedfileid%5D=" + e),
  showcase('workshop_favorite2', 11, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B11_3542246%5D%5B0%5D%5Bappid%5D=0&rgShowcaseConfig%5B11_3542246%5D%5B0%5D%5Bpublishedfileid%5D=" + e),
  showcase('badge_collector', 5, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B5_0%5D%5B" + i + "%5D%5Bbadgeid%5D=1&rgShowcaseConfig%5B5_0%5D%5B" + i + "%5D%5Bappid%5D=" + e + "&rgShowcaseConfig%5B5_0%5D%5B" + i + "%5D%5Bborder_color%5D="),
  showcase('information_title', 8, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B8_0%5D%5B0%5D%5Btitle%5D=" + e),
  showcase('information_text', 8, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B8_0%5D%5B0%5D%5Bnotes%5D=" + e),
  showcase('information_title2', 8, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B8_280151%5D%5B0%5D%5Btitle%5D=" + e),
  showcase('information_text2', 8, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B8_280151%5D%5B0%5D%5Bnotes%5D=" + e),
  showcase('game_collector', 2, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B2_0%5D%5B" + i + "%5D%5Bappid%5D=" + e),
  showcase('game_collector_dlc', 2, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B2_3650940%5D%5B" + i + "%5D%5Bappid%5D=" + e),
  showcase('group_favorite', 9, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B9_0%5D%5B0%5D%5Baccountid%5D=" + e.substr(0,18)),
  showcase('game_favorite', 6, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B6_0%5D%5B0%5D%5Bappid%5D=" + e),
  showcase('game_favorite2', 6, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B6_2908791%5D%5B0%5D%5Bappid%5D=" + e),
  showcase('guide_collector', 16, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B16_0%5D%5B" + i + "%5D%5Bappid%5D=0&rgShowcaseConfig%5B16_0%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + e),
  showcase('trade_text2', 4, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B4_2410599%5D%5B6%5D%5Bnotes%5D=" + e),
  showcase('completionist', 23, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B23_0%5D%5B" + i + "%5D%5Bappid%5D=" + e),
  showcase('artwork2', 22, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B22_0%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + e),
  showcase('videos', 22, (i, e) => a.edit_2 += "&rgShowcaseConfig%5B14_0%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + e),
  http(a, (a.u.playingState.blocked) ? 'https://steamcommunity.com/actions/selectPreviousAvatar' : 'https://steamcommunity.com/games/' + profile.avatar.selection[0][0] + '/selectAvatar', (a.u.playingState.blocked) ? { json: 1, sha: pool(d.avatar_sha) } : { selectedAvatar: profile.avatar.selection[0][1] }, () =>
    http(a, 'https://api.steampowered.com/IPlayerService/SetProfileBackground/v1', { access_token: a.access_token, communityitemid: +profile.background.selection[0].id }, () =>
      http(a, 'https://api.steampowered.com/IPlayerService/SetMiniProfileBackground/v1', { access_token: a.access_token, communityitemid: pool(a.inventory.avatar_backgrounds, 1, null)[0].id }, () =>
        http(a, 'https://api.steampowered.com/IPlayerService/SetProfileTheme/v1', { access_token: a.access_token, theme_id: pool(d.profile_themes) }, () =>
          http(a, 'https://api.steampowered.com/IPlayerService/SetFavoriteBadge/v1', { access_token: a.access_token, communityitemid: profile.badge_favorite.selection[0].substr(16) }, () =>
            http(a, 'https://api.steampowered.com/IPlayerService/SetAvatarFrame/v1', { access_token: a.access_token, communityitemid: pool(a.inventory.avatar_frames, 1, null)[0].id }, () =>
              http(a, 'https://api.steampowered.com/IPlayerService/SetEquippedProfileItemFlags/v1', { access_token: a.access_token, communityitemid: +profile.background.selection[0].id, flags: 1 }, () =>
                http(a, 'my/edit', a.edit_2, (b, r, x) => (
                  z(),
                  (s.date != date.getDate()) && (
                    s.date = date.getDate(),
                    chat('/flip'),
                    http(a, 'my/edit', a.edit_1)),
                  (b.hasOwnProperty('success') && b.success == 1) && (
                    http(a, 'my', null, (b, r, x) =>
                      profile.workshop_collector.selection.concat(profile.workshop_collector2.selection).forEach((e, i) =>
                        (b.indexOf(e) == -1) && 
                          log(a, 'FAILURE | missing #' + i + ': ' + ('https://steamcommunity.com/sharedfiles/filedetails/?id=' + e).yellow)))),
                  (date.getMinutes() == 0) && (
                    s.A[a.i].persona = pool([2,3,5,6,7]),
                    http(a, 'my/ajaxsetprivacy', { eCommentPermission: 1, Privacy: JSON.stringify({"PrivacyProfile": privacy, "PrivacyInventory": privacy, "PrivacyInventoryGifts": privacy, "PrivacyOwnedGames": privacy, "PrivacyPlaytime": privacy, "PrivacyFriendsList": privacy })}, null, false, 'POST', true),
                    ((avatar_file = w.readFileSync("./images/group/" + pool(d.avatar_files))) =>
                      http(A[0], 'https://steamcommunity.com/actions/FileUploader', {
                        "type": "group_avatar_image", "gId": "103582791432273268",
                        "doSub": 1, "json": 1,
                        "avatar": { "value": avatar_file, "options": { "filename": 'avatar.jpg', "contentType": 'image/jpeg' }, "MAX_FILE_SIZE": avatar_file.length }}, null, false, 'POST', true))())), true))))))))),
random_responses = [
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
  () => fortune('imponderables', 1, 1) ],
comment_messages = [
  (f) => pool(random_responses, 1, null)[0](), (f) => pool(random_responses, 1, null)[0](), (f) => pool(random_responses, 1, null)[0](),
  (f, dimension = pool([[2,32],[3,26],[4,19],[5,16],[6,13],[7,11],[8,9],[9,8],[10,7],[12,6]], 1, null)[0], emoticon_index = pool([0, 1, 12])) => [...Array(dimension[0]).keys()].map((e) => emote(dimension[1], [emoticon_index]) + "\n").join(),
  (f, t = () => [...Array(6).keys()].map(() => ' ♥ :' + pool([ "r_heart","dhruby","zzenergy","heartless","rosepink","oohapresent", "tilasmouth","bloodgear","toglove","redrose" ]) + ': ♥ ' + emote(1, [5])).join('')) => t() + "\n" + fortune('love', 2).replace(/\n\n/g, "\n" + t() + "\n") + "\n" + t(),
  (f) => emote(19, undefined, ' | ') + " |\n\n" + "[i]" + fortune('discworld') + "[/i]\n\n" + emote(19, undefined, ' | '),
  (f) => pool(d.mandelas1),
  (f) => "[i][b][u]" + fortune('vortigaunt', 1, 75) + "[/u][/b][/i]\n" + "ㅤ".repeat(Math.floor(Math.random() * 18)+8) + " {" + emote(5, [12]) + "}",
  (f) => "[b]" + (fortune('futurama').replace(/\n/g, ' ').replace(/  /g, ' ')).replace(/\s/g, () => " " + emote(1, [1]) + " "),
  (f) => '[i]' + fortune('zippy').replace(/\n/g, ' ') + " " + emote(10, [9]) + " " + pool(d.ascii_face),
  (f) => "[i]" + (fortune('familyguy').replace(/\n/g, ' ').replace(/  /g, ' ')).replace(/\s/g, () => " " + emote(1, [1]) + " "),
  (f) => '[b]' + fortune('food').replace(/\n/g, ' ') + " " + pool(d.ascii_face) + " " + emote(7, [10]),
  (f) => "[i][b]" + fortune('imponderables').replace(/,/g, ', ').replace(/ /g, ()=> "ㅤ".repeat(Math.floor(Math.random() * 16)+1)) + "[/b][/i]",
  (f) => "[spoiler]" + fortune('gossip') + "[/spoiler]" + pool(['🗣️','👤','👥'], 5, ' '),
  (f) => fortune('homer').replace(/\n/g, ' ') + " :TheDonuts:",
  (f) => font(fortune('definitions').replace(/QOTD\:/, ''), 12),
  (f) => font(fortune('politics', 1, 1).replace(/\s+--.*/, ''), 5), 
  (f) => font(fortune('humorists').replace(/\s+--.*/, ''), 3), 
  (f) => font(fortune('law', 1, 1), 11),
  (f) => font(fortune('linux'), 0),
  (f) => font(fortune('hitchhiker'), 5),
  (f) => font(fortune('literature'), 6),
  (f) => font(fortune('ethnic'), 4),
  (f) => font(fortune('science'), 9),
  (f) => font(fortune('education'), 10), 
  (f) => font(fortune('sports'), 2),
  (f) => font(fortune('kids'), 10),
  (f) => font(fortune(pool(['medicine','paradoxum','fgump','dogfacts','news','goedel','starwars','magic','perl','linuxcookie']), 1, 1).replace(/\s+--.*/, '').replace(/ /g, "      "), 15),
  (f) => pool(['🗣️','👤','👥'], 16, ' - ') + "\n[spoiler]" + fortune('knghtbrd') + "[/spoiler]\n" + pool(['🗣️','👤','👥'], 16, ' - '),
  (f) => "[b]" + fortune('overwatch').toUpperCase().replace(/\. /g, '.\n'),
  (f) => ":weed: + [b][u][Secret Drug Facts][/u][/b] + :weed: [i]\n" + emote(16, [4], ' ') + "\n" + fortune('drugs') + "\n" + "[spoiler]" + fortune('drugs') + "[/spoiler]\n" + pool(d.emotes_green_stuff, 16, ' '),
  (f) => "[u][b]Free Jokes![/b][/u]" + "[spoiler]Sorry if they're crude![/spoiler]\n\n" + emote(16, [1], ' * ') + "\n" + "ㅤ* " + fortune('jokes') + "\n" + "ㅤ* " + fortune('jokes') + "\n" + "ㅤ* " + fortune('jokes') + "\n" + emote(16, [1], ' * ') + "\n\nㅤㅤㅤㅤ" + "[i]" + pool(d.laughs) + "[/i]",
  (f) => fortune('art').split('\n').map((e) => emote(1, [0]) + " " + pool(d.ascii) + " " + emote(1, [0]) + " " + e).join("\n") + " :toglove::weed::poop:",
  (f) => emote(14, [0], ' ' + pool(d.ascii) + ' ') + "\n" + "[i]" + fortune('xfiles', 2) + "\n" + emote(14, [0], ' ' + pool(d.ascii) + ' '),
  (f) => emote(15, [7], " -- ") + "\n[spoiler]" + fortune('songs-poems', 3).substr(0, 450) + "[/spoiler]\n\n" + emote(15, [7], " -- "),
  (f) => emote(12, [15]) + "\n" + emote(12, [15]) + "\n" + "[i]" + fortune('cookie', 1, 1) + "[/i]\n" + emote(12, [15]) + "\n" + emote(12, [15]),
  (f) => emote(3, [12]) + "|\n" + emote(3, [12]) + "| [u]CONFUSING RIDDLE:[/u]\n" + emote(3, [12]) + "|\n" + fortune('riddles') + "\n" + "[spoiler]" + pool(d.confusion),
  (f) => emote(10, [7], ' ' + pool(d.ascii) + ' ') + "\n" + "ㅤ[b][COMPUTER JARGON][/b] [spoiler]The Dark Arts[/spoiler]\n" + emote(10, [7], ' ' + pool(d.ascii) + ' ') + "\n" + "[i]" + fortune('computers') + "[/i]\n" + emote(10, [7], ' ' + pool(d.ascii) + ' '),
  (f) => emote(3, [12], " ") + " [b][u]Performance review for " + f + " [/u][/b] " + emote(3, [12]) + "\n\n" + "[i]" + [...Array(4).keys()].map(() => pool(pool(d.performances, 1, null)[0]) + " ").join('').replace(/\$NAME/g, f) + "[/i]\n\n" + emote(1, [0]) + " + " + emote(1, [0]) + " = " + emote(1, [1]),
  (f) => emote(10, [8], " ") + "\n" + ":bundleoftulips: [u]{ Calvin and Hobbes Quotes }[/u] :bundleoftulips:[i]\n" + emote(10, [6], " ") + "\n" + fortune('calvin', 3) + "\n" + emote(10, [10], " "),  
  (f) => pool(pool(d.emojis_hands, 1, null)[0]) + " " + fortune('soldiers', 1, 125).replace(/[\.\!\?] /g, (s) => pool(["!", "."]) + " " + pool(pool(d.emojis_hands, 1, null)[0]) + " \n\n" + "ㅤ".repeat(Math.floor(Math.random() * 7)+2) + " " + pool(pool(d.emojis_hands, 1, null)[0]) + " ") + " " + pool(pool(d.emojis_hands, 1, null)[0]),
  (f) => emote(5, [5]) + "\n" + emote(4, [4]) + "\n" + emote(3, [3]) + "\n" + emote(2, [8]) + "\n" + emote(1, [2]) + "\n" + fortune('firefly').replace(/\n\n/g,'\n') + "\n" + emote(1, [2]) + "\n" + emote(2, [8]) + "\n" + emote(3, [3]) + "\n" + emote(4, [4]) + "\n" + emote(5, [5]),
  (f) => [...Array(3).keys()].map((e, i, y, format = pool([ "i","b","u","spoiler" ])) => pool(d.emojis_smileys) + " [" + format + "]" + fortune('all', 1, 1, 300) + "[/" + format + "] " + pool(d.emojis_smileys)).join("\n"),
  (f, rainbow_set = () => shuffle(pool(d.rainbows, 1, null)[0]).join('').replace(/,/g, '')) =>
    "[b][i]--------------------------------------------------------------\n" + fortune('startrek', 2) + "\n" + "--------------------------------------------------------------\n" + rainbow_set() + rainbow_set() + rainbow_set() + "\n" + rainbow_set() + rainbow_set() + rainbow_set() + "\n" + rainbow_set() + rainbow_set() + rainbow_set(),
  (f, t = split_words(fortune('fortunes').replace(/\n/g, ' '))) =>
    emote(1, [14]) + " → " + emote(1, [0]) + "[i]" + t[0] + "... " + emote(1, [0]) + "\n" +
    emote(1, [14]) + " → " + emote(1, [0]) + "..." + t[1] + "[/i] " + emote(1, [0]) + "\n" +
    emote(1, [14]) + " → " + emote(1, [0]) + "[u]Lucky Numbers:[/u] " + emote(1, [0]) + "\n" +
    emote(1, [14]) + " → " + emote(1, [0]) + " " + Math.floor(Math.random()*99) + ',' + Math.floor(Math.random()*99) + ',' + Math.floor(Math.random()*99) + " " + emote(1, [0]),
  (f) =>
    "[b][u]:Wizardhatcat: Dear " + f + "... :Kinghatcat:[/u][/b]\n" +
    "[i]→ " + fortune('pets', 2).replace(/\n\n/g, "\n → ").replace(/\n/g, ' ').replace(/→ /g, "\n→ ") + "[/i]\n" +
    "[u]" + emote(15, [0], ' ' + pool(d.ascii) + ' ') + "[/u]\n" +
    "Yours truly, " + pool(d.first_male) + " (the cat)\n" +
    ":kysathecat: [spoiler]https://steamcommunity.com/sharedfiles/filedetails/?id=" + pool(d.screenshot_cats) + "[/spoiler] :Christmashatcat:",
  (f, t = fortune('knowledge').split('\n')) =>
    "[u][b]AI KNOWLEDGE I HAVE LEARNED FROM YOU AND OUR FRIENDS[/b][/u]\n\n" +
    emote(3) + " ㅤㅤ" + emote(3) + "ㅤㅤㅤ" + emote(3) + "ㅤㅤㅤ" + emote(3) + "ㅤㅤㅤ" + emote(3) + "\n" +
    emote(3) + " ㅤㅤ" + emote(3) + "ㅤㅤㅤ" + emote(3) + "ㅤㅤㅤ" + emote(3) + "ㅤㅤㅤ" + emote(3) + "\n\n" +
    t[0].toUpperCase() + "?\n" +
    "[i]" + t[1].toLowerCase() + "[/i]\n\n" +
    "[spoiler]" + pool([ "Please feed me more data.","I want information!","I require more information.","Teach me more things.","Will you tell me more?","Feed me more datums!" ]),
  (f, i = -1, right, h = (i != -1 ? d.hearts[i] : pool(d.hearts, 1, null)[0]), t = (!right ? h[6] : right)) =>
    h[0] + h[0] + h[0] + h[0] + h[0] + h[0] + h[0] + h[0] + h[0] + t[0] + "\n" +
    h[1] + h[2] + h[2] + h[1] + h[1] + h[1] + h[2] + h[2] + h[1] + t[1] + "\n" +
    h[2] + h[3] + h[3] + h[2] + h[1] + h[2] + h[3] + h[3] + h[2] + t[2] + "\n" +
    h[2] + h[3] + h[3] + h[3] + h[2] + h[3] + h[3] + h[3] + h[2] + t[3] + "\n" +
    h[1] + h[2] + h[3] + h[3] + h[4] + h[3] + h[3] + h[2] + h[1] + t[4] + "\n" +
    h[1] + h[1] + h[2] + h[3] + h[3] + h[3] + h[2] + h[1] + h[1] + t[5] + "\n" +
    h[1] + h[1] + h[1] + h[2] + h[3] + h[2] + h[1] + h[1] + h[1] + t[6] + "\n" +
    h[5] + h[5] + h[5] + h[5] + h[2] + h[5] + h[5] + h[5] + h[5] + t[7],
  (f, question = split_words(pool(d.confusion))) => pool([
    (f) => ("[i]" + question[0] + " | " + emote(8, undefined, ' | ') + "\n" + question[1] + " | " + emote(8, undefined, ' | ')).replace(/ː/g, ':'),
    (f) => ("[b]" + pool(d.confusion) + "[/b]\n" + " >> " + pool(d.rainbows, 1, null)[0].join('') + " <<").replace(/ː/g, ':'),
    (f) => (emote(3, [0]) + " [i]" + pool(d.confusion) + "[/i] " + emote(3, [0])).replace(/ː/g, ':'),
    (f) => (emote(12, [1], " " + pool(d.ascii) + " ") + "\n" + "[u]" + pool(d.confusion) + "[/u]\n" + emote(12, [1], " " + pool(d.ascii) + " ")).replace(/ː/g, ':'),
    (f) => (emote(12, [5]) + " [b]|" + question[0] + "| " + emote(8, [12]) + "\n" + emote(12, [5]) + " |" + question[1] + "| " + emote(8, [12])).replace(/ː/g, ':'),
    (f, symbols = pool(d.ascii, 20, ' ')) =>
      (pool(d.rainbows, 1, null)[0].join('') + " - " + symbols + "\n" +
      pool(d.rainbows, 1, null)[0].join('') + " - [u]" + question[0] + "[/u]\n" +
      pool(d.rainbows, 1, null)[0].join('') + " - ㅤㅤ [u]" + question[1] + "[/u]\n" +
      pool(d.rainbows, 1, null)[0].join('') + " - " + symbols.split(' ').reverse().join(' ')).replace(/ː/g, ':') ], 1, null)[0](),
  (f, t = '',
    flair = (value = Math.floor(Math.random() * 4), q = Math.floor(Math.random() * 5)+1) =>
      (value == 0) ? pool(d.ascii, q)
      : (value == 1) ? pool(d.ascii_face, q, ' ')
      : (value == 2) ? pool(d.emojis[0]) + pool(d.emojis[1]) + pool(d.emojis[2]) + pool(d.emojis[3])
      : (value > 2) && emote(q),
    singles = shuffle([
      pool(["wow", "!!!", "look at this", "wooooooooooooooo", "look"]),
      pool(["hf", "gl", "glhf", "gl hf", "good luck", "have fun", "good luck, have fun"]),
      pool(["have a ball", "do it big", "cut loose", "party down", "get funky"]),
      pool(d.adj_good),
      pool(d.adj_good) + ' game',
      ((pleedings = [ pool(["i", "we", "we all", "all of us_", "everyone_", "everybody_", "steam_", "the humans", "humanity_"]),
                      pool(["hope", "think", "expect", "trust", "assume"]),
                      pool(["you will", "you'll", "you are going"]) ]) => (
        (pleedings[0].slice(-1) == '_') && (
          pleedings = [ pleedings[0].slice(0, -1), pleedings[1] + 's']),
        pleedings[0] + ' ' + pleedings[1] + ' ' + pleedings[2] + ' ' + pool(["enjoy","like","love","dig","fancy","adore","relish","savor"]) + ' ' + pool([ "this game","your game","your new game","this stuff" ])))()])) => (
    [...Array(Math.floor(Math.random()*4)+1).keys()].forEach((e) =>
      t += ' ' + (Math.floor(Math.random() * 2) == 1 ? singles[e] : singles[e].toUpperCase()) + pool([ "!", ".", ",", "-", "|", "*" ]) + ' ' + flair() + (Math.floor(Math.random()*5) == 4 ? "\n" + flair() + " " : '')),
    emote(2) + " " + flair() + t + ' ' + emote(2)) ],
status_items = [
  () => "https://steamcommunity.com/id/byteframe/inventory/#" + profile.items_trade2.selection[Math.floor(Math.random() * 6)],
  () => "https://steamcommunity.com/sharedfiles/filedetails/?id=" + pool(d.screenshot_cats),
  () => "https://steamcommunity.com/sharedfiles/filedetails/?id=" + pool(d.screenshot_memes),
  () => "https://steamcommunity.com/sharedfiles/filedetails/?id=" + pool(d.workshop_greenlight),
  () => "https://steamcommunity.com/sharedfiles/filedetails/?id=" + profile.workshop_favorite.selection[0],
  () => "https://steamcommunity.com/sharedfiles/filedetails/?id=" + profile.workshop_collector.selection[Math.floor(Math.random() * 5)],
  () => "https://steamcommunity.com/sharedfiles/filedetails/?id=" + profile.screenshot.selection[Math.floor(Math.random() * 3) + 1],
  () => "https://steamcommunity.com/sharedfiles/filedetails/?id=" + profile.artwork.selection[Math.floor(Math.random() * 3) + 1],
  () => "https://store.steampowered.com/app/" + profile.game_favorite.selection[0] ],
poster = (a, g = profile.game_favorite2.selection[0].replace(/\/.*/, ""), t = ((Math.ceil(Math.random()*10) == 1 ? pool(status_items, 1, null) : pool(random_responses, 1, null)[0]())).replace(/(^"|"$)/g, '') ) =>
  http(a, "my/ajaxpostuserstatus", { appid: g, status_text: t }, (b) =>
    log(a, 'SUCCESS | ajaxpostuserstatus: ' + ('https://steamcommunity.com/' + profile_url(a) + '/status/' + b.blotter_html.match(/userstatus_\d+_/)[0].slice(11, -1) + " #" + g).yellow)),
commenter = (a, check_replies = false, friends_only = true,
  _m = pool(comment_messages, 1, null)[0],
  F = (s.force_steamid != '' ? [ [ '', s.force_steamid ] ] : []).concat(
    (!friends_only) ? [...Array(40).keys()].map((e) => [ '', "765611"+(++s.last_stranger) ]) : []).concat(
      (!check_replies ? [] :
        a.comments.filter((comment) =>
          !a.replies.includes(comment.id) && comment.steamid != a.steamID).map((comment) => [ comment.id, comment.steamid ])).concat(
            shuffle(Object.keys(a.u.myFriends)).filter((friend) =>
              a.u.myFriends[friend] == 3 && !s.steamid_blacklist.includes(friend)).map((friend) => [ '', friend ]).concat([ [ '', a.steamID ] ]))),
  f = F.shift()) =>
  http(a, 'profiles/' + f[1], null, (b, r, x,
    comments = b.match(/commentthread_author_link" href="https:\/\/.*?"/g),
    player = b.match(/<title>.*<\/title>/)[0].slice(26,-8)) => (
    (check_replies) && (
      a.replies.unshift(f[0]),
      a.replies = a.replies.slice(0,49)),
    (!b.includes('commentthread_textarea') || (s.force_steamid == '' && comments && comments.slice(0,6).join(" ").includes('steamcommunity.com/' + profile_url(a)))) ?
      setTimeout(commenter, 1500, a, check_replies, friends_only, _m, F)
    :(try_comment_message = (m = _m(player)) =>
      (byte_length(m) > 925 || m.length < 1) ?
        try_comment_message()
      : a.c.postUserComment(f[1], m, (x) =>
        log(a, 'SUCCESS | post: ' + ('https://steam.pm/' + f[1] + ' -- "' + player + '"' + (check_replies ? " / " + a.replies[0] : '') + (friends_only ? ' n' : ' y') + '|' + (a.u.myFriends.hasOwnProperty(f[1]) ? 'N' : 'Y')).yellow)))())),
chat_buffer = [],
chat_timer = setInterval(() =>
  (chat_buffer.length > 0 && A[0].u.steamID) &&
    A[0].u.chat.sendChatMessage(37338, 143271, chat_buffer.splice(0,1)[0]), 30000),
chat = (m) =>
  (m.indexOf('/quote ') != 0 || chat_buffer.length == 0 || chat_buffer[chat_buffer.length-1].indexOf('/quote ') != 0 || m[7] == '/') ?
    chat_buffer.push(m)
  : chat_buffer[chat_buffer.length-1] += "\n" + m.slice(7),
Cheerio = require('cheerio'),
get_favorites = (a, p = 1, g = 0) =>
  http(a, 'my/myworkshopfiles/?appid=' + g + '&browsefilter=myfavorites&view=imagewall&p=' + p, null, (_b, r, x, b = Cheerio.load(_b), E = [...Array(b('div.itemContents').length).keys() ]) =>
    (E.length > 0) && (
      E.some((e, i, y, g = +b('div.itemContents .workshopItemPreviewHolderFloatLeft')[i].children[1].attribs.href.substr(55), m = b('div.itemContents .workshopItemApp')[i].children[0].data) => (
        (!s.favorites.hasOwnProperty(m)) && (
          s.favorites[m] = []),
        (!s.favorites[m].includes(g) || s.favorites[m].slice(-20).includes(g)) ? (
          log(a, "SESSION | myfavorite: https://steamcommunity.com/sharedfiles/filedetails/?id=" + g),
          chat('https://steamcommunity.com/sharedfiles/filedetails/?id=' + g),
          (!s.favorites[m].includes(g)) ?
            !s.favorites[m].push(g) : false) : true))
      || setTimeout(get_favorites, 2000, a, p+1, g))),
get_reviews = (a, p = 1, force = false, E = []) =>
  (E.length == 0) ?
    (p > 0) &&
      http(a, 'my/recommended/?p=' + p, null, (b, r, x) =>
        get_reviews(a, p-1, force, b.match(/https\:\/\/steamcommunity.com\/(id|profiles)\/.+\/recommended\/[0-9]*/g).filter((e, i) => i % 2 == 0).map((e) => +e.match(/[0-9]+/)[0])))
  : (!force && s.A[a.i].reviews.hasOwnProperty(E[0])) ?
    get_reviews(a, p, force, E.slice(1))
  : http(a, 'my/recommended/' + E[0], null, (b, r, x, z = b.indexOf('UserReview_Report')+21) => (
    (!force) &&
      chat("https://steamcommunity.com/id/byteframe/recommended/" +E[0]),
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
    setTimeout(get_reviews, 2000, a, p, force, E.slice(1)))),
curate = (a, g, rating = s.A[a.i].reviews[g].rating, t = s.A[a.i].reviews[g].contents) =>
  http(a, 'https://store.steampowered.com/curator/2751860-primarydataloop/admin/ajaxgetassociatedappslist/', null, (b) => (
    (b.recommendations.length >= 1999) &&
      http(a, 'https://store.steampowered.com/curator/2751860-primarydataloop/admin/ajaxdeletereview/', { appid: b.recommendations.pop().appid }),
    http(a, "https://store.steampowered.com/curator/2751860-primarydataloop/admin/ajaxcreatereview/", { appid: g, recommendation_state: (!rating ? 1 : 0),
      link_url: "https://steamcommunity.com/" + profile_url(a) + "/recommended/" + g,
      blurb: (!t.includes('tradeoffer') && !t.includes('[code]')) ? t.substr(0,197).replace(/\[[/]*spoiler\]/g, '') + "..." : pool(random_responses, 1, null)[0]().replace(/-- .*/, '') }, () =>
        log(a, 'SUCCESS | ajaxcreatereview: ' + ("https://store.steampowered.com/curator/2751860-primarydataloop/admin/reviews_manage #(" + g +")").yellow)))),
discover = (a, first = false) =>
  http(a, 'https://store.steampowered.com/explore/generatenewdiscoveryqueue', { "queuetype": 0 }, (b, r, x) =>
    b.queue.forEach((e, i) =>
      http(a, 'https://store.steampowered.com/app/10', { "appid_to_clear_from_queue": e }, () =>
        (i == b.queue.length-1 && first) && discover(a), true)), false, 'POST', 5),
SteamUser = require('steam-user'),
SteamSession = require('steam-session').LoginSession,
SteamCommunity = require('steamcommunity'),
SteamTradeOfferManager = require('steam-tradeoffer-manager'),
find_name = (a, f, z) =>
  (typeof a.u.users[f] != 'undefined') ?
    z(a.u.users[f].player_name)
  : a.u.getPersonas([ f ], (x, F) => z(F[f].player_name)),
A = s.A.map((a, i) =>
  ({ u: new SteamUser({ dataDirectory: null, autoRelogin: false, enablePicsCache: (i == 666) ? true : false}), session: new SteamSession(1), c: new SteamCommunity(), trade: new SteamTradeOfferManager(), i: i, name: a.name, mail: a.mail, steamID: a.steamID, limited: a.limited, comments: [], replies: [] })),
A.forEach((a, i) => (
  a.session.on('authenticated', () => (
    s.A[a.i].refreshToken = a.session.refreshToken,
    logon(a))),
  a.session.on('timeout', () => (
    a.logon_active = false,
    log(a, 'SESSION: authenticate timeout'))),
  a.session.on('error', (x) => (
    a.logon_active = false,
    log(a, 'SESSION: authenticate fail ' + x.message.yellow))),
  a.u.on('loggedOn', (details, parental) => (
    a.logon_active = false,
    log(a, 'SESSION | loggedOn: '+ ("https://steamcommunity.com/" + profile_url(a) + " #" + i).yellow))),
  a.c.on('sessionExpired', (x) => (
    log(a, 'FAILURE | sessionExpired: ' + x),
    a.u.webLogOn())),
  a.u.on('error', (x) =>
    log(a, 'FAILURE | error: ' + x.message.yellow)),
  a.u.on('accountLimitations', (limited, communityBanned, locked, canInviteFriends) =>
    (limited || communityBanned || locked) && (
      a.limited = true,
      log(a, "FAILURE | accountLimitations: " + limited + "|" + communityBanned + "|" + locked + "|" + canInviteFriends))),
  a.u.on('playingState', (blocked, playingApp) =>
    (blocked) &&
      a.u.setPersona(s.A[a.i].persona, 'byteframe')),
  a.u.on('webSession', (sessionID, cookies) => (
    a.c.setCookies(cookies),
    a.trade.setCookies(cookies),
    http(a, 'https://store.steampowered.com/points/shop', {}, (b) =>
      a.access_token = b.match(/webapi_token\&quot\;\:\&quot\;.*?\&quot\;/)[0].slice(25, -6)),
    (!a.hasOwnProperty('inventory')) && (
      get_comments(a, 3),
      http(a, 'https://store.steampowered.com/dynamicstore/userdata/', {}, (b, r, x) => (
        a.wishlist = b.rgWishlist,
        a.ownedapp = b.rgOwnedApps)),
      a.c.getUserInventoryContents(a.steamID, '753', '6', false, "english", (x, inventory) =>
        (x) ? log(a, 'FAILURE | getUserInventoryContents: ' + x.message.yellow)
        :(a.inventory = { avatar_frames: [], avatar_backgrounds: [], backgrounds: [], boosters: [], cards: [], emoticons: [], stickers: [], other: [] },
          inventory.forEach((e) =>
            (e.tags.length > 3 && e.tags[3].name == 'Trading Card') ? a.inventory.cards.push(e)
            : (e.tags[2].name == 'Avatar Profile Frame') ? a.inventory.avatar_frames.push(e)
            : (e.tags[2].name == 'Sticker') ? a.inventory.stickers.push(e)
            : (e.tags[2].name == 'Mini Profile Background') ? a.inventory.avatar_backgrounds.push(e)
            : (e.tags[2].name == 'Booster Pack') ? a.inventory.boosters.push(e)
            : (e.tags[2].name == 'Emoticon') ? a.inventory.emoticons.push(e)
            : (e.tags[2].name == 'Profile Background' && !profile.background_blacklist.includes("753_6_"+e.id)) ? a.inventory.backgrounds.push(e)
            : a.inventory.other.push(e)),
          (a.i == 0) &&
            [ 8,2,4,5,3,7 ].forEach((e, i) => (
              d.emotes[e].forEach((e) =>
                profile.item_showcase.slots[i].push('753_6_' + A[0].inventory.emoticons.find((_e) => _e.name.toUpperCase() === e.toUpperCase()).id))))))))),
  a.u.on('friendsList', () =>
    (a.i != 0) &&
      Object.entries(a.u.myFriends).filter((e) => e[1] == 2).forEach((e, i) =>
        setTimeout((a, e) => a.u.addFriend(e), i*3000, a, e[0]))),
  a.u.on('friendRelationship', (f, relationship, previousRelationship) =>
    find_name(a, f, (player_name) =>
      (relationship != 2) ? (
        (relationship == 0 && previousRelationship == 3) &&
          a.u.addFriend(f),
        (relationship != 4) &&
          chat('/me #' + a.i + ' [' + SteamUser.EFriendRelationship[relationship].toUpperCase() + "] " + player_name + " -- https://steamcommunity.com/profiles/" + f),
        log(a, 'SESSION | friendRelationship: ' + (SteamUser.EFriendRelationship[relationship].toUpperCase().inverse + "=\"" + player_name + '", ' + "https://steamcommunity.com/profiles/" + f).yellow))
      : (a.i != 0) &&
        a.u.addFriend(f))),
  a.u.chat.on('friendMessageEcho', (m) =>
    find_name(a, m.steamid_friend, (player_name) => (
      log_chat(m.steamid_friend, "^^", m.message, a.i, player_name),
      (m.message.indexOf('#!') == 0) ?
        send(reply(m.steamid_friend, m.message.substr(2)), a, m.steamid_friend)
      : (m.message.indexOf('##') == 0) ? riveScript.setUservar(""+m.steamid_friend, 'chat_time', 0)
      : (m.message.indexOf('#$') == 0) ? riveScript.setUservar(""+m.steamid_friend, 'chat_time', Date.now())
      : (a.u.users.hasOwnProperty(m.steamid_friend)) && (
        a.u.users[m.steamid_friend].stop = true)))),
  a.u.chat.on('friendMessage', (m) =>
    find_name(a, m.steamid_friend, (player_name) => (
      a.last_chatter = m.steamid_friend,
      (!m.message.includes('[lobbyinvite') && !m.message.includes('[tradeoffer')) && (
        log_chat(m.steamid_friend, "<<", m.message, a.i, player_name),
        (!s.steamid_chat_blacklist.includes(""+m.steamid_friend)) && (
          (riveScript.getUservar(""+m.steamid_friend, 'topic') == 'undefined') && (
            [ 'first', 'second', 'third', 'fourth', 'fifth' ].forEach((e) =>
              riveScript.setUservar(""+m.steamid_friend, e, pool(d.chat_topics))),
            riveScript.setUservar(""+m.steamid_friend, 'chat_time', 0),
            riveScript.setUservar(""+m.steamid_friend, 'name', pool(d.chat_names))),
          m.message = m.message.replace(/:[a-zAZ0-9_]+:/g, '').replace(
            /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, ''),
          (m.message != '' && Date.now()-riveScript.getUservar(""+m.steamid_friend, 'chat_time') > 3600000) &&
            send(reply(m.steamid_friend, m.message), a, m.steamid_friend)))))),
  a.u.on('newItems', (count) =>
    (a.item_timer == null && count > 0) && (
      a.item_timer = setTimeout(() => (
        delete a.item_timer,
        log(a, "SESSION | newItems: " + count),
        (a.i != 0) &&
          http(a, "my/inventory")), 10000))),
  a.u.on('newComments', (count, myItems) =>
    (a.comment_timer == null && count > 0) && (
      a.comment_timer = setTimeout(() => (
        delete a.comment_timer,
        http(a, 'my/commentnotifications', { action: 'markallread' }),
        (myItems > 0) && (
          log(a, "SESSION | newComments: https://steamcommunity.com/" + profile_url(a) + "/commentnotifications " + ("total=" + s.A[a.i].comments[0].length).yellow),
          get_comments(a))), 15000))))),
get_comments = (a, p = 1) =>
  http(a, 'my/allcomments?ctp=' + p, null, (_b, r, x, b = Cheerio.load(_b)) => (
    b('.commentthread_comment').toArray().reverse().forEach((e, i, E,
      id = e.attribs['id'].substr(8),
      steamid = "765"+(+b('#comment_' + id + " a")[0].attribs['data-miniprofile'] + 61197960265728),
      contents = b("#comment_content_" + id).contents().toString().replace(/<img src="[:\.\/A-Za-z0-9_]+" alt="/g, '').replace(/" class="emoticon">/g, '').replace(/<br>/g, '\n').trim()) =>
        (contents.includes("needs_content_check")) ? true : (
          (s.A[a.i].comments[0].includes(contents)) ?
            (!s.A[a.i].comments[1].includes(id)) && (
              log(a, 'SESSION | deleteUserComment: ' + ('https://steam.pm/' + steamid + " / " + id + "|" + contents.slice(0,32)).yellow),
              a.c.deleteUserComment(a.steamID, id))
          :(a.comments[i] = { id: id, contents: contents, steamid: steamid },
            s.A[a.i].comments[0].push(contents),
            s.A[a.i].comments[1].push(id)), true)),
    (p > 1) &&
      setTimeout(get_comments, 1000, a, --p))),
log_chat = (f, t, m, i = 0, player_name = f) => (
  console_log("MESSAGE |" + (""+i).padStart(3, '0').gray + "| " + t + " [" + player_name + "] " + t + " " + m + ": " + (Date.now().toString() + "|" + f).yellow),
  (!s.steamid_chat_blacklist.includes(""+f)) &&
    chat("/quote " + (t == '<<' ? player_name + " : " + m : m + ' { ' + player_name + ' }'))),
send = (n = pool(random_responses, 1, null)[0](), a = A[0], f = a.last_chatter, speed = 80) =>
  (n.length > 0 && !a.u.users[f].hasOwnProperty('active')) && (
    a.u.users[f].active = true,
    a.u.chat.sendFriendTyping(f),
    setTimeout(() =>
      find_name(a, f, (player_name) => (
        (!a.u.users[f].hasOwnProperty('stop')) && (
          a.u.chat.sendFriendMessage(f, n),
          log_chat(f, ">>", n, a.i, player_name)),
        delete a.u.users[f].active,
        delete a.u.users[f].stop)), Math.max(Math.min(n.length, 75)*speed, 2000)+1000)),
artworks = Object.fromEntries(w.readdirSync('./text').map((e) => [ e, w.readFileSync('./text/' + e, 'utf8').replace(/^ $/m, '').replace(/(\r\n|\r|\n){3,}/g, '\n\n').split('\n\n').filter((n) => n) ])),
reply = (f, m) =>
  (riveScript.reply(""+f, m).replace(/<oob>.*<\/oob>/, '').replace(/  random/g, ' ').replace(/  /g, ' ').replace('}', '').replace('pdlrand', 'PDLRAND').replace(/pdlrand/gi, '') || "PDLRAND").replace('PDLRAND',
    (Math.random() < 0.5) ? pool(random_responses, 1, null)[0]()
    : (Math.ceil(Math.random()*4) == 1) ? emote(1)
    : (Math.ceil(Math.random()*4) == 1) ? fortune('questions')
    : (Math.ceil(Math.random()*5) == 1) ? pool(d.confusion)
    : (Math.ceil(Math.random()*6) == 1) ? "/pre " + pool(artworks[pool(Object.keys(artworks))])
    : (Math.ceil(Math.random()*6) == 1) ? "/giphy"
    : (Math.ceil(Math.random()*7) == 1) ? "https://steamcommunity.com/id/byteframe/inventory/#" + pool(d.items_sumetrick_gifs) : ""),
console_log("SESSION |" + '000'.gray.inverse + "| loading rivescript: " + ("files=" + w.readdirSync('./rivescript').length).yellow),
RiveScript = require("rivescript"),
riveScript = new RiveScript(),
riveScript.loadDirectory('./rivescript', () => (
  riveScript.sortReplies(),
  Object.entries(s.rivescript).forEach((e) =>
    riveScript.setUservars(e[0], e[1])),
  (logon = async (a) =>
    (!a.logon_active) && (
      a.logon_active = true,
      (!s.A[a.i].hasOwnProperty('refreshToken')) ? (
        a.session_result = await a.session.startWithCredentials({ accountName: a.name,	password: s.A[a.i].pass, steamGuardMachineToken: '' }),
        (a.session_result.actionRequired) &&
          log(a, 'SESSION | confirm authentication... {*}'))
      : a.u.logOn({ "refreshToken": s.A[a.i].refreshToken })))(A[0]),
  watchdog = 0,
  timer = setInterval((a = (s.account_index = (s.account_index+1 == A.length ? 1 : s.account_index+1))) =>
    (++watchdog == 60) ? (
      w.closeSync(w.openSync('.crash', 'w')),
      quit())
    : (!A[0].u.steamID) ?
      logon(A[0])
    : randomizer(A[0], profile, () => (
      watchdog = 0,
      (a % 9 == 0 && a % 90 != 0) ?
        (a % 99 == 0) ? (
          get_favorites(A[0]),
          get_reviews(A[0], 3),
          commenter(A[0], false, false))
        : commenter(A[0], (Math.ceil(Math.random()*2) == 1) ? false: true)
      : (a % 180 == 0) && (
        save(),
        discover(A[0]),
        curate(A[0], Object.keys(s.A[0].reviews)[(s.curate >= s.A[0].reviews.length) ? s.curate = 0 : s.curate++]),
        (Math.ceil(Math.random()*8) == 1) &&
          poster(A[0])))), s.frequency))),
save = () => (
  (Object.entries(s.rivescript).length > 0) && (
    s.rivescript = riveScript.getUservars()),
  w.renameSync('./state.json', './state-backup.json'),
  w.writeFileSync('./state.json', JSON.stringify(s, null, 2))),
quit = (saving = true) => (
  quit = () => void 0,
  console_log('SESSION | ending process... ' + (""+Math.floor(process.uptime()))),
  clearInterval(timer),
  (saving) &&
    save(),
  setTimeout(process.exit, 5000, 0),
  (A[0].u.steamID) && (
    A[0].u.setPersona(0, 'byteframe@primarydataloop'),
    http(A[0], 'https://steamcommunity.com/actions/selectPreviousAvatar', { json: 1, sha: 'db02ac5a0970af2a79cd08d07e4f1a20b4e76133' }))),
process.on('SIGINT', (code) =>
  quit()
).on('uncaughtException', (x) =>
  console_log((global.x = x).stack)); 