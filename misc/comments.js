//------------------------------------------------------------------------------ GetCommentsCondtionalReverseBeforeMultiPage
get_comments2 = (a, p = 1) => 
  http(a, 'my/allcomments?ctp=' + p, null, (_b, r, x, b = Cheerio.load(_b)) =>
    b('.commentthread_comment').toArray().reverse().forEach((e, i, k,
      id = e.attribs['id'].substr(8),
      steamid = "765"+(+b('#comment_' + id + " a")[0].attribs['data-miniprofile'] + 61197960265728),
      contents = b("#comment_content_" + id).contents().toString().replace(/<img src="[:\.\/A-Za-z0-9_]+" alt="/g, '').replace(/" class="emoticon">/g, '').replace(/<br>/g, '\n').trim()) =>
        (contents.includes("needs_content_check")) ? true : (
          (!s.comments[0].includes(contents)) ? (
            a.comments[i] = { id: id, contents: contents, steamid: steamid },
            s.comments[0].push(contents),
            s.comments[1].push(id))
          : (!s.comments[1].includes(id)) && (
              log(a, 'SESSION | deleteUserComment: ' + (id + "| " + contents.slice(0,32)).yellow),
              a.c.deleteUserComment(a.steamID, id)), true))),
//------------------------------------------------------------------------------ OlderCommentDaily
a.u.on('newComments', (count, myItems) =>
  (a.comment_timer == null && count > 0) && (
    a.comment_timer = setTimeout(() => (
      delete a.comment_timer,
      http(a, 'my/commentnotifications', { action: 'markallread' }),
      (myItems > 0) && (
        log(a, "SESSION | newComments: https://steamcommunity.com/" + profile_url(a) + "/commentnotifications " + ("total=" + s.comments.length).yellow),
        s.A[a.i].comments = [],
        http(a, 'my/allcomments', null, (_b, r, x, b = Cheerio.load(_b)) =>
          b('.commentthread_comment').each((i, e,
            id = e.attribs['id'].substr(8),
            steamid = "765"+(+b('#comment_' + id + " a")[0].attribs['data-miniprofile'] + 61197960265728),
            timestamp = b('#comment_' + id + " span")[0].attribs['data-timestamp'],
            contents = b("#comment_content_" + id).contents().toString().replace(/<img src="[:\.\/A-Za-z0-9_]+" alt="/g, '').replace(/" class="emoticon">/g, '').replace(/<br>/g, '\n').trim()) =>
              (contents.includes("needs_content_check")) ? true : (
                (!s.A[a.i].comments.hasOwnProperty(steamid)) && (
                  s.A[a.i].comments[steamid] = []),
                (s.A[a.i].comments[steamid].findIndex((comment) => comment.contents == contents) == -1) ?
                  s.A[a.i].comments[steamid].push({ id: id, timestamp: timestamp, contents: contents })
                : (s.A[a.i].comments[steamid].findIndex((comment) => comment.id == id) == -1) &&
                  a.c.deleteUserComment(a.steamID, id), true))))), 15000))),
//------------------------------------------------------------------------------ GatherCommentsUnified2Reversed
comments = [],
comments_ids = [],
dupe_comments = [],
(gather_comments = (a, p = 962) =>
  http(a, 'my/allcomments?ctp=' + p, null, (_b, response, err, body = Cheerio.load(_b)) => (
    body('.commentthread_comment').toArray().reverse().forEach((e, i, k,
      id = e.attribs['id'].substr(8),
      contents = body("#comment_content_" + id).contents().toString().replace(/<img src="[:\.\/A-Za-z0-9_]+" alt="/g, '').replace(/" class="emoticon">/g, '').replace(/<br>/g, '\n').trim()) =>
      (!comments.includes(contents)) ? (
        comments_ids.push(id),
        comments.push(contents))
      : dupe_comments.push(id)),
    console.log('processed_page: ' + p),
    (p > 1) ?
      gather_comments(a, p-1)
    : console.log('done'))))(A[0]);
//------------------------------------------------------------------------------ Delete_dupe_comment2
(delete_dupe_comment = () =>
  (dupe_comments.length > 0) && (
    http(A[0], 'comment/Profile/delete/76561197961017729/-1/', { count: 6, feature2: -1, gidcomment: dupe_comments.shift() }),
    setTimeout(delete_dupe_comment, 2000)))()
