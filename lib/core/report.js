import { config } from '../../config/index.js'

export function report(reportData) {
  const { reportUrl } = config;
  post(reportUrl, reportData);
}

function post(url, body) {
  const XMLHttpRequest = window.__oXMLHttpRequest__ || window.XMLHttpRequest;
  if(typeof XMLHttpRequest === 'function') {
    try{
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', 'text/plain');
      xhr.send(JSON.stringify(body));
    }catch(e) {
      console.log('POST请求失败');
    }
  }else {
    console.log('浏览器不支持XMLHttpRequest');
  }
}