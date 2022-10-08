import { UserDocument } from '../types'
import {User} from '../models'

const resolvers = {
    Query: {
        me: async(
            root,
            args: {username:string},
            ):
            Promise<UserDocument | null> =>{
                return await User.findById(args).exec()
            }
    },

    Mutation: {
        signUp: async(
            root,
            args: {email: string; password:string}
        ): Promise<UserDocument> =>{

            const user = await User.create(args)
            console.log("added to server")
            return user
        }
    }
}

export default resolvers