//------------------------------------------------------------------------------ GatherCommentsWithBrokenPageCheck2023
...http(account, 'my/allcomments?ctp=' + p, null, (_b, response, err, body = Cheerio.load(_b), pages = NeedsToGetMobileSiteIThink) =>
...gather_comments(p-1))))(pages+1-state.accounts[account.index].comment_pages)), 8000)))))),
//------------------------------------------------------------------------------ DupeDelete
(delete_dupe_comment = () =>
  (state.dupes.length > 0) && (
    http(accounts[0], 'comment/Profile/delete/76561197961017729/-1/', { count: 6, feature2: -1, gidcomment: state.dupes.shift().id }),
    setTimeout(delete_dupe_comment, 2000)))()
//------------------------------------------------------------------------------ DupeFind
dupes = [],
Object.keys(state.accounts[0].comments).forEach((steamid, i, texts = []) =>
  state.accounts[0].comments[steamid].forEach((comment) =>
    (texts.indexOf(comment.contents) == -1) ?
      texts.push(comment.contents)
    : dupes.push(comment))),
console.dir(dupes);
//------------------------------------------------------------------------------ CountComments
comment_count = 0; Object.keys(state.accounts[0].comments).forEach((steamid) => comment_count += state.accounts[0].comments[steamid].length)
//------------------------------------------------------------------------------ GatherComments2023
state.accounts[0].comments = {},
(gather_comments = (account, p = 957) =>
  http(account, 'my/allcomments?ctp=' + p, null, (_body, response, err, body = Cheerio.load(_body)) => (
    body('.commentthread_comment').each((i, element,
      cid = element.attribs['id'].substr(8),
      steamid = translate_id(body('#comment_' + cid + " a")[0].attribs['data-miniprofile']),
      timestamp = body('#comment_' + cid + " span")[0].attribs['data-timestamp'],
      contents = body("#comment_content_" + cid).contents().toString().trim().replace(/" class="emoticon">/g, '').replace(/<img src="https:\/\/community.akamai.steamstatic.com\/economy\/emoticon\/[A-Za-z0-9_]+" alt="/g, '').replace(/<br>$/, '')) => (
      (!state.accounts[0].comments.hasOwnProperty(steamid)) && (
        state.accounts[0].comments[steamid] = []),
      state.accounts[0].comments[steamid].push({ id: cid, timestamp: timestamp, contents: contents}))),
    console.log('processed_page: ' + p),
    (p > 1) ?
      gather_comments(account, p-1)
    : console.log('done'))))(accounts[0]);
//------------------------------------------------------------------------------ OringalNotifcationEvent
(count) && (
  accounts[0].comment_check = myItems)),
(accounts[0].comment_timer == null && count > 0) && (
   accounts[0].comment_timer = setTimeout(() => (
     http(accounts[0], 'my/commentnotifications', { action: 'markallread' }),
     delete accounts[0].comment_timer), 10000))),
//------------------------------------------------------------------------------ ShelveComplicatedCommentChecker
(accounts[0].comment_check > 0) &&
  http(accounts[0], 'my/allcomments', null, (_body, response, err, body = Cheerio.load(_body), players = {}) =>
    body('.commentthread_comment').each((i, element, cid = element.attribs['id'].substr(8),
      steamid = translate_id(body('#comment_' + cid + " a")[0].attribs['data-miniprofile']),
      contents = body("#comment_content_" + cid).contents().toString().trim()) =>
      (!players.hasOwnProperty(steamid)) ?
        players[steamid] = [ contents ]
      : (players[steamid].indexOf(contents) == -1) ?
        players[steamid].push(contents)
      : http(accounts[0], 'comment/Profile/delete/76561197961017729/-1/', { count: 6, feature2: -1, gidcomment: state.comments.shift() }))),
