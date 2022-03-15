import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "./store/index"
import Main from './components/Main';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        </div>
      </Provider>
    )
  }
}
