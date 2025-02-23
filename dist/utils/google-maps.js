'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _querystringEs3 = require('querystring-es3');

var _querystringEs32 = _interopRequireDefault(_querystringEs3);

exports['default'] = {

  callbacks: [],

  appended: false,

  load: function load(params, callback) {
    var index = this.callbacks.push(callback);
    if (googleMapsExists()) {
      setTimeout(this.fireCallbacks.bind(this));
    } else {
      if (!this.appended) {
        window.mapsCallback = this.mapsCallback.bind(this);
        this.appendScript(params);
      }
    }
    return index;
  },

  getSrc: function getSrc(params) {
    var src = 'https://maps.googleapis.com/maps/api/js';
    src += '?callback=mapsCallback&';
    src += _querystringEs32['default'].stringify(params);
    return src;
  },

  appendScript: function appendScript(params) {
    var src = this.getSrc(params);
    var script = document.createElement('script');
    script.setAttribute('src', src);
    document.head.appendChild(script);
    this.appended = true;
  },

  mapsCallback: function mapsCallback() {
    window.mapsCallback = undefined;
    this.fireCallbacks();
  },

  fireCallbacks: function fireCallbacks() {
    this.callbacks.forEach(function (callback) {
      return callback();
    });
    this.callbacks = [];
  },

  removeCallback: function removeCallback(index) {
    this.callbacks.splice(index - 1, 1);
  }

};

var googleMapsExists = function googleMapsExists() {
  return typeof window.google === 'object' && typeof window.google.maps === 'object';
};
module.exports = exports['default'];