/**
 * Created by plter on 2016/11/22.
 */

var app = angular.module("ask", [
    "ngRoute",
    "register"
]);

// app.component("register", {
//     templateUrl: "register.htm",
//     controller: function ($scope) {
//
//     }
// });

app.controller("main", function ($scope, $http, $location) {
    $http.post(ucai.ServerApis.getUser).then(function (result) {
        if (result.data.code == 1) {
            console.log(result);
        } else {
            $location.path("/register");
        }
    });
});