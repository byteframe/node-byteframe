//------------------------------------------------------------------------------ RunTradeOfferWithOldSearchGmailFrom
search_gmail = (gmails, start, end) => {
  for (var i = 0; i < gmails.length; i++) {
    var start_index = gmails[i].indexOf(start);
    if (start_index > -1) {
      return gmails[i].slice(start_index, gmails[i].indexOf(end, start_index));
    }
  }
  return false;
};
inventories = [ [ 440,2 ],[ 753,6 ] ],
run_trade_offer = (account, receiver, sending = [], i = 0) =>
  account.tradeOfferManager.getInventoryContents(inventories[i][0], inventories[i][1], true, (err, inventory) => (
    (err) &&
      log(account, "FAILURE | getInventoryContents: " + ("id=" + inventories[i] + ",error=" + err).yellow),
    (i < inventories.length-1) ?
      run_trade_offer(account, receiver, sending.concat(inventory), i+1)
    : (!sending.length && !inventory.length) ?
      log(account, "SESSION | run_trade_offer: " + "no items")
    : ((offer = account.tradeOfferManager.createOffer("https://steamcommunity.com/tradeoffer/new/?partner=16471780&token=6MrQi4mC")) => (
        offer.addMyItems(sending.concat(inventory.filter((item) => {
          var send = true;
          item.tags.forEach((tag) =>
            (tag.name == 'Profile Background' || tag.name == 'Emoticon') && (
              send = false));
          return send;
        }))),
      offer.send((err, status) =>
        (err) ?
          log(account, "FAILURE | offer.send: " + ("error=" + err).yellow)
        : (status != 'pending') ?
          log(account, "SESSION | offer.send: " + ("complete=" + status).yellow)
        : account.community.acceptConfirmationForObject("identitySecret", offer.id, (err) =>
          (get_gmail_confirmation = (attempt = 0) =>
            get_gmail(account, (err, gmails, link = search_gmail(gmails, "https://steamcommunity.com/tradeoffer/" + offer.id + "/confirm?accountid", '"')) => (
              (link.length <= 1 || !link) ?
                (attempt == 8) ?
                  log(account, "FAILURE | get_gmail: " + ("noLink=" + offer.id).yellow)
                : setTimeout(() => get_gmail_confirmation(attempt+1), 1500)
              : http_request(account, link.replace(/&amp;/g, '&'), {}, (body, response, error) =>
                (!body.indexOf('has been confirmed')) ?
                  log(account, "FAILURE | http_request: " + ("noConfirm=" + link.substr(119,20) + "|" + offer.id).yellow)
                : receiver.tradeOfferManager.getOffer(offer.id, (err, offer) =>
                    (err) ?
                      log(account, "FAILURE | getOffer: " + ("error=" + err).yellow)
                    : offer.getUserDetails((err, me, them) =>
                        offer.accept(false, (err, status) =>
                          log(account, "SUCCESS | offer.accept: " + status + "=" + me.escrowDays + "/" + them.escrowDays + "_days"))))))))()))))()));
//------------------------------------------------------------------------------ ItemsEvent
this.new_items = false;
this.new_items_timer = -1;
this.user.on('newItems', (count) => {
  this.new_items = true;
  if (count > 0) {
    clearTimeout(this.new_items_timer);
    this.new_items_timer = setTimeout((count) => {
      this.log('SESSION | newItems: ' + ("{" + count + "} https://steamcommunity.com/" + this.profile_url() + "/inventory").yellow);
    }, 5000, count);
  }
});
clear_item_notification() {
  if (this.new_items) {
    this.new_items = false;
    this.http_request(this.profile_url() + "/inventory");
  }
}
//------------------------------------------------------------------------------ TradeOfferManager
this.user.on('webSession', (sessionID, cookies) =>
  this.tradeOfferManager.setCookies(cookies));
SteamTradeOfferManager = require('steam-tradeoffer-manager');
this.tradeOfferManager = new SteamTradeOfferManager({
  "steam": this.user,
  "community": this.community,
  "dataDirectory": null,
  "domain": "primarydataloop",
  "language": "en"
});