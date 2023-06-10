//------------------------------------------------------------------------------ 2022Routine
[[ 72, 1332010 ],[ 73, 1592190 ],[ 74, 570 ],[ 75, 648800 ],[ 76, 1063660 ],[ 77, 1332010 ],[ 78, 493520 ],[ 79, 1761390 ],[ 80, 1703340 ],[ 81, 1401590 ]].forEach((vote, v) =>  setTimeout(() => http_request(accounts[i], 'https://store.steampowered.com/salevote', { voteid: vote[0], appid: vote[1], developerid: 0 }), 2000*v))
//------------------------------------------------------------------------------ 2020Routine
SteamTradeOfferManager = require('steam-tradeoffer-manager');
bots = [];
start_sale_bot = (i, max_index = i) => (
  bots[i] = { community: new SteamCommunity(), name: state.accounts[i].name, pass: state.accounts[i].pass, mail: state.accounts[i].mail, steamID: state.accounts[i].steamID, index: i },
  bots[i].user = new SteamUser({ "dataDirectory": null, "autoRelogin": false }),
  bots[i].user.setSentry(Crypto.createHash('sha1').update(fs.readFileSync('share/' + bots[i].name + '-ssfn')).digest()),
  bots[i].tradeOfferManager = new SteamTradeOfferManager({ "steam": bots[i].user, "community": bots[i].community, "dataDirectory": null, "domain": "primarydataloop", "language": "en" }),
  bots[i].user.once('loginKey', (key) => state.accounts[bots[i].index].key = key),
  bots[i].user.once('webSession', (sessionID, cookies) => (
    bots[i].tradeOfferManager.setCookies(cookies),
    bots[i].community.setCookies(cookies),
    (i != 96) &&
      run_trade_offer(bots[i], bots[96]))),
  login(bots[i]),
  (i < max_index) ?
    setTimeout(() =>
      start_sale_bot(i+1, max_index), 25000)
    : console.log('start_sale_bot done')),
start_sale_bot(96),
console.log('insert google code without search_gmails');
console.log('insert trade code');
//------------------------------------------------------------------------------ 2020WinterStuff
http_request(bots[i], 'https://store.steampowered.com/points/shop', {}, (body, response, error) =>
  http_request(bots[i], 'https://api.steampowered.com/ISaleItemRewardsService/ClaimItem/v1?access_token=' + body.match(/webapi_token\&quot\;\:\&quot\;.*?\&quot\;/)[0].slice(25, -6), {}, (body, response, error) =>
    http_request(bots[i], 'https://store.steampowered.com/explore/generatenewdiscoveryqueue', { "queuetype": 0 }, (body, reponse, error) => (
      body.queue.forEach((appid) =>
        http_request(bots[i], 'https://store.steampowered.com/app/10', { "appid_to_clear_from_queue": appid }))))))
((file = pool(data.artwork2)) => (
  http_request(bots[i], 'sharedfiles/voteup?' + file, { id: file , appid: 0 }),
  http_request(bots[i], 'sharedfiles/favorite?' + file, { id: file , appid: 0 })))(),
