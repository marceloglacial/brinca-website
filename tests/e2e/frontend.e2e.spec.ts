import { test, expect, Page } from '@playwright/test'

test.describe('Frontend', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    const context = await browser.newContext()
    page = await context.newPage()
  })

  test('can go on homepage', async ({ page }) => {
    await page.goto('/')

    await expect(page).toHaveTitle(/Payload Blank Template/)

    const heading = page.locator('h1').first()

    await expect(heading).toHaveText('Welcome to your new project.')
  })

  test('renders the home page navigation without client-side JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()

    await page.goto('/en')

    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('header a[href="/en/about-us"]')).toHaveText('About Us')
    await expect(page.locator('header a[href="/en/contact-us"]')).toHaveText('Contact Us')

    await context.close()
  })

  test('opens and closes the mobile menu on the home page', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
    })
    const page = await context.newPage()

    await page.goto('/en')

    await expect(page.getByRole('dialog')).toBeHidden()
    await page.getByRole('button', { name: 'Open navigation menu' }).click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.getByRole('dialog').getByRole('link', { name: 'About Us' })).toBeVisible()

    await page.getByRole('dialog').getByRole('button', { name: 'Close navigation menu' }).click()
    await expect(page.getByRole('dialog')).toBeHidden()

    await page.reload()
    await expect(page.getByRole('dialog')).toBeHidden()

    await context.close()
  })
})
