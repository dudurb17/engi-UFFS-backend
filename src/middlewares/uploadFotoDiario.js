const fs = require('fs');
const path = require('path');
const multer = require('multer');

const destino = path.join(__dirname, '..', '..', 'uploads', 'diarios');

if (!fs.existsSync(destino)) {
  fs.mkdirSync(destino, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_, __, cb) => cb(null, destino),
  filename: (req, file, cb) => {
    const diarioId = req.query.id || 'novo';
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${diarioId}-${Date.now()}${ext}`);
  }
});

const tiposPermitidos = ['image/jpeg', 'image/png', 'image/webp'];

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    if (tiposPermitidos.includes(file.mimetype)) {
      cb(null, true);
      return;
    }

    cb(new Error('Tipo de arquivo não permitido. Use JPEG, PNG ou WebP.'));
  }
});

module.exports = upload.single('foto');
