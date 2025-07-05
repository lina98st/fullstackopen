const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const userExtractor = require('../middleware/userExtractor')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)

})


blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    if (!user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id,
    })

    try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
        response.status(201).json(populatedBlog)

    } catch (error) {
        if (error.name === 'ValidationError') {
            return response.status(400).json({ error: error.message })
        }
        throw error
    }
})





blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
    try {
        const user = request.user
        if (!user) {
            return response.status(401).json({ error: 'unauthorized' })
        }


        const blog = await Blog.findById(request.params.id)

        if (!blog) {
            return response.status(404).json({ error: 'blog not found' })
        }


        if (blog.user.toString() !== user._id.toString()) {
            return response.status(403).json({ error: 'not authorized to delete this blog' })
        }

        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()

    } catch (error) {
        next(error)
    }
})



blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            request.body,
            { new: true, runValidators: true, context: 'query' }
        ).populate('user', { username: 1, name: 1 })

        response.json(updatedBlog)
    } catch (error) {
        next(error)
    }
})




module.exports = blogsRouter
