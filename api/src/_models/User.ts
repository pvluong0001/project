import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcryptjs'
import {IUser} from "../_types/model";

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

UserSchema.pre('save', function (next) {
    // @ts-ignore
    const user: IUser = this

    if (!user.isModified('password'))
        return next()

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err)

            // override the cleartext password with the hashed one
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = function (password: string) {
    return bcrypt.compareSync(password, this.password)
}

export default mongoose.model<IUser>('User', UserSchema);
