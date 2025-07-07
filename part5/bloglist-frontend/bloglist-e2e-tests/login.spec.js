import { test, expect, describe } from '@playwright/test'

describe('Blog app', () => {
    test.beforeEach(async ({ page, request }) => {
        // reset DB and create user alina
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: { name: 'Alina', username: 'alina', password: 'test' }
        })

        await page.goto('/')
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            await page.getByTestId('username').fill('alina')
            await page.getByTestId('password').fill('test')
            await page.getByRole('button', { name: 'login' }).click()

            // safer: check logout button is visible after login
            await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            await page.getByTestId('username').fill('alina')
            await page.getByTestId('password').fill('wrongpassword')
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText('wrong credentials')).toBeVisible()
        })
    })
})
