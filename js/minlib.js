(function() {
    var arr = [],
        splice = arr.splice,

        idExpr = /^(?:#([\w-]+))$/,

        vlib = function(selector) {
            return new init(selector);
        },

        init = function(selector) {
            var match, elem;

            if (typeof selector === 'string') {
                match = idExpr.exec(selector);
                if (match && match[1]) {
                    elem = document.getElementById(match[1]);
                    if (elem) return elem;
                }
            }
        };

    vlib.fn = {
        length: 0,
        splice: splice
    }

    init.prototype = vlib.fn;

    // extend
    vlib.fn.extend = vlib.extend = function() {
        var i = 1,
            k,
            obj,
            target = arguments[0] || {},
            len = arguments.length;

        if(len === 1) {
            return arguments[0];
        }

        for (; i < len; i++) {
            obj = arguments[i];
            if (typeof obj === 'object') {
                for (k in obj) {
                    target[k] = typeof target[k] === 'object' && typeof obj[k] === 'object' ?
                        kss.extend(target[k], obj[k]) :
                        obj[k];
                }
            }
        }
        return target;
    };

    window.vlib = window._ = vlib;
}());