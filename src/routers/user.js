const express = require('express')
const router = new express.Router()
const User = require('../db/models/user')

router.post('/users', async (req, res) => {
    const u = new User(req.body)
    try {
        await u.save()
        res.status(201).send(u)
    } catch(e) {
        res.status(400).send(e)
    }
    res.status(400).send(e)
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
        const user = await User.findByIdAndUpdate(req.params.id,req.body , {new: true, runValidators: true})
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