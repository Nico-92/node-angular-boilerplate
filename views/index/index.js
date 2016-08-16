var indexController = function($scope){
	$scope.angular = 'Angular';
}

indexController.$inject = ['$scope'];
app.controller('indexController', indexController);