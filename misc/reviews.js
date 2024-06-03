//------------------------------------------------------------------------------ DeleteReviewAndCollection
delete_review = (g, i = profile.review.slots[0].indexOf(+g)) => (
  http(A[0], 'https://store.steampowered.com/curator/2751860-primarydataloop/admin/ajaxdeletereview/', { appid: g }),
  http(A[0], 'https://steamcommunity.com/id/byteframe/recommended/', { action: 'delete', appid: g }),
  i > -1 && profile.review.slots[0].splice(i, 1),
  delete s.A[0].reviews[g])
//------------------------------------------------------------------------------ PriorCuration
curate = (a = A[0], g, rating = s.A[a.i].reviews[g].rating, t = s.A[a.i].reviews[g].contents) =>
  http(a, 'https://store.steampowered.com/curator/2751860-primarydataloop/admin/ajaxgetassociatedappslist/', null, (b) => (
    (b.recommendations.length >= 1999) &&
      http(a, 'https://store.steampowered.com/curator/2751860-primarydataloop/admin/ajaxdeletereview/', { appid: b.recommendations.pop().appid }),
    http(a, "https://store.steampowered.com/curator/2751860-primarydataloop/admin/ajaxcreatereview/", { appid: g, recommendation_state: (!rating ? 1 : 0),
      link_url: "https://steamcommunity.com/" + profile_url(a) + "/recommended/" + g,
      blurb: (!t.includes('sharedfiles') && !t.includes('[table]')) ? t.substr(0,197).replace(/\[[/]*spoiler\]/g, '') + "..." : pool(responses, 1, null)[0]().replace(/-- .*/, '') }, () =>
        log(a, 'SUCCESS | ajaxcreatereview: ' + ("https://store.steampowered.com/curator/2751860-primarydataloop/admin/reviews_manage #(" + g +")").yellow)))),        
//------------------------------------------------------------------------------ UpdateReviewOnMinute
(profile.review.last != '') &&
  get_reviews(a, 0, true, profile.review.last),
//------------------------------------------------------------------------------ Review2024
post_review_2024 = (g, q = 14, items = mix([pool(d.items_review2_a[0]), pool(d.items_review2_a[1])]), m = "[h1]" + pool(d.emojis.flat()) + " " + fortune('all', 1, 55, 60) + " " + pool(d.emojis.flat()) + "[/h1][table][tr][td]" + items[0] + "[/td][td]" + emote(q).replace(/:/g, 'ː') + "\n" + emote(q).replace(/:/g, 'ː') + "[/td][td]" + items[1] + "[/td][/tr][/table]", a= A[0]) =>
  http(a, 'https://store.steampowered.com/friends/recommendgame', {
    appid: g, steamworksappid: g, comment: m, rated_up: true, is_public: true, language: 'english', received_compensation: 0, disable_comments: 0}, (b, r, e) => (
      log(a, 'SESSION | recommendgame: https://steamcommunity.com/my/recommended/' + g),
      profile.review = { moves: [], types: [ -1 ], slots: [ [ g ] ] },
      get_reviews(a, 0, true, [ g ])))
insert_emoji_review = (g, q = 1, _t = s.A[0].reviews[g].contents.replace('[td]ː', '[td]' + emote(q).replace(/:/g, 'ː') + 'ː'), t = _t.replace('ː[/td]', 'ː' + emote(q).replace(/:/g, 'ː') + "[/td]")) => (
  log(A[0], "SUCCESS | userreviews/update(ing): " + ("https://steamcommunity.com/" + profile_url(A[0]) + "/recommended/" + g).yellow),
  http(A[0], 'userreviews/update/' + s.A[0].reviews[g].id, { received_compensation: false, voted_up: true, review_text: t }, (b, r, x) => (
    s.A[0].reviews[g].contents = t)));
//------------------------------------------------------------------------------ Review2023
insert_emojis = (text) => (
  d.emojis.i = 0,
  text.replace(/YYY/g, () => pool(pool(d.emojis, 1, null, false)[0])))
generate_emoji_fortune = (size, file = 'all', text = fortune(file, 1, size, size).split(' ')) => (
  [...Array(3).keys()].forEach((i) =>
    text[(i+1)*(Math.floor((text.length+1)/4)-1)] += " YYY"),
  insert_emojis("YYY " + text.join(' ') + " YYY"))
