(function() {
   'use strict';

	var tests = {
		proximity: 'onuserproximity' in window,
		light: 'ondevicelight' in window,
		vibration: 'vibrate' in window.navigator,
		notification: 'Notification' in window
	};

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
				title: 'Battery level: low',
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

	var audio = document.querySelector(".audioPlayer");

	function batteryController(battery) {
		if (!battery.charging && audio.duration > 0 && !audio.paused) {
			if (battery.level > config.battery.lowThreshold) {
				return;
			}
	
			var isCritical = battery.level <= config.battery.criticalThreshold;
	
			if (isCritical) {
				audio.pause();
			}
	
			if (tests.vibration) {
				window.navigator.vibrate(isCritical ? config.vibration.criticalThreshold : config.vibration.lowThreshold);
			}
	
			if (tests.notification) {
				Notification.requestPermission(function(permission) {
					if (permission !== 'denied') {
						new Notification(isCritical ? config.notification.criticalThreshold.title : config.notification.lowThreshold.title, {
								body: isCritical ?
								config.notification.criticalThreshold.message :
								config.notification.lowThreshold.message
							}
					   );
					}
				});
			}
		}
	}

	if (window.navigator.getBattery) {
		window.navigator.getBattery().then(function(battery){
			battery.addEventListener('levelchange', batteryController.bind(window, battery));
			batteryController(battery);
	   	});
	
	} else if (window.navigator.battery) {
		window.navigator.battery.addEventListener('levelchange', batteryController.bind(window, window.navigator.battery));
		batteryController(window.navigator.battery);
	}

	if (tests.proximity) {
		window.addEventListener('userproximity', function (event) {
			if (event.near) audio.paused ? audio.play() : audio.pause();
		});
	}

	if (tests.light) {
		window.addEventListener('devicelight', function(event) {

			var light = Math.round(event.value);

			if (light < config.light.normalThreshold) {
				document.body.className = 'normal-theme';
			} else if (light < config.light.darkThreshold) {
				document.body.className = 'dark-theme';
			} else {
				document.body.className = 'light-theme';
			}
		});
	}

}(document));
