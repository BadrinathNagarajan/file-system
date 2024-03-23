const express = require ('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// API endpoint to create a text file with current timestamp as content
app.post('/createFile', (req, res) => {
    const folderPath = 'Desktop'; // Specify your folder path here
    const currentDate = new Date();
    const formattedDate = currentDate.toString(); // Format: YYYY-MM-DD_HH-mm-ss
    const fileName = `${formattedDate}.txt`;
    const fileContent = currentDate.toString();

    fs.writeFile(folderPath, fileContent, (err) => {
        if (err) {
            console.error('Error creating file:', err);
            return res.status(500).json({ error: 'Error creating file' });
        }
        console.log('File created successfully');
        res.json({ message: 'File created successfully', fileName: fileName });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
