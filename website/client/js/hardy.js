console.log('hello index.js');

(function (w) {
  w.onload = function () {
    getData()

    fetchData()

    // throw new Error('hardy error')  测试抓取报错的时候用
  }

  function fetchData() {
    fetch('/api/list2').then(res => {
      return res.json()
    }).then(res => {
      console.log('list2 res: ', res);
    })
  }

  function getData() {
    axios({
      url: '/api/list1',
      method: 'get'
    }).then(res => {
      console.log('list1 res: ', res);
    }).catch(err => {
      console.log('err: ', err);
    })
  }

  function axios({ url, method, data }) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      url = method.toLowerCase() === 'get' && data ? `${url}?${data}` : url
      xhr.open(method, url, data)
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            resolve(JSON.parse(xhr.responseText))
          } else {
            reject(xhr.status)
          }
        }
      }
      if (method.toLowerCase() === 'get') {
        xhr.send()
      } else {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
        xhr.send(data)
      }
    })
  }
})(window)