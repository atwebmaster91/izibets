angular.module('izibets').component('oneGame', {
  templateUrl: '././generic.html',
  controller: oneGameController,
  controllerAs: "oneGameCtrl"
});

oneGameController.$inject = ['$scope', '$element', '$attrs', '$http', 'gamesData', '$state', '$stateParams'];

function oneGameController($scope, $element, $attrs, $http, gamesData, $state, $stateParams) {

  //variables
  var ctrl = this;

  //functions
  ctrl.getMatcheList = getMatcheList;
  ctrl.redirectToGamePage = redirectToGamePage;

  ctrl.$onInit = function () {
    console.log('here');
    getMatcheList()
  };

  function getMatcheList() {

  }

}