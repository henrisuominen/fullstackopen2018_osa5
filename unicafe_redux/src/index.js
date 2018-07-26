import React from 'react'
import ReactDOM from 'react-dom'
import counterReducer from './reducer'
import {createStore} from 'redux'

const Statistiikka = () => {
  const palautteita = store.getState().good + store.getState().bad + store.getState().ok

	const klik = () => { 
		store.dispatch({ 
			type: 'ZERO'
		})
	}
	
	
  if (palautteita === 0) {
    return (
      <div>
        <h2>stataistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{store.getState().good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{store.getState().ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{store.getState().bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{((store.getState().good - store.getState().ok)/(store.getState().good + store.getState().bad + store.getState().ok))}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{store.getState().good/(store.getState().good + store.getState().bad + store.getState().ok)}</td>
          </tr>
        </tbody>
      </table>

      <button onClick={klik}>nollaa tilasto</button>
    </div >
  )
}

const store = createStore(counterReducer)

class App extends React.Component {



  klik = (nappi) => () => {
		store.dispatch({
			type: nappi
		})
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const renderApp = () => {
	ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp()
store.subscribe(renderApp)