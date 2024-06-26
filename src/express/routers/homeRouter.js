const express = require('express')
const router = express.Router()
const homeCtrl = require('../controllers/homeController')

router.get('/getData', homeCtrl.getData)
router.get('/getCryptoData', homeCtrl.getCryptoData)
router.get('/getWeather', homeCtrl.getWeather)

module.exports = router