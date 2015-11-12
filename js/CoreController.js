(function() {
    'use strict';

    angular
        .module('dev-challenge')
        .controller('CoreController', CoreController);

    CoreController.$inject = [];

    /* @ngInject */
    function CoreController() {
      var vm = this;
      vm.title = 'CoreController';
      vm.closeMenu = closeMenu;

      function closeMenu() {
        angular.element('#st-container').removeClass('st-menu-open');
      }
    }
})();
