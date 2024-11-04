//------------------------------------------------------------------------------ FindChannelID
(find_channel_id = (E) =>
  http(A[0], E[0], null, (b) => (
    console.log(E[0] + ": " + b.match(/https:\/\/www\.youtube\.com\/channel\/[A-Za-z0-9-_]*/)[0]),
    E.length > 1 &&
      setTimeout(find_channel_id, 3000, E.slice(1)))))()
//------------------------------------------------------------------------------ SteamEndpoints
"https://steamcommunity.com/sharedfiles/ajaxgetyoutubedetails/IaPo5io-Gfw"
"https://steamcommunity.com/sharedfiles/youtube/IaPo5io-Gfw/?autoplay=1"
//------------------------------------------------------------------------------ ScrapeAllVideosAndCompare
var jq = document.createElement('script'); 
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);
jQuery.noConflict();
setInterval(() => (
  jQuery('a#video-title').each((I, E) =>  console.dir("--" + E.text.trim())),
  setTimeout(() => jQuery('#navigate-after')[0].click(), 1000)), 7500)
ls -1 /mnt/d/Video/Youtube | while read FILE; do
  FILE="${FILE%.*}"
  if ! grep -q "${FILE}" /mnt/c/Users/byteframe/Desktop/output.log; then
    echo ${FILE}
  fi
done
cat /mnt/c/Users/byteframe/Desktop/output.log | while read FILE; do
  if [ $(find /mnt/d/Video/Youtube -name "${FILE}.*" | wc -l) != '1' ]; then
    echo ${FILE}
  fi
done
//------------------------------------------------------------------------------ YoutubeJQuery
if (typeof jq === 'undefined') {
  var jq = document.createElement('script');
  jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
  document.getElementsByTagName('head')[0].appendChild(jq);
  setTimeout(function() {
    loaded = 1;
    jQuery.noConflict();
    proceed();
  }, 2000);
} else {
  proceed();
}
function proceed() {
  var videos = jQuery('.vm-thumbnail-container a.yt-uix-sessionlink');
  (function youtube_video(v = videos.length-1) {
    if (v == -1) {
      console.log('youtube_page(p-1);');
    }
    jQuery.get(videos[v].href).done(function(response) {
      var title = jQuery(response).find('h1.title').innerText;
      var description = jQuery(response).find('#description')[0].innerText.split('\n');
      console.log(title + " | " + description[0] + " | " + description[2]);
      youtube_video(v--);
    });
  })();
}
} else if (loaded == 0){
    console.log('still loading');
} else if (loaded == 1){
  (function youtube_page(p = 19) {
    if (p == -1) {
      return true;
    }
    jQuery.get('https://www.youtube.com/my_videos?o=U&pi=' + p,
    ).done(function(response) {
      var videos = jQuery(response).find('.vm-thumbnail-container a.yt-uix-sessionlink');
      (function youtube_video(v = videos.length-1) {
        if (v == -1) {
          youtube_page(p-1);
        }
        console.log(videos[v].href);
        return 1;
        jQuery.get(videos[v].href).done(function(response) {
          var title = jQuery(response).find('h1.title')[0].innerText;
          var description = jQuery(response).find('#description')[0].innerText.split('\n');
          console.log(title);
          console.log(description[0]);
          console.log(description[2]);
        });
      })();
    });
  })();
}
//------------------------------------------------------------------------------ youtube_player.html
fs.writeFileSync('misc/youtube_player.html',`<!DOCTYPE html>
  <html>
    <body>
      <div id="player"></div>
      <script>
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        var player;
        onYouTubeIframeAPIReady = () =>
          player = new YT.Player('player', {
            width: '1280',
            height: '720',
            playerVars: { 'autoplay': 1, 'controls': 1, 'rel': 0, 'start': 1, 'modestbranding': 1, 'fs': 0 },
            events: { 'onReady': (event) => select_video(),
              'onStateChange': (event) => (event.data == YT.PlayerState.ENDED) && select_video(),
              'onError': (event) => setTimeout(select_video, 5000) }
          });
        select_video = () =>
          player.loadVideoById(videos.splice(Math.floor(Math.random()*videos.length), 1)[0])
        var videos = [ ` + Object.keys(state.videos).reduce((accumulator, value) => accumulator + "'" + state.videos[value].link_url.substr(32) + "',", '') + ` ];
      </script>
    </body>
  </html>`)
