// component/detail-swiper/detail-swiper.js
import behavior from '../behaviors/detail-behavior1.js'
Component({
  /**
   * 组件的属性列表
   */
  behaviors:[behavior],
  properties: {
    productThumblist:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgHeight: 0,
    current:1
  },
  /**
   * 组件的方法列表
   */
  methods: {
    imageLoad: function (e) {//获取图片真实宽度  
      var imgwidth = e.detail.width,
        imgheight = e.detail.height,
        //宽高比  
        ratio = imgwidth / imgheight;
      //计算的高度值  
      var viewHeight = wx.getSystemInfoSync().windowWidth * 2 / ratio;
      var imgHeight = this.data.imgHeight;
      //把每一张图片的对应的高度记录到数组里  
      imgHeight = viewHeight;
      this.setData({
        imgHeight
      })
    },
    bindchange: function (e) {
      this.setData({
        current: e.detail.current+1
      })
    }
  }
})
