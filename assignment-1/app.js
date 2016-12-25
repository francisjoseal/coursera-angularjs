/**
 * Created by falappat on 12/24/16.
 */
angular.module("LunchCheck", []).controller('LunchCheckController', function ($scope) {
    $scope.lunchList = "";
    $scope.message = "";
    $scope.color = "";
    $scope.checkLunch = function (list) {
        $scope.message = "";
        $scope.color = "";
        var count = 0;
        if(list){
            var items = list.split(',');
            for(var i = 0, len = items.length; i < len; i++){
                if(items[i].length > 0){
                    ++count;
                }
            }
            if(count >= 1 && count <=3){
                $scope.message = "Enjoy!";
                $scope.color = "green";
            }else if(count >3){
                $scope.message = "Too much!";
                $scope.color = "green";
            }else{
                $scope.message = "Please enter data first";
                $scope.color = "red";
            }
        }else{
            $scope.message = "Please enter data first";
            $scope.color = "red";
        }
    };
});