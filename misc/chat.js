//------------------------------------------------------------------------------ SlowerDelay
Math.max(Math.min(n.length, 75)*speed+delay, 2000)+1000)), 
//------------------------------------------------------------------------------ OldSpamBlocking
(m.indexOf('https://t.co') > -1) ?
  ban(f.toString())
//------------------------------------------------------------------------------ RainbowChat
setInterval(() => rainbow_message = pool(questions), 100000),
rainbow_chat = (i = 0) => (
  rainbow_message = get_reply((i == 0 ? 'Walter' : ' Perry'), rainbow_message),
  console.log('MESSAGE |999| ' + (i == 0 ? '<< [Perry] <<' : '>> [Walter] >>').rainbow.bold.inverse + ' ' + rainbow_message.rainbow.bold),
  setTimeout(rainbow_chat, Math.floor((Math.random()*20000) + 10000), (i == 0 ? 1 : 0))),
//------------------------------------------------------------------------------ GroupSend
send_group_chat(account, '37338', '12023431', msg.replace(/\[\/?[biu]\]/g, '').replace(/\s+/g, ' ') + ' https://steamcommunity.com/profiles/' + steamid[1] + " #" + account.index),
send_group_chat(account, '37338', '12097217',pool(decoration.ascii_face) + " | HUMAN " + pool(decoration.emojis[0]) + (action ? ' SUBSUMED ': ' DETACHED ') + pool(decoration.emojis[1]) + " ON " + pool(decoration.emojis[2]) + " INDEX " + pool(decoration.emojis[3]) + " #" + account.index + " | - " + decoration.barcode.shuffle() + "\n" + 'https://steamcommunity.com/profiles/' + persona),
send_group_chat(account, '37338', '12023431', "# " + account.index + ' https://steamcommunity.com/sharedfiles/filedetails/?id=' + item_id),
send_group_chat(account, '37338', '12023431', '/quote << ' + account.find_name(steamid) + ' << "' + msg + '"')
send_group_chat(account, '37338', '12023431', '/code >> ' + account.find_name(steamid) + ' >> "' + reply + '"'),
//------------------------------------------------------------------------------ OldWebChatSpammer
CWebChat.prototype.MessageRandomUser = function() {
  try {
    var _chat = this;
      , Friend = this.m_ActiveFriend;
      , strMessage = "HELLO"
      , ulSteamIDActive = Friend.m_ulSteamID;
      , rgParams = {
        umqid: this.m_umqid,
        type: 'saytext',
        steamid_dst: ulSteamIDActive,
        text: strMessage
      };
    this.AddToRecentChats( Friend );
    var elMessage = _chat.m_rgChatDialogs[ Friend.m_unAccountID ].AppendChatMessage( _chat.m_User, new Date(), strMessage, CWebChat.CHATMESSAGE_TYPE_LOCALECHO );
    this.m_WebAPI.ExecJSONP(
      'ISteamWebUserPresenceOAuth', 'Message', rgParams, true ).done( function(data) {
    }).fail( function () {
      ShowAlertDialog( 'Failed to send chat message: There was an error communicating with the network. Please try again later.' );
    });
  } catch (e) {
    ShowAlertDialog('Failed to send chat message: An error was encountered while processing your request:');
  }
};
//------------------------------------------------------------------------------ ElizaInterface
ElizaBot = require('./ElizaBot.js')
elizaBot = new ElizaBot()
account.user.on('friendMessage', function(steamID, message) {
  if (message) {
    account.user.chatMessage(steamID, elizaBot.transform(message));
  }
});
//------------------------------------------------------------------------------ AimlHighTest
var aimlHigh = require('aiml-high');
var interpreter = new aimlHigh({name:'Bot', age:'42'}, 'Goodbye');
aiml_files = aiml_files.concat(
  fs.readdirSync('aiml-en-us-foundation-alice/').map(file => 'aiml-en-us-foundation-alice/'+file));
