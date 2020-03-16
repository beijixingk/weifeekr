// component/homeComponents/productlist/productlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    productlist:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes:{
    attached:function(){
      wx.request({
        url:'https://wapi.feekr.com/product/module?moduleId=1',
        success:(res)=>{
          this.setData({
            productlist:res.data.result.product
          })
        }
      })
    }
  }
})
