define(
[
	'angular'
	//------
	,'model/sp/service/search/name_sku_online_dlg'
    ,'model/sp/api_kit'
    ,'service/ui'
    ,'util/offline_db'
]
,function
(
	angular
)
{
	var mod = angular.module('sp/service/edit/kit',
    [
         'sp/service/search/name_sku_online_dlg'
        ,'sp/api_kit'
        ,'service/ui'
        ,'util/offline_db'
    ]);

    mod.factory('sp/service/edit/kit',
    [
         '$modal'
        ,'sp/service/edit/kit/prompt'
        ,'sp/api_kit'
        ,'service/ui/alert'
        ,'util/offline_db/download_product'
    ,function(
         $modal
        ,prompt_service
        ,api_kit
        ,alert_service
        ,download_product
    ){
        var template = 
            '<div class="modal-header">' +
                '<h3 class="modal-title">Kit info: {{sp.name}}</h3>' +
            '</div>' +
            '<div class="modal-body">' +   

                '<button id="sp_app/service/edit/kit/add_btn" ng-click="add()" class="btn btn-primary" type="button"><span class="glyphicon glyphicon-plus"></span></button>' +
                '</br>' +
                '<table ng-hide="sp.breakdown_assoc_lst.length==0" class="table table-hover table-bordered table-condensed table-striped">' +
                    '<tr>' +
                        '<th>kit</th>' +   
                        '<th>qty</th>' +        
                        '<th>edit</th>' +                            
                        '<th>remove</th>' +                
                    '</tr>' +    
                    '<tr ng-repeat="assoc in sp.breakdown_assoc_lst | orderBy:\'breakdown.name\'">' +
                        '<td>{{assoc.breakdown.name}}</td>' +    
                        '<td>{{assoc.qty}}</td>' +
                        '<td class="alncenter"><button ng-click="edit(assoc)" class="btn btn-primary glyphicon glyphicon-pencil" type="button"></button></td>' +                                 
                        '<td class="alncenter"><button ng-click="remove(assoc)" class="btn btn-danger glyphicon glyphicon-trash" type="button"></button></td>' +                                            
                    '</tr>' +                                                  
                '</table>' +
                '<div ng-show="sp.breakdown_assoc_lst.length==0">' +
                    '</br>' +
                    '<pre>No kit!</pre>' +
                '</div>' +

            '</div>' +

            '<div class="modal-footer">' +          
                '<button id="sp_app/service/edit/kit/cancel_btn" class="btn btn-warning" ng-click="cancel()" type="button">cancel</button>' + 
                '<button ng-disabled="is_unchange()" class="btn btn-primary" ng-click="reset()" type="button">reset</button>' +                               
                '<button id="sp_app/service/edit/kit/ok_btn" ng-disabled="is_unchange()||form.$invalid" class="btn btn-success" ng-click="ok()" type="button">ok</button>' +
            '</div>'        
        ;   
        var ModalCtrl = function($scope,$modalInstance,original_sp,GLOBAL_SETTING){
            $scope.original_sp = original_sp;
            $scope.sp = angular.copy(original_sp);

            $scope.is_unchange = function(){
                return angular.equals($scope.original_sp,$scope.sp);
            }
            $scope.reset = function(){
                $scope.sp = angular.copy($scope.original_sp);
            }
            $scope.edit = function(assoc){
                var promise = prompt_service(assoc);
                promise.then(
                    function(assoc){
                        // 2way binding taking care of updating
                    },
                    function(reason){

                    }
                )
            }
            $scope.remove = function(assoc){
                for(var i = 0 ; i < $scope.sp.breakdown_assoc_lst.length;i++){
                    if(assoc.id === $scope.sp.breakdown_assoc_lst[i].id){
                        $scope.sp.breakdown_assoc_lst.splice(i,1);
                        break;
                    }
                }
            }
            $scope.cancel = function(){
                $modalInstance.dismiss('_cancel_');
            }
            $scope.add = function(){
                prompt_service(null).then(
                    function(assoc){
                        if($scope.sp.is_breakdown_can_be_add(assoc.breakdown)){
                            $scope.sp.breakdown_assoc_lst.push(assoc);
                        }else{
                            alert_service(assoc.breakdown.name + ' can not be added to ' + $scope.sp.name);
                        }
                    }
                )
            }
            $scope.ok = function(){
                api_kit.update($scope.sp).then(
                    function(data){
                        download_product(false/*no force*/,GLOBAL_SETTING).then(
                             function(){ $modalInstance.close(data); }
                            ,function(reason){ 
                                alert_service(reason); 
                            }
                        )
                    },function(reason){ 
                        alert_service(reason); 
                    }
                )
            }            
        };
        ModalCtrl.$inject = ['$scope','$modalInstance','original_sp','GLOBAL_SETTING'];        
        return function(sp,GLOBAL_SETTING){
            var dlg = $modal.open({
                template:template,
                controller:ModalCtrl,
                backdrop:'static',
                size:'lg',
                resolve:{
                    original_sp:function(){
                        return sp
                    }
                    ,GLOBAL_SETTING : function(){
                        return GLOBAL_SETTING
                    }
                }
            })
            return dlg.result;
        }
    }]);

    mod.factory('sp/service/edit/kit/prompt',
    [
         '$modal'
        ,'sp/service/search/name_sku_online_dlg/single'
    ,function(
         $modal
        ,search_single_service
    ){
        var template = 
            '<div class="modal-header">' +
                '<h3 class="modal-title">{{original_assoc.id == null ? \'create new kit\' : \'edit kit: \' + original_assoc.breakdown.name}}</h3>' +
            '</div>' +

            '<form name="form" class="modal-body" novalidate>' +
                '<div class="form-horizontal" >' +
                    '<div class="form-group">' +
                        '<label class="col-sm-4 control-label" >Name:</label>' +
                        '<div class="col-sm-8">' +
                            '<input name="name" ng-model="assoc.breakdown.name" type="text" required disabled>' +
                            '<button id="sp_app/service/edit/kit/prompt/sp_btn" ng-click="search()" class="btn btn-primary glyphicon glyphicon-search" type="button"></button>' +     
                            '<label class="error" ng-show="form.name.$invalid">' +
                                'required.' +
                            '</label>' +                                                 
                        '</div>' +
                    '</div>' +

                    '<div class="form-group">' +
                        '<label class="col-sm-4 control-label">Qty:</label>' +
                        '<div class="col-sm-8">' +
                            '<input id="sp_app/service/edit/kit/prompt/qty_txt" name="qty" ng-model="assoc.qty" type="number" min="1" ng-pattern="integer_validation" required />' +
                            '<label class="error" ng-show="form.qty.$invalid">' +
                                '<span ng-show="form.qty.$error.required">required</span>' +
                                '<span ng-show="form.qty.$error.pattern || form.qty.$error.min">invalid number</span>' +
                            '</label>'+ 
                        '</div>' +
                    '</div>' +                 
                '</div>' + /* end form horizontal*/
            '</form>' + /* end modal body*/

            '<div class="modal-footer">' +          
                '<button class="btn btn-warning" ng-click="cancel()" type="button">cancel</button>' + 
                '<button ng-disabled="is_unchange()" class="btn btn-primary" ng-click="reset()" type="button">reset</button>' +                               
                '<button id="sp_app/service/edit/kit/prompt/ok_btn" ng-disabled="is_unchange()||form.$invalid" class="btn btn-success" ng-click="ok()" type="button">ok</button>' +
            '</div>'        
        ;  
        var ModalCtrl = function($scope,$modalInstance,original_assoc){
            $scope.original_assoc = original_assoc == null ? {} : original_assoc;
            $scope.assoc = angular.copy($scope.original_assoc);
            $scope.integer_validation = /^\d*$/;
            $scope.search = function(){
                var promise = search_single_service();
                promise.then(
                    function(sp){
                        $scope.assoc.breakdown = sp;
                    },
                    function(reason){
                        //do nothing
                    }
                )
            }
            $scope.is_unchange = function(){
                return angular.equals($scope.original_assoc,$scope.assoc)
            } 
            $scope.reset = function(){
                $scope.assoc = angular.copy($scope.original_assoc);
            }
            $scope.cancel = function(){
                $modalInstance.dismiss('cancel');
            }
            $scope.ok = function(){
                angular.copy($scope.assoc,$scope.original_assoc);
                $modalInstance.close($scope.original_assoc);
            }
        }
        ModalCtrl.$inject = ['$scope','$modalInstance','original_assoc'];        
        return function(original_assoc){
            var dlg = $modal.open({
                template:template,
                controller:ModalCtrl,
                backdrop:'static',
                size:'lg',
                resolve:{
                    original_assoc : function(){return original_assoc}
                }
            });
            return dlg.result;
        }
    }]);
})