import { OpenAIClient, AzureKeyCredential }from '@azure/openai'



async function invokePrompt(messages: {role:string, content:string}[]) : Promise<string>{

    const deployment_id = "gpt-35-turbo"
    const endpoint = "https://ai-kojoai010105560994.openai.azure.com/"
    const azure_openai_key = "a892286df8914ab8bb804a06e0331189"

    const client = new OpenAIClient(
        endpoint,
        new AzureKeyCredential(azure_openai_key)
    )
    
    // const messages = [
    //     { role: "system", content: "You are a helpful assistant. You will answer questions from users."},
    //     { role: "user", content: "Tell me about Microsoft" }
    // ]

    //console.log(`Messages: ${messages.map((m) => m.content).join("\n")}`)

    // const {choices} = await client.getChatCompletions(deployment_id,messages, {maxTokens: 1000})

    // for (const choice of choices) {
    //     console.log(choice.text);
    //   }

    // const events = await client.streamChatCompletions(deployment_id, messages, {maxTokens: 1000});
    // for await (const event of events){
    //     for(const choice of event.choices){
    //         const delta = choice.delta?.content;
    //         if (delta !== undefined){
    //             //console.log(`Chatbot: ${delta}`)
    //             //console.log(`${delta}`)
    //             //return({role: "chatbot", content: `${delta}`})
    //             //return(`${delta}`)
    //             return(delta?.length)
    //         }
    //     }
    // }

    const events = await client.getChatCompletions(deployment_id, messages, { maxTokens: 1000 });

    let response: string =  events.choices[0].message?.content!

    return response

    

    
    
}

export default invokePrompt

