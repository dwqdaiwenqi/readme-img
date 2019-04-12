var express = require('express');
var app = express();

app.get('/textures/*',(req,res)=>{
	//console.log('get textures file');
	res.header('Access-Control-Allow-Origin', '*');
	res.sendFile(__dirname+req.path);
})
app.get('/img/*',(req,res)=>{
	//console.log('get textures file');
	console.log('req.headers.origin:',req.headers.origin);

	// service woker中不使用*
	// res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Credentials','true')

	res.sendFile(__dirname+req.path);
})

app.get('/models/*', (req,res)=>{
	//console.log('get model file');
	res.header('Access-Control-Allow-Origin', '*');
	res.sendFile(__dirname+req.path);
	//console.log(req);
	//res.send('niconiconi !!!!!!!!!');
});

app.get('/common/font/*', (req,res)=>{
	//console.log('get model file');
	res.header('Access-Control-Allow-Origin', '*');
	res.sendFile(__dirname+req.path);

	//console.log(req);
	//res.send('niconiconi !!!!!!!!!');
});
app.get('/fonts/*', (req,res)=>{
	//console.log('get model file');
	res.header('Access-Control-Allow-Origin', '*');
	res.sendFile(__dirname+req.path);


	//console.log(req);
	//res.send('niconiconi !!!!!!!!!');
});

//静态资源后缀限制
app.use((req,res,next)=>{

	if(/\.php$/i.test(req.path)){
		const path = req.path.replace(/(.+)(\.php)$/,(a,b,c)=>{
			return b + '.html'
		})
		return res.sendFile(__dirname+path)
	}

	next()
	
})


app.get('/report',(req,res)=>{
	// console.log(req.query);
});

// app.use(express.static(__dirname + '/'));

app.use(express.static(__dirname+'/',{index:'index.html'}))


app.get('/', function (req, res) {

  res.send('niconiconi')
});

app.get('/danmakulist' , (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	let danmakuList = {}

	console.log(req.query)

	let modes = ['linear','curve','fixed','linear']

	Array.from({ length: req.query.duration * 1}, (v, i) => {

		var fill = '#'+Math.floor(Math.random()*0xffffff).toString(16)
		danmakuList[i] = {
			data: Array.from({length:  Math.random() * 10 },(v,j)=>{
				var mode = modes[Math.random()*modes.length | 0]

				return {text:`文字文字-at-${i}s`,fill , mode, fontSize: 18+Math.random()*10, alpha: 1}
			})
		}
	})

	setTimeout(()=>{
		res.header('content-type', 'text/html; charset=utf-8')
		res.end(JSON.stringify(danmakuList))
	},1234)
	
})

app.get('/api/heatmap',(req,res)=>{


	// var points = Array.from({length:100},(v,i)=>{
	// 			// 原点在左上
	// 			// [x,y,val] 
	// 			// x范围0-1，y范围0-1，val是权重范围0-1
	// 	return{
	// 		x:Math.random(), //x
	// 		y:Math.random(), //y
	// 		w:0 //权重
	// 	}
	// })

	// var heatpoints = Array.from({length:50},(v,i)=>{
	// // var heatpoints = Array.from({length:3000},(v,i)=>{
	// 		// 原点在左上
	// 		// [x,y,val] 
	// 		// x范围0-1，y范围0-1，val是权重范围0-1
	// 	// return[
	// 	// 	Math.random(), //x
	// 	// 	Math.random(), //y
	// 	// 	.1 //权重
	// 	// ]

	// 	return{
	// 		idx: Math.floor(
	// 			// Math.random()*( Math.random()<.4?req.query.grids:req.query.grids*.5 )  
	// 			Math.random()*req.query.grids
			
	// 		),
	// 		weight:Math.random()
	// 	}
	// })
	var heatpoints = Array.from({length:5000},(v,i)=>{
		// var heatpoints = Array.from({length:3000},(v,i)=>{
				// 原点在左上
				// [x,y,val] 
				// x范围0-1，y范围0-1，val是权重范围0-1
			// return[
			// 	Math.random(), //x
			// 	Math.random(), //y
			// 	.1 //权重
			// ]
	
			// return{
			// 	idx: Math.floor(
			// 		// Math.random()*( Math.random()<.4?req.query.grids:req.query.grids*.5 )  
			// 		Math.random()*req.query.grids
				
			// 	),
			// 	weight:Math.random()


			// 	// idx:i,
			// 	// weight:i%100===0?1:.1
			// }
			return{
				idx:i,
				// weight:  (i>100&&i<300)?1:.1
				// weight:Math.random()
				weight:Math.random()*(Math.random()<.05?.5:0.25)
				// weight:Math.random()*.25
			}
		})

	res.end(JSON.stringify({
		errno:0,
		msg:'',
		result:{
			grids:req.query.grids,
			heatpoints
		}
	}))


})

