Component({
    //初始默认为当前日期
    properties: {
        defaultValue: {
            type: String, 
            value: ''
        },
        //星期数组
        weekText: {
            type: Array,
            value: ['日', '一', '二', '三', '四', '五', '六']
        }
    },
    // 组件的初始数据
    data: {
        index:0,
        content:'',
        //当月格子
        thisMonthDays: [],
        //上月格子
        empytGridsBefore: [],
        //下月格子
        empytGridsAfter: [],
        //显示日期
        title: [],
        //格式化日期
        format: '',
        currentM:0,

        year: 2020,
        month: 0,
        date:0,
        toggleType:'large',
        scrollLeft:0,
        //常量 用于匹配是否为当天
        YEAR: 0,
        MONTH: 0,
        DATE: 0,
        calendarlist:[]
    },
    ready: function () {
        // this.today();
    },
    lifetimes:{
      attached() {
        var that = this
        wx.request({
          url: 'https://wapi.feekr.com/shop/order/booking_calendar?groupId=QlpoNDFBWSZTWbI6NC8AAAJLgCAAVmAAAIooBAAgADEA0AETTDSPI7MhE0AVhS0XckU4UJCyOjQv&shopid=FK',
          success(res) {
            // console.log(res.data.result)
            let { currentTime,endTime } = res.data.result
            let reg = /\/(\w+)\//
            let now = reg.exec(currentTime)
            let end = reg.exec(endTime)
            // console.log(now[1],end[1])
            let tmpArr = []
            let len = 0;
            for(let i=~~now[1];i<=~~end[1];i++){
              tmpArr[len++] = that.data.year + '年' + that.zero(i) + '月'
            }
            // console.log(tmpArr)
            // let tmp = year + '年' + this.zero(now++) + '月'
            that.setData({
              currentM:~~now[1],
              calendarlist:res.data.result.validTime,
              title:tmpArr,
            })
            that.today();
          }
        })
      }

    },

    methods: {
        //切换展示
        toggleType(){
            console.log(this.data.toggleType)
            this.setData({
                toggleType: this.data.toggleType == 'mini' ? 'large' :'mini'
            })
            //初始化日历组件UI
            this.display(this.data.year, this.data.month, this.data.date);
        },
        //滚动模式
        //当年当月当天 滚动到制定日期 否则滚动到当月1日
        scrollCalendar(year, month, date){
            // console.log(year, month, date)
            var that = this, scrollLeft = 0;
            wx.getSystemInfo({
                success(res) {
                    //切换月份时 date为0
                    if (date == 0 ){
                        scrollLeft = 0;
                        //切换到当年当月 滚动到当日
                        if (year == that.data.YEAR && month == that.data.MONTH) {
                            scrollLeft = that.data.DATE * 45 - res.windowWidth / 2 - 22.5;
                        }
                    }else{
                        // 点选具体某一天 滚到到指定日期
                        scrollLeft = date * 45 - res.windowWidth / 2 - 22.5;
                    }

                    that.setData({
                        scrollLeft: scrollLeft
                    })
                }
            })
        },

        //初始化
        display: function (year, month, date) {
            this.setData({
                year,
                month,
                date,
            })
            // console.log(month)
            this.createDays(year, month);
            this.createEmptyGrids(year, month);

            //滚动模糊 初始界面
            this.scrollCalendar(year, month, date);
        },
        //默认选中当天 并初始化组件
        today: function () {
            let DATE = this.data.defaultValue ? new Date(this.data.defaultValue) : new Date(),
                year = DATE.getFullYear(),
                month = DATE.getMonth() + 1,
                date = DATE.getDate(),
                select = year + '-' + this.zero(month) + '-' + this.zero(date);

            this.setData({
                format: select,
                select: select,
                year: year,
                month: month,
                date: date,
                YEAR: year,
                MONTH: month,
                DATE: date,
            })

            //初始化日历组件UI
            this.display(year, month, date);

            //发送事件监听
            this.triggerEvent('select', select);
        },

        //选择 并格式化数据
        select: function (e) {
            let date = e.currentTarget.dataset.date,
                select = this.data.year + '-' + this.zero(this.data.month) + '-' + this.zero(date);
            this.setData({
                select: select,
                year: this.data.year,
                month: this.data.month,
                date:date
            });

            //发送事件监听
            this.triggerEvent('select', select);

            //滚动日历到选中日期
            this.scrollCalendar(this.data.year, this.data.month,date);
        },
        //上个月
        chooseMonth: function (e) {
            let index = e.currentTarget.dataset.id
            let date = this.data.title[index]
            let dateArr = date.match(/(\d+)/g)
            let year = dateArr[0]
            let month = ~~dateArr[1]
            this.setData({
              currentM:index+1
            })
            // let month = this.data.month == 1 ? 12 : this.data.month - 1;
            // let year = this.data.month == 1 ? this.data.year - 1 : this.data.year;
            //初始化日历组件UI
            this.display(year, month, 0);
        },
        //获取当月天数
        getThisMonthDays: function (year, month) {
            return new Date(year, month, 0).getDate();
        },
        // 绘制当月天数占的格子
        createDays: function (year, month) {
            // console.log(this.data.calendarlist)
            let thisMonthDays = [],days = this.getThisMonthDays(year, month);
            let idx = this.data.index
            for (let i = 1; i <= days; i++) {
              // console.log(year + '/' + this.zero(month) + '/' + this.zero(i))
              if (year + '/' + this.zero(month) + '/' + this.zero(i) >= this.data.calendarlist[0].date){
              idx = this.getContent(idx, year, month, i) 
              // console.log(idx)
              this.setData({
                index:idx
              })
              }
              // console.log(year + '/' + this.zero(month) + '/' + this.zero(i))
                thisMonthDays.push({
                    date: i,
                    dateFormat: this.zero(i),
                    monthFormat: this.zero(month),
                    week: this.data.weekText[new Date(Date.UTC(year, month - 1, i)).getDay()],
                  content: (idx && this.data.calendarlist[idx]['price']) ? ('￥' + this.data.calendarlist[idx]['price']):''
                });
            }
            this.setData({
                thisMonthDays
            })
        },
        //获取当月空出的天数
        createEmptyGrids: function (year, month) {
            let week = new Date(Date.UTC(year, month - 1, 1)).getDay(),
                empytGridsBefore = [],
                empytGridsAfter = [],
                emptyDays = (week == 0 ? 7 : week);
            //当月天数
            var thisMonthDays = this.getThisMonthDays(year, month);
            //上月天数
            var preMonthDays = month - 1 < 0 
                ? this.getThisMonthDays(year - 1, 12) 
                : this.getThisMonthDays(year, month - 1);

            //空出日期
            for (let i = 1; i <= emptyDays; i++) {
                empytGridsBefore.push(preMonthDays - (emptyDays - i));
            }

            var after = (42 - thisMonthDays - emptyDays) - 7 >= 0 
                        ? (42 - thisMonthDays - emptyDays) - 7 
                        : (42 - thisMonthDays - emptyDays);
            for (let i = 1; i <= after; i++) {
                empytGridsAfter.push(i);
            }
            this.setData({
                empytGridsAfter,
                empytGridsBefore
            })
        },
        //得到当前日期的价格
      getContent: function (count, year, month, day) {
        for (let i = count; i < this.data.calendarlist.length; i++) {
          // console.log(this.data.calendarlist[i].date)
          // console.log(year + '/' + this.zero(month) + '/' + this.zero(day))
          if (this.data.calendarlist[i].date === year + '/' + this.zero(month) + '/' + this.zero(day)) {
            return i
          }
        }
      },
        //补全0
        zero: function (i) {
            return i >= 10 ? i : '0' + i;
        }
        
    }
})