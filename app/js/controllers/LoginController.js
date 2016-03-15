'use strict';

angular.module('app')
  .controller('LoginController', loginController);

  loginController.$inject = ['$rootScope', '$location', '$scope', 'AuthenticationService'];

  	function loginController ($rootScope, $location, $scope, AuthenticationService) {
 	
 	$scope.stateMessage = '';
    // Resetea el estado del login.
    AuthenticationService.ClearCredentials();

    $scope.login = function () {
        AuthenticationService.Login($scope.username, $scope.password, function(response) {
        	console.log('response: ', response);

            if(response.success) {
                AuthenticationService.SetCredentials($scope.username, $scope.password);
                $location.path('/home');
            } else {
                $scope.error = response.message;
                $scope.stateMessage = response.message;
            }

        });
    };
};