start_sale_bot(1,28);
start_sale_bot(30,37);
start_sale_bot(39,60);
start_sale_bot(62,75);
start_sale_bot(77,95);
start_sale_bot(101,120);
start_sale_bot(133,133);
start_sale_bot(201,232);
bots.forEach((bot) => bot.user.logOff())
bots.forEach((bot, index) => delete bots[index])
prep_randomize_profile(account, { countries: profile.countries, real_name: profile.real_name,
  persona_name: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [ (account, lite) => "_" + account.index ] ] },
  summary_text: { shuffle_slots: [], shuffle_types: [ 0 ], slots: [ [ (account, lite) => '<< first-thought // giver of will >>' ] ] }
}, ()=> http_request(account, 'my/edit', account.edit_1)),
start_sale_bot(121,132);
start_sale_bot(134,196);
limited = "29, 38, 61, 76"
bot.user.gamesPlayed(440),
bot.user.setPersona(0, ''+bot.index),
bot.community.clearPersonaNameHistory(),
http_request(bot, 'https://steamcommunity.com/games/' + avatar[0] + '/selectAvatar', { selectedAvatar: avatar[1] }),
bot.community.editProfile({ name: "_" + bot.index, summary: '<< first-thought // giver of will >>' }, (err) => console.log(err));
http_request(bot, 'my/ajaxsetprivacy/', { eCommentPermission: 2, Privacy: JSON.stringify({ "PrivacyProfile": 2, "PrivacyInventory": 2, "PrivacyInventoryGifts": 1, "PrivacyOwnedGames": 2, "PrivacyPlaytime": 2, "PrivacyFriendsList": 2 }) }),
[[ 61, 892970 ],[ 62, 1499120 ],[ 63, 105600 ],[ 64, 924970 ],[ 65, 607080 ],[ 66, 1282730 ],[ 67, 699130 ],[ 68, 1490890 ],[ 69, 1259420 ],[ 70, 1248130 ]].forEach((vote) =>
[[ 50, 782330 ],[ 51, 546560 ],[ 52, 275850 ],[ 53, 1097150 ],[ 55, 1049410 ],[ 58, 412020 ],[ 56, 1172470 ],[ 54, 362890 ],[ 57, 1289310 ],[ 59, 837470 ]].forEach((vote) =>
[[ 72, 1332010 ],[ 73, 1592190 ],[ 74, 570 ],[ 75, 648800 ],[ 76, 1063660 ],[ 77, 1332010 ],[ 78, 493520 ],[ 79, 1761390 ],[ 80, 1703340 ],[ 81, 1401590 ]].forEach((vote) =>
  http_request(accounts[101], 'https://store.steampowered.com/salevote', { voteid: vote[0], appid: vote[1], developerid: 0 }));
//------------------------------------------------------------------------------ Nominate2020Busted
appids = [ 1471610, 896890, 810500, 1211960, 1383030, 1419110, 1258560, 1271460, 1380620, 1446720 ];
bots = [];
start_nomination_bot = (index = 5, max_index = 32) => (
  bots[index] = {name: state.accounts[index].name, pass: state.accounts[index].pass, mail: state.accounts[index].mail, steamID: state.accounts[index].steamID, index: index},
  bot = bots[index],
  bot.user = new SteamUser({ "dataDirectory": null, "promptSteamGuardCode": false, "autoRelogin": false }),
  bot.user.setSentry(Crypto.createHash('sha1').update(fs.readFileSync('share/' + bot.name + '-ssfn')).digest()),
  bot.community = new SteamCommunity(),
  bot.community.on('sessionExpired', (err) => bot.user.webLogOn()),
  bot.user.on('error', (err) => log(bot, 'FAILURE | error: ' + err.message.yellow)),
  bot.user.on('accountLimitations', (limited, communityBanned, locked, canInviteFriends) =>
    (limited || communityBanned || locked) &&
      log(bot, "FAILURE | accountLimitations: " + limited + "|" + communityBanned + "|" + locked + "|" + canInviteFriends)),
  bot.user.on('webSession', (sessionID, cookies) => (
    bot.community.setCookies(cookies),
    bot.user.requestFreeLicense(appids[appids.length-1]),
    appids.forEach((appid, i) =>
      setTimeout((appid) =>
        http_request(bot, 'https://store.steampowered.com/steamawards/nominategame', { nominatedid: appid, categoryid: 50+i, source: 2 }, (body, response, error) =>
          (i == 9) && (
            bot.user.gamesPlayed(appids[appids.length-1]),
            (index < max_index) &&
              start_nomination_bot(index++),
            setTimeout((bot) => (
              bot.user.gamesPlayed(),
              setTimeout((bot) => 
                http_request(bot, 'https://store.steampowered.com/friends/recommendgame', {
                  appid: appids[appids.length-1], steamworksappid: appids[appids.length-1],
                  comment: generate_fortune('zippy'), rated_up: true, is_public: 1, language: 'english',
                  received_compensation: 0 }, (body, response, error) => (
                    http_request(bot, 'https://steamcommunity.com/dev/revokekey', { Revoke: 'Revoke My Steam Web API Key' }, (body, response, error) =>
                      bot.user.disconnect()),
                    console.log('NOMINATION_DONE: ' + bot.index))), 10000, bot)), 60000*24, bot))), 2500*i, appid)))),
  login(bot))
//------------------------------------------------------------------------------ Discover2020
discover = (account) =>
  http_request(account, 'https://api.steampowered.com/ISummerSale2020Service/ClaimItem/v1?access_token=' + account.access_token, {}, (body, reponse, error) =>
    http_request(account, 'https://store.steampowered.com/explore/generatenewdiscoveryqueue', { "queuetype": 0 }, (body, reponse, error) =>
      body.queue.forEach((appid, index) =>
        http_request(account, 'https://store.steampowered.com/app/10', { "appid_to_clear_from_queue": appid }))));
//------------------------------------------------------------------------------ LunarMouse
door_index = 1,
  (!accounts[a].door_index || accounts[a].door_index < door_index) &&
    http_request(accounts[a], 'https://store.steampowered.com/sale/lunarnewyear2020', {}, (body) =>
      http_request(accounts[a], 'https://store.steampowered.com/saleaction/ajaxopendoor', { door_index: door_index, authwgtoken: body.match(/authwgtoken&quot;:&quot;[a-z0-9]*&quot;,/)[0].slice(24, -7) }, (body) =>
        accounts[a].door_index = door_index)),
//------------------------------------------------------------------------------ Holiday
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
      account.http_request("https://store.steampowered.com/promotion/opencottagedoorajax?door=" + i, {
        door_index: i, open_door: true, t: '2018-' + (date.getMonth()+1) + "-" + date.getDate() + "T" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
      });
    }
  }
};
//------------------------------------------------------------------------------ SaleAwardVote2018
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
  this.http_request('https://store.steampowered.com/salevote', award);
});
//------------------------------------------------------------------------------
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
      http_request(account, 'https://store.steampowered.com/salevote', award));
