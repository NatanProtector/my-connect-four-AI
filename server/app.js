const express = require('express');
const { spawn } = require('child_process');
const app = express();

// Serve static files from the react app in connect-four-app/build
app.use(express.static('../connect-four-app/build'));

const run_script = () => {
    const scriptPath = './python_files/test.py';
    const args =  []; 

    // Spawn a child process to run the Python script
    const pythonProcess = spawn('python', [scriptPath, ...args]);

    let output = '';
    let error = '';

    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
    });

    pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
        console.log('Output:', output);
        if (error) {
            console.error('Error:', error);
        }
    });
}

app.get ('/test', (req, res) => {
    run_script();
    res.send('test');
})

app.get('/', (req, res) => {

    // Serve the react app
    res.sendFile('index.html', { root: '../connect-four-app/build' });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});