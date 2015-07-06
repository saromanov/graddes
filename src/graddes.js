import underscore, {each, range, zip, reduce} from 'underscore';
import random from 'random-array';
import mathjs, {multiply, add, divide} from 'mathjs'

export class Graddes {
    constructor(X, y) {
        this.X = X;
        this.y = y;
    }

    fit(iters, eps=0.0001, lrate=0.01){
        let total = this.X.length;
        let theta0 = random(-0.001, 0.001).oned(total);
        let theta1 = random(-0.001, 0.001).oned(total);
        
        range(iters).forEach(x => {
            var grad0 = grad(this.X,this.y, theta0, theta1, total);
            var grad1 = grad(this.X,this.y, theta0, theta1, total);

            theta0 = theta0 - multiply(grad0, lrate);
            theta1 = theta1 - multiplt(grad1, lrate);

    
        });
        return [theta0, theta1];
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

