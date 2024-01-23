//------------------------------------------------------------------------------ AvatarFinder
http(a, 'https://steamcommunity.com/games/' + profile.game_favorite.selection[0] + '/Avatar/List', null, (b, r, x) =>
  (b.includes('<h2>Avatars</h2>')) &&
    console.log('https://steamcommunity.com/games/' + profile.game_favorite.selection[0] + '/Avatar/List')),
http(a, 'https://steamcommunity.com/games/' + profile.game_favorite2.selection[0] + '/Avatar/List', null, (b, r, x) =>
  (b.includes('<h2>Avatars</h2>')) &&
    console.log('https://steamcommunity.com/games/' + profile.game_favorite2.selection[0] + '/Avatar/List')),
//------------------------------------------------------------------------------ FatAvatarChange
A[0].c.httpRequestPost({
  "uri": "https://steamcommunity.com/actions/FileUploader",
  "json": true,
  "formData": {
    "type": "group_avatar_image", "doSub": 1, "json": 1,
    "MAX_FILE_SIZE": avatar_file.length,
    "gId": "103582791432273268",
    "sessionid": A[0].c.getSessionID(),
    "avatar": { "value": avatar_file, "options": { "filename": 'avatar.jpg', "contentType": 'image/jpeg' } } }
}, (x, r, b) =>
  (x || r.statusCode != 200 || !b || !b.success) &&
    log(A[0], 'FAILURE | actions/uploadAvatar: ' + (""+d.avatar_files.i).yellow))
//------------------------------------------------------------------------------ OriginalSlotAssembly
shuffle(d.items_showcase_array).forEach((e) =>
  e.forEach((e, i) =>
    profile.item_showcase.slots[i+6].push(e))),      
shuffle(d.items_trade_array).forEach((e) =>
  e.forEach((e, i) =>
    profile.items_trade.slots[i].push(e))),
shuffle(d.achievement_array).forEach((e) =>
  e.forEach((e, i) =>
    profile.achievement.slots[i].push(e))),
//------------------------------------------------------------------------------ ReviewMaker
insert_emojis = (text) => (
  d.emojis.i = 0,
  text.replace(/YYY/g, () => pool(pool(d.emojis, 1, null)[0])))
generate_emoji_fortune = (size, file = 'all', text = fortune(file, 1, size, size).split(' ')) => (
  [...Array(3).keys()].forEach((i) =>
    text[(i+1)*(Math.floor((text.length+1)/4)-1)] += " YYY"),
  insert_emojis("YYY " + text.join(' ') + " YYY"))
post_review_sheet = (a, g, h1, h2, h3, _m = shuffle(d.links_steam),
  m = (pool(d.emotes[6], 1) + ' ' +
    _m[0] + ' ' + pool(d.emotes[8], 1) + ' ' +
    _m[1] + ' ' + pool(d.emotes[2], 1) + ' ' +
    _m[2] + ' ' + pool(d.emotes[4], 1) + ' ' +
    _m[3] + ' ' + pool(d.emotes[3], 1) + ' ' +
    _m[4] + ' ' + pool(d.emotes[11], 1) + ' ' +
    _m[5] + ' ' + pool(d.emotes[9], 1) + ' ' +
    _m[6] + ' ' + pool(d.emotes[5], 1) + ' ' +
    _m[7]).replace(/:/g, 'ː') + " " + h1 + " [h1]" + fortune('all', 1, 55, 60).replace(/[\[\]]g/, '') + "[/h1][quote=" + generate_emoji_fortune(50, 'all') + "][table][tr][td]" + h3 + "[/td][td]" + pool(d.ascii_face) + "[/td][td][b]" + fortune('knowledge').replace(/\n/, "[/b]\n[i]") + "[/i][/td][/tr][/table][/quote] " + h2) =>
  (links[0].includes(h1.match(/https:\/\/(www.)?youtu.+/)[0].slice(8).replace('www\.', '').replace('youtu.be/', '').replace('youtube.com/watch?v=', '').replace(/\?.*/, '').replace(/\&.*/, ''))) ? console.log(h1)
  : (links[1].map((e) => e.match(/\d+/)[0]).includes(h2.match(/\d+/)[0]) || A[0].wishlist.concat(d.game_collector.flat()).concat(d.game_collector_dlc.flat()).includes(h2.match(/\d+/)[0])) ? console.log(h2)
  : (links[2].includes(h3)) ? console.log(h3)
  : http(a, 'https://store.steampowered.com/friends/recommendgame', {
      appid: g, steamworksappid: g, comment: m, rated_up: true, is_public: true, language: 'english', received_compensation: 0, disable_comments: 0}, (b, r, e) => (
        log(a, 'SESSION | recommendgame: https://steamcommunity.com/my/recommended/' + g),
        get_reviews(a, 0, true, [ g ])))
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
  //------------------------------------------------------------------------------ DeprecatedGroupStuff
((group_url = profile.group_favorite.selection[0].substr(19)) =>
  http(accounts[0], 'groups/' + group_url + '/edit', '&' + data.group_forms[group_url].replace(
    /&headline=.*&summary=/, '&headline=' + generate_emoji_fortune(215) + '&summary=')))(),  
