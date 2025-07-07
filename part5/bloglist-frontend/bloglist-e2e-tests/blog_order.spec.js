import { test, expect } from '@playwright/test'

test.describe('Blog app', () => {
    test.beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')

        await request.post('/api/users', {
            data: { name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen' }
        })

        await page.goto('http://localhost:5173')
        await page.getByTestId('username').fill('mluukkai')
        await page.getByTestId('password').fill('salainen')
        await page.getByRole('button', { name: 'login' }).click()
        await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()

        // Create Blog A
        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByPlaceholder('title').fill('Blog A')
        await page.getByPlaceholder('author').fill('Author A')
        await page.getByPlaceholder('url').fill('http://a.com')
        await page.getByRole('button', { name: 'create' }).click()

        // Create Blog B
        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByPlaceholder('title').fill('Blog B')
        await page.getByPlaceholder('author').fill('Author B')
        await page.getByPlaceholder('url').fill('http://b.com')
        await page.getByRole('button', { name: 'create' }).click()
    })

    test('blogs are ordered by like count descending', async ({ page }) => {
        const blogs = page.locator('.blog-summary')
        const count = await blogs.count()

        // Open all blogs
        for (let i = 0; i < count; i++) {
            await blogs.nth(i).getByRole('button', { name: 'view' }).click()
        }

        // Like Blog A 5x
        const blogA = page.locator('.blog-summary', { hasText: 'Blog A' }).first().locator('..')
        for (let i = 0; i < 5; i++) {
            await blogA.getByRole('button', { name: 'like' }).click()
        }

        // Like Blog B 2x
        const blogB = page.locator('.blog-summary', { hasText: 'Blog B' }).first().locator('..')
        for (let i = 0; i < 2; i++) {
            await blogB.getByRole('button', { name: 'like' }).click()
        }

        // Reload to re-fetch blogs
        await page.reload()

        const blogsAfter = page.locator('.blog-summary')
        const countAfter = await blogsAfter.count()

        for (let i = 0; i < countAfter; i++) {
            await blogsAfter.nth(i).getByRole('button', { name: 'view' }).click()
        }

        const blogContainers = page.locator('.blog-summary').locator('..')
        const likeCounts = []

        for (let i = 0; i < countAfter; i++) {
            const text = await blogContainers.nth(i).innerText()
            const match = text.match(/likes (\d+)/)
            if (match) {
                likeCounts.push(Number(match[1]))
            }
        }

        const sorted = [...likeCounts].sort((a, b) => b - a)
        expect(likeCounts).toEqual(sorted)
    })
})
