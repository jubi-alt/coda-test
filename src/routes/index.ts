import path from 'path'
import multer from 'multer'
import { Router } from 'express'
import * as csv from './csv'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'tmp/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage })

export const setupRoutes = (router: Router) => {
  router.post('/csv/upload', upload.single('file'), csv.upload)
  router.post('/csv/process', csv.process)
}
