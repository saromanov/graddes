import underscore, {each, range, zip, reduce} from 'underscore';
import random from 'random-array';
import mathjs, {multiply, add, divide, subtract, dot, sum} from 'mathjs';

export class Graddes {
    constructor(X, y) {
        this.X = X;
        this.y = y;
        validateData(X, y);
    }

    fit(iters=100, eps=0.0001, lrate=0.01, untilconverge=true){
        let theta0 = random(-0.001, 0.001).oned(this.y.length);
        
        let converge = false;
        let it = 0;
        let m = this.X.length;
        while(!converge) {
            if(untilconverge && it === iters) {
                break;
            }

            let value = multiply(this.X, theta0);
            let loss = subtract(value, this.y);
            let J = sum(multiply(loss, loss));
            let grad = divide(multiply(this.X, loss), m);
            theta0 = subtract(theta0, multiply(grad, lrate));


            it += 1;

        }
        return theta0;
    }
}


let Cost = function(m, X, y){
    return range(m)
         .map(x => Math.pow(X[x] - y[x],2))
         .reduce((x,y) => x + y);
}

let hypothesis = function(theta0, theta1, x){
    return add(theta0, multiply(theta1, x));
}

let grad = function(X,y, theta0, theta1, m){
    let result = [];
    range(m).forEach(x => {
        let pre = hypothesis(theta0, theta1, X[x]);
        result = add(result, pre);
    });

    return divide(result, m);
}


let validateData = function(X, y) {
    if(X.length == 0 || y.length == 0) {
        throw "Invalid data";
    }

    if(X.length != y.length) {
        throw "Data and labels must be in the same length";
    }
}