post_review_sheet_2023 = (a, g, h1, h2, h3, _m = shuffle(d.links_steam),
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
emoji_update_review = (a, g, q) =>
  http(a, 'userreviews/update/' + s.A[a.i].reviews[g].id, { received_compensation: false, voted_up: true, review_text: s.A[a.i].reviews[g].contents.replace("[/td]", "[/td][td]" + [...Array(q).keys()].map((e) => pool(pool(d.emojis, 1, null)[0])).join('') + "\n" + [...Array(q).keys()].map((e) => pool(pool(d.emojis, 1, null)[0])).join('') + "[/td]"        ) }, (b, r, x) =>
    log(a, "SUCCESS | userreviews/update: " + ("https://steamcommunity.com/" + profile_url(a) + "/recommended/" + g).yellow),
    get_reviews(a, 0, true, [g]))
//------------------------------------------------------------------------------ FixReviews
fix_reviews_multi = () =>
  Object.entries(s.A[0].reviews).some((e, i) => (
    ((e[1].contents.includes("youtube.com") || e[1].contents.includes("youtu.be")) && !e[1].banned) && (
      {
        review_edit_m = e[1].contents.replace(/.*\[h1]/, '[h1]' + pool(d.emojis_bulk) + " ").replace(/\[\/h1]/, " " + pool(d.emojis_bulk) + '[/h1]'),
        review_text: e[1].contents.replace(/id\/byteframe/g, "profiles/76561197961017729")
      }
      {
        review_text: ((state.accounts[account.index].reviews[data.review[index]].contents.indexOf('[/h1]') == -1) ? state.accounts[account.index].reviews[data.review[index]].contents : state.accounts[account.index].reviews[data.review[index]].contents.substr(0, state.accounts[account.index].reviews[data.review[index]].contents.indexOf('[/h1]'))) + "[/h1][quote=" + generate_emoji_fortune(50, 'all') + "][table][tr][td]" + data.review_items[index].join('[/td][td]') + "[/td][/tr][/table][/quote]" }, (body, response, error) => (
      }
      {
        review_text: Cheerio.load(body)('textarea')[0].children[0].data + " [h1]" + generate_fortune('all', 1, 55, 60)
      }
      {
        review_edit_m_a = pool(pool(d.items_review, 1, null, false)[0]),
        review_edit_m_b = pool(pool(d.items_review, 1, null, false)[0]),
        review_edit_m_c = (review_edit_m_a.includes('#845870') || review_edit_m_b.includes('#845870')) ? 11 : 10,
        review_edit_m = "https://www.youtube.com/watch?v=" + e[1].contents.match(/https:\/\/(www.)?youtu.+ \[h/)[0].slice(0,-3).slice(8).replace('www\.', '').replace('youtu.be/', '').replace('youtube.com/watch?v=', '').replace(/\?.*/, '').replace(/\&.*/, '') + " [h1]" + fortune('all', 1, 55, 60).replace(/[\[\]]g/, '') + "[/h1][table][tr][td]" + review_edit_m_a + "[/td][td]" + emote(review_edit_m_c).replace(/:/g, 'ː') + "\n" + emote(review_edit_m_c).replace(/:/g, 'ː') + "[/td][td]" + review_edit_m_b + "[/td][/tr][/table]",
      }
      log(A[0], "SUCCESS | userreviews/update(ing): " + ("https://steamcommunity.com/" + profile_url(A[0]) + "/recommended/" + e[0] + " (" + i + ")" + " #" + e[1].id).yellow),
      http(A[0], 'userreviews/update/' + e[1].id, { received_compensation: false, voted_up: true, review_text: review_edit_m }, (b, r, x) => (
        profile.review.slots[0].push(e[0]),
        profile.review.types[0] = -1,
        s.A[0].reviews[e[0]].contents = review_edit_m)),
      true))),
//------------------------------------------------------------------------------ StartupLinkGather
links = [ [], [], [] ],
Object.entries(s.A[0].reviews).forEach((e) =>
  (!e[1].banned) && (
    e[1].contents.includes('[h1]') ? profile.review.slots[0].push(+e[0])
    : e[1].contents.includes('[table]') ? profile.review2.slots[0].push(+e[0])
    : profile.gamesPlayed.slots[0].push(+e[0]))),
profile.review.slots[0].forEach((e) => (
  (s.A[0].reviews.hasOwnProperty(e)) && (
    links[0].push(s.A[0].reviews[e].contents.match(/https:\/\/(www.)?youtu.+ \[h/)[0].slice(0,-3).slice(8).replace('www\.', '').replace('youtu.be/', '').replace('youtube.com/watch?v=', '').replace(/\?.*/, '').replace(/\&.*/, '')),
    links[1].push(s.A[0].reviews[e].contents.match(/https:\/\/store.steampowered.com\/app\/[0-9]+/)[0])))),
profile.review.slots[0].concat(profile.review2.slots[0]).forEach((e) => (
  (s.A[0].reviews.hasOwnProperty(e)) && (
    links[2] = links[2].concat(s.A[0].reviews[e].contents.match(/inventory\/#[0-9_]+/).map((e) => e.substr(11))))))
//------------------------------------------------------------------------------ ReviewVoteUp
http_request(a(i), 'https://steamcommunity.com/userreviews/rate/$REVIEWID', { rateup: true });
//------------------------------------------------------------------------------ FollowCurator
http_request(account, 'https://store.steampowered.com/curators/ajaxfollow', { 'clanid': 2751860 }), 3000*i)));
//------------------------------------------------------------------------------ CuratorBulkBaseFills
timers.forEach((timer) => clearTimeout(timer));
timers = [];
timing = -1;
shuffle_array(Object.keys(state.videos)).forEach((video) =>
  ((!state.reviews.hasOwnProperty(state.videos[video].appid) || !state.reviews[state.videos[video].appid].curated) && !state.videos[video].curated) &&
    timers.push(setTimeout((blurb = state.videos[video].text.substr(1, state.videos[video].text.indexOf('http')-2).substr(0,203)) =>
      http_request(accounts[0], "https://store.steampowered.com/curator/2751860-primarydataloop/admin/ajaxcreatereview", {
        appid: state.videos[video].appid,
        blurb: (blurb.length > 200) ? blurb.substr(0,200).slice(0,-3) + "..." : blurb.trim(),
        link_url: state.videos[video].link_url,
        recommendation_state: 0 }, (body, response, error) => (
          console.log('https://steamcommunity.com/sharedfiles/filedetails/?id=' + video),
          state.videos[video].curated = true)), 15000*++timing)));
timing = -1;
shuffle_array(Object.keys(state.reviews)).forEach((r) =>
  (!state.reviews[r].curated && state.reviews[r].text.indexOf('https://') > -1) && (
    console.log('https://steamcommunity.com/id/byteframe/recommended/' + r),
    setTimeout((r,
      blurb = state.reviews[r].text.substr(0, state.reviews[r].text.indexOf('[spoiler]')).replace(/\[[\/biu]*\]/g, '').substr(0,203),
      link_url = state.reviews[r].text.match(/https:\/\/.+\..+\/.+/)) => 
      http_request(accounts[0], "https://store.steampowered.com/curator/2751860-primarydataloop/admin/ajaxcreatereview", {
        appid: r,
        blurb: (blurb.length > 200) ? blurb.substr(0,200).slice(0,-3) + "..." : blurb.trim(),
        link_url: link_url[0],
        recommendation_state: (!state.reviews[r].rating ? 1 : 0) }, (body, response, error) =>
          state.reviews[r].curated = true), 20000*++timing, r)));
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
//------------------------------------------------------------------------------ ReviewVisbilityTogglers
(profile.review.hasOwnProperty('last') && profile.review.last.length > 0) && (
  http(account, 'userreviews/update/' + state.accounts[account.index].reviews[profile.review.last[0]].id, { is_public: false }),
  http(account, 'userreviews/update/' + state.accounts[account.index].reviews[profile.review_3507533.last[0]].id, { is_public: false })),
(!err) && (
  http(account, 'userreviews/update/' + state.accounts[account.index].reviews[profile.review.selection[0]].id, { is_public: true }),
  http(account, 'userreviews/update/' + state.accounts[account.index].reviews[profile.review_3507533.selection[0]].id, { is_public: true })),
(public_review = (e = 0) => (e < data.review.length) && http(accounts[0], 'userreviews/update/' + state.accounts[0].reviews[data.review[e]].id, { is_public: true }, () => setTimeout(public_review, 5000, e+1), true))()
(public_review = (e = 0) => (e < data.review_3507533.length) && http(accounts[0], 'userreviews/update/' + state.accounts[0].reviews[data.review_3507533[e]].id, { is_public: true }, () => setTimeout(public_review, 5000, e+1), true))()
//------------------------------------------------------------------------------ FirstGenerationCuration
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
//------------------------------------------------------------------------------ EditReviewsProcedural
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
