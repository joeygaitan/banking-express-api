const file = require('./filesync')
const accounts = require('./bank/accounts')
const uuidv4 = require('uuid/v4');

function getAll(){
    const accounts = file.filesync('read', '/accounts.json')
    const error = []
    if(!accounts.length){
        error.push('no accounts in the bank right now. You can always sign up and make one')
        return { error }
    }
    return accounts
}

function getOne(id){
    const accounts = file.filesync('read', '/accounts.json')
    const error = []
    
    const account = accounts.find(acc => acc.id === id)
    
    if(!account){
        error.push('the bank you are looking for does not exist')
        return { error }
    }

    return account;
}

function create(body){
    const accounts = file.filesync('read', '/accounts.json')
    const { bank,desc,name } = body 
    const error = []
    
    const account = { 
        "bank": bank,
        "desc": desc,
        "name": name,
        id: accounts.length,
        transactions: []
    }

    accounts.push(account)
    file.filesync("write", '/accounts.json', accounts)
    
    return account
}

function update(id, body){
    const accounts = file.filesync('read', '/accounts.json')
    const error = []
    const { bank,desc,name } = body
    const account = accounts.find(acc => acc.id === id)
    
    account.bank = bank
    account.desc = desc
    account.name = name
    file.filesync('write', '/accounts.json', accounts)

    return account
}

function deleteOne(id){
    const accounts = file.filesync('read', '/accounts.json')
    const account = accounts.find(acc => acc.id === id)
    const index = accounts.findIndex(acc => acc.id === id)
    const error = []

    accounts.splice(index, 1)
    file.filesync("write", '/accounts.json', accounts)


    if(!account){
        error.push('account id doesnt exist')
        return { data }
    }

    return accounts
}

module.exports = {getAll,getOne, create ,update, deleteOne }