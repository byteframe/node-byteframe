//------------------------------------------------------------------------------ ForceOnPrivate
(privacy == 1) ?
  s.force_steamid = mix(Object.keys(A[0].u.myFriends))[0]
: delete s.force_steamid,
//------------------------------------------------------------------------------ SelfBumper
A[0].c.postUserComment(A[0].steamID, fortune(), (x) =>
  !x && setTimeout(() => http(A[0], 'my/allcomments', null, (_b, r, x, b = Cheerio.load(_b)) => 
    b('.commentthread_comment').toArray().some((e, i, E, id = e.attribs['id'].substr(8), steamid = "765"+(+b('#comment_' + id + " a")[0].attribs['data-miniprofile'] + 61197960265728)) =>
      steamid == A[0].steamID && ( A[0].c.deleteUserComment(A[0].steamID, id), true)))), 20000),
//------------------------------------------------------------------------------ LastProfilesScrap
get_friends(a, 'profiles/' + s.last_profiles[Math.floor(Math.random()*s.last_profiles.length)] + "/friends", (F) =>
  commenter(a, check_replies, false, strangers = F.filter((f) => s.last_profiles.indexOf(f) == -1).map((f) => [ '', f ])))
//------------------------------------------------------------------------------ VariousStorageMethods
s.A[0].comments = [ [], [] ],
(gather_comments = (a, p = 988) =>
  http(a, 'my/allcomments?ctp=' + p, null, (_body, response, err, body = Cheerio.load(_body)) => (
    body('.commentthread_comment').toArray().reverse().forEach((e, i, k,
      id = e.attribs['id'].substr(8),  
      steamid = "765"+(+b('#comment_' + id + " a")[0].attribs['data-miniprofile'] + 61197960265728),      
      contents = body("#comment_content_" + id).contents().toString().trim().replace(/<img src="[:\.\/A-Za-z0-9_]+" alt="/g, '').replace(/" class="emoticon">/g, '').replace(/<br>/g, '\n')) => (
      timestamp = body('#comment_' + cid + " span")[0].attribs['data-timestamp'],
        {
          s.A[a.i].comments[0].push(contents),
          s.A[a.i].comments[1].push(id),
        }
        {
          comments[cid] = {
          steamid: translate_id(body('#comment_' + cid + " a")[0].attribs['data-miniprofile']),
          timestamp: body('#comment_' + cid + " span")[0].attribs['data-timestamp'],
          contents: body("#comment_content_" + cid).contents().toString().trim() }
        }
        {
          (!s.A[0].comments.hasOwnProperty(steamid)) && (
            s.A[0].comments[steamid] = []),
          s.A[0].comments[steamid].push({ id: cid, timestamp: timestamp, contents: contents}))),
        }
        {
          (s.A[a.i].comments[0].includes(contents)) ?
            (!s.A[a.i].comments[1].includes(id)) && (
              log(a, 'SESSION | deleteUserComment: ' + ('https://steam.pm/' + steamid + " / " + id + "|" + contents.slice(0,32)).yellow),
              a.c.deleteUserComment(a.steamID, id))
          :(a.comments[i] = { id: id, contents: contents, steamid: steamid },
            s.A[a.i].comments[0].push(contents),
            s.A[a.i].comments[1].push(id)), true)),
        }
        {
          (!contents.includes("needs_content_check") && steamid != a.steamID && !s.A[a.i].comments[1].includes(id)) && (
            (s.A[a.i].comments[0].includes(contents)) && (
              a.c.deleteUserComment(a.steamID, s.A[a.i].comments[1][index]),
              log(a, 'SESSION | deleteUserComment: ' + ('https://steam.pm/' + steamid + " / " + s.A[a.i].comments[1][index] + "|" + contents.slice(0,32)).yellow),
              s.A[a.i].comments[0].splice(index, 1),
              s.A[a.i].comments[1].splice(index, 1)),
            a.comments[i] = { id: id, contents: contents, steamid: steamid },
            s.A[a.i].comments[0].push(contents),
            s.A[a.i].comments[1].push(id)),
        }
        {
          (!s.A[a.i].comments.hasOwnProperty(steamid)) && (
            s.A[a.i].comments[steamid] = []),
          (s.A[a.i].comments[steamid].findIndex((comment) => comment.contents == contents) == -1) ?
            s.A[a.i].comments[steamid].push({ id: id, timestamp: timestamp, contents: contents })
          : (s.A[a.i].comments[steamid].findIndex((comment) => comment.id == id) == -1) &&
            a.c.deleteUserComment(a.steamID, id)
        }
      )),
    console.log('processed_page: ' + p),
    (p > 1) ?
      setTimeout(gather_comments, 1250, a, p-1)
    : console.log('done'))))(A[0]);      
