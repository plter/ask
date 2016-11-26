/**
 * Created by plter on 2016/11/22.
 */

angular.module("ask").component("ngHeader", {
    templateUrl: "header.template.htm",
    controller: function ($scope, $http, $location) {
        $scope.site_title = "...";
        $scope.keyword = "";

        function getSiteInfo() {

            $http.post(ucai.ServerApis.config).then(function (result) {
                if (result.data.code == 1) {
                    $scope.site_title = result.data.result.site_title;
                }
            });
        }

        function addListeners() {
            $scope.searchFormSubmitHandler = function () {
                $location.path("/questions/" + $scope.keyword);
            }
        }


        function init() {
            addListeners();
            getSiteInfo();
        }

        init();
    }
});