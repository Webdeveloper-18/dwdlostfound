import {getAllUsers,getUserInforById,creatUser}from '../controller/user.controller.js'

import express from 'express'

const router=express.Router()

router.route('/').get(getAllUsers)
router.route('/').post(creatUser)
router.route('/:id').get(getUserInforById)

export default router;