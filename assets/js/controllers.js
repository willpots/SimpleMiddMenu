'use strict';

/* Controllers */

var d = new Date();
var today = d.getFullYear().toString() + '-' + (d.getMonth() + 1).toString() + '-' + d.getDate().toString();
var apiURL = 'http://menus.middlebury.edu/' + today + '/xml';

function MenuDataCtrl($scope, $http) {

  $http({
    method: 'GET',
    data: $scope.menuData,
    url: apiURL,
    headers: {
      'Accept': 'text/xml'
    },
    transformResponse: function(data) {
      var json = x2js.xml_str2json( data );
      return json;
    },
    cache: false,
  }).
  success(function(data, status) {
    $scope.menuData = data;
  }).
  error(function(data, status) {
    $scope.menuData = data || "Request failed";
  });
}