//------------------------------------------------------------------------------ SelfPostAndDeleteLatterBroken
http(accounts[0], 'my/allcomments', null, (_body, response, err, body = Cheerio.load(_body),
  last = body('.commentthread_comment').last(),
  count = +_body.match(/total_count\":[0-9]*/)[0].substr(13)) =>
  post_comment(accounts[0], accounts[0].steamID, generate_fortune('all', 1, 900, 950), 0, -1, () =>
    (count > 49750) &&
      http(accounts[0], 'comment/Profile/delete/76561197961017729/-1/', { count: 6, feature2: -1, gidcomment: last.attribs['id'].substr(8) })))
//------------------------------------------------------------------------------ Haiku
haiku = require('haiku-random'),
(args, pools = shuffle_array([8, 2, 3, 4, 5]),
  haikus = [...Array(3).keys()].map((i) =>
    haiku.random("html").toString().replace(/<br>/g, '\n').split('\n'))) =>
  pool(data.emoticons[pools[0]], 10) + "\n[i]"
  + "[b][u] Here's Some Haiku for You...[/u][/b]\n"
  + pool(data.emoticons[pools[1]], 10) + "\n"
  + " » " + haikus[0][0] + " " + pool(data.ascii) + " \n"
  + " » " + haikus[0][1] + " " + pool(data.ascii) + " \n"
  + " » " + haikus[0][2] + " " + pool(data.ascii) + " \n"
  + pool(data.emoticons[pools[2]], 10) + "\n"
  + " » " + haikus[1][0] + " " + pool(data.ascii) + " \n"
  + " » " + haikus[1][1] + " " + pool(data.ascii) + " \n"
  + " » " + haikus[1][2] + " " + pool(data.ascii) + " \n"
  + pool(data.emoticons[pools[3]], 10) + "\n"
  + " » " + haikus[2][0] + " " + pool(data.ascii) + " \n"
  + " » " + haikus[2][1] + " " + pool(data.ascii) + " \n"
  + " » " + haikus[2][2] + " " + pool(data.ascii) + " \n"
  + pool(data.emoticons[pools[4]], 10),
//------------------------------------------------------------------------------ GetComments
comments = {},
get_comments = (account, p = 995) =>
  http(account, 'my/allcomments?ctp=' + p, null, (_body, response, err, body = Cheerio.load(_body)) => (
    body('.commentthread_comment').each((i, element, cid = element.attribs['id'].substr(8)) =>
      comments[cid] = {
        steamid: translate_id(body('#comment_' + cid + " a")[0].attribs['data-miniprofile']),
        timestamp: body('#comment_' + cid + " span")[0].attribs['data-timestamp'],
        contents: body("#comment_content_" + cid).contents().toString().trim() }),
    console.log('processed_page: ' + p),
    (p > 1) ?
      setTimeout(get_comments, 250, account, p-1)
    : console.log('done')));
get_comments(accounts[0]);
//------------------------------------------------------------------------------ ProcessComments1
new_comments = {},
process_comments1 = (comments = JSON.parse(fs.readFileSync('comments1.json', 'utf8')),
  max = Object.keys(comments).length) => {
  for (var c = 0; c < max; c++) {
    if (c % 100 == 0) console.log(c);
    var steamid = comments[Object.keys(comments)[c]].steamid;
    if (!new_comments.hasOwnProperty(steamid)) {
      new_comments[steamid] = [];
    }
    new_comments[steamid].push({
      id: Object.keys(comments)[c],
      steamid: steamid,
      timestamp: comments[Object.keys(comments)[c]].timestamp,
      contents: comments[Object.keys(comments)[c]].contents
    });
  }
  fs.writeFileSync('comments2.json', JSON.stringify(new_comments, null, 2));
  console.log('done');
};
//------------------------------------------------------------------------------ ProcessComments1b
new_commentsb = [],
duplicate_texts = [],
texts = [],
process_comments1b = (comments = JSON.parse(fs.readFileSync('comments1.json', 'utf8')),
  max = Object.keys(comments).length) => {
  for (var c = 0; c < max; c++) {
    if (c % 100 == 0) console.log(c);
    (texts.indexOf(comments[Object.keys(comments)[c]].contents) == -1) ?
      texts.push(comments[Object.keys(comments)[c]].contents)
    : ( duplicate_texts.push(comments[Object.keys(comments)[c]].contents),
        new_commentsb.push(Object.keys(comments)[c]) );
  }
  fs.writeFileSync('comments2b.json', JSON.stringify(new_commentsb, null, 2));
  console.log('process_comments1b');
};
//------------------------------------------------------------------------------ ProcessComments2
process_comments2 = (comments = JSON.parse(fs.readFileSync('comments2b.json', 'utf8')),
  new_comments = [],
  max = Object.keys(comments).length) => {
  for (var c = 0; c < max; c++) {
    var texts = [];
    var steamid = Object.keys(comments)[c];
    comments[steamid].forEach((comment) => {
      if (texts.indexOf(comment.contents) == -1) {
        texts.push(comment.contents);
      } else {
        new_comments.push(comment.id);
      }
    });
  }
  console.log('done');
};
//------------------------------------------------------------------------------