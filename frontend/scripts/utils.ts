/// <reference path="../typings/backbone/backbone.d.ts" />

module Utils {

    export function setCookie(cname, cvalue, exdays) {
        var d: Date = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

    export function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }

    export function checkCookie(cname) {
        return getCookie(cname) !== "";
    }

    // since Backbone.js uses hashes for routing, the usual window.location.pathname is not working as expected
    export function getCustomPathName() {
        var customPathname = window.location.href;
        customPathname = customPathname.replace(window.location.protocol + '//' + window.location.host + '/', "");
        customPathname = customPathname.replace('#/', '');

        return customPathname;
    }

    /**
     *   The algorithm in this function is an exact imitation of the localStorage object, but makes use of cookies.
     *   See https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/Storage#localStorage
     */
     interface MyoStorage {
            getItem?: Function;
            setItem?: Function;
            removeItem?: Function;
        }
    export function createLocalStorage() {

        if (!window.localStorage) {
            var customLocalStorage = function() {
                var aKeys = [], oStorage: MyoStorage = {};
                Object.defineProperty(oStorage, "getItem", {
                    value: function (sKey) {
                        return sKey ? this[sKey] : null;
                    },
                    writable: false,
                    configurable: false,
                    enumerable: false
                });
                Object.defineProperty(oStorage, "key", {
                    value: function (nKeyId) {
                        return aKeys[nKeyId];
                    },
                    writable: false,
                    configurable: false,
                    enumerable: false
                });
                Object.defineProperty(oStorage, "setItem", {
                    value: function (sKey, sValue) {
                        if (!sKey) {
                            return;
                        }
                        document.cookie = _.escape(sKey) + "=" + _.escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
                    },
                    writable: false,
                    configurable: false,
                    enumerable: false
                });
                Object.defineProperty(oStorage, "length", {
                    get: function () {
                        return aKeys.length;
                    },
                    configurable: false,
                    enumerable: false
                });
                Object.defineProperty(oStorage, "removeItem", {
                    value: function (sKey) {
                        if (!sKey) {
                            return;
                        }
                        document.cookie = _.escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                    },
                    writable: false,
                    configurable: false,
                    enumerable: false
                });
                this.get = function () {
                    var iThisIndx;
                    for (var sKey in oStorage) {
                        iThisIndx = aKeys.indexOf(sKey);
                        if (iThisIndx === -1) {
                            oStorage.setItem(sKey, oStorage[sKey]);
                        }
                        else {
                            aKeys.splice(iThisIndx, 1);
                        }
                        delete oStorage[sKey];
                    }
                    for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) {
                        oStorage.removeItem(aKeys[0]);
                    }
                    for (var aCouple, iKey, nIdx = 0, aCouples = document.cookie.split(/\s*;\s*/); nIdx < aCouples.length; nIdx++) {
                        aCouple = aCouples[nIdx].split(/\s*=\s*/);
                        if (aCouple.length > 1) {
                            oStorage[iKey = _.unescape(aCouple[0])] = _.unescape(aCouple[1]);
                            aKeys.push(iKey);
                        }
                    }
                    return oStorage;
                };
                this.configurable = false;
                this.enumerable = true;
            };

             Object.defineProperty(window, "localStorage", new customLocalStorage());
        }
    }

    /**
     *
     * @returns {boolean}
     */
    export function isUserLoggedIn() {
        var user = localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
        return user ? true : false;
    }

    export function logoutUser() {
        localStorage.removeItem("access_token");
        sessionStorage.removeItem("access_token");
    }

    export function getAccessToken() {
        return localStorage.getItem("access_token") || sessionStorage.getItem("access_token");
    }

    export function setAccessToken(token) {
        localStorage.setItem("access_token", token);
        sessionStorage.setItem("access_token", token );
        /*
        $.ajaxSetup(
            {
                headers: { 'x-access-token': token }
            }
        );*/
    }
    /**
     *
     * @param form
     * @returns {{}}
     */
    export function serializeObject(form) {
        var o = {};
        var a = form.serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    }

    export function doRedirect(url) {
        // this single purpose function is created to make testing of redirects possible
        window.location.replace(url);
    }
}
