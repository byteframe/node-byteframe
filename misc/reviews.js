//------------------------------------------------------------------------------ emojifiy reviews
emoji_update_review = (a, g, q) =>
  http(a, 'userreviews/update/' + s.A[a.i].reviews[g].id, { received_compensation: false, voted_up: true, review_text: s.A[a.i].reviews[g].contents.replace("[/td]", "[/td][td]" + [...Array(q).keys()].map((e) => pool(pool(d.emojis, 1, null)[0])).join('') + "\n" + [...Array(q).keys()].map((e) => pool(pool(d.emojis, 1, null)[0])).join('') + "[/td]"        ) }, (b, r, x) =>
    log(a, "SUCCESS | userreviews/update: " + ("https://steamcommunity.com/" + profile_url(a) + "/recommended/" + g).yellow),
    get_reviews(a, 0, true, [g]))
//------------------------------------------------------------------------------ sort reviews and print
sorted_reviews = Object.entries(s.A[0].reviews).sort((e, _e) => _e[1].time - e[1].time).filter((__e) => (d.review_3507533.includes(+__e[0])))
text = '';
for (var i = 0; i < sorted_reviews.length; i++) {
  if (i % 10 == 0) {
    console.log(text);
    text = '';
  }
  text += sorted_reviews[i] + ",";
}
//------------------------------------------------------------------------------ get_reviews_old
get_reviews_old = (a, p = 1, force = false, delay = 2500) =>
  http(a, 'my/recommended/?p=' + p, null, (b, r, x, _reviews = b.match(/https\:\/\/steamcommunity.com\/id\/byteframe\/recommended\/[0-9]*/g).filter((e, i) => i % 2 == 0)) =>
    (get_review = (e = 0) =>
      (e == _reviews.length) ?
        (p > 1) &&
          get_reviews(a, p-1, force, delay)
      : (!force && s.A[a.i].reviews.hasOwnProperty(_reviews[e].substr(52))) ?
        get_review(e+1)
      : http(a, _reviews[e], null, (b, r, x, z = b.indexOf('UserReview_Report')+21) => (
          s.A[a.i].reviews[_reviews[e].substr(52)] = {
            banned: (b.indexOf('review has been banned') > -1) ? true : false,
            id: b.substr(z-1, (b.indexOf("'", z)-z)+1),
            rating: (b.match("thumbsUp.png") ? true: false),
            contents: Cheerio.load(b)('textarea')[0].children[0].data },
          setTimeout(get_review, delay, e+1))))())
