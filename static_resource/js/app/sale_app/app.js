define(
[   
     'angular'
    //------------------     
    ,'ui_bootstrap'
    ,'service/csrf'
    ,'service/menu'
    ,'app/sale_app/controller'
    ,'blockUI'
    ,'service/global_setting'
    ,'angular_hotkey'
    ,'directive/share_directive'
    ,'infiniteScroll'
]
,function
(
     angular
)
{
    var app = angular.module('sale_app',
    [
         'ui.bootstrap'
        ,'service.csrf'     
        ,'service.menu'      
        ,'sale_app/controller'
        ,'blockUI'
        ,'service/global_setting'
        ,'cfp.hotkeys'
        ,'directive/share_directive'
        ,'infinite-scroll'
    ]);
    
    app.config(['blockUIConfig',function(blockUIConfig) {
        blockUIConfig.message = 'Please wait ..... ';
        blockUIConfig.autoBlock = true;
        blockUIConfig.delay = 0;
    }]);
    
    app.config(['$sceDelegateProvider',function($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'https://liquorkhanhlu2013.s3.amazonaws.com/**'
        ]);
    }]);

    app.config(['hotkeysProvider',function(hotkeysProvider) {
        hotkeysProvider.includeCheatSheet = true;
    }]);

    app.constant('IS_USE_VALUE_CUSTOMER_PRICE','IS_USE_VALUE_CUSTOMER_PRICE');
    app.run(['service/global_setting',function(global_setting){
        global_setting.set(_GLOBAL_SETTING_);
    }])
});