const TEMPLATES_DIR = '/templates';

const main = angular.module('main', ['ui.router', 'userService']);

const userService = angular.module('userService', ['main']);

main.directive('ngLoading', ['$rootScope', function ($rootScope) { // Индикатор загрузки
    return {
        restrict: 'A',
        templateUrl: (TEMPLATES_DIR || '/templates') + "/loading.html",
        link: function (scope, element, attrs) {
            var loadingText = element[0]
            var loadingElement = document.getElementById(attrs.ngLoading);

            var init = $rootScope.$watch('elementPageLoaded', function () {
                if ($rootScope.elementPageLoaded === true) {
                    loadingText.style.display = 'none';
                    loadingElement.style.display = 'block';
                } else {
                    loadingText.style.display = 'block';
                    loadingElement.style.display = 'none';
                }
            });

            scope.$on('$destroy', function () {
                init();
            });
        }
    };
}]);

main.run(['$rootScope','$transitions', function ($rootScope, $transitions) {

    console.log('%c%s', 'background: #6dbbc5; padding: 2px 5px; border-radius:0.5rem; color:#fff;' , 'ЖЖ', 'v.1.0.0');
    $transitions.onStart({}, async function(transition) {           // лучше вынести в отдельный модуль transition
        if (transition.options().location === 'replace'){
            return true;
        }
        $rootScope.currentUser = {
            userId: 999999,
            userNickName:'myNick',
            avatarImage: 'https://l-userpic.livejournal.com/129157889/77488374',
        }

        return true;
    }, {priority: 9});
}]);

main.factory('broadcastService',['$rootScope', function($rootScope) { // Create event
    return {
        send: function(msg, data, lang) {
            $rootScope.$broadcast(msg, data, lang);
        }
    }
}]);

main.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true); // Если production, включаем html5mode, убираем #
    $stateProvider
        .state('comments_section', {
            url: '/liveJournal',
            templateUrl: (TEMPLATES_DIR || '/templates') + '/commentsSection.html',
            controller: 'commentsSection',
            controllerAs: 'commentsSectionVm',
        })
        .state('comments_section.user', {                               // можно дописать переход на ветку сообщений
            url: '/comments_section?{thread}',
            params: {
                thread: { dynamic: true, squash: true, value: null}
            }
        })
        .state('main', {
            url: '/main',
            templateUrl: (TEMPLATES_DIR || '/templates') + '/mainPage.html',
            controller: 'mainPage',
            controllerAs: 'mainPageVm',
            onEnter: ['$rootScope', function($rootScope){

            }],
        })

    $urlRouterProvider.otherwise('main');

}]);
