var entry=document.getElementById("entry");
entry.onclick=function(){
	window.location="https://blog.wangzhanghao.com" 
}


function Index(dom, use24) {
  //将获取到的dom对象转为数组
  this.column = Array.from(dom)
  //将类名存到一个数组里
  this.use24 = use24
  this.start()
}

//获取时间
Index.prototype.getClock = function () {
  let D = new Date()
  let H
  if (this.use24) {
    H = D.getHours()
  } else {
    H = D.getHours() % 12 || 12
  }
  let allD = [H, D.getMinutes(), D.getSeconds()].reduce(
    //获取时间并拼接的一起
    function (p, n) {
      return p + ('0' + n).slice(-2)
    },
    ''
  )
  return allD
}

Index.prototype.start = function () {
  let self = this
  setInterval(function () {
    let c = self.getClock()
    self.column.forEach(function (el, index) {
      let n = +c[index]
      let offset = n * 86
      $(el).css({
        transform: 'translateY(calc(50vh - ' + offset + 'px - ' + 43 + 'px))',
      })
      Array.from(el.children).forEach(function (el2, index2) {
        if (index2 === n) {
          $(el2).attr('class', 'visible')
        } else {
          $(el2).attr('class', 'none')
        }
      })
    })
  }, 500)
}

new Index($('.column'), true)
