/**
 * Created by falappat on 1/12/17.
 */
angular.module('Data')
.service('MenuDataService',MenuDataService);

MenuDataService.$inject = ['$http','MENU_API_ENDPOINT'];
function MenuDataService($http) {
    var service = this;

    service.getAllCategories = function () {
        return $http({
            method: "GET",
            url: MENU_API_ENDPOINT + '/categories.json'
        }).then(function (response) {
            return response;
        });
    };

    service.getItemsForCategory = function (categoryShortName) {
        return $http({
            method: "GET",
            url: MENU_API_ENDPOINT + '//menu_items.json?category=' + categoryShortName
        }).then(function (response) {
            return response;
        });
    };
}