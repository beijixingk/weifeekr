// components/searchRes/SearchRes.js
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
    styleTxt: '分类',
    areaTxt: '目的地',
    sortTxt: '排序',
    citys: [],
    cityList:[],
    sortsList: [],
    styleList: [{ id: 0, name: "全部分类" }],
    styleshow: false,
    sortshow: false,
    cityshow: false,
    styleId: null,
    sortId: null,
    citySortId: null,
    cityId: null,
  },

  lifetimes:{
    attached:function(){
      this._getList('https://wapi.feekr.com/shop/product/search_item?style[]=&city[]=&keyword=&shopid=FK')
    }
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    _getList(url){
      wx.request({
        url,
        success: (result) => {
          this.setData({
            cityList: result.data.result.city,
            sortsList: result.data.result.sort,
            styleList: [...this.data.styleList, ...result.data.result.style]
          })
        }
      })
    }, 
    _changeCityList(url){
      wx.request({
        url,
        success: (result) => {
          this.setData({
            citys: result.data.result.city,
            cityList: result.data.result.city,
          })
        }
      })
    },
    _sortCitys(cityList,country){
      if(country == 0){
        return cityList
      }else{
        let newCityList = cityList.filter(item => item.country == country)
        return newCityList
      }
    },
    handleStyleBox() {
      this.setData({
        sortshow: false,
        cityshow: false,
        styleshow: !this.data.styleshow,
      })
    },
    handleCityBox() {
      this.setData({
        styleshow: false,
        sortshow: false,
        cityshow: !this.data.cityshow,
      })
    },
    handleSortBox() {
      this.setData({
        styleshow: false,
        cityshow: false,
        sortshow: !this.data.sortshow,
      })
    },
    changeStyle: function (e) {
      let styleId = e.currentTarget.dataset.id
      let styleTxt = e.currentTarget.dataset.label
      if (styleId == 0){
        this.setData({
          styleId: styleId,
          styleTxt: styleTxt,
          styleshow: false,
          cityId : '',
          areaTxt: '目的地'
        })
      }else{
        this.setData({
          styleId: styleId,
          styleTxt: styleTxt,
          styleshow: false,
        })
      }
      
      this._changeCityList('https://wapi.feekr.com/shop/product/search_item?style[]='+ styleId +'&city[]=&keyword=&shopid=FK')
      var myEventDetail = {
        styleId
      }
      this.triggerEvent('myevent', myEventDetail)
    },
    changeSort: function (e) {
      let sortId = e.currentTarget.dataset.id
      let sortTxt = e.currentTarget.dataset.label
      this.setData({
        sortId: sortId,
        sortTxt: sortTxt,
        sortshow: false,
      })
      var myEventDetail = {
        sortId
      }
      this.triggerEvent('myevent', myEventDetail)
    },
    changeCitySort: function (e) {
      let citySortId = e.currentTarget.dataset.id
      this.setData({
        citySortId: citySortId,
        cityList: this._sortCitys(this.data.citys, citySortId)
      })
    },
    changeCity: function (e) {
      let cityId = e.currentTarget.dataset.id
      let areaTxt = e.currentTarget.dataset.label
      this.setData({
        cityId: cityId,
        areaTxt: areaTxt,
        cityshow: false
      })
      var myEventDetail = {
        cityId
      }
      this.triggerEvent('myevent', myEventDetail)
    }
  }
})
