export default {
    // 判断选择的日期与控制台日期先后
    judgeDate(elDatePickerDeadline,selectedDate) {
        const selectDate = new Date(selectedDate[0],selectedDate[1]-1,selectedDate[2])
        return elDatePickerDeadline >= selectDate;
    },

    // 是否逾期
    judgeOverdueUtil(date,state){
        const now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
        const date_ = new Date(date[0],date[1]-1,date[2])
        return now > date_ && !state;
    },

    getCurrentDateUtil() {
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let day = now.getDate();
        const time = [now.getHours(),now.getMinutes(),now.getSeconds()] ;
        let week = this.getWeekUtil(now.getDay());
        return [year, month, day,time,week];
    },
    dealDateUtil(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 月份从0开始，需要加1
        const day = parseInt(date.getDate());
        const time = [parseInt(date.getHours()),parseInt(date.getMinutes()),parseInt(date.getSeconds())] ;
        const week = this.getWeekUtil(date.getDay());
        return [year, month, day,time,week];
    },
    getWeekUtil(n) {
        if (n === 0) {
            return "星期日"
        } else if (n === 1) {
            return "星期一";
        } else if (n === 2) {
            return "星期二";
        } else if (n === 3) {
            return "星期三";
        } else if (n === 4) {
            return "星期四";
        } else if (n === 5) {
            return "星期五";
        } else if (n === 6) {
            return "星期六";
        }
    },
}