//------------------------------------------------------------------------------ BatchDeleteComments
(delete_dupe_comment = () =>
  (dupe_comments.length > 0) && (
    http(A[0], 'comment/Profile/delete/76561197961017729/-1/', { count: 6, feature2: -1, gidcomment: dupe_comments.shift() }),
    setTimeout(delete_dupe_comment, 2000)))()
//------------------------------------------------------------------------------ CheckUserComments
dupes = [],
Object.keys(s.A[0].comments).forEach((steamid, i, texts = []) =>
  s.A[0].comments[steamid].forEach((comment) =>
    (texts.indexOf(comment.contents) == -1) ?
      texts.push(comment.contents)
    : dupes.push(comment))),
console.dir(dupes);
comment_count = 0; Object.keys(s.A[0].comments).forEach((steamid) => comment_count += s.A[0].comments[steamid].length)
//------------------------------------------------------------------------------ SelfPostAndDelete
http(accounts[0], 'my/allcomments', null, (_body, response, err, body = Cheerio.load(_body),
  last = body('.commentthread_comment').last(),
  count = +_body.match(/total_count\":[0-9]*/)[0].substr(13)) =>
  post_comment(accounts[0], accounts[0].steamID, generate_fortune('all', 1, 900, 950), 0, -1, () =>
    (count > 49750) &&
      http(accounts[0], 'comment/Profile/delete/76561197961017729/-1/', { count: 6, feature2: -1, gidcomment: last.attribs['id'].substr(8) })))
//------------------------------------------------------------------------------ ProcessComments
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
//------------------------------------------------------------------------------ StartProfileCommenterProcedural
const POST_MAX = 190;
var force_steamid = null;
ms_until_tomorrow = () => {
  var now = new Date();
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()+1, 0)-now;
};
calculate_delay = (minus = 0) => {
  return Math.max(90000, Math.floor((ms_until_tomorrow()-1800000)/(config.byteframe.post_free-minus)));
};
var cooldown_count = 0;
start_profile_commenter = (account) => {
  var date = new Date();
  if (config.byteframe.day != date.getUTCDay()) {
    config.byteframe.day = date.getUTCDay();
    config.byteframe.post_free = POST_MAX;
  }
  if (config.byteframe.post_free < 1) {
    return setTimeout(start_profile_commenter, ms_until_tomorrow(), account);
  }
  setTimeout(start_profile_commenter, calculate_delay(1), account);
  var friends = Object.keys(account.user.myFriends).filter((friend) => {
    return account.user.myFriends[friend] == 3 || account.user.myFriends[friend] == 6;
  });
  if (friends.indexOf(config.byteframe.last_steamid) >= friends.length) {
    config.byteframe.last_steamid = friends[0];
  }
  account.http_request('my/allcomments', null, (body, response, err) => {
    var last_replyer = -1
      , replies = Cheerio.load(body)('div.commentthread_comment_author').toArray().reverse().map((item, index) => {
          reply = Cheerio.load(item);
          return [ reply('a.actionlink')[0].attribs.href.substr(73, 19).match(/\d+/g)[0],
            translate_id(reply('a.commentthread_author_link')[0].attribs['data-miniprofile']) ];
        });
    (check_replies = (r) => {
      post_comments = (steamid, reply = '') => {
        account.http_request('profiles/' + steamid + '/allcomments' + reply, null, (body, response, err) => {
          increment_last_steamid = () => {
            if (steamid == config.byteframe.last_steamid) {
              config.byteframe.last_steamid = friends[friends.indexOf(config.byteframe.last_steamid)+1];
            }
          };
          check_comments = (body, steamid, count) => {
            if (steamid_blacklist.indexOf(steamid) > -1 || steamid == account.user.steamID
            || body.indexOf('commentthread_textarea') == -1) {
              return true;
            }
            var comments = body.match(/commentthread_author_link" href="https:\/\/.*?"/g);
            if (comments) {
              for (var i = 0; i < comments.length && i < count; i++) {
                if (comments[i].slice(33,-1) == 'https://steamcommunity.com/id/byteframe') {
                  return true;
                }
              }
            }
            return false;
          };
          if (check_comments(body, steamid, 6)) {
            increment_last_steamid();
            return check_replies(r+1);
          }
          var comment_message = pool_elements(comment_messages, 1, null)[0];
          (try_comment_message = () => {
            var msg = comment_message(body.match(/<title>.*<\/title>/)[0].slice(26,-28));
            if (msg.length > 975) {
              return try_comment_message();
            }
            increment_last_steamid();
            account.post_comment((!force_steamid ? steamid : force_steamid), msg, 3, -1, () => {
              config.byteframe.post_free--;
            });
          })();
        });
      };
      if (r < replies.length) {
        config.byteframe.reply = replies[r][0];
        if (replies[r][1] != last_replyer) {
          last_replyer = replies[r][1];
          return post_comments(replies[r][1], '?REPLY');
        }
        return check_replies(r+1);
      }
      post_comments(config.byteframe.last_steamid);
    })(replies.findIndex((reply) => { return reply[0] == config.byteframe.reply; })+1);
  });
};
//------------------------------------------------------------------------------ JQueryCommunitySpammer
ToggleManageFriends();
jQuery("#manage_friends").after('<div class="commentthread_entry"><div class="commentthread_entry_quotebox"><textarea rows="1" class="commentthread_textarea" id="comment_textarea" placeholder="Add a comment" style="overflow: hidden; height: 20px;"></textarea></div><div class="commentthread_entry_submitlink" style=""><a class="btn_grey_black btn_small_thin" href="javascript:CCommentThread.FormattingHelpPopup( \'Profile\' );"><span>Formatting help</span></a> &nbsp; <span class="emoticon_container"><span class="emoticon_button small" id="emoticonbtn"></span></span><span class="btn_green_white_innerfade btn_small" id="comment_submit"><span>Post Comments to Selected Friends</span></span></div></div><div id="log"><span id="log_head"></span><span id="log_body"></span></div>');
new CEmoticonPopup( $J('#emoticonbtn'), $J('#commentthread_Profile_0_textarea') );
jQuery("#comment_submit").click(function() {
  const total = jQuery(".selected").length;
  const msg = jQuery("#comment_textarea").val();
  if (total > 0 && msg.length > 0) {
    jQuery("#log_head, #log_body").html("");
    jQuery(".selected").each(function(i) {
      let profileID = this.getAttribute("data-steamid");
      (function(i, profileID) {
        setTimeout(function() {
          jQuery.post("//steamcommunity.com/comment/Profile/post/" + profileID + "/-1/", { comment: msg, count: 6, sessionid: g_sessionID }, function(response) {
            if (response.success === false) {
              jQuery("#log_body")[0].innerHTML += "<br>" + response.error;
            } else {
              jQuery("#log_body")[0].innerHTML += "<br>Successfully posted comment on <a href=\"http://steamcommunity.com/profiles/" + profileID + "\">" + profileID + "</a>";
            }
          }).fail(function() {
            jQuery("#log_body")[0].innerHTML += "<br>Failed to post comment on <a href=\"http://steamcommunity.com/profiles/" + profileID + "\">" + profileID + "</a>";
          }).always(function() {
            jQuery("#log_head").html("<br><b>Processed " + (i+1) + " out of " + total + " friends.<b>");
          });
        }, i * 6000);
      })(i, profileID);
    });
  } else {
    alert("Please make sure you entered a message and selected 1 or more friends.");
  }
});