import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    apiKey: "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",
  });
const openai = new OpenAIApi(configuration);
const model = "text-davinci-003";
// const model = "gpt-3.5-turbo";
async function requestOpenAi(str){
    const response = await openai.createChatCompletion({
      model: model,
      
    })
  }

export default openai;