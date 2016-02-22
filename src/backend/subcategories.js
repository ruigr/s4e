app.post('/api/subCategories', 
	function(req,res){
		console.log('@post/api/subCategories');

		var callback = {
			ok:function(id){
				console.log('post/api/subCategories ok: ' + id);

				res.status(200).send({'result': id});
				res.end();
			},
			nok: function(err){
				console.error(err);	
				res.status(400);
				res.end();
			}
		};

		model.post2Collection('subCategories', req.body, callback);
		
	}
);


app.get('/api/subCategories', 
	function(req,res){
		
		console.log('@get/api/subCategories');
		var callback = {
			ok:function(o){
				console.log('ok - got ' + o.length + ' subCategories');
				res.status(200).send(o);
				res.end();
			},
			nok: function(o){
				console.error(err);
				res.status(400);
				res.end();
			}
		};
		model.getCollection('subCategories', callback);
		console.log('get/api/subCategories@');
	}
);