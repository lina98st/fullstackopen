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

        await page.getByRole('button', { name: 'new blog' }).click()
        await page.getByPlaceholder('Title').fill('Like Test Blog')
        await page.getByPlaceholder('Author').fill('Alina')
        await page.getByPlaceholder('Url').fill('http://example.com')
        await page.getByRole('button', { name: 'create' }).click()
    })

    test('blog can be liked', async ({ page }) => {
        const blog = page.locator('.blog-summary', { hasText: 'Like Test Blog' }).first()
        await blog.getByRole('button', { name: 'view' }).click()
        const likeButton = page.getByRole('button', { name: 'like' })
        await likeButton.click()
        await expect(page.getByText('likes 1')).toBeVisible()
    })
})