"group_forms": {
  "fourteenpdl": "type=profileSave&abbreviation=fourteenpdl&headline=%F0%9F%8C%B3+Actor+Real+Name+Boris+Karloff+%F0%9F%8C%82+William+Henry+Pratt+Cary+%F0%9F%93%80+Grant+Archibald+Leach+Edward+%F0%9F%93%98+G.+Robinson+Emmanual+Goldenburg+%F0%9F%98%BA+Gene+Wilder+Gerald+Silberman+%F0%9F%8D%A7+John+Wayne+Marion+Morrison+%F0%9F%8F%80+Kirk+Douglas+Issur+Danielovitch+Richard++%F0%9F%8E%8D&summary=&customURL=fourteenpdl&language=norwegian&country=NA&state=27&city=&associate_game=&favorite_games=450390&weblink_1_title=Equal+Reality+-+DMX+Krew+%7BHTC+VIVE+VR%7D&weblink_1_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DkJlPZlYuRPU&weblink_2_title=Magic+Lantern+-+808+State+%7BHTC+VIVE+VR%7D&weblink_2_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dfm9T_a7tqeE&weblink_3_title=Project+Syria+-+%7BHTC+VIVE+VR%7D&weblink_3_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DCgSHiLcgtAo",
  "seispdl": "type=profileSave&abbreviation=seispdl&headline=%F0%9F%92%83+Slaves+are+generally+expected+to+sing+%F0%9F%91%BE+as+well+as+to+work+%F0%9F%8C%B3+...+I+did+not%2C+when+%F0%9F%90%9D+a+slave%2C+understand+the+deep+%F0%9F%93%98+meanings+of+those+rude%2C+and+%F0%9F%95%BA+apparently+incoherent+songs.+I+was+%F0%9F%8C%8B+myself+within+the+circle%2C+so+that+I+neither+%F0%9F%8D%87&summary=&customURL=seispdl&language=finnish&country=BL&state=&city=&associate_game=&favorite_games=555160&weblink_1_title=MSI+Electric+City%2C+Core+Assault+-+%7BHTC+VIVE+VR%7D&weblink_1_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D5-kmNpokbBQ&weblink_2_title=Amazing+Files%2C+Horror+Hospital+-+Biosphere+%7BHTC+VIVE+VR%7D&weblink_2_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DJQTDBM8J90c&weblink_3_title=Lucky+Night%2C+Texas+Hold'em+-+Luke+Vibert+%7BHTC+VIVE+VR%7D&weblink_3_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DfFvLKzck1nw",
  "pdlproper3": "type=profileSave&abbreviation=pdlproper3&headline=%F0%9F%90%A0+No-one+would+have+believed%2C+in+the+%F0%9F%9A%98+final+years+of+the+Century+%F0%9F%93%80+of+the+Fruitbat%2C+that+Discworld+%F0%9F%92%9A+affairs+were+being+watched+keenly+%F0%9F%8F%93+and+impatiently+by+intelligences+greater+%E2%9A%A1+than+Man's%2C+or+at+least+%F0%9F%8E%8D+much+nastier%3B+that++%F0%9F%90%B3&summary=&customURL=pdlproper3&language=danish&country=DK&state=04&city=&associate_game=&favorite_games=607440&weblink_1_title=Covert+Syndrome+-+Binalog+Frequency+%7BHTC+VIVE+VR%7D&weblink_1_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D8ll4hFleRzw&weblink_2_title=Deserving+Life+-+Frontline+Assembly+%7BHTC+VIVE+VR%7D&weblink_2_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dk9cgeq8Yx_Q&weblink_3_title=Deserving+Life+-+Frontline+Assembly+%7BHTC+VIVE+VR%7D&weblink_3_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D1rqyPqw_LCk",
  "pdl15": "type=profileSave&abbreviation=pdl15&headline=%F0%9F%93%92+A+sharper+perspective+on+this+%F0%9F%A5%97+matter+is+particularly+important+%F0%9F%9A%97+to+feminist+thought+today%2C+%F0%9F%91%BE+because+a+major+tendency+%F0%9F%91%94+in+feminism+has+constructed+%E2%9B%B3+the+problem+of+domination+%F0%9F%91%83+as+a+drama+of+female+vulnerability+victimiz+%F0%9F%8E%88&summary=&customURL=pdl15&language=polish&country=PK&state=04&city=&associate_game=&favorite_games=606180&weblink_1_title=Discover+Egypt%2C+King+Tut's+Tomb+-+Egyptian+Lover+%7BHTC+VIVE+VR%7D&weblink_1_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DJN-comON924&weblink_2_title=ViveSpray+-+Fah+%7BHTC+VIVE+VR%7D&weblink_2_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DnmcXAYyTMx0&weblink_3_title=Pavlov+-+Democracy+Now+%7BHTC+VIVE+VR%7D&weblink_3_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DWS_OlV6N-4I",
  "pdlocho": "type=profileSave&abbreviation=pdlocho&headline=%F0%9F%A5%92+In+%22King+Henry+VI%2C+Part+II%2C%22+%F0%9F%8D%A7+Shakespeare+has+Dick+Butcher+suggest+%F0%9F%8E%AB+to+his+fellow+anti-establishment+rabble-rousers%2C+%F0%9F%9A%95+%22The+first+thing+we+do%2C+%F0%9F%8C%B3+let's+kill+all+the+lawyers.%22+%F0%9F%8C%82+That+action+may+be+extreme+%F0%9F%94%8B+but+a+similar+sen+%F0%9F%90%B3&summary=&customURL=pdlocho&language=&country=&state=&city=&associate_game=&favorite_games=436320&weblink_1_title=InVR+-+Computron+%7BHTC+VIVE+VR%7D&weblink_1_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DJe9zsJWPikY&weblink_2_title=Butts+%7BHTC+VIVE+VR%7D&weblink_2_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DddtkOkEbYxw&weblink_3_title=Suspended+Workshops+-+Biosphere+%7BHTC+VIVE+VR%7D&weblink_3_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DBP59gcwbK2o",
  "quatropdl": "type=profileSave&abbreviation=quatropdl&headline=%F0%9F%8C%B8+One+fine+day%2C+the+bus+driver+went+%F0%9F%93%A3+to+the+bus+garage%2C+started+his+%F0%9F%93%92+bus%2C+and+drove+off+along+the+%F0%9F%9A%99+route.+No+problems+for+the+first+%F0%9F%8D%A7+few+stops+--+a+few+people+%F0%9F%8F%93+got+on%2C+a+few+got+off%2C+%E2%9B%B3+and+things+went+generally+well.+At+t+%F0%9F%91%83&summary=&customURL=quatropdl&language=dutch&country=NO&state=09&city=&associate_game=&favorite_games=348250&weblink_1_title=Super+Hot+-+Phil+Klein+%7BHTC+VIVE+VR%7D&weblink_1_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DT9pPqKdxQxM&weblink_2_title=TSA+Frisky+-+Automatic+Tasty+%7BHTC+VIVE+VR%7D&weblink_2_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dky6-_sBcvig&weblink_3_title=Disco+Destruction+-+Global+Goon+%7BHTC+VIVE+VR%7D&weblink_3_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DRAkQ-DE9rAc",
  "sevenpdlteen": "type=profileSave&abbreviation=sevenpdlteen&headline=%F0%9F%93%95+MAFIA%2C+n%3A+%5BAcronym+for+Mechanized+%F0%9F%8C%B3+Applications+in+Forced+Insurance+%F0%9F%8D%87+Accounting.%5D+An+extensive+network+%F0%9F%A5%97+with+many+on-line+and+%F0%9F%93%80+offshore+subsystems+running+under+%F0%9F%92%84+OS%2C+DOS%2C+and+IOS.+%E2%9B%B3+MAFIA+documentation+is+rather+scanty%2C+%F0%9F%8F%80&summary=&customURL=sevenpdlteen&language=brazilian&country=PS&state=&city=&associate_game=&favorite_games=490490&weblink_1_title=Imos+Loft+-+Electronome+%7BHTC+VIVE+VR%7D&weblink_1_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dt0MmMBT1E6k&weblink_2_title=Sommad+-+CN+%7BHTC+VIVE+VR%7D&weblink_2_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DUIf5wUC_tWI&weblink_3_title=Pararea+-+DeFeKT+%7BHTC+VIVE+VR%7D&weblink_3_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DU2CZR_KAd5M",
  "pdl8teen": "type=profileSave&abbreviation=pdl8teen&headline=%F0%9F%93%92+River%3A%3A+%22We+got+outflanked+by+an+%F0%9F%90%8A+Independent+squad%2C+and+we're+never+%F0%9F%91%94+gonna+make+it+back+to+%F0%9F%8E%88+our+platoon.+We+need+to+%F0%9F%8C%B3+resort+to+cannibalism.%22+Simon%3A+%22That+%F0%9F%8F%93+was+fast.+Don't+we+have+%F0%9F%8D%A7+rations+or+anything%3F%22+River%3A+%22They+go+%F0%9F%98%BA&summary=&customURL=pdl8teen&language=russian&country=RE&state=&city=&associate_game=&favorite_games=568800&weblink_1_title=Summer+Times+Afternoon+-+Lee+Norris+%7BHTC+VIVE+VR%7D&weblink_1_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DEJnYFkeDpig&weblink_2_title=BattleDome+-+Headnoaks+%7BHTC+VIVE+VR%7D&weblink_2_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DM_GCWxhMUxU&weblink_3_title=Dead+Hungry+-+Radioactive+Man+%7BHTC+VIVE+VR%7D&weblink_3_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dfl5x5t8Q224",
  "twopdl": "type=profileSave&abbreviation=twopdl&headline=%F0%9F%8C%BD+Darth+Vader%3A+There+is+no+escape.+%F0%9F%92%97+Don't+make+me+destroy+you.+%F0%9F%95%BA+pauses+Luke%2C+you+do+not+%F0%9F%8C%8F+yet+realize+your+importance.+You+%F0%9F%93%95+have+only+begun+to+discover+%F0%9F%91%83+your+power.+Join+me%2C+and+%F0%9F%90%9F+I+will+complete+your+training.+With+our+co+%F0%9F%90%8A&summary=&customURL=twopdl&language=czech&country=CA&state=PE&city=&associate_game=&favorite_games=469610&weblink_1_title=MeiMei+Dance+-+Hashim+%7BHTC+VIVE+VR%7D&weblink_1_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D6l4qPhrABWM&weblink_2_title=Basketball+Babe+-+Kerrier+District+%7BHTC+VIVE+VR%7D&weblink_2_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dl4aDpK4BL4Y&weblink_3_title=Munch+-+UHU+%7BHTC+VIVE+VR%7D&weblink_3_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DG2H5XuY1j9s",
  "diezytrespdl": "type=profileSave&abbreviation=diezytrespdl&headline=%F0%9F%8C%8B+A+disciple+of+another+sect+once+%F0%9F%91%BD+came+to+Drescher+as+he+%F0%9F%93%98+was+eating+his+morning+meal.+%F0%9F%8D%87+%22I+would+like+to+give+%F0%9F%90%9B+you+this+personality+test%22%2C+said+%F0%9F%8C%82+the+outsider%2C+%22because+I+want+%F0%9F%92%9B+you+to+be+happy.%22+Drescher+took+the+paper+t+%F0%9F%92%9A&summary=&customURL=diezytrespdl&language=koreana&country=KZ&state=07&city=&associate_game=&favorite_games=511690&weblink_1_title=Duck+Force+-+Planetwalker+%7BHTC+VIVE+VR%7D&weblink_1_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D9vN4JdSvE1Y&weblink_2_title=Battleship+Yamato+-+Slavoj+Zizek+%7BHTC+VIVE+VR%7D&weblink_2_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DGIO4_Kd2quY&weblink_3_title=The+Purge+Day+-+Galaxion+%7BHTC+VIVE+VR%7D&weblink_3_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dbnc9EUFYI_s",
  "funfpdl": "type=profileSave&abbreviation=funfpdl&headline=%F0%9F%92%99+Sister+Mary+headed+through+the+night-time+%F0%9F%92%84+hospital+with+the+Adversary%2C+Destroyer+%F0%9F%A5%9E+of+Kings%2C+Angel+of+the+%F0%9F%A5%92+Bottomless+Pit%2C+Great+Beast+that+%E2%9A%A1+is+called+Dragon%2C+Prince+of+%F0%9F%93%95+This+World%2C+Father+of+Lies%2C+%F0%9F%8D%86+Spawn+of+Satan+and++%F0%9F%95%BA&summary=&customURL=funfpdl&language=english&country=EC&state=09&city=&associate_game=&favorite_games=525640&weblink_1_title=Unreal+Villa+-+Paco+Osuna+%7BHTC+VIVE+VR%7D&weblink_1_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DhKQn5BTXWQ8&weblink_2_title=Altspace+-+Elysis+%7BHTC+VIVE+VR%7D&weblink_2_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DWSHNQi3lTzE&weblink_3_title=EmbodyME+-+MC+Hawking+%7BHTC+VIVE+VR%7D&weblink_3_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DFLDI3jgXwbg",
  "10pdl": "type=profileSave&abbreviation=10pdl&headline=%F0%9F%8D%A7+Too+Late+A+large+number+of+%F0%9F%8C%8B+turkies+%5Bsic%5D+went+to+San+%F0%9F%8C%B3+Francisco+yesterday+by+the+two+%F0%9F%93%95+o'clock+boats.+If+their+object+%E2%9A%A1+in+going+down+was+to+%F0%9F%8E%AB+participate+in+the+Thanksgiving+festivities+%F0%9F%92%84+of+that+city%2C+they+would+arrive++%F0%9F%95%BA&summary=&customURL=10pdl&language=hungarian&country=MO&state=02&city=&associate_game=&favorite_games=&weblink_1_title=Hop+Step+Sing!+Kimamani+Summer+Vacation+-+Afrika+Bambaataa+%7BHTC+VIVE+VR%7D&weblink_1_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dt-eypU4jqqI&weblink_2_title=Trespass+-+James+Stinson+%7BHTC+VIVE+VR%7D&weblink_2_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DBPv0T6r_lpw&weblink_3_title=Mister+Mart+-+Group+X+%7BHTC+VIVE+VR%7D&weblink_3_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DOO8_gkcxRYg",
  "elevenpdl": "type=profileSave&abbreviation=elevenpdl&headline=%F0%9F%92%99+Charles+Briscoe-Smith+%3Ccpbs%40debian.org%3E%3A+After+%E2%9A%A1+all%2C+the+gzip+%F0%9F%92%83+package+is+called+%E2%9B%B3+%60gzip'%2C+not+%60libz-bin'...+%F0%9F%93%A3+James+Troup+%3Ctroup%40debian.org%3E%3A+%F0%9F%9A%99+Uh%2C+probably+because+%F0%9F%91%94+the+gzip+binary+doesn't+come+from+the+non-existent+lib+%F0%9F%93%95&summary=&customURL=elevenpdl&language=italian&country=IS&state=13&city=&associate_game=&favorite_games=471710&weblink_1_title=Kiya+-+Luis+Ruiz+%7BHTC+VIVE+VR%7D&weblink_1_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DFB6W_U5o9L4&weblink_2_title=Triber+-+Dez+Williams+%7BHTC+VIVE+VR%7D&weblink_2_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DkZLYfitOK30&weblink_3_title=Vee+Rethak%2C+Deep+Under+the+Mountain+-+Cybrid+%7BHTC+VIVE+VR%7D&weblink_3_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DCb80ydB89T4",
  "dozenpdl": "type=profileSave&abbreviation=dozenpdl&headline=%F0%9F%8C%B3+(Mal%2C+fighting+with+his+torturer+on+%F0%9F%8E%88+the+edge+of+the+factory+%E2%9A%A1+shaft+precipice%2C+is+interrupted+by+%F0%9F%8C%8B+the+arrival+of+his+crew.+%F0%9F%91%BD+Jayne+lifts+his+gun%2C+and+%F0%9F%92%8E+takes+aim%3B+however%2C+Zoe+grabs+%F0%9F%98%BA+his+arm.)+Zoe%3A+%22This+is+something+the+%F0%9F%9A%95&summary=&customURL=dozenpdl&language=japanese&country=JM&state=04&city=&associate_game=&favorite_games=440630&weblink_1_title=A-Tech+Cybernetic+-+Chris+Hayes+%7BHTC+VIVE+VR%7D&weblink_1_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dwe_tQ-KM1_E&weblink_2_title=The+Price+of+Freedom+%7BHTC+VIVE+VR%7D&weblink_2_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DhyGNtsrUZqc&weblink_3_title=Paranormal+Activity+-+%7BHTC+VIVE+VR%7D&weblink_3_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DPoTrn-UwtpU",
  "pdluno": "type=profileSave&abbreviation=pdluno&headline=%F0%9F%8F%80+Q%3A+How+many+elephants+can+you+fit+in+%F0%9F%8C%B3+a+VW+Bug%3F+A%3A+Four.+Two+in+%F0%9F%8F%93+the+front%2C+two+in+the+back.+Q%3A+%F0%9F%9A%98+How+can+you+tell+if+an+elephant+%F0%9F%9A%99+is+in+your+refrigerator%3F+A%3A+There's+a+%F0%9F%91%91+footprint+in+the+mayo.+Q%3A+How+can+%F0%9F%8E%AB+you+tell+if+tw+%F0%9F%91%B9&summary=&customURL=pdluno&language=bulgarian&country=BB&state=09&city=&associate_game=&favorite_games=438100&weblink_1_title=Engage+-+%7BHTC+VIVE+VR%7D&weblink_1_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DIDIzspUokCw&weblink_2_title=Accounting+%7BHTC+VIVE+VR%7D&weblink_2_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DNcFyPUwFPNs&weblink_3_title=Disco+Time+80s+-+%7BHTC+VIVE+VR%7D&weblink_3_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dq8HZ8q8nxbs",
  "pneindteenl": "type=profileSave&abbreviation=pneindteenl&headline=%F0%9F%8C%B8+7%3A30%2C+Channel+5%3A+The+Bionic+%F0%9F%93%97+Dog+(Action%2FAdventure)+The+Bionic+%F0%9F%91%B3+Dog+drinks+too+much+%F0%9F%8E%BD+and+kicks+over+the+%F0%9F%91%94+National+Redwood+Forest.+7%3A30%2C+%F0%9F%90%9B+Channel+8%3A+The+Bionic+%F0%9F%8D%96+Dog+(Action%2FAdventure)+The+Bionic+Dog+gets+a+hormonal+shor+%F0%9F%91%83&summary=&customURL=pneindteenl&language=schinese&country=KH&state=14&city=&associate_game=&favorite_games=672020&weblink_1_title=The+Ruins%2C+Escape+the+Room+-+David+Frum+%7BHTC+VIVE+VR%7D&weblink_1_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Du4tGT1bZXcQ&weblink_2_title=Hold+My+Beer+-+Exzakt+%7BHTC+VIVE+VR%7D&weblink_2_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D2s9HJ0bKqWg&weblink_3_title=Cirque+du+Soleil+-+%7BHTC+VIVE+VR%7D&weblink_3_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D-uh7CZO8Kfk",
  "neinpdl": "type=profileSave&abbreviation=neinpdl&headline=%F0%9F%92%84+Hell+Money%3A+Mulder%3A+How+many+dishes+%F0%9F%91%94+do+you+have+to+break+%F0%9F%94%8B+before+your+boss+tosses+you+%F0%9F%93%92+in+an+oven%3F+Scully%3A+So+%F0%9F%8E%8D+now+we're+chasing+ghosts%3F+Mulder%3A+%F0%9F%91%B9+Who+ya+gonna+call%3F+Scully%3A+%F0%9F%92%99+Are+you+saying+that+the+ancestral+spirits+p+%F0%9F%A5%9E&summary=&customURL=neinpdl&language=greek&country=GA&state=05&city=&associate_game=&favorite_games=490840&weblink_1_title=Rich+Life+Simulator+-+Donald+Trump+%7BHTC+VIVE+VR%7D&weblink_1_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3Dyasz5mRdCVk&weblink_2_title=The+Uncertain+Experience+-+Ditone+%7BHTC+VIVE+VR%7D&weblink_2_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DWGf_MztMJOM&weblink_3_title=Hotdogs%2C+Horseshoes%2C+and+Hand+Grenades+-+Clarence+G+%7BHTC+VIVE+VR%7D&weblink_3_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DASnVnr9A3iM",
  "7pdl": "type=profileSave&abbreviation=7pdl&headline=%F0%9F%8E%8D+You+know+you're+in+trouble+when...+(1)+%F0%9F%90%A0+Your+car+horn+goes+off+accidentally+%F0%9F%92%9A+and+remains+stuck+as+you+follow+%F0%9F%8E%BD+a+group+of+Hell's+Angels+on+%F0%9F%8C%8B+the+freeway.+(2)+You+want+to+%F0%9F%90%9D+put+on+the+clothes+you+wore+%F0%9F%9A%98+home+from+the+party++%F0%9F%9A%97&summary=&customURL=7pdl&language=french&country=FK&state=&city=&associate_game=&favorite_games=418650&weblink_1_title=Duck+Season+-+%7BHTC+VIVE+VR%7D&weblink_1_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DzTxBO5jbyww&weblink_2_title=El+Ministerio+del+Tiempo%2C+El+Tiempo+en+tus+Manos+-+%7BHTC+VIVE+VR%7D&weblink_2_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D_5MbfQULReM&weblink_3_title=Dear+Angelica+-+%7BHTC+VIVE+VR%7D&weblink_3_url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D0LGH6LlTDdc",
  "psixdteenl": "type=profileSave&abbreviation=psixdteenl&headline=%F0%9F%8E%84+%5BThe+Kennedy+Assassinations%5D+%22Sometime+later+-+%F0%9F%90%A0+FOR+NO+PARTICULAR+REASON+-+%F0%9F%8E%AB+somebody+shot+that+nice+young+%F0%9F%98%BA+president+when+he+was+riding+%F0%9F%9A%97+in+his+car+and+a+%F0%9F%93%98+few+years+after+that%2C+somebody+%F0%9F%93%80+shot+his+little+brother+too+-+o+%F0%9F%8E%8D&summary=&customURL=psixdteenl&language=portuguese&country=PW&state=&city=&associate_game=&favorite_games=665200&weblink_1_title=&weblink_1_url=&weblink_2_title=&weblink_2_url=&weblink_3_title=&weblink_3_url=" },
