import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://www.youtube.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/YouTube/);
});

test('try library link', async ({ page }) => {
  await page.goto('https://www.youtube.com/');

  await page.getByRole('link', { name: 'Library' }).click({delay: 300});

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Library/);
});

test('try subscriptions link', async ({ page }) => {
  await page.goto('https://www.youtube.com/');

  await page.getByRole('link', { name: 'Subscriptions' }).click({delay: 300});

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Subscriptions/);
});

test('try to make search', async ({ page }) => {
  await page.goto('https://www.youtube.com/');
  await page.getByPlaceholder('Search').fill('cyber cat studio');
  await page.getByRole('button', { name: 'Search', exact: true}).click({delay: 300});

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/cyber cat studio/);
});

test('try to go right into short', async ({ page }) => {
  await page.goto('/shorts/4bYnY5Sxc6E');
  await expect(page).toHaveTitle(/crab dance/);
});