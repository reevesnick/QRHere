angular.module('starter.services', [])

.factory('CourseList', function(){
	
	.factory('CampusEvents',['$http','PARSE_CREDENTIALS',function($http,PARSE_CREDENTIALS){
	
    return {
        getAll:function(){
            return $http.get('http://45.55.141.129:1337/classes/CampusEvents',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'Content-Type':'application/json'                     }
            });
        },
        get:function(id){
            return $http.get('http://45.55.141.129:1337/classes/CampusEvents/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'Content-Type':'application/json'                }
            });
        },
        create:function(data){
            return $http.post('http://45.55.141.129:1337/classes/CampusEvents',data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'Content-Type':'application/json'
                }
            });
        },
        edit:function(id,data){
            return $http.put('http://45.55.141.129:1337/classes/CampusEvens/'+id,data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'Content-Type':'application/json'
                }
            });
        },
        delete:function(id){
            return $http.delete('http://45.55.141.129:1337/classes/CampusEvents/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'Content-Type':'application/json'
                }
            });
        }
    }
    
}]).value('PARSE_CREDENTIALS',{
    APP_ID: 'myAppId',
})
	
})

;