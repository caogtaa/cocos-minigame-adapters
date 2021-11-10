/*
 * @Author: your name
 * @Date: 2021-11-10 10:11:24
 * @LastEditTime: 2021-11-10 10:27:41
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \adapters\platforms\wechat\wrapper\builtin\Canvas.js
 */
// import HTMLCanvasElement from './HTMLCanvasElement'
import { innerWidth, innerHeight } from './WindowProperties'

let hasModifiedCanvasPrototype = false
let hasInit2DContextConstructor = false
let hasInitWebGLContextConstructor = false

// https://forum.cocos.org/t/cocos-creator-50/94999
// 首场景引擎剥离
let first = true
export default function Canvas() {
  // const canvas = wx.createCanvas()
  const gt_data = wx.__gt_data || {};
  const canvas = first ? gt_data.first_canvas ? gt_data.first_canvas : wx.createCanvas() : wx.createCanvas()
  first = false

  canvas.type = 'canvas'

  // canvas.__proto__.__proto__.__proto__ = new HTMLCanvasElement()

  const _getContext = canvas.getContext

  canvas.getBoundingClientRect = () => {
    const ret = {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    }
    return ret
  }

  canvas.style = {
    top: '0px',
    left: '0px',
    width: innerWidth + 'px',
    height: innerHeight + 'px',
  }

  canvas.addEventListener = function (type, listener, options = {}) {
    // console.log('canvas.addEventListener', type);
    document.addEventListener(type, listener, options);
  }

  canvas.removeEventListener = function (type, listener) {
    // console.log('canvas.removeEventListener', type);
    document.removeEventListener(type, listener);
  }

  canvas.dispatchEvent = function (event = {}) {
    console.log('canvas.dispatchEvent' , event.type, event);
    // nothing to do
  }

  Object.defineProperty(canvas, 'clientWidth', {
    enumerable: true,
    get: function get() {
      return innerWidth
    }
  })

  Object.defineProperty(canvas, 'clientHeight', {
    enumerable: true,
    get: function get() {
      return innerHeight
    }
  })

  return canvas
}
