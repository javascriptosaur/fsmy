const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const DtsBundleWebpack = require('dts-bundle-webpack');

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new DtsBundleWebpack({
            name: '@javascriptosaur/fsmy',
            main: 'dist/index.d.ts',
            removeSource: true,
        })
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        filename: 'fsmy.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'fsmy'
    }
}