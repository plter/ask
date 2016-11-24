/**
 * Created by plter on 2016/11/24.
 */

window.ucai = window.ucai || {};

angular.module("ask").component("globalAlert", {
    templateUrl: "GlobalAlert.template.htm",
    controller: function ($scope) {
        $scope.message = "No content";

        var globalAlert = $(".global-alert");
        globalAlert.hide();

        globalAlert.find(".close").click(function () {
            globalAlert.hide("fast");
        });

        ucai.showAlert = function (message) {
            $scope.message = message;
            globalAlert.show("fast");
        };

        ucai.hideAlert = function () {
            globalAlert.hide("fast");
        }
    }
});