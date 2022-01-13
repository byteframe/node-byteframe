//------------------------------------------------------------------------------ vdf dirs
(process.platform === 'win32') ? (
  dir_path = 'D:/',
  steam_path = 'C:/Program Files (x86)/Steam/userdata/752001/')
: (dir_path = '/mnt/Datavault',
  steam_path = '.'),
//------------------------------------------------------------------------------ vdf shared_config
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
//------------------------------------------------------------------------------