//------------------------------------------------------------------------------ JoinTeam
accounts.forEach((account, i) =>
    setTimeout((account) =>
      http_request(account, 'https://store.steampowered.com/grandprix/ajaxjointeam/', { teamid: pool([1,2,3,4,5]) }), 2500*i, account));
//------------------------------------------------------------------------------ Discover
discover = (account, cycle = 3) =>
  (!account.limited) &&
    [...Array(cycle).keys()].forEach((item, i) =>
      setTimeout(() =>
        http_request(account, 'https://store.steampowered.com/explore/generatenewdiscoveryqueue', { "queuetype": 0 }, (body, reponse, error) =>
          body.queue.forEach((appid, index) =>
            http_request(account, 'https://store.steampowered.com/app/10', { "appid_to_clear_from_queue": appid }))), i*5000));
//------------------------------------------------------------------------------ NominationsFall2019
gamesPlayed: { shuffle_slots: [ 0 ], shuffle_types: [ 0 ], slots: [ [ (account) =>
  account.user.gamesPlayed([ 440 ]) ] ] } },
(!accounts[a].nominate_2019) && (
  accounts[a].nominate_2019 = true,
  http_request(accounts[a], 'https://store.steampowered.com/steamawards/nominategame', { nominatedid: 1180020, categoryid: 1, source: 1, writein: 0 }),
  http_request(accounts[a], 'https://store.steampowered.com/steamawards/nominategame', { nominatedid: 1063530, categoryid: 2, source: 1, writein: 0 }),
  http_request(accounts[a], 'https://store.steampowered.com/steamawards/nominategame', { nominatedid: 440, categoryid: 3, source: 1, writein: 0 }),
  http_request(accounts[a], 'https://store.steampowered.com/steamawards/nominategame', { nominatedid: 909100, categoryid: 4, source: 1, writein: 0 }),
  http_request(accounts[a], 'https://store.steampowered.com/steamawards/nominategame', { nominatedid: 1094030, categoryid: 5, source: 1, writein: 0 }),
  http_request(accounts[a], 'https://store.steampowered.com/steamawards/nominategame', { nominatedid: 1175140, categoryid: 6, source: 1, writein: 0 }),
  http_request(accounts[a], 'https://store.steampowered.com/steamawards/nominategame', { nominatedid: 1114030, categoryid: 7, source: 1, writein: 0 }),
  http_request(accounts[a], 'https://store.steampowered.com/steamawards/nominategame', { nominatedid: 1115980, categoryid: 8, source: 1, writein: 0 }),
  http_request(accounts[a], 'my/recommended', { appid: 440, action: 'delete' }, (body, response, err) =>
    http_request(accounts[a], 'https://store.steampowered.com/friends/recommendgame', { appid: 440, steamworksappid: 440, comment: generate_fortune('all'), rated_up: true, is_public: true, language: 'english', received_compensation: 1, disable_comments: 0 }, (body, response, err) => console.dir(response)), true)),
