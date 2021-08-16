const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} =require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');



const tsRule = {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use:'ts-loader',
}

const plugins = [
    new HtmlWebpackPlugin({
        template:'src/popup-pages/popup.html',
        filename:'popup.html',
        chunks : ['popup'],
    }),
    new CopyWebpackPlugin({
        patterns: [
            {from:"public", to: "."}
        ] 
    }),
]

module.exports = {
    mode : "production",
    entry:{
        popup: './src/popup-pages/popup.tsx'
    },
    output:{
        filename:'[name].js',
        path:resolve(__dirname,'dist'),

    },

    module:{
        rules:[tsRule],
    },
    plugins,



}