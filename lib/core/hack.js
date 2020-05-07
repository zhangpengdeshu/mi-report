// 1.js编译时异常
// 2.js运行时异常
// 3.加载静态资源异常
function ajaxEventTrigger(event) {
    const ajaxEvent = new CustomEvent(event, {
        detail: this
    });
    window.dispatchEvent(ajaxEvent);
}

function newXHR() {
    const originalXHR = window.XMLHttpRequest;
    const xhr = new originalXHR();
    xhr.addEventListener('loadStart', function() {
        ajaxEventTrigger.call(this, 'ajaxLoadStart');
    }, false);
    xhr.addEventListener('loadend', function() {
        ajaxEventTrigger.call(this, 'ajaxLoadEnd');
    }, false);
    return xhr;
}

/*
* 需要统计的数据
* 1. 请求url
* 2. 请求时长 duration
* 3. 请求状态 status '200'
* 4. 请求时长
* */
export function ajaxHack(callback) {
    const ajaxList = [];
    const info = {};
    window.XMLHttpRequest = newXHR;
    window.addEventListener('ajaxLoadStart', function(e) {
        ajaxList.push({
            timeStamp: new Date().getTime(),
            event: e,
        });
    });
    window.addEventListener('ajaxLoadEnd', function() {
        for(let i = 0; i < ajaxList.length; i++) {
            if(ajaxList[i].event.detail.status > 0) {
                const now = new Date().getTime();
                const url = ajaxList[i].event.responseURL;
                const status = ajaxList[i].event.detail.status;
                const statusText = ajaxList[i].event.detail.statusText;
                const duration = now - ajaxList[i].timeStamp;
                const detail = ajaxList[i].event.detail;
                info.url = url;
                info.status = status;
                info.statusText = statusText;
                info.duration = duration;
                info.detail = detail;
                callback && callback.call(null, info);
                ajaxList.splice(i, 1);
            }
        }
    });
};
