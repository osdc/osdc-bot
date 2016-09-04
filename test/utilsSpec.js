const expect = require("chai").expect;
const constants = require('../constants');

const utils = require("../utils");

describe("Module utils", function() {
  it("should get startsWith correctly", () => {
    const BOT_ACTIONS = constants.BOT_ACTIONS;
    expect(utils.getStartsWith("help")).to.equal(BOT_ACTIONS.HELP);
    expect(utils.getStartsWith("help wanted")).to.equal(BOT_ACTIONS.HELP);
    expect(utils.getStartsWith("help wanted please")).to.equal(BOT_ACTIONS.HELP);

    expect(utils.getStartsWith("joke")).to.equal(BOT_ACTIONS.JOKE);
    expect(utils.getStartsWith("tell me a joke")).to.equal(null);
    expect(utils.getStartsWith("joker")).to.equal(BOT_ACTIONS.JOKE);

    expect(utils.getStartsWith("deploy")).to.equal(BOT_ACTIONS.DEPLOY);
    expect(utils.getStartsWith("deployer")).to.equal(BOT_ACTIONS.DEPLOY);
    expect(utils.getStartsWith("code deploy please")).to.equal(null);

    // Test against false positives.
    expect(utils.getStartsWith("xyz")).to.equal(null);
    expect(utils.getStartsWith(undefined)).to.equal(null);
    expect(utils.getStartsWith(null)).to.equal(null);
  });
});
