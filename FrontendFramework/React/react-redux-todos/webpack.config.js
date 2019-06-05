var webpack = require('webpack')
var HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
	devtool:"eval-source-map",
	entry:__dirname + "/app/index.js",
	output:{
		path:__dirname + "/build",
		filename:"bundle.js"
	},
	devServer:{
		contentBase:"./build",
		//colors:true,
		historyApiFallback:true,
		inline:true,
		port:"8080"
	},
	module:{
		loaders:[
			{
				test:/\.json$/,
				loader:"json-loader"
			},
			{
		        test: /\.jsx?$/,
		        exclude: /node_modules/,
		        loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
		        query: {
		        	presets: ['es2015','react']
        		}
        	},
        	{
        		test:/\.css$/,
        		loader:"style-loader!css-loader"
        	},
        	{
        		test:/\.(png|jpg)$/,
        		loader:"url-loader?limit=50000"
        	}
		]
	},
	plugins: [
    	new webpack.BannerPlugin("this is made by wangzhen,,HaHaHa!"),//在这个数组中new一个就可以了
    	new HtmlWebpackPlugin({
    		template:__dirname + "/app/index.tmpl.html"
    	}),
    	//new extractText("styles.css"),
	    //new webpack.optimize.OccurenceOrderPlugin(),
    	new webpack.optimize.UglifyJsPlugin(),
    ]
}