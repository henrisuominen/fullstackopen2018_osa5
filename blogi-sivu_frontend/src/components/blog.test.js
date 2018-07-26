import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
  let BlogComponent

	const blog = {
      title: 'Komponenttitestaus on kivaa',
      author: 'Henkseli',
	  	url: 'www.testi.com',
			likes: 2 
  }
	
  beforeEach(() => {
    BlogComponent = shallow(
			<Blog blog={blog} />
		)
  })

  it('at start the children are not displayed', () => {
    const div = BlogComponent.find('.content')
    expect(div.getElement().props.style).toEqual({ display: 'none' })
  })

  it('after clicking the button, children are displayed', () => {
    const button = BlogComponent.find('.title')

    button.at(0).simulate('click')
    const div = BlogComponent.find('.content')
    expect(div.getElement().props.style).toEqual({ display: '' })
  })

	
	
		
})