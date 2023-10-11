main.directive('commentsLiveJ', ["$q","$rootScope","userService", function ($q, $rootScope, userService) {
    return {
        link: function (scope, element, attr) {
            scope.shownModal = {};
            scope.editCommentModel = {}
            const liveJUsersWatch = $rootScope.$on('liveJUsers:mainGet', function (event, args){
                scope.liveJUsers = args.users;
                userService.initCurrentUser($rootScope.currentUser)
            });

            const commentsLengthWatch = scope.$watchCollection('liveJUsers', function (){
                if(scope.liveJUsers && scope.liveJUsers.length){
                    $rootScope.userCommentsLength = scope.liveJUsers.length;
                }
            });

            scope.showForm = function (form, commentId){
                scope.shownModal = {};
                scope.shownModal[form] = form;
                scope.shownModal.commentId = commentId;
            }

            scope.addComment = function (user, text){

                let lastItemIndex = 0;
                let currentComment = {};
                scope.liveJUsers.forEach(function(item, index){
                    if(item.threadId == user.threadId){
                        lastItemIndex = index;
                    }
                });

                userService.userCommentsData.text = text;
                userService.userCommentsData.threadId = user.threadId;
                userService.userCommentsData.commentId = user.commentId + 1;
                Object.assign(currentComment, userService.userCommentsData);

                scope.liveJUsers.splice(lastItemIndex +1, 0, currentComment);
                scope.shownModal = {};
            }

            scope.editComment = function (form, data){
                scope.editCommentModel.text = data.text;
                scope.showForm(form, data.commentId);
            }

            scope.saveComment = function (user, text){
                scope.liveJUsers.forEach(function(item){
                    if(item.userId == userService.userCommentsData.userId){
                        if(item.commentId == user.commentId){
                            item.text = text;
                        }
                    }
                });
                scope.shownModal = {};
            }

            scope.deleteComment = function (user){
                let lastItemIndex = 0;
                scope.liveJUsers.forEach(function(item, index){
                    if(item.threadId == user.threadId){
                        if(user.commentId == item.commentId){
                            lastItemIndex = index
                        }
                    }
                })
                scope.liveJUsers.splice(lastItemIndex, 1);
            }

            scope.goToTheCommentBranch = function (){

            }

            scope.leaveFeedBack = function () {

            }

            scope.$on('$destroy', function () {
                liveJUsersWatch();
                commentsLengthWatch();
            });
        }
    }
}]);
