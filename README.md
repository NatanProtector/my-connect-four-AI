# My Connect Four AI

## Overview
This is a web application for playing Connect Four against an "AI" player. The AI uses a Monte Carlo Tree Search (MCTS) algorithm, which I implemented as part of my reinforcement learning class. The project is currently in development.

## Current Features
- **AI Player:** Play against an AI powered by the Monte Carlo Tree Search (MCTS) algorithm.
- **React Frontend:** The client-side application is built using React.
- **Express Backend:** The server serves the React app and handles Python script execution.
- **Python Integration:** The server can execute Python scripts to facilitate AI functionality.

## Planned Features
- **Improved AI:** Continue to enhance the Monte Carlo Tree Search algorithm to make the AI smarter and more challenging.
- **UI Enhancements:** Further optimize the user interface for smoother gameplay.
- **Bug Fixes:** Address any issues or bugs in the AI, UI, or gameplay experience.

## Development Status
The game is fully functional with:
- The AI player integrated with Monte Carlo Tree Search (MCTS) for an engaging solo experience.
- The backend is set up to handle Python script execution for the AI logic.

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
- The Python script implements the Monte Carlo Tree Search algorithm, which enables the AI player to decide its moves.

## Future Goals
- **AI Improvements:** Fine-tune the Monte Carlo Tree Search algorithm to enhance the AI's decision-making capabilities.
- **UI/UX Enhancements:** Improve the user interface for better gameplay experience, including smoother animations and feedback.
- **Bug Fixes:** Address any bugs in the AI, user interface, or gameplay experience.

## License
This project is licensed under the [MIT License](LICENSE).

---

Thank you for checking out **My Connect Four AI**! Stay tuned for updates as the AI functionality is further developed.

--- 