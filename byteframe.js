fs = require('fs'),
data = JSON.parse(fs.readFileSync('./data.json', 'utf-8')),
state = JSON.parse(fs.readFileSync('./state.json', 'utf8')),
Colors = require('colors'),
Cheerio = require('cheerio'),
Crypto = require('crypto'),
SteamUser = require('steam-user'),
SteamCommunity = require('steamcommunity'),
RiveScript = require("rivescript"),
font = (input, f, output = '') => (
  [...Array(input.length).keys()].forEach((item, i) =>
    (data.fonts[f][input[i]] !== undefined) ?
      output += data.fonts[f][input[i]]
    : output += input[i]),
  output),
split_words = (s,
  middle = Math.floor(s.length / 2),
  before = s.lastIndexOf(' ', middle),
  after = s.indexOf(' ', middle + 1)) => (
  middle = (middle - before < after - middle ? before : after),
  [ s.substr(0, middle), s.substr(middle + 1) ]),
shuffle_array = (array) => (
  [...Array(array.length).keys()].reverse().slice(0, -1).forEach((item, i) =>
    ((j = Math.floor(Math.random()*(item + 1)), t = array[item]) => (
      array[item] = array[j],
      array[j] = t))()),
  array),
pool = (pool, length = 1, join = '', elements = []) => (
  (!pool.hasOwnProperty('index')) && (
    pool.index = 0),
  [...Array(length).keys()].forEach((item, i) => (
    (pool.index === 0) &&
      shuffle_array(pool),
    elements.push(pool[pool.index]),
    (++pool.index == pool.length) && (
      pool.index = 0))),
  (join !== null) ?
    elements.join(join)
  : elements),
fortune_files = {},
generate_fortune = (file = 'all', count = 1, length = -1, max_length = -1, fortune = '') => (
  (!(file in fortune_files)) && (
    fortune_files[file] = fs.readFileSync('./fortunes/' + file, 'utf8').split('\n%')),
  [...Array(count).keys()].forEach((i) =>
    fortune += pool(fortune_files[file]).trim() + '\n\n'),
  fortune.replace(/ +/g, ' ').trim(),
  (length < 1 || (fortune.length >= length && (max_length < 1 || fortune.length <= max_length))) ? (
    (length > 0) && (
      fortune = fortune.replace(/\n/g, ' ')),
    fortune.trim())
  : generate_fortune(file, count, length, max_length, (fortune.length > max_length) ? "" : fortune + " ")),
insert_emojis = (text) => (
  text = text.replace(/YYY/g, () => pool(pool(data.emojis, 1, null)[0])),
  data.emojis.index = 0,
  text),
generate_emoji_fortune = (size, file = 'all', text = generate_fortune(file, 1, size, size).split(' ')) => (
  [...Array(6).keys()].forEach((i) =>
    text[(i+1)*(Math.floor((text.length+1)/6)-1)] += " YYY"),
  insert_emojis("YYY " + text.join(' ') + " YYY")),
generate_emoticon_fortune = (text, length, emoticon_index, file = 'all', fortune = generate_fortune(file).replace(/\n/g, ' ').split(/\s+/)) =>
  (fortune.length < length) ?
    generate_emoticon_fortune(text, length, emoticon_index, file)
  : ([...Array(length).keys()].forEach((i) =>
      text += pool(data.emoticons[emoticon_index], i) + " " + pool(data.ascii) + " " + fortune[i] + "\n"),
    text.trim() + ' ' + fortune.slice(length).join(' ')),
generate_emoticons = (length, text = '', delimiter = '', indexes = [ 2,3,4,5,6,7,8,9,10,11 ]) => (
  pool(indexes, length, null).forEach((index) =>
    text += pool(data.emoticons[index]) + delimiter),
  text),
generate_gossip = () => pool(data.first_male) + ' said ' + get_reply('', 'gossip').replace(/.+?said /, ''),
generate_random_response = () => pool([
  () => generate_fortune('vortigaunt', 1, 55),
  () => generate_fortune('overwatch', 1, 165),
  () => generate_fortune('soldiers', 1, 55),
  () => generate_fortune('zippy'),
  () => generate_gossip(),
  () => pool(data.confusion),() => pool(data.confusion),() => pool(data.confusion),
  () => get_reply('', 'ask me a question'),
  () => get_reply('', 'imponderables') ], 1, null)[0](),
