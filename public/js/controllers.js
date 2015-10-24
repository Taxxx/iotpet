angular.module("FinalApp")
.controller("MainController", function($scope,LxDialogService,LxNotificationService){
	//$scope.title = "Login";
	$scope.opendDialog = function(dialogId)
	{
	    LxDialogService.open(dialogId);
	};

	$scope.closingDialog = function()
	{
	    LxNotificationService.info('Login closed!');
	};


	$scope.Login = function(user){
		debugger;
		alert(user);
		/*PostResource.save({data: $scope.post},function(data){
			console.log(data);
			$location.path("/");
		});*/
	}

})
.controller("BodyController", function($scope,$resource,PostResource){
	User = $resource("http://jsonplaceholder.typicode.com/users/:id",{id:"@id"});

	$scope.posts = PostResource.query();
	$scope.users = User.query();
	// query() -> GET/posts -> Un arreglo de posts -> isArray: true 
	$scope.removePost = function(post){
		PostResource.delete({id: post.id},function(data){
			//console.log(data);
			//$scope.posts = Post.query(); // :D
		});

		$scope.posts = $scope.posts.filter(function(element){
			return element.id !== post.id;
		});

	}

})
.controller("PostController", function($scope,PostResource,$routeParams,$location){
	$scope.title = "Editar Post";
	$scope.post = PostResource.get({id: $routeParams.id});
	$scope.savePost = function(){
		PostResource.update({id: $scope.post.id},{data: $scope.post},function(data){
			console.log(data);
			//$location.path("/");
			$location.path("/post/"+$scope.post.id);
		});
	}
})
.controller("NewPostController", function($scope,PostResource,$location){
	$scope.post = {};
	$scope.title = "Crear Post";
	$scope.savePost = function(){
		PostResource.save({data: $scope.post},function(data){
			console.log(data);
			$location.path("/");
		});
	}
});