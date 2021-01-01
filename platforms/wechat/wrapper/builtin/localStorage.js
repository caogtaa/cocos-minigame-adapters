/*
 * @Author: your name
 * @Date: 2020-07-31 01:06:49
 * @LastEditTime: 2021-01-01 15:41:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \adapters\platforms\wechat\wrapper\builtin\localStorage.js
 */

const localStorage = {
  get length() {
    const { keys } = wx.getStorageInfoSync()

    return keys.length
  },

  key(n) {
    const { keys } = wx.getStorageInfoSync()

    return keys[n]
  },

  getItem(key) {
    return wx.getStorageSync(key)
  },

  setItem(key, value) {
    // return wx.setStorageSync(key, value)
    // 20210101, 改为异步写入, 因为业务上没有同时读写的需求。这里假设wx接口的写入是异步排队的
    // console.log(`enter, key = ${key}, data = ${value} `);
    return wx.setStorage({
      key: key,
      data: value
    });
  },

  removeItem(key) {
    // wx.removeStorageSync(key)
    wx.removeStorage(key);
    // console.log(`-- remove key ${key}`);
  },

  clear() {
    wx.clearStorage();
    // console.log(`-- clear storage ${key}`);
    // wx.clearStorageSync()
  }
}

export default localStorage
