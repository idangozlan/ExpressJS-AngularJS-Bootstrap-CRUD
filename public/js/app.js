var myCrud = angular.module('myCrud', ['ngRoute', 'ngResource', 'ui.bootstrap']);
myCrud.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/pages/home.html',
                controller: 'HomeController'
            })
            .when('/users', {
                templateUrl: '/pages/users.html',
                controller: 'UsersController'
            }).otherwise({
                templateUrl: '/pages/404.html',
                controller: 'NotFoundController'
            });

        $locationProvider.hashPrefix('!');
    })
    .controller('MainController', ['$scope', function($scope) {

    }])
    .controller('HomeController', ['$scope', function($scope) {

    }])
    .controller('UsersController', ['$scope', '$uibModal', '$resource', 'User', '$timeout', function($scope, $uibModal, $resource, User, $timeout) {
        $scope.loadUsers = function() {
            User.query(function(users) {
                $scope.users = users;
            });
        };

        $scope.deleteUser = function(user) {
            $uibModal.open({
                animation: true,
                templateUrl: 'deleteUserModal.html',
                //Inline controller, can be replaced with controller name
                controller: function($scope, $uibModalInstance) {
                    $scope.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    };
                    $scope.doDeleteUser = function() {
                        $scope.deletingUser = true;
                        user.$delete(function(response) {
                            $scope.deletingUser = false;
                            $scope.loadUsers();
                            $uibModalInstance.close();
                        });
                    };

                },
                size: 'sm'
            });
        };

        $scope.addUser = function() {
            $uibModal.open({
                animation: true,
                templateUrl: 'addUserModal.html',
                //Inline controller, can be replaced with controller name
                controller: function($scope, $uibModalInstance) {
                    $scope.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    };
                    $scope.doAddUser = function() {
                        $scope.addingUser = true;
                        var user = new User(this.user);
                        user.$save(function() {
                            $scope.loadUsers();
                            $uibModalInstance.close();
                        }).finally(function() {
                            $scope.addingUser = false;
                        });

                    };

                },
                size: 'md'
            });
        };

        $scope.updateUser = function(user) {
            $uibModal.open({
                animation: true,
                templateUrl: 'updateUserModal.html',
                //Inline controller, can be replaced with controller name
                controller: function($scope, $uibModalInstance) {
                    $scope.user = angular.copy(user);
                    delete $scope.user.created_at;

                    $scope.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    };
                    $scope.doUpdateUser = function() {
                        $scope.updatingUser = true;
                        $scope.user.$save(function() {
                            $scope.loadUsers();
                            $uibModalInstance.close();
                        }).finally(function() {
                            $scope.updatingUser = false;
                        });

                    };

                },
                size: 'md'
            });
        };

        $scope.pollUsers = function() {
            // Can be replace with Socket.io to prevent server polling calls and get real-time data
            $scope.loadUsers();
            $timeout($scope.pollUsers, 3000);
        };

        $scope.pollUsers();
    }])
    .controller('NotFoundController', ['$scope', function($scope) {

    }]).factory('User', function($resource) {
        return $resource('/users/:id', {
            id: '@id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    });