mandelas = data.mandelas1.concat(data.mandelas2),
comment_messages = [
  (args, index = -1, right, h = (index != -1 ? data.hearts[index] : pool(data.hearts, 1, null)[0]), r = (!right ? h[6] : right)) =>
      h[0] + h[0] + h[0] + h[0] + h[0] + h[0] + h[0] + h[0] + h[0] + r[0] + "\n"
    + h[1] + h[2] + h[2] + h[1] + h[1] + h[1] + h[2] + h[2] + h[1] + r[1] + "\n"
    + h[2] + h[3] + h[3] + h[2] + h[1] + h[2] + h[3] + h[3] + h[2] + r[2] + "\n"
    + h[2] + h[3] + h[3] + h[3] + h[2] + h[3] + h[3] + h[3] + h[2] + r[3] + "\n"
    + h[1] + h[2] + h[3] + h[3] + h[4] + h[3] + h[3] + h[2] + h[1] + r[4] + "\n"
    + h[1] + h[1] + h[2] + h[3] + h[3] + h[3] + h[2] + h[1] + h[1] + r[5] + "\n"
    + h[1] + h[1] + h[1] + h[2] + h[3] + h[2] + h[1] + h[1] + h[1] + r[6] + "\n"
    + h[5] + h[5] + h[5] + h[5] + h[2] + h[5] + h[5] + h[5] + h[5] + r[7],
  (args, dimension = pool([[2,32],[3,26],[4,19],[5,16],[6,13],[7,11],[8,9],[9,8],[10,7],[12,6]]), emoticon_index = pool([0, 1, 12]), text = '') => (
    [...Array(dimension[0]).keys()].map((i) =>
      text += pool(data.emoticons[emoticon_index], dimension[1]) + "\n"),
    text),
  (args, fortune = split_words(generate_fortune('fortunes').replace(/\n/g, ' '))) =>
    pool(data.emoticons[1], 14) + " → " + pool(data.emoticons[0]) + "[i]" + fortune[0] + "... " + pool(data.emoticons[0]) + "\n"
    + pool(data.emoticons[1], 14) + " → " + pool(data.emoticons[0]) + "..." + fortune[1] + "[/i] " + pool(data.emoticons[0]) + "\n"
    + pool(data.emoticons[1], 14) + " → " + pool(data.emoticons[0]) + "[u]Lucky Numbers:[/u] " + pool(data.emoticons[0]) + "\n"
    + pool(data.emoticons[1], 14) + " → " + pool(data.emoticons[0]) + " " + Math.floor(Math.random()*99) + ','
    + Math.floor(Math.random()*99) + ',' + Math.floor(Math.random()*99) + " " + pool(data.emoticons[0]),
  (args) => (
    generate_emoticons(19, ' | ') + " |\n\n"
    + "[i]" + generate_fortune('discworld') + "[/i]\n\n"
    + generate_emoticons(19, ' | ').slice(0, -1)),
  (args) =>
    pool(data.emoticons[12], 15) + "\n"
    + pool(data.emoticons[12], 15) + "\n"
    + "[i]" + split_words(generate_fortune('cookie')).join('\n') + "[/i]\n"
    + pool(data.emoticons[12], 15) + "\n"
    + pool(data.emoticons[12], 15),
  (args, text = "[i]") => (
    [...Array(4).keys()].forEach((i) =>
      text += pool(pool(data.performances, 1, null)[0]) + " "),
    pool(data.emoticons[12], 3) + " [b][u]Performance review for " + args + " [/u][/b] " + pool(data.emoticons[12], 3) + "\n\n"
    + text.replace(/\$NAME/g, args) + "[/i]\n\n"
    + pool(data.emoticons[0], 1) + " + " + pool(data.emoticons[0], 1) + " = " + pool(data.emoticons[1])),
  (args, symbol = pool(data.ascii)) =>
    pool(data.emoticons[0], 14, ' ' + symbol + ' ') + "\n"
    + "[i]" + generate_fortune('xfiles', 2) + "\n"
    + pool(data.emoticons[0], 14, ' ' + symbol + ' '),
  (args,
    rainbow_set = () =>
      shuffle_array(pool(data.rainbows, 1, null)[0]).join('').replace(/,/g, '')) => (
    "[b][i]--------------------------------------------------------------\n"
    + generate_fortune('startrek', 2) + "\n"
    + "--------------------------------------------------------------\n"
    + rainbow_set() + rainbow_set() + rainbow_set() + "\n"
    + rainbow_set() + rainbow_set() + rainbow_set() + "\n"
    + rainbow_set() + rainbow_set() + rainbow_set()),
  (args) =>
    pool(data.emoticons[7], 15, " -- ") + "\n"
    + "[spoiler]" + generate_fortune('songs-poems', 3).substr(0, 450) + "[/spoiler]\n\n"
    + pool(data.emoticons[7], 15, " -- "),
  (args) =>
    pool(data.emoticons[8], 10, " ") + "\n"
    + ":bundleoftulips: [u][ Calvin and Hobbes Quotes ][/u] :bundleoftulips:[i]\n"
    + pool(data.emoticons[6], 10, " ") + "\n"
    + generate_fortune('calvin', 3) + "\n"
    + pool(data.emoticons[10], 10, " "),
  (args, text = generate_fortune('futurama').replace(/\n/g, ' ').replace(/  /g, ' ')) =>
    "[b]" + text.replace(/\s/g, () => " " + pool(data.emoticons[1]) + " "),
  (args,
    line = (text = '') => (
      [...Array(6).keys()].forEach((i) =>
        text += ' ♥ ' + pool(data.love_icons) + ' ♥ ' + pool(data.emoticons[5])),
      text)) =>
    line() + "\n"
    + generate_fortune('love', 2).replace(/\n\n/g, "\n" + line() + "\n") + "\n"
    + line(),
  (args) =>
    ":weed: + [b][u][Secret Drug Facts][/u][/b] + :weed: [i]\n"
    + pool(data.emoticons[4], 16, ' ') + "\n"
    + generate_fortune('drugs', 2).replace(/\n\n/, '\n[spoiler]') + "[/spoiler]\n"
    + pool(data.green_stuff, 16, ' '),
  (args) =>
    "[b][u]" + pool(data.cat_icons) + " Dear " + args + "... "  + pool(data.cat_icons) + "[/u][/b]\n[i]"
    + "→ " + generate_fortune('pets', 2).replace(/\n\n/g, "\n → ").replace(/\n/g, ' ').replace(/→ /g, "\n→ ") + "[/i]\n"
    + "[u]" + pool(data.emoticons[0], 15, ' ' + pool(data.ascii) + ' ') + "[/u]\n"
    + "Yours truly, " + pool(data.first_male) + " (the cat)\n"
    + pool(data.cat_icons) + " [spoiler]https://steamcommunity.com/sharedfiles/filedetails/?id="
    + pool(data.cats) + "[/spoiler] " + pool(data.cat_icons) + "\n",
  (args) => generate_emoticon_fortune('[i]', 10, 9, 'zippy'),
  (args, text = '',
    flair = (value = Math.floor(Math.random() * 4), amount = Math.floor(Math.random() * 5)+1) =>
      (value == 0) ?
        pool(data.ascii, amount)
      : (value == 1) ?
        pool(data.ascii_face, amount, ' ')
      : (value == 2) ?
        pool(data.emojis[0]) + pool(data.emojis[1]) + pool(data.emojis[2]) + pool(data.emojis[3])
      : (value >= 3) &&
        pool(data.emoticons[Math.floor(Math.random() * data.emoticons.length)], amount),
    singles = shuffle_array([
      pool(data.exclamation),
      pool(data.gl_hf),
      pool(data.gl_hf_long),
      pool(data.adj_good),
      pool(data.adj_good) + ' game',
      ((pleedings = [ pool(data.pleedings0), pool(data.pleedings1), pool(data.pleedings2) ]) => (
        (pleedings[0].slice(-1) == '_') && (
          pleedings[0] = pleedings[0].slice(0, -1),
          pleedings[1] += 's'),
        pleedings[0] + ' ' + pleedings[1] + ' ' + pleedings[2] + ' ' + pool(data.to_like) + ' ' + pool(data.noun_games)))()
    ])) => (
    [...Array(Math.floor(Math.random()*4)+1).keys()].forEach((i) =>
      text += ' ' + (Math.floor(Math.random() * 2) == 1 ? singles[i] : singles[i].toUpperCase()) + pool(data.punctuation) + ' ' + flair() + (Math.floor(Math.random()*5) == 4 ? "\n" + flair() + " " : '')),
    generate_emoticons(2) + " " + flair() + text + ' ' + generate_emoticons(2)),
  (args) =>
    pool([
      (args) =>
        ("[b]" + get_reply('', 'ask me a question') + "[/b]\n" + " >> " + pool(data.rainbows, 1, null)[0].join('') + " <<").replace(/ː/g, ':'),
      (args) =>
        (pool(data.emoticons[0], 3) + " [i]" + get_reply('', 'ask me a question') + "[/i] "
        + pool(data.emoticons[0], 3)).replace(/ː/g, ':'),
      (args, symbol = pool(data.ascii)) =>
        (pool(data.emoticons[1], 12, " " + symbol + " ") + "\n[u]"
        + get_reply('', 'ask me a question') + "[/u]\n"
        + pool(data.emoticons[1], 12, " " + symbol + " ")).replace(/ː/g, ':'),
      (args, question = split_words(get_reply('', 'ask me a question'))) =>
        (pool(data.emoticons[12], 5) + " [b]|"
        + question[0] + "| " + pool(data.emoticons[12], 8) + "\n"
        + pool(data.emoticons[12], 5) + " |" + question[1] + "| " + pool(data.emoticons[12], 8)).replace(/ː/g, ':'),
      (args, question = split_words(get_reply('', 'ask me a question'))) => (
        ("[i]" + question[0] + " | " + generate_emoticons(8, ' | ') + "\n"
        + question[1] + " | " + generate_emoticons(8, ' | ')).replace(/ː/g, ':')),
      (args, question = split_words(get_reply('', 'ask me a question')), symbols = pool(data.ascii, 20, ' ')) =>
        (pool(data.rainbows, 1, null)[0].join('') + " - " + symbols + "\n"
        + pool(data.rainbows, 1, null)[0].join('') + " - [u]" + question[0] + "[/u]\n"
        + pool(data.rainbows, 1, null)[0].join('') + " - ㅤㅤ [u]" + question[1] + "[/u]\n"
        + pool(data.rainbows, 1, null)[0].join('') + " - " + symbols.split(' ').reverse().join(' ')).replace(/ː/g, ':') ], 1, null)[0](),
  (args) => pool(data.mandelas1),
  (args) =>
    "[u][b]Free Jokes![/b][/u]" + "[spoiler]Sorry if they're crude![/spoiler]\n\n"
    + pool(data.emoticons[1], 16, ' * ') + "\n"
    + "ㅤ* " + get_reply('', 'joke') + "\n"
    + "ㅤ* " + get_reply('', 'joke') + "\n"
    + "ㅤ* " + get_reply('', 'joke') + "\n"
    + pool(data.emoticons[1], 16, ' * ') + "\n\nㅤㅤㅤㅤ"
    + "[i]" + pool(data.laughs) + "[/i]",
  (args) =>
    pool(data.emoticons[12], 3) + "|\n"
    + pool(data.emoticons[12], 3) + "| [u]CONFUSING RIDDLE:[/u]\n"
    + pool(data.emoticons[12], 3) + "|\n"
    + generate_fortune('riddles') + "\n"
    + "[spoiler]" + pool(['wut','wat','huh','???','idk']),
  (args, text = generate_fortune('familyguy').replace(/\n/g, ' ').replace(/  /g, ' ')) =>
    "[i]" + text.replace(/\s/g, () => " " + pool(data.emoticons[1]) + " "),
  (args) =>
    pool(data.emoticons[5], 5) + "\n"
    + pool(data.emoticons[4], 4) + "\n"
    + pool(data.emoticons[3], 3) + "\n"
    + pool(data.emoticons[8], 2) + "\n"
    + pool(data.emoticons[2]) + "\n"
    + generate_fortune('firefly').replace(/\n\n/g,'\n') + "\n"
    + pool(data.emoticons[2]) + "\n"
    + pool(data.emoticons[8], 2) + "\n"
    + pool(data.emoticons[3], 3) + "\n"
    + pool(data.emoticons[4], 4) + "\n"
    + pool(data.emoticons[5], 5),
  (args) => generate_emoticon_fortune('[b]', 7, 10, 'food'),
  (args, symbol = pool(data.ascii)) =>
    pool(data.emoticons[7], 10, ' ' + symbol + ' ') + "\n"
    + "ㅤ[b][COMPUTER JARGON][/b] [spoiler]The Dark Arts[/spoiler]\n"
    + pool(data.emoticons[7], 10, ' ' + symbol + ' ') + "\n"
    + "[i]" + generate_fortune('computers') + "[/i]\n"
    + pool(data.emoticons[7], 10, ' ' + symbol + ' '),
  (args, symbol = pool(data.ascii), result = '') => (
    generate_fortune('art').split('\n').forEach((line) =>
      result += pool(data.emoticons[0]) + " " + symbol + " " + pool(data.emoticons[0]) + " " + line + "\n"),
    result.trim() + " :toglove::weed::poop:"),
  (args) =>
    comment_message_bot(900).replace(/\[h1\]/g, '').replace(/\[\/h1\]/g, ''),
  (args) =>
    "[i][b][u]" + generate_fortune('vortigaunt', 1, 75) + "[/u][/b][/i]\n"
    + "ㅤ".repeat(Math.floor(Math.random() * 18)+8) + " {" + pool(data.emoticons[12], 4) + "}",
  (args) =>
    pool(pool(data.emojis_hands, 1, null)[0]) + " "
    + generate_fortune('soldiers', 1, 125).replace(/[\.\!\?] /g, (s) =>
      pool(["!", "."]) + " " + pool(pool(data.emojis_hands, 1, null)[0])
    + " \n\n" + "ㅤ".repeat(Math.floor(Math.random() * 7)+2) + " "
    + pool(pool(data.emojis_hands, 1, null)[0]) + " ") + " "
    + pool(pool(data.emojis_hands, 1, null)[0]),
  (args) => "[i][b]" + get_reply('', 'imponderables').replace(/,/g, ', ').replace(/ /g, ()=> "ㅤ".repeat(Math.floor(Math.random() * 16)+1)) + "[/b][/i]",
  (args) => "[spoiler]" + generate_gossip() + "[/spoiler]" + pool(['🗣️','👤','👥'], 5, ' '),
  (args) => "[i]" + get_reply('', 'tell me a story') + "[/i] " + pool(data.emojis_objects, Math.floor(Math.random()*7)+1, ' '),
  (args) => "[b]" + generate_fortune('overwatch').toUpperCase().replace(/\. /g, '.\n'),
  (args, text = generate_fortune('knowledge').split('\n')) =>
    "[u][b]AI KNOWLEDGE I HAVE LEARNED FROM YOU AND OUR FRIENDS[/b][/u]\n\n"
      + pool(data.emoticons[Math.floor(Math.random()*data.emoticons.length)], 3) + " ㅤㅤ" + pool(data.emoticons[Math.floor(Math.random()*data.emoticons.length)], 3) + "ㅤㅤㅤ" + pool(data.emoticons[Math.floor(Math.random()*data.emoticons.length)], 3) + "ㅤㅤㅤ" + pool(data.emoticons[Math.floor(Math.random()*data.emoticons.length)], 3) + "ㅤㅤㅤ" + pool(data.emoticons[Math.floor(Math.random()*data.emoticons.length)], 3) + "\n"
      + pool(data.emoticons[Math.floor(Math.random()*data.emoticons.length)], 3) + " ㅤㅤ" + pool(data.emoticons[Math.floor(Math.random()*data.emoticons.length)], 3) + "ㅤㅤㅤ" + pool(data.emoticons[Math.floor(Math.random()*data.emoticons.length)], 3) + "ㅤㅤㅤ" + pool(data.emoticons[Math.floor(Math.random()*data.emoticons.length)], 3) + "ㅤㅤㅤ" + pool(data.emoticons[Math.floor(Math.random()*data.emoticons.length)], 3) + "\n\n"
      + text[0].toUpperCase() + "?\n"
      + "[i]" + text[1].toLowerCase() + "[/i]\n\n"
      + "[spoiler]" + pool([ "Please feed me more data.","I want information!",
        "I require more information.","Teach me more things.","Will you tell me more?",
        "Feed me more datums!",
      ]) ],
