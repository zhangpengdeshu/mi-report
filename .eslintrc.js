module.exports = {
  root: true,
  env: {
    browser: true,
    jest:true
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2017
  },
  extends: ["airbnb-base"],
  globals: {
    config: true
  },
  rules: {
    "comma-dangle": 0, // 结尾使用额外的逗号
    "quote-props": 0, // 只对非法标识符的属性使用引号
    "max-len": 0, // 最大长度限制
    "linebreak-style": 0, // 强制统一的换行符
    "no-console": 0, // 暂时先关掉，因为prod也有可能需要输入
    "no-param-reassign": 0, // 关闭禁止参数不可修改
    "func-names": 0, // 方法必须命名
    "camelcase": 0, // 变量驼峰命名
    "prefer-object-spread": 0, // 解构赋值对象
    "import/extensions": 0, // import文件扩展名
    "no-nested-ternary":0, // 嵌套三目运算符
    "import/no-dynamic-require": 0, // 避免不确定的require
    "import/no-named-as-default-member":0, // 不直接命名使用default导出
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: false
      }
    ]
  }
};
