//version: 2.15.9.6.1
var gt = function (config, callback) {
  var initGeetest = function (config) {
    callback(new window.Geetest(config));
  };

  var backendDown = function (config) {
    var s = document.createElement('script');
    s.id = 'gt_lib';
    s.src = '//static.geetest.com/static/js/geetest.0.0.0.js';
    s.charset = 'UTF-8';
    s.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(s);

    var loaded = false;
    s.onload = s.onreadystatechange = function () {
      if (!loaded
        && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
        initGeetest(config);
        loaded = true;
      }
    };
  };

  var cb = function () {
    initGeetest(config);
  };

  if (config) {
    if (!window.Geetest) {
      var s = document.createElement('script');
      s.src = '//api.geetest.com/get.php?callback=cb';
      document.getElementsByTagName('head')[0].appendChild(s);

      setTimeout(function () {
        if (!window.Geetest) {
          // Backend Down!
          config.offline = true;
          backendDown(config);
        }
      }, 1000);
    } else {
      initGeetest(config);
    }
  }
};