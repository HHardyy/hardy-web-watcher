import perf from './perf.js'
import resource from './resource'
import xhr from './xhr'

perf.init((perfData) => {
  console.log('页面性能监控: ', perfData);
})

resource.init((resourceData) => {
  console.log('资源加载监控: ', resourceData);
})

xhr.init((xhrData) => {
  console.log('xhr加载监控: ', xhrData);
})