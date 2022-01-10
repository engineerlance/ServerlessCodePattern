export function dynamicUpdateExpression<T extends Record<string, unknown>>(item: T) {
    let updateExpression = "set"
    let ExpressionAttributeNames = {}
    let ExpressionAttributeValues = {}
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
