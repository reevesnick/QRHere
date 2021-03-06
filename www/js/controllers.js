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
    
    var currentuser = Parse.User.current();

    $scope.data = {};

  $scope.loginEmail = function(){
  	Parse.User.logIn($scope.data.username, $scope.data.password, {
    success: function(user) {
      // Do stuff after successful login.
      console.log(user);
        if (currentuser == 'Teacher'){
      $state.go('app.courses');
}
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
      alert("You are now registered");
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

		//$scope.


        $scope.submit = function () {
            var Course = Parse.Object.extend("Course");
            var course = new Course();



            course.set("CourseName", $scope.coursedata.CourseName);
            course.set("crn", $scope.coursedata.crn);
            course.set("SectionNumber", $scope.coursedata.SectionNumber);
            course.set("DayArray", $scope.daycheckbox.checked );
            course.set("Instructor",Parse.User.current());

          if (course.equalTo("crn",course)){
            alert("Course Already Exist");
          }
            course.save(null, {
                success: function(Course) {
                    // Execute any logic that should take place after the object is saved.
                    alert('Your class has been uploaded');
                                      $state.go('app.courselist');


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
        }


})




.controller('StudentCtrl', function($scope,$cordovaBarcodeScanner){
$scope.scanBarcode = function() {
	/*
	 $cordovaBarcodeScanner.scan(function (result) {  
                    alert("We got a barcode\n" +  
                        "Result: " + result.text + "\n" +  
                        "Format: " + result.format + "\n" +  
                        "Cancelled: " + result.cancelled);  
                },  
                function (error) {  
                    alert("Scanning failed: " + error);  
                });
	*/
	
        $cordovaBarcodeScanner.scan().then(function(imageData) {
	        window.open(imageData.text,'_blank', 'location=yes');
	        alert("You will be referred to a web page to Verify your status.");
			//alert(imageData.text);
            console.log("Barcode Format -> " + imageData.format);
            console.log("Cancelled -> " + imageData.cancelled);
        }, function(error) {
            console.log("An error happened -> " + error);
        });
        
    };

})

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

.controller('PlaylistCtrl',function($scope, $stateParams) {
})

.controller('CourseListCtrl',['$scope','$stateParams','CourseList', function($scope,$state,CourseList){
	
	$scope.showQR = function(){
		var qrcode = new QRCode("qrcode", {
		text: "http://jindo.dev.naver.com/collie",
		width: 128,
		height: 128,
		colorDark : "#000000",
		colorLight : "#ffffff",
		correctLevel : QRCode.CorrectLevel.H
		});
	}
	
	  CourseList.getAll().success(function(data){
		$scope.items = data.results;	
	}).then(function(result) {
   // _this.breweries = result.data.breweries;
  })
	  
    $scope.showCourseList = function(){

    ctrl.add = add;
    ctrl.data = [
      {
        CourseName: $scope.coursedata.CourseName,
        Daysoffered:$scope.coursedata.DayArray,
        limit: 500,

      },

    ]}


    function add(index) {
      window.alert("Added: " + index);
    }
  }])
  
  .controller('CourseDetailCtrl',['$scope','CourseList','$stateParams',function($scope, CourseList, $stateParams){
	  	CourseList.get($stateParams.objectId, function(course){
		$scope.course = course;
	})
  }])
  ;



