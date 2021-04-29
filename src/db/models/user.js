const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
//     useNewUrlParser: true,
//     useCreateIndex: true
// })
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    tokens : [{
        token : {
            type: String,
            required: true
        }
    }]
})


userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()} , 'thisismynewcourse')
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if(!user) {
        
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    
    return user
}

userSchema.pre('save' , async function (next) { 
    const user = this
    if(user.isModified) {
        user.password = await bcrypt.hash(user.password,8)
    }
    next()
})


const User = mongoose.model('User', userSchema)

module.exports = User


// const myFunction  = async () => {
//     const pass = '00112233'
//     const enc = await bcrypt.hash(pass, 8)
//     const isMatch = await bcrypt.compare('pass', enc)
//     console.log(isMatch)
// }

// myFunction()