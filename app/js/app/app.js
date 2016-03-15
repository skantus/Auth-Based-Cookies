'use strict';

// App - dependecias necesarias.
angular.module('app', [
  'ngRoute',
  'ngCookies',
  'firebase'
  ])

// Configuración $routeProvider.
.config(['$routeProvider', 
	function($routeProvider) {

	$routeProvider
		.when('/login', {            
            templateUrl: 'views/login/auth/login.html',
            controller: 'LoginController',
        })
  		.when('/home', {
    		templateUrl: 'views/home/home.html',
    		controller: 'HomeController'
  		})

  	// Inicia por defecto en la vista login.
  	.otherwise({ redirectTo: '/login' });

}])

// Arranque de la app.
.run(['$rootScope', '$location', '$cookieStore', '$http',
    function ($rootScope, $location, $cookieStore, $http) {

        // Mantiene el usuario conectado después de actualización de la página.
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; 
        }
 
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // Redirigire al login si el usuario no está logueado.
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);