comment_message_bot = (max_length, text = '', format = pool(data.bbcodes)) => (
  text += "[" + format + "]" + generate_fortune('all')
  + "[/" + format + ']\n' + pool(data.smileys) + '\n',
  (text.length >= max_length) ?
    text.trim().replace(/\[\]/g, '').replace(/\[\/\]/g, '')
  : comment_message_bot(max_length, text)),
profile = {
  lite: false,
  custom_url: 'byteframe',
  background: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [ (account) => pool(accounts[account.index].backgrounds, 1, null)[0] ] ] },
  showcases: { shuffle_slots: [], shuffle_types: [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ], slots: [ [ "4_0" ],[ "13_0" ],[ "17_0" ],[ "15_0" ],[ "3_0" ],[ "12_0" ],[ "10_0" ],[ "7_0" ],[ "11_0" ],[ "5_0" ],[ "8_0" ],[ "2_0" ],[ "9_0" ],[ "6_0" ],[ "16_0" ],[ "22_0" ], [ "8_280151" ] ] },
  screenshot: { shuffle_slots: [ 1, 2, 3 ], shuffle_types: [ -1, -1, -1, -1 ], slots: data.screenshot },
  artwork: { shuffle_slots: [ 1, 2, 3 ], shuffle_types: [ -1, -1, -1, -1 ], slots: data.artwork },
  artwork2: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [ () => pool(data.artwork2) ] ] },
  group_primary: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [ () => "103582791432273268_primarydataloop" ] ] },
  group_favorite: { shuffle_slots: [], shuffle_types: [ -1 ], slots: [ [ () => pool(data.group_favorite) ] ] },
  guide_favorite: { shuffle_slots: [], shuffle_types: [ -1 ], slots: [ [ () => pool(data.guide_favorite) ] ] },
  guide_collector: { shuffle_slots: [ 0, 1 ], shuffle_types: [ 1, 1 ], slots: [ [ () => pool(data.guides) ],[ () => pool(data.guides) ] ] },
  workshop_favorite: { shuffle_slots: [], shuffle_types: [ -1 ], slots: [ [ () => pool(data.workshop_favorite) ] ] },
  workshop_collector: { shuffle_slots: [ 0, 1, 2, 3 ], shuffle_types: [ -1, -1, -1, -1, -1 ], slots: [ data.workshop_collector[0],data.workshop_collector[1],data.workshop_collector[2],data.workshop_collector[3],[ () => pool(data.merchandise) ] ] },
  game_collector: { shuffle_slots: [  0,  1,  2,  3 ], shuffle_types: [ -1, -1, -1, -1 ], slots: data.game_collector },
  game_favorite: { shuffle_slots: [], shuffle_types: [ -1 ], slots: [ data.game_favorite ] },
  badge_collector: { shuffle_slots: [ 1, 2, 3, 4, 5 ], shuffle_types: [ 1, 1, 1, 1, 1, 1 ], slots: data.badge_collector },
  badge_favorite: { shuffle_slots: [], shuffle_types: [ -1 ], slots: [ data.badge_favorite ] },
  review: { shuffle_slots: [], shuffle_types: [ -1 ], slots: [ data.review ] },
  trade_items: { shuffle_slots: [ 0, 1, 2, 3, 4, 5 ], shuffle_types: [ 1, 1, 1, 1, 1, 1 ], slots: data.trade_items },
  item_showcase: { shuffle_slots: [], shuffle_types: [ -1, -1, -1, -1, -1, -1,  1,  1,  1,  1 ], slots: data.item_showcase },
  countries: { shuffle_slots: [], shuffle_types: [ -1 ], slots: [ data.countries ] },
  achievement: { shuffle_slots: [ 0, 1, 2, 4, 5, 6 ], shuffle_types: [ 1, 1, 1, 1, 1, 1, 1 ], slots: [ [], [], [], [], [], [], [] ] },
  persona_name: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [
    (account, lite, text = '¡ byteframe ' + pool(data.smileys) + " is " + pool(data.adjectives).toLowerCase() + " !"
      , m = encodeURIComponent(text).match(/%[89ABab]/g)) =>
      (text.length + (m ? m.length : 0) < 33) ?
        text
      : profile.persona_name.slots[0][0](account, lite) ] ] },
  real_name: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [
    (account, lite) => "/" + pool(pool(data.emojis, 1, null)[0]) + "/ "
    + pool(data.first_male) + " |" + pool(pool(data.emojis, 1, null)[0]) + "| " + pool(data.first_male)
    + " [" + pool(pool(data.emojis, 1, null)[0]) + "] " + Math.floor(Math.random()*(35-18)+18)
    + " {" + pool(pool(data.emojis, 1, null)[0]) + "} → " + pool(data.ascii_face) ] ] },
  information_title: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [
    (account, lite) => "Earth Time " + pool(pool(data.emojis, 1, null)[0]) + ' '
    + new Date().toUTCString().replace(',','').replace('2021', '2021 ' + pool(pool(data.emojis, 1, null)[0]))
    + pool(pool(data.emojis, 1, null)[0]) + ' {'
    + pool(data.ascii, 2) + '} ' + pool(pool(data.emojis, 1, null)[0])
    + " " + pool([ 'ᶫᵒᵛᵉᵧₒᵤ', 'ᶠᵘᶜᵏᵧₒᵤ']) ] ] },
  information_text: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [
    (account, lite, fortune = generate_fortune('all', 1, 512).replace(/\b[A-Z]{2,}\b/g, (word) => word[0] + word.toLowerCase().substr(1))) =>
      insert_emojis(pool(mandelas).trim().split('\n').map((line, i) =>
        line + ((words = split_words(font(fortune, 3).slice(i*54, (i+1)*54))) => " ♡║ YYY " + words[0] + " YYY " + words[1] + " YYY")()).join("\n")) ] ] },
  information_title_280151: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [
    (account, lite) => "[" + pool(data.emojis_bulk) + "] - " + font(generate_fortune('zippy', 1, 75, 90), 3) ] ] },
  information_text_280151: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [
    (account, lite, emoticon_index = Math.floor(Math.random()*20)) => "[i]" + generate_fortune('all', 1, 768, 832).replace(/\//g, ' ') + "[/i] [b][strike]" + pool(data.first_male) + " is not " + pool(data.adjectives).toLowerCase() + "[/strike][/b]\n\n[h1]" + font(generate_fortune('all', 1, 55, 55), 4) + "[/h1]\n[b]#" + emoticon_index + ": " + pool(data.emoticons[emoticon_index], 4) + "[/b] / [spoiler]" + pool(data.social_links) + "[/spoiler] - " + shuffle_array(data.chinese.split('')).join('').substr(0, 4) + " - [" + shuffle_array(data.barcode.split('')).join('') + "][hr][/hr]" ] ] },
  trade_text: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [
    (account, lite, text = ' ') => ' ' + generate_emoticons(33) + "\n\n" + font(generate_fortune('all', 1, 84, 86), 4) ] ] },
  summary_text: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [
    (account, lite,
      film = pool(data.films).replace(', The', ''),
      show = pool(data.shows).replace(', The', ''),
      artist = pool(data.artists).replace(', The', '')) =>
      pool(data.emoticons[2], 3) + pool(data.emoticons[3], 3) + pool(data.emoticons[4], 3)
      + pool(data.emoticons[5], 3) + pool(data.emoticons[6], 3) + pool(data.emoticons[7], 3)
      + pool(data.emoticons[8], 3) + (!lite ? pool(data.emoticons[9], 3) + '\n' : ":emote1::emote2::emote3:\n")
      + ((delimiter = "/", text = '') => (
          shuffle_array(data.greetings).forEach((greeting) =>
            text += greeting + '[/url] ' + delimiter + ' '),
          text.trim().slice(0, -2)))() + "\n"
      + pool(data.emoticons[2], 3) + pool(data.emoticons[3], 3) + pool(data.emoticons[4], 3)
      + pool(data.emoticons[5], 3) + pool(data.emoticons[6], 3) + pool(data.emoticons[7], 3)
      + pool(data.emoticons[8], 3) + (!lite ? pool(data.emoticons[9], 3) : ':emote1::emote2::emote3:') + '\n\n'
      + '[h1]Bestie (' + profile.achievement.selection[3] + ')[/h1]\n'
      + ((line = '', colors = shuffle_array([2,3,4,5,8,9]), besties = shuffle_array([ 'Sidekick', 'Associate', 'Companion', 'Roommate' ])) => (
        besties.forEach((bestie, index) =>
          line += pool(data.emoticons[colors[index]]) +
            ' [url=steamcommunity.com/profiles/' + Object.keys(account.user.myFriends)[Math.floor(Math.random() * Object.keys(account.user.myFriends).length)] + ']' + bestie + "[/url] "),
        line + pool(data.emoticons[colors[5]]) + "\n\n"))()
      + '[h1]Wallpaper (' + data.avatars[data.avatars.index-1] + ')[/h1]\n'
      + pool(data.emoticons[1]) + ' [url=steamdb.info/app/' + profile.background.selection[0].appid + ']'
      + profile.background.selection[0].game + '[/url] ' + pool(data.emoticons[1]) + ' [url=steamcommunity.com/id/byteframe/inventory/#753_6_'
      + profile.background.selection[0].id + ']' + profile.background.selection[0].name.replace(' (Profile Background)', '') + '[/url]\n\n'
      + '[h1]Media (' + profile.game_collector.selection.join() + ')[/h1]\n'
      + pool(data.emoticons[0]) + ' [url=imdb.com/find?q=' + film + ']' + film + '[/url]\n'
      + pool(data.emoticons[0]) + ' [url=themoviedb.org/search?query=' + show + ']' + show + '[/url]\n'
      + pool(data.emoticons[0]) + ' [url=discogs.com/search/?q=' + artist + ']' + artist + '[/url]\n\n'
      + '[h1]Link (' + profile.review.selection[0] + ' | ' + (profile.game_favorite.selection[0]+"").replace(/\/.*/, "") + ') [/h1]\n'
      + pool(data.emoticons[5]) + ' [url=youtube.com/c/byteframe]YouTube[/url]'
      + pool(data.emoticons[10]) + ' [url=twitch.tv/byteframe]Twitch[/url]'
      + pool(data.emoticons[2]) + ' [url=imgur.com/user/byteframe]Imgur[/url]'
      + pool(data.emoticons[3]) + ' [url=live.fc2.com/49197455]FC2[/url]'
      + pool(data.emoticons[2]) + ' [url=reddit.com/user/byteframe]Reddit[/url]\n'
      + pool(data.emoticons[9]) + ' [url=dlive.tv/byteframe]Dlive[/url]'
      + pool(data.emoticons[4]) + ' [url=pscp.tv/byteframe_]Periscope[/url]'
      + pool(data.emoticons[5]) + ' [url=vaughn.live/byteframe]VaughnLive[/url]'
      + pool(data.emoticons[3]) + ' [url=twitter.com/byteframe]Twitter[/url]\n'
      + pool(data.emoticons[6]) + ' [url=instagram.com/byteframes]Instagram[/url]'
      + pool(data.emoticons[7]) + ' [url=facebook.com/byteframetech]Facebook[/url]'
      + pool(data.emoticons[8]) + ' [url=mobcrush.com/byteframe]Mobcrush[/url]\n'
      + pool(data.emoticons[10]) + ' [url=byteframe.tumblr.com]Tumblr[/url]'
      + pool(data.emoticons[11]) + ' [url=github.com/byteframe]GitHub[/url]'
      + pool(data.emoticons[4]) + ' [url=picarto.tv/byteframe]Picarto[/url]\n'
      + pool(data.emoticons[10]) + ' [url=linkedin.com/company/byteframetech]LinkedIn[/url]'
      + pool(data.emoticons[9]) + ' [url=nimo.tv/live/1816208114]Nimo[/url]'
      + pool(data.emoticons[11]) + ' [url=samequizy.pl/author/byteframe]SameQuizy[/url]\n'
      + pool(data.emoticons[3]) + ' [url=itch.io/c/297897/byteframe]ItchIO[/url]'
      + pool(data.emoticons[6]) + ' [url=smashcast.tv/byteframe]Smashcast[/url]'
      + pool(data.emoticons[4]) + ' [url=pinterest.com/byteframe]Pinterest[/url]\n'
      + pool(data.emoticons[3]) + ' [url=mixer.com/95892684]Mixer[/url]'
      + pool(data.emoticons[2]) + ' [url=photos.app.goo.gl/B4digHC1UdQStf1EA]Photos[/url]'
      + pool(data.emoticons[5]) + ' [url=sdq.st/u/49520]SideQuest[/url]' ] ] } },
