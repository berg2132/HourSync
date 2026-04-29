const uploadController = {
  upload(req, res) {
    if (!req.file) {
      return res.status(400).json({ mensagem: 'Nenhum arquivo enviado' });
    }

    return res.json({
      arquivo: req.file.filename,
      url: `/uploads/${req.file.filename}`,
    });
  },
};

module.exports = uploadController;
