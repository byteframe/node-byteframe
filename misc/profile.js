//------------------------------------------------------------------------------ BadgesPageOnWebSession
(!account.badges) &&
  http_request(account, 'my/badges', null, (body, response, err,
    links = Cheerio.load(body)('a.btn_green_white_innerfade')) => (
    account.badges = [],
    (links.length > 0) &&
      links.each((i, link) =>
        account.badges.push(+link.attribs.href.substr(12)))))
//------------------------------------------------------------------------------ BotchedNewSlimArtworkSed
http_request(account, 'sharedfiles/itemedittext?' + element, { id: element, language: 0, title: pool(data.emojis_bulk) + generate_fortune('all', 1, 95, 100).replace(/\n/g, '').replace(/ -- .*/, '').trim() + pool(data.emojis_bulk), description: '' }),
//------------------------------------------------------------------------------ CompletionistShowcase
completionist: { shuffle_slots: [ 0, 1 ], shuffle_types: [ -1, -1 ], slots: [ [ ()=> pool(data.completionist) ], [ () => pool(data.completionist) ] ] },
alter_showcase('completionist', 23, (i, element) =>
  account.edit_2 += "&rgShowcaseConfig%5B23_0%5D%5B" + i + "%5D%5Bappid%5D=" + element)
//------------------------------------------------------------------------------ WainSelect
http_request(account, 'https://steamcommunity.com/actions/selectPreviousAvatar', { json: 1, sha: pool(data.wain_sha) }, (body, response, error) =>
//------------------------------------------------------------------------------ GenerateLinks
generate_links = (links = shuffle_array(data.links)) =>
  (pool(data.emoticons[6], 1) + ' ' + links[0] + ' ' + pool(data.emoticons[8], 1) + ' ' +
  links[1] + ' ' + pool(data.emoticons[2], 1) + ' ' +
  links[2] + ' ' + pool(data.emoticons[4], 1) + ' ' +
  links[3] + ' ' + pool(data.emoticons[3], 1) + ' ' +
  links[4] + ' ' + pool(data.emoticons[11], 1) + ' ' +
  links[5] + ' ' + pool(data.emoticons[9], 1) + ' ' +
  links[6] + ' ' + pool(data.emoticons[5], 1) + ' ' + links[7]).replace(/:/g, 'ː');
//------------------------------------------------------------------------------ GenerateHalfLife
generate_halflife = (array, min, max, s = '') => (
  s += pool(array) + " ",
  (s.length > max) ?
    generate_halflife(array, min, max)
  : (s.length > min) ?
    s.trim()
  : generate_halflife(array, min, max, s)),
//------------------------------------------------------------------------------ GenerateHeart
generate_heart = (index = -1, right, h = (index != -1 ? data.hearts[index] : pool(data.hearts, 1, null)[0]), r = (!right ? h[6] : right)) =>
    h[0] + h[0] + h[0] + h[0] + h[0] + h[0] + h[0] + h[0] + h[0] + r[0] + "\n"
  + h[1] + h[2] + h[2] + h[1] + h[1] + h[1] + h[2] + h[2] + h[1] + r[1] + "\n"
  + h[2] + h[3] + h[3] + h[2] + h[1] + h[2] + h[3] + h[3] + h[2] + r[2] + "\n"
  + h[2] + h[3] + h[3] + h[3] + h[2] + h[3] + h[3] + h[3] + h[2] + r[3] + "\n"
  + h[1] + h[2] + h[3] + h[3] + h[4] + h[3] + h[3] + h[2] + h[1] + r[4] + "\n"
  + h[1] + h[1] + h[2] + h[3] + h[3] + h[3] + h[2] + h[1] + h[1] + r[5] + "\n"
  + h[1] + h[1] + h[1] + h[2] + h[3] + h[2] + h[1] + h[1] + h[1] + r[6] + "\n"
  + h[5] + h[5] + h[5] + h[5] + h[2] + h[5] + h[5] + h[5] + h[5] + r[7],
//------------------------------------------------------------------------------ KnowledgeRead
knowledge = fs.readFileSync('rivescript/knowledge.rive', 'utf-8').match(/\n\n+.*\n-.*/g).filter((text) => text.indexOf('*') == -1).map((text) => text.replace(/<set .+>/g, '').replace(/{random}/g, '').trim()),
//------------------------------------------------------------------------------ ProfileErrorLogging
edit_1_errors = [],
edit_2_errors = [],
(body.success != 1) && 
  edit_1_errors.push(account.edit_1),
(body.success != 1) && 
  edit_2_errors.push(account.edit_2),
//------------------------------------------------------------------------------ EmoticonConvertCallsStillInPlace
emoticon_convert = (text) => (
  text = text.replace(/ː/g, ':').replace(/:[0-9a-zA-Z_]+:/g, () => pool(pool(data.emojis, 1, null)[0])),
  data.emojis.index = 0,
  text),
//------------------------------------------------------------------------------ GenerateGreetingsFunction
generate_greetings = (delimiter = "/", text = '') => (
  shuffle_array(data.greetings).forEach((greeting) =>
    text += greeting + '[/url] ' + delimiter + ' '),
  text.trim().slice(0, -2)),
//------------------------------------------------------------------------------ FunctonEditors
edit_group = (account, group, headline, group_form) =>
  http_request(account, 'groups/' + group + '/edit', '&' + group_form.replace(
    /&headline=.*&summary=/, '&headline=' + headline + '&summary=')),
edit_text = (account, publishedfileid, title, description = '') =>
  http_request(account, 'sharedfiles/itemedittext?' + publishedfileid, { id: publishedfileid, language: 0, title: title, description: description }),
//------------------------------------------------------------------------------ GenerateArtworkText
generate_artwork_text = (text = [ haiku.random("html").toString(), haiku.random("html").toString(), haiku.random("html").toString() ]
    .reduce((a, v) => a && a.length <= v.length ? a : v, '').toLowerCase().replace(/<br>/g, '\n').split('\n')) =>
  pool(pool(data.emojis, 1, null)[0]) + " " + text[0] + " " + pool(pool(data.emojis, 1, null)[0]) + " " + text[1] + " "
  + pool(pool(data.emojis, 1, null)[0]) + " " + text[2] + " " + pool(pool(data.emojis, 1, null)[0]),
//------------------------------------------------------------------------------ GenerateBigFortuneHeadline
generate_big_fortune_headline = (size, file = 'all', text = generate_big_fortune(212, file).substr(0, size).split(' ')) => (
  [...Array(6).keys()].forEach((i) =>
    text[(i+1)*(Math.floor((text.length+1)/6)-1)] += " YYY"),
  insert_emojis("YYY " + text.join(' ') + " YYY")),
//------------------------------------------------------------------------------ ProfileIntermediateB
shuffle_string = (s) =>
  shuffle_array(s.split("")).join(""),
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
  edit_text(account, profile.workshop_favorite.selection[0]
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
//------------------------------------------------------------------------------ ProfileIntermediateA
(minutes == 666) && (
  (state.guide_editing[profile.guide_favorite.selection[0]] != 'favorite') && (
    state.guide_editing[profile.guide_favorite.selection[0]] = 'favorite',
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
      + shuffle_string(data.barcode) + "_" + pool(pool(data.emojis, 1, null)[0]) + "_" + shuffle_string(data.chinese).substr(0, 4) + ' (' + pool(data.alphabet).toUpperCase() + ') + ' + pool(pool(data.emojis, 1, null)[0]))),
  [...Array(4).keys()].forEach((i) =>
    (state.guide_editing[profile.guide_collector.selection[i]] != 'collector') && (
      state.guide_editing[profile.guide_collector.selection[i]] = 'collector',
      edit_text(account, profile.guide_collector.selection[i], generate_big_fortune_headline(84)))),
  edit_text(account, profile.artwork.selection[0], generate_artwork_text()),
  edit_text(account, profile.workshop_favorite.selection[0]
    , data.chinese.substr(0, 2) + " " + pool(pool(data.emojis, 1, null)[0]) + " "
    + data.chinese.substr(2, 2) + " " + pool(pool(data.emojis, 1, null)[0]) + " "
    + data.chinese.substr(4, 2) + " " + pool(pool(data.emojis, 1, null)[0]) + " "
    + data.chinese.substr(6, 2) + " " + pool(pool(data.emojis, 1, null)[0]) + " "
    + data.chinese.substr(8, 2)
    , (rainbow[0] + "●▬▬▬▬▬▬▬▬▬▬▬▬▬ 웃" + pool(pool(data.emojis, 1, null)[0]) + "유 ▬▬▬▬▬▬▬▬▬▬▬▬▬●\n"
    + rainbow[1] + "[i] → " + big_fortune_split[0] + " " + pool(pool(data.emojis, 1, null)[0]) + "\n"
    + rainbow[2] + " → " + big_fortune_split[1] + " " + pool(pool(data.emojis, 1, null)[0]) + "\n"
    + rainbow[3] + " → " + big_fortune_split[2] + " " + pool(pool(data.emojis, 1, null)[0]) + "\n"
    + rainbow[4]).replace(/[-.,"']/g, '').toLowerCase()),
  edit_group(account, group_url, generate_big_fortune_headline(212), data.group_forms[group_url])),
//------------------------------------------------------------------------------ PdlAvatar
avatars_group = fs.readdirSync("./images/group"),
(new Date().getMinutes() == 666) &&
  ((avatar_file = fs.readFileSync("./images/group/" + pool(avatars_group))) =>
    account.community.httpRequestPost({
      "uri": "https://steamcommunity.com/actions/FileUploader",
      "json": true,
      "formData": {
        "type": "group_avatar_image", "doSub": 1, "json": 1,
        "MAX_FILE_SIZE": avatar_file.length,
        "gId": "103582791432273268",
        "sessionid": account.community.getSessionID(),
        "avatar": { "value": avatar_file, "options": { "filename": 'avatar.jpg', "contentType": 'image/jpeg' } } }
    }, (err, response, body) =>
      (err || response.statusCode != 200 || !body || !body.success) ?
        log(account, 'FAILURE | actions/uploadAvatar: ' + (""+avatars_group.index).yellow)
      : (state.verbose == 1) &&
        log(account, 'SUCCESS | actions/uploadAvatar: ' + (""+avatars_group.index).yellow)))()
//------------------------------------------------------------------------------ GamesPlayed
gamesPlayed: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [
  (account) => (
    (!account.user.playingState.blocked) &&
      account.user.gamesPlayed([+pool(data.faker_apps),+pool(data.faker_apps),+pool(data.faker_apps)]),
    setTimeout(() => account.user.gamesPlayed(
      pool(data.emojis[0]) + " " + pool(data.emojis[1]) + " "
      + pool(data.emojis[2]) + " " + pool(data.emojis[3]) + " "
      + pool(data.emojis[0]) + " " + pool(data.emojis[1]) + " "
      + pool(data.emojis[2]) + " " + pool(data.emojis[3]) + " "
      + pool(data.emojis[0]) + " " + pool(data.emojis[1]) + " "
      + pool(data.emojis[2])), 2500)) ] ] } },
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
//------------------------------------------------------------------------------ Badges
badges = JSON.parse(body.match(/InitBadges.*}]/)[0].substr(11));
badge_favorite.slots = [[() => ( badge = badges[Math.floor(Math.random()*badges.length)], (badge.badgeid) ? "badgeid_" + badge.badgeid : "communityitemid_" + badge.communityitemid)]],
//------------------------------------------------------------------------------ CheckDuplicateAch
(check_duplicate_ach = () => {
  let result = [];
  data.achievement_array.forEach(function(element, index) {
    if (data.achievement_array.indexOf(element, index + 1) > -1) {
      if (result.indexOf(element) === -1) {
        result.push(element);
      }
    }
  });
  console.dir(result);
})();
//------------------------------------------------------------------------------ SlimUploadAvatar
SteamCommunity.prototype.uploadAvatar = function(image, format, callback) {
  var self = this;
  this.httpRequestGet({
    "uri": image,
    "encoding": null
  }, function(err, response, body) {
    if (err || response.statusCode != 200) {
      return callback(err ? new Error(err.message + " downloading image")
        : new Error("HTTP error " + response.statusCode + " downloading image"));
    }
    self.httpRequestPost({
      "uri": "https://steamcommunity.com/actions/FileUploader",
      "formData": {
        "MAX_FILE_SIZE": body.length,
        "type": "player_avatar_image",
        "sId": account.user.steamID.getSteamID64(),
        "sessionid": self.getSessionID(),
        "doSub": 1,
        "json": 1,
        "avatar": {
          "value": body,
          "options": {
            "filename": 'avatar.jpg',
            "contentType": 'image/jpeg'
          }
        }
      },
      "json": true
    }, function(err, response, body) {
      if (err) {
        return callback(err);
      }
      if (body && !body.success && body.message) {
        return callback(new Error(body.message));
      }
      if (response.statusCode != 200) {
        return callback(new Error("HTTP error " + response.statusCode));
      }
      if (!body || !body.success) {
        return callback(new Error("Malformed response"));
      }
      return callback(null, body.images.full);
    }, "steamcommunity");
  }, "steamcommunity");
};
//------------------------------------------------------------------------------ BackgroundInventory
console.log('requesting inventory...');
account.community.httpRequestGet({
  "uri": 'https://steamcommunity.com/id/Triumphofdegeneration/inventory/json/753/6',
  "json": true,
  "form": {
    "l": 'english',
    "count": 5000, 
    "start_assetid": start
  }
}, (err, response, body) => {
  if (err) {
    return console.error('inventory request failure!');
  }
  if (!body.success) {
    return console.error('inventory data failure!');
  }
  var items = [];
  Object.keys(body.rgInventory).map((key, index) => {
    items[index] = body.rgInventory[key];
  });
  Object.keys(body.rgDescriptions).map((key, index) => {
    for (var j = 0; j < items.length; j++) {
      if (body.rgDescriptions[key].classid == items[j].classid) {
        body.rgDescriptions[key].id = items[j].id;
      }
    }
    if (body.rgDescriptions[key].tags[2].name == "Profile Background") {
      backgrounds1.push(body.rgDescriptions[key]);
    }
  });
  console.log('total backgrounds: ' + backgrounds1.length);
});
account.community.httpRequestGet({
  "uri": 'https://steamcommunity.com/my/edit',
}, function(err, response, body) {
  if (err) {
    return console.error('profile get failure!');
  }
  var $ = Cheerio.load(body)
    , edit_form = $("#editForm").serializeArray()
    , values = {};
  edit_form.forEach(function(item) {
    values[item.name] = item.value;
  });
  background = pool_elements(backgrounds, 1, null)[0];
  edit.find("#profile_background").attr("value", background.id);
  var index = edit_form.findIndex(function(element) {
    return element.name == 'profile_background';
  });
  edit_form[index] = { name: 'profile_background', value: backgrounds[0].id};
  index = edit_form.findIndex(function(element) {
    return element.name == 'rgShowcaseConfig[4][6][notes]';
  });
  edit_form[index] = { name: 'rgShowcaseConfig[4][6][notes]', value: 'fml'};
  values.profile_background = backgrounds[0].id;
  console.log(values);
  account.community.httpRequestPost({
    "uri": 'https://steamcommunity.com/id/my/edit',
    "form": values,
    "xhrFields": { withCredentials: true }
  }, function(err, response, body) {
    if (err) {
      return console.error('profile post failure!');
    }
    console.log(backgrounds.index + '|' + background.market_fee_app +
      " / " + avatar[0].slice(32) + ' #' + (avatar[1]+1));
  }, 'steamcommunity.com');
});
//------------------------------------------------------------------------------ OGGAvatars
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
http_request('ogg/' + avatar[0] + '/Avatar/List', {}, (body, response, err) => {
  http_request(Cheerio.load(body)('p.returnLink a')[0].attribs.href + '/selectAvatar', { selectedAvatar: avatar[1] });
});
http_request('https://steamcommunity.com/games/' + avatar[0] + '/selectAvatar', { selectedAvatar: avatar[1] });
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
  http_request(edit_process.url, edit_process.data, (body, response, error) => {
    body = Cheerio(Cheerio.load(body)('state')).find('state').prevObject;
    if (body.length > 1) {
      edit_process.data.state = body[Math.floor(Math.random() * (body.length-1)+1)].attribs.key;
      text += "&state=" + edit_process.data.state;
      return http_request(edit_process.url, edit_process.data, (body, response, error) => {
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
    http_request('my/edit', edit("#editForm").serialize().replace( /&country=.*&custom/, text + "&custom"));
  };
});
fs.writeFileSync('countries.json', JSON.stringify(new_countries, null, 2));
global.hello = JSON.parse(fs.readFileSync('countries.json'));
//------------------------------------------------------------------------------ CountriesGenerate
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
  http_request(edit_process.url, edit_process.data, (body, response, error) => {
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
        http_request(edit_process.url, edit_process.data, (body, response, error) => {
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
    account.http_request('my/ajaxsetshowcaseconfig?' + Object.values(data).join('|'), data, null, 'POST', true, false);
  }
};
SetItemShowcaseSlot = (id, i, element) => { XXX
  element = element.split('_');
  SetShowcaseConfig(id, i, {
    appid: element[0],
    item_contextid: element[1],
    item_assetid: element[2]
  });
};
alter_showcase(trade_items, (i, element) => { SetItemShowcaseSlot(4, i, element); });
alter_showcase(item_showcase, (i, element) => { SetItemShowcaseSlot(3, i, element); });
//------------------------------------------------------------------------------ RunRandomizedProfile
run_randomized_profile = (account, profile, callback = null, lite = false) => {
  if (!account.user.steamID) {
    return account.log("FAILURE | my/edit: " + "000=LostSteamID".yellow);
  }
  if (account.edit == null) {
    return account.http_request('my/edit', { sessionid: account.community.getSessionID() }, (body, response, err) => {
      account.edit = Cheerio.load(body);
      account.backgrounds = { index: 0, pool: [] };
      account.badges = JSON.parse(body.match(/InitBadges.*}]/)[0].substr(11));
      account.money1 = ['XXX', "1.00"];
      account.money2 = ['XXX', "2.00"];
      if (!lite) {
        return account.http_request('https://store.steampowered.com/account/', null, (body, response, err) => {
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
  alter_showcase('workshop_favorite', (i, element) =>
    alter_showcase_favorite(11, i, element));
  alter_showcase('workshop_collector', (i, element) =>
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
  alter_showcase('trade_items', (i, element) =>
    SetItemShowcaseSlot(4, i, element));
  alter_showcase('item_showcase', (i, element) =>
    SetItemShowcaseSlot(3, i, element));
  if (account.index == 97) {
    edit_form = edit_form.replace('ZZZ', encodeURIComponent('\n\n[h1]Profile Debug:[/h1]\n[b]'
      + (profile.game_favorite.selection[0]+"").replace(/_.*/, "") + "[/b] " + pool_elements(emoticon_static[12]) +  " [i]" + profile.game_collector.selection + "[/i]"));
  }
  fs.writeFileSync('edit_form.txt', edit_form.replace(/&/g,'\n&'));
  account.http_request('my/edit', edit_form, (body, response, err) => {
    account.edit = Cheerio.load(body);
    var avatar = pool_elements(avatars, 1, null)[0];
    account.http_request('https://steamcommunity.com/games/' + avatar[0] + '/selectAvatar', { selectedAvatar: avatar[1] });
    if (!lite) {
      profile_intermediate(account);
    }
    account.user.setPersona([1,2,3,4,5,6][Math.floor(Math.random()*6)]);
    if (callback !== null) {
      callback();
    }
  }, 'POST');
};
//------------------------------------------------------------------------------ ScreenshotDescriptions
inactive_screenshot_text = (sharedid) => {
  if (!shareid instanceof Array) {
    sharedid = [shareid];
  }
  shareid.forEach((sid) => {
    var line = font('ITEMS = \ ', 13);
    for (var i = 0; i < 19; i++) {
      line += pool_elements(pool_elements(emojis, 1, null)[0]) + "-";
    }
    edit_text(sid, line.slice(0,-1) + " /", line.slice(0,-1));
    pool_elements(pool_elements(emojis, 1, null)[0]);
  });
};
//------------------------------------------------------------------------------ DogFacts
unsafeWindow.profile_intermediate = function(sharedid) {
  var dog_fact = pool_elements(dog_facts);
  while (true) {
    if (dog_fact.indexOf('YYY') > -1) {
      dog_fact = dog_fact.replace(
        "YYY", pool_elements(pool_elements(emojis, 1, null)[0]));
    } else {
      break;
    }
  }
  edit_group(group_favorite.selection[0].substr(19), dog_fact);
  if (!shareid instanceof Array) {
    sharedid = [shareid];
  }
  shareid.forEach(function(sid) {
    var line = font('ITEMS = \ ', 13);
    for (var i = 0; i < 19; i++) {
      line += pool_elements(pool_elements(emojis, 1, null)[0]) + "-";
    }
    edit_text(sid, line.slice(0,-1) + " /", line.slice(0,-1));
    pool_elements(pool_elements(emojis, 1, null)[0]);
  });
};
//------------------------------------------------------------------------------ GenerateLinks
my_links = [
  '' + font('Comments', 3) + '',
  '' + font('Favorite', 3) + '',
  '' + font('Note', 3) + '',
  '' + font('Multimedia', 3) + '',
  '' + font('Trade', 3) + '',
  '' + font('Setup', 3) + '',
  '' + font('Lounge', 3) + '',
  '' + font('Group', 3) + '' ];
generate_links = () => {
  shuffle_array(my_links);
  var links = pool_elements(emoticon_static[6], 1) + ' ' + my_links[0] + ' ' + pool_elements(emoticon_static[8], 1) + ' ' +
  my_links[1] + ' ' + pool_elements(emoticon_static[2], 1) + ' ' +
  my_links[2] + ' ' + pool_elements(emoticon_static[4], 1) + ' ' +
  my_links[3] + ' ' + pool_elements(emoticon_static[3], 1) + ' ' +
  my_links[4] + ' ' + pool_elements(emoticon_static[11], 1) + ' ' +
  my_links[5] + ' ' + pool_elements(emoticon_static[9], 1) + ' ' +
  my_links[6] + ' ' + pool_elements(emoticon_static[5], 1) + ' ' + my_links[7];
  return links.replace(/:/g, 'ː');
};
//------------------------------------------------------------------------------ ReplicantScraps
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
  gamesPlayed: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [
    (account) => (
      (!account.user.playingState.blocked) &&
        account.user.gamesPlayed([+pool(byteframe.faker_apps),+pool(byteframe.faker_apps),+pool(byteframe.faker_apps)]),
      setTimeout(() => account.user.gamesPlayed(
        pool(byteframe.emojis[0]) + " " + pool(byteframe.emojis[1]) + " "
        + pool(byteframe.emojis[2]) + " " + pool(byteframe.emojis[3]) + " "
        + pool(byteframe.emojis[0]) + " " + pool(byteframe.emojis[1]) + " "
        + pool(byteframe.emojis[2]) + " " + pool(byteframe.emojis[3]) + " "
        + pool(byteframe.emojis[0]) + " " + pool(byteframe.emojis[1]) + " "
        + pool(byteframe.emojis[2])), 2500)) ] ] } },
gamesPlayed: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [
  (account) =>
    (account.user.playingState.blocked) ? (
      account.user.gamesPlayed(),
      account.user.setPersona(SteamUser.EPersonaState.Offline))
    :(account.user.setPersona(SteamUser.EPersonaState.Online),
      account.user.gamesPlayed([+pool(byteframe.faker_apps),+pool(byteframe.faker_apps),+pool(byteframe.faker_apps)]),
      setTimeout(() => account.user.gamesPlayed(
        pool(decoration.emojis[0]) + " " + pool(decoration.emojis[1]) + " "
        + pool(decoration.emojis[2]) + " " + pool(decoration.emojis[3]) + " "
        + pool(decoration.emojis[0]) + " " + pool(decoration.emojis[1]) + " "
        + pool(decoration.emojis[2]) + " " + pool(decoration.emojis[3]) + " "
        + pool(decoration.emojis[0]) + " " + pool(decoration.emojis[1]) + " "
        + pool(decoration.emojis[2])), 2500)) ] ] }
//------------------------------------------------------------------------------ AlterShowcaseProcedure
alter_showcase2 = (_showcase, callback = '') => {
  if (!profile.hasOwnProperty(_showcase)) {
    return;
  }
  var showcase = profile[_showcase];
  showcase.selection = [];
  if (showcase.shuffle_slots.length) {
    var to_shuffle = [];
    showcase.shuffle_slots.forEach((slot) =>
      to_shuffle.push([showcase.slots[slot], showcase.shuffle_types[slot]]));
    shuffle_array(to_shuffle);
    showcase.shuffle_slots.forEach((slot, i) => (
      showcase.slots[slot] = to_shuffle[i][0],
      showcase.shuffle_types[slot] = to_shuffle[i][1]));
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
        element = element(account, profile.lite);
      }
      showcase.selection[i] = element;
      if (typeof element === 'string') {
        if (profile.lite) {
          element = emoticon_convert(element);
        }
        element = encodeURIComponent(element);
      }
      callback(i, element);
    }
  })
}
//------------------------------------------------------------------------------