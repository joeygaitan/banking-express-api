const express = require('express')
const router = express.Router({mergeParams: true})
const interFaceController = require('../controllers/transactions')

router.post('/transactions', interFaceController.create)

router.get('/transactions/:transactionid', interFaceController.getOne)

router.patch('/transactions/:transactionsId', interFaceController.update)

router.delete('/transactions/:transactionid', interFaceController.remove)

module.exports = router