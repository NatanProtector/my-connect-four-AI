const express = require('express');
const { spawn } = require('child_process');
const app = express();

// Serve static files from the react app in connect-four-app/build
app.use(express.static('../connect-four-app/build'));

const run_script = async () => {
    const scriptPath = './python_files/test.py';
    const args =  []; 

    return new Promise((resolve, reject) => {
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
            if (error) {
                reject(error); // Reject the Promise if there's an error
            } else {
                resolve(output); // Resolve the Promise with the output
            }
        });
    });
}

app.get ('/test', async (req, res) => {
    const result = await run_script();
    console.log(result);
    res.send(result);
})

app.get('/', (req, res) => {

    // Serve the react app
    res.sendFile('index.html', { root: '../connect-four-app/build' });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});