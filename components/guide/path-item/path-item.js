// components/guide/path-item/path-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    path: {
      type: Object
    },
    num: {
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    path:{},
    num:'',
    pathTxt:''
  },
  lifetimes:{
    attached(){
      this.setData({
        pathTxt: this.data.path.scenic.join('-')
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
