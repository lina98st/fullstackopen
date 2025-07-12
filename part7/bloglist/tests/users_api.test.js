const test = require('node:test')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

test('user creation fails if username is too short', async () => {
    await User.deleteMany({})

    const newUser = {
        username: 'ab',
        name: 'Test User',
        password: 'secret'
    }

    const result = await api
        .post('/api/users')
        .send(newUser)

    assert.strictEqual(result.status, 400)
    assert.match(result.body.error, /username must be at least 3/)
})

test('user creation fails if password is too short', async () => {
    await User.deleteMany({})

    const newUser = {
        username: 'validuser',
        name: 'Test User',
        password: '12'
    }

    const result = await api
        .post('/api/users')
        .send(newUser)

    assert.strictEqual(result.status, 400)
    assert.match(result.body.error, /password must be at least 3/)
})

test('user creation fails if username is not unique', async () => {
    await User.deleteMany({})

    const testUsername = 'user' + Date.now()

    const response1 = await api
        .post('/api/users')
        .send({
            username: testUsername,
            name: 'First',
            password: 'password123'
        })
    assert.strictEqual(response1.status, 201)

    const response2 = await api
        .post('/api/users')
        .send({
            username: testUsername,
            name: 'Duplicate',
            password: 'newpassword'
        })

    assert.strictEqual(response2.status, 400)
    assert.match(response2.body.error, /username must be unique/)
})



test('cleanup', async () => {
    await mongoose.connection.close()
})
