angular.module("FinalApp")
.controller("MainController", function($scope,LxDialogService,LxNotificationService,Riot,$location){
	//$scope.title = "Login";
	$scope.user = {};
	$scope.islogged = false;

	/*Riot.login()
		.success(function(data) {
			$scope.apiKey = data.apiKey;
			debugger;
			//debugger;
			//$scope.pets = data;
			//$scope.loading = false;
		});*/


	/*Riot.addData($scope.apiKey,'-68.088135;-16.541182;0.0',null,null,'1')
		.success(function(data) {
			//$scope.apiKey = data.apiKey;
			//debugger;
			//$scope.pets = data;
			//$scope.loading = false;
		});*/

	$scope.Logout = function(){
		$location.path("/");
	}

	$scope.Login = function(user){
		//debugger;
		//alert($scope.user.username);
		/*PostResource.save({data: $scope.post},function(data){
			console.log(data);
			$location.path("/");
		});*/
	
		Riot.login($scope.user)
		.success(function(data) {
			//$scope.apiKey = data.apiKey;
			//debugger;
			//debugger;
			//$scope.pets = data;
			//$scope.loading = false;
			$scope.loginSuccess();
			$scope.closeDialog('test');
			//closingDialog()
			$location.path("/principal"); 
		})
		.error(function(data){
			$scope.loginFail();
		});

	}

	$scope.opendDialog = function(dialogId)
	{
	    LxDialogService.open(dialogId);
	};

	$scope.closeDialog = function(dialogId)
	{
	    LxDialogService.close(dialogId);
	};

	$scope.closingDialog = function()
	{
	    LxNotificationService.info('Login closed!');
	};

	$scope.loginSuccess = function()
	{
	    LxNotificationService.info('Login Success :D');
	};

	$scope.loginFail = function()
	{
	    LxNotificationService.info('Login Fail :(!');
	};


	

})
.controller("BodyController", function($scope,$resource,Pets){
	User = $resource("http://jsonplaceholder.typicode.com/users/:id",{id:"@id"});

	$scope.pets = {};
	$scope.users = User.query();
	// query() -> GET/posts -> Un arreglo de posts -> isArray: true 
	Pets.get()
		.success(function(data) {
			$scope.pets = data;
			$scope.loading = false;
		});

	$scope.removePet = function(id){
		Pets.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});

		$scope.pets = $scope.pets.filter(function(element){
			return element.id !== id;
		});

	}

})
.controller("UsersController", function($scope,$resource,PostResource){
	User = $resource("http://jsonplaceholder.typicode.com/users/:id",{id:"@id"});

	$scope.pets = PostResource.query();
	$scope.users = User.query();
	// query() -> GET/posts -> Un arreglo de posts -> isArray: true 
	$scope.removePost = function(pet){
		PostResource.delete({id: pet.id},function(data){
			//console.log(data);
			//$scope.posts = Post.query(); // :D
		});

		$scope.pets = $scope.pets.filter(function(element){
			return element.id !== pet.id;
		});

	}

})
.controller("PetController", function($scope,Pets,$routeParams,$location){
	$scope.title = "Edit Pet Data";

	$scope.editPet = function(id){
		Pets.getId(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.pets = data; // assign our new list of todos
				});

		/*$scope.pets = $scope.pets.filter(function(element){
			return element.id !== id;
		});*/

	}


	/*$scope.pet = PostResource.get({id: $routeParams.id});
	$scope.savePet = function(){
		
	}*/
})
.controller("NewPetController", function($scope,PostResource,$location,Pets){
	$scope.pet = {};
	$scope.title = "Add a New Pet";
	$scope.savePet = function(){
		/*PostResource.save({data: $scope.pet},function(data){
			console.log(data);
			$location.path("/");
		});*/
		console.log($scope.pet);

		// call the create function from our service (returns a promise object)
		Pets.create($scope.pet)

			// if successful creation, call our get function to get all the new todos
			.success(function(data) {
				//$scope.loading = false;
				//$scope.formData = {}; // clear the form so our user is ready to enter another
				//$scope.todos = data; // assign our new list of todos
				$location.path("/");
				console.log("data: "+data);
			});

	}
})
.controller("MapsController", function($scope,PostResource,$location){
		$scope.maps = {};
		$scope.title = "Real Time Maps";
		$scope.savePost = function(){
			PostResource.save({data: $scope.post},function(data){
				console.log(data);
				$location.path("/");
			});
		}
	})
	.controller("ChartsController", function($scope,PostResource,$location,Riot) {
		//$(document).on('ready',init);
		$scope.data = {};
		$scope.chart = {};
		$scope.type = 1;
		$scope.init = function () {
			$scope.configHchart();
			$scope.controlContainer(data());

			//startSocket();
		};

		$scope.configHchart = function () {
			
			Highcharts.setOptions({
				global: {
					useUTC: false
				}
			});
		}

		$scope.startSocket = function (series) {

			var location = "";
			setInterval(function () {
		        navigator.geolocation.getCurrentPosition(coords);

		    }, 3000);
		    function coords(position){
		//        alert(position.coords.latitude);
		//        alert(position.coords.longitude);
				location = position.coords.latitude+";"+position.coords.longitude+";0.0"
		    }



			window.io = io.connect();
			io.on('data_arduino', function (data) {
				//debugger;
				Riot.addData($scope.apiKey, /*'-68.088166;-16.541178;0.0'*/location, null, null, data.temperatura, data.steps, data.heart, data.food)
					.success(function (data) {
						//debugger;
						//$scope.apiKey = data.apiKey;
						//debugger;
						//$scope.pets = data;
						//$scope.loading = false;
					});


				//debugger;
				//console.log(data.temperatura);
				//$('#list_socket').append('<li>'+data.val+'</li>');

				tiempo = (new Date()).getTime(); // current time

					//temperatura = Math.random();

				temperatura = parseInt(data.temperatura);
				//
				//console.log('foco: ' + data.foco + ' - ventilador: ' + data.ventilador);

				series.addPoint([tiempo, temperatura], true, true);

				/*if (temperatura < 25) {
					//alert("temperatura baja");
					//$('#alertas').prepend("<br><font color='blue'>Temperatura Baja: "+Highcharts.numberFormat(temperatura, 5)+" Hrs: "+Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',tiempo) +" </font>");
					$('#mensaje').prepend($('<li>').text("Temperatura Baja: " + Highcharts.numberFormat(temperatura, 5) + " Hrs: " + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', tiempo) + "\n").attr('style', 'background:#B2B2B2;border-style: groove; font-family: "Montserrat";border-radius: 15px;'));
				}
				if (temperatura > 33) {
					//alert("temperatura baja");
					//$('#alertas').prepend("<br><font color='red'>Temperatura Alta: "+Highcharts.numberFormat(temperatura, 5)+" Hrs: "+Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',tiempo) +" </font>");
					$('#mensaje').prepend($('<li>').text("Temperatura Alta: " + Highcharts.numberFormat(temperatura, 5) + " Hrs: " + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', tiempo) + "\n").attr('style', 'background:#FF8040;border-style: groove; font-family: "Montserrat";border-radius: 15px;'));
				}
				if (temperatura >= 25 && temperatura <= 33) {
					//alert("temperatura baja");
					//$('#alertas').prepend("<br><font color='green'>Temperatura Normal: "+Highcharts.numberFormat(temperatura, 5)+" Hrs: "+Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',tiempo) +" </font>");
					$('#mensaje').prepend($('<li>').text("Temperatura Normal: " + Highcharts.numberFormat(temperatura, 5) + " Hrs: " + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', tiempo) + "\n").attr('style', 'background:#00FF3B; border-style: groove;font-family: "Montserrat";border-radius: 15px;'));
				}*/

				//$scope.movimiento(data.foco,data.ventilador);

			});
		}

		 function printTemperatura(){
			var tiempo, temperatura;
			// set up the updating of the chart each second

			var series = this.series[0];
			 console.log(series)
			 $scope.series = series;
				 //setInterval(function () {}, 1000);
			$scope.startSocket(series);
			 //$scope.$emit('data_arduino', {
			 //	//val: req.body.val
			 //	temperatura: Math.random()*50,
			 //	//foco: arduinoArray[1],
			 //	//ventilador: arduinoArray[2]
			 //});
		}

		function formato(){
			/*
			 if(Highcharts.numberFormat(this.y, 2)<0.5)
			 {
			 $('#alertas').append("<br>temperatura : "+Highcharts.numberFormat(this.y, 2)+" Alerta<br>");
			 }
			 */
			return '<b>' + this.series.name + '</b><br/>' +
				Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +'Temperatura: '+
				Highcharts.numberFormat(this.y, 2);
		}

		function data(){
			// generate an array of random data
			var data = [],
				time = (new Date()).getTime(),
				i;

			var yr;

			for (i = -19; i <= 0; i += 1) {
				yr=Math.random();
				data.push({
					x: time + i * 1000,
					y: yr
				});
			}
			$scope.data = data;
			return data;
		}

		$scope.controlContainer = function(data,type,index){
			var chartType = type? type: 'spline';
			//var data = $scope.data? $scope.data : data();
			$scope.type= index ? index : 1;
			var xAxis,yAxis;
			var title = null;
			if($scope.type === 1) {// temperatura
				title = 'Temperature',
				yAxis = 'Celsius Degrees'
				xAxis = 'Date'
			}
			if($scope.type === 2) {// temperatura
				title = 'Steps'
				yAxis = '#Steps'
				xAxis = 'Date'
			}
			if($scope.type === 3) {// temperatura
				title = 'Heart Beats',
				yAxis = 'heart beats'
				xAxis = 'Date'
			}
			Highcharts.setOptions({
				global:{
					useUTC: false
				}
			});
			$('#container').highcharts($scope.chart={
				chart: {
					type: chartType,
					animation: Highcharts.svg, // don't animate in old IE
					marginRight: 10,
					events: {
						//Imprime Temperatura
						load: printTemperatura
					}
				},
				title: {
					text: title
				},
				subtitle:{
					align:'center',text:'Select other'
				},
				xAxis: {
					title:{
						text:xAxis
					},
					type: 'datetime',
					tickPixelInterval: 100
				},

				yAxis: {
					title: {
						text: yAxis
					},
					plotLines: [{
						value: 25,
						width: 2,
						color: 'red'
					},{
						value: 33,
						width: 2,
						color: 'red'
					}]

				},
				tooltip: {
					//Llama a la funcion formato
					formatter: formato
				},
				legend: {
					enabled: false
				},
				exporting: {
					enabled: false
				},
				series: [{
					name: 'Data received',
					data: data
				}]
			});
		},

		$scope.test = function(){
			alert('Wujuuuu');
		},
		$scope.movimiento = function(foco,aspa)
		{
			if(aspa==0)
			{
				$('#aspa').attr('src','/img/ventioff.jpg');
				$('#estadoa').text('Apagado');
			}
			else{
				$('#aspa').attr('src','/img/vention.gif');
				$('#estadoa').text('Encendido');
			}
			if(foco==0)
			{
				$('#focos').attr('src','/img/focooff.jpg');
				$('#estadof').text('Apagado');
			}else{
				$('#focos').attr('src','/img/focoon.jpg');
				$('#estadof').text('Encendido');
			}

		},

		$scope.showAdvancedTemperature	= function () {
			if(1 !== $scope.type){
				$scope.data = data();
				$scope.controlTemperature();
			}else{
				$scope.controlTemperature();
			}
		},

		$scope.changeMap = function (index){
			console.log('asdasd');
			if(index !== $scope.type){
				$scope.data = data();
				$scope.controlContainer($scope.data,null,index );
			}
		},
		$scope.changeType = function (type){
			console.log('asdasd');
			$scope.controlContainer($scope.data, type );
		},
		$scope.SetGraphic = function (xdata){
			//console.log(xdata)
			var series = $scope.chart.series[0];

			var data = [],
				time = (new Date()).getTime(),
				i;
			var obj={
				x: 0.2,
				y:time
				}
			console.log($scope.data);
			//$scope.data.push(obj);
			//$scope.series.removePoint(0);
			$scope.series.addPoint([time,0.2], true,true);
			//$scope.controlContainer($scope.data);
		},

			$scope.controlTemperature = function () {
				$(function () {
					var chart = new Highcharts.Chart({

							chart: {
								renderTo: 'container',
								type: 'gauge',

								plotBackgroundImage: null,
								height: 200
							},

							title: {
								text: '</br></br>Advanced Temperature Graphics'
							},

							pane: [{
								startAngle: -45,
								endAngle: 45,
								background: null,
								center: ['25%', '145%'],
								size: 300
							}, {

								startAngle: -45,
								endAngle: 45,
								background: null,
								center: ['75%', '145%'],
								size: 300
							}],

							yAxis: [{
								min: -20,
								max: 80,
								minorTickPosition: 'outside',
								tickPosition: 'outside',
								labels: {
									rotation: 'auto',
									distance: 20
								},
								plotBands: [{
									from: -20,
									to: 5,
									color: '#aad4e5',
									innerRadius: '100%',
									outerRadius: '105%'
								},{
									from: 40,
									to: 80,
									color: '#C02316',
									innerRadius: '100%',
									outerRadius: '105%'
								}
								],
								pane: 0,
								title: {
									text: 'TERMOMETER<br/><span style="font-size:8px">(°C)</span>',
									y: -40
								}
							}, {
								min: -20,
								max: 60,
								minorTickPosition: 'outside',
								tickPosition: 'outside',
								labels: {
									rotation: 'auto',
									distance: 20
								},
								plotBands: [{
									from: -20,
									to: 5,
									color: '#aad4e5',
									innerRadius: '100%',
									outerRadius: '105%'
								},{
									from: 40,
									to: 60,
									color: '#C02316',
									innerRadius: '100%',
									outerRadius: '105%'
								}
								],
								pane: 1,
								title: {
									text: 'TERMOMETER<br/><span style="font-size:8px">(°F)</span>',
									y: -40
								}
							}],

							plotOptions: {
								gauge: {
									dataLabels: {
										enabled: false
									},
									dial: {
										radius: '100%'
									}
								}
							},


							series: [{
								data: [-20],
								yAxis: 0
							}, {
								data: [-20],
								yAxis: 1
							}]

						},

						// Let the music play
						function(chart) {
							setInterval(function() {
								var left = chart.series[0].points[0],
									right = chart.series[1].points[0],
									leftVal,
									inc = (Math.random() - 0.8) * 50;

								leftVal =  left.y - inc;
								rightVal = leftVal + inc / 3;
								if (leftVal < -20 || leftVal > 60) {
									leftVal = (Math.random() - 0.8) * 20;;
								}
								if (rightVal < -20 || rightVal > 60) {
									rightVal = (Math.random() - 0.8) * 20;
								}

								left.update(leftVal, false);
								right.update(rightVal, false);
								chart.redraw();

							}, 500);

						});
				});
				//$('#container').addClass('fixheight');

			}


	});