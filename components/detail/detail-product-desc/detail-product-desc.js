// components/detail/detail-product-desc/detail-product-desc.js
import behavior from '../behaviors/detail-behaviors.js'

Component({
  /**
   * 组件的属性列表
   */
  behaviors:[behavior],
  properties: {

  },
  lifetimes:{

  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTab:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    choosetab(e){
      this.setData({
        currentTab:e.currentTarget.dataset.tab
      })
    }
  }
})
