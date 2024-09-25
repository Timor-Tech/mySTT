# Real-time Voice-to-Text Transcription (Bahasa Malaysia)

This project is a real-time voice-to-text transcription application specifically designed for Bahasa Malaysia. It uses React for the frontend, Node.js with Express for the backend, and Socket.IO for real-time communication.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- Real-time voice-to-text transcription for Bahasa Malaysia
- WebSocket-based real-time updates using Socket.IO
- MongoDB integration for storing transcriptions
- React-based user interface
- Express.js backend API

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (version 12.x or higher)
- npm or yarn
- MongoDB (running locally or a connection string to a MongoDB instance)
- A modern web browser that supports the Web Speech API (e.g., Chrome)

## Installation

To install the application, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Install the dependencies for the client:
   ```
   cd client
   npm install
   ```

3. Install the dependencies for the server:
   ```
   cd ../server
   npm install
   ```

4. Set up your MongoDB connection:
   - Open `server/index.js`
   - Update the MongoDB connection string if necessary:
     ```javascript
     mongoose.connect('mongodb://localhost/voice-to-text-bm', {
       useNewUrlParser: true,
       useUnifiedTopology: true,
     });
     ```

## Usage

To run the application:

1. Start the server:
   ```
   cd server
   node index.js
   ```
   The server will start on http://localhost:5050

2. In a new terminal, start the client:
   ```
   cd client
   npm run dev
   ```
   The client will be available at http://localhost:3000 (or the port specified by Vite)

3. Open your web browser and navigate to the client URL

4. Click the "Start Listening" button and begin speaking in Bahasa Malaysia

5. The application will transcribe your speech in real-time and display it on the screen

## Project Structure

- `client/`: React frontend application
  - `src/`: Source files for the React app
    - `App.jsx`: Main application component
    - `VoiceToText.jsx`: Component handling voice recognition and transcription
  - `vite.config.js`: Vite configuration file
- `server/`: Node.js backend application
  - `index.js`: Main server file
  - `models/`: MongoDB models
  - `routes/`: API routes

## API Documentation

The server exposes the following API endpoint:

- `GET /api/transcripts`: Retrieve all transcripts, sorted by creation date (most recent first)

The server also uses Socket.IO for real-time communication:

- `transcription` event: Emitted when a new transcription is received from the client

## Contributing

Contributions to this project are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch-name`
3. Make your changes and commit them: `git commit -m 'Add some feature'`
4. Push to the original branch: `git push origin feature-branch-name`
5. Create the pull request

## License

This project is licensed under the [MIT License](LICENSE).