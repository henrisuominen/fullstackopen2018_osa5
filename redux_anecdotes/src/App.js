import React from 'react';

class App extends React.Component {
	 
	
	create = (event) => {
			event.preventDefault()
			const content = event.target.create.value
			this.props.store.dispatch({
    		type: 'CREATE',
				data: { content }
  		})
		}
	
  render() {
    const anecdotes = this.props.store.getState()
		const store = this.props.store
		
		const vote = (id) => () => {
  		store.dispatch({
    		type: 'VOTE',
				data: { id }
  		})
		}
		
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort(function(a, b) {
  				return b.votes - a.votes;
				}).map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content} 
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.create}>
          <div><input name='create' /></div>
          <button type='submit'>create</button> 
        </form>
      </div>
    )
  }
}

export default App