//------------------------------------------------------------------------------ ListAllVideosWithAPIHalfWorking
videos = [],
(get_youtube_videos = (pageToken = null, publishedBefore = null, options = {
    "auth": google_auth,
    "channelId": 'UCDDJ2AawF4Z67glwPW6pNDg',
    "part": [ 'snippet' ],
    "maxResults": 50,
    "order": 'date',
    "type": 'video' } ) => (
  pageToken && ( options.pageToken = pageToken ),
  publishedBefore && ( console.log(publishedBefore), options.publishedBefore = publishedBefore ),
  setTimeout(() =>
    googleAPIsYoutube.search.list(options, (x, r) =>
      (x) ? console.error(x)
      :(videos = videos.concat(r.data.items.map(e => ({ "id": e.id.videoId, "title": e.snippet.title, "description": e.snippet.description }))),
        console.dir(videos.slice(-50).map(e => e.title).join('\n')),
        r.data.items.length ?
          get_youtube_videos('', r.data.items.at(-1).snippet.publishTime) // duplicates the last one
        : console.log('done'))), 3000)))() 
//------------------------------------------------------------------------------ GeneratePlaylistBatchDownloader
w.mkdirSync('playlists'),
googleAPIsYoutube = google.youtube({ version: 'v3', google_auth }),
googleAPIsYoutube.playlists.list({auth: google_auth, channelId: 'UCDDJ2AawF4Z67glwPW6pNDg', part: 'snippet', maxResults: 50}, (x, r) =>
  (x) ?
    console.error(x)
  : ( playlists = response.data.items )),
batch = '',
response.data.items.forEach((item) =>
  batch += '"C:\\\\Program Files\\mpv-x86_64-20170913\\youtube-dl.exe" -J --flat-playlist https://www.youtube.com/playlist?list=' + item.id + ' > ' + item.snippet.title.replace(/ /g, '_') + ".json\n")
w.writeFileSync('playlists/get_playlists.bat', batch);
//------------------------------------------------------------------------------ OldFindPlaylistedButMussingInState
fs.readdirSync('playlists').forEach((playlist) => (
  console.log(playlist),
  JSON.parse(fs.readFileSync('playlists/' + playlist)).entries.forEach((entry) => (
    bfound = false,
    Object.keys(state.videos).some((video1) =>
      (state.videos[video1].link_url == 'https://www.youtube.com/watch?v=' + entry.url) &&(
        bfound = true)),
    (!bfound) &&
      console.log(entry)))))
//------------------------------------------------------------------------------ FindDuplicatesInPlaylists
playlisted = [],
w.readdirSync('playlists').forEach((playlist, i) => (
  JSON.parse(w.readFileSync('playlists/' + playlist)).entries.forEach((entry) => (
    playlisted.push(entry.title))))),
duplicates(playlisted);
//------------------------------------------------------------------------------ GenerateLinksForUnplaylisted
console.log(uploaded.length),
uploaded.filter(e => !playlisted.includes(e)),
html = '',
uploaded.forEach((video) =>
  (playlisted.indexOf(video) == -1) &&
    (html += ('<a href="https://www.youtube.com/watch?v=' + video + '">' + video +"</a>\n" ))),
