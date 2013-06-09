(function() {
    var arr = [],
        splice = arr.splice,

        rQuickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

        minlib = function(selector) {
            return new init(selector);
        },

        init = function(selector) {
            var match, elem, m;

            if (typeof selector === 'string') {
                match = rQuickExpr.exec(selector);
                if (match) {
                    if (m = match[1]) { // id
                        elem = document.getElementById(m);
                        if (elem) {
                            this.length = 1;
                            this[0] = elem;
                        }
                        return this;
                    } else if (m = match[2]) { // tag
                        elem = document.getElementsByTagName(m);
                        return elem ? elem : this;
                    } else if (m = match[3]) { // class
                        elem = document.getElementsByClassName(m);
                        return elem ? elem : this;
                    }
                } else {
                    return this;
                } 
            } else {
                return this;
            }
        };

    minlib.fn = {
        length: 0,
        splice: splice
    };

    init.prototype = minlib.fn;

    // load function
    minlib.fn.load = minlib.load = function() {
        var i, m = arguments,
            len = arguments.length;

        for (i = 0; i < len; i++) {
            try {
                if (minlib.fn[m[i]] !== undefined) // loaded
                    return;

                minlib.fn[m[i]] = minlib[m[i]] = module[m[i]];
            } catch(e) {
                // unexist
            }
        }
    };

    // extend module
    var module = {
        extend: function() {
            var i = 1, k, obj,
                target = arguments[0] || {},
                len = arguments.length;

            if (len === 1) {
                return arguments[0];
            }

            for (; i < len; i++) {
                obj = arguments[i];
                if (typeof obj === 'object') {
                    for (k in obj) {
                        target[k] = typeof target[k] === 'object' && typeof obj[k] === 'object' ?
                            this.extend(target[k], obj[k]) :
                            obj[k];
                    }
                }
            }
            return target;
        },
        on: function(etype, callback) {
            var i, len,
                targets = this;

            for (i = 0, len = targets.length; i < len; i++) {
                if (targets[i].addEventListener) {
                    targets[i].addEventListener(etype, function(event) {
                        callback(event);
                    });
                } else {
                    targets[i].attachEvent('on' + etype, function() {
                        callback(window.event);
                    });
                }
            }
        },
        ajax: function(settings) {
            var xhr = ajaxHelper.xhr();

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    if (settings.dataType === 'json') {
                        settings.success(JSON.parse(xhr.responseText));
                    } else {
                        settings.success(xhr.responseText);
                    }
                }
            }
            xhr.open(settings.type, settings.url, settings.async);
            xhr.send();
        }
    };

    // ajax helper
    var ajaxHelper = {
        xhr: function() {
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            } else {
                return new ActiveXObject('Microsoft.XMLHTTP');
            }
        }
    };

    window.minlib = window._ = minlib;

}(window));