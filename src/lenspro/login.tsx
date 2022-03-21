import {
  getAddress,
  signText,
  getCheckSumAddress,
  signedTypeData,
  splitSignature,
  getAddressFromSigner,
} from './ethers-service'
import { generateChallenge } from './generate-challenge'
import { authenticate } from './authenticate'
import { apolloClient } from './apollo-client'
import { gql } from '@apollo/client'
import { setAuthenticationToken, getAuthenticationToken } from './state'

export const login = async () => {
  /* if (getAuthenticationToken()) {
       console.log('login: already logged in');
       return;
     }*/
  // we grab the address of the connected wallet
  const address = await getAddress()
  // setUserAddress(address)
  console.log(address)

  // we request a challenge from the server
  const challengeResponse = await generateChallenge(address)

  // sign the text with the wallet
  const signature = await signText(challengeResponse.data.challenge.text)

  const accessTokens = await authenticate(address, signature)
  setAuthenticationToken(accessTokens.data.authenticate.accessToken)
  // setAccessTokens(accessTokens as any)
  console.log(accessTokens)
  // you now have the accessToken and the refreshToken
  // {
  //  data: {
  //   authenticate: {
  //    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJub3JtYWwiLCJpYXQiOjE2NDUxMDQyMzEsImV4cCI6MTY0NTEwNjAzMX0.lwLlo3UBxjNGn5D_W25oh2rg2I_ZS3KVuU9n7dctGIU",
  //    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjB4YjE5QzI4OTBjZjk0N0FEM2YwYjdkN0U1QTlmZkJjZTM2ZDNmOWJkMiIsInJvbGUiOiJyZWZyZXNoIiwiaWF0IjoxNjQ1MTA0MjMxLCJleHAiOjE2NDUxOTA2MzF9.2Tdts-dLVWgTLXmah8cfzNx7sGLFtMBY7Z9VXcn2ZpE"
  //   }
  // }
}
