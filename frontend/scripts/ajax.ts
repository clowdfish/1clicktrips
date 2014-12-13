/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../node_modules/ttg-api/search.api.d.ts" />

module App.ajax {
  'use strict';

  function getPath(path: string): string {
    return App.production ? '/api' + path : ('/mock' + path + '.json');
  }

  function ajax(path: string, data?: any): JQueryPromise<any> {
    return $.ajax({
      url: getPath(path),
      type: App.production ? 'POST' : 'GET',
      data: JSON.stringify(data),
      processData: false,
      contentType: 'application/json',
      dataType: 'json'
    });
  }

  function query(path: string, data?: any): JQueryPromise<any> {
    return $.ajax({
      url: getPath(path),
      type: App.production ? 'POST' : 'GET',
      data: data
    });
  }

  export function login(data: Object): JQueryPromise<any> {
    return query('/login', 'email=' + data.email + '&password=' + data.password);
  }

  export function signup(data: Object): JQueryPromise<any> {
    return query('/signup', 'email=' + data.email + '&password=' + data.password);
  }

  export function search(data: TTG.IRawSearchData): JQueryPromise<any> {
    return ajax('/search', data);
  }
};
