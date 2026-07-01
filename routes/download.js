// dependencies
import express from 'express';
import {
  downloadWithffmpeg.
  downloadWithytdlp
} from '../controllers/downloadController.js'

// middleware
const router = express.Router()

// routes

router.post('/ffmpeg', downloadWIthFfmpeg);
router.post('/ytdlp', downloadWithYtdlp)

export default router;
