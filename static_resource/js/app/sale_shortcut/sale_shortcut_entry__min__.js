define("lib/misc/csrf_ajax_protection_setup",[],function(){return function(){$.ajaxSetup({beforeSend:function(e,t){function n(e){var t=null;if(document.cookie&&document.cookie!=""){var n=document.cookie.split(";");for(var r=0;r<n.length;r++){var i=jQuery.trim(n[r]);if(i.substring(0,e.length+1)==e+"="){t=decodeURIComponent(i.substring(e.length+1));break}}}return t}!/^http:.*/.test(t.url)&&!/^https:.*/.test(t.url)&&e.setRequestHeader("X-CSRFToken",n("csrftoken"))}})}}),function(){function r(e){var n=!1;return function(){if(n)throw new Error("Callback was already called.");n=!0,e.apply(t,arguments)}}var e={},t,n;t=this,t!=null&&(n=t.async),e.noConflict=function(){return t.async=n,e};var i=function(e,t){if(e.forEach)return e.forEach(t);for(var n=0;n<e.length;n+=1)t(e[n],n,e)},s=function(e,t){if(e.map)return e.map(t);var n=[];return i(e,function(e,r,i){n.push(t(e,r,i))}),n},o=function(e,t,n){return e.reduce?e.reduce(t,n):(i(e,function(e,r,i){n=t(n,e,r,i)}),n)},u=function(e){if(Object.keys)return Object.keys(e);var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(n);return t};typeof process=="undefined"||!process.nextTick?typeof setImmediate=="function"?(e.nextTick=function(e){setImmediate(e)},e.setImmediate=e.nextTick):(e.nextTick=function(e){setTimeout(e,0)},e.setImmediate=e.nextTick):(e.nextTick=process.nextTick,typeof setImmediate!="undefined"?e.setImmediate=setImmediate:e.setImmediate=e.nextTick),e.each=function(e,t,n){n=n||function(){};if(!e.length)return n();var s=0;i(e,function(i){t(i,r(function(t){t?(n(t),n=function(){}):(s+=1,s>=e.length&&n(null))}))})},e.forEach=e.each,e.eachSeries=function(e,t,n){n=n||function(){};if(!e.length)return n();var r=0,i=function(){t(e[r],function(t){t?(n(t),n=function(){}):(r+=1,r>=e.length?n(null):i())})};i()},e.forEachSeries=e.eachSeries,e.eachLimit=function(e,t,n,r){var i=a(t);i.apply(null,[e,n,r])},e.forEachLimit=e.eachLimit;var a=function(e){return function(t,n,r){r=r||function(){};if(!t.length||e<=0)return r();var i=0,s=0,o=0;(function u(){if(i>=t.length)return r();while(o<e&&s<t.length)s+=1,o+=1,n(t[s-1],function(e){e?(r(e),r=function(){}):(i+=1,o-=1,i>=t.length?r():u())})})()}},f=function(t){return function(){var n=Array.prototype.slice.call(arguments);return t.apply(null,[e.each].concat(n))}},l=function(e,t){return function(){var n=Array.prototype.slice.call(arguments);return t.apply(null,[a(e)].concat(n))}},c=function(t){return function(){var n=Array.prototype.slice.call(arguments);return t.apply(null,[e.eachSeries].concat(n))}},h=function(e,t,n,r){var i=[];t=s(t,function(e,t){return{index:t,value:e}}),e(t,function(e,t){n(e.value,function(n,r){i[e.index]=r,t(n)})},function(e){r(e,i)})};e.map=f(h),e.mapSeries=c(h),e.mapLimit=function(e,t,n,r){return p(t)(e,n,r)};var p=function(e){return l(e,h)};e.reduce=function(t,n,r,i){e.eachSeries(t,function(e,t){r(n,e,function(e,r){n=r,t(e)})},function(e){i(e,n)})},e.inject=e.reduce,e.foldl=e.reduce,e.reduceRight=function(t,n,r,i){var o=s(t,function(e){return e}).reverse();e.reduce(o,n,r,i)},e.foldr=e.reduceRight;var d=function(e,t,n,r){var i=[];t=s(t,function(e,t){return{index:t,value:e}}),e(t,function(e,t){n(e.value,function(n){n&&i.push(e),t()})},function(e){r(s(i.sort(function(e,t){return e.index-t.index}),function(e){return e.value}))})};e.filter=f(d),e.filterSeries=c(d),e.select=e.filter,e.selectSeries=e.filterSeries;var v=function(e,t,n,r){var i=[];t=s(t,function(e,t){return{index:t,value:e}}),e(t,function(e,t){n(e.value,function(n){n||i.push(e),t()})},function(e){r(s(i.sort(function(e,t){return e.index-t.index}),function(e){return e.value}))})};e.reject=f(v),e.rejectSeries=c(v);var m=function(e,t,n,r){e(t,function(e,t){n(e,function(n){n?(r(e),r=function(){}):t()})},function(e){r()})};e.detect=f(m),e.detectSeries=c(m),e.some=function(t,n,r){e.each(t,function(e,t){n(e,function(e){e&&(r(!0),r=function(){}),t()})},function(e){r(!1)})},e.any=e.some,e.every=function(t,n,r){e.each(t,function(e,t){n(e,function(e){e||(r(!1),r=function(){}),t()})},function(e){r(!0)})},e.all=e.every,e.sortBy=function(t,n,r){e.map(t,function(e,t){n(e,function(n,r){n?t(n):t(null,{value:e,criteria:r})})},function(e,t){if(e)return r(e);var n=function(e,t){var n=e.criteria,r=t.criteria;return n<r?-1:n>r?1:0};r(null,s(t.sort(n),function(e){return e.value}))})},e.auto=function(t,n){n=n||function(){};var r=u(t);if(!r.length)return n(null);var s={},a=[],f=function(e){a.unshift(e)},l=function(e){for(var t=0;t<a.length;t+=1)if(a[t]===e){a.splice(t,1);return}},c=function(){i(a.slice(0),function(e){e()})};f(function(){u(s).length===r.length&&(n(null,s),n=function(){})}),i(r,function(r){var a=t[r]instanceof Function?[t[r]]:t[r],h=function(t){var o=Array.prototype.slice.call(arguments,1);o.length<=1&&(o=o[0]);if(t){var a={};i(u(s),function(e){a[e]=s[e]}),a[r]=o,n(t,a),n=function(){}}else s[r]=o,e.setImmediate(c)},p=a.slice(0,Math.abs(a.length-1))||[],d=function(){return o(p,function(e,t){return e&&s.hasOwnProperty(t)},!0)&&!s.hasOwnProperty(r)};if(d())a[a.length-1](h,s);else{var v=function(){d()&&(l(v),a[a.length-1](h,s))};f(v)}})},e.waterfall=function(t,n){n=n||function(){};if(t.constructor!==Array){var r=new Error("First argument to waterfall must be an array of functions");return n(r)}if(!t.length)return n();var i=function(t){return function(r){if(r)n.apply(null,arguments),n=function(){};else{var s=Array.prototype.slice.call(arguments,1),o=t.next();o?s.push(i(o)):s.push(n),e.setImmediate(function(){t.apply(null,s)})}}};i(e.iterator(t))()};var g=function(e,t,n){n=n||function(){};if(t.constructor===Array)e.map(t,function(e,t){e&&e(function(e){var n=Array.prototype.slice.call(arguments,1);n.length<=1&&(n=n[0]),t.call(null,e,n)})},n);else{var r={};e.each(u(t),function(e,n){t[e](function(t){var i=Array.prototype.slice.call(arguments,1);i.length<=1&&(i=i[0]),r[e]=i,n(t)})},function(e){n(e,r)})}};e.parallel=function(t,n){g({map:e.map,each:e.each},t,n)},e.parallelLimit=function(e,t,n){g({map:p(t),each:a(t)},e,n)},e.series=function(t,n){n=n||function(){};if(t.constructor===Array)e.mapSeries(t,function(e,t){e&&e(function(e){var n=Array.prototype.slice.call(arguments,1);n.length<=1&&(n=n[0]),t.call(null,e,n)})},n);else{var r={};e.eachSeries(u(t),function(e,n){t[e](function(t){var i=Array.prototype.slice.call(arguments,1);i.length<=1&&(i=i[0]),r[e]=i,n(t)})},function(e){n(e,r)})}},e.iterator=function(e){var t=function(n){var r=function(){return e.length&&e[n].apply(null,arguments),r.next()};return r.next=function(){return n<e.length-1?t(n+1):null},r};return t(0)},e.apply=function(e){var t=Array.prototype.slice.call(arguments,1);return function(){return e.apply(null,t.concat(Array.prototype.slice.call(arguments)))}};var y=function(e,t,n,r){var i=[];e(t,function(e,t){n(e,function(e,n){i=i.concat(n||[]),t(e)})},function(e){r(e,i)})};e.concat=f(y),e.concatSeries=c(y),e.whilst=function(t,n,r){t()?n(function(i){if(i)return r(i);e.whilst(t,n,r)}):r()},e.doWhilst=function(t,n,r){t(function(i){if(i)return r(i);n()?e.doWhilst(t,n,r):r()})},e.until=function(t,n,r){t()?r():n(function(i){if(i)return r(i);e.until(t,n,r)})},e.doUntil=function(t,n,r){t(function(i){if(i)return r(i);n()?r():e.doUntil(t,n,r)})},e.queue=function(t,n){function s(t,r,s,o){r.constructor!==Array&&(r=[r]),i(r,function(r){var i={data:r,callback:typeof o=="function"?o:null};s?t.tasks.unshift(i):t.tasks.push(i),t.saturated&&t.tasks.length===n&&t.saturated(),e.setImmediate(t.process)})}n===undefined&&(n=1);var o=0,u={tasks:[],concurrency:n,saturated:null,empty:null,drain:null,push:function(e,t){s(u,e,!1,t)},unshift:function(e,t){s(u,e,!0,t)},process:function(){if(o<u.concurrency&&u.tasks.length){var e=u.tasks.shift();u.empty&&u.tasks.length===0&&u.empty(),o+=1;var n=function(){o-=1,e.callback&&e.callback.apply(e,arguments),u.drain&&u.tasks.length+o===0&&u.drain(),u.process()},i=r(n);t(e.data,i)}},length:function(){return u.tasks.length},running:function(){return o}};return u},e.cargo=function(t,n){var r=!1,o=[],u={tasks:o,payload:n,saturated:null,empty:null,drain:null,push:function(t,r){t.constructor!==Array&&(t=[t]),i(t,function(e){o.push({data:e,callback:typeof r=="function"?r:null}),u.saturated&&o.length===n&&u.saturated()}),e.setImmediate(u.process)},process:function a(){if(r)return;if(o.length===0){u.drain&&u.drain();return}var e=typeof n=="number"?o.splice(0,n):o.splice(0),f=s(e,function(e){return e.data});u.empty&&u.empty(),r=!0,t(f,function(){r=!1;var t=arguments;i(e,function(e){e.callback&&e.callback.apply(null,t)}),a()})},length:function(){return o.length},running:function(){return r}};return u};var b=function(e){return function(t){var n=Array.prototype.slice.call(arguments,1);t.apply(null,n.concat([function(t){var n=Array.prototype.slice.call(arguments,1);typeof console!="undefined"&&(t?console.error&&console.error(t):console[e]&&i(n,function(t){console[e](t)}))}]))}};e.log=b("log"),e.dir=b("dir"),e.memoize=function(e,t){var n={},r={};t=t||function(e){return e};var i=function(){var i=Array.prototype.slice.call(arguments),s=i.pop(),o=t.apply(null,i);o in n?s.apply(null,n[o]):o in r?r[o].push(s):(r[o]=[s],e.apply(null,i.concat([function(){n[o]=arguments;var e=r[o];delete r[o];for(var t=0,i=e.length;t<i;t++)e[t].apply(null,arguments)}])))};return i.memo=n,i.unmemoized=e,i},e.unmemoize=function(e){return function(){return(e.unmemoized||e).apply(null,arguments)}},e.times=function(t,n,r){var i=[];for(var s=0;s<t;s++)i.push(s);return e.map(i,n,r)},e.timesSeries=function(t,n,r){var i=[];for(var s=0;s<t;s++)i.push(s);return e.mapSeries(i,n,r)},e.compose=function(){var t=Array.prototype.reverse.call(arguments);return function(){var n=this,r=Array.prototype.slice.call(arguments),i=r.pop();e.reduce(t,r,function(e,t,r){t.apply(n,e.concat([function(){var e=arguments[0],t=Array.prototype.slice.call(arguments,1);r(e,t)}]))},function(e,t){i.apply(n,[e].concat(t))})}};var w=function(e,t){var n=function(){var n=this,r=Array.prototype.slice.call(arguments),i=r.pop();return e(t,function(e,t){e.apply(n,r.concat([t]))},i)};if(arguments.length>2){var r=Array.prototype.slice.call(arguments,2);return n.apply(this,r)}return n};e.applyEach=f(w),e.applyEachSeries=c(w),e.forever=function(e,t){function n(r){if(r){if(t)return t(r);throw r}e(n)}n()},typeof define!="undefined"&&define.amd?define("lib/async",[],function(){return e}):typeof module!="undefined"&&module.exports?module.exports=e:t.async=e}(),define("app/sale_shortcut/parent_name_setter",[],function(){return function(e,t,n){var r={name:e,position:t};$.ajax({url:"/sale_shortcut/set_parent_name",type:"POST",dataType:"json",data:r,success:function(e,t,r){n(null,e)},error:function(e,t,r){n(e)}})}}),define("app/store_product/sp_online_searcher",[],function(){function n(t,n){var t=t.trim();if(!t){n(e);return}$.ajax({url:"/product/search_by_name",type:"GET",data:{name_str:t},dataType:"json",success:function(e,t,r){n(null,e.prod_lst)},error:function(e,t,r){n(e)}})}function r(e,n){var e=e.trim();if(!e){n(t);return}$.ajax({url:"/product/search_by_sku",type:"GET",data:{sku_str:e},dataType:"json",success:function(e,t,r){n(null,e)},error:function(e,t,r){n(e)}})}var e="NAME_SEARCH_ERROR_EMPTY",t="SKU_SEARCH_ERROR_EMPTY";return{NAME_SEARCH_ERROR_EMPTY:e,SKU_SEARCH_ERROR_EMPTY:t,name_search:n,sku_search:r}}),define("app/product/product_json_helper",[],function(){function e(e,t){var n=null;for(var r=0;r<t.length;r++)if(t[r].product_id==e){n=t[r];break}return n}function t(e,t){var n=null;for(var r=0;r<t.length;r++)if(t[r].product_id==e){n=t[r];break}return n}function n(e,t){var n=null;if(t==null)n=e.store_product_set[0];else for(var r=0;r<e.store_product_set.length;r++){var i=e.store_product_set[r];if(i.store_id==t){n=i;break}}return n}function r(e){return prod_sku_assoc_set=e.prodskuassoc_set,prod_sku_assoc_set==null&&(prod_sku_assoc_set=[]),prod_sku_assoc_set}function i(e,t){var n=!1;for(var r=0;r<t.length;r++)if(t[r].store_id==e){n=!0;break}return n}function s(e,t,n){var r=!1,i=null;for(var s=0;s<t.length;s++)if(t[s].sku_str==n){i=t[s];break}for(var s=0;s<i.store_set.length;s++)if(i.store_set.indexOf(e)!=-1){r=!0;break}return r}function o(e,t,n,r,o){var u=new Array;for(var a=0;a<e.length;a++){var f=e[a],l,c;l=i(t,e[a].store_product_set)==n,o==null?c=!0:c=s(t,e[a].prodskuassoc_set,o)==r,l&&c&&u.push(f)}return u}return{get_prod_sku_assoc_set:r,get_sp_from_p:n,extract_prod_store__prod_sku:o,get_p_from_lst:t,get_sp_from_sp_lst:e}}),define("lib/error_lib",[],function(){function t(e){return e.statusText!=undefined&&e.status!=undefined}function n(e){return e&&typeof e=="string"&&e.indexOf("ERROR_CANCEL_")==0}function r(t){n(t)||(i(t)?alert(e):s(t)?alert(e):alert("There is untreated error:"+t))}function i(e){return t(e)&&e.status==0}function s(e){return e.__proto__&&e.__proto__.name=="unknown_error"&&e.__proto__.message=="Database encountered an unknown error"}var e="Internet is disconnected. Try again later.";return{alert_error:r,is_xhr_obj:t,is_offline_error:i}}),define("app/store_product/sp_online_name_search_ui",["lib/async","app/store_product/sp_online_searcher","app/product/product_json_helper","lib/error_lib"],function(e,t,n,r){function s(e){$("#product_search_dlg").dialog("close"),e(i)}function o(n){$("#product_search_txt").keypress(function(i){var s=i.keyCode?i.keyCode:i.which;if(s=="13"){var o=$("#product_search_txt").val().trim();if(!o)return;var a=t.name_search.bind(t.name_search,o);e.waterfall([a],function(e,t){e?r.alert_error(e):u(t,n)})}})}function u(e,t){var r=document.getElementById("product_search_tbl");r.innerHTML="";var i,s,o=["product","price","crv","taxable","type","tag","select"];i=r.insertRow(-1);for(var u=0;u<o.length;u++)s=i.insertCell(-1),s.innerHTML=o[u];for(var u=0;u<e.length;u++){var i=r.insertRow(-1),a=null,f=n.get_sp_from_p(e[u],a);s=i.insertCell(-1),s.innerHTML=f.name,s=i.insertCell(-1),s.innerHTML=f.price,s=i.insertCell(-1),s.innerHTML=f.crv,s=i.insertCell(-1),s.innerHTML=f.is_taxable,s=i.insertCell(-1),s.innerHTML=f.p_type,s=i.insertCell(-1),s.innerHTML=f.p_tag,s=i.insertCell(-1),s.innerHTML="select",function(e){s.addEventListener("click",function(){$("#product_search_dlg").dialog("close"),t(null,e)})}(f)}}function a(e){var t=s.bind(s,e);$("#product_search_dlg").dialog({title:"search product",buttons:[{text:"exit",click:t}],modal:!0,width:800,height:500}),o(e),$("#product_search_txt").val(""),u([],e),$("#product_search_dlg").dialog("open")}var i="ERROR_CANCEL_product_search_exit_button_press";return{exe:a,ERROR_CANCEL_product_search_exit_button_press:i}}),define("app/sale_shortcut/child_info_prompt",["lib/async","app/store_product/sp_online_searcher","app/store_product/sp_online_name_search_ui","lib/error_lib"],function(e,t,n,r){function u(e){if(i==null){alert("Product is emtpy. Please select product.");return}var t=$("#child_caption_txt").val().trim();if(t.length==0){alert("Caption is emtpy. Please enter caption.");return}$("#child_info_prompt_dlg").dialog("close");var n={pid:i,caption:t};e(null,n)}function a(e){$("#child_info_prompt_dlg").dialog("close"),e(s)}function f(e){$("#child_info_prompt_dlg").dialog("close"),e(o)}function l(e){var t=u.bind(u,e),n=a.bind(a,e),r=f.bind(f,e);$("#child_info_prompt_dlg").dialog({title:"shortcut setup",buttons:[{text:"ok",click:t},{text:"remove",click:r},{text:"cancel",click:n}],width:500,height:250,modal:!0})}function c(){e.waterfall([n.exe],function(e,t){if(e){r.alert_error(e);return}var n=t;i=n.product_id,$("#product_name_txt").val(n.name)})}function h(e,t,n,r){i=n,l(r),$("#product_search_btn").off("click").click(c),$("#child_caption_txt").val(e),$("#product_name_txt").val(t),$("#child_info_prompt_dlg").dialog("open")}var i=null,s="ERROR_CANCEL_shortcut_setup_cancel",o="ERROR_remove_button_pressed";return{exe:h,ERROR_CANCEL_shortcut_setup_cancel:s,ERROR_remove_button_pressed:o}}),define("app/sale_shortcut/sale_shortcut_util",[],function(){function e(e,t){var n=null;for(var r=0;r<t.length;r++)if(t[r].position==e){n=t[r];break}return n}function t(e,t){var n=null;for(var r=0;r<e.child_set.length;r++)if(e.child_set[r].position==t){n=e.child_set[r];break}return n}return{get_parent:e,get_child:t}}),requirejs.config({baseUrl:STATIC_URL+"js",paths:{app:"app",lib:"lib"}}),require(["lib/misc/csrf_ajax_protection_setup","lib/async","app/sale_shortcut/parent_name_setter","app/sale_shortcut/child_info_prompt","app/sale_shortcut/sale_shortcut_util","lib/error_lib"],function(e,t,n,r,i,s){function f(e,t){for(var n=0;n<e.length;n++)if(e[n].position==t.position){e[n]=t;return}e.push(t)}function l(e){var r=i.get_parent(e,o),u=prompt("Enter name",r==null?"":r.caption);if(u==null)return;var a=n.bind(n,u,e);t.waterfall([a],function(e,t){e?s.alert_error(e):(f(o,t),d())})}function c(e){var n=null,a=i.get_parent(u,o);a!=null&&(n=i.get_child(a,e));var l=null,c=null,h=null;n!=null&&(l=n.caption,c=n.product_name,h=n.pid);var p=r.exe.bind(r.exe,l,c,h);t.waterfall([p],function(t,i){if(t)t==r.ERROR_remove_button_pressed?n!=null&&alert("remove code go here"):s.alert_error(t);else{var a={parent_position:u,child_position:e,child_caption:i.caption,product_id:i.pid};$.ajax({url:"/sale_shortcut/set_child_info",type:"POST",dataType:"json",data:a,success:function(e,t,n){f(o,e),d()},error:function(e,t,n){alert(e)}})}})}function h(e,t){var n=i.get_parent(t,o);td=e.insertCell(-1),td.innerHTML=n==null?null:n.caption,td.addEventListener("click",function(){u=t,d()}),td=e.insertCell(-1),td.innerHTML="edit",td.addEventListener("click",function(){l(t)})}function p(e,t){var n=i.get_parent(u,o);for(var r=0;r<COLUMN_COUNT;r++){td=e.insertCell(-1);var s=COLUMN_COUNT*t+r;if(n!=null){var a=i.get_child(n,s);a!=null&&(td.innerHTML=a.caption)}var f=c.bind(c,s);td.addEventListener("click",f)}}function d(){a.innerHTML="";for(var e=0;e<ROW_COUNT;e++){var t=a.insertRow(-1);h(t,e),p(t,e),h(t,e+ROW_COUNT)}}var o=MY_SHORTCUT_LST,u=0,a=document.getElementById("shortcut_tbl");e(),d()}),define("app/sale_shortcut/sale_shortcut",function(){}),requirejs.config({baseUrl:STATIC_URL+"js",paths:{app:"app",lib:"lib",jquery:["//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min","lib/jquery/jquery-1.11.0.min"],jquery_ui:["//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min","lib/jquery/jquery-ui-1.10.4.min"],jquery_block_ui:["//cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.66.0-2013.10.09/jquery.blockUI.min","lib/jquery/jquery.blockUI"]}}),requirejs(["app/sale_shortcut/sale_shortcut"]),define("app/sale_shortcut/sale_shortcut_entry",function(){});