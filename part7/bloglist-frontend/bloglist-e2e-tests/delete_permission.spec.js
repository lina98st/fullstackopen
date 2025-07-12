import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
    test.beforeEach(async ({ page, request }) => {
        // reset backend
        await request.post('/api/testing/reset')

        // create user A (mluukkai)
        await request.post('/api/users', {
            data: { name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen' }
        })

        // create user B (alina)
        await request.post('/api/users', {
            data: { name: 'Alina', username: 'alina', password: 'test' }
        })

        // login as user A and create blog
        await page.goto('http://localhost:5173')
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()

        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByPlaceholder('title').fill('Protected Blog')
        await page.getByPlaceholder('author').fill('Test Author')
        await page.getByPlaceholder('url').fill('http://example.com')
        await page.getByRole('button', { name: 'create' }).click()

        // logout user A
        await page.getByRole('button', { name: 'logout' }).click()

        // login as user B
        await page.getByTestId('username').fill('alina')
        await page.getByTestId('password').fill('test')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('only the creator sees the delete button', async ({ page }) => {
        const blogSummary = page.locator('.blog-summary', { hasText: 'Protected Blog' }).first()
        await blogSummary.getByRole('button', { name: 'view' }).click()

        const blogFull = blogSummary.locator('..').locator('div >> nth=1')
        await expect(blogFull.getByRole('button', { name: 'remove' })).toHaveCount(0)
    })
})
