'use strict';

const queryString = require('query-string');
const cheerio = require('cheerio');
const axios = require('axios');
const {Translate} = require('@google-cloud/translate');

module.exports.translateToKorean = async event => {
  const body = queryString.parse(event.body);
  let input = body.text;
  const response_type = 'in_channel';
  const target = 'ko';
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

  try {
    let [translations] = await translate.translate(input, target);
    translations = Array.isArray(translations) ? translations : [translations];

    translations.forEach((translation, i) => {
      text += translation;
    });

  } catch (error) {
    console.log(error);
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
