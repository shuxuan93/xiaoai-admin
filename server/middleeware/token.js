const jwt = require('jsonwebtoken');
const { secret } = require('../config')
exports.verToken = function(token) {
    console.log(token + '222');
    return new Promise((resolve, reject) => {
        let userInfo = jwt.verify(token.replace(/\"/g, ""), secret)
        resolve(userInfo)
    }).catch(err => {
        console.log(err)
    })
}