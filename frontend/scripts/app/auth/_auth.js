(function() {

  'use strict';

  angular
    .module('app.auth', [
      'app.core',
      'ui.bootstrap',
      'ui.bootstrap.tpls'
    ])
    .config(httpConfig)
    .constant('AUTH_EVENTS', {
      loginSuccess: 'Login success',
      loginFailed: 'Login failed',
      signupSuccess: 'Signup successful',
      signupFailed: 'Signup failed',
      invalidToken: 'Invalid token',
      expireToken: 'Expire token',
      logout: 'Logout'
    })
    .run(run);


  function httpConfig($httpProvider) {
    //Inject x-auth-token header into request if token available;
    $httpProvider.interceptors.push('httpInterceptor');

    //Stop certains request if user is not authenticated
    $httpProvider.interceptors.push('requestChecker');
  }

  function run($rootScope, $state, session, authApi, AUTH_EVENTS, authHelper, userApi, appConfig) {
    getUserProfile();
    //set isLogin when app start
    $rootScope.isLogin = session.isLogin();

    //Listen to signup and signin event to change isLogin
    $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {
      getUserProfile();
      $rootScope.isLogin = true;
      if (authHelper.redirectState !== null) {
        $state.go(authHelper.redirectState.state, authHelper.redirectState.data);
        authHelper.redirectState = null;
      }
    });

    $rootScope.$on(AUTH_EVENTS.signupSuccess, function() {
      getUserProfile();
      $rootScope.isLogin = true;
      if (authHelper.redirectState !== null) {
        $state.go(authHelper.redirectState.state, authHelper.redirectState.data);
        authHelper.redirectState = null;
      }
    });

    $rootScope.$on(AUTH_EVENTS.logout, function() {
      $rootScope.isLogin = false;
    });

    $rootScope.$on(AUTH_EVENTS.invalidToken, function() {
      authApi.logout();
    });

    function getUserProfile() {
      if (false === _.isEmpty(session.getUserProfile())) {
        appConfig.userProfile = session.getUserProfile();
        return;
      }

      userApi
        .getUserProfile()
        .then(function(userProfile) {
          appConfig.userProfile = userProfile;
          session.setUserProfile(userProfile);
        }, function() {
          appConfig.userProfile = null;
          session.removeUserProfile();
        });
    }
  }



})();
