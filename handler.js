'use strict';

const request = require('request-promise-native');
const queryString = require('query-string');
// const {Translate} = require('@google-cloud/translate');

module.exports.translateToKorean = async event => {
  const body = queryString.parse(event.body);
  const response_type = 'in_channel';

  let input = body.text;
  let source = 'en';
  let target = 'ko';
  let text = '';

  try {
    const res = await request.post({
      url: 'https://openapi.naver.com/v1/papago/detectLangs',
      form: {
        query: input
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Naver-Client-Id': `${process.env.NAVER_CLIENT_ID}`,
        'X-Naver-Client-Secret': `${process.env.NAVER_CLIENT_SECRET}`
      }
    });

    source = JSON.parse(res).langCode;
    target = source !== 'ko' ? 'ko' : 'en';
  } catch (error) {
    console.log(error.message);
  }

  try {
    const res = await request.post({
      url: 'https://openapi.naver.com/v1/papago/n2mt',
      form: {
        source,
        target,
        text: input
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Naver-Client-Id': `${process.env.NAVER_CLIENT_ID}`,
        'X-Naver-Client-Secret': `${process.env.NAVER_CLIENT_SECRET}`
      }
    });

    text = JSON.parse(res).message.result.translatedText;
  } catch (error) {
    console.log(error.message);
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
