const puppeteer = require("puppeteer");
const chai = require("chai");
const expect = chai.expect;
const { Given, When, Then, Before, After } = require("cucumber");
const { clickElement, getText } = require("../../lib/commands.js");
const {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);

Before(async function () {
  const browser = await puppeteer.launch({ headless: false, slowMo: 200 });
  const page = await browser.newPage();
  this.browser = browser;
  this.page = page;
});

After(async function () {
  if (this.browser) {
    await this.browser.close();
  }
});

Given("user is on {string} page", async function (string) {
  return await this.page.goto(`${string}`, {
      setTimeout: 60000,
  });
});

When('user choose day {int}', async function (int) {
  const daySelector = 'body > nav > a:nth-child(' + int + ')';
  await this.page.click(daySelector);
});

When("user choose time", async function () {
  await clickElement(this.page, "a.movie-seances__time");
});

When('user select row {int} and seat {int}', async function (int, int2) {
    const seatSelector =
        'body > main > section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(' +
        int +
        ') > span:nth-child(' +
        int2 +
        ')';
    await this.page.waitForSelector(seatSelector);
    await this.page.click(seatSelector);
});

When("user select the booked place", async function () {
  await clickElement(this.page, ".buying-scheme__row > span:nth-child(1)");
});

When("user click button", async function () {
  await clickElement(this.page, "button.acceptin-button");
  });

  Then("user see text {string}", async function (string) {
    const actual = await getText(this.page, ".acceptin-button");
    const expected = await string;
    expect(actual).contains(expected);
    
  });

Then("user see button disabled {string}", async function (string) {
    const actual = String(await this.page.$eval("button", (button) => {
        return button.disabled;
      })
    );
    const expected = await string;
    expect(actual).contains(expected);
  });