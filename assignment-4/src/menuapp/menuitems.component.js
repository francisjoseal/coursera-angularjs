(function () {
    'use strict';

    angular.module('MenuApp')
    .component('menuitems', {
        templateUrl: 'src/menuapp/templates/menuitems.template.html',
        bindings: {
            items: '<'
        }
    });

}) ();