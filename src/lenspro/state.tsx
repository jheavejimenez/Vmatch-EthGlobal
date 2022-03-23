//let authenticationToken: string | null = null
export let setAuthenticationToken = (token: string) => {
  
  localStorage.setItem("vmatch", token);
  //authenticationToken = token
  console.log('setAuthenticationToken: token', token)
}

export let getAuthenticationToken = () => {
  return localStorage.getItem("vmatch");

}
