# My Connect Four AI

## Overview
This is a web application for playing Connect Four against an "AI" player. The AI will use a Monte Carlo Tree Search (MCTS) algorithm, which I implemented as part of my reinforcement learning class. The project is currently in development.

## Current Features
- **Two-Player Mode:** Play Connect Four locally between two players on the same computer.
- **React Frontend:** The client-side application is built using React.
- **Express Backend:** The server serves the React app and handles Python script execution.
- **Python Integration Testing:** The server can execute Python scripts to test AI-related functionality.

## Planned Features
- **AI Player:** Implement and integrate the Monte Carlo Tree Search algorithm to allow users to play against the AI.

## Development Status
Currently, the AI is not implemented. The main focus has been on setting up the infrastructure for:
- Local two-player gameplay.
- Backend and frontend communication.
- Testing Python integration for the upcoming AI functionality.

## Installation and Setup

### Prerequisites
- Node.js
- Python (ensure it's added to your system PATH)

### Steps to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/my-connect-four-AI.git
   cd my-connect-four-AI
   ```
2. Install all dependencies, build the React app, and start the server:
   ```bash
   npm run install-all
   npm run build-start
   ```

### Scripts
```json
"scripts": {
    "install-all": "npm --prefix ./connect-four-app install && npm --prefix ./server install",
    "build": "npm --prefix ./connect-four-app run build",
    "start": "npm --prefix ./server",
    "build-start": "npm --prefix ./connect-four-app run build && npm --prefix ./server start"
}
```

## How It Works
- The React app handles the game logic and user interface for Connect Four.
- The Express server serves the React app and has routes for testing Python integration.
- The Python script will eventually include the AI logic for playing Connect Four.

## Future Goals
- Complete the implementation of the Monte Carlo Tree Search algorithm.
- Integrate the AI with the frontend and backend.
- Enhance the UI/UX for smoother gameplay.

## License
This project is licensed under the [MIT License](LICENSE).

---

Thank you for checking out **My Connect Four AI**! Stay tuned for updates as the AI functionality is implemented.

