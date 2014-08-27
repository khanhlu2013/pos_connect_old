requirejs.config({
     baseUrl: STATIC_URL + 'js'
    ,paths: {
         app : 'app'
        ,lib : 'lib'
        ,service : 'service'
        ,controller : 'controller'
        ,domReady: ['lib/require/domReady']

        // ,'angular':["//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular",["lib/angular.min"]]
        ,'angular':["lib/angular_3"]

        // ,ui_bootstrap:["//cdnjs.cloudflare.com/ajax/libs/angular-ui-bootstrap/0.10.0/ui-bootstrap-tpls.min",["lib/ui-bootstrap-tpls-0.11.0"]]
        ,'ui_bootstrap':['lib/ui-bootstrap-tpls-0.11.0']

        ,'ngTable' : ['lib/ng-table']
        ,'pouchdb_raw' : ['lib/pouchdb-3.0.0.min']
        ,'pouchdb_quick_search' : ['lib/pouchdb.quick-search']
        ,'blockUI' : ['lib/angular-block-ui']
    }
    ,shim:{
         'angular'                  : { exports : 'angular' }
        ,'ui_bootstrap'             : { deps    : ['angular'] }
        ,'ngTable'                  : { deps    : ['angular'] } 
        ,'pouchdb_quick_search'     : { deps    : ['pouchdb_raw'] } 
        ,'blockUI'                  : { deps    : ['angular']}         
    }
    ,deps : ['app/sale_app/bootstrap']
});
requirejs.onError = function (err) {
    alert('there is error loading page: ' + err);
    console.log(err);
    throw err;
};