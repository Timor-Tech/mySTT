const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/voice-to-text-bm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Import routes
const transcriptsRouter = require('./routes/transcripts');
app.use('/api/transcripts', transcriptsRouter);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('transcription', (transcriptText) => {
    // Save transcription to database
    const Transcript = require('./models/Transcript');
    const newTranscript = new Transcript({ text: transcriptText });
    newTranscript.save();

    // Broadcast transcription to all connected clients
    io.emit('transcription', transcriptText);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5050;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));