import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/togglable'
import { mount } from 'enzyme'
import App from './App'

jest.mock('./services/blogs')

describe('<App />', () => {

	describe('not logged', () => {
		let app
		beforeAll(() => {
    	app = mount(<App />)
  	})
  	it('No Blogs when not logged in', () => {
    	app.update()

    	const blogComponents = app.find(Blog)
    	expect(blogComponents.length).toEqual(0)
  	})
	})	

  describe('when user is logged', () => {
		let app
    beforeEach(() => {
			const user = {
  			username: 'tester',
  			token: '1231231214',
  			name: 'Teuvo Testaaja'
			}
			localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			app = mount(<App />)
    })

    it('all notes are rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
    	expect(blogComponents.length).toEqual(2)
    })
  })
		
		
})
