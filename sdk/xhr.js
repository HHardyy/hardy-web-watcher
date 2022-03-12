export default {
  init: (cb) => {
    let xhr = window.XMLHttpRequest

    console.log('xhr: ', xhr._xhr_monitor_flag);

    if (xhr._xhr_monitor_flag === true) {
      return void 0
    }

    xhr._xhr_monitor_flag = true

    let _originOpen = xhr.prototype.open
    let _originSend = xhr.prototype.send
    xhr.prototype.open = function (method, url, async, user = null, password = null) {
      this._xhr_info = { method, url, async, user, password, status: null }
      return _originOpen.apply(this, arguments)
    }

    xhr.prototype.send = function (value) {
      let _this = this
      this._xhr_start_time = Date.now()

      const asioxEnd = (type) => () => {

        if (_this.response) {
          let responseSize = null
          switch (_this.responseType) {
            case 'json':
              responseSize = JSON.stringify(_this.response).length
              break;
            case 'arraybuffer':
              responseSize = _this.response.byteLength
              break;
          }
          _this._xhr_info.event = type
          _this._xhr_info.status = _this.status
          _this._xhr_info.success = _this.status === 200
          _this._xhr_info.duration = Date.now() - _this._xhr_start_time
          _this._xhr_info.responseSize = responseSize
          _this._xhr_info.requestSize = value ? value.length : 0
          _this._xhr_info.type = 'xhr'

          cb(_this._xhr_info)
        }
      }

      this.addEventListener('load', asioxEnd('load'), false)
      this.addEventListener('error', asioxEnd('error'), false)
      this.addEventListener('abort', asioxEnd('abort'), false)
      return _originSend.apply(this, arguments)
    }
  }
}