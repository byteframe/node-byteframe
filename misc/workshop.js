//------------------------------------------------------------------------------ GifSquareUploadCouldBeIPBlocked
gif_square_upload = (i = 96, g = 202351) =>
  upload_ugc(A[i], './images/guide_gif_square/' + w.readdirSync('./images/guide_gif_square').filter(e => e != 'uploaded')[0], 9, g, messages[2][0](null, null, 72), emote(14, undefined, ' & ', true).replace(/&/g, () => " " + pool(d.ascii) + " " + pool(d.emojis_sexy) + " " + pool(d.ascii) + " ") + " " + pool(d.emojis_sexy), (g, file) => (
    http(A[i], 'sharedfiles/ajaxupdatecontentdescriptors/', { publishedfileid: g, "add[0]": 5, "add[1]": 1, "remove[0]": 2, "remove[1]": 4, "remove[2]": 3 }),
    w.renameSync(file, file.match(/.*\//)[0] + "uploaded/" + g + "___" + file.match(/\d+/)[0] + ".gif"),
    completed_uploads = mix(w.readdirSync('./images/guide_gif_square/uploaded').map(e => e.slice(0, -4)))));
//------------------------------------------------------------------------------ UploadUGCCompletions
upload_ugc(A[96], '/mnt/d/Work/node-byteframe/images/guide_gif_long/footer/' + mix(w.readdirSync('/mnt/d/Work/node-byteframe/images/guide_gif_long/footer').filter(e => !s.completed_guides_files.includes(e)))[0], 9, 202351, pool(s.wikipedia.selected, 1, null)[0].pages.map(e => e.extract).join('').substr(0,127).replace(/\n/g, ' '), emote(14, undefined, ' & ', true).replace(/&/g, () => " " + pool(d.ascii) + " " + pool(d.emojis_sexy) + " " + pool(d.ascii) + " ") + " " + pool(d.emojis_sexy), finish_gif_guide)
finish_gif_guide = (g, file) => (
  http(A[96], 'sharedfiles/addcontributor/', { id: g, steamid: A[0].steamID }, (b) => (
  http(A[96], 'sharedfiles/ajaxupdatecontentdescriptors/', { publishedfileid: g, "add[0]": 5, "add[1]": 1, "remove[0]": 2, "remove[1]": 4, "remove[2]": 3 }),
  (file.includes('_square')) ?
    s.completed_guides.push(+g)
  : s.completed_guides_footer.push(+g),
  s.completed_guides_files.push(file.replace(/.*\//,'')));
[...Array(3).keys() ].map(e => ((E = pool(d.emojis_food, 1, null)) => E[0][0] + "_" + mix(d.chinese.split('')).join('').substr(0,1) + "--" + E[0][1] + "--" + mix(d.chinese.split('')).join('').substr(0,1) + "_" + E[0][0])()).join(' ')
d.guide_upload = mix(w.readdirSync('./images/guide_gif_square/uploaded').map(e => e.match(/\d+/)[0]).filter(e => !d.guide_collector_upload_culls.includes(+e))),
//------------------------------------------------------------------------------ ItemButtonClickers
jQuery("[id^=favorite_]").each((i,e) => e.click())
jQuery("div.subscribeOption.subscribeOptionAdd").each((i, e) => e.click())
//------------------------------------------------------------------------------ SteamVideoEndpoints
"https://steamcommunity.com/sharedfiles/ajaxgetyoutubedetails/IaPo5io-Gfw"
"https://steamcommunity.com/sharedfiles/youtube/IaPo5io-Gfw/?autoplay=1"
//------------------------------------------------------------------------------ CollectionM3UConcat
w.readdir('m3u/', (x, r) =>
  !x && write('m3u/collections.m3u', r.filter(e => e.endsWith('.m3u') && e != '1290691937724869711.m3u' && e != 'collections.m3u').map(e => w.readFileSync('m3u/' + e, 'utf8')).join('\n'))),
//------------------------------------------------------------------------------ UGCFill
get_ugc(0, 'guides')
get_ugc(0, 'guides', 'favorites')
get_ugc(0, 'collections')
get_ugc(0, 'collections', 'favorites')
get_ugc(0, 'merchandise')
get_ugc(0, 'merchandise', 'favorites')
get_ugc(0, 'myworkshopfiles')
get_ugc(0, 'myworkshopfiles', 'favorites')
get_ugc(0, 'myworkshopfiles', 'subscriptions')
get_ugc(0, 'videos')
get_ugc(0, 'videos', 'favorites')
get_ugc(0, 'images')
get_ugc(0, 'images', 'favorites')
get_ugc(0, 'screenshots')
get_ugc(0, 'screenshots', 'favorites')
//------------------------------------------------------------------------------ GatherCollectionsAndDiscussions
get_discussion_links('https://steamcommunity.com/groups/primarydataloop/discussions/0/1290691937724869711/')
get_discussion_links('https://steamcommunity.com/groups/primarydataloop/discussions/0/4358997447065431365/')
[ 3225362116,3225361313,3225342753,3225328926,3225324896,3225319403,3225312030,3225296828,3225285968,3225227560,
  3225283718,3225281845,3225270907,3225262336,3225255099,3225251492,3225242940,3225241409,3225240847,3225233553,
  3225221417,3225195601,3225192185,3225189211,3225183640,3225174519,3225154581,3225134161,3225069533 ].forEach((e,i) => setTimeout(() => // .forEach((e,i) => setTimeout(get_collection_items, 20000*i, e))
    http(A[0], 'sharedfiles/filedetails/discussions/' + e, null, (b, r, x) =>  get_discussion_links(b.match(/https:\/\/steamcommunity.com\/workshop\/filedetails\/discussion\/[0-9]+\/[0-9]+/)[0])), 5000*i, e))
//------------------------------------------------------------------------------ UploadAttempts
cookie = {
  creation: "2023-12-28T20:33:19.851Z",
  key: 'youtube_authaccount',
  value: 'primarydataloop',
  secure: false
}
A[0].c._jar.setCookie(cookie, "https://steamcommunity.com");
http(a, 'https://steamcommunity.com/id/byteframe/videos/add', {
  "action": "add",
  "videos": 'li3uJyRCiH0',
  "app_assoc": 388390
}, (b, r, x) => global.result = [b, r, x])
A[0].c._setCookie(Request.cookie('youtube_authaccount=primarydataloop%20'));
http(accounts[0], 'my/videos/', { videos: [ 'youtube_id' ], action: 'add', app_assoc: '250820' });
account.http('my/videos/add', { action: "add", sessionid: account.community.sessionID, videos: [ "qQpxmGnzYa0" ], app_assoc: "602630", other_assoc: "" });
accounts[0].http('/my/videos/add', {   "action": "add", "videos[]": "pQwRiDhikL4",  "app_assoc": "", "other_assoc": "byteframe" })
jQuery.post('https://steamcommunity.com/id/byteframe/videos/add', {
  "action": "add",
  "videos[]": "pQwRiDhikL4",
  "app_assoc": 440,
  "other_assoc": ""
});
//------------------------------------------------------------------------------ HideVideoPage
(hide_video_page = (page = 1) =>
  http(accounts[0], "https://steamcommunity.com/id/byteframe/videos/?p=" + page + "&privacy=8", null, (body, response, error) => (
    setTimeout(hide_video_page, 8000, page++),
    body.match(/https:\/\/steamcommunity.com\/sharedfiles\/filedetails\/\?id=[0-9]+/g).forEach((id) =>
      http(accounts[0], 'https://steamcommunity.com/sharedfiles/itemsetvisibility', { visibility: 2, id: id.substr(55)})))))()
//------------------------------------------------------------------------------ FindIdsOnPage
var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
setTimeout(() => (
  jQuery.noConflict(),
  jQuery(".profile_media_item").each((i, e) => console.log(e.href)),
  jQuery(".workshopItemCollection").each((i, e) => console.log(e.href))), 1500)
//------------------------------------------------------------------------------ SubscribeManual
[XXX].forEach((index) =>
  ((appid = state.accounts[index].subscriptions.pop()) => (
    http(a(index), 'sharedfiles/voteup', { appid: 250820, id: appid }),
    http(a(index), 'sharedfiles/subscribe', { appid: 250820, id: appid }),
    http(a(index), 'sharedfiles/favorite', { appid: 250820, id: appid })))())
state.accounts.forEach((account) => account.subscriptions.length > 0 && console.log(account.name + " " + account.subscriptions));
//------------------------------------------------------------------------------ CheckContentFiles
check_content_files = (account, content_files = {}, page = 1, base = 'my/videos', url = base + "/?p=" + page + '&privacy=8&sort=oldestfirst') =>
  http(account, url, null, (body, response, err, files = body.match(/OnVideoClicked\( \d+/g)) =>
    (typeof files !== 'undefined' && !files.length) ?
      console_log('done: ' + content_files.length)
    : (get_content_details = (f = files.length-1) =>
      (f < 0 || content_files[files[f].substr(16)]) ?
        check_content_files(account, content_files, page+1, base)
      : http(account, 'sharedfiles/filedetails/?id=' + files[f].substr(16), null, (body, response, err) => (
          content_files[files[f].substr(16)] = [ body.match(/workshopItemTitle\"\>.+\</)[0].slice(19, -1)
            , Cheerio.load(body)('.nonScreenshotDescription').text().slice(1, -1)
            , body.match(/"appid" value="\d+"/)[0].slice(15, -1)
            , 0 ],
          console.dir(content_files[files[f].substr(16)]),
          get_content_details(f-1))))());
//------------------------------------------------------------------------------ AddContributor
last_index = 0;
(contribute = (n, characters = 0) =>
  (n < data.guides.length) && (
    last_index = n,
    (characters < 42) ? (
      person = pool(people, 1, null)[0],
      http(accounts[0], 'sharedfiles/addcontributor/', { id: data.guides[n], steamid: person[0]}, (body, response, err) =>
        setTimeout(() => contribute(n, characters + person[1].length), 4444)))
    : contribute(n+1)))(last_index);
//------------------------------------------------------------------------------ SetVisibility
data.guide_favorite.concat(data.guide_favorite_showcase).forEach((guide_id) =>
  setTimeout(() => http(accounts[0], 'sharedfiles/itemsetvisibility', { id: guide_id, visibility: 2}), n*1500))
//------------------------------------------------------------------------------ RateAccordingly
verbose = true;
[...Array(69).keys()].forEach((i) =>
  setTimeout(() => login(a(i)), 1234*i)),
guide_votes = {};
new_guides = data.guides.slice(0);
new_guides.forEach((guide) =>
  guide_votes[guide] = []);
frequency = 2000;
shuffle_array(new_guides),
(rate_accordingly = (n = 0, id = new_guides[n]) =>
  (n < new_guides.length-1) &&
    http(accounts[0], 'sharedfiles/filedetails/?id=' + id + '&preview=true', null, (body, response, error,
      ratings = +body.match(/\d* ratings/)[0].match(/\d*/)[0],
      action = (ratings > 69 ? 'down' : 'up'),
      ratings_needed = Math.abs(69 - ratings)) => (
      console.log(id + ": " + ratings + "|" + ratings_needed + "|" + action),
      (rate = (m = 0) =>
        (m == ratings_needed || action == 'down') ?
          rate_accordingly(n+1)
        :[...Array(69).keys()].some((i) =>
          (!a(i).limited && guide_votes[id].indexOf(a(i).index) == -1) ? (
            http(a(i), 'sharedfiles/vote' + action + '?' + id , { "id": id , "appid": 0 }, (body, response, err) => (
              setTimeout((err) =>
                (err) ?
                  rate(m)
                : (guide_votes[id].push(a(i).index),
                  rate(m+1)), frequency, err)), true),
            true)
          : false))())))()
//------------------------------------------------------------------------------ RateSmatter
smatter = [ 1780348952,1780350483,1780351096,1780351340,1780351371,1780351492,
  1780351538,1780351583,1780351613,1780352505,1780351718,1780351777,
  1780351799,1780351845,1780351875,1780352205,1780352231,1780352403 ];
smatter.forEach((id, n) =>
  setTimeout((id) =>
    [...Array(Math.floor(Math.random()*(12-8)+8)).keys()].forEach((i) => (
      http(a(i), 'sharedfiles/voteup', { "appid": 0, "id": id }),
      http(a(i), 'sharedfiles/favorite', { "appid": 0, "id": id }))), 9999*n, id))
//------------------------------------------------------------------------------ GatherVideos1
get_video_details = (i = 0) =>
  (i < temp_videos.length) &&
    (state.videos.hasOwnProperty(temp_videos[i])) ?
      get_video_details(++i)
    : http(accounts[0], 'sharedfiles/filedetails/?id=' + temp_videos[i], null, (body, response, err) => (
      state.videos[temp_videos[i]] = [
        body.match(/workshopItemTitle\"\>.+\</)[0].slice(19, -1)
        , Cheerio.load(body)('.nonScreenshotDescription').text().slice(1, -1)
        , body.match(/"appid" value="\d+"/)[0].slice(15, -1) ],
      setTimeout(get_video_details, 2000, ++i)), true)
//------------------------------------------------------------------------------ VideoStats
(videoStats = function() {
  (function request_video_list(p = 1) {
    jQuery.get('//steamcommunity.com/my/videos/?p=' + p
    ).fail(function() {
      setTimeout(request_video_list, 5000, p);
    }).done(function(response) {
      console.log(`page: ${p}`);
      videos = [];
      jQuery(response).find('a.profile_media_item').each(function(i, element) {
        videos.push(element.href);
      });
      (function request_video_details(f = 0) {
        if (f == videos.length) {
          request_video_list(p+1);
        } else {
          jQuery.get(videos[f]
          ).fail(function() {
            setTimeout(request_video_details, 5000, f);
          }).done(function(response) {
            response = jQuery(response).find('.nonScreenshotDescription'
              )[0].innerText.split('\n')[2].slice(0, -1);
            console.log(response);
            request_video_details(f+1);
          });
        }
      })();
    });
  })();
})();
//------------------------------------------------------------------------------ RemoteStorageApp
(get_page = (p = 0) => {
  account.http('https://store.steampowered.com/account/remotestorageapp?appid=760&index=' + p*50, {}, (body, response, error) => {
    if (err) {
      console.error('ERROR');
      return setTimeout(get_page, 5000, p);
    }
    Cheerio.load(body)('tr').each((index, item) => { console.dir(item.children[4].data); });
      .data.trim().replace(' Download', '').replace(/\s\s+/g, '||'));    });
  });
})();
//------------------------------------------------------------------------------ VideoProcessing
videos0 = [];
(request_video_list = (p = 1) => {
  console_log('requesting video page... #' + p);
  jQuery.get('//steamcommunity.com/my/videos/?p=' + p).fail(function() {
    setTimeout(request_video_list, 5000, p);
  }).done(function(response) {
    response = jQuery(response).find('a.profile_media_item');
    if (!response.length) {
      return console_log('videos0: ' + videos0.length);
    }
    response.each(function(i, element) {
      videos0.push(element.href);
    });
    request_video_list(p+1);
  });
})();
videos1 = videos0.slice();
videos1.splice(391,1);
console_log('videos1: ' + videos1.length);
videos2 = [];
(request_video_details = (f = 0) => {
  if (f == videos1.length) {
    return console.log('videos2: ' + videos2.length);
  }
  jQuery.get(videos1[f]).fail(function() {
    setTimeout(request_video_details, 5000, f);
  }).done(function(response) {
    if (f % 25 == 0) {
      console.log(f);
    }
    videos2.push(response);
    request_video_details(f+1);
  });
})();
videos3 = [];
(process_video_details = (f = 0) => {
  if (f == videos2.length) {
    return console.log('videos3: ' + videos3.length);
  }
  if (f % 50 == 0) {
    console.log(f);
  }
  var response = videos2[f];
  var my_link = jQuery(response).find('.nonScreenshotDescription'
    )[0].innerText.split('\n')[2].slice(0, -1);
  if (my_link.indexOf('steam') > -1 && my_link.indexOf('0') > -1) {
    my_link = my_link.match(/\d+/g)[0];
  }
  var name = jQuery(response).find('div.workshopItemTitle')[0].innerText;
  var appid_link = jQuery(response).find('div.breadcrumbs a')[0].href;
  if (appid_link != 'https://steamcommunity.com/app/0') {
    appid_link = jQuery(response).find('div.screenshotAppName a')[0].href.match(/\d+/g)[0];
  } else {
    appid_link = 'NONSTEAM=' + jQuery(response).find('div.breadcrumbs a')[0].innerText;
  }
  var ytlink = response.substr(response.indexOf('/vi/')+4,15)
  videos3.push({name: name, my_link: my_link, appid_link: appid_link, steam_link: videos1[f], ytlink: ytlink});
  process_video_details(f+1);
})();
videos4 = [];
videos3.forEach((video3) => {
  if (video3.appid_link.indexOf('NONSTEAM') == -1)
    videos4.push(video3.appid_link);
});
var sorted_arr = videos4.slice().sort();
var results = [];
for (var i = 0; i < sorted_arr.length - 1; i++) {
  if (sorted_arr[i + 1] == sorted_arr[i]) {
    results.push(sorted_arr[i]);
  }
}
console.log(results);
