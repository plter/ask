/**
 * Created by plter on 2016/11/24.
 */


window.ucai = window.ucai || {};

(function () {

    ucai.__callbackUrl = null;

    ucai.navigateToLoginPage = function ($location, callback) {
        ucai.__callbackUrl = callback;
        $location.path("/login");
    };

    ucai.getCallbackUrl = function () {
        return ucai.__callbackUrl;
    };

    ucai.resetCallbackUrl = function () {
        ucai.__callbackUrl = null;
    };

    Object.defineProperties(ucai, {
        currentUser: {
            set: function (value) {
                ucai._currentUser = value;
            },
            get: function () {
                return ucai._currentUser;
            }
        }
    });

    ucai.formatDate = function (date) {
        function format(num) {
            return (num >= 10 ? "" : "0") + num;
        }

        return date.getFullYear() + "-" + format(date.getMonth() + 1) + "-" + format(date.getDate()) + " " +
            format(date.getHours()) + ":" + format(date.getMinutes()) + ":" + format(date.getSeconds());
    }
})();