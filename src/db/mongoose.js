const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required : true,
        trim:true,
    },
    age: {
        type: Number,
        trim:true,
        validate(value) {
            if(value < 0)
                throw new error ('This is invalid age');
        },
        default: 0
    },
    email : {
        type : String,
        required:true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new error ('This is invalid email')
            }
        }
    },
    password : {
        type : String,
        required:true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().include('password'))
             throw new error ('This is invalid passwrod')
        }
    }
})

const me = new User({
    name: 'marwan       ',
    age: 20,
    email :'Marwangalal84@gmail.com            ',
    password : 'mrmrmrmrpassword'
})

// me.save().then(() => { 
//     console.log(me)
// }).catch((error) => {
//     console.log('Error!', error)
// })

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required:true,
        trim:true
    },
    completed: {
        type: Boolean,
        default:false,
    }
})

const task = new Task({
    description: '                     Learn the Mongoose library             ',
})

task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log(error)
})


// User.deleteOne({ name: { $gte: 'marwan' } }).then(function(){
//     console.log("Data deleted"); // Success
// }).catch(function(error){
//     console.log(error); // Failure
// });