//------------------------------------------------------------------------------ EditWorkShopFavorite
data.workshop_collector.flat().forEach((id, i) =>
  console.log('edit_text(' + id + ', "' + ( fortune('platitudes', 1, 75, 85).replace(/[\s\t]+--[\s\t]+/g, ' ').replace(/"/g, '\\"') + '",        "' + generate_emoji_fortune(300, 'startrek').replace(/"/g, '\\"', ' ')/*.replace(/\s+--\s+/g + "\")")*/ + '")')))
//------------------------------------------------------------------------------ 2023RemovedSegments
(a.inventory.backgrounds.length > 0) &&
  showcase('background', 0, (i, e) =>
    a.edit_1 += "&profile_background=" + e.id),
showcase('group_primary', 0, (i, e) => a.edit_1 += "&primary_group_steamid=" + e),
(a.u.playingState.blocked && profile.persona_name.hasOwnProperty('selection')) ?
  a.edit_1 += "&personaName=byteframe"
: showcase('persona_name', 0, (i, e) =>
  a.edit_1 += "&personaName=" + e),
[ 1715910,2026550,2026560,1715900 ]
"links_social_dead": [
  "https://linkedin.com/company/byteframetech",
  "https://nimo.tv/live/1816208114",
  "https://vaughn.live/byteframe",
  "https://picarto.tv/byteframe",
  "https://youtube.com/c/byteframe",
  "https://dlive.tv/byteframe",
  "https://live.fc2.com/49197455",
  "https://www.mobcrush.com/byteframe",
  "https://trovo.live/byteframe",
  "https://dailymotion.com/byteframe",
  "https://instagib.tv/byteframe",
  "https://smashcast.tv/byteframe",
  "https://mixer.com/95892684",
  "https://streamcraft.com/user/2051568140/room",
  "https://live.loots.com/c/byteframe" ],
