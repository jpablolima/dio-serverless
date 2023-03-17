"use strict"

const {v4} = require("uuid")
const aws = require("aws-sdk")

const insertItem = async (event) => {

    const {item} = JSON.parse(event.body)
    const createAt = new Date().toDateString()
    const id = v4()

    const dynamoDB = new AWS.DynamoDB.DocumentClient()

    const newItem = {
        id, 
        item, 
        createAt, 
        intemStatus: false
    }

    await dynamoDB.put(
        {
            TableName: "ItemTableNew",
            Item: newItem
        }
    )
    return {
        statusCode: 200,
        body: JSON.stringify(newItem)
    }
}

module.exports = {
    handler:insertItem
}