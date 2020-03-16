import behavior from '../behaviors/navindex-behavior.js'
Component({
  behaviors: [behavior],
  properties: {
    title:String
  },
  data: {
    current: 0,
    imgHeight: 0,
  }, // 私有数据，可用于模板渲染

  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () { 
    },
    moved: function () { },
    detached: function () { },
  },

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
        current: e.detail.current + 1
      })
    }
  }
})