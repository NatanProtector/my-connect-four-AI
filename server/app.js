const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors()); 

// Serve static files from the react app in connect-four-app/build
app.use(express.static('../connect-four-app/build'));

// Add json parsing middleware
app.use(express.json());

const run_script = async (scriptPath, args) => {

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

const get_response_from_AI = async (board_string) => {

    // Parameter for the monte carlo tree search. determines balance between exploration and exploitation
    const c = 2

    const epochs = 250

    const result = await run_script('./python_files/ConnectFourAI.py', [epochs, c, board_string]);

    return result
}

const parse_board_string_for_AI = (board_string) => {
    // Change every 'R' to 'X' and every 'Y' to 'O' using regulare expressions
    const new_board_string = board_string.replace(/R/g, 'X').replace(/Y/g, 'O')
    return new_board_string
}

// app.get ('/test', async (req, res) => {
//     const result = await run_script();
//     // console.log(result);
//     res.send(result);
// })

app.get('/', (req, res) => {

    // Serve the react app
    res.sendFile('index.html', { root: '../connect-four-app/build' });
});

app.post('/move', async (req, res) => {

    // Get the move from the request body
    var {col, board_string} = req.body;

    board_string = parse_board_string_for_AI(board_string)

    // console.log("Move received:", col, board_string);
    
    const result = await get_response_from_AI(board_string);   
    
    // console.log("Response:", result);
    
    // console.log("------------------------------------");
    
    const response = {
        message: 'Move received',
        move: {col:col, board_string:board_string}
    }

    if (result[0] != "I") {
        response.response = result[0];
    }

    res.send(response);
    
})

app.listen(3000, () => {
    console.log('Server started on port 3000');
});