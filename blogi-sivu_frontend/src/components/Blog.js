import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
			likes: this.props.blog.likes,
			deleted: false
    }
  }


  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }
  
  
  likeBlog = async (event) => {
	try{
	  await blogService.update(this.props.blog._id,{
      	title: this.props.blog.title,
      	author: this.props.blog.author,
				url: this.props.blog.url,
				likes: this.state.likes + 1
      })
		this.setState({likes: this.state.likes + 1})
	} catch(exception) {
    }
  }
  
  deleteBlog = async (event) => {
		const message = 'delete \'' + this.props.blog.title + '\' by ' + this.props.blog.author + '?'
		if(window.confirm(message)){
			try {
				await blogService.remove(this.props.blog._id)
				this.setState({ deleted: true})
			} catch (exception) {
			}
		}
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

	const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
		if (this.state.deleted) {
			return (
				null
			)
		}
    return (
      <div className='main' style={blogStyle}>
        <div className='title' style={hideWhenVisible} onClick={this.toggleVisibility}>
	  			{this.props.blog.title} {this.props.blog.author}
        </div>
        <div className='content' style={showWhenVisible} >
	  	<div onClick={this.toggleVisibility}>
	  	{this.props.blog.title} {this.props.blog.author}
	  	</div>
	  		<ul>
  				<li>{this.props.blog.url}</li>
  				<li>{this.state.likes} likes <button onClick={this.likeBlog}>like</button></li>
  				<li>added by {this.props.blog.user === undefined ? ' unidentified' : this.props.blog.user.name}</li>
	  	{(!this.props.blog.user || this.props.blog.user.username === this.props.user.username) && <li><button onClick={this.deleteBlog}>delete</button></li>}

	  		</ul>
        </div>
      </div>
    )
  }
}


export default Blog