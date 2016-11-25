/**
 * Created by plter on 2016/11/24.
 */

angular.module("ask").config(["$locationProvider", "$routeProvider", function ($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix("!");

    $routeProvider.when("/register", {
        template: "<register></register>"
    }).when("/login", {
        template: "<login></login>"
    }).when("/profile", {
        template: "<profile></profile>"
    }).when("/about", {
        template: "<about></about>"
    }).when("/myask", {
        template: "<myask></myask>"
    }).when("/question/:id", {
        template: "<question></question>"
    }).otherwise({
        template: "<all-questions></all-questions>"
    });
}]);