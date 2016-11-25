/**
 * Created by plter on 2016/11/25.
 */

angular.module("myask", []).component("myask", {
    templateUrl: "myask/myask.template.htm",
    controller: function ($scope, $location, $http) {

        function getFormParams() {
            var data = {
                title: $scope.title,
                userid: ucai.currentUser.id
            };
            if ($scope.content) {
                data.content = $scope.content;
            }
            return data;
        }

        function addListeners() {
            $scope.formSubmitHandler = function () {
                $http.post(ucai.ServerApis.submitQuestion, getFormParams()).then(function (result) {
                    console.log(result);

                    switch (result.data.code) {
                        case 1:
                            alert("添加问题成功");
                            break;
                        default:
                            ucai.showAlert("添加问题失败，请稍候重试");
                            break;
                    }
                });
            }
        }

        //init
        (function () {
            $scope.question = "";
            addListeners();

            if (!ucai.currentUser) {
                ucai.navigateToLoginPage($location, "/myask");
            }
        })();
    }
});