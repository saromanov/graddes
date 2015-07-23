import underscore, {each, range, zip, reduce} from 'underscore';
import random from 'random-array';
import mathjs, {multiply, add, divide, subtract} from 'mathjs';

export class Graddes {
    constructor(X, y) {
        this.X = X;
        this.y = y;
    }

    fit(iters=1000, eps=0.0001, lrate=0.01){
        let total = this.X.length;
        let theta0 = random(-0.001, 0.001).oned(total);
        let theta1 = random(-0.001, 0.001).oned(total);
        
        let converge = false;
        let it = 0;
        while(!converge) {
            if(it === iters) {
                break;
            }
            
            var grad0 = grad(this.X,this.y, theta0, theta1, total);
            var grad1 = grad(this.X,this.y, theta0, theta1, total);

            let theta0_new = subtract(theta0, multiply(grad0, lrate));
            let theta1_new = subtract(theta1, multiplt(grad1, lrate));

            //let cost = Cost(total, theta0);

            grad0 = subtract(grad0, multiply(theta0_new, lrate));
            grad1 = subtract(grad1, multiply(theta1_new, lrate));

            it += 1;

        }
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

