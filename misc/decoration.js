//------------------------------------------------------------------------------ GiphyRoutine
giphy = require('giphy')(state.giphy_key),
giphy.search({q: pool(data.giphy_queries)}, (err, data) =>
  (!err) &&
    accounts[a].send_group_chat('37338', '12030657', data.data[Math.floor(Math.random()*data.data.length)].url))
//------------------------------------------------------------------------------ PoolProcedure
pool = (pool, length = 1, join = '', elements = []) => {
  if (!pool.hasOwnProperty('index')) {
    pool.index = 0;
  }
  for (; length > 0; length--) {
    if (pool.index === 0) {
      shuffle_array(pool);
    }
    elements.push(pool[pool.index]);
    if (++pool.index == pool.length) {
      pool.index = 0;
    }
  }
  if (join !== null) {
    return elements.join(join);
  }
  return elements;
};
//------------------------------------------------------------------------------ FontTables
var stocks = [
  [ '0','1','2','3','4','5','6','7','8','9', ],
  [ 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', ],
  [ 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z', ] ];
var fonts = [
  [ [ '0','1','2','3','4','5','6','7','8','9', ],
    [ '𝑎','𝑏','𝑐','𝑑','𝑒','𝑓','𝑔','ℎ','𝑖','𝑗','𝑘','𝑙','𝑚','𝑛','𝑜','𝑝','𝑞','𝑟','𝑠','𝑡','𝑢','𝑣','𝑤','𝑥','𝑦','𝑧', ],
    [ '𝐴','𝐵','𝐶','𝐷','𝐸','𝐹','𝐺','𝐻','𝐼','𝐽','𝐾','𝐿','𝑀','𝑁','𝑂','𝑃','𝑄','𝑅','𝑆','𝑇','𝑈','𝑉','𝑊','𝑋','𝑌','𝑍', ] ], // 1x2
  [ [ '0','1','2','3','4','5','6','7','8','9', ],
    [ '𝒂','𝒃','𝒄','𝒅','𝒆','𝒇','𝒈','𝒉','𝒊','𝒋','𝒌','𝒍','𝒎','𝒏','𝒐','𝒑','𝒒','𝒓','𝒔','𝒕','𝒖','𝒗','𝒘','𝒙','𝒚','𝒛', ],
    [ '𝑨','𝑩','𝑪','𝑫','𝑬','𝑭','𝑮','𝑯','𝑰','𝑱','𝑲','𝑳','𝑴','𝑵','𝑶','𝑷','𝑸','𝑹','𝑺','𝑻','𝑼','𝑽','𝑾','𝑿','𝒀','𝒁', ] ], // 1x3
  [ [ '𝟎','𝟏','𝟐','𝟑','𝟒','𝟓','𝟔','𝟕','𝟖','𝟗', ],
    [ '𝐚','𝐛','𝐜','𝐝','𝐞','𝐟','𝐠','𝐡','𝐢','𝐣','𝐤','𝐥','𝐦','𝐧','𝐨','𝐩','𝐪','𝐫','𝐬','𝐭','𝐮','𝐯','𝐰','𝐱','𝐲','𝐳', ],
    [ '𝐀','𝐁','𝐂','𝐃','𝐄','𝐅','𝐆','𝐇','𝐈','𝐉','𝐊','𝐋','𝐌','𝐍','𝐎','𝐏','𝐐','𝐑','𝐒','𝐓','𝐔','𝐕','𝐖','𝐗','𝐘','𝐙', ] ], // 1x4
  [ [ '0','1','2','3','4','5','6','7','8','9', ],
    [ 'ᴀ','ʙ','ᴄ','ᴅ','ᴇ','ꜰ','ɢ','ʜ','ɪ','ᴊ','ᴋ','ʟ','ᴍ','ɴ','ᴏ','ᴘ','ǫ','ʀ','s','ᴛ','ᴜ','ᴠ','ᴡ','x','ʏ','ᴢ', ],
    [ 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z', ] ], // 3x1 (stock upper)
  [ [ '𝟶','𝟷','𝟸','𝟹','𝟺','𝟻','𝟼','𝟽','𝟾','𝟿', ],
    [ '𝚊','𝚋','𝚌','𝚍','𝚎','𝚏','𝚐','𝚑','𝚒','𝚓','𝚔','𝚕','𝚖','𝚗','𝚘','𝚙','𝚚','𝚛','𝚜','𝚝','𝚞','𝚟','𝚠','𝚡','𝚢','𝚣', ],
    [ '𝙰','𝙱','𝙲','𝙳','𝙴','𝙵','𝙶','𝙷','𝙸','𝙹','𝙺','𝙻','𝙼','𝙽','𝙾','𝙿','𝚀','𝚁','𝚂','𝚃','𝚄','𝚅','𝚆','𝚇','𝚈','𝚉', ] ], // 3x2
  [ [ '0','1','2','3','4','5','6','7','8','9', ],
    [ 'ⲁ','ⲃ','ⲥ','ⲇ','ⲉ','𝓯','𝓰','ⲏ','ⲓ','𝓳','ⲕ','𝓵','ⲙ','ⲛ','ⲟ','ⲣ','𝓺','ꞅ','𝛓','ⲧ','𐌵','𝓿','ⲱ','ⲭ','ⲩ','ⲍ', ],
    [ 'Ⲁ','Ⲃ','Ⲥ','Ⲇ','Ⲉ','𝓕','𝓖','Ⲏ','Ⲓ','𝓙','Ⲕ','𝓛','Ⲙ','Ⲛ','Ⲟ','Ⲣ','𝓠','Ꞅ','Ϩ','Ⲧ','ⴑ','𝓥','Ⲱ','Ⲭ','Ⲩ','Ⲍ', ] ], // 3x4
  [ [ '0','1','2','3','4','5','6','7','8','9', ],
    [ '𝔞','𝔟','𝔠','𝔡','𝔢','𝔣','𝔤','𝔥','𝔦','𝔧','𝔨','𝔩','𝔪','𝔫','𝔬','𝔭','𝔮','𝔯','𝔰','𝔱','𝔲','𝔳','𝔴','𝔵','𝔶','𝔷', ],
    [ '𝔄','𝔅','ℭ','𝔇','𝔈','𝔉','𝔊','ℌ','ℑ','𝔍','𝔎','𝔏','𝔐','𝔑','𝔒','𝔓','𝔔','ℜ','𝔖','𝔗','𝔘','𝔙','𝔚','𝔛','𝔜','ℨ', ] ], // 3x5
  [ [ '0','1','2','3','4','5','6','7','8','9', ],
    [ '🄰','🄱','🄲','🄳','🄴','🄵','🄶','🄷','🄸','🄹','🄺','🄻','🄼','🄽','🄾','🄿','🅀','🅁','🅂','🅃','🅄','🅅','🅆','🅇','🅈','🅉', ],
    [ '🄰','🄱','🄲','🄳','🄴','🄵','🄶','🄷','🄸','🄹','🄺','🄻','🄼','🄽','🄾','🄿','🅀','🅁','🅂','🅃','🅄','🅅','🅆','🅇','🅈','🅉', ] ], // 2x5 (equal case)
  [ [ '⓪','①','②','③','④','⑤','⑥','⑦','⑧','⑨', ],
    [ 'ⓐ','ⓑ','ⓒ','ⓓ','ⓔ','ⓕ','ⓖ','ⓗ','ⓘ','ⓙ','ⓚ','ⓛ','ⓜ','ⓝ','ⓞ','ⓟ','ⓠ','ⓡ','ⓢ','ⓣ','ⓤ','ⓥ','ⓦ','ⓧ','ⓨ','ⓩ', ],
    [ 'Ⓐ','Ⓑ','Ⓒ','Ⓓ','Ⓔ','Ⓕ','Ⓖ','Ⓗ','Ⓘ','Ⓙ','Ⓚ','Ⓛ','Ⓜ','Ⓝ','Ⓞ','Ⓟ','Ⓠ','Ⓡ','Ⓢ','Ⓣ','Ⓤ','Ⓥ','Ⓦ','Ⓧ','Ⓨ','Ⓩ', ] ], // 2x6
  [ [ '𝟢','𝟣','𝟤','𝟥','𝟦','𝟧','𝟨','𝟩','𝟪','𝟫', ],
    [ '𝖺','𝖻','𝖼','𝖽','𝖾','𝖿','𝗀','𝗁','𝗂','𝗃','𝗄','𝗅','𝗆','𝗇','𝗈','𝗉','𝗊','𝗋','𝗌','𝗍','𝗎','𝗏','𝗐','𝗑','𝗒','𝗓', ],
    [ '𝖠','𝖡','𝖢','𝖣','𝖤','𝖥','𝖦','𝖧','𝖨','𝖩','𝖪','𝖫','𝖬','𝖭','𝖮','𝖯','𝖰','𝖱','𝖲','𝖳','𝖴','𝖵','𝖶','𝖷','𝖸','𝖹', ] ], // 2x1
  [ [ '0','1','2','3','4','5','6','7','8','9', ],
    [ '𝘢','𝘣','𝘤','𝘥','𝘦','𝘧','𝘨','𝘩','𝘪','𝘫','𝘬','𝘭','𝘮','𝘯','𝘰','𝘱','𝘲','𝘳','𝘴','𝘵','𝘶','𝘷','𝘸','𝘹','𝘺','𝘻', ],
    [ '𝘈','𝘉','𝘊','𝘋','𝘌','𝘍','𝘎','𝘏','𝘐','𝘑','𝘒','𝘓','𝘔','𝘕','𝘖','𝘗','𝘘','𝘙','𝘚','𝘛','𝘜','𝘝','𝘞','𝘟','𝘠','𝘡', ] ], // 2x2
  [ [ '0','1','2','3','4','5','6','7','8','9', ],
    [ '𝙖','𝙗','𝙘','𝙙','𝙚','𝙛','𝙜','𝙝','𝙞','𝙟','𝙠','𝙡','𝙢','𝙣','𝙤','𝙥','𝙦','𝙧','𝙨','𝙩','𝙪','𝙫','𝙬','𝙭','𝙮','𝙯', ],
    [ '𝘼','𝘽','𝘾','𝘿','𝙀','𝙁','𝙂','𝙃','𝙄','𝙅','𝙆','𝙇','𝙈','𝙉','𝙊','𝙋','𝙌','𝙍','𝙎','𝙏','𝙐','𝙑','𝙒','𝙓','𝙔','𝙕', ] ], // 2x3
  [ [ '𝟬','𝟭','𝟮','𝟯','𝟰','𝟱','𝟲','𝟳','𝟴','𝟵', ],
    [ '𝗮','𝗯','𝗰','𝗱','𝗲','𝗳','𝗴','𝗵','𝗶','𝗷','𝗸','𝗹','𝗺','𝗻','𝗼','𝗽','𝗾','𝗿','𝘀','𝘁','𝘂','𝘃','𝘄','𝘅','𝘆','𝘇', ],
    [ '𝗔','𝗕','𝗖','𝗗','𝗘','𝗙','𝗚','𝗛','𝗜','𝗝','𝗞','𝗟','𝗠','𝗡','𝗢','𝗣','𝗤','𝗥','𝗦','𝗧','𝗨','𝗩','𝗪','𝗫','𝗬','𝗭', ] ], // 2x4
  [ [ '⓿','➊','➋','➌','➍','➎','➏','➐','➑','➒', ],
    [ '🅐','🅑','🅒','🅓','🅔','🅕','🅖','🅗','🅘','🅙','🅚','🅛','🅜','🅝','🅞','🅟','🅠','🅡','🅢','🅣','🅤','🅥','🅦','🅧','🅨','🅩', ],
    [ '🅐','🅑','🅒','🅓','🅔','🅕','🅖','🅗','🅘','🅙','🅚','🅛','🅜','🅝','🅞','🅟','🅠','🅡','🅢','🅣','🅤','🅥','🅦','🅧','🅨','🅩', ] ], // 1x6
  [ [ '⁰','¹','²','³','⁴','⁵','⁶','⁷','⁸','⁹', ],
    [ 'ᵃ','ᵇ','ᶜ','ᵈ','ᵉ','ᶠ','ᵍ','ʰ','ⁱ','ʲ','ᵏ','ˡ','ᵐ','ⁿ','ᵒ','ᵖ','q','ʳ','ˢ','ᵗ','ᵘ','ᵛ','ʷ','ˣ','ʸ','ᶻ', ],
    [ 'ᴬ','ᴮ','ᶜ','ᴰ','ᴱ','ᶠ','ᴳ','ᴴ','ᴵ','ᴶ','ᴷ','ᴸ','ᴹ','ᴺ','ᴼ','ᴾ','Q','ᴿ','ᔆ','ᵀ','ᵁ','ⱽ','ᵂ','ˣ','ʸ','ᶻ', ] ] ]; // 1x7
function prep_make_object() {
  console.log("var translations = [");
  fonts.forEach(function(font) {
    var line = "  { ";
    font.forEach(function(letters, c) {
      letters.forEach(function(letter, l) {
        line = line + stocks[c][l] + ": '" + letters[l] + "', ";
      });
    });
    console.log(line + " },");
  });
  console.log("];");
}
//------------------------------------------------------------------------------ GenerateFortune
var symbol = pool_elements(ascii);
while (true) {
  definition = generate_fortune('definitions');
  if (definition.split('\n').length == 2) {
    break;
  }
}
for(var i = 0; i < 8; i++) {
  for (var j = 0; j < i+1; j++) {
    text += "ㅤ"
  }
  text += pool_elements(emoticon_static[0]) + symbol + pool_elements(emoticon_static[0]) + " " + XXX + "\n";
}
console.log('');
//------------------------------------------------------------------------------