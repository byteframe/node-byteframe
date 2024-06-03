//------------------------------------------------------------------------------ GenerateToken2023
const readline = require('readline').createInterface({ input: process.stdin });
fs = require('fs');
s = JSON.parse(fs.readFileSync('./node-byteframe/state.json', 'utf8'));
base64 = (data) => new Buffer(data).toString('base64');
google = require('googleapis').google;
(generate_auth_token = () => {
  var token;
  oAuth2Client = new google.auth.OAuth2(s.google_secret.client_id, s.google_secret.client_secret, 'http://localhost');
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [ 'https://www.googleapis.com/auth/gmail.readonly' ],
  });
  console.log('Authorize this app by visiting this url, then enter code:', authUrl);
  readline.question('', (code) => {
    readline.close();
    oAuth2Client.getToken(code, (err, data) => {
      token = data;
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      console.dir(token);
    });
  });
})();
//------------------------------------------------------------------------------ 2023Expressions
sale = (i = 1, o = A.length-1) =>
  (i <= o) && (
    (!A[i].limited) ? (
      logon(A[i]),
      setTimeout((i) => A[i].u.gamesPlayed([440]), 10000, i),
      setTimeout(discover, 10000, A[i], true),
      setTimeout(sale, 20000, ++i, o))
      setTimeout((i) => A[i].u.logOff(), 30000, i),
    : sale(++i, o))
logon(A[96])
offer = (i = 1, o = A.length-1) =>
  (i <= o) && (
    (!A[i].limited && i != 96) ? (
      logon(A[i]),
      setTimeout(trade, 5000, A[i], A[96]),
      setTimeout(offer, 45000, ++i, o),
      setTimeout((i) => A[i].u.logOff(), 75000, i))
    : offer(++i, o))
//------------------------------------------------------------------------------ 2022Routine
http(bots[i], 'https://store.steampowered.com/points/shop', {}, (body, response, error) =>
  http(bots[i], 'https://api.steampowered.com/ISaleItemRewardsService/ClaimItem/v1?access_token=' + body.match(/webapi_token\&quot\;\:\&quot\;.*?\&quot\;/)[0].slice(25, -6), {}, (body, response, error) =>
    http(bots[i], 'https://store.steampowered.com/explore/generatenewdiscoveryqueue', { "queuetype": 0 }, (body, reponse, error) => (
      body.queue.forEach((appid) =>
        http(bots[i], 'https://store.steampowered.com/app/10', { "appid_to_clear_from_queue": appid }))))))
[[ 61, 892970 ],[ 62, 1499120 ],[ 63, 105600 ],[ 64, 924970 ],[ 65, 607080 ],[ 66, 1282730 ],[ 67, 699130 ],[ 68, 1490890 ],[ 69, 1259420 ],[ 70, 1248130 ]]
[[ 50, 782330 ],[ 51, 546560 ],[ 52, 275850 ],[ 53, 1097150 ],[ 55, 1049410 ],[ 58, 412020 ],[ 56, 1172470 ],[ 54, 362890 ],[ 57, 1289310 ],[ 59, 837470 ]]
[[ 72, 1332010 ],[ 73, 1592190 ],[ 74, 570 ],[ 75, 648800 ],[ 76, 1063660 ],[ 77, 1332010 ],[ 78, 493520 ],[ 79, 1761390 ],[ 80, 1703340 ],[ 81, 1401590 ]].forEach(
  (vote, v) =>  setTimeout(() => http(accounts[i], 'https://store.steampowered.com/salevote', { voteid: vote[0], appid: vote[1], developerid: 0 }), 2000*v))
//------------------------------------------------------------------------------ Nominate2020
appids = [ 1471610, 896890, 810500, 1211960, 1383030, 1419110, 1258560, 1271460, 1380620, 1446720 ];
appids.forEach((appid, i) =>
  setTimeout((appid) =>
    http(bot, 'https://store.steampowered.com/steamawards/nominategame', { nominatedid: appid, categoryid: 50+i, source: 2 }, (body, response, error) =>
      (i == 9) && (
        bot.user.gamesPlayed(appids[appids.length-1]),
        (index < max_index) &&
          start_nomination_bot(index++),
        setTimeout((bot) => (
          bot.user.gamesPlayed(),
          setTimeout((bot) => 
            http(bot, 'https://store.steampowered.com/friends/recommendgame', {
              appid: appids[appids.length-1], steamworksappid: appids[appids.length-1],
              comment: generate_fortune('zippy'), rated_up: true, is_public: 1, language: 'english',
              received_compensation: 0 }, (body, response, error) => (
                http(bot, 'https://steamcommunity.com/dev/revokekey', { Revoke: 'Revoke My Steam Web API Key' }, (body, response, error) =>
                  bot.user.disconnect()),
                console.log('NOMINATION_DONE: ' + bot.index))), 10000, bot)), 60000*24, bot))), 2500*i, appid))))
