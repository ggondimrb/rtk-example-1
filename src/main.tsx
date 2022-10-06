import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { GetByName } from './GetByName'
import { Posts } from './Posts'
import { store } from './app/store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <App /> */}
      <Posts />
      {/* <GetByName /> */}
    </Provider>
  </React.StrictMode>
)
