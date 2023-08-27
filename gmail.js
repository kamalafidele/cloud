const { gmail_v1: { Gmail }} = require('googleapis');

const gmail = new Gmail({ });
gmail.users.messages.send({ userId: '', requestBody: {}})