import AsyncStorage from '@react-native-async-storage/async-storage';



export class UserServices{

    static currentUser = "";




 storeCurrentUser = async (userId:string) => {

    console.log("trying to set current user with id: " + userId)

    try {
        await AsyncStorage.setItem('@userId', userId)
        UserServices.currentUser = userId
        return userId;
      } catch (e) {
        // saving error
        console.log("Could not save current user\n\n" + JSON.stringify(e))
        return "none"
      }



}

 storeCurrentHouse = async (houseId:string) => {

    try {
        await AsyncStorage.setItem('@houseId', houseId)
        return houseId;
      } catch (e) {
        // saving error
        console.log("Could not save current house id")
        return "none"
      }



}

 getCurrentUser = async () => {

    if (UserServices.currentUser == "")
    try {
      const value = await AsyncStorage.getItem('@userId')
      if(value !== null) {
            UserServices.currentUser = value
            return UserServices.currentUser;
        }
    } catch(e) {
      // error reading value
      console.log("could not get current user")
    }

    else return UserServices.currentUser
  }
  
 getCurrentHouse = async () => {
    try {
      const value = await AsyncStorage.getItem('@houseId')
      if(value !== null) {
            return value;
        }
    } catch(e) {
      // error reading value
      console.log("could not get current house")
    }
  }
  



 logOutCurrentUser = () => {this.storeCurrentUser("");}

}