const filesync = require('./filesync')
const transactions = require('/bank/transactions')
const uuidv4 = require('uuid/v4');

function getOne(id){
   const transactions = file.filesync('read', '/transactions.json')
   const transaction = transactions.find(tran => tran.id === id)
   const error = []

   if(!transaction){
    error.push('transaction id doesnt exist')
    return { error }
   }

   return transaction
}

module.exports = { getOne }