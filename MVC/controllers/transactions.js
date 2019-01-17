const model = require('../models/transactions')

const getOne = (req,res,next) => {
    const data = model.getOne(req.params.transactionId)

    if(data.error){
        return next({status: 404, message: `no transaction was found`, error: data.error})
    }

    res.status(200).send( {data} )
}

// const create = (req,res,next) => {
//     const data = model.create(req.params.id, req.body)

//     res.status(201).send( {data} )
// }

// const update = (req,res, next)=>{
//     const data = model.update(req.params.transactionId, req.body)
    
//     res.status(200).send( {data} )
// }

// const delete = (req, res, next) => {
//     const data = model.delete(req.params.id, req.params.transactionId)

//     res.status.send( {data} )
// }

module.exports = { getOne
    // , create, update, delete 
}