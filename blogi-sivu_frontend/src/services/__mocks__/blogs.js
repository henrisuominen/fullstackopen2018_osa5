import axios from 'axios'
const baseUrl = '/api/blogs/'

let token = null

const blogs = [
  {
    "title": "TestiJutska",
    "author": "Teppo Testaaja",
    "url": "www.howtotest.com",
    "likes": 2
	},
	{
    "title": "Kuinka tehdä testejä",
    "author": "Kalle Kokeilija",
    "url": "www.testi.com",
    "likes": 7
	}
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

export default { blogs, getAll, setToken }