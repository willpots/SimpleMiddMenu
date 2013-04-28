'use strict';

/* Controllers */

var d = new Date();
var today = d.getFullYear().toString() + '-' + (d.getMonth() + 1).toString() + '-' + d.getDate().toString();
var apiURL = 'http://menus.middlebury.edu/' + today + '/xml';

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
      return parseResponse( data );
    },
    cache: false,
  }).
  success(function(data, status) {
    $scope.menuData = data;
  }).
  error(function(data, status) {
    $scope.menuData = data || "Request failed";
  });

  $scope.meal = currentMeal();

  $scope.isMobile = (detectMobile()) ? true : false;

}

function currentMeal() {
  var hour = d.getHours();
  var meal;

  if (hour <= 10) {
    meal = 'breakfast';
  } else if (hour <= 13) {
    meal = 'lunch';
  } else {
    meal = 'dinner';
  }

  return meal;
}

function parseResponse(data) {
  var jsonRaw = x2js.xml_str2json( data );
  var jsonClean;

  if (d.getDay() == 0 || d.getDay() == 6) {
    jsonClean = {
      'ross': {
        'breakfast': (jsonRaw.root.menu[0].Breakfast) ? jsonRaw.root.menu[0].Breakfast.item_asArray : [],
        'lunch': (jsonRaw.root.menu[0].Lunch) ? jsonRaw.root.menu[0].Breakfast.item_asArray : [],
        'dinner': (jsonRaw.root.menu[0].Dinner) ? jsonRaw.root.menu[0].Dinner.item_asArray : []
      },
      'proctor': {
        'breakfast': (jsonRaw.root.menu[1].Breakfast) ? jsonRaw.root.menu[1].Lunch.item_asArray : [],
        'lunch': (jsonRaw.root.menu[1].Lunch) ? jsonRaw.root.menu[1].Lunch.item_asArray : [],
        'dinner': (jsonRaw.root.menu[1].Dinner) ? jsonRaw.root.menu[1].Dinner.item_asArray : [],
      },
      'atwater': {
        'breakfast': (jsonRaw.root.menu[2].Breakfast) ? jsonRaw.root.menu[2].Breakfast.item_asArray : [],
        'lunch': (jsonRaw.root.menu[2].Lunch) ? jsonRaw.root.menu[2].Lunch.item_asArray : [],
        'dinner': (jsonRaw.root.menu[2].Dinner) ? jsonRaw.root.menu[2].Dinner.item_asArray : []
      }
    };
  } else {
    jsonClean = {
      'ross': {
        'breakfast': (jsonRaw.root.menu[0].Breakfast) ? jsonRaw.root.menu[0].Breakfast.item_asArray : [],
        'lunch': (jsonRaw.root.menu[0].Lunch) ? jsonRaw.root.menu[0].Lunch.item_asArray : [],
        'dinner': (jsonRaw.root.menu[0].Dinner) ? jsonRaw.root.menu[0].Dinner.item_asArray : []
      },
      'proctor': {
        'breakfast': (jsonRaw.root.menu[1].Breakfast) ? jsonRaw.root.menu[1].Breakfast.item_asArray : [],
        'lunch': (jsonRaw.root.menu[1].Lunch) ? jsonRaw.root.menu[1].Lunch.item_asArray : [],
        'dinner': (jsonRaw.root.menu[1].Dinner) ? jsonRaw.root.menu[1].Dinner.item_asArray : [],
      },
      'atwater': {
        'breakfast': (jsonRaw.root.menu[2].Breakfast) ? jsonRaw.root.menu[2].Breakfast.item_asArray : [],
        'lunch': (jsonRaw.root.menu[2].Lunch) ? jsonRaw.root.menu[2].Lunch.item_asArray : [],
        'dinner': (jsonRaw.root.menu[2].Dinner) ? jsonRaw.root.menu[2].Dinner.item_asArray : []
      }
    };
  }

  return jsonClean;
}

function detectMobile() { 
 if( navigator.userAgent.match(/Android/i)
   || navigator.userAgent.match(/webOS/i)
   || navigator.userAgent.match(/iPhone/i)
   || navigator.userAgent.match(/iPad/i)
   || navigator.userAgent.match(/iPod/i)
   || navigator.userAgent.match(/BlackBerry/i)
   || navigator.userAgent.match(/Windows Phone/i)
   ){
  return true;
}
else {
  return false;
}
}