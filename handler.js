'use strict';

const queryString = require('query-string');
const cheerio = require('cheerio');
const {Translate} = require('@google-cloud/translate');

module.exports.translateToKorean = async event => {
  const body = queryString.parse(event.body);
  const content = body.text;
  const response_type = 'in_channel';
  let text = '';

  if (content === 'help') {
    text = '도움말 입니다.';
  }

  const translate = new Translate();

  let [translations] = await translate.translate(content, 'kr');
  translations = Array.isArray(translations) ? translations : [translations];

  translations.forEach(translation => {
    text += translation;
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
