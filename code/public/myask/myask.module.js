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
                            getQuestions();
                            break;
                        default:
                            ucai.showAlert("添加问题失败，请稍候重试");
                            break;
                    }
                });
            }
        }

        function getQuestions() {
            $http.post(ucai.ServerApis.questionList, {
                userid: ucai.currentUser.id
            }).then(function (result) {
                console.log(result);
                switch (result.data.code) {
                    case 1:
                        if (result.data.result && result.data.result.length) {
                            $scope.questions = result.data.result;
                        } else {
                            $scope.questions = null;
                        }
                        break;
                    default:
                        ucai.showAlert("获取问题列表失败");
                        break;
                }
            })
        }

        //init
        (function () {
            addListeners();

            if (ucai.currentUser) {
                getQuestions();
            } else {
                ucai.navigateToLoginPage($location, "/myask");
            }
        })();
    }
});