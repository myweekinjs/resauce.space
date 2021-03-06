import '../styles/index.css'
import "../styles/nprogress.css"

import React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import withApollo from "../lib/withApollo"
import Page from '../components/Page';

class MyApp extends App {
  render () {
    const { Component, pageProps, apollo } = this.props

    return (
      <Container>
          <ApolloProvider client={apollo}>
            <Page>
              <Component {...pageProps} />
            </Page>
          </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)
