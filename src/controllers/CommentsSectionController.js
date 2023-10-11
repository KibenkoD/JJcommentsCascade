main.controller('commentsSection', ['$scope', '$stateParams','$q','userService', function($scope, $stateParams, $q, userService) {

    $q.all([userService.fakePromise(1000), userService.fakePromise(2000)]).then(function (response){

    })

    $scope.$on('$destroy', function() {

    });

}]);
