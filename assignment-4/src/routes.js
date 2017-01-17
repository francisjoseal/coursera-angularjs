(function () {
'use strict';

angular.module('MenuApp')
.config(RouteConfig);

RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RouteConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no matches
    $urlRouterProvider.otherwise('/');

    // Set up UI States
    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'src/menuapp/templates/home.template.html'
    })
    
    .state('mainCatergoryList', {
        url: '/main-catergory-list',
        templateUrl: 'src/menuapp/templates/main-categories.template.html',
        controller: 'MainCategoryListController as mainCategoryListCtrl',
        resolve: {
            items: ['MenuDataService', function (MenuDataService) {
                return MenuDataService.getAllCategories();
            }]
        }

    })

    .state('itemDetail', {
        url: '/item-detail/{shortName}',
        templateUrl: 'src/menuapp/templates/main-menuitems.template.html',
        controller: 'ItemDetailController as itemDetailCtrl', 
        resolve: {
            items: ['$stateParams', 'MenuDataService', 
                function ($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.shortName);
                }]
        }
    })
    ;
}

})();