() => fortune('vortigaunt', 1, 55), 
(f, comment_message_bot = (o = 900, format = pool([ "","i","b","u","spoiler" ]), t = ("[" + format + "]" + fortune('all') + "[/" + format + ']\n').replace(/\[\]/g, '').replace(/\[\/\]/g, '') + pool(d.emojis_smileys)) =>
  (t.length >= o) ? t : comment_message_bot()) =>
comment_message_bot(),
(f) => emote(12, [15]) + "\n" + emote(12, [15]) + "\n" + "[i]" + split_words(fortune('cookie')).join('\n') + "[/i]\n" + emote(12, [15]) + "\n" + emote(12, [15]),
() => fortune('vortigaunt', 1, 55),
() => fortune('overwatch', 1, 100),
() => fortune('soldiers', 1, 45),
(f) => "[i]" + reply('', 'tell me a story') + "[/i] " + pool(d.emojis_objects, Math.floor(Math.random()*7)+1, ' '),
get_friends(a, 'profiles/' + s.last_profiles[Math.floor(Math.random()*s.last_profiles.length)] + "/friends", (F) =>
  commenter(a, check_replies, false, strangers = F.filter((f) => s.last_profiles.indexOf(f) == -1).map((f) => [ '', f ])))
game_favorite_2908791: { moves: [], types: [ -1 ], slots: [ d.game_favorite_dlc ] },
  (account.i < 97 || (account.i >= 201 && account.i <= 223) || (account.i >= 101 && account.i <= 104)) && (
...t = t.replace(/[\s\t]{2,}/g, ' ').trimEnd()), // was originally t.replace(/ +/g, ' ').trim(),
(args, dimension = pool([[2,32],[3,26],[4,19],[5,16],[6,13],[7,11],[8,9],[9,8],[10,7],[12,6]]), emoticon_index = pool([0, 1, 12]), text = '') => (
  [...Array(dimension[0]).keys()].map((i) =>
    text += pool(data.emotes[emoticon_index], dimension[1]) + "\n"),
  text),
