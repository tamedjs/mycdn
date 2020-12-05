const Sirloin = require('sirloin')

// Default config shown
const app = new Sirloin({
  // Web server port
  port: 3000,

  // Static files root directory
  // Set to false to not serve static files
  files: 'dist',

  // Redirect to this host if no match
  host: 'https://example.com',

  // Callback for websocket connect event
  // Can be used for adding data to the websocket client
  connect: async (client) => {},

  // Redis pubsub is not enabled by default
  pubsub: undefined,

  // HTTPS over SSL support
  ssl: {
    key: '/path/to/server.key',
    cert: '/path/to/server.crt'
  }
})

// Get request, whatever you return will be the response
app.get('/db', async (req, res) => {
  req.method       // Request method
  req.path         // Request path
  req.pathname     // Request path name
  req.url          // Request URL
  req.params       // Post body parameters
  req.query        // Query parameters
  req.files        // Uploaded files
  req.cookie       // Cookie handler
  return { hello: 'world' }
})
// See the documentation on Node.js 'incoming message' (req),
// 'outgoing message' (res) and 'url' for more on what's available.

// Post request, uploads must be post requests
app.post('/upload', async (req, res) => {
  req.files // Array of uploaded files if any
  return { success: true }
})
