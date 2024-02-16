import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const configuration = new Configuration({
    apiKey: "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",
  });
const openai = new OpenAIApi(configuration);
// const model = "text-davinci-003";
const model = "gpt-3.5-turbo";
const context = [];

async function requestOpenAi(str){
    const response = await openai.createChatCompletion({
      model: model,
      messages : context
    });
    const message = response.data.choices[0].message;

    return message;
}


rl.on("line", async(line)=>{
    if (line === "exit"){
        rl.close();
    }
    console.log(`User : ${line}`);
    context.push({
        "role" : "user",
        "content" : line
    });

    const result = await requestOpenAi();
    
    console.log(`chatGPT(${result.role}) : ${result.content}`);
    context.push(result);
    console.log(context);
})

rl.on("close", ()=>{
    process.exit();
})