console.log(aiml_files);
interpreter.loadFiles(aiml_files);
console.log('loaded');
var callback = function(answer, wildCardArray, input){
  console.log(answer + ' | ' + wildCardArray + ' | ' + input);
};
setTimeout(function() { interpreter.findAnswer('hello', callback); }, 2000);
var few_aiml_files = [
  'reduction0.safe.aiml','reduction1.safe.aiml','reduction2.safe.aiml',
  'reduction3.safe.aiml','reduction4.safe.aiml',
  'mp0.aiml','mp1.aiml','mp2.aiml','mp3.aiml','mp4.aiml','mp5.aiml','mp6.aiml' ];
//------------------------------------------------------------------------------ B/SurlyTest
var pkg = require('./package.json');
var Surly = require('./src/Surly');
var conf = { brain: '' };
var bot = new Surly({
  brain: conf.brain
});
const Burly = require('burlyy');
const bot = new Burly({
  defaultResponse: "I don't know what you're on about.",
  name: 'Botto'
});
var prompt = 'You: ';
aiml_files = fs.readdirSync('aiml/').map(file => 'aiml/'+file);
aiml_files = aiml_files.concat(
  fs.readdirSync('aiml-en-us-foundation-alice/').map(file => 'aiml-en-us-foundation-alice/'+file));
console.log(aiml_files);
var prompt = 'You: ';
(function load_aiml_files(f = 0) {
  if (f == aiml_files.length) {
    console.log('loading file: ' + aiml_files[f]);
    bot.loadFile(aiml_files[f], function(err, response) {
      load_aiml_files(f+1);
    });
  } else {
    console.log(`${bot.name}: Hello! Type quit to quit or /help for unhelpful help.`);
    process.stdout.write(prompt);
    process.stdin.on('data', data => {
      let sentence = data.toString().replace(/\r?\n/g, '');
      if (sentence === 'quit' || sentence === 'exit') {
          console.log('Yeah, fuck off.');
          process.exit();
      }
      bot.talk(sentence, function (err, response) {
        console.log('Surly: ' + response);
        process.stdout.write(prompt);
      });
    });
  }
})();
//------------------------------------------------------------------------------ Adventure
const adventurejs = require("adventurejs");
adventure_states = {},
friend_message_echo_handlers.push((steamid, msg, account) =>
  handle_games_request(steamid, msg, account)),
friend_message_handlers.push((steamid, msg, account) =>
  handle_games_request(steamid, msg, account)),
check_credits = (userid, price) =>
  config.games[userid].credits >= price,
