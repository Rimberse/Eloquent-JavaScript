const parseExpression = program => {
    program = skipSpace(program);
    let match, expr;

    if (match = /^'([^']*)'/.exec(program)) {
        expr = { type: 'value', value: match[1] };
    } else if (match = /^\d+\b/.exec(program)) {
        expr = { type: 'value', value: Number(match[0]) };
    } else if (match = /^[^\s(),#"]+/.exec(program)) {
        expr = { type: 'word', name: match[0] };
    } else {
        throw new SyntaxError('Unexpected syntax: ' + program);
    }

    return parseApply(expr, program.slice(match[0].length));
};

const skipSpace = string => {
    let first = string.search(/\S/);            // return the first match (thats not a whitespace)
    if (first == -1) return '';
    return string.slice(first);
};

const parseApply = (expr, program) => {
    program = skipSpace(program);

    if (program[0] != '(') {
        return { expr: expr, rest: program };
    }

    program = skipSpace(program.slice(1));
    expr = { type: 'apply', operator: expr, args: [] };

    while (program[0] != ')') {
        let arg = parseExpression(program);
        expr.args.push(arg.expr);
        program = skipSpace(arg.rest);

        if (program[0] == ',') {
            program = skipSpace(program.slice(1));
        } else if (program[0] != ')') {
            throw new SyntaxError('Expected "," or ")"');
        }
    }

    return parseApply(expr, program.slice(1));
};

const parse = program => {
    const { expr, rest } = parseExpression(program);

    if (skipSpace(rest).length > 0) {
        throw new SyntaxError('Unexpected text after program');
    }

    return expr;
};

const specialForms = Object.create(null);

const evaluate = (expr, scope) => {
    if (expr.type == 'value') {
        return expr.value;
    } else if (expr.type == 'word') {
        if (expr.name in scope) {
            return scope[expr.name];
        } else {
            throw new ReferenceError(`Undefined binding: ${expr.name}`);
        }
    } else if (expr.type == 'apply') {
        let { operator, args } = expr;

        if (operator.type == 'word' && operator.name in specialForms) {
            return specialForms[operator.name](expr.args, scope);
        } else {
            let op = evaluate(operator, scope);

            if (typeof op == 'function') {
                return op(...args.map(arg => evaluate(arg, scope)));
            } else {
                throw new TypeError('Applying a non-function');
            }
        }
    }
};

specialForms.if = (args, scope) => {
    if (args.length != 3) {
        throw new SyntaxError('Wrong number of args to if');
    } else if (evaluate(args[0], scope) !== false) {
        return evaluate(args[1], scope);
    } else {
        return evaluate(args[2], scope);
    }
};

specialForms.while = (args, scope) => {
    if (args.length != 2) {
        throw new SyntaxError('Wrong number of args to while');
    }

    while (evaluate(args[0], scope) !== false) {
        evaluate(args[1], scope);
    }

    // Since undefined does not exist in Egg, we return false,
    // for lack of a meaningful result.
    return false;
};

specialForms.do = (args, scope) => {
    let value = false;

    for (let arg of args) {
        value = evaluate(arg, scope);
    }

    return value;
};

specialForms.define = (args, scope) => {
    if (args.length != 2 || args[0].type != 'word') {
        throw new SyntaxError('Incorrect use of define');
    }

    let value = evaluate(args[1], scope);
    scope[args[0].name] = value;
    return value;
};

const topScope = Object.create(null);

topScope.true = true;
topScope.false = false;

for (let op of ['+', '-', '*', '/', '==', '<', '>']) {
    topScope[op] = Function('a, b', `return a ${op} b;`)
}

topScope.print = value => {
    console.log(value);
    return value;
};

specialForms.fun = (args, scope) => {
    if (!args.length) {
        throw new SyntaxError('Functions need a body');
    }

    let body = args[args.length - 1];

    let params = args.slice(0, args.length - 1).map(expr => {
        if (expr.type != 'word') {
            throw new SyntaxError('Parameter names must be words');
        }

        return expr.name;
    });

    return function () {
        if (arguments.length != params.length) {
            throw new TypeError('Wrong number of arguments');
        }

        let localScope = Object.create(scope);

        for (let i = 0; i < arguments.length; i++) {
            localScope[params[i]] = arguments[i];
        }

        return evaluate(body, localScope);
    };
};