//------------------------------------------------------------------------------ find_hidden_reviews
(find_hidden_reviews = (a = A[0], p = 1) =>
  http(a, 'my/recommended/?p=' + p, null, (b, r, x) => (
    b.match(/\d\d\d\'\);\">Friends Only/) != null && console.log('https://steamcommunity.com/my/recommended/?p=' + p),
    setTimeout(find_hidden_reviews, 1500, a, p+1))))()
//------------------------------------------------------------------------------ ReviewVisbilityToggler
(profile.review.hasOwnProperty('last') && profile.review.last.length > 0) && (
  http(account, 'userreviews/update/' + state.accounts[account.index].reviews[profile.review.last[0]].id, { is_public: false }),
  http(account, 'userreviews/update/' + state.accounts[account.index].reviews[profile.review_3507533.last[0]].id, { is_public: false })),
(!err) && (
  http(account, 'userreviews/update/' + state.accounts[account.index].reviews[profile.review.selection[0]].id, { is_public: true }),
  http(account, 'userreviews/update/' + state.accounts[account.index].reviews[profile.review_3507533.selection[0]].id, { is_public: true })),
//------------------------------------------------------------------------------ PublicReviewBatching
(public_review = (e = 0) => (e < data.review.length) && http(accounts[0], 'userreviews/update/' + state.accounts[0].reviews[data.review[e]].id, { is_public: true }, () => setTimeout(public_review, 5000, e+1), true))()
(public_review = (e = 0) => (e < data.review_3507533.length) && http(accounts[0], 'userreviews/update/' + state.accounts[0].reviews[data.review_3507533[e]].id, { is_public: true }, () => setTimeout(public_review, 5000, e+1), true))()
//------------------------------------------------------------------------------ ReviewAudit
review_audit = [];
(review_link_audit = (i = 0) =>
  http(account, 'my/recommended/' + data.review[i], null, (body, response, err, x = body.indexOf('UserReview_Report')+21, id = body.substr(x-1, (body.indexOf("'", x)-x)+1), contents = Cheerio.load(body)('textarea')[0].children[0].data) => (
    review_audit[i] = body.match(/\[td\]https:\/\/steamcommunity.com\/id\/byteframe\/inventory\/#[0-9_]*/g),
    (body.indexOf('review has been banned') > -1) &&
      console.log(data.review[i] + " IS BANNED!"),
    (i < data.review.length-1) &&
      setTimeout(review_link_audit, 5000, i+1))))()
//------------------------------------------------------------------------------ UpdateReview
(a % 18 == 0) ? update_review(accounts[0])
update_review = (account, index = state.review_edit_index) =>
  (data.review_items[index][0] != 'undefined') &&
    http(account, 'userreviews/update/' + state.accounts[account.index].reviews[data.review[index]].id, { received_compensation: false, voted_up: true, review_text: ((state.accounts[account.index].reviews[data.review[index]].contents.indexOf('[/h1]') == -1) ? state.accounts[account.index].reviews[data.review[index]].contents : state.accounts[account.index].reviews[data.review[index]].contents.substr(0, state.accounts[account.index].reviews[data.review[index]].contents.indexOf('[/h1]'))) + "[/h1][quote=" + generate_emoji_fortune(50, 'all') + "][table][tr][td]" + data.review_items[index].join('[/td][td]') + "[/td][/tr][/table][/quote]" }, (body, response, error) => (
      state.review_edit_index++,
      log(account, "SUCCESS | userreviews/update: " + ("https://steamcommunity.com/" + profile_url(account) + "/recommended/" + data.review[index] + " #(" + index + ")").yellow),
      state.accounts[account.index].reviews[data.review[index]].contents = new URLSearchParams(response.request.body).get('review_text')))
//------------------------------------------------------------------------------ CurateTags
  "game_tags": [
    [ "12095", "Sexual Content", "0" ],
    [ "6650", "Nudity", "49426" ],
    [ "128", "Massively Multiplayer", "0" ],
    [ "4400", "Abstract", "0" ],
    [ "3859", "Multiplayer", "0" ],
    [ "4136", "Funny", "0" ],
    [ "113", "Free to Play", "0" ],
    [ "19", "Action", "0" ],
    [ "122", "RPG", "0" ],
    [ "597", "Casual", "0" ],
    [ "872", "Animation & Modeling", "0" ],
    [ "4085", "Anime", "0" ],
    [ "21", "Adventure", "0" ],
    [ "5611", "Mature", "0" ],
    [ "4667", "Violent", "0" ],
    [ "599", "Simulation", "0" ],
    [ "4182", "Singleplayer", "0" ],
    [ "492", "Indie", "0" ],
    [ "4255", "Shoot 'Em Up", "0" ] ],
//------------------------------------------------------------------------------ ManuallyMadeReviewStruct
(!state.accounts[account.index].hasOwnProperty(reviews)) && (
  state.accounts[account.index].reviews = {},
//------------------------------------------------------------------------------ Curation
: (a % 64 == 0) && (
  wishlister(accounts[0]),
  curate_reviews(accounts[0]),
  curate_videos(accounts[0])))))), state.frequency),
curate = (account, appid, blurb, link_url, rating, store) => (
  blurb = blurb.substr(0,203),
  log(account, 'SESSION | curate: ' + (appid + " " + link_url).yellow),
  http(account, "https://store.steampowered.com/curator/2751860-primarydataloop/admin/ajaxcreatereview", {
    appid: appid,
    blurb: (blurb.length > 200) ? blurb.substr(0,200).slice(0,-3) + "..." : blurb.trim(),
    link_url: link_url,
    recommendation_state: (!rating ? 1 : 0) }, (body, response, error) =>
      store.curated = true)),
