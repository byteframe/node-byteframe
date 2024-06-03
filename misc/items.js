//------------------------------------------------------------------------------ EmoticonSetPrinter
d.items_emoticons_array.forEach((__e) =>
  console.dir(__e.map((e) =>A[0].inventory.emoticons.find((_e) => _e.id == e.substr(6)).name).join('')))
//------------------------------------------------------------------------------ CheckSetType
d.items_trade_array.map((e) => e[0].substr(6)).filter(
  (e) => A[0].inventory['emoticons/cards/backgrounds'].findIndex((_e) => _e.assetid == e) > -1)
d.items_showcase_array.map((e) => e[0].substr(6)).filter(
  (e) => A[0].inventory['cards'].findIndex((_e) => _e.assetid == e) > -1)
//------------------------------------------------------------------------------ SortInventoryByNameLength
accounts[0].inventory.cards.sort((a,b) => b.market_name.length - a.market_name.length).forEach((item) => console.log("https://steamcommunity.com/id/byteframe/inventory/#753_6_" + item.id + "\"" + item.market_name + "\" {CARD}"));
accounts[0].inventory.boosters.sort((a,b) => b.market_name.length - a.market_name.length).forEach((item) => console.log("https://steamcommunity.com/id/byteframe/inventory/#753_6_" + item.id + "\"" + item.market_name + "\" {BOOSTER}"));
accounts[0].inventory.backgrounds.sort((a,b) => b.market_name.length - a.market_name.length).forEach((item) => console.log("https://steamcommunity.com/id/byteframe/inventory/#753_6_" + item.id + "\"" + item.market_name + "\" {BACKGROUND}"));
//------------------------------------------------------------------------------ OldGetEmoticonsFromInventory
account.inventory = account.inventory.sort((a, b) => parseInt(a.id) - parseInt(b.id))
account.inventory.forEach((item)=>(item.tags[2].name == 'Emoticon') && console.dir(item.name))
emoticons2 = data.emoticons.flat().map((emoticon) => emoticon.toLowerCase());
emoticons3 = data.item_showcase.flat().map((emoticon_id) => emoticon_id.replace('753_6_', ''));
emoticons.forEach((emoticon, i) => 
  (emoticons2.indexOf(emoticon.name.toLowerCase()) == -1) && (
    console.log(emoticon.name + " ")));
emoticons.forEach((emoticon, i) => 
  (emoticons3.indexOf(emoticon.id) == -1) && (
    console.log("753_6_" + emoticon.id + " " + emoticon.name)));