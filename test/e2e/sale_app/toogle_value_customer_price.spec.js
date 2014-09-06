var lib = require('./../lib');

describe('sale_app/displaying_scan/toogle_value_customer_price', function() {
    var baseUrl = 'http://127.0.0.1:8000/';
    var ptor = protractor.getInstance();
    var enter_key = protractor.Key.ENTER;

    //service/ui/prompt
    var prompt_txt = element(by.id('service/ui/prompt/prompt_txt'));
    var prompt_ok_btn = element(by.id('service/ui/prompt/ok_btn'));

    //menu
    var action_menu = element(by.id('sale_app/menu/action'));
    var toogle_value_customer_price_menu = element(by.id('sale_app/menu/action/toogle_value_customer_price'))

    //sale page
    var void_btn = element(by.id('sale_app/main_page/void_btn'));
    var tender_btn = element(by.id('sale_app/main_page/tender_btn'));
    var non_inv_btn = element(by.id('sale_app/main_page/non_inventory_btn'));
    var ds_lst = element.all(by.repeater('ds in ds_lst'))
    var name_index = 1;
    var price_index = 2;

    beforeEach(function(){
        lib.auth.login(baseUrl,'1','1');
        browser.get(baseUrl); 
        lib.setup.init_data();
        lib.auth.logout();
    })

    afterEach(function(){
        lib.auth.logout();
    })

    it('can do it',function(){
        lib.auth.login(baseUrl,'1','1');
        browser.get(baseUrl); 

        //create 3 sp
        var sku_1 = '111';var price_1 = 9;var value_price_1 = 8;
        var sku_2 = '222';var price_2 = 10;var value_price_2 = 7;
        var product_name_1 = 'product name 1';
        var product_name_2 = 'product name 2';
        lib.api.insert_new(sku_1,product_name_1,price_1,value_price_1);
        lib.api.insert_new(sku_2,product_name_2,price_2,value_price_2);  

        lib.sale_page.load_this_page();                  

        lib.sale_page.scan(sku_1);
        lib.sale_page.scan(sku_2);
        non_inv_btn.click();
        prompt_txt.sendKeys('3');
        prompt_ok_btn.click();

        expect(tender_btn.getText()).toEqual('$22.00');
        action_menu.click();
        toogle_value_customer_price_menu.click();
        expect(tender_btn.getText()).toEqual('$18.00');
        // console.log(protractor.Key.F5)
        ptor.actions().sendKeys(protractor.Key.F5).perform();
        expect(tender_btn.getText()).toEqual('$22.00');
        ptor.actions().sendKeys(protractor.Key.F5).perform();
        expect(tender_btn.getText()).toEqual('$18.00');   

        //clean up
        void_btn.click();     
    })
});