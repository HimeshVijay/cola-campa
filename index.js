const express = require('express');
const app = express();
const PORT = 8000;
const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to serve the certificate file
app.get('/progress/share/certificate.html', (req, res) => {
    const id = req.query.id;

    // Validate the `id` parameter to ensure it matches a specific pattern
    if (id && /^[a-zA-Z0-9._-]+$/.test(id)) {
        const filePath = path.join(__dirname, 'public', id);

        // Check if the file exists before sending it
        res.sendFile(filePath, (err) => {
            if (err) {
                res.status(404).send('File not found');
            }
        });
    } else {
        res.status(400).send('Invalid file id');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
