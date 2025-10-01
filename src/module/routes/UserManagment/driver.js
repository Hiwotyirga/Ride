const { register, readMany, readOne, update, remove, login, changePassword, forgetPassword } = require('../../services/UserManagment/driver')
const auth = require('../../../middlewire/authorization')
const router = require('express').Router()

router.post('/login', login)
router.route('/').post(register).get(auth.protect,readMany)
router.route("/:id").get(auth.protect,readOne).put(auth.protect,update).delete(auth.protect,remove)
router.route('/changePassword').post(auth.protect,changePassword)
router.route("/reset").put(forgetPassword)

module.exports = router



