'use strict';

const queryString = require('query-string');
const cheerio = require('cheerio');
const axios = require('axios');
const {Translate} = require('@google-cloud/translate');

module.exports.translateToKorean = async event => {
  const body = queryString.parse(event.body);
  const input = 'hello';
  const response_type = 'in_channel';
  const target = 'kr';
  const source = 'en';
  let text = '';

  if (input === 'help') {
    text = '도움말 입니다.';

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
  }

  const translate = new Translate({projectId: 'parabolic-braid-257302'});

  const results = await translate.translate(input, target);

  results.forEach(result => {
    text += result;
  });

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
