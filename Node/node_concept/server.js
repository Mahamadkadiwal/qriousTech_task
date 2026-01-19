const cluster = require('node:cluster');
const express = require('express');

const os = require('os');
const port = 8000;

const numCPUs = os.cpus().length;


if(cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else{
    const app = express();
    
    app.get('/', (req, res) => {
        res.send(`Hello, World! ${process.pid}`);
    });

    app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    
     console.log(`Worker ${process.pid} started`);
});
}