const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})


const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe("total likes", () => {

  test("with blogs parameter not a list", () => {
    const result = listHelper.totalLikes('a')
    assert.equal(result, null)
  })
  
  test("of empty list returns 0", () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test("when list has only one blog equals the likes of that", () => {
    const oneBlogs = [blogs[3]]

    const result = listHelper.totalLikes(oneBlogs)
    assert.strictEqual(result, 10)
  })

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 36)
  })
})

describe("favorite blog", () => {

  test("with blogs parameter not a list", () => {
    const result = listHelper.favoriteBlog('a')
    assert.equal(result, null)
  })

  test("with one blog having highest number of likes returns it", () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[2])
  })

  test("with 2 or more blogs having the same number of likes", () => {
    const updateBlogs = [
      ...blogs,
      {
        "_id": "6820a0e71f297d3d8fa225e2",
        "title": "Tyler Bosmeny built Clever into a $500M company-now he's helping YC founders do the same as General Partner",
        "author": "Garry Tan",
        "url": "https://www.ycombinator.com/blog/welcome-tyler",
        "likes": 12,
        "__v": 0
      }]
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[2])
  })

  test("with an empty list of blogs returns null", () => {
    const result = listHelper.favoriteBlog([])
    assert.strictEqual(result, null)
  })
})

describe("Most blogs", () => {

  test("with blogs parameter not a list", () => {
    const result = listHelper.mostBlogs(0)
    assert.strictEqual(result, null)
  })
  
  test("with an empty list of blogs return null", () => {
    const result = listHelper.mostBlogs([])
    assert.strictEqual(result, null)
  })

  test("when list contains on blog return that author and 1 as value of blog", () => {
    const result = listHelper.mostBlogs([blogs[0]])
    console.log(result)
    assert.deepStrictEqual(result, { author: blogs[0].author, blogs: 1 })
  })

  test("when list contains an author with highest number of blogs", () => {
    const result = listHelper.mostBlogs(blogs)
    console.log(result)
    assert.deepStrictEqual(result, { author: blogs[4].author, blogs: 3 })
  })
})

describe("Most like blogs", () => {

  test("with blogs parameter not a list", () => {
    const result = listHelper.mostLikes('abc')
    assert.equal(result, null)
  })

  test("with an empty list of blogs return null", () => {
    const result = listHelper.mostLikes([])
    assert.strictEqual(result, null)
  })

  test("with one blog in the list return the author and likes of that blog", () => {
    const result = listHelper.mostLikes([blogs[0]])
    assert.deepStrictEqual(result, {author: blogs[0].author, likes: blogs[0].likes})
  })

  test("with bigger list returns the right answer", () => {
    const result = listHelper.mostLikes(blogs)

    assert.deepStrictEqual(result, {author: "Edsger W. Dijkstra", likes: 17})
  })
})





