const express=require('express');
//创建路由器对象
var router=express.Router();
const pool=require('../pool.js');
//添加路由
//1.分页查询商品列表
router.get('/list',function(req,res){
	var obj=req.query;
	if(!obj.pno)
	{
		obj.pno=1;
	}
	if(!obj.size)
	{
		obj.size=9;
	}
	var pno=parseInt(obj.pno);
	var size=parseInt(obj.size);
    var start=(pno-1)*size;
	pool.query('SELECT lid,price,title FROM xz_laptop LIMIT ?,?',[start,size],function(err,result){
		if(err) throw err;
		res.send(result); 

	});
});
//2.商品详情
router.get('/detail',function(req,res){
	var obj = req.query;
	//console.log(obj);
	if(!obj.lid)
	{
		res.send({code:401,msg:'lid required'});
		return;//阻止往后执行，因后面还有send
	}
	pool.query('SELECT * FROM xz_laptop WHERE lid=?',[obj.lid],function(err,result)
	{
		if(err) throw err;
		console.log(result);
		//判断是否检索到商品，如果检索到，把该商品的对象响应到浏览器，否则响应检索不到
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
//3.添加商品
router.post('/add',function(req,res){
	var obj=req.body;
	for (var key in obj)
	{
		if (!obj[key])
		{
			res.send({code:401,msg:key+'required'});
		}
	}
	pool.query('INSERT INTO xz_laptop SET ?',[obj],function(err,result){
		if (err) throw err;
		if(result.affectedRows>0)
		{
			res.send({code:200,msg:'add suc'});
		}
		else
		{
			res.send({code:301,msg:'add err'});
		}
	})
})
//4.删除商品
router.get('/delete',function(req,res){
	var obj=req.query;
	if(!obj.lid)
	{
		res.send({code:401,msg:'lid required'});
	}
	pool.query('DELETE FROM xz_laptop WHERE lid=?',[obj.lid],function(err,result){
		if(err) throw err;
		console.log(result);
		if(result.affectedRows>0)
		{
			res.send({code:200,msg:'delete suc'});
		}
		else
		{
			res.send({code:301,msg:'delete err'});
		}
	});
});
//5.修改商品
router.get('/update',function(req,res){
	var obj=req.query;
	var i=400;
	for (var key in obj)
	{
		if(!obj[key])
		{
			i++;
			res.send({code:i,msg:key+'required'});
		}
	}
	pool.query('UPDATE xz_laptop SET ? WHERE lid=?',[obj,obj.lid],function(err,result){
		if(err) throw err;
		if(result.affectedRows>0)
		{
			res.send({code:200,msg:'update suc'});
		}
		else
		{
			res.send({code:301,msg:'update err'});
		}
	});
});

module.exports=router;
