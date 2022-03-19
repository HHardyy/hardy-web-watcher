import perf from './tech-action/perf'
import resource from './tech-action/resource'
import xhr from './tech-action/xhr'
import errCatch from './tech-action/errorCatch'

import beh from './user-action/beh'

// 1、技术监控 
// perf.init((perfData) => {
//   console.log('页面性能监控: ', perfData);
// })

// resource.init((resourceData) => {
//   console.log('资源加载监控: ', resourceData);
// })

// xhr.init((xhrData) => {
//   console.log('xhr || fetch 加载监控: ', xhrData);
// })

// errCatch.init((errData) => {
//   console.log('errData: ', errData);
// })

// 2、用户行为监控
beh.init((clickPath) => {
  console.log('user event:', clickPath);
})