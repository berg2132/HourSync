const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const uploadController = require('../controllers/uploadController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.resolve(process.env.UPLOAD_DIR || 'uploads');
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const nome = `${uuidv4()}_${file.originalname.replace(/\s/g, '_')}`;
    cb(null, nome);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const tipos = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (tipos.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de arquivo nao permitido. Use PDF, JPG ou PNG.'));
    }
  },
});

router.post('/', upload.single('file'), uploadController.upload);

module.exports = router;
