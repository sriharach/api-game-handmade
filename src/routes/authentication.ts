import express from 'express'
import controllers from '../controllers'

const router = express.Router()

router.post('/login', controllers.authentication.Login)

export default router
