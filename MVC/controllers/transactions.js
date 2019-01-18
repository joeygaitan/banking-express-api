const model = require('../models/transactions')

const getOne = (req,res,next) => {
    const data = model.getOne(req.params.transactionid)

    if(data.error){
        return next({status: 404, message: `no transaction was found`, error: data.error})
    }

    res.status(200).send( {data} )
}

const create = (req,res,next) => {
    const data = model.create(parseInt(req.params.id), req.body)

    if(data.error){
        return next({status: 404, message: 'not properly built', error: data.error})
    }

    res.status(201).send( {data} )
}

const update = (req,res, next)=>{
    const data = model.update(req.params.id, req.body)
    
    res.status(200).send( {data} )
}

const remove = (req, res, next) => {
    console.log(req.params.id, req.params.transactionid)
    const data = model.remove(req.params.id, req.params.transactionid)

    if (data.error) {
        return next({ status: 400, message: `delete author failed`, errors: data.errors })
      }

    res.status(200).send( {data} )
}

module.exports = { getOne, create, update, remove }
    // , create, update, delete