const { register, readMany, readOne, update, remove } = require('../../services/vechile/registerVechile.service')
const auth = require('../../../middlewire/authorization')
const router = require('express').Router()

router.route('/').post(auth.protect, register).get(auth.protect,readMany)
router.route("/:id").get(auth.protect,readOne).put(auth.protect,update).delete(auth.protect,remove)

module.exports = router