import { apolloClient } from './apollo-client'
import { gql } from '@apollo/client'
import {
  getAddressFromSigner,
  setWindow,
  signedTypeData,
  splitSignature,
  getSigner,
} from './ethers-service'
// import { lensHub } from './lens-hub'
import { ethers } from 'ethers'
import { LENS_HUB_ABI, LENS_HUB_CONTRACT } from './config'

const CREATE_FOLLOW_TYPED_DATA = `
  mutation($request: FollowRequest!) { 
    createFollowTypedData(request: $request) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          FollowWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          profileIds
          datas
        }
      }
    }
 }
`

export const createFollowTypedData = (followRequestInfo: any) => {
  return apolloClient.mutate({
    mutation: gql(CREATE_FOLLOW_TYPED_DATA),
    variables: {
      request: { follow: followRequestInfo },
    },
  })
}

export const follow = async (profileId: string, window: any) => {
  setWindow(window)
  const lensHub = new ethers.Contract(
    LENS_HUB_CONTRACT,
    LENS_HUB_ABI,
    getSigner()
  )
  // hard coded to make the code example clear
  const followRequest = [
    {
      profile: profileId,
      followModule: null,
    },
  ]

  const address = await getAddressFromSigner()
  console.log(address)
  console.log(followRequest)
  const result = await createFollowTypedData(followRequest)

  const typedData = result.data.createFollowTypedData.typedData
  console.log('follow: typedData', typedData)

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value
  )
  console.log('follow: signature', signature)
  const { v, r, s } = splitSignature(signature)

  const tx = await lensHub.followWithSig({
    follower: address,
    profileIds: typedData.value.profileIds,
    datas: typedData.value.datas,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  })
  console.log('follow: tx hash', tx.hash)
  return tx.hash
}
