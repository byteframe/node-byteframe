//------------------------------------------------------------------------------ OringalNotifcationEvent
(count) && (
  accounts[0].comment_check = myItems)),
(accounts[0].comment_timer == null && count > 0) && (
   accounts[0].comment_timer = setTimeout(() => (
     http(accounts[0], 'my/commentnotifications', { action: 'markallread' }),
     delete accounts[0].comment_timer), 10000))),
//------------------------------------------------------------------------------ ShelveComplicatedCommentChecker
(accounts[0].comment_check > 0) &&
  http_request(accounts[0], 'my/allcomments', null, (_body, response, err, body = Cheerio.load(_body), players = {}) =>
    body('.commentthread_comment').each((i, element, cid = element.attribs['id'].substr(8),
      steamid = translate_id(body('#comment_' + cid + " a")[0].attribs['data-miniprofile']),
      contents = body("#comment_content_" + cid).contents().toString().trim()) =>
      (!players.hasOwnProperty(steamid)) ?
        players[steamid] = [ contents ]
      : (players[steamid].indexOf(contents) == -1) ?
        players[steamid].push(contents)
      : http_request(accounts[0], 'comment/Profile/delete/76561197961017729/-1/', { count: 6, feature2: -1, gidcomment: state.comments.shift() }))),
//------------------------------------------------------------------------------ SelfPostAndDeleteLatterBroken
http_request(accounts[0], 'my/allcomments', null, (_body, response, err, body = Cheerio.load(_body),
  last = body('.commentthread_comment').last(),
  count = +_body.match(/total_count\":[0-9]*/)[0].substr(13)) =>
  post_comment(accounts[0], accounts[0].steamID, generate_fortune('all', 1, 900, 950), 0, -1, () =>
    (count > 49750) &&
      http_request(accounts[0], 'comment/Profile/delete/76561197961017729/-1/', { count: 6, feature2: -1, gidcomment: last.attribs['id'].substr(8) })))
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
  http_request(account, 'my/allcomments?ctp=' + p, null, (_body, response, err, body = Cheerio.load(_body)) => (
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