/*
 * @Author: 小方块 
 * @Date: 2022-03-19 17:02:56 
 * @Last Modified by: 小方块
 * @Last Modified time: 2022-03-19 17:48:38
 * 
 * 用户行为监控
 */

const getIdxLabel = (el) => {
  let children = [].slice.call(el.parentNode.children).filter(c => c.tagName === el.tagName),
    elIndex = null
  for (let i = 0, len = children.length; i < len; i++) {
    if (el === children[i]) elIndex = i
  }
  elIndex = `[${elIndex}]`
  let tagName = el.tagName.toLowerCase()
  let label = tagName + elIndex
  return label
}

const getxPath = (el) => {
  let current = el, xpath = ''
  while (current !== document.body) {
    xpath += getIdxLabel(current)
    current = current.parentNode
  }
  return xpath
}

export default {
  init: (cb) => {
    document.addEventListener('click', function (event) {
      let target = event.target
      let xPath = target.tagName.toLowerCase() === 'html' ? 'html' : getxPath(target)
      cb(xPath)
    }, false)
  }
}
