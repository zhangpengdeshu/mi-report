export default class Performance {
  constructor(performance) {
    this.performance = performance;
    this.pageInfo = Object.create(null);
    this.resourceInfo = [];
  }
  // 统计页面性能
  page() {
    const t = this.performance.timing;
    const totalResult = {
      // DNS解析时间
      dnst: t.domainLookupEnd - t.domainLookupStart || 0,
      // TCP建立时间
      tcpt: t.connectEnd - t.connectStart || 0,
      // 白屏时间(读取页面第一个字节时间)
      ttfb: t.responseStart - t.navigationStart || 0,
      // dom渲染完成时间
      domt: t.domContentLoadedEventEnd - t.navigationStart || 0,
      // 上一个页面时间
      prevPage: t.fetchStart - t.navigationStart || 0,
      // 页面重定向时间
      redirectt: t.redirectEnd - t.redirectStart || 0,
      // unload时间
      unloadt: t.unloadEventEnd - t.unloadEventStart || 0,
      // request 时间
      reqt:t.responseEnd - t.requestStart || 0,
      // 可操作时间
      interactive: t.domInteractive - t.navigationStart || 0,
      // 渲染总时间
      frontt: t.loadEventEnd - t.navigationStart || 0
    };
    this.pageInfo = totalResult;
  }

  // 统计资源性能
  resource() {
    let resource = this.performance.getEntriesByType('resource');
    if (!resource && !resource.length) {
      this.resourceInfo = [];
      return void 0;
    };
    const resourceList = resource.map(item => {
      return {
        name: item.name,
        type: item.initiatorType,
        duration: parseFloat(item.duration).toFixed(2) || 0,
        decodedBodySize: item.decodedBodySize || 0,
        nextHopProtocol: item.nextHopProtocol,
      }
    });
    this.resourceInfo = resourceList;
  }

  ready() {
    return (document.readyState === 'complete');
  }

  get(fn) {
    let self = this;
    let timer = null;
    const runCheck = () => {
      if(this.ready()) {
        // 停止循环检测
        clearTimeout(timer);
        self.page();
        self.resource();
        fn({page: self.pageInfo, resource: self.resourceInfo});
      } else {
        timer = setTimeout(runCheck, 100);
      }
    };
    runCheck();
  }
};
