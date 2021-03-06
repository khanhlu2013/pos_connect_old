var base_path = './../../';
var lib = require(base_path + 'lib');

describe('tax app', function() {
    var Ui_prompt_dlg = require(base_path + 'page/ui/Prompt_dlg.js');
    var Sp_page = require(base_path + 'page/sp/Sp_page.js');

    beforeEach(function(){
        lib.auth.login('1','1');
        lib.setup.init_data();
        lib.auth.logout();
    })

    it('can edit tax',function(){
        lib.auth.login('1','1');
        Sp_page.menu_setting_tax();
        var tax = 9.725;
        Ui_prompt_dlg.set_prompt(tax);
        Ui_prompt_dlg.ok();lib.wait_for_block_ui();
        Sp_page.menu_setting_tax();
        expect(Ui_prompt_dlg.get_prompt()).toEqual(tax.toString());
        Ui_prompt_dlg.cancel();
        // lib.auth.logout();        
    })
});