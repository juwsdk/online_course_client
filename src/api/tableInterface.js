//定义了table应该访问的后端接口
const studentInterface={
  "prefix":"/student",
  "tableList":"/studentList",
  "insertOne":"/studentInsert"
};
const teacherInterface={
  "prefix":"/teacher",
  "tableList":"/teacherList"
};
const admInterface={
  "prefix":"/admin",
  "tableList":"/admList"
};

export default studentInterface;
export  {studentInterface,teacherInterface,admInterface};