//------------------------------------------------------------------------------ ListUncuratedReviews
Object.keys(state.reviews).forEach((review) =>
  (!state.reviews[review].curated && state.reviews[review].text.indexOf('JICW9lTq') == -1) &&
    console.log(review + " | " + state.reviews[review].text))
//------------------------------------------------------------------------------ EditReview
edit_reviews = (account, r = 0) => {
  var review_data = byteframe.review_data;
  if (r == review_data.length) {
    return console.log('done');
  } else if (review_data[r].edited || !review_data[r].showcasing) {
    return edit_reviews(account, r+1);
  }
  review_data[r].new_text = generate_links() + "\n"
    + pool_emoticon() + " " + review_data[r].text + " " + pool_emoticon();
  review_data[r].new_text = review_data[r].new_text.replace(/[.] /g, ".유 ");
  review_data[r].new_text = review_data[r].new_text.replace(/[?] /g, "?유 ");
  review_data[r].new_text = review_data[r].new_text.replace(/! /g, "!유 ");
  review_data[r].new_text = review_data[r].new_text.replace(/, /g, ",유 ");
  review_data[r].new_text = review_data[r].new_text.replace(/[.]\[/g, ".유 [");
  review_data[r].new_text = review_data[r].new_text.replace(/[?]\[/g, "?유 [");
  review_data[r].new_text = review_data[r].new_text.replace(/!\[/g, "!유 [");
  review_data[r].new_text = review_data[r].new_text.replace(/,\[/g, ",유 [");
  review_data[r].new_text = review_data[r].new_text.replace(/\n\n/g, "유\n\n");
  while (true) {
    if (review_data[r].new_text.indexOf("유") == -1) {
      break;
    }
    review_data[r].new_text = review_data[r].new_text.replace('유', " " + pool_emoticon());
  }
review_data[r].new_text =   review_data[r].text;
  account.http_request('https://steamcommunity.com/userreviews/update/' + review_data[r].id, {
    received_compensation: false, review_text: review_data[r].new_text, voted_up: review_data[r].rating
  }, (body, reponse, error) => {
    console.log(r + " -- https://steamcommunity.com/id/byteframe/recommended/" + review_data[r].appid);
    edit_reviews(account, r+1);
  });
};
//------------------------------------------------------------------------------ GetReviewPageJQuery
(get_review_page = (p = 1) => {
  jQuery.get(get_url() + '/recommended?p=/' + p).done((response1) => {
    (get_review = (r = 0) => {
      jQuery.get(jQuery(response1).find('div.title a')[r].href).done((response2) => {
        var modalContentLink = jQuery('div#ReviewText a.modalContentLink')[0];
        if (typeof modalContentLink !== 'undefined') {
          ylink = 'https://youtu.be/' + jQuery(modalContentLink).find('img')[0].src.replace(/^.*vi\//, '').replace(/\/.*/, ''),
          jQuery('div#ReviewEdit textarea').text(jQuery('div#ReviewEdit textarea').text().replace(
            /http.*:\/\/steamcommunity.com\/sharedfiles\/filedetails\/\?id=[0-9]*/, ylink));
          jQuery('span#SaveReviewBtn').click();
        }
        revid: jQuery('div.responsive_page_template_content script')[0].innerHTML
        score: (jQuery('span.btnv6_blue_hoverfade.btn_small_thin.ico_hover')[0].id == 'OwnerVoteUpBtn') ? true : false,
        video.revid = video.revid.slice(video.revid.indexOf("'")+1, video.revid.indexOf("',"));
        setTimeout(() => {
          jQuery.post('//steamcommunity.com/userreviews/update/' + revid, {
            received_compensation: false,
            voted_up: score,
            sessionid: g_sessionID,
            review_text: rtext
          }).done(function(response) {
            console.log('review ' + review.slots[0][r] + ": " + r + '/' + review.slots[0].length);
          });
        }, 10000);
      });
    })();
  });
})();
//------------------------------------------------------------------------------ GetReviews
(get_reviews = (p = 1) =>
  (p != 0) &&
    http_request(accounts[0], 'my/recommended/?p=' + p, null, (body, response, error,
      _reviews = body.match(/https\:\/\/steamcommunity.com\/id\/byteframe\/recommended\/[0-9]*/g).filter((element, index) => index % 2 == 0)) =>
        setTimeout(() => (get_review = (r = 0) =>
          (r == _reviews.length) ?
            setTimeout(() => get_reviews(p-1), 3000)
          : http_request(accounts[0], _reviews[r], null, (body, response, error, appid = _reviews[r].substr(52)) => (
              (!config.reviews.hasOwnProperty(appid)) && (
                config.reviews[appid] = {
                  currated: false,
                  rating: (body.match("thumbsUp.png") ? true: false),
                  text: Cheerio.load(body)('textarea')[0].children[0].data }),
              get_review(r+1))))(), 1000)))(1)