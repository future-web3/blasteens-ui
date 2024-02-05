import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { GET_SCORE_UPDATEDS } from './queries'

const client = () => {
  return new ApolloClient({
    uri: 'https://api.studio.thegraph.com/query/62573/blasteens-game/v0.0.8',
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      }
    }
  })
}

const first = 1000

export async function getScoreUpdated() {
  const fromBlock = 1202089
  const { data } = await client().query({
    query: gql(GET_SCORE_UPDATEDS),
    variables: { fromBlock, first }
  })
  if (!data) {
    return []
  }
  return data.scoreUpdateds
}
