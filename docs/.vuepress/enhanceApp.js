import dayjs from 'dayjs'

export default ({}) => {
  if (typeof window !== 'undefined') {
    window.dayjs = dayjs
  }

  console.log('Day.js 已在 enhanceApp.js 中配置并挂载到 window 对象。')
}
