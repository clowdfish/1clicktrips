var yaml = require('js-yaml'),
    fs   = require('fs'),
    vsprintf = require("sprintf-js").vsprintf,
    en = require('../../config/i18n/en'),
    de = require('../../config/i18n/de'),
    _ = require('underscore');

var languages = {
  en: formatLanguageData(en),
  de: formatLanguageData(de)
};

var defaultLanguageKey = 'en';

/**
* Translate text by textId, languakey key, and params
* Example: translate("email.reset.subject", "en", [email]);
*/
function translate(textId, languageKey, params) {
  if (params != null && !_.isArray(params)) {
    console.log('Translation params must a an array');
    return false;
  }
  if (!languages[languageKey] || !languages[languageKey][textId]) {
    return false;
  }
  return vsprintf(languages[languageKey][textId], params);
}

function getLanguageKeyFromRequest(req) {
  var languageKey = req.headers['x-language'];
  if (languages[languageKey]) {
    return languageKey;
  }
  return defaultLanguageKey;
}

/**
* Get lanaguageKey from header or from user profile
*/
function languageKeyParser(req, res, next) {
  var languageKey = getLanguageKeyFromRequest(req);
  req['languageKey'] = languageKey;
  next();
}

/**
* Flatten json file
*/
function formatLanguageData(translationData, prefix) {
  prefix = prefix || "";
  var result = {};
  var keys = _.keys(translationData);
  if (keys.length > 0) {
    for (var i = 0; i < keys.length; i++ ) {
      var key = keys[i];
      var translationItem = translationData[key];
      var stringKey = prefix != "" ? prefix + '.' + key : key;

      if (_.isArray(translationItem)) {
        result[stringKey] = translationItem.join('');
      } else if (_.isString(translationItem)) {
        result[stringKey] = translationItem;
      } else {
        result = _.extend(result, formatLanguageData(translationItem, stringKey));
      }
    }
  }
  return result;
}

module.exports = {
  translate: translate,
  languageKeyParser: languageKeyParser
};
