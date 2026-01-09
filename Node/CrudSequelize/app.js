const express = require('express');
const app = express();
const productRouter = require('./routes/product.routes');
const uploads = require('./middlewares/fileUploadMiddleware');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post('/upload', uploads.single('file'), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  res.json({
    message: "File uploaded successfully",
    file: req.file
  })
});

app.use('/product', productRouter);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Internal Server Error"
  });
});

module.exports = app;