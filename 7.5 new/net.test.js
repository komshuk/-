const { clickElement, getText } = require("./lib/commands");
const puppeteer = require('puppeteer');

let page;
let btnSelector = '.acceptin-button';

beforeEach(async () => {
	page = await browser.newPage();
	await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
	page.close();
});

describe('Ticket booking tests', () => {
	beforeEach(async () => {
		page = await browser.newPage();
		await page.goto('http://qamid.tmweb.ru/client/index.php');
	});

	test('Should book one tickets', async () => {
		await clickElement(page, '.page-nav > a:nth-child(5)');
		await clickElement(page, 'a.movie-seances__time');
		await clickElement(page, '.buying-scheme__row > span:nth-child(5)');
		await clickElement(page, 'button.acceptin-button');
        await page.waitForSelector(btnSelector, {
            visible: true,
        });
		const actual = await getText(page, ".acceptin-button");
        expect(actual).toContain('Получить код бронирования');
	});

	test('Should book two tickets', async () => {
		await clickElement(page, '.page-nav > a:nth-child(5)');
		await clickElement(page, 'a.movie-seances__time');
		await clickElement(page, '.buying-scheme__row > span:nth-child(6)');
		await clickElement(page, '.buying-scheme__row > span:nth-child(7)');
		await clickElement(page, 'button.acceptin-button');
		await page.waitForSelector(btnSelector, {
			    visible: true,
			});
		const actual = await getText(page, ".acceptin-button");
        expect(actual).toContain('Получить код бронирования');
	});

	test('Should not book again', async () => {
		await clickElement(page, '.page-nav > a:nth-child(5)');
		await clickElement(page, 'a.movie-seances__time');
		await clickElement(page, '.buying-scheme__row > span:nth-child(1)');
		expect(await page.$eval("button", (button) => { return button.disabled;})).toBe(true);
	});
});