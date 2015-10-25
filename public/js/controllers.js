angular.module("FinalApp")
.controller("MainController", function($scope,LxDialogService,LxNotificationService){
	//$scope.title = "Login";
	$scope.user = {};
	$scope.Login = function(){
		//debugger;
		//alert($scope.user.username);
		/*PostResource.save({data: $scope.post},function(data){
			console.log(data);
			$location.path("/");
		});*/
	}

	$scope.opendDialog = function(dialogId)
	{
	    LxDialogService.open(dialogId);
	};

	$scope.closingDialog = function()
	{
	    LxNotificationService.info('Login closed!');
	};


	

})
.controller("BodyController", function($scope,$resource,PostResource){
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
.controller("PetController", function($scope,PostResource,$routeParams,$location){
	$scope.title = "Edit Pet Data";
	$scope.pet = PostResource.get({id: $routeParams.id});
	$scope.savePost = function(){
		PostResource.update({id: $scope.pet.id},{data: $scope.pet},function(data){
			console.log(data);
			//$location.path("/");
			$location.path("/pet/"+$scope.pet.id);
		});
	}
})
.controller("NewPetController", function($scope,PostResource,$location){
	$scope.pet = {};
	$scope.title = "Add a New Pet";
	$scope.savePost = function(){
		PostResource.save({data: $scope.pet},function(data){
			console.log(data);
			$location.path("/");
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
	.controller("ChartsController", function($scope,PostResource,$location){
		//$(document).on('ready',init);
		$scope.data = null;
		$scope.chart = null;
		$scope.init = function(){
			$scope.configHchart();
			$scope.controlContainer(data());
			//startSocket();
		};

		$scope.configHchart= function(){
			Highcharts.setOptions({
				global: {
					useUTC: false
				}
			});
		}

		$scope.startSocket =function(series){
			//io.on('data_arduino', function(data){
			//	//debugger;
			//	console.log(data.temperatura);
			//	//$('#list_socket').append('<li>'+data.val+'</li>');
            //
			//	tiempo = (new Date()).getTime(), // current time
            //
			//		//temperatura = Math.random();
            //
			//		temperatura = parseInt(data.temperatura);
            //
			//	console.log('foco: '+data.foco+' - ventilador: '+data.ventilador);
            //
			//	series.addPoint([tiempo, temperatura], true, true);
            //
			//	if(temperatura<25)
			//	{
			//		//alert("temperatura baja");
			//		//$('#alertas').prepend("<br><font color='blue'>Temperatura Baja: "+Highcharts.numberFormat(temperatura, 5)+" Hrs: "+Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',tiempo) +" </font>");
			//		$('#mensaje').prepend($('<li>').text("Temperatura Baja: "+Highcharts.numberFormat(temperatura, 5)+" Hrs: "+Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',tiempo) +"\n").attr('style','background:#B2B2B2;border-style: groove; font-family: "Montserrat";border-radius: 15px;'));
			//	}
			//	if(temperatura>33)
			//	{
			//		//alert("temperatura baja");
			//		//$('#alertas').prepend("<br><font color='red'>Temperatura Alta: "+Highcharts.numberFormat(temperatura, 5)+" Hrs: "+Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',tiempo) +" </font>");
			//		$('#mensaje').prepend($('<li>').text("Temperatura Alta: "+Highcharts.numberFormat(temperatura, 5)+" Hrs: "+Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',tiempo) +"\n").attr('style','background:#FF8040;border-style: groove; font-family: "Montserrat";border-radius: 15px;'));
			//	}
			//	if(temperatura >= 25 && temperatura <= 33)
			//	{
			//		//alert("temperatura baja");
			//		//$('#alertas').prepend("<br><font color='green'>Temperatura Normal: "+Highcharts.numberFormat(temperatura, 5)+" Hrs: "+Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',tiempo) +" </font>");
			//		$('#mensaje').prepend($('<li>').text("Temperatura Normal: "+Highcharts.numberFormat(temperatura, 5)+" Hrs: "+Highcharts.dateFormat('%Y-%m-%d %H:%M:%S',tiempo) +"\n").attr('style','background:#00FF3B; border-style: groove;font-family: "Montserrat";border-radius: 15px;'));
			//	}
            //
			//	$scope.movimiento(data.foco,data.ventilador);
            //
			//});
		}

		 function printTemperatura(){
			var tiempo, temperatura;
			// set up the updating of the chart each second

			var series = this.series[0];
			 console.log(series)
			 $scope.series = series;
				 //setInterval(function () {}, 1000);
			$scope.startSocket(series);
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

		$scope.controlContainer = function(data){
			$('#container').highcharts($scope.chart={
				chart: {
					type: 'spline',
					animation: Highcharts.svg, // don't animate in old IE
					marginRight: 10,
					events: {
						//Imprime Temperatura
						load: printTemperatura
					}
				},
				title: {
					text: 'titulo'
				},
				subtitle:{
					align:'center',text:'#################################################'
				},
				xAxis: {
					title:{
						text:'Tiempo actual'
					},
					type: 'datetime',
					tickPixelInterval: 100
				},
				yAxis: {
					title: {
						text: 'label X'
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
					enabled: true
				},
				series: [{
					name: 'Data received',
					data: (data)
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

		$scope.changeMap = function (){
			console.log('asdasd');
			$scope.data = data();
			$scope.controlContainer($scope.data );
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
		}

	});