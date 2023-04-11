const prefix="/courseQuestions";
const questionInterface={
  prefix,
  "tableList":"/getAll",
  "tableChild":"/getChild",
  "insertOne":"/addQues",
  "clock":"/studentClock",//学生打卡
};
const clockInterface={
  prefix,
  "tableList":"/studentClock",
}

export default questionInterface;
export {questionInterface,clockInterface}