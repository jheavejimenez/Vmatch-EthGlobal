// this is showing you how you use it with react for example
// if your using node or something else you can import using
// @apollo/client/core!
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from '@apollo/client'
import { getAuthenticationToken } from './state'
const APIURL = 'https://api-mumbai.lens.dev/'
const httpLink = new HttpLink({
  uri: APIURL,
  fetch,
})

// example how you can pass in the x-access-token into requests using `ApolloLink`
const authLink = new ApolloLink((operation, forward) => {
  const token = getAuthenticationToken()
  console.log('jwt token:', token)

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      'x-access-token': token ? `Bearer ${token}` : '',
    },
  })

  // Call the next link in the middleware chain.
  return forward(operation)
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
