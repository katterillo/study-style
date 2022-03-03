import express from 'express'
import userCtrl from '../controllers/calendar.controller'

const router = express.Router()
//userCtrl is calendar.controller
router.route('/api/calendars')
  .get(userCtrl.list)
  .post(userCtrl.create)

// router.route('/api/calendars/:userId')
//   .get(userCtrl.read)
//   .put(userCtrl.update)
//   .delete(userCtrl.remove)

router.param('userId', userCtrl.userByID)


export default router