//------------------------------------------------------------------------------ Discover
discover = (account) =>
  http(account, 'https://api.steampowered.com/ISummerSale2020Service/ClaimItem/v1?access_token=' + account.access_token, {}, (body, reponse, error) =>
    http(account, 'https://store.steampowered.com/explore/generatenewdiscoveryqueue', { "queuetype": 0 }, (body, reponse, error) =>
      body.queue.forEach((appid, index) =>
        http(account, 'https://store.steampowered.com/app/10', { "appid_to_clear_from_queue": appid }))));
//------------------------------------------------------------------------------ 2020LunarNewYearDoor
door_index = 1,
  (!accounts[a].door_index || accounts[a].door_index < door_index) &&
    http(accounts[a], 'https://store.steampowered.com/sale/lunarnewyear2020', {}, (body) =>
      http(accounts[a], 'https://store.steampowered.com/saleaction/ajaxopendoor', { door_index: door_index, authwgtoken: body.match(/authwgtoken&quot;:&quot;[a-z0-9]*&quot;,/)[0].slice(24, -7) }, (body) =>
        accounts[a].door_index = door_index)),
//------------------------------------------------------------------------------ SaleAwardVote
var awards = [
  { voteid: 29, appid: 0, developerid: [ '32989758','33075774','33028765','1541443','32978945','1012195','33273264','6859167','33042543','112393' ][Math.floor(Math.random()*10)] },
  { voteid: 26, developerid: 0, appid: [ '578080','582010','379430','863550','812140' ][Math.floor(Math.random()*5)] },
  { voteid: 27, developerid: 0, appid: [ '611670','438100','620980','611660','617830' ][Math.floor(Math.random()*5)] },
  { voteid: 28, developerid: 0, appid: [ '271590','275850','238960','570','413150' ][Math.floor(Math.random()*5)] },
  { voteid: 30, developerid: 0, appid: [ '292030','264710','750920','552520','374320' ][Math.floor(Math.random()*5)] },
  { voteid: 31, developerid: 0, appid: [ '218620','381210','359550','730','728880' ][Math.floor(Math.random()*5)] },
  { voteid: 32, developerid: 0, appid: [ '612880','812140','394360','289070','377160' ][Math.floor(Math.random()*5)] },
  { voteid: 33, developerid: 0, appid: [ '227300','252950','524220','427520','244850' ][Math.floor(Math.random()*5)] } ];
awards.forEach((award) => {
  this.http('https://store.steampowered.com/salevote', award);
});
sale_awards_vote = (account, awards = [
  { voteid: 34, developerid: 0, appid: [ '814380','883710','1172380','1085660','601150' ][Math.floor(Math.random()*5)] },
  { voteid: 35, developerid: 0, appid: [ '629730','578620','991260','732690' ][Math.floor(Math.random()*5)] },
  { voteid: 36, developerid: 0, appid: [ '230410','359550','730','271590','570' ][Math.floor(Math.random()*5)] },
  { voteid: 37, developerid: 0, appid: [ '632360','1046930','813780','755790','221100' ][Math.floor(Math.random()*5)] },
  { voteid: 38, developerid: 0, appid: [ '736260','646570','557340','457140','703080' ][Math.floor(Math.random()*5)] },
  { voteid: 39, developerid: 0, appid: [ '752590','632470','939960','1097840','606880' ][Math.floor(Math.random()*5)] },
  { voteid: 40, developerid: 0, appid: [ '629760','678960','594650','617290','976310' ][Math.floor(Math.random()*5)] },
  { voteid: 41, developerid: 0, appid: [ '683320','779340','361420','460950','848450' ][Math.floor(Math.random()*5)] } ]) =>
  (!account.limited) &&
    awards.forEach((award) =>
      http(account, 'https://store.steampowered.com/salevote', award));
//------------------------------------------------------------------------------ JoinTeam
accounts.forEach((account, i) =>
  setTimeout((account) =>
    http(account, 'https://store.steampowered.com/grandprix/ajaxjointeam/', { teamid: pool([1,2,3,4,5]) }), 2500*i, account));
//------------------------------------------------------------------------------ Discover
discover = (account, cycle = 3) =>
  (!account.limited) &&
    [...Array(cycle).keys()].forEach((item, i) =>
      setTimeout(() =>
        http(account, 'https://store.steampowered.com/explore/generatenewdiscoveryqueue', { "queuetype": 0 }, (body, reponse, error) =>
          body.queue.forEach((appid, index) =>
            http(account, 'https://store.steampowered.com/app/10', { "appid_to_clear_from_queue": appid }))), i*5000));
//----------------------------------------------------------------------------- 2020ClaimSticker
http(accounts[2], 'https://store.steampowered.com/points/shop', {}, (body, response, error) =>
  http(accounts[2], 'https://api.steampowered.com/ISummerSale2020Service/ClaimItem/v1?access_token=' + body.match(/webapi_token\&quot\;\:\&quot\;.*?\&quot\;/)[0].slice(25, -6), {}))
//------------------------------------------------------------------------------ NominationsFall2019
gamesPlayed: { shuffle_slots: [ 0 ], shuffle_types: [ 0 ], slots: [ [ (account) =>
  account.user.gamesPlayed([ 440 ]) ] ] } },
