/// <reference path="../../_all.ts" />

module Print {

  'use strict';

  export class PrintApi {

		constructor(private $http,
								private $q,
								private $sessionStorage) {
		}

    /**
    * Store trip data
    */
    public setPrintData = (searchParams, selection, tripDetail) => {
      var key = PrintApi._makeStorageKey();
      this.$sessionStorage[key] = {};
      this.$sessionStorage[key]['trip'] = tripDetail;
      this.$sessionStorage[key]['searchParams'] = searchParams;
      this.$sessionStorage[key]['selection'] = selection;
    };

    /**
    * Get trip data from session storage
    */
    public getPrintData = () => {
      var key = PrintApi._makeStorageKey();
      if (typeof(this.$sessionStorage[key]) !== 'undefined') {
        return this.$sessionStorage[key];
      }
      return null;
    };

    public removePrintData = () => {
      var key = PrintApi._makeStorageKey();
      delete this.$sessionStorage[key];
    };

    private static _makeStorageKey() {
      return 'PrintData';
    }

  }
}
