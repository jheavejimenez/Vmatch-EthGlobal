import { gql } from '@apollo/client'
import { apolloClient } from './apollo-client'

const CREATE_PROFILE = `
mutation($request: CreateProfileRequest!) { 
  createProfile(request: $request) {
    ... on RelayerResult {
      txHash
    }
    ... on RelayError {
      reason
    }
          __typename
  }
}`

export const createProfile = async (createProfileRequest: any) => {
  return await apolloClient.mutate({
    mutation: gql(CREATE_PROFILE),
    variables: {
      request: createProfileRequest,
    },
  })
}
