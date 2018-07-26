import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/togglable'

const Kirjaudu = ({ login,username,handleFormChange,password }) => (
	<div>
	<h2>Kirjaudu sovellukseen</h2>
        <form onSubmit={login}>
          <div>
            username:
            <input
              type="text"
							name="username"
              value={username}
              onChange={handleFormChange}
            />
          </div>
          <div>
            password:
            <input
              type="password"
							name="password"
              value={password}
              onChange={handleFormChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
	</div>
)

const Error = (props) => {
	if (props.error !== null) {
			return (
			<div>
				<p className='error'>{props.error}</p>	
			</div>
			)
	} 
	return null
}

const CreateNewBlog = ({addNewBlog, handleFormChange, title, author, url}) => (
    <div>
      <h3>Create new</h3>
			<form onSubmit={addNewBlog}>
          <div>
            title
            <input
              type="text"
							name="title"
              value={title}
              onChange={handleFormChange}
            />
          </div>
          <div>
            author
            <input
              type="text"
							name="author"
              value={author}
              onChange={handleFormChange}
            />
          </div>
					<div>
            url
            <input
              type="text"
							name="url"
              value={url}
              onChange={handleFormChange}
            />
          </div>
          <button type="submit">create</button>
        </form>
    </div>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
    	error: null,
			title:'',
			author:'',
			url:''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
		
		const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  	if (loggedUserJSON) {
    	const user = JSON.parse(loggedUserJSON)
    	this.setState({user})
    	blogService.setToken(user.token)
  	}
  } 
	
  	logOut = () => { 
		window.localStorage.removeItem('loggedBlogappUser')
		this.setState({ user: null })
	}


	handleFormChange = (event) => {
  	this.setState({ [event.target.name]: event.target.value })
		console.log(event.target.value)
	}
	
	addNewBlog = async (event) => {
		event.preventDefault()
		console.log('loytyi')
		try{
    	await blogService.create({
      	title: this.state.title,
      	author: this.state.author,
				url: this.state.url
    	})
			const error = 'a new blog \'' + this.state.title + '\' by ' + this.state.author + ' added'
			this.setState({ title: '', author: '', url: '', error: error })
    	setTimeout(() => {
      	this.setState({ error: null })
    	}, 5000)
  	} catch(exception) {
    	this.setState({
      	error: 'blogia ei hyväksytty',
    	})
    	setTimeout(() => {
      	this.setState({ error: null })
    	}, 5000)
  	}
	}
	
	login = async (event) => {
  	event.preventDefault()
  	try{
    	const user = await loginService.login({
      	username: this.state.username,
      	password: this.state.password
    	})

			window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
			blogService.setToken(user.token)
			this.setState({ username: '', password: '', user})
  	} catch(exception) {
    	this.setState({
      	error: 'käyttäjätunnus tai salasana virheellinen',
    	})
    	setTimeout(() => {
      	this.setState({ error: null })
    	}, 5000)
  	}
	}
	
  render() {
  if (this.state.user === null) {
    return (
      <div>
			<Error error={this.state.error} />
			<Togglable buttonLabel="login">
				<Kirjaudu 
					login={this.login}
					username={this.state.username}
					handleFormChange={this.handleFormChange}
					password={this.state.password}
				/>
			</Togglable>
      </div>
    )
  }

  return (
    <div>
			<Error error={this.state.error} />
      <h2>blogs</h2>
			<div>
				<p>{this.state.user.name} logged in <button onClick={this.logOut}>logout</button></p>
			</div>
		<CreateNewBlog addNewBlog= {this.addNewBlog} handleFormChange={this.handleFormChange} title={this.state.title} author={this.state.author} url={this.state.url}/>
      {this.state.blogs.sort((a,b) => b.likes-a.likes).map(blog =>
        	<Blog key={blog._id} blog={blog} user={this.state.user}/>
      )}
    </div>
  )
}
}

export default App;

