const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
var router=express.Router();
//添加路由
//1.用户注册
/*
router.post('/reg',function(req,res)
{
	//1.1获取post请求数据
	var obj=req.body;
	//1.2验证数据是否为空
	if(!obj.uname)
	{
		res.send({code:401,msg:'uname required'});
		return;//阻止往后执行，因后面还有send
	}
	if (!obj.upwd)
	{
		res.send({code:402,msg:'upwd required'});
		return;//阻止往后执行，因后面还有send
	}
	if (!obj.email)
	{
		res.send({code:403,msg:'email required'});
		return;
	}
	if (!obj.phone)
	{
		res.send({code:404,msg:'phone required'});
		return;
	}
	//1.3执行SQL语句
	pool.query('INSERT INTO xz_user SET ?',[obj],function(err,result)
	{
		if(err) throw err;
		//console.log(result);
		if (result.affectedRows>0)
	    {
			res.send({code:200,msg:'register suc'});
	    }
	});
});
//2.用户登录
router.post('/login',function(req,res)
{	
	//2.1获取post请求数据
	var obj=req.body;
	//2.2验证是否为空
	console.log(obj);
	if(!obj.uname)
	{
		res.send({code:401,msg:'uname required'});
		return;//阻止往后执行，因后面还有send
	}
	if(!obj.upwd)
	{
		res.send({code:402,msg:'upwd required'});
		return;//阻止往后执行，因后面还有send
	}
	//2.3执行SQL语句
	//查找用户名和密码同时满足的数据
	pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],function(err,result)
	{
		if(err) throw err;
		//console.log(result);
		//判断是否登录成功
		if(result.length>0)
		{
			res.send({code:200,msg:'login suc'});
		}
		else
		{
			res.send({code:301,msg:'login err'});
		}
	});
});
//3.检索用户
router.get('/detail',function(req,res){
	var obj = req.query;
	//console.log(obj);
	if(!obj.uid)
	{
		res.send({code:401,msg:'uid required'});
		return;//阻止往后执行，因后面还有send
	}
	pool.query('SELECT * FROM xz_user WHERE uid=?',[obj.uid],function(err,result)
	{
		if(err) throw err;
		console.log(result);
		//判断是否检索到用户，如果检索到，把该用户的对象响应到浏览器，否则响应检索不到
		if(result.length>0)//只有检索是数组
		{
			res.send(result[0]);
		}
		else
		{
			res.send({code:301,msg:'can not found'});
		}
	});
});
//4.修改用户
router.get('/update',function(req,res){
	var obj=req.query;
	//console.log(obj);
	//4.1验证是否为空
	var i=400;
	for (var key in obj)
	{
		i++;
		if(!obj[key])
		{
			res.send({code:i,msg:key+' required'});
		    return;//阻止往后执行，因后面还有send
	    }
	}
	pool.query('UPDATE xz_user SET ? WHERE uid=?',[obj,obj.uid],function(err,result){
		if(err) throw err;
		//console.log(result);
		if(result.affectedRows>0)
		{
			res.send({code:200,msg:'update suc'});
		}
		else
		{
			res.send({code:301,msg:'update error'});
		}
	})
});
*/
//5.分页查询
/*
router.get('/list',function(req,res){
	var obj=req.query
	if(obj.pno==='')
	{
		obj.pno=1;
	}
	if(obj.size==='')
	{
		obj.size=3;
	}
	pno=parseInt(obj.pno)
	size=parseInt(obj.size)
	var start=(pno-1)*size;
	pool.query('SELECT * FROM xz_user LIMIT ?,?',[start,size],function(err,result){
		if(err) throw err;
		
			res.send(result);
			console.log(result);
	});
});
*/

//6.删除用户

router.get('/delete',function(req,res){

	var obj=req.query;
	console.log(obj);
	if(!obj.uid)
	{
		res.send({code:401,msg:'required'});
		return;
	}
	pool.query('DELETE FROM xz_user WHERE uid=?',[obj.uid],function(err,result){
		if(err) throw err;
		if(result.affectedRows>0)
		{
			res.send({code:200,msg:'delete suc'});
		}
		else
		{
			res.send({code:301,msg:'delete error'});
		}
	});
});

module.exports=router;