(!accounts[a].nominate_2019) && (
  accounts[a].nominate_2019 = true,
  http(accounts[a], 'https://store.steampowered.com/steamawards/nominategame', { nominatedid: 1180020, categoryid: 1, source: 1, writein: 0 }),
  http(accounts[a], 'https://store.steampowered.com/steamawards/nominategame', { nominatedid: 1063530, categoryid: 2, source: 1, writein: 0 }),
  http(accounts[a], 'https://store.steampowered.com/steamawards/nominategame', { nominatedid: 440, categoryid: 3, source: 1, writein: 0 }),
  http(accounts[a], 'https://store.steampowered.com/steamawards/nominategame', { nominatedid: 909100, categoryid: 4, source: 1, writein: 0 }),
  http(accounts[a], 'https://store.steampowered.com/steamawards/nominategame', { nominatedid: 1094030, categoryid: 5, source: 1, writein: 0 }),
  http(accounts[a], 'https://store.steampowered.com/steamawards/nominategame', { nominatedid: 1175140, categoryid: 6, source: 1, writein: 0 }),
  http(accounts[a], 'https://store.steampowered.com/steamawards/nominategame', { nominatedid: 1114030, categoryid: 7, source: 1, writein: 0 }),
  http(accounts[a], 'https://store.steampowered.com/steamawards/nominategame', { nominatedid: 1115980, categoryid: 8, source: 1, writein: 0 }),
  http(accounts[a], 'my/recommended', { appid: 440, action: 'delete' }, (body, response, err) =>
    http(accounts[a], 'https://store.steampowered.com/friends/recommendgame', { appid: 440, steamworksappid: 440, comment: generate_fortune('all'), rated_up: true, is_public: true, language: 'english', received_compensation: 1, disable_comments: 0 }, (body, response, err) => console.dir(response)), true)),
//----------------------------------------------------------------------------- WinterQuests2019
http(account, 'https://store.steampowered.com/holidayquests', {}, (body, response, error) =>
  log(account, 'SUCCESS| winter tokens: ' + body.match(/rewards_tokens_amt\"\>\d*/)[0])),
winter_quests = (account) =>
  (!account.limited) && (
    http(account, 'https://store.steampowered.com/recommender/' + account.steamID + '/results?sessionid=' + account.community.getSessionID() + '&steamid=' + account.steamID + '&include_played=0&algorithm=0&reinference=0&model_version=0'),
    http(account, 'https://store.steampowered.com/api/addtowishlist', { appid: 823500 }),
    http(account, 'https://store.steampowered.com/api/addtowishlist', { appid: 546560 }),
    http(account, 'https://store.steampowered.com/api/addtowishlist', { appid: 615120 }),
    http(account, 'https://store.steampowered.com/labs/divingbell'),
    http(account, 'https://store.steampowered.com/labs/search/'),
    http(account, 'https://store.steampowered.com/labs/trendingreviews'),
    http(account, 'https://store.steampowered.com/holidayquests/ajaxclaimitem/', { type: 1 }),
    http(account, 'https://store.steampowered.com/holidayquests/ajaxclaimitem/', { type: 2 }),
    http(account, 'https://store.steampowered.com/labs/trendingreviews'),
    http(account, 'https://store.steampowered.com/steamawards/2019/'),
    http(account, 'https://steamcommunity.com/broadcast/getbroadcastmpd' , { steamid: '76561197960266962', broadcastid: 0, viewertoken: 0 }, 'GET'),
    http(accounts[a], 'https://store.steampowered.com/holidayquests/ajaxclaimitem/', { type: 2 }),
    http(accounts[a], 'https://store.steampowered.com/holidaymarket/ajaxredeemtokens/', { itemid: pool([3,4,5,73,74,75]) }),
    http(accounts[a], 'https://store.steampowered.com/holidaymarket/ajaxredeemtokens/', { itemid: pool([6,23,77,72,35,34,33,32,31,30,29,28,27,26,25,24,22,7,21,20,19,18,17,16,15,14,13,12,11,10,9,8,78]) }),
    send_chat(account, '76561197976737508', ":steamsad:")),
//------------------------------------------------------------------------------ Holiday2018
run_holiday = (account) => {
  var date = new Date();
  date.setHours(date.getHours()-13);
  var door_total = (date.getMonth() == 11 ? date.getDate()-19 : date.getDate()+12);
  date.setHours(date.getHours()+13);
  for (var i = 0; i < door_total; i++) {
    if (typeof config.byteframe.holiday[account.user.steamID] == 'undefined') {
      config.byteframe.holiday[account.user.steamID] = { doors: [] };
    }
    if (config.byteframe.holiday[account.user.steamID].doors.indexOf(i) == -1) {
      config.byteframe.holiday[account.user.steamID].doors.push(i);
      account.http("https://store.steampowered.com/promotion/opencottagedoorajax?door=" + i, {
        door_index: i, open_door: true, t: '2018-' + (date.getMonth()+1) + "-" + date.getDate() + "T" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
      });
    }
  }
};