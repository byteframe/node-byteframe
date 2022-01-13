//------------------------------------------------------------------------------ BatchReviewEdit2021
update_review = (i = 0, speed = 120000) =>
  (data.review.length != i) && (
    console.log('update_review: ' + i),
    http_request(accounts[0], 'my/recommended/' + data.review[i], null, (body, response, error,
      x = body.indexOf('UserReview_Report')+21) => 
      http_request(accounts[0], 'userreviews/update/' + body.substr(x-1, (body.indexOf("'", x)-x)+1), { received_compensation: false, review_text: generate_links(), voted_up: true }, (body, response, error) => (
        console.log("  - https://steamcommunity.com/my/recommended/" + data.review[i]),
        setTimeout(update_review, speed, i+1, speed)))))
//------------------------------------------------------------------------------ ListUncuratedReviews
Object.keys(state.reviews).forEach((review) =>
  (!state.reviews[review].curated && state.reviews[review].text.indexOf('JICW9lTq') == -1) &&
    console.log(review + " | " + state.reviews[review].text))
//------------------------------------------------------------------------------ EditReviews
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
//------------------------------------------------------------------------------ DataCullForBanned2021
"old_review": [
  873910,212200,372000,1028860,1522260,755790,1084630,1317950,957830,1084520,439350,1245610,821670,1570960,1520470,1023740,
  1658830,1573300,1488080,1583650,1551240,459640,1636200,1374500,1406280,1501360,1448030,
  1547070,1542010,1390860,1587180,1540960,
  1262190,1547990,1582890,914640,745560,1539780,1259240,1554500,1563760,1567370,1577420,780820,1274200,1419740,1153700,
  1506600,1385210,557180,1363960,1410620,1315680,1344350,1468180,417360,1422380,
  1101450,1146630,1319720,1460200,1263610,868380,1540830,1255830,1461220,1274940,
  862440,1345080,1071330,1179100,1247460,
  1482060,1074680,1386950,1490190,1473660,
  394930,1201870,720950,396280,999180,506140,966870,1271030,1191420,1417530,
  959500,558870,655160,608510,994350,794740,1164570,1251690,1054300,751860,
  718370,794600,826100,1204740,924310,968940,1296280,1054560,826480,387970,
  562600,1209860,723890,798590,946070,18480,1463120,896840,919220,
  907350,1129190,1151880,531630,1105420,959750,1419370,1202300,1126510,416080,
  974470,1091950,793150,1148510,990090,1121910,467380,
  1131710,1132120,522040,1186260,1182760,1065000,1213440,
  874650,545650,423770,373120,696470,894340,613330,661260,892650,
  260410,850230,540610,948350,657200,549770,944110,896890,514390,565720,
  752050,950860,568300,366610,365070,628730,861260,796910,953270,924810,
  799240,528060,823550,942140,
  575550,610750,575620,535150,542260,291030,416130,423880,420880,510660,348620,
  445230,349720,300970,557880,354290,603880,345650,509800,395140,369400,368370,
  466170,776340,360650,643870,625400,581130,351790,328100,378830,340800,598820,
  771450,768840,718940,575510,531190,
  1090900,1111810,862690,1221560,1057430,1275070,742170,545030,1174940,1024800,
  865570,1196750,1198260,1023370,950460,1096720,1274290,696590,1008210,317290,
  1236700,934540,1274610,1173650,1443820 ],
"bad_review": [ 1448030,1501360,1658830,1540960,1587180,1390860,1542010,1547070,
  1153700,1577420,1259240,417360,1247460,862440,1386950,1074680,1482060,1126510,
  1202300,1419370,959750,907350,723890,1204740,558870,999180,396280,1201870,1443820,
  696590,545030,1275070,1091950,467380,1121910,990090,1148510,793150,974470,1213440,
  1182760,1186260,528060,942140,823550,799240,628730,924810,953270,796910,861260,
  365070,366610,568300,950860,752050,565720,514390,896890,944110,549770,657200,
  948350,540610,850230,260410,892650,661260,613330,894340,696470,373120,423770,
  545650,874650,531190,575510,718940,768840,771450,598820,378830,328100,351790,
  581130,625400,643870,360650,776340,466170,368370,369400,395140,509800,345650,
  603880,555210,434420,354290,557880,300970,349720,445230,348620,331470,510660,
  420880,423880,416130,291030,542260,459820,535150,575620,610750,575550,503300 ]