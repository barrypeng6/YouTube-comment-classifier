import fastify from 'fastify'
import fastifyStatic from '@fastify/static'
import path from 'path'

import { getCompletion, getModels } from './openai-api'
import { getComments } from './youtube-api'

const server = fastify({
  logger: true,
})

server.register(fastifyStatic, {
  root: path.join(__dirname, '../client')
})

server.get('/api', async (request, reply) => {
  return 'root path\n'
})

server.get('/api/v1/youtube/:youtubeID/comments-analyze', async (request, reply) => {
  const videoId = (request.params as any).youtubeid
  const comments = await getComments(videoId)
  if (!comments) {
    throw new Error('comment undefined')
  }
  const result = await getCompletion(comments)

  return reply.send({
    videoId: videoId,
    comments: comments,
    openaiRes: result
  })
})


server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
