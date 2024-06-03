//------------------------------------------------------------------------------ GooglePhotos
googleAPIsPhotos = require('googlephotos'),
google_photos = new googleAPIsPhotos(google_auth.credentials.access_token),
google_photos.albums.list().then((result) =>
  ((total_count = +result.albums[0].mediaItemsCount + +result.albums[1].mediaItemsCount,
    picture = Math.floor(Math.random() * total_count),
    album = (picture > 19999 ? result.albums[0].id : result.albums[1].id) ) =>
      google_photos.mediaItems.search(album).then((result) =>
        global.result1 = result
      );
  )()
//------------------------------------------------------------------------------ GoogleOAuth2
scopes = [
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/youtubepartner",
  "https://www.googleapis.com/auth/youtube",
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/youtube.upload",
  "https://www.googleapis.com/auth/photoslibrary.readonly",
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.readonly"
];
google_auth.generateAuthUrl({ access_type: 'offline', scope: scopes.join(' ') });
code = 'CODE_FROM_GOOGLE';
google_auth.getToken(code, (err, token) => (err) ? console.error(err) : (console.log(token), state.google_token = token));
//------------------------------------------------------------------------------ ShareFunction
imgur.shareImage = function (shareid, title) {
  var deferred = Q.defer();
  if(!shareid) {
      deferred.reject('Missing shareid');
  }
  imgur._imgurRequest('share', shareid, { "mature": 1, "title" : title } )
      .then(function (json) {
          deferred.resolve(json);
      })
      .catch(function (err) {
          deferred.reject(err);
      });
  return deferred.promise;
}
imgur.shareImage(json.data.id, screenshot.filename))
//------------------------------------------------------------------------------ ChangesToImgUrRequest
case 'share':
  options.method = 'POST';
  options.uri += 'gallery/image/' + payload
  break;
else if (operation === 'share') {
  form = r.form();
  form.append('title', extraFormParams.title);
}
//------------------------------------------------------------------------------ TwitterMisc
generate_hashtags = (hashtags = data.hashtags) =>
  pool(pool(data.emojis, 1, null)[0]) + " " + pool(hashtags, hashtags.length, ' ').replace(/ /g, ()=> ' ' + pool(pool(data.emojis, 1, null)[0]) + ' ') + ' ' + pool(pool(data.emojis, 1, null)[0]),
twitter_videos = [],
Object.keys(state.videos).forEach((videoid) =>
  (!state.videos[videoid].tweeted) &&
    twitter_videos.push(videoid)),
shuffle_array(twitter_videos),
video_twitter = (videoid = twitter_videos.shift()) =>
  (typeof videoid != 'undefined') &&
    twitter_request('POST', 'statuses/update', { status: generate_hashtags() + "\n\n" + state.videos[videoid].link_url }, (err, body, response) => (
      console_log("SUCCESS |" + '000'.gray.inverse + "| statuses/update: ".reset + state.videos[videoid].title.yellow),
      state.videos[videoid].tweeted = true)),
//------------------------------------------------------------------------------ TwitterFunctional
Twitter = require('twitter'),
("twitter" == "666") && (
  twitter = new Twitter({
    consumer_key: state.twitter_consumer_key,
    consumer_secret: state.twitter_consumer_secret,
    access_token_key: state.twitter_access_token_key,
    access_token_secret: state.twitter_access_token_secret })),
twitter_request = (method, endpoint, form = {}, callback = null) =>
  twitter[method.toLowerCase()](endpoint, form, (err, body, response,
    result = endpoint + ": " + (method + '-' + response.statusCode.toString()).yellow) => (
    (err) ?
      result = "FAILURE |" + "000".gray.inverse + "| " + result + ("=" + err.message).yellow
    :(result = "SUCCESS |" + "000".gray.inverse + "| " + result,
      (callback !== null) &&
        callback(err, body, response)),
    (result.indexOf('FAILURE') > -1 || verbose) &&
      console_log(result.replace('POST-', 'POST'.inverse + '-')))),
wain_images = fs.readdirSync("./images/wain"),
select_screenshots = (length, results = [], screenshot = pool(twitter_screenshots, 1, null)[0]) =>
  (results.length == length) ?
    results
  :((screenshot.width === screenshot.height) &&
      results.push(steam_path + '760/remote/' + screenshot.filename),
    select_screenshots(length, results)),
