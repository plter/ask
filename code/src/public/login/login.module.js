/**
 * Created by plter on 2016/11/24.
 */


angular.module("login", []).component("login", {
    templateUrl: "login/login.template.htm",
    controller: function ($scope, $http, $location) {
        $scope.login = "";
        $scope.pass = "";

        $scope.formSubmitHandler = function () {
            $http.post(ucai.ServerApis.login, {
                login: $scope.login,
                pass: md5($scope.pass)
            }).then(function (result) {

                console.log(result);

                switch (result.data.code) {
                    case 1:
                        ucai.hideAlert();
                        ucai.currentUser = result.data.result;
                        //success
                        if (ucai.getCallbackUrl()) {
                            $location.path(ucai.getCallbackUrl());
                            ucai.resetCallbackUrl();
                        } else {
                            $location.path("/profile");
                        }
                        break;
                    case 10005:
                    case 10006:
                        ucai.showAlert("用户名或者密码错误");
                        break;
                    default:
                        ucai.showAlert("未知错误");
                        break;
                }
            });
        }
    }
});

