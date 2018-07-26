import React from 'react'
import { shallow } from 'enzyme'
import Simpleblog from './simpleblog'

describe.only('<Simpleblog />', () => {
  it('renders content', () => {
    const blog = {
      title: 'Komponenttitestaus on kivaa',
      author: 'Henkseli',
	  	url: 'www.testi.com',
			likes: 2 
    }
		
		const liker = () => {
			console.log('liked')
		}

    const SimpleblogContent = shallow(<Simpleblog blog={blog} onClick={liker} />)
    const contentDiv = SimpleblogContent.find('.title')
		const content = blog.title + " " + blog.author
    expect(contentDiv.text()).toContain(content)
  })
		
	it('clicking the button calls event handler twice', () => {
  const blog = {
      title: 'Komponenttitestaus on kivaa',
      author: 'Henkseli',
	  	url: 'www.testi.com',
			likes: 2 
    }

  const mockHandler = jest.fn()

  const SimpleblogComponent = shallow(<Simpleblog blog={blog} onClick={mockHandler} />)

  const button = SimpleblogComponent.find('button')
  button.simulate('click')
	button.simulate('click')

  expect(mockHandler.mock.calls.length).toBe(2)
	})
		
})