(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  /*
   * @Author: 小方块 
   * @Date: 2022-03-07 02:02:35 
   * @Last Modified by: 小方块
   * @Last Modified time: 2022-03-10 16:23:50
   * 
   * 页面性能
  */
  var perf = {
    init: (cb) => {
      let isDOMReady = false;
      let isOnload = false;
      let cycleTime = 100;

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
              timer = setTimeout(_runCheck, cycleTime);
            }
          };
          // document.addEventListener('readystatechange', () => {
          //   if (document.readyState === 'interactive') {
          //     if (typeof callback === 'function') callback(document.readyState)
          //     return void 0
          //   }
          // })
          document.addEventListener('DOMContentLoaded', () => {
            _runCheck();
            return void 0
          });
        },

        _onLoad: (callback) => {
          if (isOnload === true) return void 0
          let timer = null;

          const _runCheck = () => {
            if (Util._getPerformanceTiming().loadEventEnd) {
              clearTimeout(timer);
              isOnload = true;
              callback(document.readyState);
            } else {
              timer = setTimeout(_runCheck, cycleTime);
            }
          };
          // document.addEventListener('readystatechange', () => {
          //   if (document.readyState === 'interactive') {
          //     if (typeof callback === 'function') callback(document.readyState)
          //     return void 0
          //   }
          // })
          window.addEventListener('load', () => {
            _runCheck();
            return void 0
          });
        },
      };

      Util._domReady((state) => {
        let perfData = Util._getPerfData(Util._getPerformanceTiming());
        perfData.type = 'domready';
        cb(perfData);
      });
      Util._onLoad((state) => {
        let perfData = Util._getPerfData(Util._getPerformanceTiming());
        perfData.type = 'onload';
        cb(perfData);
      });
    }
  };

  /*
   * @Author: 小方块 
   * @Date: 2022-03-10 16:38:29 
   * @Last Modified by: 小方块
   * @Last Modified time: 2022-03-10 23:55:29
   * 
   * 资源加载性能 
   */
  const _onload = (cb) => {
    if (document.readyState === 'complete') {
      cb();
      return void 0
    }

    window.addEventListener('load', () => {
      cb();
    });
  };

  // 获取一个资源的指标
  const _resolvePerfomanceResource = (r) => {
    let o = {
      initiatorType: r.initiatorType,
      name: r.name,
      duration: r.duration,

      // 连接过程
      redirect: r.redirectEnd - r.redirectStart,
      dns: r.domainLookupEnd - r.domainLookupStart,
      connect: r.connectEnd - r.connectStart,
      network: r.connectEnd - r.startTime,

      // 接收过程
      send: r.responseStart - r.requestStart,
      receive: r.responseEnd - r.responseStart,
      request: r.responseEnd - r.requestStart,

      // 核心指标
      ttfb: r.responseStart - r.requestStart
    };
    return o
  };

  // 获得每个资源的指标
  let _resolveEntrise = (entrise) => entrise.map(_ => _resolvePerfomanceResource(_));

  var resource = {
    init: (cb) => {
      if (window.PerformanceObserver) {
        let observe = new PerformanceObserver((list, obj) => {
          try {
            let entrise = list.getEntries();
            const entriseData = _resolveEntrise(entrise);
            cb(entriseData);
          } catch (e) {
            console.error('error: ', e);
          }
        });
        observe.observe({ entryTypes: ['resource'] });
      } else {
        console.log(2); 
        _onload(() => {
          let entrise = performance.getEntries('resource');
          let entriseData = _resolveEntrise(entrise);
          cb(entriseData);
        });
      }
    }
  };

  perf.init((perfData) => {
    console.log('页面性能监控: ', perfData);
  });

  resource.init((resourceData) => {
    console.log('资源加载监控: ', resourceData);
  });

}));
//# sourceMappingURL=bundle.umd.js.map