shuffle_array(data.achievement_array).forEach((set, index) =>
  set[0].forEach((element, index) =>
    profile.achievement.slots[index].push(element))),
pad = (i, zeros = "00") =>
  (zeros + i).substr(-zeros.length, zeros.length),
console_log = (output, date = new Date()) =>
  console.log((('[' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds()) + '] ').magenta + output).replace(
    'SUCCESS', 'SUCCESS'.green.bold.reset).replace(
    'FAILURE', 'FAILURE'.red.bold.reset).replace(
    'MESSAGE', 'MESSAGE'.cyan.bold.reset).replace(
    'SESSION', 'SESSION'.blue.bold.reset)),
log = (account, output) =>
  console_log(output.replace('|', '|' + (account.index == 0 ? pad(account.index, "000").gray.inverse : pad(account.index, "000").gray) + '|')),
profile_url = (account) =>
  (account.user.vanityURL ? 'id/' + account.user.vanityURL : 'profiles/' + account.steamID),
http_request = (account, endpoint, form = null, callback = null, force = false, method = (form != null ? 'POST' : 'GET'), retries = 0) => (
  (form != null && typeof form !== 'string') && (
    form.sessionID = account.community.getSessionID(),
    form.sessionid = account.community.getSessionID()),
  account.community.httpRequest({
    "uri": (endpoint.indexOf('http') == -1 ? 'https://steamcommunity.com/' + endpoint : endpoint).replace("/my/", "/" + profile_url(account) + "/"),
    "method": method,
    "form": (typeof form == 'string' ? 'sessionID=' + account.community.getSessionID() + form : form),
    "json": true,
    "encoding": (endpoint.slice(-4) == '.jpg' ? null : 'utf8')
  }, (err, response, body,
    success = false,
    response_code = (!response ? '999' : response.statusCode.toString()),
    result = endpoint + ": " + (method + '-' + response_code).yellow) => (
    (err && err.message == 'Malformed JSON response') ?
      err = 0 : null,
    (!response) ?
      result = "FAILURE | " + result + '=NO RESPONSE'.yellow
    : (!body && response_code != '302' && response_code != '200') ? (
      result = "FAILURE | " + result + "=NO BODY".yellow, 
      body = { success: 0 })
    : (err) ? (
      result = "FAILURE | " + result + (" # " + err.message).yellow, 
      (err.message == 'Not Logged In' || response_code == '401') &&
        account.user.webLogOn())
    : (body && typeof body.success != 'undefined' && body.success != 1) ?
      ((error = (body.error) ? body.error.replace(/ /g, '').substr(0,30) : SteamCommunity.EResult[body.success]) => (
        (!body.errmsg) && (
          body.errmsg = 'ERR'),
        result = "FAILURE | " + result + ("=" + error + "-" + body.errmsg.replace("  Please try again later.<br />", "")).yellow,
        (error == 'NotLoggedOn') &&
          account.user.webLogOn()))()
    : ((body && body.toString().indexOf("g_steamID = false;") > -1) || response_code == '401' > -1) ? (
      result = "FAILURE | " + result + "=SteamIDIsFalse/401".yellow,
      account.user.webLogOn())
    : (success = true,
      result = "SUCCESS | " + result),
    (!success || state.verbose) &&
      log(account, result.replace('POST-', 'POST'.inverse + '-')),
    (callback !== null && (success || force)) &&
      callback(body, response, err)))),