app.get('/h5/api/getGameDownUrl/',(req,res)=>{
	//{uid,token,gid}
	switch(req.query.pro){
		case 'horizontal-game-m':

			setTimeout(()=>{
				res.jsonp({
					status:1
					,message:'message from horizontal-game-m'
					,data:{
						android_url:'https://static.uono4521.com/shouyou/apk/moyuguilai/8/moyuguilai_8_7299.apk'
						,ios_url:'https://static.uono4521.com/shouyou/apk/moyuguilai/8/moyuguilai_8_7299.apk'
					}
					// ,data:{
					// 	android_url:''
					// 	,ios_url:''
					// }
				})
				
			},1234)
			

			break;
	}
})
app.get('/h5/api/getQrCode',(req,res)=>{
	// 获取二维码
	// res.jsonp({
  //   status:1
  //   ,message:'message from qrcode'
  //   ,data:{
	// 		qrcode:'https://raw.githubusercontent.com/dwqdaiwenqi/arO3O/master/qrx.jpg'
  //   }
	// })

	res.end('https://raw.githubusercontent.com/dwqdaiwenqi/arO3O/master/qrx.jpg')
})

app.get('/h5/api/getGameInfo',(req,res)=>{

	//console.log(req.params);
	// console.log(req.query) 

	switch(req.query.pro){
		case 'horizontal-game':
			// res.end(JSON.stringify({
			// 	status:1
			// 	,message:'message from userinfo'
			// 	,data:{
			// 		username:'username-77777'
			// 		,count:16
			// 	}
			// }))

			// 获取其他一些信息
			res.jsonp({
				status:1
				,message:'message from gameinfo!!!'
				,data:{
					open_url:'https://www.baidu.com'
					,title:'title-horizontal-game'
				}
			})
			break;
	}

	
})
/////////////////////////xy活动

// http://www.xy.com/h5/youyi/register?ish5=1&username=12345hhhhh&password=23456h&appid=1&adid=1&yy_uid=1&yy_gid=1&yy_chid=1


app.get('/h5/youyi/register',(req,res)=>{
	//{"errno":1002,"msg":"\u8be5\u5e10\u53f7\u5df2\u6ce8\u518c","result":[]}
	res.end(JSON.stringify({
		errno: 0, //0注册成，其他情况不为0
		msg: 'msg!!!~~~~~!',
		result:[]
	}))
})


let part1 = '/huodong/chun2019/'

let countx = 0

