import { TypedDataDomain, TypedDataField } from '@ethersproject/abstract-signer'
import { ethers, utils } from 'ethers'
import { omit } from './helpers'

// This code will assume you are using MetaMask.
// It will also assume that you have already done all the connecting to metamask
// this is purely here to show you how the public API hooks together

let window = ''
let ethersProvider: any = null

export const setWindow = (object: any) => {
  window = object
  ethersProvider = new ethers.providers.Web3Provider((window as any)?.ethereum)
}

export const getAddress = async () => {
  const accounts = await (window as any).ethereum.request({
    method: 'eth_requestAccounts',
  })
  return accounts[0]
}

export const getCheckSumAddress = async () => {
  const address = await getAddress()
  return ethers.utils.getAddress(address)
}

export const signText = (text: string) => {
  return ethersProvider.getSigner().signMessage(text)
}

export const getSigner = () => {
  return ethersProvider.getSigner()
}
export const signedTypeData = (
  domain: TypedDataDomain,
  types: Record<string, TypedDataField[]>,
  value: Record<string, any>
) => {
  const signer = ethersProvider.getSigner()
  // remove the __typedname from the signature!
  return signer._signTypedData(
    omit(domain, '__typename'),
    omit(types, '__typename'),
    omit(value, '__typename')
  )
}

export const splitSignature = (signature: string) => {
  return utils.splitSignature(signature)
}

export const getAddressFromSigner = async () => {
  return await getSigner().getAddress()
}
