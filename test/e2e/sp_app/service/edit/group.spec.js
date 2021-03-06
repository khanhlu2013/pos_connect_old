var base_path = './../../../'
var lib = require(base_path + 'lib');


describe('sp page', function() {
    var Sp_page = require(base_path + 'page/sp/Sp_page.js');
    var Sp_info_dlg = require(base_path + 'page/sp/Sp_info_dlg.js');
    var Sp_group_dlg = require(base_path + 'page/sp/edit/Sp_group_dlg.js');
    var Group_search_multiple_dlg = require(base_path + 'page/group/search/Multiple_dlg.js');

    beforeEach(function(){
        lib.auth.login('1','1');
        lib.setup.init_data();
        lib.auth.logout();
    })

    it('can crud sp.group',function(){
        //---------------------------------
        // insert fixture: a sp and a group
        //---------------------------------
        lib.auth.login('1','1');
        //insert sp
        var sku = '111';
        lib.api.insert_new(sku,'aa'/*name*/);
        //insert group
        var group_name = 'my group name';
        lib.api_group.insert_empty_group(group_name);


        //----------------
        // add group to sp
        //----------------
        Sp_page.sku_search(sku);
        expect(Sp_page.lst.count()).toEqual(1);
        expect(Sp_page.get_col(0,'group')).toEqual('')
        Sp_page.click_col(0,'info');
        Sp_info_dlg.switch_tab('group');
        Sp_info_dlg.edit();
        Sp_group_dlg.add();
        expect(Group_search_multiple_dlg.lst.count()).toEqual(1);
        Group_search_multiple_dlg.click_col(0,'select');
        Group_search_multiple_dlg.ok();
        Sp_group_dlg.ok();
        Sp_info_dlg.exit();


        //-----------------
        // verify add group
        //-----------------
        expect(Sp_page.get_col(0,'group')).toEqual('1');
        Sp_page.click_col(0,'info');
        expect(Sp_info_dlg.group_lst.count()).toEqual(1);


        //-------------
        // remove group
        //-------------
        Sp_info_dlg.switch_tab('group')
        Sp_info_dlg.edit();
        expect(Sp_group_dlg.lst.count()).toEqual(1);
        Sp_group_dlg.click_col(0,'remove');    
        Sp_group_dlg.ok();
        Sp_info_dlg.exit();


        //--------------------
        // verify remove group
        //--------------------
        expect(Sp_page.get_col(0,'group')).toEqual('');
        Sp_page.click_col(0,'info');
        Sp_info_dlg.switch_tab('group')
        expect(Sp_info_dlg.group_lst.count()).toEqual(0);


        //---------
        // clean up
        //---------
        Sp_info_dlg.exit();
        lib.auth.logout();
    })
});