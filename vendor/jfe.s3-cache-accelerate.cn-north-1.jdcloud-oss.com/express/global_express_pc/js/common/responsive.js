function calcRem() {
  let deviceWidth = document.documentElement.clientWidth
  const isPC = window.isPC = deviceWidth >= 768
  if (deviceWidth > 768) {
    deviceWidth = 768
  } else if (deviceWidth < 320) {
    deviceWidth = 320
  }
  document.documentElement.style.fontSize = isPC ? '100px' : deviceWidth / 3.75 + 'px'
}
calcRem()
window.onresize = function () {
  calcRem()
}
