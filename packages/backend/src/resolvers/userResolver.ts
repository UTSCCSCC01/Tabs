import { UserDocument } from '../types'
import {User} from '../models'

const resolvers = {
    Query: {
        me: async(
            root,
            args: {username: String},
            ):
            Promise<UserDocument | null> =>{
                return await User.findById(args).exec()
            }
    },

    Mutation: {
        signUp: async(
            root,
            args: {email: String, username: String, password: String, phone: String}
        ): Promise<UserDocument|null> =>{
            if (args.email == "" || args.username == "" || args.password == "" || args.phone == "") {
                console.log("One of the args is empty")
                return null
            }
            let res;
            const user = await User.create(args)
            .then((user) => {
                res = user
                console.log("Account added to server")
            }).catch((user) => {
                res = null
                console.log("Something went wrong")
            })
            
            return res
        },

        signIn: async(
            root,
            args: {username: String, password: String}
        ): Promise<UserDocument|null> =>{
            if (args.username == "" || args.password == ""){
                console.log("One of the args is empty")
                return null
            }
            const user = await User.findOne({ username: args.username })
            if (user == null) {
                console.log("User not found")
                return null
            } else if (await user.matchesPassword(args.password)) {
                console.log("Password matches")
                return user
            } else {
                console.log("Password does not match")
                return null
            }            
        },

        signOut: async(
            root,
            args: {}
        ): Promise<Boolean> =>{
            console.log("signOut called")
            return true
        }
    }
}

export default resolvers
