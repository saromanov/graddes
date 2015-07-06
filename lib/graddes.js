"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _underscore = require("underscore");

var underscore = _interopRequire(_underscore);

var each = _underscore.each;
var range = _underscore.range;
var zip = _underscore.zip;
var reduce = _underscore.reduce;

var random = _interopRequire(require("random-array"));

var _mathjs = require("mathjs");

var mathjs = _interopRequire(_mathjs);

var multiply = _mathjs.multiply;
var add = _mathjs.add;
var divide = _mathjs.divide;

var Graddes = exports.Graddes = (function () {
    function Graddes(X, y) {
        _classCallCheck(this, Graddes);

        this.X = X;
        this.y = y;
    }

    _createClass(Graddes, {
        fit: {
            value: function fit(iters) {
                var _this = this;

                var eps = arguments[1] === undefined ? 0.0001 : arguments[1];
                var lrate = arguments[2] === undefined ? 0.01 : arguments[2];

                var total = this.X.length;
                var theta0 = random(-0.001, 0.001).oned(total);
                var theta1 = random(-0.001, 0.001).oned(total);

                range(iters).forEach(function (x) {
                    var grad0 = grad(_this.X, _this.y, theta0, theta1, total);
                    var grad1 = grad(_this.X, _this.y, theta0, theta1, total);
                });
                return [theta0, theta1];
            }
        }
    });

    return Graddes;
})();

var Cost = function Cost(m, X, y) {
    return range(m).map(function (x) {
        return Math.pow(X[x] - y[x], 2);
    }).reduce(function (x, y) {
        return x + y;
    });
};

var hypothesis = function hypothesis(theta0, theta1, x) {
    return add(theta0, multiply(theta1, x));
};

var grad = function grad(X, y, theta0, theta1, m) {
    var result = [];
    range(m).forEach(function (x) {
        var pre = hypothesis(theta0, theta1, X[x]);
        result = add(result, pre);
    });

    return divide(result, m);
};