app.get('/huodong/chun2019/actinfo',(req,res)=>{
	
	res.end(JSON.stringify({
		data:{
			notice:{ //大奖公告
				gamename:'蓝月传奇',//游戏名
				rolename:'xxx一区',//区服
				// username:'abc-123'//用户名
				username:'abc-123'//用户名
			},
			specialacts:[ // 游戏活动列表
				//https://static.xyimg.net/cn/./static/upload/image/1493654693_6510.png
				{title:'2月2日-2月12日',time:'1-1-1-',desc:'descc23333',spic:'./static/fed/common/img/aa.jpg', pic:'./static/fed/common/img/aa.jpg',slink:'//www.baidu.com',link:'//www.bilibili.com',status:'已结束',over:true},
				{title:'2月2日-2月12日',time:'1-1-1-',desc:'descc23333',spic:'./static/fed/common/img/aa.jpg', pic:'./static/fed/common/img/aa.jpg',slink:'//www.bilibili.com',link:'//www.bilibili.com',status:'已结束',over:false},
				{title:'2月2日-2月12日',time:'1-1-1-',desc:'descc23333',spic:'./static/fed/common/img/aa.jpg', pic:'./static/fed/common/img/aa.jpg',slink:'//www.bilibili.com',link:'//www.bilibili.com',status:'进行中',over:true},
				{title:'2月2日-2月12日',time:'1-1-1-',desc:'descc23333',spic:'./static/fed/common/img/aa.jpg', pic:'./static/fed/common/img/aa.jpg',slink:'//www.bilibili.com',link:'//www.bilibili.com',status:'进行中',over:true},
				{title:'2月2日-2月12日',time:'1-1-1-',desc:'descc23333',spic:'./static/fed/common/img/aa.jpg', pic:'./static/fed/common/img/aa.jpg',slink:'//www.bilibili.com',link:'//www.bilibili.com',status:'未开始',over:true},
				{title:'2月2日-2月12日',time:'1-1-1-',desc:'descc23333',spic:'./static/fed/common/img/aa.jpg', pic:'./static/fed/common/img/aa.jpg',slink:'//www.bilibili.com',link:'//www.bilibili.com',status:'未开始',over:true},
				{title:'2月2日-2月12日',time:'1-1-1-',desc:'descc23333',spic:'./static/fed/common/img/aa.jpg', pic:'./static/fed/common/img/aa.jpg',slink:'//www.bilibili.com',link:'//www.bilibili.com',status:'未开始',over:true},
				{title:'2月2日-2月12日',time:'1-1-1-',desc:'descc23333',spic:'./static/fed/common/img/aa.jpg', pic:'./static/fed/common/img/aa.jpg',slink:'//www.bilibili.com',link:'//www.bilibili.com',status:'未开始',over:true}
			],
			giftlist:[ //全部中奖列表
				{username:'abc-1',giftname:'1tb硬盘'},
				{username:'abc-2',giftname:'1tb硬盘'},
				{username:'abc-3',giftname:'1tb硬盘'},
				{username:'abc-4',giftname:'1tb硬盘'},
				{username:'abc-5',giftname:'1tb硬盘'},
				{username:'abc-6',giftname:'1tb硬盘'},
				{username:'abc-7',giftname:'1tb硬盘'},
				{username:'abc-8',giftname:'1tb硬盘'},
				{username:'abc-9',giftname:'1tb硬盘'},
				{username:'abc-10',giftname:'1tb硬盘'},
				{username:'abc-11',giftname:'1tb硬盘'}
			],
			mygiftlist:[//我的奖品列表
				{giftname:'1tb硬盘',content:'2个'},
				{giftname:'蓝月传奇礼包',content:'5个'},
				{giftname:'蓝月传奇礼xxxxx包',content:'54xx个'},
				{giftname:'1tb硬盘',content:'2个'},
			
				{giftname:'1tb硬盘',content:'2个'},
				{giftname:'蓝月传奇礼包',content:'5个'},
				{giftname:'蓝月传奇礼xxxxx包',content:'54xx个'}
			]
			,point:6666//我的剩余积分
			,num_of_game:30//剩余抽奖游戏次数
			// ,username:'戴戴戴'
			,username:''
			,uid:'1234567'

		},
		message:'xxxx',

		status:1 // 0 =未知错误，1 =成功
		// status:0
	}))
	
	
})
// /huodong/chun2019/lottery?act=newyear20190114&type=post&num=x
app.get('/huodong/chun2019/lottery',(req,res)=>{
	console.log('countx:',countx++)

	var {type,num} = req.query
	switch(type){
		case 'post':
			res.jsonp({
				data: {  //  0= '', 1 ={gifts:[],num_of_game:'',jifen:''}
					// gifts:[ // 抽的奖品格子返回
					// 	{giftid:'3'} //giftid=  iphoneXS256G(0)...1TB移动硬盘（7） 顺时针0-7
					// ],
					gifts:Array.from({length:num},()=>{
						return {giftid:Math.random()*8|0}
					}),
					mygiftlist:[//我的奖品列表
						{giftname:'1tb硬盘',content:'2个'},
						{giftname:'蓝月传奇礼包',content:'5个'},
						{giftname:'蓝月传奇礼包',content:'54个'},
						{giftname:'蓝月传奇礼包',content:'5444个'},
						{giftname:'1tb硬盘',content:'2个'},
						{giftname:'蓝月传奇礼包',content:'5个'},
						{giftname:'蓝月传奇礼包',content:'54个'},
						{giftname:'蓝月传奇礼包',content:'5444个'},
						{giftname:'蓝月传奇礼包',content:'5444个'},
						{giftname:'蓝月传奇礼包',content:'5个'},
						{giftname:'蓝月传奇礼包',content:'54个'},
						{giftname:'蓝月传奇礼包',content:'5444个'},
						{giftname:'蓝月传奇礼包',content:'5444个'},
						{giftname:'1tb硬盘',content:'2个'},
						{giftname:'蓝月传奇礼包',content:'5个'},
						{giftname:'蓝月传奇礼包',content:'7774个'}
					],
					num_of_game:3, //剩余抽奖游戏次数
					point: 333 //剩余积分
				},
				message:'xxxx',
				// status:1   // 0=不够条件，需要用二级密码消耗积分， 1 =满足条件，跳过二级进行抽奖
				status:0
				// status:++countx%3===0?0:1   // 0=不够条件，需要用二级密码消耗积分， 1 =满足条件，跳过二级进行抽奖
			})
			break
	}
})

