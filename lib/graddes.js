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
var subtract = _mathjs.subtract;
var dot = _mathjs.dot;
var sum = _mathjs.sum;

var Graddes = exports.Graddes = (function () {
    function Graddes(X, y) {
        _classCallCheck(this, Graddes);

        this.X = X;
        this.y = y;
    }

    _createClass(Graddes, {
        fit: {
            value: function fit() {
                var iters = arguments[0] === undefined ? 10 : arguments[0];
                var eps = arguments[1] === undefined ? 0.0001 : arguments[1];
                var lrate = arguments[2] === undefined ? 0.01 : arguments[2];
                var untilconverge = arguments[3] === undefined ? false : arguments[3];

                var total = 2;
                var theta0 = random(-0.001, 0.001).oned(5);
                var theta1 = random(-0.001, 0.001).oned(5);

                var converge = false;
                var it = 0;
                var m = this.X.length;
                while (!converge) {
                    if (untilconverge && it === iters) {
                        break;
                    }
                    /*var grad0 = grad(this.X,this.y, theta0, theta1, total);
                    console.log(grad0);
                    var grad1 = grad(this.X,this.y, theta0, theta1, total);
                     let theta0_new = subtract(theta0, multiply(grad0, lrate));
                    let theta1_new = subtract(theta1, multiplt(grad1, lrate));
                     //let cost = Cost(total, theta0);
                     grad0 = subtract(grad0, multiply(theta0_new, lrate));
                    grad1 = subtract(grad1, multiply(theta1_new, lrate));*/

                    var value = multiply(this.X, theta0);
                    var loss = subtract(value, this.y);
                    var J = sum(multiply(loss, loss));
                    var _grad = divide(multiply(this.X, loss), m);

                    it += 1;
                }
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