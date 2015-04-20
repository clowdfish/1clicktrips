'use strict';

describe('interceptors: spinnerInterceptor', function() {
  var $q,
      $httpBackend,
      $scope,
      $http,
      $rootScope,
      hasReceiveShowSpinnerEvent,
      hasReceiveHideSpinnerEvents,
      eventTitle,
      requestSpinnerEvents,
      httpHandler;

  beforeEach(function() {
    module('app.common');
  });

  beforeEach(inject(function(_$rootScope_,
                            _$httpBackend_,
                            _$http_,
                            _requestSpinnerEvents_) {
    $scope = _$rootScope_.$new();
    $rootScope = _$rootScope_;
    $http = _$http_;
    $httpBackend = _$httpBackend_;
    requestSpinnerEvents = _requestSpinnerEvents_;

    httpHandler = $httpBackend.whenGET(/\/sampleapi/).respond(200, 'OK');

    hasReceiveShowSpinnerEvent = false;
    hasReceiveHideSpinnerEvents = false;
  }));

  xit('should send requestSpinnerEvents.show event', function() {
    $http.get('/sampleapi', {
      waitingMessage: 'waiting.message'
    });
    $scope.$digest();
    $httpBackend.flush();
    $rootScope.$on(requestSpinnerEvents.true, function(e, data) {
      hasReceiveShowSpinnerEvent = true;
      eventTitle = data.title;
    });
    $scope.$digest();
    httpHandler.respond(200, 'OK');
    expect(hasReceiveShowSpinnerEvent).toEqual(true);
    expect(eventTitle).toEqual('waiting.message');
  });

});
