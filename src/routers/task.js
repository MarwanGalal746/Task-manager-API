const express = require('express')
const Task = require('../db/models/task')
const router = new express.Router()


router.post('/tasks', async (req, res) => {
    const t = new Task(req.body)
    try {
        await t.save()
        res.status(201).send(t)
    } catch(e) {
        res.status(400).send(e)
    }
})



router.get('/tasks',async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    }
    catch (e) {
        res.status(500).send(e)
    }   
})

router.get('/tasks/:id',async (req, res) => {
    const _id = req.params.id
    try{
        const task = await Task.findById({_id})
        if(!task) res.status(404).send
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


router.patch('/tasks/:id' , async (req, res) => {
    const updates = Object.keys(req.body)
    const allowed = ["description", "completed"]
    const isValidOp = updates.every((update) => allowed.includes(update))
    if(!isValidOp) return res.status(404).send("Invalid updates")
    try {
        // const task = await Task.findByIdAndUpdate(req.params.id,req.body , {new: true, runValidators: true})
        const task = await Task.findById(req.params.id)
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        if(!task) return res.status(404).send()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id' , async (req,res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) return res.status(404).send()
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router