((delimiter = "/", t = '') => (
  shuffle(data.links_steam_greetings).forEach((e) =>
    t += e + '[/url] ' + delimiter + ' '),
  t.trim().slice(0, -2)))() + "\n" +
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
generate_emoticon_fortune_old = (text, length, emoticon_index, file = 'all', fortune = fortune(file).replace(/\n/g, ' ').split(/\s+/)) =>
  (fortune.length < length) ?
    generate_emoticon_fortune(text, length, emoticon_index, file)
  :([...Array(length).keys()].forEach((i) =>
      text += pool(data.emotes[emoticon_index], i) + " " + pool(data.ascii) + " " + fortune[i] + "\n"),
    text.trim() + ' ' + fortune.slice(length).join(' ')),
generate_emoticons_old = (length, text = '', delimiter = '', indexes = [ 2,3,4,5,6,7,8,9,10,11 ]) => (
  pool(indexes, length, null).forEach((index) =>
    text += pool(data.emotes[index]) + delimiter),
  text),
"sinvr": [
  "1000190","1000150","1000230","2238890","998970","1000240","1000210","1111950","1000160","1000120","1000140","998960","1000250","1000180","1000220","998620","1000170","1000200","998961" ],
"languages": [
  "bulgarian","czech","danish","dutch","english","finnish",
  "french","german","greek","hungarian","italian","japanese","koreana",
  "norwegian","polish","portuguese","brazilian","romanian","russian",
  "schinese","spanish","swedish","tchinese","thai","turkish","ukrainian" ],