imagemagick = require('imagemagick'),
im_combine = (args, files, output, callback = null) =>
  imagemagick.convert(args.concat(files).concat([output]), (err, stdout) =>
    (err) ?
      console.error(err)
    : (callback != null) &&
      callback(err, stdout)),
twitter_description = (
  text = "virtual reality photographer / bot who makes #SteamVR environments in #source2\n\n"
    + pool(data.emojis[0]) + " https://t.co/OGnoIT2NBe " + pool(data.emojis[1]) + " https://t.co/kppQnAkosG") =>
  (text.length > 160) ?
    twitter_description()
  : text,
twitter_banner = () =>
  im_combine(['+append', '-resize', 'x250' ], select_screenshots(6), './im_out-1.jpg', (err1, stdout1) =>
    im_combine(['+append', '-resize', 'x250' ], select_screenshots(6), './im_out-2.jpg', (err2, stdout2) =>
      im_combine([ '-append' ], [ './im_out-1.jpg', './im_out-2.jpg' ], 'im_out-twitter.jpg', (err3, stdout3) => (
        twitter_request('POST', 'account/update_profile_banner.json', { banner: base64(fs.readFileSync('./im_out-twitter.jpg')) }),
        fs.unlinkSync('im_out-1.jpg'),
        fs.unlinkSync('im_out-2.jpg'),
        fs.unlinkSync('im_out-twitter.jpg'))))),
twitter_profile = (account, twitter_name, background_url, avatar_url, location) =>
  twitter_request('POST', 'account/update_profile_image.json', { image: base64(fs.readFileSync('./images/wain/' + pool(wain_images))) }, (err, body, response) => (
    twitter_request('POST', 'account/update_profile.json', {
      name: twitter_name,
      url: 'https://github.com/byteframe',
      location: location.replace(', Items Up For Trade', '').replace(', Artwork Showcase', ''),
      description: twitter_description(),
      profile_link_color: ((letters = '0123456789ABCDEF', color = '') =>
        letters[Math.floor(Math.random() * 16)] + letters[Math.floor(Math.random() * 16)]
        + letters[Math.floor(Math.random() * 16)] + letters[Math.floor(Math.random() * 16)]
        + letters[Math.floor(Math.random() * 16)] + letters[Math.floor(Math.random() * 16)])()}))),
