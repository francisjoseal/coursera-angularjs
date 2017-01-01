/**
 * Created by falappat on 12/31/16.
 */
(function () {
    'use strict';
    angular.module('ShoppingListCheckOff', [])
        .controller('buyCtrl', buyCtrl)
        .controller('boughtCtrl', boughtCtrl)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

    //Inject the ShoppingListCheckOffService
    buyCtrl.$inject = ['ShoppingListCheckOffService'];
    //buyCtrl
    function buyCtrl(ShoppingListCheckOffService) {
        var shopper = this;

        shopper.itemList = ShoppingListCheckOffService.getToBuyList();
        shopper.boughtItem = function (itemIndex) {
            ShoppingListCheckOffService.boughtItem(itemIndex);
        }
        shopper.isListEmpty = function(){
            return ShoppingListCheckOffService.isToBuyListEmpty();
        };
    }

    //Inject the ShoppingListCheckOffService
    boughtCtrl.$inject = ['ShoppingListCheckOffService'];
    //boughtCtrl
    function boughtCtrl(ShoppingListCheckOffService) {
        var shoppingBag = this;

        shoppingBag.itemList = ShoppingListCheckOffService.getBoughtList();
        shoppingBag.noItemBought = function() {
            return ShoppingListCheckOffService.isBoughtListEmpty();
        };
    }

    function ShoppingListCheckOffService() {
        var service = this;

        service.toBuyList = [
            {
                name: "Chicken Wings",
                quantity: 50
            },
            {
                name: "Beer",
                quantity: 100
            },
            {
                name: "Mozezrella Sticks",
                quantity: 25
            },
            {
                name: "Buffalo Sauce",
                quantity: 10
            },
            {
                name: "Ribs",
                quantity: 25
            },
            {
                name: "Large Pepperoni Pizza",
                quantity: 3
            }
        ];

        service.boughtList = [];

        service.getToBuyList = function () {
            return service.toBuyList;
        };

        service.getBoughtList = function () {
            return service.boughtList;
        };

        service.boughtItem = function (index) {
            var moveThisItem = service.toBuyList[index];
            service.toBuyList.splice(index,1);
            service.boughtList.push(moveThisItem);
        };

        service.isToBuyListEmpty = function () {
            return service.getToBuyList().length === 0 ? true : false;
        };

        service.isBoughtListEmpty = function () {
            return service.getBoughtList().length === 0 ? true : false;
        };
    }

})();