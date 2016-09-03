const expect = require("chai").expect;
const chatbot = require("../chatbot");

describe("ChatBot Utils", function() {
  it("should get startsWith correctly", function() {
    const BOT_ACTIONS = chatbot.getBotActions();
    expect(chatbot.getStartsWith("help")).to.equal(BOT_ACTIONS.HELP);
    expect(chatbot.getStartsWith("help wanted")).to.equal(BOT_ACTIONS.HELP);
    expect(chatbot.getStartsWith("help wanted please")).to.equal(BOT_ACTIONS.HELP);

    expect(chatbot.getStartsWith("joke")).to.equal(BOT_ACTIONS.JOKE);
    expect(chatbot.getStartsWith("tell me a joke")).to.equal(null);
    expect(chatbot.getStartsWith("joker")).to.equal(BOT_ACTIONS.JOKE);

    expect(chatbot.getStartsWith("deploy")).to.equal(BOT_ACTIONS.DEPLOY);
    expect(chatbot.getStartsWith("deployer")).to.equal(BOT_ACTIONS.DEPLOY);
    expect(chatbot.getStartsWith("code deploy please")).to.equal(null);

    expect(chatbot.getStartsWith("xyz")).to.equal(null);
    expect(chatbot.getStartsWith(undefined)).to.equal(null);
    expect(chatbot.getStartsWith(null)).to.equal(null);
  });
});