run_tweet_post = (account) =>
  twitter_request('GET', 'statuses/user_timeline', { screen_name: 'byteframe' }, (err, body, reponse, next_tweet = null) => (
    body.some((tweet) =>
      (tweet.id_str == state.last_tweet) ?
        true
      :(!tweet.text.match(/^#.*https:\/\/t\.co\/[0-9a-zA-Z_]*$/)) ? (
        next_tweet = tweet.id_str,
        false)
      : false),
    (next_tweet) &&
      twitter_request('GET', 'statuses/show', { id: next_tweet, tweet_mode: 'extended' }, (err, result1, reponse,
        entities = [ "[url=https://twitter.com/byteframe]@byteframe[/url]" ],
        type = (result1.retweeted ? 'RETWEETED' : 'TWEETED'),
        _run_tweet_post = () => (
          result1.entities.user_mentions.forEach((entity) =>
            entities.push('[url=https://twitter.com/' + entity.screen_name + ']@' + entity.screen_name + '[/url]')),
          result1.entities.hashtags.forEach((entity) =>
            entities.push('[url=https://twitter.com/hashtag/' + entity.text + ']#' + entity.text + '[/url]')),
          result1.entities.urls.forEach((entity) => (
            (entity.display_url.indexOf('youtu') == 0) ?
              result1.full_text = result1.full_text.replace(entity.url, entity.expanded_url) : null,
            result1_full_text = result1.full_text.replace(entity.expanded_url + "\n\n", entity.expanded_url + "\n"))),
          state.last_tweet = result1.id_str,
          post_status(account, "[u]" + data.greetings[Math.floor(Math.random() * data.greetings.length)] + "[/u] " + pool(data.ascii)
            + " | [u]byteframe (from Steam) just [b]" + type + "[/b] something![/u]"
            + ' [url=https://twitter.com/statuses/' + result1.id_str + ']' + data.signs[0] + ':' + result1.id_str + '[/url]\n\n'
            + pool(data.emoticons[3], 29, "|") + "\n\n"
            + html_convert(result1.full_text) + "\n\n"
            + pool(data.emoticons[3], 29, "|") + "\n\n"
            + font("ENTITIES", 15) + ": " + shuffle_array(entities).join(',') + "\n"
            + pool(data.smileys)+ " [spoiler]" + new Date().toUTCString() + "[/spoiler] " + pool(data.smileys)
          , 809320))) => (
        result1.quoted = (result1.quoted_status || result1.in_reply_to_status_id_str ? true : false),
        (result1.retweeted) ? (
          result1.full_text = "[i][u][b]@" + result1.retweeted_status.user.screen_name + ":[/b][/u]\n" + result1.retweeted_status.full_text + " [/i]",
          (result1.retweeted_status.quoted_status) && (
            result1.link_index = result1.retweeted_status.quoted_status.full_text.indexOf('https'),
            result1.full_text += "\n\n" + font(result1.retweeted_status.quoted_status.full_text.substr(0, result1.link_index), 4)
              + result1.retweeted_status.quoted_status.full_text.substr(result1.full_index)))
        : result1.full_text = "[u][b]@byteframe:[/b][/u]\n" + result1.full_text.replace(/ https:\/\/t.co\/[a-zA-Z0-9]*$/, ''),
        (!result1.quoted) ?
          _run_tweet_post()
        : ((result1.quoted_status) ? (
            type = 'QUOTED',
            entities.push('[url=https://twitter.com/' + result1.quoted_status.user.screen_name + ']@' + result1.quoted_status.user.screen_name + '[/url]'))
          : (type = 'REPLIED TO',
            result1.full_text = result1.full_text.replace(/@.+? /, '')),
          twitter_request('GET', 'statuses/show', { id: (result1.quoted_status) ? result1.quoted_status.id_str : result1.in_reply_to_status_id_str, tweet_mode: 'extended' }, (err, result2, response) => (
            result1.entities.hashtags = result1.entities.hashtags.concat(result2.entities.hashtags),
            result1.entities.symbols = result1.entities.symbols.concat(result2.entities.symbols),
            result1.entities.user_mentions = result1.entities.user_mentions.concat(result2.entities.user_mentions),
            result1.entities.urls = result1.entities.urls.concat(result2.entities.urls),
            result1.full_text += "\n\n[i][u][b]@" + result2.user.screen_name + ":[/b][/u]\n" + result2.full_text + "[/i]",
            _run_tweet_post()))))))),
//------------------------------------------------------------------------------ PeriscopeSpamer
request('https://pscp.tv/byteframe_' , (err, response, body) =>
  twitter_request('POST', 'statuses/update', { status: generate_hashtags() + '\n' + body.match(/https:\/\/www\.pscp\.tv\/w\/[0-9A-Za-z]*/)[0] }))
//------------------------------------------------------------------------------ VideoSpammer
twitter_video_post = true,
(twitter_video_post) ? (
  twitter_video_post = false,
  video_twitter())
: (twitter_video_post = true,
  screenshot_twitter()),
//------------------------------------------------------------------------------ TwitterProcedureal
Twitter = require('twitter'),
twitter = new Twitter({
  consumer_key: config.twitter.twitter_consumer_key,
  consumer_secret: config.twitter.twitter_consumer_secret,
  access_token_key: config.twitter.twitter_access_token_key,
  access_token_secret: config.twitter.twitter_access_token_secret
}),
run_twitter_profile = (account, twitter_name, background_url, avatar_url, location) => {
  account.http_request(background_url, null, (body1, response, error1) => {
    account.http_request(avatar_url, null, (body2, response, error2) => {
      twitter_request('POST', 'account/update_profile_banner.json', { banner: base64(body1) }, (err, body, response) => {
        twitter_request('POST', 'account/update_profile_image.json', { image: base64(body2) }, (err, body, response) => {
          twitter_request('POST', 'account/update_profile.json', {
            name: twitter_name,
            url: 'https://steamcommunity.com/id/byteframe?l=' +
              [ 'bulgarian','czech','danish','dutch','english','finnish','french','german','greek','hungarian','italian','japanese','koreana','norwegian','polish','portuguese','brazilian','romanian','russian','schinese','spanish','swedish','tchinese','thai','turkish','ukrainian' ][Math.floor(Math.random() * 26)],
            location: location,
            description: generate_artwork_text(),
            profile_link_color: ((letters = '0123456789ABCDEF', color = '') => {
              for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
              }
              return color;
            })()
          });
        });
      });
    }, "GET", false);
  }, "GET", false);
};
twitter_request = (method, endpoint, data = {}, callback = null) => {
  var output_func = (err, body, response) => {
    var result = endpoint + ": " + (method + '-' + response.statusCode.toString()).yellow;
    if (err) {
      result = "FAILURE |" + "000".gray.inverse + "| " + result + ("=" + err.message).yellow;
    } else {
      result = "SUCCESS |" + "000".gray.inverse + "| " + result;
      if (callback !== null ) {
        callback(err, body, response);
      }
    }
    if (result.indexOf('FAILURE') > -1 || verbose) {
      console.log(result.replace('POST-', 'POST'.inverse + '-'));
    }
  };
  (method == 'GET') ?
    twitter.get(endpoint, data, output_func)
  : twitter.post(endpoint, data, output_func);
},
screenshots = [],
screenshots_vdf = SimpleVDF.parse(fs.readFileSync("./screenshots.vdf", 'utf8')).screenshots,
Object.keys(screenshots_vdf).forEach((gameid) =>
  (gameid != 'shortcutnames') &&
    Object.keys(screenshots_vdf[gameid]).forEach((screenshot) =>
      (screenshots_vdf[gameid][screenshot].Permissions == '8' && config.twitter.screenshots.indexOf(screenshots_vdf[gameid][screenshot].hscreenshot) == -1) &&
        screenshots.push(screenshots_vdf[gameid][screenshot]))),
