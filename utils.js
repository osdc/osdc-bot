'use strict';
const BOT_ACTIONS = {
  HELP: 'help',
  JOKE: 'joke',
  DEPLOY: 'deploy',
  HOWDOI: 'howdoi'
};

const _getStartsWith = (parsedMessage) => {
  var result = null;
  for (var botAction in BOT_ACTIONS) {
    if (parsedMessage.startsWith(BOT_ACTIONS[botAction])) {
      result = BOT_ACTIONS[botAction];
      console.log(`[INFO] In loop ${result}`);
      break;
    }
  }
  return result;
};


const _getBotHelp = () => {
  var resultString = "You can:";
  for (var botAction in BOT_ACTIONS) {
    resultString += `\n- ${BOT_ACTIONS[botAction]}`;
  }
  return resultString;
};


module.exports = {
  getStartsWith: (parsedMessage) => (_getStartsWith(parsedMessage)),
  getBotHelp: () => (_getBotHelp())
};

