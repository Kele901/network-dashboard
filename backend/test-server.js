const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Test server is running');
});

const server = app.listen(8080, 'localhost', (error) => {
    if (error) {
        console.error('Error starting server:', error);
        return;
    }
    const address = server.address();
    console.log(`Server is running at http://localhost:${address.port}`);
    console.log('Server details:', address);
}).on('error', (error) => {
    console.error('Server error:', error);
}); 