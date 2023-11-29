const express = require('express')
const router = express.Router()
const spendingCtrl = require('../controllers/spendingController')

router.get('/getData', spendingCtrl.getData)
router.post('/insertSpendList', spendingCtrl.insertSpendingList)
router.post('/getSpendingForSpendList', spendingCtrl.getSpendingForSpendList)
router.post('/insertSpending', spendingCtrl.insertSpending)
router.post('/updateSpending', spendingCtrl.updateSpending)
router.post('/deleteSpending', spendingCtrl.deleteSpending)

module.exports = router