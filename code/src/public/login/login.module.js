/**
 * Created by plter on 2016/11/24.
 */


angular.module("login", []).component("login", {
    templateUrl: "login/login.template.htm",
    controller: function ($scope,$http) {
        $scope.login = "";
        $scope.pass = "";

        $scope.formSubmitHandler = function () {
            //TODO login
        }
    }
});

