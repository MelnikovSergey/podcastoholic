(function(id) {
   'use strict';

	var config = {
		battery: {
			lowThreshold: 0.15,
			criticalThreshold: 0.05
		},
		vibration: {
			lowThreshold: [500, 200, 500],
			criticalThreshold: [1000]
		},
		notification: {
		
			lowThreshold: {
				tTitle: 'Battery level: low',
				message: 'Please charge your device to avoid automatically pausing the sound.'
			},
			criticalThreshold: {
				title: 'Battery level: critical',
				message: 'The sound has been stopped to avoid turning off your device.'
			}
		},
		light: {
			darkThreshold: 50,
			normalThreshold: 10000
		}
	};

}(document));
