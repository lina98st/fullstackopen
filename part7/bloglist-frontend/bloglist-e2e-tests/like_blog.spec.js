import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')

        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('user can like an existing blog', async ({ page }) => {
        const blogSummary = page.locator('.blog-summary', { hasText: 'Like Test Blog Alina 999' }).first()
        await blogSummary.getByRole('button', { name: 'view' }).click()

        const blogFull = blogSummary.locator('..').locator('div >> nth=1')

        // get current like count
        const likeText = await blogFull.locator('text=likes').textContent()
        const currentLikes = parseInt(likeText.match(/\d+/)[0])

        // click like
        await blogFull.getByRole('button', { name: 'like' }).click()

        // expect new like count
        await expect(blogFull.locator(`text=likes ${currentLikes + 1}`)).toBeVisible()
    })
})
