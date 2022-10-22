import { UserDocument } from '../types'
import {User} from '../models'

/**
 * Resolver for the user
 * 
 * @name userResolver
 * @method me
 * @method signUp
 */

/**
 * Searchs for the user document matching a given username
 * 
 * @name me
 * @in UserResolver
 * @param username
 * @returns the user document matching the given username
 */

/**
 * Creates a user
 * 
 * @name signUp
 * @in UserResolver
 * @param email
 * @param password
 * @returns the user document of the newly created user
 */

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
