(function (){
    'use strict';

    angular.module('MenuApp')
    .controller('ItemDetailController', ItemDetailController);

    ItemDetailController.$inject = ['MenuDataService', 'items' ];
    function ItemDetailController(MenuDataService, items) {
        var menuItemsList = this;
        menuItemsList.items = items.data.menu_items;
        
    }

}) ();