// 二级状态获取 /huodong/chun2019/level2?type=get
//       {
//         data: '',
//         message:'xxxx',
//         status:0  // 0 =未设置 1=已设置
//       }
app.get('/huodong/chun2019/level2',(req,res)=>{
	var {type,num,pwd} = req.query
	switch(type){
		case 'get':
			res.jsonp({
				data:'',
				message:'xxxx',
				status:1 // 0 =未设置 1=已设置,
				// status:0
			})
			break
		case 'post':
			res.jsonp({
				data:{
					gifts:Array.from({length:num},()=>{
						return {giftid:Math.random()*8|0}
					}),
					mygiftlist:[//我的奖品列表
						{giftname:'1tb硬盘',content:'2个'},
						{giftname:'蓝月传奇礼包',content:'5个'}
					],
					num_of_game:12, //剩余抽奖游戏次数
					point: 777 //剩余积分
				},
				message:'xxxx',
				// status:-1    // -1=积分不够  0=密码错误 1 =成功消耗了积分，进行抽奖
				// status:0    // -1=积分不够  0=密码错误 1 =成功消耗了积分，进行抽奖
				status:1    // -1=积分不够  0=密码错误 1 =成功消耗了积分，进行抽奖
			})
			break
	}
	
})

app.get('/huodong/chun2019/address',(req,res)=>{
	var {type,name,tel,ads} = req.query
	switch(type){
		case 'get':
			res.jsonp({
        data:{ // 0 ='' ， 1= {name,tel,ads}
          name:'name-123',tel:'tel-12344444',ads:'ads'
        },
        message:'xxxx',
				// status:1 // 0 =没设置地址， 1=已设置过地址
				status:0 // 0 =没设置地址， 1=已设置过地址
      })
			break
		case 'post':
			res.jsonp({
				data:{
					
				},
				message:'xxx',
				status:1 // 0 =其他错误 ，1 =成功
			})
			break
	}
})

// app.get('/huodong/chun2019/danmaku',(req,res)=>{
// 	var {type,count} = req.query
// 	switch(type){
// 		case 'get':
// 			res.jsonp({
// 				data:{
// 					list:Array.from({length:count},(v,i)=>{
// 						return {text:`text-${i}`}
// 					}),
// 					count
// 				},
// 				message:'xxx',
// 				status:1
// 			})
// 			break
// 		case 'post':
// 			res.jsonp({
// 				data:{
				
// 				},
// 				message:'xxx',
// 				status:1
// 			})
// 			break
// 	}
// })
app.get('/huodong/chun2019/danmaku',(req,res)=>{
	var {type,count} = req.query
	switch(type){
		case 'get':
			res.end(JSON.stringify({
				data:{
					list:Array.from({length:count},(v,i)=>{
						return {text:`text-${i}`}
					}),
					count
				},
				message:'xxx',
				status:1
			}))
			break
		case 'post':
			res.end(JSON.stringify({
				data:{
				
				},
				message:'xxx',
				status:1
			}))
			break
	}
})

//////////////////////////