const run = program => {
    return evaluate(parse(program), Object.create(topScope));
};



//********************************** Exercises **********************************//
// Arrays - My Solution
/* topScope.array = (...values) => {
    const arr = [];

    for (let i = 0; i < values.length; i++) {
        arr.push(values[i]);
    }

    return arr;
};

topScope.length = array => {
    return array.length;
};

topScope.element = (array, n) => {
    return array[n];
};

run(`
do(print(array(1, 2, 3, 4, 5)),
   print(length(array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10))),
   print(element(array(1, 2, 3), 2)))
`);

run(`
do(define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(array(1, 2, 3, 4, 5))))
`);
// -> 15 */

//****************************** Author's Solution ******************************//
// topScope.array = (...values) => values;

// topScope.length = array => array.length;

// topScope.element = (array, i) => array[i];

// run(`
// do(define(sum, fun(array,
//      do(define(i, 0),
//         define(sum, 0),
//         while(<(i, length(array)),
//           do(define(sum, +(sum, element(array, i))),
//              define(i, +(i, 1)))),
//         sum))),
//    print(sum(array(1, 2, 3))))
// `);
// // → 6
//*******************************************************************************//


// Closure - My Solution
/* run(`
do(define(f, fun(a, fun(b, +(a, b)))),
   print(f(4)(5)))
`); */

/*
It works thanks to the JavaScript's concept known as closures,
the inner function that has been return from within of an outer function
has access to the surrounding bindings, even though the code no of an outer function
no longer runs.
*/

//****************************** Author's Solution ******************************//
// NONE
//*******************************************************************************//


// Comments - My Solution
// const skipSpace = string => {
//     let skip = /^(\s|#.*)*/.exec(string);
//     if (skip == -1) return '';
//     return string.slice(skip[0].length);
// };

// console.log(parse("# hello\nx"));
// // → {type: "word", name: "x"}

// console.log(parse("a # one\n   # two\n()"));
// // → {type: "apply",
// //    operator: {type: "word", name: "a"},
// //    args: []}

//****************************** Author's Solution ******************************//
// function skipSpace(string) {
//     let skippable = string.match(/^(\s|#.*)*/);
//     return string.slice(skippable[0].length);
// }

// console.log(parse("# hello\nx"));
// // → {type: "word", name: "x"}

// console.log(parse("a # one\n   # two\n()"));
//   // → {type: "apply",
//   //    operator: {type: "word", name: "a"},
//   //    args: []}
//*******************************************************************************//


// Fixing Scope - My Solution
specialForms.set = (args, firstScope) => {
    if (args.length != 2 || args[0].type != 'word') {
        throw new SyntaxError('Incorrect use of set');
    }

    scope = firstScope;

    while (scope) {
        if (Object.prototype.hasOwnProperty.call(scope, args[0].name)) {
            let value = evaluate(args[1], firstScope);
            scope[args[0].name] = value;
            return value;
        }

        scope = Object.getPrototypeOf(scope);
    }

    throw new ReferenceError('The binding is not defined');
};

run(`
do(define(x, 4),
   define(setx, fun(val, set(x, val))),
   setx(50),
   print(x))
`);
// → 50
run(`set(quux, true)`);
// → Some kind of ReferenceError

//****************************** Author's Solution ******************************//
// specialForms.set = (args, env) => {
//     if (args.length != 2 || args[0].type != "word") {
//         throw new SyntaxError("Bad use of set");
//     }
//     let varName = args[0].name;
//     let value = evaluate(args[1], env);

//     for (let scope = env; scope; scope = Object.getPrototypeOf(scope)) {
//         if (Object.prototype.hasOwnProperty.call(scope, varName)) {
//             scope[varName] = value;
//             return value;
//         }
//     }
//     throw new ReferenceError(`Setting undefined variable ${varName}`);
// };

// run(`
//   do(define(x, 4),
//      define(setx, fun(val, set(x, val))),
//      setx(50),
//      print(x))
//   `);
// // → 50
// run(`set(quux, true)`);
//   // → Some kind of ReferenceError
//*******************************************************************************//