fs.writeFileSync('missing.html', html)
//------------------------------------------------------------------------------ YoutubeBannerResearch
function getChannel(auth) {
  var service = google.youtube('v3');
  service.channels.list({
    auth: auth,
    part: 'snippet,contentDetails,statistics',
    forUsername: 'byteframe1'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var channels = response.data.items;
    if (channels.length == 0) {
      console.log('No channel found.');
    } else {
      console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
                  'it has %s views.',
                  channels[0].id,
                  channels[0].snippet.title,
                  channels[0].statistics.viewCount);
    }
  });
}
function setChannel() {
  googleAPIsYoutube.channels.update({
    auth: gmail,
    part: 'brandingSettings',
    forUsername: 'byteframe1'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    global.response = response;
  });
}
youtube_profile = () =>
  im_combine(['+append', '-adaptive-resize', 'x100' ], select_screenshots(21), './im_out-1.jpg', (err, stdout) =>
    im_combine(['+append', '-adaptive-resize', 'x100' ], select_screenshots(21), './im_out-2.jpg', (err, stdout) =>
      im_combine(['+append', '-adaptive-resize', 'x100' ], select_screenshots(21), './im_out-3.jpg', (err, stdout) =>
        im_combine(['+append', '-adaptive-resize', 'x100' ], select_screenshots(21), './im_out-4.jpg', (err, stdout) =>
          im_combine(['+append', '-adaptive-resize', 'x100' ], select_screenshots(21), './im_out-5.jpg', (err, stdout) =>
            im_combine(['+append', '-adaptive-resize', 'x100' ], select_screenshots(21), './im_out-6.jpg', (err, stdout) =>
              im_combine(['+append', '-adaptive-resize', 'x100' ], select_screenshots(21), './im_out-7.jpg', (err, stdout) =>
                im_combine(['+append', '-adaptive-resize', 'x100' ], select_screenshots(21), './im_out-8.jpg', (err, stdout) =>
                  im_combine(['+append', '-adaptive-resize', 'x100' ], select_screenshots(21), './im_out-9.jpg', (err, stdout) =>
                    im_combine(['+append', '-adaptive-resize', 'x100' ], select_screenshots(21), './im_out-10.jpg', (err, stdout) =>
                      im_combine(['+append', '-adaptive-resize', 'x100' ], select_screenshots(21), './im_out-11.jpg', (err, stdout) =>
                        im_combine(['+append', '-adaptive-resize', 'x100' ], select_screenshots(21), './im_out-12.jpg', (err, stdout) =>
                          im_combine([ '-append' ], [ './im_out-1.jpg', './im_out-2.jpg' ], 'im_out-a.jpg', (err, stdout) =>
                            im_combine([ '-append' ], [ './im_out-a.jpg', './im_out-3.jpg' ], 'im_out-b.jpg', (err, stdout) =>
                              im_combine([ '-append' ], [ './im_out-b.jpg', './im_out-4.jpg' ], 'im_out-c.jpg', (err, stdout) =>
                                im_combine([ '-append' ], [ './im_out-c.jpg', './im_out-5.jpg' ], 'im_out-d.jpg', (err, stdout) =>
                                  im_combine([ '-append' ], [ './im_out-d.jpg', './im_out-6.jpg' ], 'im_out-e.jpg', (err, stdout) =>
                                    im_combine([ '-append' ], [ './im_out-e.jpg', './im_out-7.jpg' ], 'im_out-f.jpg', (err, stdout) =>
                                      im_combine([ '-append' ], [ './im_out-f.jpg', './im_out-8.jpg' ], 'im_out-g.jpg', (err, stdout) =>
                                        im_combine([ '-append' ], [ './im_out-g.jpg', './im_out-9.jpg' ], 'im_out-h.jpg', (err, stdout) =>
                                          im_combine([ '-append' ], [ './im_out-h.jpg', './im_out-10.jpg' ], 'im_out-i.jpg', (err, stdout) =>
                                            im_combine([ '-append' ], [ './im_out-i.jpg', './im_out-11.jpg' ], 'im_out-j.jpg', (err, stdout) =>
                                              im_combine([ '-append' ], [ './im_out-j.jpg', './im_out-12.jpg' ], 'im_out-youtube.jpg', (err, stdout) => console.log('done'))))))))))))))))))))))))