"symbols": [
  "☻", "☼", "☎", "♫", "♡", "❀" ],
"emoticons_green_icons": [
  ":alliedstar:",":em03:",":melon:",":GreenSphere:",":weed:",":clover:",":neutralgear:",":TrollGerka:",":alkat:",":wazapple:",":greenlightorb:",":GreenCube:",":PlanetYelaxot:",":zzacid:",":ZE3_Escape:",":g_heart:" ],
"emoticons_red_icons": [
  ":gore:",":ZE3_GameOver:",":bloodsplat:",":zzenergy:",":LightRedCube:",":redlightorb:",":redrose:",":Angrygerka:",":bloodgear:",":em05:" ],
"to_like_long": [
  "get a kick out of", "be entertained", "are pleased by", "take pleasure in" ],
"ascii_alphabet": [
  "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z" ],
"ascii_equalizer": [
  "▇","▅","█","▅","▇","▂","▃","▁","▁","▅","▃","▅","▅","▄","▅","▇" ],
"guide_rainbows": [
  "ːfivecolorsː","ːthreecolorsː","ːtrippybatː",
  "ːheartlessː","ːTheDonutsː","ːcrystalsː","ːeggː",
  "ːPrainbowː","ːrainbowfartː","ːlollypopː","ːpcarsː",
  "ːrighteyeː","ːgarfunkelː","ːrainbowː","ːThe_Ballː",
  "ːcandyrainbowː","ːtisdestroyerː","ːtiselementsː","ːtisbombː",
  "ːuno_Wildː","ːclownhairː","ːglasswindowː","ːshockedIroː" ],
