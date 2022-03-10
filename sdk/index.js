import perf from './perf.js'
import resource from './resource'

perf.init((perfData) => {
  console.log('页面性能监控: ', perfData);
})

resource.init((resourceData) => {
  console.log('资源加载监控: ', resourceData);
})