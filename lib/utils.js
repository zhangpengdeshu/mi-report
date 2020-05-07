/**
 * 判断是否为数组
 * @param { object } val
 * @returns { boolean }
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * 判断是否为对象
 * @param { object } val
 * @returns { boolean }
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * 判断是否为函数
 * @param { object } val
 * @returns { boolean }
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * 去掉字符产首尾的空格
 * @param { String } str
 * @returns { String }
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * 扩展forEach的用法
 * @param { Object | Array } obj
 * @returns { Function } fn
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

// randomString
export function randomString() {
  for (var e, t, n = 20, r = new Array(n), a = Date.now().toString(36).split(""); n--> 0;) 
    t = (e = 36 * Math.random() | 0).toString(36), r[n] = e % 3 ? t : t.toUpperCase();
  for (var i = 0; i < 8; i++) r.splice(3 * i + 2, 0, a[i]);
  return r.join("")
}

module.exports = {
  isArray: isArray,
  isObject: isObject,
  isFunction: isFunction,
  trim: trim,
  forEach: forEach,
  randomString: randomString,
}

