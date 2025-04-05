const merge = require('webpack-merge')


const baseConfigFile = require('./webpack.config')

module.exports = merge(baseConfigFile, {
    prodServer: {

    },
    plugins: [
        {
            
        }
    ]
})