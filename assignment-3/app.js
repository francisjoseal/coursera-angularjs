/**
 * Created by falappat on 1/4/17.
 */
(function () {
    'use strict';
    angular.module('NarrowItDownApp',[])
        .controller('NarrowItDownController',NarrowItDownController)
        .directive('foundItems',FoundItems)
        .service('MenuSearchService',MenuSearchService);

    NarrowItDownController.$inject = ['$http', 'MenuSearchService'];
    function NarrowItDownController($http, MenuSearchService) {
        var narrow = this;
        narrow.searchTerm = "";
        narrow.found = [];
        narrow.displayError = false;

        narrow.getItems = function (searchTerm) {
            //prevent unwanted requests by check
            if (searchTerm) {
                var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
                promise.then(function (response) {
                    //store the filtered data in the scope variable
                    narrow.found = response;
                    //show error message if no results found
                    if(narrow.found.length == 0){
                        narrow.displayError = true;
                    }
                }).catch(function (error) {
                    console.log("Error while getting data from webservice!", error);
                })
            }else{
                //show error message if user clicks button without giving search term
                narrow.displayError = true;
            }
        };

        narrow.removeItemAtIndex = function (index) {
            narrow.found.splice(index,1);
        };

    }

    MenuSearchService.$inject = ['$http', '$filter'];
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function (result) {
                var foundItems = result.data.menu_items.filter(function (ele) {
                     if(ele.description.indexOf(searchTerm) !== -1)
                         return ele;
                });
                // return processed items
                return foundItems;
            });
        }
    }
    
    function FoundItems() {
        var ddo = {
            restrict: 'EA',
            templateUrl: "itemsloaderindicator.template.html",
            scope:{
                displayItems: '<',
                onRemove: '&'
            },
            controller: ItemLoaderCtrl,
            controllerAs: 'narrowItCtrl',
            bindToController: true
        };
        return ddo;
    }

    function ItemLoaderCtrl() {
        var narrowItCtrl = this;

    }

})();