import { createServer } from 'http';
import './app/config/env.load';
import app from './app/config/index.app';

const PORT = process.env.PORT || 8000;

const server = createServer(app)

server.listen(PORT, () => {
  console.info(`Server listening on port ${PORT}`)
})

