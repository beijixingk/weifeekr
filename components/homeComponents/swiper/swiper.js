// components/homeComponents/swiper/swiper.js
Component({
  data: {
    background: [],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500
  },
  lifetimes:{
    attached:function(){
      wx.request({
        url: 'https://wapi.feekr.com/strategy/slideThumb?code=strategy',
        success:(res)=>{
          this.setData({
            background: res.data.result.slideItem
          })
        }
      })
      
    }
  }
})
