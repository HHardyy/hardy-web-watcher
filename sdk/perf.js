/*
 * @Author: 小方块 
 * @Date: 2022-03-07 02:02:35 
 * @Last Modified by: 小方块
 * @Last Modified time: 2022-03-07 02:26:02
 * 
 * 页面性能
*/

export default {
  init: (cb) => {
    cb()

    let performance = window.performance
    console.log('performance: ', performance);
  }
}