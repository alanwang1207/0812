// 以 Express 建立 Web 伺服器
var express = require("express");
var app = express();

// 以 body-parser 模組協助 Express 解析表單與JSON資料
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: false}) );

// Web 伺服器的靜態檔案置於 public 資料夾
app.use( express.static( "public" ) );

// 以 express-session 管理狀態資訊
var session = require('express-session');
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));

// 指定 esj 為 Express 的畫面處理引擎
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/view');

// 一切就緒，開始接受用戶端連線
// app.listen(process.env.PORT);
app.listen(80);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("鍵盤「Ctrl + C」可結束伺服器程式.");

// 建立資料庫連線
var mysql = require('mysql');
var connection = mysql.createConnection({
	host : '127.0.0.1',
	user : 'root',
	password : 'root',
	database : 'labdb',
	port : '8889'
});

connection.connect(function(err) {
	// if (err) throw err;
	if (err) {
		console.log(JSON.stringify(err));
		return;
	}
});

// 依 HTTP 的 Method (POST/GET/PUT/DELETE) 進行增查修刪

app.get("/home/news", function (request, response) {

	connection.query('select * from news', 
		'',
		function(err, rows) {
			if (err)	{
				console.log(JSON.stringify(err));
				return;
			}
			
			response.send(JSON.stringify(rows));
		}
	);
    
})

$.ajax({
	url:"/home/news",
	type:'GET',
	dataType:'json',
	success:function(){ // http code 200
	},
	error:function(XMLHttpRequest, textStatus, errorThrown){
		switch(XMLHttpRequest.status){
			case 401:
				break;
			case 404:
				break;
			case 500:
				break;
		}
	}
});





app.post("/home/news", function (request, response) {

	connection.query(
		"insert into news set title = ?, ymd = ? ", 
			[
				request.body.title, 
				request.body.ymd
			]);
	response.send("row inserted.");
    
})


$.ajax({
	url:"/home/news",
	type:'POST',
	data:'{"name":"snow","gender":0}',
	dataType:'json',
	success:function(){ // http code 200
	},
	error:function(XMLHttpRequest, textStatus, errorThrown){
		switch(XMLHttpRequest.status){
			case 401:
				break;
			case 404:
				break;
			case 500:
				break;
		}
	}
});


app.put("/home/news", function (request, response) {

	connection.query(
		"update news set title = ?, ymd = ? where newsId = " 
		    + request.body.newsId, 
			[
				request.body.title, 
				request.body.ymd
			]);
	response.send("row updated.");
    
})

$.ajax({
	url:"/home/news",
	type:'PUT',
	data:'{"name":"snow233","gender":1}',
	dataType:'json',
	beforeSend: function(request) {
		request.setRequestHeader("Authorization", "Bearer xxxxxxxxxx");
	},
	success:function(){ // http code 200
	},
	error:function(XMLHttpRequest, textStatus, errorThrown){
		switch(XMLHttpRequest.status){
			case 401:
				break;
			case 404:
				break;
			case 500:
				break;
		}
	}
});

app.delete("/home/news", function (request, response) {

	connection.query(
		"delete from news where newsId = " + request.body.newsId,
			[]
		);
	response.send("row deleted.");
    
})


$.ajax({
	url:"/ajax/delete_data/123456",
	type:'DELETE',
	dataType:'json',
	beforeSend: function(request) {
		request.setRequestHeader("Authorization", "Bearer xxxxxxxxxx");
	},
	success:function(){ // http code 200
	},
	error:function(XMLHttpRequest, textStatus, errorThrown){
		switch(XMLHttpRequest.status){
			case 401:
				break;
			case 404:
				break;
			case 500:
				break;
		}
	}
});