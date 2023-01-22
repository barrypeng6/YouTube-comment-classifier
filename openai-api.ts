import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const getCompletion = async () => {
  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: 'Hello world',
  })
  // console.log("completion =====>", completion.data.choices[0].text)
  return completion.data.choices[0].text
}

const getModels = async () => {
  const resp = await openai.listModels()
  return resp.data
}

export { openai, getModels, getCompletion }
