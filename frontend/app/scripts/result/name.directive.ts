/// <reference path="../../_all.ts" />

module Result {

	'use strict';

	export class Name {
		public restrict = 'E';
		public template = '<div class="test-name" ng-click="alertName()">{{yourName}}</div>';
		public scope = {
			first: '=',
			last: '='
		};

		public link: any;
		public getFullName: any;
		public alertName: any;

		public static Factory(): any {
			 var directive = () => {
				 return new Name();
			 }
			 return directive;
		}

		private _scope;

		constructor() {
			Name.prototype.link = (scope, attrs, element) => {
				this._scope = scope;
				this._scope.yourName = this.getFullName();
				this._scope.alertName = this.alertName;
			}

			Name.prototype.alertName = () => {
				alert(this.getFullName());
			}

			Name.prototype.getFullName = () => {
				return this._scope.first + ' ' + this._scope.last;
			}
		}

	}
}