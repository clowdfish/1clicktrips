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
    spyOn($rootScope, '$broadcast');
  }));

  it('should send requestSpinnerEvents.show event', function() {
    $http.get('/sampleapi', {
      waitingMessage: 'waiting.message'
    });
    $scope.$digest();
    expect($rootScope.$broadcast).toHaveBeenCalledWith(requestSpinnerEvents.show, {
      title: 'waiting.message'
    });
    $httpBackend.flush();
    expect($rootScope.$broadcast).toHaveBeenCalledWith(requestSpinnerEvents.hide);
  });

  it('when waitingMessage is not provided it shoud NOT send requestSpinnerEvents.show event', function() {
    $http.get('/sampleapi');
    $scope.$digest();
    expect($rootScope.$broadcast).not.toHaveBeenCalledWith(requestSpinnerEvents.show, {
      title: 'waiting.message'
    });
  });

});