//----------------------------------------------------------------------------- WintterQuests2019
winter_quests = (account) =>
  (!account.limited) && (
    http_request(account, 'https://store.steampowered.com/recommender/' + account.steamID + '/results?sessionid=' + account.community.getSessionID() + '&steamid=' + account.steamID + '&include_played=0&algorithm=0&reinference=0&model_version=0'),
    http_request(account, 'https://store.steampowered.com/api/addtowishlist', { appid: 823500 }),
    http_request(account, 'https://store.steampowered.com/api/addtowishlist', { appid: 546560 }),
    http_request(account, 'https://store.steampowered.com/api/addtowishlist', { appid: 615120 }),
    http_request(account, 'https://store.steampowered.com/labs/divingbell'),
    http_request(account, 'https://store.steampowered.com/labs/search/'),
    http_request(account, 'https://store.steampowered.com/labs/trendingreviews'),
    http_request(account, 'https://store.steampowered.com/holidayquests/ajaxclaimitem/', { type: 1 }),
    http_request(account, 'https://store.steampowered.com/holidayquests/ajaxclaimitem/', { type: 2 }),
    http_request(account, 'https://store.steampowered.com/labs/trendingreviews'),
    http_request(account, 'https://store.steampowered.com/steamawards/2019/'),
    http_request(account, 'https://steamcommunity.com/broadcast/getbroadcastmpd' , { steamid: '76561197960266962', broadcastid: 0, viewertoken: 0 }, 'GET'),
    http_request(accounts[a], 'https://store.steampowered.com/holidayquests/ajaxclaimitem/', { type: 2 }),
    http_request(accounts[a], 'https://store.steampowered.com/holidaymarket/ajaxredeemtokens/', { itemid: pool([3,4,5,73,74,75]) }),
    http_request(accounts[a], 'https://store.steampowered.com/holidaymarket/ajaxredeemtokens/', { itemid: pool([6,23,77,72,35,34,33,32,31,30,29,28,27,26,25,24,22,7,21,20,19,18,17,16,15,14,13,12,11,10,9,8,78]) }),
    send_chat(account, '76561197976737508', ":steamsad:")),
//----------------------------------------------------------------------------- Discover2019
discover = (account, cycle = 3) => (
  http_request(account, 'https://store.steampowered.com/holidayquests', {}, (body, response, error) =>
    log(account, 'SUCCESS| winter tokens: ' + body.match(/rewards_tokens_amt\"\>\d*/)[0])),
  (!account.limited) &&
    [...Array(cycle).keys()].forEach((item, i) =>
      setTimeout(() =>
        http_request(account, 'https://store.steampowered.com/explore/generatenewdiscoveryqueue', { "queuetype": 0 }, (body, reponse, error) =>
          body.queue.forEach((appid, index) =>
            http_request(account, 'https://store.steampowered.com/app/10', { "appid_to_clear_from_queue": appid }))), i*5000))),
//----------------------------------------------------------------------------- Discover2020
discover = (account, cycle = 1) => (
  http_request(accounts[2], 'https://store.steampowered.com/points/shop', {}, (body, response, error) =>
    http_request(accounts[2], 'https://api.steampowered.com/ISummerSale2020Service/ClaimItem/v1?access_token=' + body.match(/webapi_token\&quot\;\:\&quot\;.*?\&quot\;/)[0].slice(25, -6), {}))
  (!account.limited) &&
    [...Array(cycle).keys()].forEach((item, i) =>
      setTimeout(() =>
        http_request(account, 'https://store.steampowered.com/explore/generatenewdiscoveryqueue', { "queuetype": 0 }, (body, reponse, error) =>
          body.queue.forEach((appid, index) =>
            http_request(account, 'https://store.steampowered.com/app/10', { "appid_to_clear_from_queue": appid }))), i*5000))),