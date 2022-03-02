import express from 'express'
import userCtrl from '../controllers/userprofile.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/userprofiles')
  .get(userCtrl.list)
  .post(userCtrl.create)

router.route('/api/userprofiles/:userId')
  .get(userCtrl.read)
  .put(userCtrl.update)
  .delete(userCtrl.remove)

router.param('userId', userCtrl.userByID)

router.route('/api/userprofiles/:userId')
    .get(authCtrl.requireSignin, userCtrl.read)
    .put(authCtrl.requireSignin, authCtrl.hasAuthorization, 
     userCtrl.update)
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization, 
     userCtrl.remove)

export default router