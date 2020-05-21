module.exports = {
    clientId: 'dbc178348b977571a6db', // github的clientId
    clientSecret: '84fa2f6a93408c796db8e190467b8c17051140eb', // github的cclientSecret
    msgKey: 'c32cc2c0ea084c9db36d9243041078f1', // 短信发送的key
    emailPass: 'pbzazeuezsewfbfb', // 发送邮件的pass
    scope: ['user'],
    secret: 'lrlaym',
    whitePath: ['/', '/users/login', '/users/register', '/users/captcha', '/users/phoneLogin', '/users/sendMsg',
        '/users/findPwd', '/users/logout', , /^\/api/, /\.(jpg|jepg|gif|png)$/

    ], // 忽略验证的接口
}
