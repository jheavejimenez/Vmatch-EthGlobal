import {doesFollowRequest} from './doesfollow'


export const isFollowing = async (address:string,profileId:string)=> {
   
    const result = await doesFollowRequest([{followerAddress:address ,profileId:profileId}]);
    console.log(result.data.doesFollow[0].follows)
    return result.data.doesFollow[0].follows;
}


