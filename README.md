Here’s the updated version of your README, modified to reflect the live deployment URL:

---

# My Connect Four AI

## Overview
This is a web application for playing Connect Four against an "AI" player. The AI uses a Monte Carlo Tree Search (MCTS) algorithm, which I implemented as part of my reinforcement learning class. The project is currently deployed and accessible at [Natans's Connect Four](https://my-connect-four-ai.onrender.com/).

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
1. Clone the repository
   
3. Install all dependencies, build the React app, and start the server:
   ```bash
   npm run install-all
   npm run build-start
   ```

## How It Works
- The React app handles the game logic and user interface for Connect Four.
- The Express server serves the React app and has routes for playing versus the AI.
- The Python script implements the Monte Carlo Tree Search algorithm, which enables the AI player to decide its moves.

## Future Goals
- **AI Improvements:** Fine-tune the Monte Carlo Tree Search algorithm to enhance the AI's decision-making capabilities.
- **UI/UX Enhancements:** Improve the user interface for better gameplay experience, including smoother animations and feedback.
- **Bug Fixes:** Address any bugs in the AI, user interface, or gameplay experience.

---

Thank you for checking out **My Connect Four AI**! Stay tuned for updates as the AI functionality is further developed.

---
