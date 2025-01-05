const NodeMediaServer = require('node-media-server');
const express = require('express');
const path = require('path');

// RTMP Server Configuration
const config = {
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    allow_origin: '*',
  },
  trans: {
    ffmpeg: '/usr/local/bin/ffmpeg', // Path to FFmpeg
    tasks: [
      {
        app: 'live',
        hls: true,
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
      },
    ],
  },
};

// Start the RTMP Server
const nms = new NodeMediaServer(config);
nms.run();

// HTTP Server to Serve the HTML Page
const app = express();
const PORT = 3000;

// Serve Static Files from the "public" Directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the HTML Page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the HTTP Server
app.listen(PORT, () => {
  console.log(`HTTP server running on http://localhost:${PORT}`);
});