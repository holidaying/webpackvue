var Mock = require('mockjs')

module.exports = function() {
    return {
        name: Mock.mock({
            'string|1-10': '★'
        })
    }
}
