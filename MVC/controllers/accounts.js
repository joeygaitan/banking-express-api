const model = require('../models/accounts');

const getAll = (req,res,next) => {
    const data = model.getAll()

    if(data.error){
        return next({status: 400, message: `no accounts were found`, error: data.error})
    }

    res.status(200).send({ data })
}

const getOne = (req,res,next)=>{
    const data = model.getOne(req.params.id)
    if (data.error){
        return next({status: 400, message: `account not found`, error: data.error})
    }
    
    res.status(200).send({ data })
}

const create = (req,res,next)=>{
    console.log(req.body)
    const data = model.create(req.body)
    
    

    res.status(201).send({ data })
}

const update = (req,res,next)=>{
    const data = model.update(req.params.id, req.body)
    
    res.status(201).send(req.body)
}

const deleteOne = (req,res,next) => {
    const data = model.deleteOne(req.params.id)

    res.status(200).send(data)
}

module.exports = { getAll, getOne, create, update, deleteOne }