account.backgrounds = [],
http(account, 'https://steamcommunity.com/' + profile_url(account) + '/ajaxgetplayerbackgrounds', {}, (body, response, err) => 
  (body.data.profilebackgroundsowned) &&
    body.data.profilebackgroundsowned.forEach((background) =>
      (data.background_blacklist.indexOf(""+background.communityitemid) == -1 || account.index != 0) &&
        accounts[account.index].backgrounds.push({
          id: background.communityitemid, // SAME I THINK
          appid: background.appid, // market fee app
          game: body.data.backgroundappnames[background.appid], // its in a tag I guess
          name: background.name, // SAME
          image: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/" + background.image_large })))//)),
'[b][u]Wallpaper (' + data.avatars[data.avatars.index-1] + ')[/u][/b]\n'
+ pool(data.emotes[1]) + ' [url=steamdb.info/app/' + profile.background.selection[0].appid + ']'
+ profile.background.selection[0].game + '[/url] ' + pool(data.emotes[1]) + ' [url=steamcommunity.com/id/byteframe/inventory/#753_6_'
+ profile.background.selection[0].id + ']' + profile.background.selection[0].name.replace(' (Profile Background)', '') + '[/url]\n\n'
//------------------------------------------------------------------------------ wain sha (obsolete)
http_request(account, (!account.user.playingState.blocked) ? 'https://steamcommunity.com/actions/selectPreviousAvatar' : 'https://steamcommunity.com/games/' + avatar[0] + '/selectAvatar', (!account.user.playingState.blocked) ? { json: 1, sha: pool(data.wain_sha) } : { selectedAvatar: avatar[1] }, (body, response, error) =>
//------------------------------------------------------------------------------ profile_debug
http_debug = (endpoint) =>
  (endpoint == 'my/edit') && (
    (profile.hasOwnProperty('item_showcase_2720320')) && profile.item_showcase_2720320.selection.forEach((item) => (item != '__') && console.log("  BOOSTERS: https://steamcommunity.com/id/byteframe/inventory/#" + item)),
    (profile.hasOwnProperty('items_trade_2410599')) && profile.items_trade_2410599.selection.forEach((item) => console.log("  DOTAS: https://steamcommunity.com/id/byteframe/inventory/#" + item)),
    (profile.hasOwnProperty('items_trade')) && profile.items_trade.selection.forEach((item) => console.log("  TRADE1: https://steamcommunity.com/id/byteframe/inventory/#" + item)),
    (profile.hasOwnProperty('artwork')) && profile.artwork.selection.forEach((item) => console.log("  ARTWORK1: https://steamcommunity.com/sharedfiles/filedetails/?id=" + item)),
    (profile.hasOwnProperty('artwork2')) && profile.artwork2.selection.forEach((item) => console.log("  ARTWORK2: https://steamcommunity.com/sharedfiles/filedetails/?id=" + item)),
    (profile.hasOwnProperty('review')) && profile.review.selection.forEach((item) => console.log("  REVIEW: https://steamcommunity.com/id/byteframe/recommended/" + item)),
    (profile.hasOwnProperty('guide_favorite')) && profile.guide_favorite.selection.forEach((item) => console.log("   GUIDE: https://steamcommunity.com/sharedfiles/filedetails/?id=" + item)),
    (profile.hasOwnProperty('guide_collector')) && profile.guide_collector.selection.forEach((item) => console.log("   GUIDE2: https://steamcommunity.com/sharedfiles/filedetails/?id=" + item)),
    (profile.hasOwnProperty('ugccollector')) && profile.ugccollector.selection.forEach((item) => console.log("WORKSHOP1: https://steamcommunity.com/sharedfiles/filedetails/?id=" + item)),
    (profile.hasOwnProperty('ugcfavorite')) && profile.ugcfavorite.selection.forEach((item) => console.log("WORKSHOP2: https://steamcommunity.com/sharedfiles/filedetails/?id=" + item)),
    (profile.hasOwnProperty('item_showcase')) && profile.item_showcase.selection.forEach((item) => console.log("https://steamcommunity.com/id/byteframe/inventory/#" + item))),
//------------------------------------------------------------------------------ Emoticon Strips
data.emotes.forEach((index, i) => (console.log(generate_emoticons(31, '', '', [i]) + "\n" + generate_emoticons(31, '', '', [i]))))
//------------------------------------------------------------------------------ SteamFriends.info
diff_array = (array1, array2) =>
  array1.filter((i) => array2.indexOf(i) < 0),
friends_check = (account,
  friends = Object.keys(account.user.myFriends).filter((friend) =>
    account.user.myFriends[friend] == 3 || account.user.myFriends[friend] == 6),
  lines = (action, players, callback, date = new Date()) =>
    (!players.length) ?
      callback()
    : account.user.getPersonas(players, (err, personas) => (
      (typeof personas == 'undefined') ?
        personas = err : null,
      Object.keys(personas).forEach((persona) =>
        state.accounts[account.index].friends_diff.push([
          date.getFullYear() + "-" + pad(date.getMonth()+1) + "/" + pad(date.getDate()) +
            "-" + pad(date.getHours()) + ":" + pad(date.getMinutes()),
          action, friends.length, persona, personas[persona].player_name.replace(
            /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g, '') ] )),
      state.accounts[account.index].friends_diff = state.accounts[account.index].friends_diff.slice(-100),
      callback()))) =>
  (friends.length) &&
    (!state.accounts[account.index].hasOwnProperty('friends_diff')) ? (
      state.accounts[account.index].last_friends = [],
      state.accounts[account.index].friends_diff = [])
    : ((removed = diff_array(state.accounts[account.index].last_friends, friends),
      added = diff_array(friends, state.accounts[account.index].last_friends)) =>
      lines(false, removed, () =>
        lines(true, added, () =>
          (added.length || removed.length) ?
            state.accounts[account.index].last_friends = friends: null)))(),
friends_check(accounts[0]),
      + pool(data.emotes[5]) + ' [url=sdq.st/u/49520]SideQuest[/url]\n\n'
      + '[h1]Friend (' + (profile.game_favorite.selection[0]+"").replace(/_.*/, "") + ') [/h1]\n'
      + ((friend_activity = '') => (
        state.accounts[0].friends_diff.slice(-4).reverse().forEach((entry) =>
          friend_activity += entry[0].replace('2019-', '') + " - [" + (entry[1] ? pool(data.green_icons) : pool(data.red_icons))
          + " ] [b] " + entry[2] + "[/b]| [u]" + entry[3] + "[/u] | "
          + pool(pool(data.emojis, 1, null)[0]) + " = [i]" + entry[4].slice(0, 22) + "[/i]\n"),
        friend_activity))() ] ] } },
//------------------------------------------------------------------------------ BadgesPageOnWebSession
(!account.badges) &&
  http_request(account, 'my/badges', null, (body, response, err,
    links = Cheerio.load(body)('a.btn_green_white_innerfade')) => (
    account.badges = [],
    (links.length > 0) &&
      links.each((i, link) =>
        account.badges.push(+link.attribs.href.substr(12)))))
//------------------------------------------------------------------------------ BotchedNewSlimArtworkSed
http_request(account, 'sharedfiles/itemedittext?' + element, { id: element, language: 0, title: pool(data.emojis_bulk) + fortune('all', 1, 95, 100).replace(/\n/g, '').replace(/ -- .*/, '').trim() + pool(data.emojis_bulk), description: '' }),
//------------------------------------------------------------------------------ CompletionistShowcase
completionist: { shuffle_slots: [ 0, 1 ], shuffle_types: [ -1, -1 ], slots: [ [ ()=> pool(data.completionist) ], [ () => pool(data.completionist) ] ] },
alter_showcase('completionist', 23, (i, element) =>
  account.edit_2 += "&rgShowcaseConfig%5B23_0%5D%5B" + i + "%5D%5Bappid%5D=" + element)
//------------------------------------------------------------------------------ WainSelect
http_request(account, 'https://steamcommunity.com/actions/selectPreviousAvatar', { json: 1, sha: pool(data.wain_sha) }, (body, response, error) =>
//------------------------------------------------------------------------------ GenerateLinks
(generate_links = (links = shuffle_array(data.links)) =>
  (pool(data.emotes[6], 1) + ' ' + links[0] + ' ' + pool(data.emotes[8], 1) + ' ' +
  links[1] + ' ' + pool(data.emotes[2], 1) + ' ' +
  links[2] + ' ' + pool(data.emotes[4], 1) + ' ' +
  links[3] + ' ' + pool(data.emotes[3], 1) + ' ' +
  links[4] + ' ' + pool(data.emotes[11], 1) + ' ' +
  links[5] + ' ' + pool(data.emotes[9], 1) + ' ' +
  links[6] + ' ' + pool(data.emotes[5], 1) + ' ' + links[7]).replace(/:/g, 'ː'))()
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
(generate_greetings = (delimiter = "/", text = '') => (
  shuffle_array(data.greetings).forEach((greeting) =>
    text += greeting + '[/url] ' + delimiter + ' '),
  text.trim().slice(0, -2)))(),
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
alter_showcase(items_trade, (i, element) => { SetItemShowcaseSlot(4, i, element); });
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
//------------------------------------------------------------------------------ ObsoleteData2021
"maxims" : [
  "Accidentally wiped my friends list due to a zero being a one. I'm so careless and stupid.",
  "Removed all of my friends to protest the semiconductor shortage. I want a new Geforce!",
  "Dumped my friends list so my computer (and yours too, actually) will start to run faster!",
  "Oh no. Where did everyone go? Am I being punished? Add me back! Not you, though. Go away.",
  "None of you were buying me VR game gifts so I had to nuke my friends list from orbit.",
  "Rebuilding Steam friend list. Rotten to the core. Not you though, I like you, add me back.",
  "To become a Steam friend you must follow my Youtube page. Why didn't I think of this before!?",
  "Please have over 500 other Steam friends before adding me, for network effects, you see.",
  "The next stage of the master plan requires a complete rebuilding of the friends list...",
  "To become a Steam friend, upload screenshot of my profile onto the front of yours and tell me.",
  "My computer will rate up anything you upload to my feed, so please, don't post any anime.",
  "Join the primarydataloop group chat to receive further communiques from the Big Giant Head.",
  "Only accepting friend requests from those who have a Virtual Reality headset, my people.",
  "I obliterated my friends list because my psychiatrist suggested it would be therapeutic.",
  "What are you doing here? You're not supposed to be here. Turn around and never come back!",
  "This profile randomly shuffles it's contents every minute to better suit your needs.",
  "Please don't give me or my artworks any awards. When you do it my computer gets screwed up.",
  "I'm sorry, I would love to be of assistance to you, but I'm afraid I speak no English.",
  "The Matrix is everywhere. It is all around us. Even now, in this very room...",
  "We are the Borg. Lower your shields and surrender your ships. Resistance is futile.",
  "I had to remove you because you wouldn't stop posting 6 of the same message. That's spam.",
  "I removed all Russians. Seemed odd to have them when I plan to invade their country.",
  "Murdered everyone in my friends list because Valve won't fix my Index controllers.",
  "SteamVR Home now runs a million times faster after I 'accidentally' cleared friends ledger.",
  "I removed you because of that thing you did with the stuff. I'll never forgive you for it.",
  "Advanced computer algorithms are analyzing friend requests. If you are cool, it auto-accepts.",
  "Achilles wished all Steam Friends would die, so he and Patroclus could conquer Troy alone.",
  "Deleted my friends list because I'm super depressed and you should buy me VR games.",
  "I accidentally removed everyone in my friends list to a programming error. Whoops."
],
"unused_greetings": [
  "[url=https://steamcommunity.com/id/byteframe?l=korean]안녕하세요![/url]",
  "[url=https://steamcommunity.com/id/byteframe?l=japanese]こんにちは![/url]" ],
"steam_dev_days": [
  550781,550766,550782,550767,550783,550768,550784,550769,550770,550771,550772,550773,534615,534613,534614,534629,534630,534631,
  534616,534632,534617,534618,534633,534634,534619,534635,534620,534636,534621,534622,534623,534624,534625,534610,534626,534611,534627,534612,534628,
  550765,550774,550775,550760,550776,550761,550777,550762,550778,550763,550779,550764,550780,534600 ],
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
//------------------------------------------------------------------------------