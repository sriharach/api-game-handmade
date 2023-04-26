import express from 'express'
import controllers from '../controllers'

const router = express.Router()

router.post('/create', controllers.prohibitedWord.InsertWords)
router.get('/random', controllers.prohibitedWord.RandomWord)
router.post('/reset', controllers.prohibitedWord.Newgame)
router.get('/join', controllers.prohibitedWord.JoinRoom)
router.delete('/', controllers.prohibitedWord.RemoveAll)

export default router
