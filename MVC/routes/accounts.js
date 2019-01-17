const express = require('express')
const router = express.Router()
const interfacesController = require('../controllers/accounts')

router.get('/', interfacesController.getAll)

router.get('/:id', interfacesController.getOne)

router.post('/', interfacesController.create)

router.put('/:id', interfacesController.update)

router.delete('/:id', interfacesController.deleteOne)


module.exports = router;