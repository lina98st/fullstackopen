const assert = require('node:assert')
const { test, beforeEach, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')
const bcrypt = require('bcrypt')



beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()

    const blog = new Blog({
        title: 'Test blog',
        author: 'Someone',
        url: 'http://example.com',
        likes: 5,
        user: user._id
    })

    await blog.save()
})

test('blogs are returned as json', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, 1)
})

test('the unique identifier property of blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]

    assert.ok(blog.id)
})

test('a valid blog can be added', async () => {
    const loginResponse = await api
        .post('/api/login')
        .send({
            username: 'root',
            password: 'sekret'
        })

    const token = loginResponse.body.token


    const newBlog = {
        title: 'Async/Await is powerful',
        author: 'Dev Tester',
        url: 'http://example.com/async',
        likes: 10,
    }


    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAfter = await Blog.find({})
    const titles = blogsAfter.map(b => b.title)
    assert.ok(titles.includes('Async/Await is powerful'))
})


test('adding a blog fails with status 401 if token is not provided', async () => {
    const newBlog = {
        title: 'No Token Blog',
        author: 'Anonymous',
        url: 'http://example.com',
        likes: 5,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
})



test('if likes property is missing, it will default to 0', async () => {
    const loginResponse = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })

    const token = loginResponse.body.token

    const newBlog = {
        title: 'No likes field',
        author: 'Anonymous',
        url: 'http://example.com/nolikes'
    }

    const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, 0)
})



test('check new blog if title is missing', async () => {
    const loginResponse = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })

    const token = loginResponse.body.token

    const newBlog = {
        author: 'Someone',
        url: 'http://example.com',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const blogsAfter = await Blog.find({})
    assert.strictEqual(blogsAfter.length, 1)
})



test('check new blog if url is missing', async () => {
    const loginResponse = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })

    const token = loginResponse.body.token

    const newBlog = {
        title: 'Test blog',
        author: 'Someone',
        likes: 5
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const blogsAfter = await Blog.find({})
    assert.strictEqual(blogsAfter.length, 1)
})




test('a blog can be deleted', async () => {
    const loginResponse = await api
        .post('/api/login')
        .send({ username: 'root', password: 'sekret' })

    const token = loginResponse.body.token

    const newBlog = {
        title: 'To be deleted',
        author: 'Someone',
        url: 'http://delete.com',
        likes: 1,
    }

    const savedBlog = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)

    const blogToDelete = savedBlog.body

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

    const blogsAfter = await Blog.find({})
    const titles = blogsAfter.map(b => b.title)
    assert.ok(!titles.includes(blogToDelete.title))
})



test('a blog\'s likes can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedData = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
    }

    const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedData)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
})



after(async () => {
    await mongoose.connection.close()
})
