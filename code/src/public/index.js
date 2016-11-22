/**
 * Created by plter on 2016/11/22.
 */

var app = angular.module("ask", []);

// app.component("register", {
//     templateUrl: "register.htm",
//     controller: function ($scope) {
//
//     }
// });

app.controller("main", function ($scope, $http) {

    $scope.currentUser = null;

    $http.post(ucai.ServerApis.getUser).then(function (result) {
        console.log(result.data);

        if (result.data.code == 1) {
            $scope.currentUser = result.data.result;
        }
    });
});