///////////////////game_10
app.get('/h5/serverapi/server',(req,res)=>{  
	//app.get('/h5/serverapi/server',(req,res)=>{	
	
		res.header('Access-Control-Allow-Origin', '*');
	
		
		console.log(req,res);
	
		//公告返回的html怎样的？
		//白名单，老用户，新用户？？？
	
	//老用户的最近登录的服如果在维护，那么直接跳出公告页面  其余时候 只有玩家点击的时候才会弹出。
	
	//新用户无视，白名单正常操作，老用户无法进维护
			
		// {
	// 		gameid：gameid
	//    ，isWhite：1|0(老用户)
	// 		，play：[{sid:123,name:''}]
	// 		,gameNotice：gameNotice
	// 		，gameServer：[
	// 			{几到几区：[ {server_name：区，status：状态,server_name:123,gameurl},{区：区，状态：状态,}...  ]}
	// 			, {几到几区：[ {区：区，状态：状态},{区：区，状态：状态}...  ]}
	// 			...
	// 		]
	//  }
	
		
	
		//www.xy.com/h5/game/play?gameid=7&sid=server_num
	
	
			// $.getJSON("http://127.0.0.1:3000/jsonp?callback=?",  #跨域调用  
		 //              function(data) {  
		 //                  $('#rjsonp').val('Jsonp info : ' + data.status);  
		 //              });  
		 //              
		 
	// app.get('/jsonp',function(req,res,next){  #返回jsonp  
	//    res.jsonp({status:'jsonp'});  
	// });  
	
	
		res.writeHead(200, { "Content-Type": "text/plain" });
	
		res.end(JSON.stringify( 
			{
				status:1
				,msg:''
				,name:''
				,attr:{
	
					gameid:9
					//1白名单|0老用户
					,isWhite:1
					,play:{ sid:2333, server_name:'小宝当官x',status:'维护'}
					,newServer:{server_number: "9000xxx", server_name: "测试服xxxx"}
					,notice:{
						text:`
							<p>textextext</p><p>textextes</p>
							<p><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1518084484957&di=1f971bcd20fd9f94467a8896826199bf&imgtype=0&src=http%3A%2F%2Fpic1.5442.com%2F2015%2F0312%2F06%2F010.jpg&t=${Math.random()}" alt=""/></p>
							<p><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1518085524935&di=e01c84e07251335206a6f0161c0115fb&imgtype=0&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F902397dda144ad3442fcf937d7a20cf431ad853a.jpg&t=${Math.random()}" alt=""/></p>
							<p><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1518085565495&di=6eed597cd9e0b3664820609c0ba84e24&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F9825bc315c6034a82b56af66ce134954082376a4.jpg&t=${Math.random()}" alt=""/></p>
							<h3>h3h3h3h3h3h3hh3</h3>
							<h4>h43h434343h43h4h34h3h43h43h4h34h3</h4>
							`
						// text:`
						// 	<p>textextext</p><p>textextes</p>
						// 	<h3>h3h3h3h3h3h3hh3</h3>
						// 	<h4>h43h434343h43h4h34h3h43h43h4h34h3</h4>
						// 	`
						,title:'title'
					}
					,gameServer:[
						{
							0:{server_name: "159服", server_number: "1", is_open: "1", status: "推荐", gameurl: "http://www.baidu.com"  }
						,1:{server_name: "2", server_number: "111", is_open: "1", status: "推荐", gameurl: "http://www.baidu.com"  },range:'1-50区'
						}
						
						,{
	
							0:{server_name: "166服", server_number: "2", is_open: "1", status: "火爆", gameurl: "http://www.baidu.com"  }
							,1:{server_name: "159服", server_number: "3", is_open: "1", status: "关闭", gameurl: "http://www.baidu.com"  }
							,2:{server_name: "159服", server_number: "4", is_open: "1", status: "维护", gameurl: "http://www.baidu.com"  }
	
							,3:{server_name: "159服", server_number: "5", is_open: "1", status: "推荐", gameurl: "http://www.baidu.com"  }
							,4:{server_name: "159服", server_number: "6", is_open: "1", status: "推荐", gameurl: "http://www.baidu.com"  }
							,5:{server_name: "159服", server_number: "7", is_open: "1", status: "推荐", gameurl: "http://www.baidu.com"  }
							,6:{server_name: "159服", server_number: "8", is_open: "1", status: "推荐", gameurl: "http://www.baidu.com"  }
							,7:{server_name: "159服", server_number: "9", is_open: "1", status: "推荐", gameurl: "http://www.baidu.com"  }
							,8:{server_name: "159服", server_number: "10", is_open: "1", status: "推荐", gameurl: "http://www.baidu.com"  }
							,9:{server_name: "159服", server_number: "11", is_open: "1", status: "推荐", gameurl: "http://www.baidu.com"  }
							,10:{server_name: "159服", server_number: "12", is_open: "1", status: "推荐", gameurl: "http://www.baidu.com"  }
							,11:{server_name: "159服", server_number: "13", is_open: "1", status: "推荐", gameurl: "http://www.baidu.com"  }
							,range:'50-60区'
						}
						,{0:{server_name: "177服", server_number: "14", is_open: "1", status: "维护", gameurl: "http://www.baidu.com"  },1:{server_name: "159服", server_number: "159", is_open: "1", status: "推荐", gameurl: "http://www.baidu.com"  },range:'60-70区'}
						,	{0:{server_name: "177服", server_number: "14", is_open: "1", status: "维护", gameurl: "http://www.baidu.com"  },1:{server_name: "159服", server_number: "159", is_open: "1", status: "推荐", gameurl: "http://www.baidu.com"  },range:'60-70区'}
						,{0:{server_name: "177服", server_number: "14", is_open: "1", status: "维护", gameurl: "http://www.baidu.com"  },1:{server_name: "159服", server_number: "159", is_open: "1", status: "推荐", gameurl: "http://www.baidu.com"  },range:'60-70区'}
							,{0:{server_name: "177服", server_number: "14", is_open: "1", status: "维护", gameurl: "http://www.baidu.com"  },1:{server_name: "159服", server_number: "159", is_open: "1", status: "推荐", gameurl: "http://www.baidu.com"  },range:'60-70区'}
						,	{0:{server_name: "177服", server_number: "14", is_open: "1", status: "维护", gameurl: "http://www.baidu.com"  },1:{server_name: "159服", server_number: "159", is_open: "1", status: "推荐", gameurl: "http://www.baidu.com"  },range:'60-70区'}
						,{0:{server_name: "177服", server_number: "14", is_open: "1", status: "维护", gameurl: "http://www.baidu.com"  },1:{server_name: "159服", server_number: "159", is_open: "1", status: "推荐", gameurl: "http://www.baidu.com"  },range:'60-70区'}
	
							,{0:{server_name: "177服", server_number: "14", is_open: "1", status: "维护", gameurl: "http://www.baidu.com"  },1:{server_name: "159服", server_number: "159", is_open: "1", status: "推荐", gameurl: "http://www.baidu.com"  },range:'60-70区'}
						,	{0:{server_name: "177服", server_number: "14", is_open: "1", status: "维护", gameurl: "http://www.baidu.com"  },1:{server_name: "159服", server_number: "159", is_open: "1", status: "推荐", gameurl: "http://www.baidu.com"  },range:'60-70区'}
						,{0:{server_name: "177服", server_number: "14", is_open: "1", status: "维护", gameurl: "http://www.baidu.com"  },1:{server_name: "159服", server_number: "159", is_open: "1", status: "推荐", gameurl: "http://www.baidu.com"  },range:'60-70区'}
	
	
					]
	
				}
			}
		) );

	
	})


	//////////////
app.get('/h5/pay',(req,res)=>{

	setTimeout(()=>{
		res.end(
			JSON.stringify({
				"order_id":5279662,
				"code":"https:\/\/ginger.xy.com\/api\/qrcode?uuid=https:\/\/qr.alipay.com\/bax09964zqp8byeujqla00b1"
			})
		)
	},2333)

})

{
	let count = 0

	app.get('/h5/pay/getpaystatus',(req,res)=>{
		// res.end(
		// 	JSON.stringify({
		// 		status: ++ count>5?1:0
		// 	})
		// )
		res.end(
			JSON.stringify({
				status: 0
			})
		)
	})
}

///////////////

var server = app.listen(7878, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:', host, port);
});