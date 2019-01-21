const file = require('./filesync')
const transactions = require('./bank/transactions')
const uuidv4 = require('uuid/v4');

function getOne(id){
   const transactions = file.filesync('read', 'transactions.json')
   const transaction = transactions.find(trans => trans.id == id)
   const error = []
   if(!transaction){
    error.push('transaction id doesnt exist')
    return { error }
   }

   return transaction
}

function create(id, body){
    const transactions = file.filesync('read', 'transactions.json')
    const accounts = file.filesync('read', '/accounts.json')
    const account = accounts.find(acc=>id===acc.id)
    const accountIndex = accounts.findIndex(acc=> account === acc)
    const { amount, title } = body
    const error = []
    if(!account){
        error.push('account was not found')
        return { error }
    }

    if(title.length > 8){
        error.push('Cannot be more than 8 characters')
        return { error }
    }
    
    const transaction = { "amount": amount, pending: true, "id": uuidv4(), "title": title}
    accounts[accountIndex].transactions.push(transaction)
    transactions.push(transaction)
    file.filesync('write', 'transactions.json', transactions)
    file.filesync('write', 'accounts.json', accounts)
    
    return account
}

function update(tranid, body){
    const transactions = file.filesync('read', 'transactions.json')
    const transaction = transactions.find(tran => tran.id == tranid)
    const transactionIndex = transactions.findIndex(tran=> tran === transaction)
    const error = []
    const { title, pending} = body

    if(!transaction){
        error.push('transaction not found')
        return { error }
    }

    transactions[transactionIndex].title = title
    transactions[transactionIndex].pending = pending
    file.filesync('write', 'transactions.json', transactions)

    return transaction
}

function remove(accountid, tranid){
    const accounts = file.filesync('read','accounts.json')
    const transactions = file.filesync('read', 'transactions.json')

    const account = accounts.find(acc=>accountid == acc.id)
    const accindex = account.transactions.findIndex(tran=> tran == tranid)
    const transaction = transactions.find(tran => tran.id == tranid)
    
    transactions.splice(transaction.id, 1)
    accounts.splice(accindex, 1)

    file.filesync('write', 'accounts.json', accounts)
    file.filesync('write', 'transactions.json', transactions)

    return accounts
}

module.exports = { getOne, create, update, remove }