shuffle_array(screenshots),
run_screenshot_tweet = (screenshot = screenshots.shift()) =>
  twitter_request('POST', 'media/upload', { media: fs.readFileSync('/mnt/Datavault/Work/Steam/screenshots/760/remote/' + screenshot.filename) }, (err, body, response) =>
    twitter_request('POST', 'statuses/update', { status: '#VirtualReality #VR #htcvive #mMR #OculusRift #AR #SteamVR #games ', media_ids: body.media_id_string }, (err, body, response) =>
      config.twitter.screenshots.push(screenshot.hscreenshot))),
run_tweet_post = (account) => {
  twitter_request('GET', 'statuses/user_timeline', { screen_name: 'byteframe'}, (err, body, reponse) => {
    var next_tweet = null;
    body.some((tweet) => {
      if (tweet.id_str == config.twitter.last_tweet) {
        return true;
      }
      if (!tweet.text.match(/^https:\/\/t\.co\/[0-9a-zA-Z_]*$/)) {
        next_tweet = tweet.id_str;
      }
    });
    if (next_tweet) {
      twitter_request('GET', 'statuses/show', { id: next_tweet, tweet_mode: 'extended' }, (err, result1, reponse) => {
        var entities = [ "[url=https://twitter.com/byteframe]@byteframe[/url]" ]
          , type = 'TWEETED';
        _run_tweet_post = () => {
          result1.entities.user_mentions.forEach((entity) => {
            entities.push('[url=https://twitter.com/' + entity.screen_name + ']@' + entity.screen_name + '[/url]');
          });
          result1.entities.hashtags.forEach((entity) => {
            entities.push('[url=https://twitter.com/hashtag/' + entity.text + ']#' + entity.text + '[/url]');
          });
          result1.entities.urls.forEach((entity) => {
            if (entity.display_url.indexOf('youtu') == 0) {
              result1.full_text = result1.full_text.replace(entity.url, entity.expanded_url);
            }
            result1_full_text = result1.full_text.replace(entity.expanded_url + "\n\n", entity.expanded_url + "\n");
          });
          account.post_status("[u]" + byteframe.greetings[Math.floor(Math.random() * byteframe.greetings.length)] + "[/u] " + pool(decoration.ascii) +
            " | [u]byteframe (from Steam) just [b]" + type + "[/b] something![/u]" +
              ' [url=https://twitter.com/statuses/' + result1.id_str + ']' + decoration.signs[0] + ':' + result1.id_str + '[/url]\n\n' +
            pool(byteframe.emoticons[3], 29, "|") + "\n\n" +
            html_convert(result1.full_text) + "\n\n" +
            pool(byteframe.emoticons[3], 29, "|") + "\n\n" +
            font("ENTITIES", 15) + ": " + shuffle_array(entities).join(',') + "\n" +
            pool(decoration.smileys)+ " [spoiler]" + new Date().toUTCString() + "[/spoiler] " + pool(decoration.smileys)
          , 809320, (post_id) => {
            config.twitter.last_tweet = result1.id_str;
          });
        };
        if (result1.retweeted) {
          type = 'RETWEETED';
          result1.full_text = "[i][u][b]@" + result1.retweeted_status.user.screen_name + ":[/b][/u]\n" + result1.retweeted_status.full_text + "[/i]";
        } else {
          result1.full_text = "[u][b]@byteframe:[/b][/u]\n" + result1.full_text.replace(
            / https:\/\/t.co\/[a-zA-Z0-9]*$/, '');
          if (result1.quoted_status || result1.in_reply_to_status_id_str) {
            if (result1.quoted_status) {
              type = 'QUOTED';
              entities.push('[url=https://twitter.com/' + result1.quoted_status.user.screen_name + ']@' + result1.quoted_status.user.screen_name + '[/url]');
            } else {
              type = 'REPLIED TO';
              result1.full_text = result1.full_text.replace(/@.+? /, '')
            }
            return twitter_request('GET', 'statuses/show', { id: (result1.quoted_status) ? result1.quoted_status.id_str : result1.in_reply_to_status_id_str, tweet_mode: 'extended' }, (err, result2, response) => {
              result1.entities.hashtags = result1.entities.hashtags.concat(result2.entities.hashtags);
              result1.entities.symbols = result1.entities.symbols.concat(result2.entities.symbols);
              result1.entities.user_mentions = result1.entities.user_mentions.concat(result2.entities.user_mentions);
              result1.entities.urls = result1.entities.urls.concat(result2.entities.urls);
              result1.full_text += "\n\n[i][u][b]@" + result2.user.screen_name + ":[/b][/u]\n" + result2.full_text + "[/i]";
              _run_tweet_post();
            });
          }
        }
        _run_tweet_post();
      });
    }
  });
};
//------------------------------------------------------------------------------ twitch
(async () => (
  Twitch = await require('twitch').default,
  twitch = await Twitch.withCredentials(state.twitch_clientId, state.twitch_accessToken, undefined, {
    clientSecret: state.twitch_clientSecret,
    refreshToken: state.twitch_refreshToken,
    expiry: state.twitch_expiryTimestamp,
    onRefresh: async ({ accessToken, refreshToken, expiryDate }) => (
      state.twitch_accessToken = accessToken,
      state.twitch_refreshToken = refreshToken,
      state.twitch_expiryTimestamp = expiryDate)
  }),
  TwitchChat = require('twitch-chat-client').default,
  twitchChat = await TwitchChat.forTwitchClient(twitch),
  twitchChat.connect(),
  await twitchChat.waitForRegistration(),
  twitchChat.join('byteframe'),
  twitchChat.onWhisper((channel, user, message) =>
    twitchChat.whisper(user, get_reply(user, message))),
  twitchChat.onJoin((channel, user) =>
    (Math.floor(Math.random()* 6) != 0) &&
      twitchChat.say('byteframe', generate_halflife(data.soldiers, 30))),
  twitchChat.onPrivmsg((channel, user, message) => 
    (user != 'byteframe' && message.indexOf('@byteframe ') == 0) &&
      twitchChat.say('byteframe', '@' + user + ' ' + get_reply(user, message.substr(11))))))()
