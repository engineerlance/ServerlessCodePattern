// import { Lambda } from "aws-sdk"
// const client = new Lambda({ region: "eu-central-1" })
// import { MockEvent } from "./mock"

// const params = {
//     FunctionName: "ServerlessPatternExample-dev-Movie",
//     Payload: JSON.stringify(MockEvent)
// }

// const invoke = async (params: Lambda.InvocationRequest): Promise<Lambda.InvocationResponse> => {
//     return await client.invoke(params).promise()
// }

// test("must return a valid response on a get request when it succeeds", async () => {
//     {
//         const invokeLambda = await invoke(params)
//         expect(invokeLambda.StatusCode).toBe(200)
//     }
// })
