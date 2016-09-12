'use strict';
const constants = require('./constants');

const getStartsWith = (parsedMessage) => {
  let result = null;
  if (!parsedMessage) {
    return result;
  }
  for (let botAction in constants.BOT_ACTIONS) {
    if (parsedMessage.startsWith(constants.BOT_ACTIONS[botAction])) {
      result = constants.BOT_ACTIONS[botAction];
      /* eslint-disable no-console */
      console.log(`[INFO] In loop ${result}`);
      /* eslint-enable no-console */
      break;
    }
  }
  return result;
};

const generateBotHelp = () => {
  let resultString = 'You can:';
  for (let botAction in constants.BOT_ACTIONS) {
    resultString += `\n- ${constants.BOT_ACTIONS[botAction]}`;
  }
  return resultString;
};

module.exports = {
  getStartsWith,
  generateBotHelp
};
