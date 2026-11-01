function calcRem() {
  const deviceWidth = document.documentElement.clientWidth
  const path = window.location.pathname
  const regex = /^\/(en\/)?(express|freight|bulky|supplyChain|servicePlus|medicine|technology|coldChain|reachWarehouse|crossBorder|capacity)(\/|$)/i
  const isMoreScale = regex.test(path)
  const scaleWidth = isMoreScale ? 1750: 1600
  const baseRadio = isMoreScale ? 20 : 15
  let fontSize = '100px'
  if (deviceWidth > 880 && deviceWidth < scaleWidth) {
    // 小屏幕缩放整体页面
    fontSize = Math.min((deviceWidth / baseRadio).toFixed(2), 100) + 'px'
  } else if (deviceWidth >= scaleWidth) {
    fontSize = '100px'
  } else {
    fontSize = Math.max(deviceWidth, 320) / 3.75 + 'px'
  }
  document.documentElement.style.fontSize = fontSize
}
calcRem()
