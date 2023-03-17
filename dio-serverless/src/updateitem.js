"use strict"

const AWS = require("aws-sdk")


const updateItem = async (event) => {
    const {ietmStatus} = JSON.parse(event.body)
    const {id} = event.pathParameters

    const dynamoDB = new AWS.DynamoDB.DocumentCliente()

    await dynamoDB.update({
        TableName: "ItemTableNew",
        key: {id},
        UpadateExpression: 'set ItemStatus = : ItemStatus',
        ExpressionAttributeValues: {
            ':itemStatus': ietmStatus
        },
        ReturnValues: "ALL_NEW"
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify(
            { msg: 'Item update'}
        )
    }
}

module.exports = {
    handler:updateItem
}