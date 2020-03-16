// component/homeComponents/newlist/newlist.js
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
    newlist:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toDetail(e){
      let id = e.currentTarget.dataset.id
      console.log(id)
      wx.navigateTo({
        url: `/pages/home/newdetail/newdetail?id=${id}`
      })
    }
  },
  lifetimes:{
    attached:function(){
      wx.request({
        url:'https://wapi.feekr.com/news/lists?page=1&count=4',
        
        success:(res)=>{
          // console.log(res.data)
          var list = res.data.result.list.splice(1, 1)
          this.setData({
            newlist:res.data.result.list
          })
        }
      })
    }
  }
})
