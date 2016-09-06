'use strict';
const constants = require('./constants');

const _getStartsWith = (parsedMessage) => {
  let result = null;
  if (!parsedMessage) {
    return result;
  }
  for (let botAction in constants.BOT_ACTIONS) {
    if (parsedMessage.startsWith(constants.BOT_ACTIONS[botAction])) {
      result = constants.BOT_ACTIONS[botAction];
      console.log(`[INFO] In loop ${result}`);
      break;
    }
  }
  return result;
};

const _generateBotHelp = () => {
  let resultString = "You can:";
  for (let botAction in constants.BOT_ACTIONS) {
    resultString += `\n- ${constants.BOT_ACTIONS[botAction]}`;
  }
  return resultString;
};

module.exports = {
  getStartsWith: _getStartsWith,
  generateBotHelp: _generateBotHelp
};
