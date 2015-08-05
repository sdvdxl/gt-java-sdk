//version: 2.15.8.5.1		
var gt = function (config) {
						var loadGeetest = function(config) {
							var gtCaptchaObj = new window.Geetest({
								gt : config.gt,
								challenge : config.challenge,
								product : config.product,
								offline : !config.success,
								https: config.https,
							});
							gtCaptchaObj.appendTo(config.id);
							if (config.product === 'popup') {
								gtCaptchaObj.bindOn(config.bindId);
							}
							if (typeof config.onSuccess === 'function') {
								gtCaptchaObj.onSuccess(config.onSuccess);
							}
						};

						var gtFailbackFrontInitial = function(config) {
							var s = document.createElement('script');
							s.id = 'gt_lib';
							if (config.https) {
								s.src = 'https://static.geetest.com/static/js/geetest.0.0.0.js';
							} else {
								s.src = 'http://static.geetest.com/static/js/geetest.0.0.0.js';
							}
							s.charset = 'UTF-8';
							s.type = 'text/javascript';
							document.getElementsByTagName('head')[0].appendChild(s);
							var loaded = false;
							s.onload = s.onreadystatechange = function() {
								if (!loaded
										&& (!this.readyState
												|| this.readyState === 'loaded' || this.readyState === 'complete')) {
									loadGeetest(config);
									loaded = true;
								}
							};
						};

						if (!window.Geetest) {
							var s = document.createElement('script');
							if (config.https) {
								s.src = 'https://api.geetest.com/get.php';
							} else {
								s.src = 'http://api.geetest.com/get.php';
							}
							document.getElementsByTagName('head')[0].appendChild(s);
							setTimeout(function () {
								if (window.Geetest) {
									loadGeetest(config);
								} else {
									setTimeout(function () {
									if (window.Geetest) {
										loadGeetest(config);
									} else {
										gtFailbackFrontInitial(config);
									}
								}, 1000);
								}
							}, 50);
						} else {
							loadGeetest(config);
						}
						
					};