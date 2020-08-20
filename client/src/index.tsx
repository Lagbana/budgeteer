import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import {Routes} from './Routes'
import * as serviceWorker from './serviceWorker'
import './App.css'

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql'
})

ReactDOM.render(
  <ApolloProvider client={client as any}>
    <Routes />
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
