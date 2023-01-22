import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

const getCompletion = async (comments: string[]) => {
  const commentPrompt = comments
    .map((c, index) => {
      return `${index + 1}. ${c}`
    })
    .join('\n');

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    max_tokens: 1000,
    temperature: 1,
    prompt: `
let me give you the following comments of the youtube video:
${commentPrompt}
Could you help me classify the possitive and negative cooment?
`,
  })

  return completion.data.choices[0].text
}

const getModels = async () => {
  const resp = await openai.listModels()
  return resp.data
}

export { openai, getModels, getCompletion }
