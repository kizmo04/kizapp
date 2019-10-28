'use strict';

const request = require('request-promise-native');
const queryString = require('query-string');
// const {Translate} = require('@google-cloud/translate');

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

  // const translate = new Translate({projectId: 'parabolic-braid-257302'});
  // let [translations] = await translate.translate(input, target);
  // translations = Array.isArray(translations) ? translations : [translations];

  // translations.forEach((translation, i) => {
    //   text += translation;
    // });

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
