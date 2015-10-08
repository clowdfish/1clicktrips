/// <reference path="../../../_all.ts" />

module Common {

	'use strict';

	export interface InactivityDetectorOptions {
		maxTimeAllow: number;
		onTimeout: Function;
	}

	export class InactivityDetector {
		private _idleTime = 0;
		private _timer;

		constructor(private $rootScope) {

		}

		start(options: InactivityDetectorOptions) {
			document.onmousemove = () => {
				this.resetTimer(options);
			}

			document.onkeypress = () => {
				this.resetTimer(options);
			}

			this.$rootScope.$on('$stateChangeSuccess', () => {
				this.stop();
			});
		}

		stop() {
			document.onmousemove = null;
			document.onkeypress = null;
		}
				
		resetTimer(options: InactivityDetectorOptions) {
			clearTimeout(this._timer);
			this._timer = setTimeout(() => {
				options.onTimeout();
			}, options.maxTimeAllow);
		}
	}
}