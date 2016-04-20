angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};
/*
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
*/
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('WelcomeCtrl',function($scope){

})

.controller('LoginCtrl',function($scope,$state, $ionicHistory){
           $scope.goback = function(){
            $ionicHistory.goBack();

    };

    $scope.data = {};

  $scope.loginEmail = function(){
  	Parse.User.logIn($scope.data.username, $scope.data.password, {
    success: function(user) {
      // Do stuff after successful login.
      console.log(user);
        if (Parse.User.current() == "Teacher")
      $state.go('app.courses');

        else{
            $state.go('app.student');
        }
    },
    error: function(user, error) {
      // The login failed. Check error to see why.
      alert("Error! Please check your information and try again");

        //var alertPopup =
    }
  });
  };
})

.controller('SignupCtrl',function($scope, $state, $ionicHistory){
    $scope.goback = function(){
            $ionicHistory.goBack();

    };

        $scope.data = {};


    $scope.teacherSignUpEmail  = function(){
        var user = new Parse.User();
        user.set("firstname",$scope.data.firstname);
        user.set("lastname",$scope.data.lastname);
        user.set("username", $scope.data.username);
        user.set("password", $scope.data.password);
        user.set("email", $scope.data.email);
        user.set("bannerID",$scope.data.bannerid);
        user.set("type", "Teacher");


  // other fields can be set just like with Parse.Object
 // user.set("somethingelse", "like this!");

  user.signUp(null, {
    success: function(user) {
      // Hooray! Let them use the app now.
      alert("Success! You are now registered");
      //alert("You Are Now Registered");
                  $state.go('app.courses');

    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.

      alert("Error: " + error.code + " " + error.message);
    }
  });
}

    $scope.studentSignupEmail = function(){
	   //Create a new user on Parse
        var user = new Parse.User();
        user.set("firstname",$scope.data.firstname);
        user.set("lastname",$scope.data.lastname);
        user.set("username", $scope.data.username);
        user.set("password", $scope.data.password);
        user.set("email", $scope.data.email);
        user.set("bannerID",$scope.data.bannerid);
        user.set("type","Student");



  // other fields can be set just like with Parse.Object
 // user.set("somethingelse", "like this!");

  user.signUp(null, {
    success: function(user) {
      // Hooray! Let them use the app now.
      alert("Success! You are now registered");
      //alert("You Are Now Registered");
                  $state.go('app.student');

    },
    error: function(user, error) {
      // Show the error message somewhere and let the user try again.

      alert("Error: " + error.code + " " + error.message);
    }
  });
  };



})

.controller('CoursesCtrl',function($scope,$state){

  $scope.coursedata = {};


  $scope.daycheckbox = [
    {"Monday" : false},
    {"Tuesday" : false},
    {"Wednesday": false},
    {"Thursday": false},
    {"Friday": false},

  ]
  required: true;




       $scope.testServer = function(){
            var TestObject = Parse.Object.extend("TestObject");
            var testObject = new TestObject();
            testObject.save({foo: "bar"}).then(function(object) {
                alert("yay! it worked");
            });
        };



        $scope.submit = function () {
            var Course = Parse.Object.extend("Course");
            var course = new Course();



            course.set("CourseName", $scope.coursedata.CourseName);
            course.set("crn", $scope.coursedata.crn);
            course.set("SectionNumber", $scope.coursedata.SectionNumber);
            course.set("DayArray", $scope.daycheckbox.checked );
          if (course.equals("objectId",course)){
            alert("Course Already Exist");
          }
            course.save(null, {
                success: function(Course) {
                    // Execute any logic that should take place after the object is saved.
                    alert('Your class has been uploaded');

                    ('New object created with objectId: ' + Course.id);
                },
                error: function(Course, error) {
                  if ($scope.coursedata.crn = "crn"){
                    alert("Course Already Exist");
                  }
                  required: "Please Select Days this course is offered."
                    // Execute any logic that should take place if the save fails.
                    // error is a Parse.Error with an error code and message.
                    alert('Failed to create new object, with error code: ' + error.message);
                }
            });
        };

  $scope.homepage = function (){
    onButtonClicked();
  }
})








.controller('StudentCtrl',['$scope','$cordovaBarcodeScanner','$ionicPlatform', function($scope,$cordovaBarcodeScanner,$ionicPlatform){
	    $scope.currentUser = Parse.User.current();

	
	$scope.scanBarcode = function(){
		 $ionicPlatform.ready(function() {
            $cordovaBarcodeScanner.scan().then(function(barcodeData) {
               alert(JSON.stringify(barcodeData));
            }, function(error) {
               alert(JSON.stringify(error));
            });
         });
	}

}])

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});


