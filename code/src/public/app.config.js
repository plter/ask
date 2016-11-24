/**
 * Created by plter on 2016/11/24.
 */

angular.module("ask").config(["$locationProvider", "$routeProvider", function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix("!");

    $routeProvider.when("/register", {
        template: "<register></register>"
    });
}]);