const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (!(blogs instanceof Array)) {
        return null
    }
    return blogs.reduce((sumLikes, currentBlog) => sumLikes + currentBlog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0 || !(blogs instanceof Array)) {
        return null
    }
    return blogs.reduce((favBlog, currentBlog) => currentBlog.likes > favBlog.likes ? currentBlog: favBlog)
}

const mostBlogs = (blogs) => {
    let mostFrequentBlogger = {author: "", blogs: 0}
    for (let i = 0; i < blogs.length; i++) {
        const author = blogs[i].author
        let blogNumber = 0
        for (let j = 0; j < blogs.length; j++) {
            if (blogs[j].author === author) {
                blogNumber += 1
            }
        }
        if (blogNumber > mostFrequentBlogger.blogs) {
            mostFrequentBlogger.author = author
            mostFrequentBlogger.blogs = blogNumber
        }
    }
    
    return mostFrequentBlogger.author === "" ? null : mostFrequentBlogger
}

const mostLikes = (blogs) => {
    if (!(blogs instanceof Array)) {
        return null
    }
    let mostLikesBlogger = {author: "", likes: 0}
    for (let i = 0; i < blogs.length; i++) {
        let blogger = {author: blogs[i].author, likes: 0}
        for (let j = 0; j < blogs.length; j++) {
            if (blogs[j].author === blogger.author) {
                blogger.likes += blogs[j].likes
            }
        }
        if (blogger.likes > mostLikesBlogger.likes) {
            mostLikesBlogger.author = blogger.author
            mostLikesBlogger.likes = blogger.likes
        }
        
    }
    
    return mostLikesBlogger.author === ""? null : mostLikesBlogger
}
    

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}