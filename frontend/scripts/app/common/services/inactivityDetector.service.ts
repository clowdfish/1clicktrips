/// <reference path="../../../_all.ts" />

module Common {

	'use strict';

	export interface InactivityDetectorOptions {
		maxTimeAllow: number;
		onTimeout: Function;
	}

	export class InactivityDetector {
		/**
		 * setTimeout object
		 */
		private _timer;

		constructor(private $rootScope,
								private $timeout) {

		}

		public start(options: InactivityDetectorOptions) {
			this._resetTimer(options);

			document.onmousemove = () => {
				this._resetTimer(options);
			}

			document.onkeypress = () => {
				this._resetTimer(options);
			}

			document.onclick = () => {
				this._resetTimer(options);
			}

			this.$rootScope.$on('$stateChangeSuccess', () => {
				this.stop();
			});
		}

		public stop() {
			document.onmousemove = null;
			document.onkeypress = null;
			document.onclick = null;
		}

		private _resetTimer(options: InactivityDetectorOptions) {
			clearTimeout(this._timer);
			this._timer = setTimeout(() => {
        console.log('hello');
				options.onTimeout();
			}, options.maxTimeAllow);
		}
	}
}