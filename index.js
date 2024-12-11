import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 8080;

const serveFile = (filePath, res, statusCode = 200) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(statusCode, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
};

const server = http.createServer((req, res) => {
    const basePath = path.resolve(); 
    const url = req.url;

    if (url === '/') {
        serveFile(path.join(basePath, 'index.html'), res);
    } else if (url === '/about') {
        serveFile(path.join(basePath, 'about.html'), res);
    } else if (url === '/contact-me') {
        serveFile(path.join(basePath, 'contact-me.html'), res);
    } else {
        serveFile(path.join(basePath, '404.html'), res, 404);
    }
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
