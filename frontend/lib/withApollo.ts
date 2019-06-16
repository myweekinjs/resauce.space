import withApollo from "next-with-apollo"
import ApolloClient, { InMemoryCache } from "apollo-boost"

export default withApollo(({ ctx, headers, initialState }) => (
  new ApolloClient({
    uri: "http://165.22.254.99/graphql",
    cache: new InMemoryCache().restore(initialState || {})
  })
))
