/**
 * Created by plter on 2016/11/22.
 */

angular.module("register").component("register", {
    templateUrl: "register/register.template.htm",
    controller: function ($scope) {
        $scope.login = "";
        $scope.pass = "";
        $scope.passConfirm = "";

        var alertDiv = $(".register-form-alert");
        alertDiv.hide();
        alertDiv.find(".close").click(function () {
            alertDiv.hide("fast");
        });
        var alertContent = alertDiv.find(".alert-content");

        $scope.formSubmitHandler = function () {

            if ($scope.pass != $scope.passConfirm) {
                alertContent.html("密码确认不一致");
                alertDiv.show("fast");
                return;
            }
            alertDiv.hide("fast");

            //TODO connect server to perform the register action
        }
    }
});