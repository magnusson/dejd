import { expect, test } from '@playwright/test';

test('index title', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'DEJD' })).toBeVisible();
});

test('skip test', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('button', { name: 'Skip' })).toBeVisible();
	await page.getByRole('button', { name: 'Skip' }).click({ clickCount: 6 });
	await expect(page.locator('ul > li')).toHaveText([
		'Skipped',
		'Skipped',
		'Skipped',
		'Skipped',
		'Skipped',
		'Skipped'
	]);
	await expect(page.getByRole('button', { name: 'Next' })).toBeVisible();
	await page.getByRole('button', { name: 'Next' }).click();
	await expect(page.getByRole('button', { name: 'Guess' })).toBeVisible();
});

test('guess test', async ({ page }) => {
	await page.goto('/');
	await page.getByPlaceholder('Search for artist or song').click();
	await page.getByPlaceholder('Search for artist or song').fill('ABBA');
	await page.getByRole('button', { name: 'Dancing Queen - ABBA' }).click();
	await expect(page.getByPlaceholder('Search for artist or song')).toHaveValue(
		'Dancing Queen - ABBA'
	);
	await page.getByRole('button', { name: 'Guess' }).click();
	await expect(page.getByRole('list')).toContainText('Dancing Queen - ABBA');
});
