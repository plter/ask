/**
 * Created by plter on 2016/11/22.
 */

angular.module("register").component("register", {
    templateUrl: "register/register.template.htm",
    controller: function ($scope, $http, $location) {
        $scope.login = "";
        $scope.pass = "";
        $scope.passConfirm = "";
        $scope.loading = false;

        $scope.formSubmitHandler = function () {

            if ($scope.pass != $scope.passConfirm) {
                ucai.showAlert("密码确认不一致");
                return;
            }
            ucai.hideAlert();

            $scope.loading = true;
            $http.post(ucai.ServerApis.register, {
                login: $scope.login,
                pass: md5($scope.pass)
            }).then(function (result) {
                $scope.loading = false;
                console.log(result);

                switch (result.data.code) {
                    case 1:
                        ucai.currentUser = result.data.result;
                        $location.path("/profile");
                        break;
                    case 1062:
                        ucai.showAlert("该用户名已被占用");
                        break;
                    default:
                        ucai.showAlert("未知错误");
                        break;
                }
            })
        }
    }
});