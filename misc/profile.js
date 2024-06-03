//------------------------------------------------------------------------------ GroupChangerSeemsLimited
http(a, 'my/edit', { type: 'favoriteclan', primary_group_steamid: pool(d.group_primary) }, null, false, 'POST', false, true),
//-------------------------------------------------------------------------------------- GroupFormPriorToWikipedia
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
((file = pool(data.artwork2)) => (
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
data.workshop_collector.flat().forEach((id, i) =>
  console.log('edit_text(' + id + ', "' + ( fortune('platitudes', 1, 75, 85).replace(/[\s\t]+--[\s\t]+/g, ' ').replace(/"/g, '\\"') + '",        "' + generate_emoji_fortune(300, 'startrek').replace(/"/g, '\\"', ' ')/*.replace(/\s+--\s+/g + "\")")*/ + '")')))
showcase('group_primary', 0, (i, e) => a.edit_1 += "&primary_group_steamid=" + e),
(a.u.playingState.blocked && profile.persona_name.hasOwnProperty('selection')) ?
  a.edit_1 += "&personaName=byteframe"
: showcase('persona_name', 0, (i, e) =>
  a.edit_1 += "&personaName=" + e),
(s.A[a.i].persona != -1) && (
  s.A[a.i].persona = pool([2,5,6])),
//------------------------------------------------------------------------------ OldElements
var line = font('ITEMS = \ ', 13);
for (var i = 0; i < 19; i++)
  line += pool_elements(pool_elements(emojis, 1, null)[0]) + "-";
line.slice(0,-1) + " /", line.slice(0,-1);  
haiku = require('haiku-random'),
(args, pools = shuffle_array([8, 2, 3, 4, 5]),
  haikus = [...Array(3).keys()].map((i) =>
    haiku.random("html").toString().replace(/<br>/g, '\n').split('\n'))) =>
  pool(data.emoticons[pools[0]], 10) + "\n[i]"
  + "[b][u] Here's Some Haiku for You...[/u][/b]\n"
  + pool(data.emoticons[pools[1]], 10) + "\n"
  + " » " + haikus[0][0] + " " + pool(data.ascii) + " \n"
  + " » " + haikus[0][1] + " " + pool(data.ascii) + " \n"
  + " » " + haikus[0][2] + " " + pool(data.ascii) + " \n"
  + pool(data.emoticons[pools[2]], 10) + "\n"
  + " » " + haikus[1][0] + " " + pool(data.ascii) + " \n"
  + " » " + haikus[1][1] + " " + pool(data.ascii) + " \n"
  + " » " + haikus[1][2] + " " + pool(data.ascii) + " \n"
  + pool(data.emoticons[pools[3]], 10) + "\n"
  + " » " + haikus[2][0] + " " + pool(data.ascii) + " \n"
  + " » " + haikus[2][1] + " " + pool(data.ascii) + " \n"
  + " » " + haikus[2][2] + " " + pool(data.ascii) + " \n"
  + pool(data.emoticons[pools[4]], 10)
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
'[b][u]Wallpaper (' + data.avatars[data.avatars.index-1] + ')[/u][/b]\n'
+ pool(data.emotes[1]) + ' [url=steamdb.info/app/' + profile.background.selection[0].appid + ']'
+ profile.background.selection[0].game + '[/url] ' + pool(data.emotes[1]) + ' [url=steamcommunity.com/id/byteframe/inventory/#753_6_'
+ profile.background.selection[0].id + ']' + profile.background.selection[0].name.replace(' (Profile Background)', '') + '[/url]\n\n'
"[i]" + fortune('all', 1, 192, 196) + "[/i]\n\n" +
"[b]#" + emoticon_index + ": " + 
//------------------------------------------------------------------------------ WeatherDiscussionPost
print_weather_discussion_post = (E) =>
  '[olist]' + E.map(e => "[*]" + fortune('zippy', 1, 50, 80) + "\n" + " " + pool(d.items_emoticons_array, 1, null)[0].map(e => A[0].inventory.emoticons.find(_e => _e.id == e.substr(6)).name).join(' - ') + " + " + mix(d.barcode.split('')).join('') + " + " + mix(d.chinese.split('')).slice(0,8).join('') + " https://www.youtube.com/watch?v=" + e).join('\n') + "\n[/olist]"
//------------------------------------------------------------------------------ OldGenerators
generate_emoticon_fortune = (text, length, emoticon_index, file = 'all', fortune = fortune(file).replace(/\n/g, ' ').split(/\s+/)) =>
  (fortune.length < length) ?
    generate_emoticon_fortune(text, length, emoticon_index, file)
  :([...Array(length).keys()].forEach((i) =>
      text += pool(data.emotes[emoticon_index], i) + " " + pool(data.ascii) + " " + fortune[i] + "\n"),
    text.trim() + ' ' + fortune.slice(length).join(' ')),
generate_emoticons = (length, text = '', delimiter = '', indexes = [ 2,3,4,5,6,7,8,9,10,11 ]) => (
  pool(indexes, length, null).forEach((index) =>
    text += pool(data.emotes[index]) + delimiter),
  text),
((delimiter = "/", t = '') => (
  shuffle(data.links_steam_greetings).forEach((e) =>
    t += e + '[/url] ' + delimiter + ' '),
  t.trim().slice(0, -2)))() + "\n" +
//------------------------------------------------------------------------------ OldUtilityFunctions
edit_text = (account, publishedfileid, title, description = '') =>
  http(account, 'sharedfiles/itemedittext?' + publishedfileid, { id: publishedfileid, language: 0, title: title, description: description }),
emoticon_convert = (text) => (
  text = text.replace(/ː/g, ':').replace(/:[0-9a-zA-Z_]+:/g, () => pool(pool(data.emojis, 1, null)[0])),
  data.emojis.index = 0,
  text),
shuffle_string = (s) =>
  shuffle_array(s.split("")).join(""),
pad = (i, zeros = "00") =>
  (zeros + i).substr(-zeros.length, zeros.length),
font = (input, f, output = '') => (
  [...Array(input.length).keys()].forEach((e, i) =>
    (data.fonts[f][input[i]] !== undefined) ?
      output += data.fonts[f][input[i]]
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
//------------------------------------------------------------------------------ Backgrounds
account.backgrounds = [],
(a.inventory.backgrounds.length > 0) &&
  showcase('background', 0, (i, e) => a.edit_1 += "&profile_background=" + e.id),
http(account, 'https://steamcommunity.com/' + profile_url(account) + '/ajaxgetplayerbackgrounds', {}, (body, response, err) => 
  (body.data.profilebackgroundsowned) &&
    body.data.profilebackgroundsowned.forEach((background) =>
      (data.background_blacklist.indexOf(""+background.communityitemid) == -1 || account.index != 0) &&
        accounts[account.index].backgrounds.push({
          id: background.communityitemid,
          appid: background.appid,
          game: body.data.backgroundappnames[background.appid],
          name: background.name,
          image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/" + background.image_large })))//)),
//------------------------------------------------------------------------------ Badges
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
  group_primary: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [ () => pool(data.group_favorite), ] ] },
  gamesPlayed: { shuffle_slots: [ 0 ], shuffle_types: [ 0 ], slots: [ [ (account) =>
    (account.badges && account.badges.length > 0) ?
      account.user.gamesPlayed(account.badges)
    : account.user.gamesPlayed([ +pool(data.sharedconfig), +pool(data.sharedconfig), +pool(data.sharedconfig), +pool(data.sharedconfig), +pool(data.sharedconfig), +pool(data.sharedconfig), +pool(data.sharedconfig), +pool(data.sharedconfig), +pool(data.sharedconfig) ]) ] ] } },
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
      edit_process.data.state = body[Math.floor(Math.random() * (body.length-1)+1)].attribs.key;
      text += "&state=" + edit_process.data.state;
      return http(edit_process.url, edit_process.data, (body, response, error) => {
        body = Cheerio(Cheerio.load(body)('city')).find('city').prevObject;
        if (body.length > 1) {
          edit_process.data.city = body[Math.floor(Math.random() * (body.length-1)+1)].attribs.key;
          text += "&city=" + edit_process.data.city;
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
        edit_process.data.state = array[1][s][0];
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
    data.customization_type = showcase;
    data.slot = slot;
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
          account.money2 = [body('.accountData.price').text()];
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
  pool(pool(data.emojis, 1, null)[0]) + " " + text[0] + " " + pool(pool(data.emojis, 1, null)[0]) + " " + text[1] + " "
  + pool(pool(data.emojis, 1, null)[0]) + " " + text[2] + " " + pool(pool(data.emojis, 1, null)[0]),
generate_big_fortune_headline = (size, file = 'all', text = fortune(file, 1, -1, size).split(' ')) => (
  [...Array(6).keys()].forEach((i) =>
    text[(i+1)*(Math.floor((text.length+1)/6)-1)] += " YYY"),
  insert_emojis("YYY " + text.join(' ') + " YYY"))
profile_intermediate = (account,
  group_url = profile.group_favorite.selection[0].substr(19),
  rainbow = pool(data.rainbows, 1, null)[0],
  rainbow_cut = (205-rainbow.join('').length)/3,
  big_fortune = generate_big_fortune(175),
  big_fortune_split = [ big_fortune.substr(0, rainbow_cut).trim(), big_fortune.substr(rainbow_cut, rainbow_cut).trim(), big_fortune.substr((rainbow_cut*2)-1, rainbow_cut-1).trim() ]) => (
  edit_group(account, group_url, generate_big_fortune_headline(212), data.group_forms[group_url]),
  edit_text(account, profile.artwork.selection[0], generate_artwork_text()),
  edit_text(account, profile.guide_collector.selection[0], generate_big_fortune_headline(84, 'zippy')),
  edit_text(account, profile.guide_collector.selection[1], generate_big_fortune_headline(84, 'wisdom')),
  edit_text(account, profile.guide_collector.selection[2], generate_big_fortune_headline(84, 'cookie')),
  edit_text(account, profile.guide_collector.selection[3], generate_big_fortune_headline(84, 'definitions')),
  edit_text(account, profile.guide_favorite.selection[0]
    , pool(pool(data.emojis, 1, null)[0]) + " Lucky Numbers: " + Math.floor(Math.random()*9) + ',' + Math.floor(Math.random()*9) + ',' + Math.floor(Math.random()*9) + " " + pool(pool(data.emojis, 1, null)[0]) + " [̲̅$̲̅(̲̅5̲̅)̲̅$̲̅]"
    , "\nEQ: [u]" + shuffle_array(data.equalizer).join(' ') + "[/u]\n"
    + "| " + pool(data.ascii) + " " + pool(data.guide_rainbows) + ' '
    + pool(data.ascii) + ' ' + pool(data.guide_rainbows) + ' '
    + pool(data.ascii) + ' ' + pool(data.guide_rainbows) + ' '
    + pool(data.ascii) + ' ' + pool(data.guide_rainbows) + ' '
    + pool(data.ascii) + ' ' + pool(data.guide_rainbows) + ' '
    + pool(data.ascii) + ' ' + pool(data.guide_rainbows) + ' '
    + pool(data.ascii) + ' ' + pool(data.guide_rainbows) + ' '
    + pool(data.ascii) + "\n"
    + "[i]" + haiku.random("html").toString().replace(/<br>/g, '/').trim().toLowerCase().replace(/[.,'"?!]/g, '').replace(/ \//g, '/') + "[/i] "
    + shuffle_string(data.barcode) + "_" + pool(pool(data.emojis, 1, null)[0]) + "_" + shuffle_string(data.chinese).substr(0, 4) + ' (' + pool(data.alphabet).toUpperCase() + ') + ' + pool(pool(data.emojis, 1, null)[0])),
  edit_text(account, profile.ugcfavorite.selection[0]
    , data.chinese.substr(0, 2) + " " + pool(pool(data.emojis, 1, null)[0]) + " "
    + data.chinese.substr(2, 2) + " " + pool(pool(data.emojis, 1, null)[0]) + " "
    + data.chinese.substr(4, 2) + " " + pool(pool(data.emojis, 1, null)[0]) + " "
    + data.chinese.substr(6, 2) + " " + pool(pool(data.emojis, 1, null)[0]) + " "
    + data.chinese.substr(8, 2)
    , (rainbow[0] + "●▬▬▬▬▬▬▬▬▬▬▬▬▬ 웃" + pool(pool(data.emojis, 1, null)[0]) + "유 ▬▬▬▬▬▬▬▬▬▬▬▬▬●\n"
    + rainbow[1] + "[i] → " + big_fortune_split[0] + " " + pool(pool(data.emojis, 1, null)[0]) + "\n"
    + rainbow[2] + " → " + big_fortune_split[1] + " " + pool(pool(data.emojis, 1, null)[0]) + "\n"
    + rainbow[3] + " → " + big_fortune_split[2] + " " + pool(pool(data.emojis, 1, null)[0]) + "\n"
    + rainbow[4]).replace(/[-.,"']/g, '').toLowerCase())),
//------------------------------------------------------------------------------ AltGamesPlayedRoutines
gamesPlayed: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [
  (account) => (
    account.user.gamesPlayed(),
    (!account.user.playingState.blocked) && (
      account.user.setPersona(0),
      setTimeout(() => account.user.gamesPlayed([+pool(data.faker_apps),+pool(data.faker_apps),+pool(data.faker_apps)]), 1000),
      setTimeout(() => account.user.gamesPlayed(
        pool(data.emojis[0]) + " " + pool(data.emojis[1]) + " "
        + pool(data.emojis[2]) + " " + pool(data.emojis[3]) + " "
        + pool(data.emojis[0]) + " " + pool(data.emojis[1]) + " "
        + pool(data.emojis[2]) + " " + pool(data.emojis[3]) + " "
        + pool(data.emojis[0]) + " " + pool(data.emojis[1]) + " "
        + pool(data.emojis[2])), 2000),
      setTimeout(() => account.user.setPersona(1), 3000)) ) ] ] } }
//------------------------------------------------------------------------------ OldData
"f11 Gamer", [
  2860172025,2849329738,2860175921,2860177118,2860171802,2860171213,2860171169,
  2860171015,2860165356,2855385517,2855391001,2855388982,2855389130,2860165228,2855384601,
  2855382216,2860165138,2854790343,2854787157,2854786321,2854778563,2854777128,2854768043,
  2854767205,2854767587,2854760205,2852459192,2852456573,2852457552,2852456514,2852454959,
  2852454994,2852451804,2852451501,2852451601,2852451238,2852446411,2852442937,2852442472,
  2852442713,2852441975,2849346566,2849347632,2849344215,2849342486,2849341125,2849339271,
  2849337921,2849335620,2849337001,2849330518,2849334530,2849334659,2849334269,2849329673,
  2849328524,2849335425,2848763529,2848497941,2848498245,2848758883,2848492501,2848758966,
  2848491471,2848496595,2848756731,2848491341,2848759326,2848490533,2848762879,2846700701,
  2845290536,2846700337,2843623130,2845289409,2845287287,2845289684,2843621165,2843621627,
  2848762602,2843619398,2843619006,2843620359,2843619941,2843620226,2843618233,2848762781,
  2843618899,2842498961,2843617898,2843618852,2842498107,2842500155,2848761511,2842488942,
  2842489736,2842489613,2842494666,2842485194,2842485840,2842483052,2842484452,2842482950,
  2862969671,2860174235,2841860936,2860174531,2841861051,2841862055,2860174790,2841861203,
  2860174977,2841856581,2842483610,2860174359,2841856814,1968218225,2841860419,2841860741,
  2143300660,2860173286,2841860602,2860173162,2841857442,2842482846,2841858197,
  2860172634,2860175415,2860175578,2841859162,2860172747,3075604838,3075703505,
  2841859107,3082386827,2870873879,2571798003,2862975887,2841855712,2862975080,2862975473,
  2862974646,2841033955,2862975646,2862970422,2841034694,2862966715,2862968406,2862969041,
  2862966966,2862966330,2862966622,2841035120,2862023890,2862965684,2862024438,2862966248,
  2862023803,2862023989,2862022392,2862024036,2862021729,2862021877,2862022034,2862022209,
  2862019136,2862021410,2862016715,2862021200,2862021553,2862017484,2862021639,2862013676,
  2862016675,2862011307,2862012899,2862013121,2862010942,2862010849,2862011022,2862010796,
  2860177211 ]
"achievement_array_busted": [
[ [ "836200_85_13","836200_91_11","836200_91_19","776960_7_26","836200_75_0","836200_95_30","836200_90_11" ], "the New girl + sos pie" ],
[ [ "1024500_3_28","1024500_3_6","1024500_3_5","828960_11_7","1024500_3_1","1024500_1_7","1024500_1_1" ], "one boobs em up + radlis from reflex" ],
[ [ "625400_28_8","625400_255_13","625400_50_6","667120_2_12","625400_283_18","625400_58_14","625400_42_12" ], "Sisters in Hotel | I Town" ],
[ [ "860910_85_24","860910_85_34","860910_85_22","860910_77_10","860910_83_7","860910_83_6","860910_83_5" ], "CHESTNUT TREE wonderwomen, im not mad +2" ],
[ [ "860910_85_21","860910_85_20","860910_85_19","860910_85_18","860910_85_17","860910_85_16","860910_85_15" ], "3018BP" ],
[ [ "860910_48_5","860910_48_4","860910_48_3","860910_47_31","860910_48_2","860910_48_1","860910_48_0" ], "3018=knihazsx7coloredhearts" ],
[ [ "860910_12_23","860910_12_22","860910_12_21","860910_12_17","860910_12_20","860910_12_19","860910_12_18" ], "3018=animegirlinswimsuit" ],
[ [ "860910_41_18","860910_41_17","860910_41_16","860910_41_15","860910_41_14","860910_41_13","860910_41_12" ], "3018=purpleOnesOmg" ],
[ [ "860910_45_3","860910_45_2","860910_45_1","860910_16_10","860910_45_0","860910_44_31","860910_39_25" ], "3018=5 new blue, last historiayuri w/irill" ],
[ [ "860910_9_15","860910_47_12","860910_41_26","860910_48_7","860910_41_22","860910_35_1","860910_39_26" ], "3018=irlgen2 w/ rainbowDash" ],
[ [ "860910_74_16","860910_74_15","860910_74_14","860910_71_19","860910_74_13","860910_74_12","860910_74_11" ], "3018 new KR + high af" ],
[ [ "860910_80_3","860910_80_2","860910_80_1","860910_80_10","860910_79_31","860910_79_30","860910_80_0" ], "WILL,3018redhyewonOnly5soVicAngelli" ],
[ [ "860910_30_24","860910_35_0","860910_35_2","860910_53_28","860910_44_28","860910_52_20","860910_53_9" ], "hent3018Aug1" ],
[ [ "860910_53_7","860910_53_5","860910_53_15","860910_48_9","860910_53_13","860910_53_10","860910_53_6" ], "hent3018Aug2" ],
[ [ "860910_20_30","860910_20_29","860910_20_28","860910_32_20","860910_20_25","860910_20_26","860910_19_2" ], "Hent3018_AAA_Sementalx5+Sextu+RBRussian" ],
[ [ "860910_72_7","860910_72_6","860910_72_5","860910_70_5","860910_72_4","860910_72_3","860910_70_6" ], "bvdnituwu4 + 2x andriana" ],
[ [ "860910_65_5","860910_65_4","860910_65_3","860910_60_31","860910_65_2","860910_65_1","806140_82_26" ], "twice3018darkMagicGirl" ],
[ [ "860910_41_0","860910_56_3","860910_64_4","828960_4_1","860910_64_3","860910_64_1","860910_64_0" ], "margotMisc" ],
[ [ "860910_72_26","860910_72_25","860910_72_24","860910_59_26","860910_72_23","860910_72_22","860910_70_3" ], "pitchpl" ],
[ [ "860910_72_18","860910_72_17","860910_72_16","860910_72_15","860910_72_14","860910_72_13","860910_72_12" ], "miyawaki" ],
[ [ "860910_60_11","860910_60_10","860910_60_9","745740_27_13","860910_60_8","860910_60_7","860910_53_7" ], "hent3018=itzy+reflexgotti+redswap" ],
[ [ "860910_57_7","860910_57_5","860910_57_4","828960_11_14","860910_57_3","860910_57_2","860910_57_1" ], "hent3018=jeongyeonnnnnnnn+bdriver_jamieRB" ],
[ [ "860910_30_23","860910_30_22","860910_30_21","745740_10_6","860910_30_20","860910_30_19","860910_30_18" ], "Hent3018Jvckx6+Reflex AnimalLion" ],
[ [ "860910_31_2","860910_31_1","860910_31_0","506730_37_11","860910_29_7","860910_30_2","860910_26_4" ], "Hent3018Blons+DinoForestBlackAlphabet" ],
[ [ "860910_35_8","860910_32_27","860910_35_6","745740_26_26","860910_3_7","860910_35_4","860910_39_31" ], "Hent3018Pales+ReflexDay69cover2" ],
[ [ "860910_61_25","860910_61_24","860910_61_23","828960_4_3","860910_60_25","860910_60_24","860910_60_23" ], "mariana/viktoria" ],
[ [ "806140_63_12","806140_63_11","806140_63_9","776960_7_31","806140_66_4","806140_55_18","806140_62_2"], "Achievement printer gen2 1 + sos rbf" ],
[ [ "806140_59_30","806140_56_30","806140_56_29","675460_10_21","806140_53_10","806140_53_8","806140_31_8" ], "Achievement printer gen2 1 + crumulent rb" ],
[ [ "818730_19_31","806140_61_28","806140_60_10","776960_16_31","806140_53_4","806140_57_0","806140_61_31"], "Achievement printer gen2 1 + tower aznr2 + sos rb other q" ],
[ [ "806140_69_28","806140_69_27","806140_69_26","745740_33_13","806140_69_25","806140_69_24","806140_69_22" ], "achprinter=GFriend2" ],
[ [ "806140_73_13","806140_73_12","806140_73_11","806140_73_7","806140_73_10","806140_73_9","806140_73_8" ], "achprinter=Fromis_9" ],
[ [ "806140_73_28","806140_73_27","806140_73_26","818730_18_14","806140_73_25","806140_73_24","806140_73_23" ], "achprinter=GFriend1+squirtleTOwerClimber" ],
[ [ "806140_90_9","806140_90_7","806140_90_6","806140_89_27","806140_90_5","806140_90_0","806140_89_29" ], "happyruuuX4_new fromis x2+chef wabbit" ],
[ [ "806140_88_1","806140_88_0","806140_87_31","860910_9_4","806140_87_30","806140_87_29","860910_57_6" ], "ITZY new x5 || catMyraMIDDLE + missed/new jeonungg" ],
[ [ "806140_85_6","806140_85_5","806140_85_4","806140_24_24","806140_85_3","806140_85_2","806140_85_1" ], "RemiYasuda - top one + ah ha ha cat" ],
[ [ "806140_49_9","806140_49_8","806140_49_7","806140_29_1","806140_49_6","806140_49_5","806140_48_26" ], "Achievement printer 3" ],
[ [ "806140_40_1","806140_40_0","806140_39_31","806140_39_19","806140_39_29","806140_30_28","806140_30_27" ], "Achievement Printer 3" ],
[ [ "806140_32_4","806140_33_7","806140_31_23","776340_1_0","806140_33_23","806140_32_5","806140_28_8" ], "Achievement Printer 2 3" ],
[ [ "806140_31_13","806140_23_26","806140_22_22","806140_29_12","806140_32_18","806140_26_26","806140_29_4" ], "Achievement Printer 1" ],
[ [ "806140_26_2","806140_26_25","806140_22_21","806140_27_6","806140_23_25","806140_25_31","806140_29_3" ], "Achievement Printer 2" ],
[ [ "806140_53_19","806140_68_24","806140_66_0","401190_21_29","806140_63_10","860910_35_3","860910_39_29" ], "Mixed3=ACHPx4_dinoFakeCrocoRB_HentHistorCRY+BeautifulRebel" ],
[ [ "806140_97_12","806140_97_11","806140_97_10","860910_80_11","806140_97_9","806140_97_8","806140_97_7" ], "HANNIBAL,ACHprinterYellowGFRIEND" ],
[ [ "860910_39_30","776960_40_21","806140_53_6","401190_24_17","745740_43_31","860910_18_4","806140_48_25" ], "Mixed1=Hentx2,Achpx2,sosi,dinH,reflx" ],
[ [ "806140_82_13","806140_82_11","806140_82_10","763680_2_2","860910_64_5","806140_82_23","776960_68_8" ], "miscWithMineyTubes" ],
[ [ "806140_83_18","806140_83_17","806140_82_28","763680_2_3","806140_82_27","806140_82_24","806140_82_22" ], "twiceAchMineyTree" ],
[ [ "806140_83_16","806140_83_15","806140_83_14","776960_49_8","806140_83_13","806140_83_11","806140_83_10" ], "miscMiscMISC" ],
[ [ "806140_87_3","818730_22_4","860910_26_6","860910_2_10","860910_53_12","806140_69_19","806140_77_1" ], "miscMiscMISC" ],
[ [ "806140_89_15","806140_89_14","806140_89_13","745740_31_15","776960_68_10","745740_44_3","745740_44_2" ], "ACH=fromis new +3 || Reflex CatWTF hollyhenry7+6 || sos Allison" ],
[ [ "818730_22_6","818730_22_4","806140_82_25","763680_2_0","806140_82_12","860910_63_19","776960_66_1" ], "miscWIthMineySmiley" ],
[ [ "745740_12_0","745740_37_10","776960_15_7","745740_38_3","806140_68_22","860910_39_27","401190_40_3" ], "Mixed2=RefleX3RB_SosiMorgan_AchpWendy_HistorEARS_DinoHuntMadMan" ],
[ [ "828960_5_15","828960_10_25","745740_26_10","745740_46_12","776960_60_18","776960_63_8","860910_46_31" ], "Bdriver,etc" ],
[ [ "745740_46_15","745740_19_29","745740_19_27","745740_10_8","745740_48_25","860910_39_28","776960_36_10" ], "Reflex4Pale+Wolf+HentBlue+SosiPink" ],
[ [ "776960_18_26","776960_18_24","776960_22_28","776960_16_28","776960_1_5","776960_5_23","776960_4_18" ], "Sos Pos 1" ],
[ [ "776960_10_16","776960_18_25","776960_18_23","776960_6_4","776960_6_18","776960_16_5","776960_28_0" ], "Sos Pos 2" ],
[ [ "776960_63_9","776960_63_7","776960_63_6","776960_58_11","776960_61_30","776960_61_29","776960_61_28" ], "SOS_SANA" ],
[ [ "776960_54_24","776960_52_13","776960_52_5","844380_1_25","776960_40_20","776960_39_22","776960_12_30" ], "sosipieosIRLremainders+caveDigger" ],
[ [ "776960_49_5","776960_49_4","776960_49_2","776960_42_5","776960_49_1","776960_49_0","776960_48_31" ], "sosIPieSos Weeb + rb Paw" ],
[ [ "745740_46_12","745740_13_18","644560_1_14","1026820_2_10","745740_46_10","745740_31_28","745740_48_0" ], "reflex with mirror and coloring game middle" ],
[ [ "745740_49_31","745740_49_30","745740_49_29","745740_10_7","745740_49_27","745740_44_5","745740_31_26" ], "Reflex_BBB_AnimalCat+Azn4+fay+iloveu" ],
[ [ "828960_13_18","828960_13_17","828960_13_16","828960_13_14","828960_13_15","828960_13_13","828960_13_12" ], "blondeDriverColoredAnime" ],
[ [ "828960_12_2","828960_12_1","828960_12_0","710780_25_20","828960_11_31","828960_11_30","828960_11_28" ], "blonde driver one dalejplotka | cat from skyjump" ],
[ [ "710780_36_16","710780_36_18","818730_19_0","710780_37_10","710780_36_17","710780_36_15","710780_36_24" ], "skyjump + towerclimber BlonAzn" ],
[ [ "710780_31_30","710780_31_23","710780_30_29","710780_37_26","710780_36_19","710780_35_25","818730_20_0" ], "skyjump + towerclimber aznr1" ],
[ [ "710780_37_30","710780_32_5","710780_37_11","710780_32_9","710780_31_25","710780_36_14","776960_38_13" ], "skyjump + sosipieos Green" ],
[ [ "1000550_1_8","1000550_1_7","1000550_1_6","1000550_1_5","1000550_1_4","1000550_1_3","1000550_1_2" ], "hacking Tests dat new game" ],
[ [ "855320_1_9","855320_1_5","776960_75_16","860910_80_9","776960_74_31","860910_64_2","806140_90_5" ], "18floorsx2, sos, hannibal, sos, 3018+ach" ],
[ [ "601980_2_23","601980_2_18","601980_2_22","776340_1_7","601980_2_21","601980_2_12","601980_2_10" ], "DeepFear 1 + Gayworld" ],
[ [ "601980_2_17","601980_2_14","601980_2_20","776340_1_6","601980_2_19","601980_2_7","601980_2_11" ], "DeepFear 2 + Gayworld" ],
[ [ "601980_2_9","601980_2_8","601980_2_16","776340_1_5","601980_2_15","601980_2_2","601980_2_4" ], "DeepFear 3 + Gayworld" ],
[ [ "601980_2_3","601980_2_1","601980_2_13","776340_1_4","601980_2_0","601980_2_6","601980_2_5" ], "DeepFear 4 + Gayworld" ],
[ [ "629280_58_19","629280_204_0","629280_15_24","525500_1_2","629280_217_27","629280_68_15","629280_227_0" ], "Run Away | Candy Kingdom" ] ],
"emoticons_green_icons": [ ":alliedstar:",":em03:",":melon:",":GreenSphere:",":weed:",":clover:",":neutralgear:",":TrollGerka:",":alkat:",":wazapple:",":greenlightorb:",":GreenCube:",":PlanetYelaxot:",":zzacid:",":ZE3_Escape:",":g_heart:" ],
"emoticons_red_icons": [ ":gore:",":ZE3_GameOver:",":bloodsplat:",":zzenergy:",":LightRedCube:",":redlightorb:",":redrose:",":Angrygerka:",":bloodgear:",":em05:" ],
"symbols": [ "☻", "☼", "☎", "♫", "♡", "❀" ],
"to_like_long": [ "get a kick out of", "be entertained", "are pleased by", "take pleasure in" ],
"ascii_equalizer": [ "▇","▅","█","▅","▇","▂","▃","▁","▁","▅","▃","▅","▅","▄","▅","▇" ],
"guide_rainbows": [
  "ːfivecolorsː","ːthreecolorsː","ːtrippybatː",
  "ːheartlessː","ːTheDonutsː","ːcrystalsː","ːeggː",
  "ːPrainbowː","ːrainbowfartː","ːlollypopː","ːpcarsː",
  "ːrighteyeː","ːgarfunkelː","ːrainbowː","ːThe_Ballː",
  "ːcandyrainbowː","ːtisdestroyerː","ːtiselementsː","ːtisbombː",
  "ːuno_Wildː","ːclownhairː","ːglasswindowː","ːshockedIroː" ],
//------------------------------------------------------------------------------ WorkshopLifts
https://steamcommunity.com/id/lordmartin5531/
https://steamcommunity.com/id/n50
https://steamcommunity.com/id/svn_XCVII/myworkshopfiles/?section=guides&p=6
https://steamcommunity.com/profiles/76561198964190411
https://steamcommunity.com/profiles/76561198877940428
https://steamcommunity.com/id/neptunevsnepgear
https://steamcommunity.com/id/Pakitogamer2009
[3134796871,3134799680,3134799828,3134799953,3134800074],
[3134796871,3134799680,3134799828,3134799953,3134800074],
[2943688669,2943688767,2943688882,2943689056,2943689182],
[3155320429,3155320586,3155320719,3155320871,3155320989],
[3155323286,3155323583,3155323708,3155323903,3155324073],
[3155325956,3155326122,3155326316,3155326531,3155326690],
[3145772123,3145772420,3145772651,3145772844,3145773060],
[3155295793,3155295969,3155296127,3155296323,3155296513],
[3155304847,3155305027,3155305166,3155305348,3155305518],
[2966510987,2966511189,2966511349,2966511487,2966511566],
[2676530241,2676530703,2676530920,2676531160,2676531353],
[3162369718,3162369888,3162372615,3162372752,3162370370],
[3162386260,3162386396,3162386605,3162386771,3162386947],
[3162328631,3162328886,3162329133,3162329351,3162329599],
[2946784364,2946785008,2946785250,2946785435,2946785581],
[2869768160,2869768200,2869768230,2869768273,2869768303],
[2869766887,2869766931,2869766973,2869767004,2869767064],
[2796269592,2796269635,2796269653,2796269694,2796269712],
[2834441723,2834443812,2834443880,2834443951,2834444027],
[2832763227,2832763591,2832763921,2832764171,2832764424],
[2834435990,2834436471,2834436683,2834436973,2834437236],
[2832332214,2832332730,2832333029,2832333176,2832333317],
[3086176281,3086176810,3086177338,3086177728,3086181263],
[3086188524,3086188963,3086189467,3086189984,3086190420],
[2857312333,2857312450,2857312575,2857312729,2857312910],
[2958308185,2958309144,2958309240,2958309295,2958309295],
[2857305267,2857305519,2857305828,2857306057,2857306194], 
[2857308229,2857308370,2857308482,2857308653,2857308799],
[2857314820,2857314903,2857315012,2857315158,2857315293],
[2713696865,2713697337,2713697922,2713698382,2713698658],
[2955735825,2955735852,2955735857,2955736177,2955735912],
[2930716967,2930716998,2930717038,2930717079,2930717100],
[2835865440,2835865532,2835865579,2835865621,2835865666],
[2836469467,2836469629,2836469710,2836469850,2836469981],
[3050085670,3050085994,3050087853,3050086607,3050086762],
[2836475061,2836475149,2836475204,2836475260,2836475316],
[3002019021,3002019140,3002019241,3002019327,3002019410],
[3166424931,3166425266,3166425443,3166425502,3166425563],
[3166426432,3166426502,3166426555,3166426618,3166426695],
[3053754764,3053755253,3053755406,3053755508,3053755628],
[3046486920,3046486948,3046486989,3046487041,3046487095],
[2896749974,2896750017,2896750061,2896750105,2896750151],
[2896752051,2896752264,2896752153,2896752328,2896752375],
[3124566831,3124566858,3124566913,3124566983,3124567038],
[2707368643,2707369291,2707369652,2707370008,2707370260],
[2992736779,2992736854,2992736944,2992737052,2992737177],
[2852569473,2852569484,2852569496,2852569507,2852569536],
[3066490578,3066490697,3066490848,3066491002,3066491098],
[3038550158,3038550889,3038551317,3038551881,3038552470],
[2778407689,2778408249,2778408795,2778409223,2778409764],
[3071385341,3071386785,3071387916,3071389042,3071390135],
[2834007456,2834008076,2834008622,2834009092,2834009429],
[2871903023,2871903247,2871903551,2871903784,2871904033],
[2973481360,2973481671,2973481960,2973482282,2973482568],
[2851393942,2851394066,2851394188,2851394311,2851394389],
[2851379962,2851380067,2851380154,2851380329,2851380420],
[2851367097,2851367260,2851367480,2851367627,2851366272],
[2211769466,2211770001,2211770415,2211770773,2211771091],
[2930974428,2930974694,2930974903,2930975826,2930975984],
[3018857535,3018857802,3018857913,3018858005,3018859703],
[2626749180,2626749383,2626749517,2626749661,2626749778],
[2962658614,2962659129,2962659348,2962659543,2962659719],
[2962665504,2962665944,2962666113,2962666306,2962666482],
[2579036015,2579038908,2579036367,2579036957,2579037115],
[3010504500,3010504658,3010504725,3010504938,3010505502],
[2975703124,2975703245,2975703338,2975703459,2975703752]