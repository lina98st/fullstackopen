const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    let favorite = blogs[0]
    blogs.forEach(blog => {
        if (blog.likes > favorite.likes) {
            favorite = blog
        }
    })
    return favorite
}

const mostBlogs = (blogs) => {
    const counts = {}
    blogs.forEach(blog => {
        const author = blog.author
        counts[author] = (counts[author] || 0) + 1
    })

    let maxAuthor = ''
    let maxBlogs = 0

    for (const author in counts) {
        if (counts[author] > maxBlogs) {
            maxAuthor = author
            maxBlogs = counts[author]
        }
    }

    return {
        author: maxAuthor,
        blogs: maxBlogs
    }
}

const mostLikes = (blogs) => {
    const counts = {}
    blogs.forEach(blog => {
        const author = blog.author
        counts[author] = (counts[author] || 0) + blog.likes
    })

    let maxAuthor = ''
    let maxLikes = 0


    for (const author in counts) {
        if (counts[author] > maxLikes) {
            maxAuthor = author
            maxLikes = counts[author]
        }
    }

    return {
        author: maxAuthor,
        likes: maxLikes
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
