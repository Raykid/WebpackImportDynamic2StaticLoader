const path = require("path");
const del = require("del");
const webpack = require("webpack");

const distPath = path.resolve(__dirname, "dist");

// 清理发布目录
del(distPath);
// 开始构建
webpack({
    mode: "development",
    devtool: "cheap",
    entry: path.resolve(__dirname, "src/main.js"),
    output: {
        path: distPath,
        filename: "main.js",
        chunkFilename: "chunk[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "import-dynamic2static-loader"
            }
        ]
    }
}, function(err, stats)
{
    if(err) throw err;
    console.log(stats.toString());
    if(stats.hasErrors())
        console.log("打包失败");
    else
        console.log("打包完成");
});