prep_randomize_profile = (account, profile, callback = null,
  alter_showcase = (showcase, id = 0, callback = null) =>
    (profile.hasOwnProperty(showcase)) && (
      profile[showcase].selection = [],
      (profile[showcase].shuffle_slots.length) &&
        ((to_shuffle = []) => (
          profile[showcase].shuffle_slots.forEach((slot) =>
            to_shuffle.push([profile[showcase].slots[slot], profile[showcase].shuffle_types[slot]])),
          shuffle_array(to_shuffle),
          profile[showcase].shuffle_slots.forEach((slot, i) => (
            profile[showcase].slots[slot] = to_shuffle[i][0],
            profile[showcase].shuffle_types[slot] = to_shuffle[i][1]))))(),
      profile[showcase].slots.forEach((slot, i) =>
        (slot.length > 0 && typeof profile[showcase].shuffle_types[i] !== 'undefined') &&
          ((element) => (
            (profile[showcase].shuffle_types[i] === 0) ?
              element = slot[Math.floor(Math.random()*slot.length)]
            : (profile[showcase].shuffle_types[i] < 0) ? (
              (profile[showcase].shuffle_types[i] == -1) &&
                shuffle_array(slot),
              element = slot[Math.abs(profile[showcase].shuffle_types[i])-1],
              profile[showcase].shuffle_types[i]--,
              (Math.abs(profile[showcase].shuffle_types[i])-1 == slot.length) && (
                profile[showcase].shuffle_types[i] = -1))
            : (profile[showcase].shuffle_types[i] > 0) && (
              element = slot[profile[showcase].shuffle_types[i]-1],
              profile[showcase].shuffle_types[i]++,
              (profile[showcase].shuffle_types[i]-1 == slot.length) && (
                profile[showcase].shuffle_types[i] = 1)),
            ({}.toString.call(element) === '[object Function]') && (
              element = element(account, profile.lite)),
            profile[showcase].selection[i] = element,
            (typeof element === 'string') && (
              (profile.lite) && (
                element = emoticon_convert(element)),
              element = encodeURIComponent(element)),
            (callback != null) &&
              callback(i, element)))()))) =>
  (typeof accounts[account.index].backgrounds == 'undefined') ? (
    http_request(account, 'https://steamcommunity.com/' + profile_url(account) + '/ajaxgetplayerbackgrounds', {}, (body, response, err) => (
      accounts[account.index].backgrounds = [],
      (body.data.profilebackgroundsowned) &&
        body.data.profilebackgroundsowned.forEach((background) =>
          (background.name.indexOf('Summer 2019') == -1 || account.index != 0) &&
            accounts[account.index].backgrounds.push({
              id: background.communityitemid,
              appid: background.appid,
              game: body.data.backgroundappnames[background.appid],
              name: background.name,
              image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/" + background.image_large })),
      prep_randomize_profile(account, profile, callback)), true, 'POST'))
  :(account.edit_1 = '&type=profileSave&json=1&weblink_1_title=&weblink_1_url=&weblink_2_title=&weblink_2_url=&weblink_3_title=&weblink_3_url=',
    (accounts[account.index].backgrounds.length > 0) &&
      alter_showcase('background', 0, (i, element) =>
        account.edit_1 += "&profile_background=" + element.id),
    alter_showcase('group_primary', 0),
    (account.user.playingState.blocked && profile.persona_name.hasOwnProperty('selection')) ?
      account.edit_1 += "&personaName=byteframe"
    : alter_showcase('persona_name', 0, (i, element) =>
      account.edit_1 += "&personaName=" + element),
    alter_showcase('real_name', 0, (i, element) =>
      account.edit_1 += "&real_name=" + element),
    (!profile.hasOwnProperty('custom_url')) ?
      account.edit_1 += "&customURL=" + profile_url(account).replace(/.*?\//, '')
    : account.edit_1 += "&customURL=" + profile.custom_url,
    alter_showcase('countries', 0, (i, element, state_index = Math.floor(Math.random()*element[1].length)) => (
      account.edit_1 += "&country=" + element[0],
      (element[1].length) ? (
        account.edit_1 += "&state=" + element[1][state_index][0],
        (element[1][state_index][1].length) ?
          account.edit_1 += "&city=" + element[1][state_index][1][Math.floor(Math.random()*element[1][state_index][1].length)]: null): null)),
    account.edit_2 = '&type=showcases&json=1',
    alter_showcase('badge_favorite'),
    (account.index < 97 || (account.index >= 201 && account.index <= 223) || (account.index >= 101 && account.index <= 104)) && (
      alter_showcase('showcases', 0, (i, _element, element = _element.split('_')) => (
        account.edit_2 += "&profile_showcase%5B%5D=" + element[0],
        account.edit_2 += "&profile_showcase_purchaseid%5B%5D=" + element[1])),
      alter_showcase('trade_items', 4, (i, _element, element = _element.split('_')) =>
        account.edit_2 += "&rgShowcaseConfig%5B4_0%5D%5B" + i + "%5D%5Bappid%5D=" + element[0] + "&rgShowcaseConfig%5B4_0%5D%5B" + i + "%5D%5Bitem_contextid%5D=" + element[1] + "&rgShowcaseConfig%5B4_0%5D%5B" + i + "%5D%5Bitem_assetid%5D=" + element[2]),
      alter_showcase('trade_text', 4, (i, element) =>
        account.edit_2 += "&rgShowcaseConfig%5B4_0%5D%5B6%5D%5Bnotes%5D=" + element),
      alter_showcase('artwork', 13, (i, element) =>
        account.edit_2 += "&rgShowcaseConfig%5B13_0%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + element),
      alter_showcase('achievement', 17, (i, element) =>
        account.edit_2 += "&rgShowcaseConfig%5B17_0%5D%5B" + i + "%5D%5Bappid%5D=" + element.substr(0, element.indexOf('_')) + "&rgShowcaseConfig%5B17_0%5D%5B" + i + "%5D%5Btitle%5D=" + element.substr(element.indexOf('_')+1)),
      alter_showcase('guide_favorite', 15, (i, element) =>
        account.edit_2 += "&rgShowcaseConfig%5B15_0%5D%5B0%5D%5Bappid%5D=0&rgShowcaseConfig%5B15_0%5D%5B0%5D%5Bpublishedfileid%5D=" + element),
      alter_showcase('item_showcase', 3, (i, _element, element = _element.split('_')) =>
        account.edit_2 += "&rgShowcaseConfig%5B3_0%5D%5B" + i + "%5D%5Bappid%5D=" + element[0] + "&rgShowcaseConfig%5B3_0%5D%5B" + i + "%5D%5Bitem_contextid%5D=" + element[1] + "&rgShowcaseConfig%5B3_0%5D%5B" + i + "%5D%5Bitem_assetid%5D=" + element[2]),
      alter_showcase('workshop_collector', 12, (i, element) =>
        account.edit_2 += "&rgShowcaseConfig%5B12_0%5D%5B" + i + "%5D%5Bappid%5D=0&rgShowcaseConfig%5B12_0%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + element),
      alter_showcase('review', 10, (i, element) =>
        account.edit_2 += "&rgShowcaseConfig%5B10_0%5D%5B0%5D%5Bappid%5D=" + element),
      alter_showcase('screenshot', 7, (i, element) =>
        account.edit_2 += "&rgShowcaseConfig%5B7_0%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + element),
      alter_showcase('workshop_favorite', 11, (i, element) =>
        account.edit_2 += "&rgShowcaseConfig%5B11_0%5D%5B0%5D%5Bappid%5D=0&rgShowcaseConfig%5B11_0%5D%5B0%5D%5Bpublishedfileid%5D=" + element),
      account.edit_2 += "&profile_showcase_style_5_0=1",
      alter_showcase('badge_collector', 5, (i, element) =>
        account.edit_2 += "&rgShowcaseConfig%5B5_0%5D%5B" + i + "%5D%5Bbadgeid%5D=1&rgShowcaseConfig%5B5_0%5D%5B" + i + "%5D%5Bappid%5D=" + element + "&rgShowcaseConfig%5B5_0%5D%5B" + i + "%5D%5Bborder_color%5D="),
      alter_showcase('information_title', 8, (i, element) =>
        account.edit_2 += "&rgShowcaseConfig%5B8_0%5D%5B0%5D%5Btitle%5D=" + element),
      alter_showcase('information_text', 8, (i, element) =>
        account.edit_2 += "&rgShowcaseConfig%5B8_0%5D%5B0%5D%5Bnotes%5D=" + element),
      alter_showcase('information_title_280151', 8, (i, element) =>
        account.edit_2 += "&rgShowcaseConfig%5B8_280151%5D%5B0%5D%5Btitle%5D=" + element),
      alter_showcase('information_text_280151', 8, (i, element) =>
        account.edit_2 += "&rgShowcaseConfig%5B8_280151%5D%5B0%5D%5Bnotes%5D=" + element),
      alter_showcase('game_collector', 2, (i, element) =>
        account.edit_2 += "&rgShowcaseConfig%5B2_0%5D%5B" + i + "%5D%5Bappid%5D=" + element),
      alter_showcase('group_favorite', 9, (i, element) =>
        account.edit_2 += "&rgShowcaseConfig%5B9_0%5D%5B0%5D%5Baccountid%5D=" + element.substr(0,18)),
      alter_showcase('game_favorite', 6, (i, element) =>
        account.edit_2 += "&rgShowcaseConfig%5B6_0%5D%5B0%5D%5Bappid%5D=" + element.replace(/_.*/, '')),
      alter_showcase('guide_collector', 16, (i, element) =>
        account.edit_2 += "&rgShowcaseConfig%5B16_0%5D%5B" + i + "%5D%5Bappid%5D=0&rgShowcaseConfig%5B16_0%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + element),
      alter_showcase('artwork2', 22, (i, element) => 
        account.edit_2 += "&rgShowcaseConfig%5B22_0%5D%5B" + i + "%5D%5Bpublishedfileid%5D=" + element)),
    alter_showcase('summary_text', 0, (i, element) =>
      account.edit_1 += "&summary=" + element),
    (callback != null) &&
      callback()),
avatars_group = fs.readdirSync("./images/group"),
randomize_profile = (account, profile, callback = null, avatar = pool(data.avatars, 1, null)[0]) =>
  http_request(account, 'my/edit', account.edit_1, (body, response, err) =>
    http_request(account, 'my/edit', account.edit_2, (body, response, err) => (
      http_request(account, (account.user.playingState.blocked) ? 'https://steamcommunity.com/actions/selectPreviousAvatar' : 'https://steamcommunity.com/games/' + avatar[0] + '/selectAvatar', { selectedAvatar: avatar[1], json: 1, sha: pool(data.wain_sha) }, (body, response, error) =>
        http_request(account, 'https://api.steampowered.com/IPlayerService/SetProfileBackground/v1', { access_token: account.access_token, communityitemid: +profile.background.selection[0].id }, (body, response, error) =>
          http_request(account, 'https://api.steampowered.com/IPlayerService/SetProfileTheme/v1', { access_token: account.access_token, theme_id: pool(data.profile_themes) }, (body, response, error) =>
            http_request(account, 'https://api.steampowered.com/IPlayerService/SetFavoriteBadge/v1', {  access_token: account.access_token, communityitemid: profile.badge_favorite.selection[0].substr(16) }, (body, response, error) =>
              http_request(account, 'https://api.steampowered.com/IPlayerService/SetAvatarFrame/v1', { access_token: account.access_token, communityitemid: pool(data.avatar_frames) }, (body, response, error) =>
                http_request(account, 'https://api.steampowered.com/IPlayerService/SetEquippedProfileItemFlags/v1', { access_token: account.access_token, communityitemid: +profile.background.selection[0].id, flags: 1 }, (body, response, error) => (
                  ((group_url = profile.group_favorite.selection[0].substr(19)) =>
                    http_request(accounts[0], 'groups/' + group_url + '/edit', '&' + data.group_forms[group_url].replace(
                      /&headline=.*&summary=/, '&headline=' + generate_emoji_fortune(215) + '&summary=')))(),
                  ((avatar_file = fs.readFileSync("./images/group/" + pool(avatars_group))) =>
                    accounts[0].community.httpRequestPost({
                      "uri": "https://steamcommunity.com/actions/FileUploader",
                      "json": true,
                      "formData": {
                        "type": "group_avatar_image", "doSub": 1, "json": 1,
                        "MAX_FILE_SIZE": avatar_file.length,
                        "gId": "103582791432273268",
                        "sessionid": accounts[0].community.getSessionID(),
                        "avatar": { "value": avatar_file, "options": { "filename": 'avatar.jpg', "contentType": 'image/jpeg' } } }
                    }, (err, response, body) =>
                      (err || response.statusCode != 200 || !body || !body.success) ?
                        log(accounts[0], 'FAILURE | actions/uploadAvatar: ' + (""+avatars_group.index).yellow)
                      : (state.verbose == 1) &&
                        log(accounts[0], 'SUCCESS | actions/uploadAvatar: ' + (""+avatars_group.index).yellow)))()))))))),
      (profile.gamesPlayed) &&
        profile.gamesPlayed.slots[0][0](account),
      (callback !== null) &&
        callback()), true), true),
post_comment = (account, steamid, text, type = 0, post_id = -1, callback) => (
  (type == 1) ?
    type = 'UserStatusPublished'
  :(type == 2) ?
    type = 'UserReceivedNewGame'
  : type = 'Profile',
  http_request(account, 'comment/' + type + '/post/' + steamid + '/' + post_id, { comment: text, count: 6 }, (body, response, err) =>
    callback(body))),
byte_length = (str, m = encodeURIComponent(str).match(/%[89ABab]/g)) =>
  str.length + (m ? m.length : 0),
translate_id = (cid) =>
  '765' + (+cid + 61197960265728),
friends_list = (account, endpoint, callback) =>
  http_request(account, endpoint, {}, (body, response, err, steamids = []) => (
    body = body.match(/data-steamid="765611[0-9]*"/g),
    (body) &&
      body.forEach((item, index) =>
        steamids.push(item.slice(14, -1))),
    callback(steamids))),
strangers = [],
profile_commenter = (account, check_replies = false, friends_only = true,
  friends = shuffle_array(Object.keys(account.user.myFriends).filter((friend) =>
    (account.user.myFriends[friend] == 3 || account.user.myFriends[friend] == 6) && !accounts.find((account) =>
      account.steamID == friend))).map((friend) =>
        [ '', friend ]),
  day = new Date().getUTCDay(),
  post = (steamids, unique = false, steamid = steamids.shift()) =>
    (typeof steamid == 'undefined') ?
      profile_commenter(account, check_replies, friends_only, friends)
    : (state.steamid_blacklist.indexOf(steamid[1]) > -1) ?
        post(steamids, unique)
      : http_request(account, 'profiles/' + steamid[1] + '/allcomments', null, (body, response, err) =>
        (body.indexOf('commentthread_textarea') == -1) ?
          post(steamids, unique)
        : ((comments = body.match(/commentthread_author_link" href="https:\/\/.*?"/g)) => (
          (steamid[0] != '') ?
            state.accounts[account.index].replies.push(steamid[0]) : null,
          (account.index == 0 && state.force_steamid == '' && comments && comments.splice(0,6).join(" ").indexOf('steamcommunity.com/' + profile_url(account)) > -1) ?
            post(steamids, unique)
          : (try_comment_message = (comment_message = pool(comment_messages, 1, null)[0]
            , player = body.match(/<title>.*<\/title>/)[0].slice(26,-28)
            , msg = (account.index == 0) ? comment_message(player) : emoticon_convert(comment_message(player))) =>
            (byte_length(msg) > 925 || msg.trim().length < 1) ?
              try_comment_message(comment_message, player)
            : post_comment(account, steamid[1], msg, 3, -1, () => (
              state.accounts[account.index].post_free--,
              state.accounts[account.index].last_steamid = steamid[1],
              (!state.verbose) &&
                log(account, 'SUCCESS | post: ' + ('https://steamcommunity.com/profiles/' + steamid[1] + ' -- "' + player + '"' + " {" + state.last_profiles.length + "},/" + strangers.length + "/" + steamid[0]).yellow),
              (unique) &&
                state.last_profiles.push(steamid[1]))))()))())) => (
  friends.push([ '', account.steamID ]),
  (!('day' in state.accounts[account.index])) ? (
    state.accounts[account.index].day = day,
    state.accounts[account.index].post_free = 180,
    state.accounts[account.index].replies = [])
  : (state.accounts[account.index].day != day) && (
    state.accounts[account.index].day = day,
    state.accounts[account.index].post_free = 180,
    state.accounts[account.index].replies = state.accounts[account.index].replies.splice(-50)),
  (state.accounts[account.index].post_free > 0) &&
    (state.force_steamid != '' && (!account.limited || friends.indexOf(state.force_steamid) != -1) ?
      post([ [ '', state.force_steamid ] ].concat(friends))
    : (!strangers.length) ?
      friends_list(account, 'profiles/' + state.last_profiles[Math.floor(Math.random()*state.last_profiles.length)] + "/friends", (steamids) => (
        steamids.forEach((item, index) =>
          (state.last_profiles.indexOf(item) == -1) &&
            strangers.push(['', item ])),
        profile_commenter(account, check_replies, friends_only, friends)))
    : (check_replies) ?
      http_request(account, 'my/allcomments', null, (body, response, err,
        comments = Cheerio.load(body)('div.commentthread_comment_author').toArray().reverse().map((_item, index, undefined, item = Cheerio.load(_item)) =>
          [ item('a.actionlink')[0].attribs.href.substr(73, 19).match(/\d+/g)[0], translate_id(item('a.commentthread_author_link')[0].attribs['data-miniprofile']) ])) =>
        profile_commenter(account, false, friends_only, comments.filter((item1, index1) =>
          state.accounts[account.index].replies.indexOf(item1[0]) == -1 && comments.findIndex((item2, index2) =>
            index1 < index2 && item1[1] == item2[1]) == -1).concat(friends)))
    : (account.limited || friends_only) ?
      (friends.length >= state.commenting_threshold) &&
        post(friends)
    : post(strangers, true))),
ban = (steamid) => (
  accounts.forEach((account) =>
    account.user.removeFriend(steamid)),
  (state.steamid_blacklist.indexOf(steamid) == -1) &&
    state.steamid_blacklist.push(steamid)),
find_name = (account, steamid) =>
  (typeof account.user.users[steamid] != 'undefined' ? account.user.users[steamid].player_name : steamid),
accounts = [],
state.accounts.forEach((account, i) =>
  (i < 1) &&
    accounts.push({name: account.name, pass: account.pass, mail: account.mail, steamID: account.steamID, index: i})),
accounts.forEach((account, i) => (
  account.user = new SteamUser({ "dataDirectory": null, "promptSteamGuardCode": (account.index == 0 ? true : false), "autoRelogin": false }),
  (fs.existsSync('share/' + account.name + '-ssfn')) ?
    account.user.setSentry(Crypto.createHash('sha1').update(fs.readFileSync('share/' + account.name + '-ssfn')).digest())
  : (fs.existsSync('share/ssfn')) &&
    account.user.setSentry(Crypto.createHash('sha1').update(fs.readFileSync('share/ssfn')).digest()),
  account.user.on('sentry', (sentry) =>
    fs.writeFileSync('share/' + account.name + '-ssfn', sentry)),
  account.community = new SteamCommunity(),
  account.community.on('sessionExpired', (err) => (
    log(account, 'FAILURE | sessionExpired: ' + err),
    account.user.webLogOn())),
  account.auth_code = '',
  account.user.on('webSession', (sessionID, cookies) => (
    account.community.setCookies(cookies),
    setTimeout((account) =>
      http_request(account, 'https://store.steampowered.com/points/shop', {}, (body, response, error) =>
        account.access_token = body.match(/webapi_token\&quot\;\:\&quot\;.*?\&quot\;/)[0].slice(25, -6)), 5000, account))),
  account.user.on('error', (err) => (
    log(account, 'FAILURE | error: ' + err.message.yellow),
    (err.message == 'InvalidPassword') ?
      delete state.accounts[account.index].key
    : (err.message == 'LogonSessionReplaced') &&
      login(account, 5000))),
  account.limited = (account.index > 120 && account.index < 200 && account.index != 133) ? true : false,
  account.user.on('accountLimitations', (limited, communityBanned, locked, canInviteFriends) =>
    (limited || communityBanned || locked) && (
      account.limited = true,
      log(account, "FAILURE | accountLimitations: " + limited + "|" + communityBanned + "|" + locked + "|" + canInviteFriends))),
  account.user.on('loggedOn', (details, parental) => (
    (account.index != 0) && 
      replicant_profile.gamesPlayed.slots[0][0](account),
    (state.verbose) &&
      log(account, 'SESSION | loggedOn: '+ (account.auth_code + " https://steamcommunity.com/" + profile_url(account) + " #" + i).trim().yellow))),
  account.user.on('friendRelationship', (steamid, relationship) => (
    (relationship != 2) &&
      setTimeout((account) =>
        log(account, 'SESSION | friend: ' + (SteamUser.EFriendRelationship[relationship].toUpperCase().inverse + "=\"" + find_name(account, steamid) + '", ' + "https://steamcommunity.com/profiles/" + steamid).yellow), 3000, account),
    (account.index != 0 && relationship == 2) &&
      account.user.addFriend(steamid))),
  account.chats = [],
  account.user.on('friendMessageEcho', (steamid, msg) => (
    log_chat(steamid, "^^", msg, account.index, find_name(account, steamid)),
    friend_message_echo_handlers.forEach((item) =>
      item(steamid, msg, account)))),
  account.user.on('friendMessage', (steamid, msg) => (
    (account.chats.indexOf(steamid.toString()) == -1 && steamid.toString() != accounts[0].steamID) &&
      account.chats.push(steamid.toString()),
    (account.index != 0 || !accounts.find((account) => account.steamID == steamid)) &&
      log_chat(steamid, "<<", msg, account.index, find_name(account, steamid)),
    (state.steamid_chat_blacklist.indexOf(steamid.toString()) == -1) &&
      friend_message_handlers.forEach((item) =>
        item(steamid, msg, account)))))),
accounts[0].user.on('loginKey', (key) =>
  state.accounts[accounts[0].index].key = key),
accounts[0].user.on('playingState', (blocked, playingApp) =>
  (blocked) &&
    accounts[0].user.setPersona(0, 'byteframe'));
accounts[0].user.on('newComments', (count, myItems) =>
  (count) && (
    accounts[0].comment_check = myItems)),
accounts[0].user.on('friendRelationship', (steamid, relationship) =>
  (relationship == SteamUser.EFriendRelationship.RequestRecipient) &&
    state.adds.push(steamid.toString())),
accounts[0].user.on('groupRelationship', (gid, relationship) =>
  (relationship == SteamUser.EClanRelationship.Invited) &&
    accounts[0].user.respondToGroupInvite(gid, false)),
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
riveScript = new RiveScript(),
log_chat = (steamid, vector, msg, index = 0, player_name = steamid) =>
  console_log("MESSAGE |" + (index == 0 ? '000'.gray.inverse : pad(index, "000").gray) + "| " + vector + " [" + player_name + "] " + vector + " " + msg + ": " + (Date.now().toString() + "|" + steamid).yellow),
send_chat = (reply = generate_random_response(), account = accounts[0], steamid = account.chats[account.chats.length-1], speed = 80) => (
  account.active_chat = true,
  account.user.chatTyping(steamid),
  setTimeout(() => (
    account.active_chat = false,
    account.user.chatMessage(steamid, reply),
    log_chat(steamid, ">>", reply, account.index, find_name(account, steamid))), Math.max(Math.min(reply.length, 75)*speed, 2000)+1000)),
handle_message_echo = (steamid, msg) =>
  (msg.indexOf('#!') == 0) ?
    true
  : (msg.indexOf('##') == 0) ?
    !riveScript.setUservar(steamid, 'chat_time', 0)
  : (msg.indexOf('#$') == 0) ?
    !riveScript.setUservar(steamid, 'chat_time', Date.now())
  : false,
get_reply = (steamid, msg) =>
  (riveScript.reply(steamid, msg).replace(/<oob>.*<\/oob>/, '').replace(
    /  random/g, ' ').replace(/  /g, ' ').replace('}', '').trim().replace(
    'pdlrand', 'PDLRAND').replace(/pdlrand/g, '') || "PDLRAND").replace('PDLRAND', generate_random_response()),
test_chat_message = (msg) => 
  (msg.search(/http[s]?:\/\//) == -1 && msg != 'Invited you to play a game!' && msg.search(/LINK REMOVED/) == -1),
incoming_message_event = (steamid, msg, account) => (
  msg = msg.replace(/:[a-zAZ0-9_]+:/g, '').replace(
    /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, ''),
  (!account.active_chat && msg != '' && (account.index == 0 || Math.floor(Math.random()* 15) != 0)
  && msg.search(/[!@#$%^&*]/) != 0 && (account.index == 0 || test_chat_message(msg))
  && !accounts.find((account) => account.steamID == steamid)) ? (
    (riveScript.getUservar(steamid, 'chat_time') == 'undefined') && (
      [ 'first', 'second', 'third', 'fourth', 'fifth' ].forEach((topic) =>
        riveScript.setUservar(steamid, topic, pool(data.chat_topics))),
      riveScript.setUservar(steamid, 'chat_time', 0),
      riveScript.setUservar(steamid, 'name', pool(data.chat_names))),
    (Date.now() - riveScript.getUservar(steamid, 'chat_time') > 3600000) &&
      true)
  : false),
friend_message_echo_handlers = [],
friend_message_handlers = [ (steamid, msg, account, target = (msg[0] == '^' ? account.chats[+msg.match(/^[^]\d+/)[0].substr(1)] : account.chats[account.chats.length-1])) =>
  (account.index != 0) && (
    (msg.indexOf('https://t.co') > -1) ?
      ban(steamid.toString())
    : (steamid != accounts[0].steamID && test_chat_message(msg)) ?
      account.user.chatMessage(accounts[0].steamID, account.chats.indexOf(steamid.toString()) + "| " + find_name(account, steamid) + ": " + msg)
    : (account.user.chatMessage(target, msg.replace(/^[^]\d+/, '')),
      handle_message_echo(target, msg))) ],
console_log("SESSION |" + '000'.gray.inverse + "| loading rivescript: " + ("files=" + fs.readdirSync('./rivescript').length).yellow),
riveScript.loadDirectory('./rivescript', () => (
  riveScript.sortReplies(),
  friend_message_echo_handlers.push((steamid, msg, account) =>
    (handle_message_echo(steamid, msg)) &&
      send_chat(get_reply(steamid, msg.substr(2)), account, steamid)),
  friend_message_handlers.push((steamid, msg, account) =>
    (steamid != accounts[0].steamID && incoming_message_event(steamid, msg, account, reply = get_reply(steamid, msg))) && (
      send_chat(reply, account, steamid),
      account.user.chatMessage(accounts[0].steamID, font(reply, 14)))))),
watchdog = 0,
timer = setInterval((a = (state.account_index = (state.account_index+1 == accounts.length ? 1 : state.account_index+1))) => (
  login(accounts[0]),
  (++watchdog == 60) ? (
    fs.closeSync(fs.openSync('node-byteframe_stall-' + Date.now(), 'w')),
    quit())
  : prep_randomize_profile(accounts[0], profile, () =>
    randomize_profile(accounts[0], profile, () => (
      watchdog = 0,
      (accounts[0].comment_check > -1) && (
        http_request(accounts[0], 'my/commentnotifications', { action: 'markallread' }, (body, response, err) =>
          accounts[0].comment_check = -1),
        (accounts[0].comment_check > 0) &&
          http_request(accounts[0], 'my/allcomments', null, (_body, response, err, body = Cheerio.load(_body), players = {}) =>
            body('.commentthread_comment').each((i, element, cid = element.attribs['id'].substr(8),
              steamid = translate_id(body('#comment_' + cid + " a")[0].attribs['data-miniprofile']),
              contents = body("#comment_content_" + cid).contents().toString().trim()) =>
              (!players.hasOwnProperty(steamid)) ?
                players[steamid] = [ contents ]
              : (players[steamid].indexOf(contents) == -1) ?
                players[steamid].push(contents)
              : http_request(accounts[0], 'comment/Profile/delete/76561197961017729/-1/', { count: 6, feature2: -1, gidcomment: state.comments.shift() })))),
      (a % 9 == 0 && a % 90 != 0) ?
        (a % 99 == 0) ?
          profile_commenter(accounts[0], false, false)
        : profile_commenter(accounts[0])
      : (a % 360 == 0) &&
        save_state_files())))), state.frequency),
save_state_files = () => (
  fs.renameSync('./state.json', './state-backup.json'),
  fs.writeFileSync('./state.json', JSON.stringify(state, null, 2))),
exiting = false,
quit = () =>
  (!exiting) && (
    exiting = true,
    accounts[0].user.setPersona(0, 'byteframe@primarydataloop'),
    http_request(accounts[0], 'https://steamcommunity.com/actions/selectPreviousAvatar', { json: 1, sha: 'db02ac5a0970af2a79cd08d07e4f1a20b4e76133' }, (body, response, error) => (
      console_log('SESSION | ending process: ' + (""+Math.floor(process.uptime()))),
      save_state_files(),
      setTimeout(process.exit, 3000, 0)), true)),
process.on('SIGINT', (code) =>
  quit()),
process.on('uncaughtException', (err) =>
  console_log(err.stack));