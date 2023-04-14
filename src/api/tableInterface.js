//定义了table应该访问的后端接口
const studentInterface = {
  "prefix": "/student",
  "tableList": "/studentList",
  "insertOne": "/studentInsert",
  "deleteOne":"/studentDelete",
  "updateOne":"/studentUpdate"
};
const teacherInterface = {
  "prefix": "/teacher",
  "tableList": "/teacherList",
  "insertOne": "/teacherInsert",
  "deleteOne":"/teacherDelete",
  "updateOne":"/teacherUpdate"
};
const admInterface = {
  "prefix": "/admin",
  "tableList": "/admList",
  "insertOne": "/admInsert",
  "deleteOne":"/admDelete",
  "updateOne":"/admUpdate"
};

export default studentInterface;
export { studentInterface, teacherInterface, admInterface };