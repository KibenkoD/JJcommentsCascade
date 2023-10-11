var UserCommentsLengthR = function ( name ) {
    const root = ReactDOM.createRoot(
        document.getElementById('reactEnter')
    );
    const  element = React.createElement(
        'div',
        { className: 'react-count' },
        name
    );
    root.render(element);
}

main.directive('commentsCount', ["$rootScope", function ($rootScope) {
    return {
        restrict: 'AE',
        link: function(scope) {
            scope.$watch('userCommentsLength', function (){
                UserCommentsLengthR($rootScope.userCommentsLength)
            })
        }
    }
}]);