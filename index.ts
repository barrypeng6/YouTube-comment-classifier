import fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'path'

import { getCompletion, getModels } from './openai-api'
import { getComments } from './youtube-api'

const server = fastify({
  logger: true,
})

server.register(fastifyStatic, {
  root: path.join(__dirname, 'public')
})

server.get('/', async (request, reply) => {
  return 'root path\n'
})

server.get('/models', async (request, reply) => {
  const data = await getModels()
  return data
})

// https://beta.openai.com/docs/api-reference/completions
server.get('/completions', async (request, reply) => {
  const data = await getCompletion()
  return data
})


server.get('/api/vi/youtube/:youtubeID/comments-analyze', async (request, reply) => {
  console.log(request.params)
  const comments = await getComments((request.params as any).youtubeID)

  return comments
})


server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
