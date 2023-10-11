main.controller('mainPage', ['$scope', '$stateParams','$q','userService','$rootScope','broadcastService', function($scope, $stateParams, $q, userService, $rootScope, broadcastService) {
    $q.all([userService.fakePromise(1000), userService.fakePromise(2000), userService.liveJUsers]).then(function (response){
        $rootScope.elementPageLoaded = true;

        if(!response[2] || !response[2].length){
          return $scope.noCommentsAtAll = true;
        }
        broadcastService.send('liveJUsers:mainGet', {'users': response[2]});
    })

    $scope.$on('$destroy', function() {

    });
}]);