handle_games_request = (userid, msg, account) => {
  if (account.active_chat) {
    return;
  }
  if (typeof config.games[userid] == 'undefined') {
    config.games[userid] = { credits: 1000, blackjack: { state: 2, deck: [] } };
  }
  if (msg.indexOf('@') == 0) {
    if (typeof config.games[userid].adventure == 'undefined') {
      config.games[userid].adventure = adventurejs.makeState();
      msg = '@';
    } else if (!adventure_states.hasOwnProperty(userid)) {
      config.games[userid].adventure = adventurejs.makeState(config.games[userid].adventure);
    }
    adventure_states[userid] = 0;
    var text = config.games[userid].adventure.advance(msg.substr(1))
      , j = 0;
    for (var i = 0; i < text.length; i++) {
      if (text[i].length > 1) {
        break;
      }
      j++;
    }
    text = text.slice(j);
    j = 0;
    for (i = text.length-1; i > 0; i--) {
      if (text[i].length > 1) {
        break;
      }
      j++;
    }
    if (j > 0) {
      text = text.slice(0,-j);
    }
    account.send_chat(userid, "/code " + text.map((line) => "\"| " + line + Array(64-line.length).join(" ") + " |\"").join("\n"), null, 0);
  } else if (msg.indexOf('!') != 0) {
    return;
  }
  var trigger = msg.substr(1, (msg+" ").indexOf(' ')-1)
    , args = (msg+" ").substr(msg.indexOf(' ')).trim(); 
//------------------------------------------------------------------------------ OtherGames
if (trigger == "joke") {
  if (!check_credits(userid, 10)) {
    return account.send_chat(userid, "/quote I don't perform stand-up comedy for free!");
  }
  config.games[userid].credits -= 10;
  account.send_chat(userid, "/me Accessing Joke Matrix! 💲 " + config.games[userid].credits, () =>
    account.send_chat(userid, "/spoiler " + jokes[Math.floor(Math.random()*jokes.length)], null, 0));
} else if (trigger == "haiku") {
  if (!check_credits(userid, 5)) {
    return account.send_chat(userid, "/quote go away person / you dont have any money / no haiku for you");
  }
  config.games[userid].credits -= 5;
  account.send_chat(userid, "/me Counting the syllables...! 💲 " + config.games[userid].credits, () =>
    account.send_chat(userid, "/spoiler " + jokes[Math.floor(Math.random()*jokes.length)], null, 0));
} else if (trigger == "art") {
  if (!check_credits(userid, 15)) {
    return account.send_chat(userid, "/quote I am an artist, but I won't starve! Shoo!");
  }
  if (args == '') {
    args = text_dir[Math.floor(Math.random()*text_dir.length)];
  } else if (args == 'help') {
    return account.send_chat(userid, 'art categories\n\n: ' + text_dir.join(', '), null, 0);
  } else if (text_dir.indexOf(args) == -1) {
    return account.send_chat(userid, 'invalid art category: ' + args);
  }
  config.games[userid].credits -= 15;
  account.send_chat(userid, "/me Drawing you a picture of " + args + "! 💲 " + config.games[userid].credits, () =>
    account.send_chat(userid, "/pre " + generate_text(args), null, 0));
} else if (trigger == "slots") {
  if (!check_credits(userid, 50)) {
    return account.send_chat(userid, "/quote Not enough credits, get out of the casino!");
  }
  config.games[userid].credits -= 50;
  account.send_chat(userid, "/me Spinning the wheel! 💲 " + config.games[userid].credits, () => {
    setTimeout(() => {
      var slots_symbols = { 1: '🍊', 2: '🍉', 3: '☘️', 4: '🍋', 5: '🍫', 6: '🥓', 7: '🥗', 8: '🍒', 9: '🍇' }
        , line = [ Math.floor(Math.random()*9)+1, Math.floor(Math.random()*9)+1, Math.floor(Math.random()*9)+1 ]
        , slots_results = 0
        , string = 'You lost!';
      if (line[0] == line[1] && line[1] == line[2]) {
        slots_results = 100*line[0];
      } else {
        var line2 = line.slice().sort();
        for (var i = 0; i < line2.length-1; i++) {
          if (line2[i+1] == line2[i]) {
            slots_results = (100*line[0])/2;
          }
        }
      }
      slots_results = [ slots_results, "[ " + slots_symbols[line[0]] + " | " + slots_symbols[line[1]] + " | " + slots_symbols[line[2]] + " ]" ];
      if (slots_results[0] != 0) {
        string = 'You won ' + slots_results[0] + ' credits!';
        config[account.user.steamID.toString()].payouts += slots_results[0];
        config.games[userid].credits += slots_results[0];
      }
      string = slots_results[1] + " " + string;
      account.send_chat(userid, string);
      config[account.user.steamID.toString()].game_string = "Slots: " + slots_results[1] + " >> 💰: 666" /*+ config[account.user.steamID.toString()].payouts*/;
      account.user.gamesPlayed(config[account.user.steamID.toString()].game_string)
    }, Math.floor(Math.random() * 3000));
  });
} else if (trigger == "blackjack" || trigger == "hit" || trigger == 'stay') {
  draw = () => {
    if (config.games.blackjack_deck.length == 0) {
      [...Array(6).keys()].forEach((i) => {
        [ 'A','2','3','4','5','6','7','8','9','10','J','Q','K' ].forEach((face) => {
          [ '✤','♦','♥','♠' ].forEach((suit) => {
            config.games.blackjack_deck.push(face + suit);
          });
        });
      });
      shuffle_array(config.games.blackjack_deck);
    }
    return config.games.blackjack_deck.pop();
  };
  if (config.games[userid].blackjack.state == 2) {
    if (!check_credits(userid, 75)) {
      return account.send_chat(userid, "/quote Not enough credits, try the slots!");
    }
    config.games[userid].blackjack.state = 0;
    config.games[userid].blackjack.player_hand = [ draw(), draw() ];
    config.games[userid].blackjack.dealer_hand = [ draw(), draw() ];
    account.send_chat(userid, "/me Dealing the cards! 💲 " + config.games[userid].credits);
  }
  var new_state = 2
    , counts = [];
  (blackjack = (action = trigger) => {
    count_card = (card, total) => {
      value = 10;
      if (card[0] != 'J' && card[0] != 'Q' && card[0] != 'K') {
        value = card[0];
      }
      total[0] += (card[0] == 'A' ? 11 : value);
      total[1] += (card[0] == 'A' ? 1 : value);
    };
    var text = 'You: '
      , player_total = []
      , dealer_total = [];
    config.games[userid].blackjack.player_hand.forEach((card) => {
      text += "[" + card[0] + card[1] + "]";
      count_card(card, player_total);
    });
    text += " - Dealer: ";
    config.games[userid].blackjack.dealer_hand.forEach((card) => {
      text += "[" + card[0] + card[1] + "]";
      count_card(card, dealer_total);
    });
    text += " | ";
    if (dealer_total[0] == 21 || dealer_total[1] == 21) {
      account.send_chat(userid, text + ' Dealer has blackjack! :(');
    } else if (player_total[0] == 21 || player_total[1] == 21) {
      payout_credits(200);
      account.send_chat(userid, text + 'Player has blackjack and wins 200 credits! :)');
    } else if (player_total[1] > 21) {
      account.send_chat(userid, text + 'Player went bust! :(');
    } else if (dealer_total[1] >= 21) {
      payout_credits(150);
      account.send_chat(userid, text + 'Dealer went bust! Player wins 150 credits! :)');
    } else if (action == "hit") {
      config.games[userid].blackjack.player_hand.push(draw());
      return blackjack('blackjack');
    } else if (config.games[userid].blackjack.state == 0) {
      new_state == 1;
      return account.send_chat(userid, text + '!hit or !stay ?');
    } else if (action == "stay") {
    } else if (action == "blackjack") {
      return account.send_chat(userid, "/quote Please use !hit or !stay.");
    }
    config.games[userid].blackjack.state = new_state;
  })();
} else if (trigger == "help") {
  account.send_chat(userid, '/code Hello! Welcome to primarydataloop!\n'
    + 'My name is ' + random_name({first: true, gender: 'male'}) + " " + random_name({last: true, gender: 'male'}) + ". How may I help you?\n\n"
    + 'CREDITS: ' + config.games[userid].credits + "\n\n"
    + 'Commands:\n'
    + '!haiku (5 credits) "Prints a pretty poem."\n'
    + '!joke (10 credits) "Life got you down? Buy a funny joke!"\n'
    + '!art (15 credits) "We read your mind and show you what\s inside."\n'
    + '!slots (50 credits) "Gamble for more credits!"\n'
    + '!blackjack (50 credits) "Gamble for more credits!"\n'
    + '!comment (100 credits) "Drop a deuce on a profile for a hundo."\n'
    + '!like (150 credits) "Need a +1 on your lame anime art?"\n'
    + '!follow (250 credits) "Start a cult!"\n'
    + '!enter (400 credits) "Get a goon in your group!"\n\n'
    + 'Services:\n'
    + '!email "Access electronic mail."\n'
    + '!users "Show user directory."\n'
    + '!guestbook "View/Sign user log."\n'
    + '!system "Perform control functions."\n'
    + '--------------------------------------------\n'
    + 'Other: @(adventure), $(files), %(calculator)\n'
    + '--------------------------------------------\n'
    + '>> Earth Time: ' + new Date().toUTCString(), null, 10);
} else {
  account.send_chat(userid, 'Unknown Chat Trigger!');
}