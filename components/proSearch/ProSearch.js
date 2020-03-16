// components/ProSearch/ProSearch.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hasSearched:{
      type:String
    },
    keyword:{
      type:String,
      observer:function(newVal,oldVal){
        this.setData({
          inputValue: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputValue: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindInput:function(e){
      this.setData({
        inputValue: e.detail.value
      })
    },
    bindSearch:function(e){
      var list = wx.getStorageSync('search-history-labels')
      if(list){
        if(list.indexOf(e.detail.value) == -1){
          wx.setStorageSync('search-history-labels', [...list, e.detail.value])
        }
      }else{
        wx.setStorageSync('search-history-labels', [e.detail.value])
      }
      if (this.data.hasSearched == 'false') {
        wx.navigateTo({
          url: `/pages/searchRes/searchRes?keyword=${e.detail.value}`
        })
      } else {
        var myEventDetail = {
          keyword:e.detail.value
        }
        this.triggerEvent('myevent', myEventDetail)
      }
    },
    handleSearch:function(e){
      this.setData({
        inputValue: ''
      })
      if (this.data.hasSearched == 'true') {
        var myEventDetail = {
          keyword: ''
        }
        this.triggerEvent('myevent', myEventDetail)
      }
      
    }
  }
})
