const userValidation = {
  userId: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const studentValidation = {
  studentName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  studentPassword: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 18, message: "长度在6到18个字符", trigger: "blur" },
  ],
  studentGender: [{ required: true, trigger: "blur" }],
  studentBirthday: [{ required: true, trigger: "blur" }],
  studentPhonenum: [
    { required: true, message: "请输入电话号码", trigger: "blur" },
    { min: 11, max: 11, message: "请输入11位", trigger: "blur" },
  ],
  studentEmail: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  studentAddress: [{ required: true, message: "请输入地址", trigger: "blur" }],
};
const teacherValidation = {
  teacherName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  teacherPassword: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 18, message: "长度在6到18个字符", trigger: "blur" },
  ],
  teacherGender: [{ required: true, trigger: "blur" }],
  teacherBirthday: [{ required: true, trigger: "blur" }],
  teacherPhonenum: [
    { required: true, message: "请输入电话号码", trigger: "blur" },
    { min: 11, max: 11, message: "请输入11位", trigger: "blur" },
  ],
  teacherEmail: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
  teacherAddress: [{ required: true, message: "请输入地址", trigger: "blur" }],
};

export { userValidation, studentValidation, teacherValidation };
