(function() {
    var arr = [],
        splice = arr.splice,

        rQuickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

        vlib = function(selector) {
            return new init(selector);
        },

        init = function(selector) {
            var match, elem, m;

            if (typeof selector === 'string') {
                match = rQuickExpr.exec(selector);
                if (match) {
                    if (m = match[1]) { // id
                        elem = document.getElementById(m);
                        if (elem) elem.length = 1;
                        return elem ? elem : null;
                    } else if (m = match[2]) { // tag
                        elem = document.getElementsByTagName(m);
                        return elem ? elem : null;
                    } else if (m = match[3]) { // class
                        elem = document.getElementsByClassName(m);
                        return elem ? elem : null;
                    }
                } else {
                    return null;
                } 
            } else {
                return null;
            }
        };

    vlib.fn = {
        length: 0,
        splice: splice
    }

    init.prototype = vlib.fn;

    // load function
    vlib.fn.load = vlib.load = function(modulename) {
        try {
            if (vlib.fn[modulename] !== undefined) // loaded
                return;

            vlib.fn[modulename] = vlib[modulename] = module[modulename];
        } catch(e) {

        }
    };

    // extend module
    var module = {
        extend: function() {
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
        }
    };

    window.vlib = window._ = vlib;
}());