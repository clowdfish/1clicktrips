var activeCampaignConfig = require('../../config/auth').activeCampaign;
var request = require('request');
var _ = require('underscore');
var Promise = require('es6-promise').Promise;

var ActiveCampaign = function() {
  this.apiKey = activeCampaignConfig.apiKey;
  this.listId = activeCampaignConfig.listId;
  this.url = activeCampaignConfig.url;
}

ActiveCampaign.subscribeStatus = {
  success: 'subscribe.success',
  alreadySubscribe: 'subscribe.alreadySubscribe',
  apiError: 'subscribe.apiError',
  emptyResponse: 'subscribe.emptyResponse'
}

ActiveCampaign.prototype.subscribeUser = function(email) {
  var _this = this;
  return new Promise(function(resolve, reject) {
    var post = {
      'email': email,
      'tags': '1ClickTrips API',
      'first_name': 'FirstName',
      'last_name': 'LastName'
    };
    post['p[' + _this.listId + ']'] = _this.listId;
    post['status[' + _this.listId +']'] = 1;
    post['instantresponders[' + _this.listId + ']'] = 1;
    var query = 'api_key=' + _this.apiKey +
               '&api_action=contact_add' +
               '&api_output=json';
    var requestUrl = _this.url + '/admin/api.php?' + query;
    console.log('Send subscribe request:', requestUrl, post);
    request
      .post(requestUrl, post, function(err, response, body) {

        if (err) {
          return reject(err);
        }

        if ( ! body) {
          return reject(new Error(ActiveCampaign.subscribeStatus.emptyResponse));
        }

        if ( ! _.has(body, 'result_code')) {
          return reject(new Error(ActiveCampaign.subscribeStatus.apiError));
        }

        if ( body.result_status === 0) {
          return reject(new Error(body.result_message));
        } else {
          return resolve();
        }
      });
    });
}

module.exports = ActiveCampaign;
