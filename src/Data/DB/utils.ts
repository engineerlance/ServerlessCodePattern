import { ExpressionAttributeNameMap, ExpressionAttributeValueMap } from "aws-sdk/clients/dynamodb"

export function dynamicUpdateExpression<T extends Record<string, unknown>>(item: T) {
    let updateExpression = "set"
    let ExpressionAttributeNames: ExpressionAttributeNameMap = {}
    let ExpressionAttributeValues: Record<string, unknown> = {}
    for (const property in item) {
        if (property !== "PK" && property !== "SK") {
            updateExpression += ` #${property} = :${property} ,`
            ExpressionAttributeNames["#" + property] = property
            ExpressionAttributeValues[":" + property] = item[property]
        }
    }
    return {
        updateExpression: updateExpression.slice(0, -1),
        ExpressionAttributeNames: ExpressionAttributeNames,
        ExpressionAttributeValues: ExpressionAttributeValues
    }
}
