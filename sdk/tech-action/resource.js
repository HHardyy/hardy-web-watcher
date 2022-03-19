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
    cb()
    return void 0
  }

  window.addEventListener('load', () => {
    cb()
  })
}

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
  }
  return o
}

// 获得每个资源的指标
let _resolveEntrise = (entrise) => entrise.map(_ => _resolvePerfomanceResource(_))

export default {
  init: (cb) => {
    if (window.PerformanceObserver) {
      let observe = new PerformanceObserver((list, obj) => {
        try {
          let entrise = list.getEntries()
          const entriseData = _resolveEntrise(entrise)
          cb(entriseData)
        } catch (e) {
          console.error('error: ', e);
        }
      })
      observe.observe({ entryTypes: ['resource'] })
    } else {
      console.log(2); 
      _onload(() => {
        let entrise = performance.getEntries('resource')
        let entriseData = _resolveEntrise(entrise)
        cb(entriseData)
      })
    }
  }
}