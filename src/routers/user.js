const express = require('express')
const router = new express.Router()
const User = require('../db/models/user')

router.post('/users', async (req, res) => {
    const u = new User(req.body)
    try {
        await u.save()
        const token = await u.generateAuthToken()
        res.send({u,token})
        res.status(201).send(u)
    } catch(e) {
        res.status(400).send()
    }
    res.status(400).send()
})

router.post('/users/login', async (req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        console.log(user)
        const token = await user.generateAuthToken()
        res.send({user,token})
    } catch(e) {
        res.status(400).send()
    }

})

router.get('/users', async  (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }    
})

router.get('/users/:id',async (req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById({_id})
        if(!user) return res.status(404).send();
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

router.patch('/users/:id' , async (req, res) => {
    const updates = Object.keys(req.body)
    const allowed = ["name", "email", "password", "age"]
    const isValidOp = updates.every((update) => allowed.includes(update))
    if(!isValidOp) return res.status(404).send("Invalid updates")
    try {
        // const user = await User.findByIdAndUpdate(req.params.id,req.body , {new: true, runValidators: true})
        const user = await User.findById(req.params.id)
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        if(!user) return res.status(404).send()
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.delete('/users/:id' , async (req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user) return res.status(404).send()
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router