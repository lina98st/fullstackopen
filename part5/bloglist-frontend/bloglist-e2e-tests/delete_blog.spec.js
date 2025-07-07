import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
    test.beforeEach(async ({ page, request }) => {
        // reset backend and create user
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: { name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen' }
        })

        await page.goto('http://localhost:5173')

        // login
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()

        // create blog
        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByPlaceholder('title').fill('Delete Test Blog')
        await page.getByPlaceholder('author').fill('Matti')
        await page.getByPlaceholder('url').fill('http://example.com')
        await page.getByRole('button', { name: 'create' }).click()
    })

    test('creator can delete a blog', async ({ page }) => {
        // handle window.confirm
        page.on('dialog', async dialog => {
            await dialog.accept()
        })

        const blogSummary = page.locator('.blog-summary', { hasText: 'Delete Test Blog' }).first()
        await blogSummary.getByRole('button', { name: 'view' }).click()

        const blogFull = blogSummary.locator('..').locator('div >> nth=1')
        await blogFull.getByRole('button', { name: 'remove' }).click()

        // expect blog to be gone
        await expect(page.locator('text=Delete Test Blog')).toHaveCount(0)
    })
})
