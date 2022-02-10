import { Handler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import * as uuid from 'uuid';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const dynamoDb: DocumentClient = new DynamoDB.DocumentClient();

export const get: Handler = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
    },
  };

  dynamoDb.put(params, (error, result) => {
    if (error) {
      console.error(error);
      callback(new Error("Couldn't create the uuid item."));
      return;
    }
    callback(null, {
      statusCode: 200,
      body: params.Item.id,
    });

  });
};

export const backup: Handler = () => {};
