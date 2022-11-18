import { model, Schema} from 'mongoose'
import { UserDocument, UserModel } from '../types'
import { hash, compare } from 'bcryptjs'

const userSchema = new Schema(
    {
        email: {
            type: String,
            validate: [
                async (email: String): Promise<Boolean> =>
                    !(await User.exists({email})), 'Email is already taken'
            ]
        },
        username: {
            type: String,
            validate: [
                async (username: String): Promise<Boolean> =>
                    !(await User.exists({username})), 'Username is already taken'
            ]
        },
        password: String,
        phone: String
    }
)

userSchema.pre('save', async function(this: UserDocument) {
    if (this.isModified('password')) {
        this.password = await User.hash(this.password)
    }
})

userSchema.statics.hash = (password: String): Promise<String> =>
    hash(password, 5)

userSchema.methods.matchesPassword = function(this: UserDocument, password: String): Promise<Boolean> {
    return compare(password, this.password)
}
const User = model<UserDocument, UserModel>('User', userSchema)
export default User