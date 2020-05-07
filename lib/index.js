import Performance from './core/performance.js';
import { getDeviceInfo } from './core/device.js';
import { ajaxHack } from './core/hack.js';
import { javaScriptError, resourceError } from './core/error.js';

class MiReport {
    constructor() {
        this.pagePer = Object.create(null);
        this.resourcePer = [];
        this.deviceInfo = Object.create(null);
        this.ajaxInfo = Object.create(null);
        this.jsError = [];
    }
    getPerformance() {
        const performance = window.performance;
        const per = new Performance(performance);
        per.get(({ page, resource }) => {
            console.log('===>page', page);
            console.log('===>resource', resource);
        })
    }

    getDeviceInfo() {
        this.deviceInfo = getDeviceInfo();
        console.log('===>deviceInfo', this.deviceInfo);
    }

    getAjaxInfo() {
        ajaxHack((info) => {
            console.log('===>ajax', info);
        });
    }

    getJsError() {
        javaScriptError((errorInfo) => {
            console.log('===>js error', errorInfo);
        });
    }

    getResource() {
        resourceError((errorInfo) => {
            console.log('===>resource error', errorInfo);
        })
    }
}

const mi = new MiReport();
mi.getPerformance();
mi.getDeviceInfo();
mi.getAjaxInfo();
mi.getJsError();
mi.getResource();

