define(
[
	'angular'
	//---
    ,'model/group/service/search_dlg'
    ,'model/sp/api_group'
    ,'service/ui'
    ,'service/misc'
]
,function
(
	angular
)
{
	var mod = angular.module('sp/service/edit/group',
    [
         'group/service/search_dlg'
        ,'service/ui'
        ,'sp/api_group'
        ,'service/misc'
    ])

    mod.factory('sp/service/edit/group',
    [
         '$modal'
        ,'group/service/search_dlg/multiple'
        ,'service/ui/alert'
        ,'sp/api_group'
        ,'service/misc'
    ,function(
         $modal
        ,select_multiple_group_service
        ,alert_service
        ,api_group
        ,misc_service
    ){
        var template = 
            '<div class="modal-header">' +
                '<h3 class="modal-title">Group info: {{sp.name}}</h3>' +
            '</div>' +

            '<div class="modal-body">' +   

                '<button id="sp_app/service/edit/group/add_btn" ng-click="add()" class="btn btn-primary"><span class="glyphicon glyphicon-plus"></span></button>' +
                '</br>' +
                '<table ng-hide="sp.group_lst.length==0" class="table table-hover table-bordered table-condensed table-striped">' +
                    '<tr>' +
                        '<th>group</th>' +         
                        '<th>remove</th>' +                
                    '</tr>' +    
                    '<tr ng-repeat="group_edit in sp.group_lst">' +
                        '<td>{{group_edit.name}}</td>' +    
                        '<td class="alncenter"><button ng-click="remove(group_edit)" class="btn btn-danger glyphicon glyphicon-trash"></button></td>' +                                            
                    '</tr>' +                                                  
                '</table>' +
                '<div ng-show="sp.group_lst.length==0">' +
                    '</br>' +
                    '<pre>No group!</pre>' +
                '</div>' +

            '</div>' +

            '<div class="modal-footer">' +          
                '<button class="btn btn-warning" ng-click="cancel()">cancel</button>' + 
                '<button ng-disabled="is_unchange()" class="btn btn-primary" ng-click="reset()">reset</button>' +                               
                '<button id="sp_app/service/edit/group/ok_btn" ng-disabled="is_unchange()||form.$invalid" class="btn btn-success" ng-click="ok()">ok</button>' +
            '</div>'        
        ;    

        var ModalCtrl = function($scope,$modalInstance,$http,original_sp){
            $scope.original_sp = original_sp;
            $scope.sp = angular.copy(original_sp);

            $scope.is_unchange = function() {
                return angular.equals($scope.original_sp, $scope.sp);
            };   
            $scope.add = function(){
                var promise = select_multiple_group_service(true/*allow to select multiple group*/);
                promise.then(function (result_lst) {
                    for(var i = 0;i<result_lst.length;i++){
                        if(misc_service.get_item_from_lst_base_on_id(result_lst[i].id,$scope.sp.group_lst) == null) { 
                            $scope.sp.group_lst.push(result_lst[i]);
                        }
                    }
                }, function () {
                    //do nothing
                });                
            }
            $scope.remove = function(group){
                for(var i = 0;i<$scope.sp.group_lst.length;i++){
                    if($scope.sp.group_lst[i].id === group.id){
                        $scope.sp.group_lst.splice(i,1);
                    }
                }
            };         
            $scope.reset = function(){
                $scope.sp = angular.copy($scope.original_sp)
            };            
            $scope.cancel = function(){
                $modalInstance.dismiss('cancel');
            };
            $scope.ok = function(){
                api_group.update($scope.sp).then(
                    function(data){
                        angular.copy(data,$scope.original_sp);
                        $modalInstance.close($scope.original_sp);
                    },function(reason){
                        alert_service(reason);
                    }
                )
            };
        }
        ModalCtrl.$inject = ['$scope','$modalInstance','$http','original_sp'];
        return function(sp){
            var dlg = $modal.open({
                template: template,
                controller: ModalCtrl,
                backdrop:'static',
                // scope:$scope,
                size: 'lg',
                resolve : {
                    original_sp : function(){return sp}
                }
            });
            return dlg.result;
        }            
    }]);
})