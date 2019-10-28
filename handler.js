'use strict';

const queryString = require('query-string');
const cheerio = require('cheerio');

module.exports.translateToKorean = async event => {
  const body = queryString.parse(event.body);
  const content = body.text;
  const response_type = 'in_channel';
  let text = '개발이나 하세요.';

  if (content === 'help') {
    text = '도움말 입니다.';
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({
      response_type,
      text
    })
  };
};
