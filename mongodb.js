// const mongodb = require('mongodb')

// const MongoClient = mongodb.MongoClient

// const connectionURL = 'mongodb://127.0.0.1:27017'

// const databaseName = 'Task-manager'

// MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
//     if(error) 
//         console.log('Can\'t connect to database')

//     const db = client.db(databaseName)
//     // db.collection('tasks').insertOne(
//     //     {
//     //         description: "traveling",
//     //         completed: true
//     //     }
//     // , (error,result) => {
//     //     if(error){
//     //         console.log("Can't insert the documents")
//     //     }
//     //     console.log(result.ops)
//     // })
//     // db.collection('tasks').findOne({_id: new mongodb.ObjectID('6084fe1025a2a82736e5ad00')}, 
//     // (error,task) => {
//     //     if(error) console.log("can't find");
//     //     console.log(task)
//     // })

//     // db.collection('tasks').find({completed:false}).toArray((error,tasks) => {
//     //     if(error) console.log("can't find");
//     //     console.log(tasks)
//     // })
//     // db.collection('users').updateMany({_id : new mongodb.ObjectID("6084e913ef5f331a6a0ecb33")},
//     // {
//     //     $inc:{
//     //         age:1
//     //     }
//     // }).then((result) => {
//     //     console.log(result)
//     // }).catch((error) => {
//     //     console.log(error)
//     // })
//     // db.collection('users').deleteMany({name : 'msmr'}).then((result) => {
//     //     console.log(result.deletedCount)
//     // }).catch((error) => {
//     //     console.log(error)
//     // })
// })