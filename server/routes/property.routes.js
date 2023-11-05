import express from 'express'

import {createProperty,deleteProperty,getAllProperty,getPropertyById,updateProperty} from '../controller/property.controller.js'


const routerp=express.Router()
routerp.route('/').get(getAllProperty)

routerp.route('/:id').get(getPropertyById)
routerp.route('').post(createProperty)
routerp.route('/:id').patch(updateProperty)
routerp.route('/:id').delete(deleteProperty)

export default routerp