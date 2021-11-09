import { Lambda } from "aws-sdk"
const client = new Lambda({ region: "eu-central-1" })
import { MockEvent } from "./mock"

const params = {
    FunctionName: "arn:aws:lambda:eu-central-1:487164077680:function:ServerlessPatternExample-dev-Movie",
    Payload: JSON.stringify(MockEvent)
}

const invoke = async (params) => {
    return await client.invoke(params).promise()
}

const testinvoke = async () => {
    console.log(await invoke(params))
}

testinvoke()
