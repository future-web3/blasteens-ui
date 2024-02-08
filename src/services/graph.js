import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { GET_SCORE_UPDATEDS, GET_WINNERS } from './queries'

const client = () => {
  return new ApolloClient({
    uri: 'https://api.studio.thegraph.com/query/62573/blasteens-game/v1.0.2',
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

export async function getWinners() {
  const fromBlock = 1306143
  const { data } = await client().query({
    query: gql(GET_WINNERS),
    variables: { fromBlock, first }
  })
  if (!data) {
    return []
  }
  return data.winners
}
