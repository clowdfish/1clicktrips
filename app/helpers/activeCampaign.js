var activeCampaignConfig = require('../../config/auth').activeCampaign;
var request = require('request');
var Promise = require('es6-promise').Promise;

var ActiveCampaign = function() {
  this.apiKey = activeCampaignConfig.apiKey;
  this.listId = activeCampaignConfig.listId;
  this.url = activeCampaignConfig.url;
};

ActiveCampaign.prototype.subscribeUser = function(email) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    var post = {
      'email': email,
      'tags': '1ClickTrips API',
      'name': 'Subscriber'
    };

    post['p[' + _this.listId + ']'] = _this.listId;
    post['status[' + _this.listId +']'] = 1;
    post['instantresponders[' + _this.listId + ']'] = 1;

    var query = 'api_key=' + _this.apiKey +
               '&api_action=contact_add' +
               '&api_output=json';

    var requestUrl = _this.url + '/admin/api.php?' + query;

    request.post({ url: requestUrl, form: post}, function(err, res, body) {

      if (err | !body || !('result_code' in JSON.parse(body))) {
        return reject(new Error("subscription.api.error"));
      }

      var response = JSON.parse(body);

      if (response['result_code'] == 0) {
        if(response['result_message'].indexOf("is not valid") > -1)
          return reject(new Error("subscription.email.invalid"));
        else if(response['result_message'].indexOf("in the system already") > -1)
          return reject(new Error("subscription.email.duplicate"));
        else
          return reject(new Error("subscription.error"));
      }
      else {
        return resolve();
      }
    });
  });
};

module.exports = ActiveCampaign;
