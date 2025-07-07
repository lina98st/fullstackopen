import { test, expect, describe } from '@playwright/test'

describe('Blog app', () => {
    test.beforeEach(async ({ page, request }) => {
        await request.post('/api/testing/reset')
        await request.post('/api/users', {
            data: { name: 'Matti Luukkainen', username: 'mluukkai', password: 'salainen' }
        })
        await page.goto('/')
        // Uncomment if login form opens after clicking "log in" button
        // await page.getByRole('button', { name: 'log in' }).click()
    })

    test('Login form is shown', async ({ page }) => {
        await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })

    describe('Login', () => {
        test('succeeds with correct credentials', async ({ page }) => {
            // Uncomment if login form opens after clicking "log in" button
            // await page.getByRole('button', { name: 'log in' }).click()
            await page.getByTestId('username').fill('mluukkai')
            await page.getByTestId('password').fill('salainen')
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
        })

        test('fails with wrong credentials', async ({ page }) => {
            // await page.getByRole('button', { name: 'log in' }).click()
            await page.getByTestId('username').fill('mluukkai')
            await page.getByTestId('password').fill('wrongpassword')
            await page.getByRole('button', { name: 'login' }).click()
            await expect(page.getByText('wrong credentials')).toBeVisible()
        })
    })
})
