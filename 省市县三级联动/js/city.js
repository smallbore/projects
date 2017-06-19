
var cityjson ; 

$(function() {
  //load city.json
//function ajaxCall(fn){
//	$.ajaxSettings.async = false; //设置getJson同步
//	$.getJSON('js/city.json',function(data){
//	    fn(data);
//	});
//	$.ajaxSettings.async = true; //设置getJson异步
//}
//
//
//ajaxCall(function(data){
//	cityjson = data;
//})

	$.getJSON('js/city.json',function(data){
		cityjson = data;
		var sb = new StringBuffer();
	  	$.each(cityjson,
	    function(i, val) {
	      if (val.item_code.substr(2, 4) == '0000') {
	        sb.append("<option value='" + val.item_code + "'>" + val.item_name + "</option>");
	      }
	    });
	  $("#choosePro").after(sb.toString());
	});
});

// 省值变化时 处理市
function doProvAndCityRelation() {

  var city = $("#citys");
  var county = $("#county");
  if (city.children().length > 1) {
    city.empty();
  }
  if (county.children().length > 1) {
    county.empty();
  }
  if ($("#chooseCity").length === 0) {
    city.append("<option id='chooseCity' value='-1'>请选择您所在城市</option>");
  }
  if ($("#chooseCounty").length === 0) {
    county.append("<option id='chooseCounty' value='-1'>请选择您所在区/县</option>");
  }
  var sb = new StringBuffer();
  
  $.each(cityjson,
    function(i, val) {
      if (val.item_code.substr(0, 2) == $("#province").val().substr(0, 2) && val.item_code.substr(2, 4) != '0000' && val.item_code.substr(4, 2) == '00') {
        sb.append("<option value='" + val.item_code + "'>" + val.item_name + "</option>");
      }
    });
  $("#chooseCity").after(sb.toString());


} // 市值变化时 处理区/县
function doCityAndCountyRelation() {
  var cityVal = $("#citys").val();
  var county = $("#county");
  if (county.children().length > 1) {
    county.empty();
  }
  if ($("#chooseCounty").length === 0) {
    county.append("<option id='chooseCounty' value='-1'>请选择您所在区/县</option>");
  }
  var sb = new StringBuffer();

  $.each(cityjson,
    function(i, val) {
      if (cityVal == '110100' || cityVal == "120100" || cityVal == "310100" || cityVal == "500100") {
        if (val.item_code.substr(0, 3) == cityVal.substr(0, 3) && val.item_code.substr(4, 2) != '00') {
          sb.append("<option value='" + val.item_code + "'>" + val.item_name + "</option>");
        }
      } else {
        if (val.item_code.substr(0, 4) == cityVal.substr(0, 4) && val.item_code.substr(4, 2) != '00') {
          sb.append("<option value='" + val.item_code + "'>" + val.item_name + "</option>");
        }
      }
    });
  $("#chooseCounty").after(sb.toString());


}

function StringBuffer(str) {
  var arr = [];
  str = str || "";
  var size = 0; // 存放数组大小
  arr.push(str);
  // 追加字符串
  this.append = function(str1) {
    arr.push(str1);
    return this;
  };
  // 返回字符串
  this.toString = function() {
    return arr.join("");
  };
  // 清空 
  this.clear = function(key) {
    size = 0;
    arr = [];
  };
  // 返回数组大小 
  this.size = function() {
    return size;
  };
  // 返回数组 
  this.toArray = function() {
    return buffer;
  };
  // 倒序返回字符串 
  this.doReverse = function() {
    var str = buffer.join('');
    str = str.split('');
    return str.reverse().join('');
  };
}