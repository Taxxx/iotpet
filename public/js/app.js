angular.module("FinalApp",["lumx","ngRoute","ngResource","ngTouch"])
.config(function($routeProvider){
	$routeProvider
		.when("/", {
			controller: "BodyController",
			templateUrl: "templates/home.html"
		})
		.when("/users", {
			controller: "UsersController",
			templateUrl: "templates/users.html"
		})
		.when("/maps/:id", {
			controller: "MapsController",
			templateUrl: "templates/maps.html"
		})
		.when("/pet/:id",{
			controller: "PetController",
			templateUrl: "templates/post.html"
		})
		.when("/pets/new",{
			controller: "NewPetController",
			templateUrl: "templates/pet_form.html"
		})
		.when("/pets/edit/:id",{
			controller: "PetController",
			templateUrl: "templates/pet_form.html"
		})
});