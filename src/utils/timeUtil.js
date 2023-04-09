const dateFormatNow=()=>{
  let currentDate = new Date();// 创建Date对象并获取当前日期
  // 获取当前年份、月份和日期
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let date = currentDate.getDate();
  // 将月份和日期转换为字符串，并在必要时在前面添加0
  month = (month < 10 ? "0" : "") + month;
  date = (date < 10 ? "0" : "") + date;
  // 将年份、月份和日期拼接为 yyyy-MM-dd 格式的字符串
  let formattedDate = year + "-" + month + "-" + date;
  return formattedDate;
}
const datetimeFormat=(dateTime)=>{
  let year=dateTime.getFullYear();
  let month=dateTime.getMonth()+1;
  let date=dateTime.getDate();
  let hour=dateTime.getHours();
  let minutes=dateTime.getMinutes();
  month = (month < 10 ? "0" : "") + month;
  date = (date < 10 ? "0" : "") + date;
  hour = (hour < 10 ? "0" : "") + hour;
  minutes = (minutes < 10 ? "0" : "") + minutes;
  let formattedDate=year+"-"+month+"-"+date;
  let formattedTime=hour+":"+minutes;
  return {formattedDate,formattedTime};
}
export default dateFormatNow;
export {dateFormatNow,datetimeFormat}

