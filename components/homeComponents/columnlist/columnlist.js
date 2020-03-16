// components/homeComponents/columnlist/columnlist.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    kind:{
      type:String
    },
    flag:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    id:0,
    newList:[],
    hotList:'',
    newPages:1,
    totalCount:5
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getNewList(){
      let id = wx.getStorageSync('columnid')
      wx.getStorage({
        key: 'columnid',
        // success: function(res) {
        //   console.log(res.data)
        // },
      })
      // console.log(id)
      this.setData({
        id
      })
      if(this.properties.flag===1){
        this.setData({
          newPages:1,
          newList:[]
        })
      }
      // console.log(this.properties.kind)
      if (this.data.newPages<=Math.ceil(this.data.totalCount/5)){
        wx.request({
          url: `https://wapi.feekr.com/selection/detail?columnId=${this.data.id}&order=${this.properties.kind}&page=${this.data.newPages}`,
          success:(res)=>{
            this.setData({
              newList:[
                ...this.data.newList,
                ...res.data.result.list
              ],
              totalCount:res.data.result.totalCount
            })
          }
        })
        this.data.newPages++
      }
    },
    toDetail(e){
      // console.log(e)
      let id = e.currentTarget.dataset.ids
      wx.navigateTo({
        url: `../../../pages/home/newdetail/newdetail?id=${id}`,
      })
      
    }
  },
  lifetimes:{
    attached:function(){
      this.getNewList()
    }
  }
})
