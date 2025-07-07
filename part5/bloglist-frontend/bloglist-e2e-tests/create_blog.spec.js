import { test, expect, describe } from '@playwright/test'

describe('When logged in', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: { name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen' }
    })
    await page.goto('/')
    await page.getByTestId('username').fill('mluukkai')
    await page.getByTestId('password').fill('salainen')
    await page.getByRole('button', { name: 'login' }).click()
  })

  test('a new blog can be created', async ({ page }) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByPlaceholder('Title').fill('My Test Blog')
    await page.getByPlaceholder('Author').fill('Alina')
    await page.getByPlaceholder('Url').fill('http://example.com')
    await page.getByRole('button', { name: 'create' }).click()
    await expect(page.locator('.blog-summary', { hasText: 'My Test Blog' }).first()).toBeVisible()

  })
})
