
export interface IChatbotState{
    messages: {role:string, content:string}[]

    query: string
}