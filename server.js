const express = require('express');
const multer = require('multer');
var { analyzeImage } = require('./imgana/imageAnalyzer.js');

const app = express();
const port = process.env.PORT || 3000;

const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/analyze', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const imagePath = req.file.path;
    try {
        const analysisResults = await analyzeImage(imagePath);
        return res.json(analysisResults);
    } catch (error) {
        console.error('Error analyzing image:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
