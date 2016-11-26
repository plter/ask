/**
 * Created by plter on 2016/11/22.
 */

window.ucai = window.ucai || {};

var app = angular.module("ask", [
    "ngRoute",
    "register",
    "login",
    "profile",
    "about",
    "myask",
    "question"
]);

app.controller("main", function ($scope, $http, $location) {
    $http.post(ucai.ServerApis.getCurrentUser).then(function (result) {

        console.log(result);
        if (result.data.code == 1) {
            ucai.currentUser = result.data.result;
            //TODO 呈现问题列表
        } else {
            $location.path("/login");
        }
    });
});