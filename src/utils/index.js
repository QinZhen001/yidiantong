function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

/**
 * 展示一个toast
 * @param{String} title 提示的内容
 * @param{String} icon  图标，有效值 "success", "loading", "none"
 * @param{String} image 自定义图标的本地路径，image 的优先级高于 icon
 */
export function showToast(title, icon = 'none', image, duration = 2000) {
  let params = {title: title}
  if (icon) params.icon = icon
  if (image) params.image = image
  if (duration) params.duration = duration
  wx.showToast(params)
}

/**
 * 展示一个对话框
 * @param title 标题
 * @param content 内容
 * @param showCancel 是否显示取消按钮 默认为 true
 * @param confirmText 确定按钮的文字，默认为"确定"，最多 4 个字符
 */
export function showDialog(title, content, showCancel, confirmText) {
  wx.showModal({
    title,
    content,
    showCancel,
    confirmText
  })
}


/**
 * 验证是否为正确的姓名
 * @param val 姓名
 * @returns {boolean}
 */
export function nameValidate(val) {
  return /^[\u4e00-\u9fa5]{2,4}$/.test(val)
}


/**
 * 验证是否为正确的宿舍号
 * @param val 宿舍号
 * @returns {boolean}
 */
export function dormNumValidate(val) {
  return /^\d+[-—]\d+$/.test(val)
}


/**
 * 验证是否为正确的手机号码
 * @param val 手机号码
 * @returns {boolean}
 */
export function phoneValidate(val) {
  return /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(val)
}


/**
 * 验证是否为正确的日期
 * @param val 日期
 * @returns {boolean}
 */
export function dateValidate(val) {
  return /^\d+-\d+-\d+$/.test(val)
}


/**
 * 验证是否为正确的时间
 * @param val 日期
 * @returns {boolean}
 */
export function timeValidate(val) {
  return /^\d+:\d+$/.test(val)
}


//
// export default {
//   formatNumber,
//   formatTime
// }
