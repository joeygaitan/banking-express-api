const express = require('express')
const router = express.Router()
const interFaceController = require('../controllers/transactions')

// router.post('/transactions', interFaceController.create)

router.get('/transactions/:transactionsId', interFaceController.getOne)

// router.patch('/transactions/:transactionsId', interFaceController.edit)

// router.delete('/delete/:transactionsId', interFaceController.delete)

module.exports = router