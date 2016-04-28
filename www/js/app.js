// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','ngCordova','ionic-datepicker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

   Parse.initialize("myAppId");
   Parse.serverURL = 'http://45.55.141.129:1337/parse';

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('welcome',{
      url: '/',
      templateUrl: 'templates/welcome.html',
      controller:'LoginCtrl'
  })

    .state('login',{
      url: '/login',
      templateUrl: 'templates/login.html',
      controller:'LoginCtrl'
  })

    .state('sinup',{
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller:'SignupCtrl'
  })

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.courses', {
    url: '/courses',
    views: {
      'menuContent': {
        templateUrl: 'templates/courses.html',
        controller: 'CoursesCtrl'
      }
    }
  })

    .state('app.courselist', {
      url: '/CourseList',
      views:{
        'menuContent': {
          templateUrl:'templates/CourseList.html',
          controller: "CourseListCtrl"
        }
      }
    })
    
    .state('app.course-detail', {
	 url:'/CourseList/:objectId',
	 views: {
		 'menuContent' :{
			 templateUrl: 'templates/course-detail.html',
			 controller: 'CourseDetailCtrl'
		 }
	 }
 })

  .state('app.student', {
      url: '/student',
      views: {
        'menuContent': {
          templateUrl: 'templates/student.html',
          controller: 'StudentCtrl'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  
   if (Parse.User.current() == "Student"){
          $urlRouterProvider.otherwise('/app/student');
    }
    
    else{
	    $urlRouterProvider.otherwise('/app/courses');

    }
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
})


//Factory - Sevices Test
.factory('CourseList',['$http','PARSE_CREDENTIALS',function($http,PARSE_CREDENTIALS){
	
    return {
        getAll:function(){
            return $http.get('http://45.55.141.129:1337/parse/classes/Course?include=Instructor',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'Content-Type':'application/json'                     
                    }
            });
        },
        get:function(id){
            return $http.get('http://45.55.141.129:1337/parse/classes/Course/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'Content-Type':'application/json'               
                     }
            });
        },
        create:function(data){
            return $http.post('http://45.55.141.129:1337/parse/classes/Course',data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'Content-Type':'application/json'
                }
            });
        },
        edit:function(id,data){
            return $http.put('http://45.55.141.129:1337/parse/classes/Course/'+id,data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'Content-Type':'application/json'
                }
            });
        },
        delete:function(id){
            return $http.delete('http://45.55.141.129:1337/parse/classes/Course/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'Content-Type':'application/json'
                }
            });
        }
    }
    
}]).value('PARSE_CREDENTIALS',{
    APP_ID: 'myAppId'
});
