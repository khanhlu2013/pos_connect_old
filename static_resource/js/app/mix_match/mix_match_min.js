define("lib/misc/csrf_ajax_protection_setup",[],function(){return function(){$.ajaxSetup({beforeSend:function(a,b){function c(a){var b=null;if(document.cookie&&document.cookie!=""){var c=document.cookie.split(";");for(var d=0;d<c.length;d++){var e=jQuery.trim(c[d]);if(e.substring(0,a.length+1)==a+"="){b=decodeURIComponent(e.substring(a.length+1));break}}}return b}!/^http:.*/.test(b.url)&&!/^https:.*/.test(b.url)&&a.setRequestHeader("X-CSRFToken",c("csrftoken"))}})}}),function(){function d(a){var c=!1;return function(){if(c)throw new Error("Callback was already called.");c=!0,a.apply(b,arguments)}}var a={},b,c;b=this,b!=null&&(c=b.async),a.noConflict=function(){return b.async=c,a};var e=function(a,b){if(a.forEach)return a.forEach(b);for(var c=0;c<a.length;c+=1)b(a[c],c,a)},f=function(a,b){if(a.map)return a.map(b);var c=[];return e(a,function(a,d,e){c.push(b(a,d,e))}),c},g=function(a,b,c){return a.reduce?a.reduce(b,c):(e(a,function(a,d,e){c=b(c,a,d,e)}),c)},h=function(a){if(Object.keys)return Object.keys(a);var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c);return b};typeof process=="undefined"||!process.nextTick?typeof setImmediate=="function"?(a.nextTick=function(a){setImmediate(a)},a.setImmediate=a.nextTick):(a.nextTick=function(a){setTimeout(a,0)},a.setImmediate=a.nextTick):(a.nextTick=process.nextTick,typeof setImmediate!="undefined"?a.setImmediate=setImmediate:a.setImmediate=a.nextTick),a.each=function(a,b,c){c=c||function(){};if(!a.length)return c();var f=0;e(a,function(e){b(e,d(function(b){b?(c(b),c=function(){}):(f+=1,f>=a.length&&c(null))}))})},a.forEach=a.each,a.eachSeries=function(a,b,c){c=c||function(){};if(!a.length)return c();var d=0,e=function(){b(a[d],function(b){b?(c(b),c=function(){}):(d+=1,d>=a.length?c(null):e())})};e()},a.forEachSeries=a.eachSeries,a.eachLimit=function(a,b,c,d){var e=i(b);e.apply(null,[a,c,d])},a.forEachLimit=a.eachLimit;var i=function(a){return function(b,c,d){d=d||function(){};if(!b.length||a<=0)return d();var e=0,f=0,g=0;(function h(){if(e>=b.length)return d();while(g<a&&f<b.length)f+=1,g+=1,c(b[f-1],function(a){a?(d(a),d=function(){}):(e+=1,g-=1,e>=b.length?d():h())})})()}},j=function(b){return function(){var c=Array.prototype.slice.call(arguments);return b.apply(null,[a.each].concat(c))}},k=function(a,b){return function(){var c=Array.prototype.slice.call(arguments);return b.apply(null,[i(a)].concat(c))}},l=function(b){return function(){var c=Array.prototype.slice.call(arguments);return b.apply(null,[a.eachSeries].concat(c))}},m=function(a,b,c,d){var e=[];b=f(b,function(a,b){return{index:b,value:a}}),a(b,function(a,b){c(a.value,function(c,d){e[a.index]=d,b(c)})},function(a){d(a,e)})};a.map=j(m),a.mapSeries=l(m),a.mapLimit=function(a,b,c,d){return n(b)(a,c,d)};var n=function(a){return k(a,m)};a.reduce=function(b,c,d,e){a.eachSeries(b,function(a,b){d(c,a,function(a,d){c=d,b(a)})},function(a){e(a,c)})},a.inject=a.reduce,a.foldl=a.reduce,a.reduceRight=function(b,c,d,e){var g=f(b,function(a){return a}).reverse();a.reduce(g,c,d,e)},a.foldr=a.reduceRight;var o=function(a,b,c,d){var e=[];b=f(b,function(a,b){return{index:b,value:a}}),a(b,function(a,b){c(a.value,function(c){c&&e.push(a),b()})},function(a){d(f(e.sort(function(a,b){return a.index-b.index}),function(a){return a.value}))})};a.filter=j(o),a.filterSeries=l(o),a.select=a.filter,a.selectSeries=a.filterSeries;var p=function(a,b,c,d){var e=[];b=f(b,function(a,b){return{index:b,value:a}}),a(b,function(a,b){c(a.value,function(c){c||e.push(a),b()})},function(a){d(f(e.sort(function(a,b){return a.index-b.index}),function(a){return a.value}))})};a.reject=j(p),a.rejectSeries=l(p);var q=function(a,b,c,d){a(b,function(a,b){c(a,function(c){c?(d(a),d=function(){}):b()})},function(a){d()})};a.detect=j(q),a.detectSeries=l(q),a.some=function(b,c,d){a.each(b,function(a,b){c(a,function(a){a&&(d(!0),d=function(){}),b()})},function(a){d(!1)})},a.any=a.some,a.every=function(b,c,d){a.each(b,function(a,b){c(a,function(a){a||(d(!1),d=function(){}),b()})},function(a){d(!0)})},a.all=a.every,a.sortBy=function(b,c,d){a.map(b,function(a,b){c(a,function(c,d){c?b(c):b(null,{value:a,criteria:d})})},function(a,b){if(a)return d(a);var c=function(a,b){var c=a.criteria,d=b.criteria;return c<d?-1:c>d?1:0};d(null,f(b.sort(c),function(a){return a.value}))})},a.auto=function(b,c){c=c||function(){};var d=h(b);if(!d.length)return c(null);var f={},i=[],j=function(a){i.unshift(a)},k=function(a){for(var b=0;b<i.length;b+=1)if(i[b]===a){i.splice(b,1);return}},l=function(){e(i.slice(0),function(a){a()})};j(function(){h(f).length===d.length&&(c(null,f),c=function(){})}),e(d,function(d){var i=b[d]instanceof Function?[b[d]]:b[d],m=function(b){var g=Array.prototype.slice.call(arguments,1);g.length<=1&&(g=g[0]);if(b){var i={};e(h(f),function(a){i[a]=f[a]}),i[d]=g,c(b,i),c=function(){}}else f[d]=g,a.setImmediate(l)},n=i.slice(0,Math.abs(i.length-1))||[],o=function(){return g(n,function(a,b){return a&&f.hasOwnProperty(b)},!0)&&!f.hasOwnProperty(d)};if(o())i[i.length-1](m,f);else{var p=function(){o()&&(k(p),i[i.length-1](m,f))};j(p)}})},a.waterfall=function(b,c){c=c||function(){};if(b.constructor!==Array){var d=new Error("First argument to waterfall must be an array of functions");return c(d)}if(!b.length)return c();var e=function(b){return function(d){if(d)c.apply(null,arguments),c=function(){};else{var f=Array.prototype.slice.call(arguments,1),g=b.next();g?f.push(e(g)):f.push(c),a.setImmediate(function(){b.apply(null,f)})}}};e(a.iterator(b))()};var r=function(a,b,c){c=c||function(){};if(b.constructor===Array)a.map(b,function(a,b){a&&a(function(a){var c=Array.prototype.slice.call(arguments,1);c.length<=1&&(c=c[0]),b.call(null,a,c)})},c);else{var d={};a.each(h(b),function(a,c){b[a](function(b){var e=Array.prototype.slice.call(arguments,1);e.length<=1&&(e=e[0]),d[a]=e,c(b)})},function(a){c(a,d)})}};a.parallel=function(b,c){r({map:a.map,each:a.each},b,c)},a.parallelLimit=function(a,b,c){r({map:n(b),each:i(b)},a,c)},a.series=function(b,c){c=c||function(){};if(b.constructor===Array)a.mapSeries(b,function(a,b){a&&a(function(a){var c=Array.prototype.slice.call(arguments,1);c.length<=1&&(c=c[0]),b.call(null,a,c)})},c);else{var d={};a.eachSeries(h(b),function(a,c){b[a](function(b){var e=Array.prototype.slice.call(arguments,1);e.length<=1&&(e=e[0]),d[a]=e,c(b)})},function(a){c(a,d)})}},a.iterator=function(a){var b=function(c){var d=function(){return a.length&&a[c].apply(null,arguments),d.next()};return d.next=function(){return c<a.length-1?b(c+1):null},d};return b(0)},a.apply=function(a){var b=Array.prototype.slice.call(arguments,1);return function(){return a.apply(null,b.concat(Array.prototype.slice.call(arguments)))}};var s=function(a,b,c,d){var e=[];a(b,function(a,b){c(a,function(a,c){e=e.concat(c||[]),b(a)})},function(a){d(a,e)})};a.concat=j(s),a.concatSeries=l(s),a.whilst=function(b,c,d){b()?c(function(e){if(e)return d(e);a.whilst(b,c,d)}):d()},a.doWhilst=function(b,c,d){b(function(e){if(e)return d(e);c()?a.doWhilst(b,c,d):d()})},a.until=function(b,c,d){b()?d():c(function(e){if(e)return d(e);a.until(b,c,d)})},a.doUntil=function(b,c,d){b(function(e){if(e)return d(e);c()?d():a.doUntil(b,c,d)})},a.queue=function(b,c){function f(b,d,f,g){d.constructor!==Array&&(d=[d]),e(d,function(d){var e={data:d,callback:typeof g=="function"?g:null};f?b.tasks.unshift(e):b.tasks.push(e),b.saturated&&b.tasks.length===c&&b.saturated(),a.setImmediate(b.process)})}c===undefined&&(c=1);var g=0,h={tasks:[],concurrency:c,saturated:null,empty:null,drain:null,push:function(a,b){f(h,a,!1,b)},unshift:function(a,b){f(h,a,!0,b)},process:function(){if(g<h.concurrency&&h.tasks.length){var a=h.tasks.shift();h.empty&&h.tasks.length===0&&h.empty(),g+=1;var c=function(){g-=1,a.callback&&a.callback.apply(a,arguments),h.drain&&h.tasks.length+g===0&&h.drain(),h.process()},e=d(c);b(a.data,e)}},length:function(){return h.tasks.length},running:function(){return g}};return h},a.cargo=function(b,c){var d=!1,g=[],h={tasks:g,payload:c,saturated:null,empty:null,drain:null,push:function(b,d){b.constructor!==Array&&(b=[b]),e(b,function(a){g.push({data:a,callback:typeof d=="function"?d:null}),h.saturated&&g.length===c&&h.saturated()}),a.setImmediate(h.process)},process:function i(){if(d)return;if(g.length===0){h.drain&&h.drain();return}var a=typeof c=="number"?g.splice(0,c):g.splice(0),j=f(a,function(a){return a.data});h.empty&&h.empty(),d=!0,b(j,function(){d=!1;var b=arguments;e(a,function(a){a.callback&&a.callback.apply(null,b)}),i()})},length:function(){return g.length},running:function(){return d}};return h};var t=function(a){return function(b){var c=Array.prototype.slice.call(arguments,1);b.apply(null,c.concat([function(b){var c=Array.prototype.slice.call(arguments,1);typeof console!="undefined"&&(b?console.error&&console.error(b):console[a]&&e(c,function(b){console[a](b)}))}]))}};a.log=t("log"),a.dir=t("dir"),a.memoize=function(a,b){var c={},d={};b=b||function(a){return a};var e=function(){var e=Array.prototype.slice.call(arguments),f=e.pop(),g=b.apply(null,e);g in c?f.apply(null,c[g]):g in d?d[g].push(f):(d[g]=[f],a.apply(null,e.concat([function(){c[g]=arguments;var a=d[g];delete d[g];for(var b=0,e=a.length;b<e;b++)a[b].apply(null,arguments)}])))};return e.memo=c,e.unmemoized=a,e},a.unmemoize=function(a){return function(){return(a.unmemoized||a).apply(null,arguments)}},a.times=function(b,c,d){var e=[];for(var f=0;f<b;f++)e.push(f);return a.map(e,c,d)},a.timesSeries=function(b,c,d){var e=[];for(var f=0;f<b;f++)e.push(f);return a.mapSeries(e,c,d)},a.compose=function(){var b=Array.prototype.reverse.call(arguments);return function(){var c=this,d=Array.prototype.slice.call(arguments),e=d.pop();a.reduce(b,d,function(a,b,d){b.apply(c,a.concat([function(){var a=arguments[0],b=Array.prototype.slice.call(arguments,1);d(a,b)}]))},function(a,b){e.apply(c,[a].concat(b))})}};var u=function(a,b){var c=function(){var c=this,d=Array.prototype.slice.call(arguments),e=d.pop();return a(b,function(a,b){a.apply(c,d.concat([b]))},e)};if(arguments.length>2){var d=Array.prototype.slice.call(arguments,2);return c.apply(this,d)}return c};a.applyEach=j(u),a.applyEachSeries=l(u),a.forever=function(a,b){function c(d){if(d){if(b)return b(d);throw d}a(c)}c()},typeof define!="undefined"&&define.amd?define("lib/async",[],function(){return a}):typeof module!="undefined"&&module.exports?module.exports=a:b.async=a}(),define("lib/error_lib",[],function(){function b(a){return a.statusText!=undefined&&a.status!=undefined}function c(a){return a&&typeof a=="string"&&a.indexOf("ERROR_CANCEL_")==0}function d(b){c(b)||(e(b)?alert(a):f(b)?alert(a):alert("There is untreated error:"+b))}function e(a){return b(a)&&a.status==0}function f(a){return a.__proto__&&a.__proto__.name=="unknown_error"&&a.__proto__.message=="Database encountered an unknown error"}var a="Internet is disconnected. Try again later.";return{alert_error:d,is_xhr_obj:b,is_offline_error:e}}),define("lib/number/number",[],function(){function a(a){return+a.toFixed(5)}function b(a){return+a.toFixed(2)}function c(a,b,c){var e=prompt(a,b);return d(e)?parseInt(e):null}function d(a){return parseInt(a)%1==0}function e(a,b,c){var d=prompt(a,b);return d==null?null:h(d)?parseInt(d):(c&&alert(c),null)}function f(a,b,c){var d=prompt(a,b);if(d==null)return null;if(g(d))return parseFloat(d);if(c)return alert(c),null}function g(a){if(a==null)return!1;if(isNaN(a))return!1;var b=parseFloat(a);return b>=0?!0:!1}function h(a){var b=/^\d+$/;return b.test(a)}return{prompt_positive_integer:e,is_positive_integer:h,prompt_positive_double:f,is_positive_double:g,round_2_decimal:b,trim:a,prompt_integer:c}}),define("app/mix_match/mix_match_validator",["lib/number/number"],function(a){function g(g){var h=new Array,i=g.name,j=g.qty,k=g.unit_discount,l=g.mix_match_child_sp_lst;i||h.push(b),(!j||!a.is_positive_integer(j))&&h.push(c),(!k||!a.is_positive_double(k))&&h.push(d);if(l.length==0)h.push(e);else if(l.length>1){var m=l[0];for(var n=1;n<l.length;n++)if(l[n].price!=m.price||l[n].crv!=m.crv||l[n].is_taxable!=m.is_taxable){h.push(f);break}}return h}var b="ERROR_MIX_MATCH_VALIDATION_NAME",c="ERROR_MIX_MATCH_VALIDATION_QTY",d="ERROR_MIX_MATCH_VALIDATION_UNIT_DISCOUNT",e="ERROR_MIX_MATCH_VALIDATION_CHILD_EMPTY",f="ERROR_MIX_MATCH_VALIDATION_CHILD_UNIFORM";return{validate:g,ERROR_MIX_MATCH_VALIDATION_NAME:b,ERROR_MIX_MATCH_VALIDATION_QTY:c,ERROR_MIX_MATCH_VALIDATION_UNIT_DISCOUNT:d,ERROR_MIX_MATCH_VALIDATION_CHILD_EMPTY:e,ERROR_MIX_MATCH_VALIDATION_CHILD_UNIFORM:f}}),define("app/store_product/sp_online_searcher",[],function(){function c(b,c){var b=b.trim();if(!b){c(a);return}$.ajax({url:"/product/search/name_ajax",type:"GET",data:{name_str:b},dataType:"json",success:function(a,b,d){c(null,a.prod_lst)},error:function(a,b,d){c(a)}})}function d(a,c){var a=a.trim();if(!a){c(b);return}$.ajax({url:"/product/search/sku_ajax",type:"GET",data:{sku_str:a},dataType:"json",success:function(a,b,d){c(null,a)},error:function(a,b,d){c(a)}})}var a="NAME_SEARCH_ERROR_EMPTY",b="SKU_SEARCH_ERROR_EMPTY";return{NAME_SEARCH_ERROR_EMPTY:a,SKU_SEARCH_ERROR_EMPTY:b,name_search:c,sku_search:d}}),define("app/product/product_json_helper",[],function(){function a(a,b){var c=null;for(var d=0;d<b.length;d++)if(b[d].product_id==a){c=b[d];break}return c}function b(a,b){var c=null;for(var d=0;d<b.length;d++)if(b[d].product_id==a){c=b[d];break}return c}function c(a,b){var c=null;if(b==null)c=a.store_product_set[0];else for(var d=0;d<a.store_product_set.length;d++){var e=a.store_product_set[d];if(e.store_id==b){c=e;break}}return c}function d(a){return prod_sku_assoc_set=a.prodskuassoc_set,prod_sku_assoc_set==null&&(prod_sku_assoc_set=[]),prod_sku_assoc_set}function e(a,b){var c=!1;for(var d=0;d<b.length;d++)if(b[d].store_id==a){c=!0;break}return c}function f(a,b,c){var d=!1,e=null;for(var f=0;f<b.length;f++)if(b[f].sku_str==c){e=b[f];break}for(var f=0;f<e.store_set.length;f++)if(e.store_set.indexOf(a)!=-1){d=!0;break}return d}function g(a,b,c,d,g){var h=new Array;for(var i=0;i<a.length;i++){var j=a[i],k,l;k=e(b,a[i].store_product_set)==c,g==null?l=!0:l=f(b,a[i].prodskuassoc_set,g)==d,k&&l&&h.push(j)}return h}return{get_prod_sku_assoc_set:d,get_sp_from_p:c,extract_prod_store__prod_sku:g,get_p_from_lst:b,get_sp_from_sp_lst:a}}),define("app/store_product/sp_online_name_search_ui",["lib/async","app/store_product/sp_online_searcher","app/product/product_json_helper"],function(a,b,c){function e(a){$("#product_search_dlg").dialog("close"),a(d)}function f(c){$("#product_search_txt").keypress(function(d){var e=d.keyCode?d.keyCode:d.which;if(e=="13"){var f=$("#product_search_txt").val().trim();if(!f)return;var h=b.name_search.bind(b.name_search,f);a.waterfall([h],function(a,b){a?error_lib.alert_error(a):g(b,c)})}})}function g(a,b){var d=document.getElementById("product_search_tbl");d.innerHTML="";var e,f,g=["product","price","crv","taxable","type","tag","select"];e=d.insertRow(-1);for(var h=0;h<g.length;h++)f=e.insertCell(-1),f.innerHTML=g[h];for(var h=0;h<a.length;h++){var e=d.insertRow(-1),i=null,j=c.get_sp_from_p(a[h],i);f=e.insertCell(-1),f.innerHTML=j.name,f=e.insertCell(-1),f.innerHTML=j.price,f=e.insertCell(-1),f.innerHTML=j.crv,f=e.insertCell(-1),f.innerHTML=j.is_taxable,f=e.insertCell(-1),f.innerHTML=j.p_type,f=e.insertCell(-1),f.innerHTML=j.p_tag,f=e.insertCell(-1),f.innerHTML="select",function(a){f.addEventListener("click",function(){$("#product_search_dlg").dialog("close"),b(null,a)})}(j)}}function h(a){var b=e.bind(e,a);$("#product_search_dlg").dialog({title:"search product",buttons:[{text:"exit",click:b}],modal:!0,width:800,height:500}),f(a),$("#product_search_txt").val(""),g([],a),$("#product_search_dlg").dialog("open")}var d="ERROR_CANCEL_product_search_exit_button_press";return{exe:h,ERROR_CANCEL_product_search_exit_button_press:d}}),define("app/mix_match/mix_match_util",["app/mix_match/mix_match_validator"],function(a){function b(b,c){var d=a.validate(b);if(d.indexOf(a.ERROR_MIX_MATCH_VALIDATION_QTY)!=-1||d.indexOf(a.ERROR_MIX_MATCH_VALIDATION_UNIT_DISCOUNT)!=-1||d.indexOf(a.ERROR_MIX_MATCH_VALIDATION_CHILD_EMPTY)!=-1||d.indexOf(a.ERROR_MIX_MATCH_VALIDATION_CHILD_UNIFORM)!=-1)return null;var e=Number(b.mix_match_child_sp_lst[0].price),f=Number(b.mix_match_child_sp_lst[0].crv),g=b.mix_match_child_sp_lst[0].is_taxable,h=Number(b.unit_discount),i=Number(b.qty),j=e+f-h,k=g?j*c/100:0;return(j+k)*i}function c(a){var b="";for(var c=0;c<a.length;c++)b+=","+a[c].product_id;return b.substr(1)}return{get_comma_separated_pid_lst:c,calculate_total_price:b}}),define("app/mix_match/mix_match_prompt",["lib/async","app/mix_match/mix_match_validator","app/store_product/sp_online_name_search_ui","lib/error_lib","app/product/product_json_helper","app/mix_match/mix_match_util"],function(a,b,c,d,e,f){function k(){var a=r(),c=b.validate(a);p(c),price=f.calculate_total_price(a,j),$("#mix_match_total_price_txt").val(price)}function l(a){$("#mix_match_prompt_dlg").dialog("close"),a(g)}function m(a){var c=r(),d=b.validate(c);d.length==0?($("#mix_match_prompt_dlg").dialog("close"),a(null,c)):(p(d),price=f.calculate_total_price(c,j),$("#mix_match_total_price_txt").val(price))}function n(a){$("#mix_match_add_child_btn").off("click").click(o),$("#mix_match_qty_txt").keypress(function(a){var b=a.keyCode?a.keyCode:a.which;b=="13"&&k()}),$("#mix_match_unit_discount_txt").keypress(function(a){var b=a.keyCode?a.keyCode:a.which;b=="13"&&k()})}function o(){a.waterfall([c.exe],function(a,b){if(a){d.alert_error(a);return}var c=b;e.get_sp_from_sp_lst(c.product_id,i)==null?(i.push(c),t(),k()):alert("product is already in list")})}function p(a){$("#mix_match_name_txt").removeClass("error"),$("#mix_match_qty_txt").removeClass("error"),$("#mix_match_unit_discount_txt").removeClass("error"),$("label[for='mix_match_child_tbl']").removeClass("error"),$("label[for='mix_match_child_tbl']").text("items"),a.indexOf(b.ERROR_MIX_MATCH_VALIDATION_NAME)!=-1&&$("#mix_match_name_txt").addClass("error"),a.indexOf(b.ERROR_MIX_MATCH_VALIDATION_QTY)!=-1&&$("#mix_match_qty_txt").addClass("error"),a.indexOf(b.ERROR_MIX_MATCH_VALIDATION_UNIT_DISCOUNT)!=-1&&$("#mix_match_unit_discount_txt").addClass("error"),a.indexOf(b.ERROR_MIX_MATCH_VALIDATION_CHILD_EMPTY)!=-1&&($("label[for='mix_match_child_tbl']").addClass("error"),$("label[for='mix_match_child_tbl']").text("items is emtpy")),a.indexOf(b.ERROR_MIX_MATCH_VALIDATION_CHILD_UNIFORM)!=-1&&($("label[for='mix_match_child_tbl']").addClass("error"),$("label[for='mix_match_child_tbl']").text("items must have same price,crv,taxable"))}function q(a){var b="mix match",c=m.bind(m,a),d=l.bind(l,a);$("#mix_match_prompt_dlg").dialog({title:b,buttons:[{text:"Ok",click:c},{text:"Cancel",click:d}],modal:!0,width:600,heigh:400}),$("#mix_match_prompt_dlg").dialog("open")}function r(){var a=$("#mix_match_name_txt").val(),b=$("#mix_match_qty_txt").val(),c=$("#mix_match_unit_discount_txt").val(),d={name:a,qty:b,unit_discount:c,mix_match_child_sp_lst:i};return d}function s(a){if(!confirm("remove item?"))return;i.splice(a,1),t(),k()}function t(){h.innerHTML="";var a,b;a=h.insertRow(-1);var c=["name","reg price","crv","is_taxable","remove"];for(var d=0;d<c.length;d++)b=a.insertCell(-1),b.innerHTML=c[d];for(var d=0;d<i.length;d++){a=h.insertRow(-1);var e=i[d];b=a.insertCell(-1),b.innerHTML=e.name,b=a.insertCell(-1),b.innerHTML=e.price,b=a.insertCell(-1),b.innerHTML=e.crv,b=a.insertCell(-1),b.innerHTML=e.is_taxable,b=a.insertCell(-1),b.innerHTML="remove",function(a){b.addEventListener("click",function(){s(a)})}(d)}}function u(a,b,c,d,e,g){j=e,n(g),$("#mix_match_name_txt").val(a),$("#mix_match_qty_txt").val(b),$("#mix_match_unit_discount_txt").val(c),i=d,t(),result=r(),price=f.calculate_total_price(result,j),$("#mix_match_total_price_txt").val(price),p([]),q(g)}var g="ERROR_CANCEL_MIX_MATCH_PROMPT",h=document.getElementById("mix_match_child_tbl"),i=[],j=null;return{ERROR_CANCEL_MIX_MATCH_PROMPT:g,exe:u}}),define("app/mix_match/mix_match_online_inserter",["lib/async","app/mix_match/mix_match_validator","app/mix_match/mix_match_util"],function(a,b,c){function e(a,e){var f=b.validate(a);if(f.length!=0){e(d);return}var g=c.get_comma_separated_pid_lst(a.mix_match_child_sp_lst),h={name:a.name,qty:a.qty,unit_discount:a.unit_discount,pid_comma_separated_lst_str:g};$.ajax({url:"/mix_match/insert",type:"POST",dataType:"json",data:h,success:function(a,b,c){e(null,a)},error:function(a,b,c){e(a)}})}var d="ERROR_MIX_MATCH_VALIDATION_FAIL";return{exe:e,ERROR_MIX_MATCH_VALIDATION_FAIL:d}}),define("app/mix_match/mix_match_online_updator",["lib/async","app/mix_match/mix_match_validator","app/mix_match/mix_match_util"],function(a,b,c){function e(a,e,f){var g=b.validate(e);if(g.length!=0){f(d);return}var h=c.get_comma_separated_pid_lst(e.mix_match_child_sp_lst),i={id:a,name:e.name,qty:e.qty,unit_discount:e.unit_discount,pid_comma_separated_lst_str:h};$.ajax({url:"/mix_match/update",type:"POST",dataType:"json",data:i,success:function(a,b,c){f(null,a)},error:function(a,b,c){f(a)}})}var d="ERROR_MIX_MATCH_VALIDATION_FAIL";return{exe:e,ERROR_MIX_MATCH_VALIDATION_FAIL:d}}),requirejs.config({baseUrl:STATIC_URL+"js",paths:{app:"app",lib:"lib"}}),require(["lib/misc/csrf_ajax_protection_setup","lib/async","lib/error_lib","app/mix_match/mix_match_prompt","app/mix_match/mix_match_online_inserter","app/mix_match/mix_match_online_updator"],function(a,b,c,d,e,f){function j(a,b){for(var c=0;c<a.length;c++)if(a[c].id==b.id){a[c]=b;break}}function k(a){var e=h[a],i=[];for(var k=0;k<e.mix_match_child_set.length;k++)i.push(e.mix_match_child_set[k].store_product);var l=d.exe.bind(d.exe,e.name,e.qty,e.unit_discount,i,g);b.waterfall([l],function(a,d){if(a){c.alert_error(a);return}var g=f.exe.bind(f.exe,e.id,d);b.waterfall([g],function(a,b){if(a){c.alert_error(a);return}j(h,b),m()})})}function l(){var a=d.exe.bind(d.exe,null,null,null,[],g);b.waterfall([a],function(a,d){if(a){c.alert_error(a);return}var f=e.exe.bind(e.exe,d);b.waterfall([f],function(a,b){if(a){c.alert_error(a);return}h.push(b),m()})})}function m(){i.innerHTML="";var a,b;a=i.insertRow(-1);var c=["name","qty","unit_discount","out_the_door_price","edit"];for(var d=0;d<c.length;d++)b=a.insertCell(-1),b.innerHTML=c[d];for(var d=0;d<h.length;d++){a=i.insertRow(-1);var e=h[d];b=a.insertCell(-1),b.innerHTML=e.name,b=a.insertCell(-1),b.innerHTML=e.qty,b=a.insertCell(-1),b.innerHTML=e.unit_discount,b=a.insertCell(-1),b.innerHTML="xx",b=a.insertCell(-1),b.innerHTML="edit",function(a){b.addEventListener("click",function(){k(a)})}(d)}}var g=MY_TAX_RATE,h=MY_MIX_MATCH_LST,i=document.getElementById("mix_match_tbl");a(),$("#add_mix_match_btn").off("click").click(l),m()}),define("app/mix_match/mix_match",function(){})