//------------------------------------------------------------------------------ VDF/sharedconfig
(process.platform === 'win32') ? (
  dir_path = 'D:/',
  steam_path = 'C:/Program Files (x86)/Steam/userdata/752001/')
: (dir_path = '/mnt/Datavault',
  steam_path = '.'),
SimpleVDF = require('simple-vdf'),
data.faker_apps = [],
sharedconfig_vdf = SimpleVDF.parse(fs.readFileSync(steam_path + "/7/remote/sharedconfig.vdf", 'utf8')).UserLocalConfigStore.Software.Valve.Steam.Apps,
Object.keys(sharedconfig_vdf).filter((appid) =>
  (sharedconfig_vdf[+appid].hidden && sharedconfig_vdf[+appid].hidden == 1 && state.not_faking.indexOf(+appid) == -1) &&
    data.faker_apps.push(+appid)),
remove_appid = (appid, index = data.faker_apps.indexOf(appid)) =>
  (index > -1) && (
    state.not_faking.push(appid),
    data.faker_apps.splice(index, 1)),
//------------------------------------------------------------------------------ screenshots-twitter
twitter_screenshots = [],
(fs.existsSync(steam_path + '760/screenshots.vdf')) && (
  screenshots_vdf = SimpleVDF.parse(fs.readFileSync(steam_path + '760/screenshots.vdf', 'utf8')).Screenshots,
  Object.keys(screenshots_vdf).forEach((gameid) =>
    (gameid != 'shortcutnames') &&
      Object.keys(screenshots_vdf[gameid]).forEach((screenshot) => (
        (state.screenshots_twitter.indexOf(screenshots_vdf[gameid][screenshot].hscreenshot) == -1) &&
          twitter_screenshots.push(screenshots_vdf[gameid][screenshot]),
        (state.screenshots_imgur.indexOf(screenshots_vdf[gameid][screenshot].hscreenshot) == -1) &&
          imgur_screenshots.push(screenshots_vdf[gameid][screenshot]),
        (state.screenshots_tumblr.indexOf(screenshots_vdf[gameid][screenshot].hscreenshot) == -1) &&
          tumblr_screenshots.push(screenshots_vdf[gameid][screenshot]))))),
