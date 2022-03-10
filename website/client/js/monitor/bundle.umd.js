(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  /*
   * @Author: 小方块 
   * @Date: 2022-03-07 02:02:35 
   * @Last Modified by: 小方块
   * @Last Modified time: 2022-03-10 15:52:49
   * 
   * 页面性能
  */
  var perf = {
    init: (cb) => {
      cb();

      let isDOMReady = false;

      const Util = {
        _getPerformanceTiming: () => {
          return window.performance.timing || window.performance.timeOrigin
        },
        _getPerfData: (pt) => {
          let data = {
            // 网络建立
            prevPage: { time: pt.fetchStart - pt.navigationStart, label: '上一个页面时间' },
            redirect: { time: pt.redirectEnd - pt.redirectStart, label: '重定向时间' },
            dns: { time: pt.domainLookupEnd - pt.domainLookupStart, label: 'DNS查找时间' },
            connect: { time: pt.connectEnd - pt.connectStart, label: 'TCP建连时间' },
            network: { time: pt.connectEnd - pt.navigationStart, label: '网络总耗时' },

            // 网络接受
            send: { time: pt.responseStart - pt.requestStart, label: '前端发送到接收的时间' },
            receive: { time: pt.responseEnd - pt.responseStart, label: '接收数据用时' },
            request: { time: pt.responseEnd - pt.requestStart, label: '请求页面的总耗时' },

            // 渲染阶段
            dom: { time: pt.domComplete - pt.domLoading, label: 'dom解析时间' },
            loadEvent: { time: pt.loadEventEnd - pt.loadEventStart, label: 'loadEvent时间' },
            frontEnd: { time: pt.loadEventEnd - pt.domLoading, label: '前端总时间' },

            // 关键阶段
            load: { time: pt.loadEventEnd - pt.navigationStart, label: '页面完全加载时间' },
            domReady: { time: pt.domContentLoadedEventStart - pt.navigationStart, label: 'dom准备时间' },
            interactive: { time: pt.domInteractive - pt.navigationStart, label: '可操作时间' },
            ttfb: { time: pt.responseStart - pt.navigationStart, label: '首字节时间' }
          };
          return data
        },
        // dom渲染完成
        _domReady: (callback) => {
          if (isDOMReady === true) return void 0
          let timer = null;
          const _runCheck = () => {
            if (Util._getPerformanceTiming().domComplete) {
              clearTimeout(timer); // 监测到了， 停止监测
              isDOMReady = true;
              callback(document.readyState);
            } else {  // 一直监测 
              timer = setTimeout(_runCheck, 100);
            }
          };
          document.addEventListener('readystatechange', () => {
            if (document.readyState === 'interactive') {
              if (typeof callback === 'function') callback(document.readyState);
              return void 0
            }
          });
          document.addEventListener('DOMContentLoaded', () => {
            _runCheck();
            return void 0
          });
        },

        _onLoad: () => { },
      };

      Util._domReady((state) => {
        let perfData = Util._getPerfData(Util._getPerformanceTiming());
        console.log(`${state}阶段监控数据: `, perfData);
      });
    }
  };

  perf.init(() => {
    console.log('perf init');
  });

}));
//# sourceMappingURL=bundle.umd.js.map
