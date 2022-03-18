/*
 * @Author: 小方块 
 * @Date: 2022-03-07 02:10:37 
 * @Last Modified by: 小方块
 * @Last Modified time: 2022-03-18 14:39:55
 * 
 * 报错抓取
 */

const formatError = (erroObj) => {
  let _col = erroObj.column || erroObj.columnNumber
  let _row = erroObj.line || erroObj.lineNumber
  let _errType = erroObj.name
  let _msg = erroObj.message

  let { stack } = erroObj

  if (stack) {
    let _matchUrl = stack.match(/https?:\/\/[^\n]+/)
    let _urlFirstStack = _matchUrl ? _matchUrl[0] : ''

    // 真正的url
    let _resourceUrl = ''
    let _regUrlCheck = /https?:\/\/(\S)*\.js/
    if (_regUrlCheck.test(_urlFirstStack)) {
      _resourceUrl = _urlFirstStack.match(_regUrlCheck)[0]
    }

    // 获取行列信息
    let stackRow = null, stackCol = null, posStack = _urlFirstStack.match(/:(\d+):(\d+)/)
    if (posStack && posStack.length >= 3) {
      [, stackCol, stackRow] = posStack
    }
    return {
      content: stack,
      col: Number(_col || stackCol),
      row: Number(_row || stackRow),
      errType: _errType,
      message: _msg,
      resourceUrl: _resourceUrl
    }
  }
}

export default {
  init(cb) {
    let _origin_error = window.onerror

    // 普通代码报错
    window.onerror = function (message, source, lineno, colno, error) {
      let errInfo = formatError(error)
      errInfo._message = message
      errInfo._source = source
      errInfo._lineno = lineno
      errInfo._colno = colno
      errInfo.type = 'error'
      cb(errInfo)
      _origin_error && _origin_error.apply(window, arguments)
    }
  }
}