screenshot_twitter = (screenshot = twitter_screenshots.shift()) =>
  twitter_request('POST', 'media/upload', { media: fs.readFileSync(steam_path + '760/remote/' + screenshot.filename) }, (err, body, response) => (
    console_log("SUCCESS |" + '000'.gray.inverse + "| media/upload: ".reset + screenshot.filename.yellow),
    twitter_request('POST', 'statuses/update', { status: generate_hashtags(), media_ids: body.media_id_string }, (err, body, response) =>
      state.screenshots_twitter.push(screenshot.hscreenshot)))),
shuffle_array(twitter_screenshots),
//------------------------------------------------------------------------------ screenshots-tumblr
tumblr_screenshots = [],
tumblr = require("tumblr.js").createClient({
  consumer_key: state.tumblr_consumer_key,
  consumer_secret: state.tumblr_consumer_secret,
  token: state.tumblr_token,
  token_secret: state.tumblr_token_secret }),
screenshot_tumblr = (screenshot = tumblr_screenshots.shift()) =>
  tumblr.createPhotoPost('byteframe', { "tags": shuffle_array(data.hashtags).join(','), "data64": base64(fs.readFileSync(steam_path + '760/remote/' + screenshot.filename)) }, (err) =>
    (!err) ?
      state.screenshots_tumblr.push(screenshot.hscreenshot)
    : console.dir(err)),
shuffle_array(tumblr_screenshots),
//------------------------------------------------------------------------------ screenshots-imgur
imgur_screenshots = [],
imgur = require('imgur'),
imgur.setCredentials(state.imgur_account, state.imgur_password, state.imgur_id),
screenshot_imgur = (screenshot = imgur_screenshots.shift()) =>
  imgur.uploadFile(steam_path + '760/remote/' + screenshot.filename, null, screenshot.filename, emoticon_convert(generate_big_fortune(Math.floor(Math.random()*(500-250)+250))  + "\n\n" + data.hashtags.join(" | ") + "\n\n" + JSON.stringify(screenshot))).then((json) =>
    state.screenshots_imgur.push(screenshot.hscreenshot)
  ).catch((err) =>
    console.error(err.message)),
shuffle_array(imgur_screenshots),