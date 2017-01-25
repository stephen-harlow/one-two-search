import { takeEvery } from 'redux-saga';
import { fork, call, put } from 'redux-saga/effects';
import request from 'superagent';
import oauthSignature from 'oauth-signature/src/app/oauth-signature';
// import config from '../../config';

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}
/*
function getURL(extra){
  var methoder = 'GET';
  var url = 'http://api.yelp.com/v2/search';
  var params = {
          // callback: 'angular.callbacks._0',
          limit: 40,
          oauth_consumer_key: config.oauth_consumer_key, //Consumer Key
          oauth_token: config.oauth_token, //Token
          oauth_signature_method: "HMAC-SHA1",
          oauth_timestamp: new Date().getTime(),
          oauth_nonce: randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
      };
      const allRules = Object.assign({}, params, extra);

  var consumerSecret = config.oauth_consumer_secret; //Consumer Secret
  var tokenSecret = config.oauth_token_secret; //Token Secret
  var signature = oauthSignature.generate(methoder, url, allRules, consumerSecret, tokenSecret, { encodeSignature: false});
  allRules['oauth_signature'] = signature;
  var esc = encodeURIComponent;
  var query = Object.keys(allRules)
    .map(k => esc(k) + '=' + esc(allRules[k]))
    .join('&');
  return url + "?" + query;
  
}
*/
function ensureLength(form, def){
  if(form === undefined || form.length == 0){
    return def;
  }
  return form
}
function getFood(loc) {
  console.log(loc);
      var params = {location: loc.name, 
        term: ensureLength(loc.term, "food"),
        limit: ensureLength(loc.limit, 40)};

    return request
     .post('https://fast-meadow-52903.herokuapp.com/')
     .set('Content-Type', 'application/json')
     .send(params)
     .timeout({
      response: 5000,  // Wait 5 seconds for the server to start sending,
      deadline: 60000, // but allow 1 minute for the file to finish loading.
    })
     .then((data) => {
        console.log("Responded");
        return JSON.parse(data.body);
     });
     /*
    var url = getURL(params);

    return request
          .get(url)
    .then((data) => {
        console.log(JSON.parse(data.text));
      return JSON.parse(data.text);
    });
*/

}
function* callGetFood({formData, resolve, reject}) {
    console.log({formData});
    const loc = formData;//action.payload.formData.formData;
    console.log(loc.name);
  const result = yield call(getFood, loc);
  // console.log(location)
  if (result && result.businesses) {
    // console.log(result);
    yield put({type: "FOOD_FETCHED", result});
    yield call(resolve);
  } else {
    yield call(reject, {loc: 'No data for that location'});
  }
}
// function* callGetFood({location, search, resolve, reject}) {
//   const result = yield call(getFood, location);
//   if (result && result.businesses) {
//     console.log(result);
//     yield put({type: "FOOD_FETCHED", result});
//     yield call(resolve);
//   } else {
//     yield call(reject, {location: 'No data for that location'});
//   }
// }

function* getFoodSaga() {
  yield* takeEvery("FETCH_FOOD", callGetFood);
}

export default function* root() {
  yield [
    fork(getFoodSaga)
  ]
}
