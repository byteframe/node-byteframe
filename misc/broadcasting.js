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
//------------------------------------------------------------------------------ obswebsocket
("obsstudio" == "666") && (
  OBSWebSocket = require('obs-websocket-js'),
  obsWebSocket = new OBSWebSocket(),
  obsWebSocket.on('error', err =>
    console.error('SOCKET ERROR:', err)))
("obsstudio" == "666") &&
  obsWebSocket.connect({ address: 'localhost:4444', password: state.obs_password }).catch((err) => console.error(err)).finally(() =>
    obsWebSocket.sendCallback('StopStreaming', (error) =>
      obsWebSocket.sendCallback('SetSceneItemProperties', { item: 'Browser', visible: false }, (err) =>
        setTimeout(() =>
          obsWebSocket.sendCallback('SetSceneItemProperties', { item: 'Browser', visible: true }, (err) =>
            obsWebSocket.sendCallback('StartStreaming', (error) =>
              obsWebSocket.disconnect())), 10000))))
//------------------------------------------------------------------------------ twitch
("twitchchat" == '666') &&
  setTimeout(() =>
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
          twitchChat.say('byteframe', '@' + user + ' ' + get_reply(user, message.substr(11))))))(), 10000),
//------------------------------------------------------------------------------