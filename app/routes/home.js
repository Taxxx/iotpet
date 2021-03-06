var Pet = require('../models/pet');

function getPets(res){
	Pet.find(function(err, pets) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(pets); // return all todos in JSON format
		});
};

module.exports = function(app) {

	/*arduino_server.on("message", function(msg, rinfo) { //every time new data arrives do this:)
		console.log('esta vivo'+msg);
	    

		});

	
	    //Actualiza Datos
	    app.io.broadcast('data_arduino', {
			//val: req.body.val
			temperatura: arduinoArray[0],
			foco: arduinoArray[1],
			ventilador: arduinoArray[2]
		});
	});*/
	/*arduino_server.on("message", function (msg, rinfo) {

		debugger;
		 // console.log(getDateTime() + msg + " from " +
		 // rinfo.address + ":" + rinfo.port);
		 // fs.appendFile("mydata.txt",getDateTime() + msg + crlf, encoding='utf8',function(err){});//write the value to file and add CRLF for line break
		 console.log(msg + " from " +
		 rinfo.address + ":" + rinfo.port);
		 fs.appendFile("mydata.txt",getDateTime() + msg + crlf, encoding='utf8',function(err){});//write the value to file and add CRLF for line break
	});*/






	// api ---------------------------------------------------------------------
	// get all pets
	app.get('/api/pets', function(req, res) {

		// use mongoose to get all pets in the database
		getPets(res);
	});


	// create todo and send back all todos after creation
	app.post('/api/pets', function(req, res) {

		// create a pet, information comes from AJAX request from Angular
		Pet.create({
			//debugger;
			name : req.body.name,
			specie : req.body.specie,
			weight : req.body.weight,
			breed : req.body.breed,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the pets after you create another
			getPets(res);
		});

	});

	// delete a todo
	app.delete('/api/pets/:pet_id', function(req, res) {
		Pet.remove({
			_id : req.params.pet_id
		}, function(err, pet) {
			if (err)
				res.send(err);

			getPets(res);
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});


};