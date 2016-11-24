/**
 * Created by plter on 2016/11/24.
 */

angular.module("profile", []).component("profile", {
    templateUrl: "profile/profile.template.htm",
    controller: function ($scope, $http) {


        $scope.formSubmitHandler = function () {
            var params = {
                userid: $scope.id,
                login: $scope.login,
                gender: $scope.gender
            };

            if ($scope.email) {
                params.email = $scope.email;
            }
            if ($scope.phone) {
                params.phone = $scope.phone;
            }
            if ($scope.name) {
                params.name = $scope.name;
            }
            if ($scope.id_card) {
                params.id_card = $scope.id_card;
            }
            if ($scope.surname) {
                params.surname = $scope.surname;
            }
            if ($scope.nickname) {
                params.nickname = $scope.nickname;
            }

            $http.post(ucai.ServerApis.updateUser, params).then(function (result) {
                console.log(result);
                switch (result.data.code) {
                    case 1:
                        alert("保存成功");
                        break;
                    case 1062:
                        ucai.showAlert("该帐号已被占用");
                        break;
                    default:
                        ucai.showAlert("未知错误");
                        break;
                }
            });
        };


        $http.post(ucai.ServerApis.getUser, {
            userid: ucai.currentUser.id
        }).then(function (result) {
            console.log(result);

            switch (result.data.code) {
                case 1:
                    $scope.id = result.data.result.id;
                    $scope.login = result.data.result.login;
                    $scope.email = result.data.result.email;
                    $scope.phone = result.data.result.phone;
                    $scope.id_card = result.data.result.id_card;
                    $scope.name = result.data.result.name;
                    $scope.surname = result.data.result.surname;
                    $scope.nickname = result.data.result.nickname;
                    $scope.gender = result.data.result.gender;
                    break;
                default:
                    ucai.showAlert("无法获取用户信息，请稍候重试");
                    break;
            }
        });
    }
});