import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await page.locator('#userName')

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('Success login', async ({ page }) => {
  await page.goto('/login');
  await page.getByPlaceholder('UserName').fill('testdamir');
  await page.getByPlaceholder('Password').fill('testdamir_D0&');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('User Name : testdamirLog out').isVisible();
});

test('Cannot auth without credentials', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle')
  await expect(page.getByPlaceholder('UserName')).toHaveClass(/is\-invalid/)
  await expect(page.getByPlaceholder('Password')).toHaveClass(/is\-invalid/)
});

test('Success add book to collection', async ({ page }) => {
  await page.route('**/BookStore/v1/Books', route => {
    route.fulfill({
      status: 201,
      body: JSON.stringify({
        "userId":"45057726-ddf4-41ec-ae30-978a936d0495",
        "collectionOfIsbns":[{"isbn":"9781491950296"}]
      })
    })
  })

  await page.goto('/login');
  await page.getByPlaceholder('UserName').fill('testdamir');
  await page.getByPlaceholder('Password').fill('testdamir_D0&');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('User Name : testdamirLog out').isVisible();
  await page.waitForLoadState('networkidle')
  await page.goto('/books?book=9781491950296');
  page.on('dialog', async dialog => {
    expect(dialog.type()).toContain('alert')
    expect(dialog.message()).toBe('Book added to your collection.')
    await dialog.accept()
  })
  await page.getByRole('button', { name: 'Add To Your Collection' }).click()
  await page.waitForLoadState('networkidle')
  // Book added to your collection.
  // 
  // 
})