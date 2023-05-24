const userValidation = {
  userId: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

const registerValidation = {
  userName: [{required: true, message: "请输入姓名", trigger: "blur"}],
  userPassword: [
    {required: true, message: "请输入密码", trigger: "blur"},
    {min: 6, max: 18, message: "长度在6到18个字符", trigger: "blur"},
  ],
  userGender: [{required: true, trigger: "blur", message: "请选择性别"}],
  userBirthday: [{required: true, trigger: "blur", message: "请输入生日"}],
  userPhonenum: [
    {required: true, message: "请输入电话号码", trigger: "blur"},
    {min: 11, max: 11, message: "请输入11位", trigger: "blur"},
  ],
  userEmail: [{required: true, message: "请输入邮箱", trigger: "blur"}],
  userAddress: [{required: true, message: "请输入地址", trigger: "blur"}],
};


export {userValidation, registerValidation};
