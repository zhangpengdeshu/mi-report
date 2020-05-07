/*
* js错误包括一下几个方面:
* 1. js编译异常(eslit就可以发现)
* 2. js运行时异常
* 3. 加载静态资源异常
* */
/*
* js运行时异常：
* 1. window.onerror
* 2. console.error
* 3. window.onunhandlerejection. promise
* */
function _processStackMsg(error) {
  let stack = error.stack.replace(/\n/gi, "").split(/\bat\b/).slice(0, 5).join("@").replace(/\?[^:]+/gi, "");
  let msg = error.toString();
  if (stack.indexOf(msg) < 0) {
    stack = msg + "@" + stack;
  }
  return stack;
}
// 处理报错信息
function _processError(errObj) {
  try{
    if(errObj.stack) {
      let url = errObj.stack.match("https?://[^\n]+");
      url = url ? url[0] : '';
      let rowCols = url.match(":(\\d+):(\\d+)");
      if(!rowCols) {
          rowCols = [0, 0, 0]
      }
      const stack = _processStackMsg(errObj);
      return {
        msg: stack,
        rowNum: rowCols[1],
        colNum: rowCols[2],
        target: url.replace(rowCols[0], '')
      }
    }else {
      return errObj;
    }
  }catch (e) {
    return errObj
  }
}
export function javaScriptError(callback) {
  const orgError = window.onerror;
  window.onerror = function(msg, url, line, col, error) {
    const errorInfo = _processError(error);
    errorInfo.originalMsg = msg;
    errorInfo.originalUrl = url;
    errorInfo.originalRow = line;
    errorInfo.originalCol = col;
    callback && callback.call(null, errorInfo);
    orgError && orgError.apply(window, arguments);
  }
}

// img, script, css, jsonp
export function resourceError(callback) {
  window.addEventListener('error', (e) => {
    if(!(e instanceof ErrorEvent)) {
      var errorInfo = {};
      errorInfo.type = e.type;
      errorInfo.typeName = e.target.localName;
      errorInfo.sourUrl = e.target.href || e.target.src;
      callback && callback.call(null, errorInfo);
    }
  })
};

