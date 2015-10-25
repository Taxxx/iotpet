angular.module("FinalApp")
.factory("PostResource", function($resource){
	return $resource("http://jsonplaceholder.typicode.com/posts/:id",{id:"@id"},{update: {method: "PUT"}});
})
.factory('Pets', ['$http',function($http) {
	return {
		get : function() {
			return $http.get('/api/pets');
		},
		create : function(petData) {
			return $http.post('/api/pets', petData);
		},
		delete : function(id) {
			//debugger;
			return $http.delete('/api/pets/' + id);
		}
	}
}]);