(function () {
    'use strict';

    angular.module('Data')
    .service('MenuDataService', MenuDataService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    MenuDataService.$inject = ['$http', 'ApiBasePath'];
    function MenuDataService($http, ApiBasePath) {
        var service = this;
    
        //service to get all menu categories
        service.getAllCategories = function () {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/categories.json")
            });
            return response;
        };

        //service to get Menu Items for a given category
        service.getItemsForCategory = function (categoryShortName) {
            
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName)
            });

            
            return response;
        };

        


    }

}) ();