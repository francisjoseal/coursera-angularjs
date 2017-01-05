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

        narrow.getItems = function (searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
            promise.then(function (response) {
                //store the filtered data in the scope variable
                narrow.found = response;
                console.log('narrow.found length=',response.length);
            }).catch(function (error) {
                console.log("Error while getting data from webservice!",error);
            })
        };

        narrow.removeItemAtIndex = function (index) {
            narrow.found.splice(index,1);
        };
        
    }

    MenuSearchService.$inject = ['$http', '$filter'];
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            console.log('search for :',searchTerm);
            return $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function (result) {
                // var temp = result.data.menu_items;
                // console.log('temp',temp);
                // process result and only keep items that match
                var foundItems = result.data.menu_items.filter(function (ele) {
                     if(ele.description.indexOf(searchTerm) !== -1)
                         return ele;
                });
                console.log('found items',foundItems);
                console.log('found items length=',foundItems.length);
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
                displayItems: '=',
                onRemove: '&'
            },
            controller: ItemLoaderCtrl,
            controllerAs: 'narrowItCtrl',
            bindToController: true
            // link: ItemLoaderLink
        };
        return ddo;
    }

    function ItemLoaderCtrl() {
        var itemLoader = this;

        // itemLoader.itemList = function () {
        //     for(var i=0; i< narrowItCtrl.found.length; i++){
        //         var name = narrowItCtrl.found[i].name;
        //
        //     }
        // }

    }


    function ItemLoaderLink(scope, element, attributes, controller) {
        console.log("Link Scope=",scope);
        console.log("Controller Instance is ",controller);
        console.log("Element is ",element);

        // scope.$watch(list.c)
    }



})();