curate_review = (account, appid) =>
  http(account, 'my/recommended/' + appid, null, (body, response, error,
    text = Cheerio.load(body)('textarea')[0].children[0].data,
    link_url = text.match(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/)) => (
    state.reviews[appid] = {
      curated: false,
      id: body.match(/_Report\( '[0-9]*'/)[0].match(/\d+/)[0],
      rating: (body.match("thumbsUp.png") ? true: false),
      text: (text.indexOf('[spoiler]') == -1 ? text : text.substr(0, text.indexOf('[spoiler]'))).replace(/\[[\/biu]*\]/g, '') },
    (text.indexOf('JICW9lTq') == -1) && (
      http(account, 'userreviews/update/' + state.reviews[appid].id, { 'comments_disabled': false }),
      curate(account, appid, state.reviews[appid].text, !link_url ? "" : link_url[0], state.reviews[appid].rating, state.reviews[appid]))))
curate_reviews = (account, p = 1) =>
  (p > 0) && (
    http(account, 'my/recommended/?p=' + p, null, (body, response, error,
      _reviews = body.match(/\/recommended\/[0-9]*/g).filter((element, index) => index % 2 == 0)) =>
      _reviews.forEach((review, i, _reviews,
        appid = review.slice(13)) =>
        (!state.reviews.hasOwnProperty(appid) || !state.reviews[appid].curated) &&
          setTimeout(() =>
            curate_review(account, appid), (((p-1)*10)+i)*10000))),
    curate_reviews(account, p-1)),
curate_videos = (account, p = 1) =>
  (p > 0) &&
    http(account, 'my/videos/?p=' + p + '&privacy=8&sort=newestfirst', null, (body, response, err,
      files = body.match(/OnVideoClicked\( \d+/g)) =>
      (get_content_details = (f = files.length-1, file = (f < 0 ? null : files[f].substr(16))) =>
        (f < 0) ?
          curate_videos(account, p-1)
        : (state.videos.hasOwnProperty(file)) ?
          get_content_details(f-1)
        : http(account, 'sharedfiles/filedetails/?id=' + file, null, (body, response, err) => (
            state.videos[file] = {
              curated: false,
              link_url:"https://www.youtube.com/watch?v=" + body.match(/vi\/.+\//)[0].slice(3, -1),
              title: body.match(/workshopItemTitle\"\>.+\</)[0].slice(19, -1),
              text: Cheerio.load(body)('.nonScreenshotDescription').text().slice(1, -1),
              appid: body.match(/"appid" value="\d+"/)[0].slice(15, -1),
              votes: +body.match(/"VotesUpCount"\>[0-9]*/)[0].slice(15) },
            (!state.reviews[state.videos[file].appid] || !state.reviews[state.videos[file].appid].curated) &&
              curate(account, state.videos[file].appid, state.videos[file].text.substr(1, state.videos[file].text.indexOf('http')-2), state.videos[file].link_url, true, state.videos[file]), 
            get_content_details(f-1))))()),
//------------------------------------------------------------------------------ GenerateFavoriteSharedConfig
sharedconfig.forEach((appid) => console.log("\"" + appid + "\"\n{\n\t\"hidden\"\t\t\"1\"" + (state.reviewed.indexOf(appid) > -1 ? "\n\t\"tags\"\n\t{\n\t\t\t\"0\"\t\t\"favorite\"\n\t}" : '') + "\n}"))
//------------------------------------------------------------------------------ GetFollowedGames
http(accounts[0], 'my/followedgames', null, (body, response, error) =>
  followed = body.match(/data-appid=\"[0-9]*/g).map((i) => parseInt(i.substr(12))))
//------------------------------------------------------------------------------ CheckReviews2023Simple
state.reviewed = [];
(get_reviews = (p = 244) =>
  (p >= 1) &&
    http(accounts[0], 'my/recommended/?p=' + p, null, (body, response, error, _reviews = body.match(/https\:\/\/steamcommunity.com\/id\/byteframe\/recommended\/[0-9]*/g).filter((element, index) => index % 2 == 0)) => (
      state.reviewed = state.reviewed.concat(_reviews.map((link) => parseInt(link.substr(52)))),
      setTimeout(get_reviews, 3000, p-1))))()
//------------------------------------------------------------------------------ CheckReviews2023
get_review_timer = 1250;
get_reviews = (p = 235) =>
  http(accounts[0], 'my/recommended/?p=' + p, null, (body, response, error, _reviews = body.match(/https\:\/\/steamcommunity.com\/id\/byteframe\/recommended\/[0-9]*/g).filter((element, index) => index % 2 == 0)) =>
    (get_review = (r = 0) =>
      (r == _reviews.length) ?
        get_reviews(p-1)
      : (data.review.indexOf(parseInt(_reviews[r].substr(52))) > -1 || state.reviewed.indexOf(_reviews[r].substr(52)) > -1) ?
        get_review(r+1)
      : http(accounts[0], _reviews[r], null, (body, response, error, text = Cheerio.load(body)('textarea')[0].children[0].data, x = body.indexOf('UserReview_Report')+21, id = body.substr(x-1, (body.indexOf("'", x)-x)+1)) => (
          (text.indexOf('937093789') == -1 && bookmarked.indexOf(_reviews[r].substr(52)) == -1) && (
            state.reviewed.push(_reviews[r].substr(52)),
            console.log(" -- " + _reviews[r])),
          setTimeout(get_review, get_review_timer, r+1))))())
sharedconfig.forEach((appid) =>
  (state.reviewed.indexOf(appid) == -1) &&
    console.log('https://store.steampowered.com/app/' + appid))
//------------------------------------------------------------------------------ BatchReviewEdit2023
(blurb_link_reviews = (i = 0) =>
  (state.blurbed.indexOf(data.review[i]) == -1) ?
    http(accounts[0], 'my/recommended/' + data.review[i], null, (body, response, error, x = body.indexOf('UserReview_Report')+21) =>
      http(accounts[0], 'userreviews/update/' + body.substr(x-1, (body.indexOf("'", x)-x)+1), { received_compensation: false, review_text: Cheerio.load(body)('textarea')[0].children[0].data + " [h1]" + generate_fortune('all', 1, 55, 60), voted_up: true }, (body, response, error) => (
        state.blurbed.push(data.review[i]),
        console.log("  blurbed review: https://steamcommunity.com/my/recommended/" + data.review[i] ),
        setTimeout(blurb_link_reviews, 60000*10, i+1)))))()
  : blurb_link_reviews(i+1)
//------------------------------------------------------------------------------ BatchReviewEdit2021
review_speed=360000;
(get_reviews = (p = 46) =>
  (p != 5) &&
    http(accounts[0], 'my/recommended/?p=' + p, null, (body, response, error,
      _reviews = body.match(/https\:\/\/steamcommunity.com\/id\/byteframe\/recommended\/[0-9]*/g).filter((element, index) => index % 2 == 0)) =>
        (get_review = (r = 0) =>
          (r == _reviews.length) ?
            get_reviews(p-1)
          : http(accounts[0], _reviews[r], null, (body, response, error,
            appid = _reviews[r].substr(52),
            rating = (body.match("thumbsUp.png") ? true: false),
            text = Cheerio.load(body)('textarea')[0].children[0].data,
            x = body.indexOf('UserReview_Report')+21,
            id = body.substr(x-1, (body.indexOf("'", x)-x)+1)) => (
              (text.indexOf('youtu') > -1) &&
                http(accounts[0], 'userreviews/update/' + id, { received_compensation: false, review_text: text.replace(/ https:\/\/(www\.)*(youtube|youtu)\.(be|com)\/.+/, ''), voted_up: rating }, (body, response, error) =>
                  console.log(" -- https://steamcommunity.com/my/recommended/" + appid)),
              setTimeout(get_review, review_speed, r+1))))()))()
update_review = (i = 0, speed = 120000) =>
  (data.review.length != i) && (
    console.log('update_review: ' + i),
    http(accounts[0], 'my/recommended/' + data.review[i], null, (body, response, error,
      x = body.indexOf('UserReview_Report')+21) => 
      http(accounts[0], 'userreviews/update/' + body.substr(x-1, (body.indexOf("'", x)-x)+1), { received_compensation: false, review_text: generate_links(), voted_up: true }, (body, response, error) => (
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
  account.http('https://steamcommunity.com/userreviews/update/' + review_data[r].id, {
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
//------------------------------------------------------------------------------ GetReviewsOld
(get_reviews = (p = 1) =>
  (p != 0) &&
    http(accounts[0], 'my/recommended/?p=' + p, null, (body, response, error,
      _reviews = body.match(/https\:\/\/steamcommunity.com\/id\/byteframe\/recommended\/[0-9]*/g).filter((element, index) => index % 2 == 0)) =>
        setTimeout(() =>
          (get_review = (r = 0) =>
            (r == _reviews.length) ?
              setTimeout(() => get_reviews(p-1), 3000)
            : http(accounts[0], _reviews[r], null, (body, response, error, appid = _reviews[r].substr(52)) => (
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
"bad_review": [ 1448030,1501360,1658830,1540960,1587180,1390860,1542010,1547070,1760080,
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