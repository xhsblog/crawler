Array.prototype.remove = function (dx) {

  if (isNaN(dx)) { return false; }
  for (var i = 0, n = 0; i < this.length; i++) {
    if (this[i] != dx) {
      this[n++] = this[i]
    }
  }
  this.length -= 1
}

var have_select_test_value = new Array();
function set_test_state(but, value) {

  if (but.value == '[+]试题篮') {

    if (have_select_test_value.length >= 40) {
      alert("试题篮最多40道试题。你可以生成试卷后，继续添加试题到试题篮。");
      return;
    }

    but.value = '[-]试题篮';
    have_select_test_value.push(value);
    but.style.color = 'red';
    but.parentNode.parentNode.parentNode.style.background = "#D8DFEA";

  }
  else {

    but.value = '[+]试题篮';
    have_select_test_value.remove(value);
    but.style.color = 'black';
    but.parentNode.parentNode.parentNode.style.background = "white";

  };


  retObj.save();
}


function DelHtml(Word) {

  a = Word.indexOf("<");
  b = Word.indexOf(">");
  len = Word.length;
  c = Word.substring(0, a);
  if (b == -1)
    b = a;
  d = Word.substring((b + 1), len);
  Word = c + d;
  tagCheck = Word.indexOf("<");
  if (tagCheck != -1)
    Word = DelHtml(Word);

  Word = Word.replace(/[ ]/g, "");
  Word = Word.replace(/(^s*)|(s*$)/g, "");
  Word = Word.replace(/^\s+|\s+$/g, "");
  return Word;
}

function get_daan(but, id) {
  var daan = $(id);
  pos = id.indexOf("-");
  detailid = id.substring(pos + 1, id.length);


  if (daan.style.display == "none") {


    daanvalue = DelHtml(daan.innerHTML);


    if (daanvalue == '' || daanvalue.length == 0 || daanvalue == "网络繁忙") {

      var successdaan = function (t) {

        html = t.responseText;
        pos = html.indexOf("1、");

        if (pos) {
          html = html.substring(0, pos) + html.substring(pos + 2, html.length);


        }

        daan.innerHTML = html;

      }
      var failuredaan = function (t) {
        daan.innerHTML = "网络繁忙";
      }

      var url = "/answerdetail/" + detailid + "/";


      var myAjax = new Ajax.Request(url, { method: 'post', postBody: "", onSuccess: successdaan, onFailure: failuredaan });
    }

    daan.style.display = "";
    but.value = "答案 <<"


  }
  else {
    daan.style.display = "none";
    but.value = "答案 >>";
  }

  return false;


};

function make_paper() {

  window.scrollTo(0, 0);
  cry();
  window.setTimeout("make_paperajax();", 100);


}

function make_paperajax() {

  var successpaper = function (t) {
    html = t.responseText;
    if (html == "1") {
      alert("为保证其他用户组卷速度，一天只能下载8张试卷，欢迎你明天再来。cooco。因你而专业!!!");
      return
    }

    if (html == "0") {
      alert("生成文件失败，请联系管理员");
      return;
    }

    else {
      $('showtiptext').innerHTML = pp = "<a href='" + html + "'style='color:red;font-size:16px;' title='提示' target='_blank'>点击下载生成的试卷</a>";;
    };
    $('showtip').style.display = "";
  }
  var failurepaper = function (t) {
    alert("网络繁忙请稍候再试!!");
    $('showtip').style.display = "";
  }
  var url = '/updownpaper/' + paper_id + "/";

  var myAjax = new Ajax.Request(url, { method: 'post', postBody: "", onSuccess: successpaper, onFailure: failurepaper });

}


var showpage = 1;
var currentlessonid = 0;
var currentdifficult = 0;
var currenttype = 0;
var currentorderby = 1;
function getpage(page) {
  showpage = page;

  window.scrollTo(0, 0);

  $(document.body).startWaiting('bigBlackWaiting');
  getajaxpage();



}

function getajaxpage() {

  var msg = $('testlist');

  var success = function (t) { window.setTimeout(document.body.stopWaiting.bind(document.body), 10); msg.innerHTML = t.responseText; page_load(); msg.scrollIntoView(); initialize(); }
  var failure = function (t) { window.setTimeout(document.body.stopWaiting.bind(document.body), 10); }

  var url = '/testpage/' + showpage + '/';

  var params = 'lessonid=' + encodeURIComponent(currentlessonid) + '&difficult=' + encodeURIComponent(currentdifficult) + '&type=' + encodeURIComponent(currenttype) + '&orderby=' + encodeURIComponent(currentorderby);
  var myAjax = new Ajax.Request(url, { method: 'post', postBody: params, onSuccess: success, onFailure: failure });



}


function getpaperpage(page) {
  showpage = page;

  window.scrollTo(0, 0);

  $(document.body).startWaiting('bigBlackWaiting');
  window.setTimeout("getpaperajaxpage();", 1000);


}

function getpaperajaxpage() {

  var msg = $('testlist');

  var success = function (t) { window.setTimeout(document.body.stopWaiting.bind(document.body), 10); msg.innerHTML = t.responseText; page_load(); msg.scrollIntoView(); }
  var failure = function (t) { window.setTimeout(document.body.stopWaiting.bind(document.body), 10); }

  var url = '/paperpage/' + paper_id + '/' + showpage + '/';

  var params = 'lessonid=' + encodeURIComponent(currentlessonid) + '&difficult=' + encodeURIComponent(currentdifficult) + '&type=' + encodeURIComponent(currenttype);
  var myAjax = new Ajax.Request(url, { method: 'post', postBody: params, onSuccess: success, onFailure: failure });



}






// 513705%2C513704%2C513703%2C513701%2C513699%2C513698%2C513692%2C513687
function setCookie(name, value, expires) {
  var x = name + "=" + escape(value);
  if (expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 24 * 3600 * 10 * 10);
    x += "; Expires=" + d.toGMTString();
  }
  x += "; path=" + escape("/");
  document.cookie = x;
}


function getCookie(name) {
  var a = document.cookie.split("; ");
  name += "=";
  for (var i = 0; i < a.length; i++)
    if (a[i].indexOf(name) == 0)
      return unescape(a[i].substr(name.length));
  return "";
};

var retObj = {
  save: function () {
    setCookie(lesson_type_testname + "test",
      "", 7 * 24 * 10);

    setCookie(lesson_type_testname + "test",
      have_select_test_value.join(','), 1);
  },

  load: function () {
    var a = getCookie(lesson_type_testname + "test");

    retObj.setup(a ? a.split(',') : null);
  },

  setup: function (a) {
    have_select_test_value = new Array();
    if (!a) return;
    for (var i = 0; i < a.length; i++) {
      buttonfind = "test-" + a[i];
      if ($(buttonfind)) {

        $(buttonfind).value = '[-]试题篮';
        $(buttonfind).style.color = 'red';
        $(buttonfind).parentNode.parentNode.parentNode.style.background = "#D8DFEA";

      }
      have_select_test_value.push(a[i]);
    }

  }
};


function page_load() {
  retObj.load();

}

YAHOO.util.Event.onDOMReady(page_load);


if (!document.all) {
  window.constructor.prototype.__defineGetter__("event", function () {
    var func = arguments.callee.caller;
    while (func != null) {
      var arg0 = func.arguments[0];
      if (arg0 && (arg0.constructor == Event || arg0.constructor == MouseEvent)) {
        return arg0;
      }
      func = func.caller;
    }
    return null;
  });
}


function cry() {
  test("正在生成word试卷请稍候...");
  listen();
}
var obj = "";
var listen = function () {
  document.getElementById("tips").onmousedown = function () {
    obj = document.getElementById("tips");
    oMove(obj.parentNode.parentNode);
  }
}



var test = function (txt) {
  var shield = document.createElement("DIV");
  shield.id = "shield";
  shield.style.position = "absolute";
  shield.style.left = "0px";
  shield.style.top = "0px";
  shield.style.width = "100%";
  shield.style.height = "3500px";

  shield.style.background = "#000";
  shield.style.textAlign = "center";
  shield.style.zIndex = "10000";
  shield.style.filter = "alpha(opacity=0)";
  var alertFram = document.createElement("DIV");
  alertFram.id = "alertFram";
  alertFram.style.position = "absolute";

  alertFram.style.right = "50%";
  alertFram.style.bottom = "50%";
  alertFram.style.marginRight = "-125px";
  alertFram.style.marginBottom = "-75px";

  alertFram.style.width = "250px";
  alertFram.style.height = "150px";
  alertFram.style.background = "#000";
  alertFram.style.textAlign = "center";
  alertFram.style.lineHeight = "150px";
  alertFram.style.zIndex = "10002";
  strHtml = "<ul style=\" list-style:none;margin:0px;padding:0px;width:100%\">\n";
  strHtml += "<li id='tips' title=\"移動\" style=\"cursor:move;background:#002F9C;text-align:left;padding-left:5px;font-size:12px;color: red;height:25px;line-height:25px;border-left:1px solid #FFFFFF;border-top:1px solid #FFFFFF;border-right:1px solid #FFFFFF;\">请稍等大约需要20秒左右时间</li>\n";
  strHtml += "<li style=\"background:#5A7EDC;text-align:center;font-size:12px;color: #FFFFFF;height:120px;line-height:120px;border-left:1px solid #FFFFFF;border-right:1px solid #FFFFFF;\"><div id=\"showtiptext\">" + txt + "</div></li>\n";
  strHtml += "<li style=\"background:#002F9C;text-align:center;font-weight:bold;height:25px;line-height:25px; border-left:1px solid #FFFFFF;border-bottom:1px solid #FFFFFF;border-right:1px solid #FFFFFF;\"><input id = \"showtip\" type=button value=' 关闭 'style=\"display:none\" onclick=\"removealertform();\"></li>\n";
  strHtml += "</ul>\n";
  alertFram.innerHTML = strHtml;
  document.body.appendChild(alertFram);
  document.body.appendChild(shield);

  var c = 0;
  this.doAlpha = function () {
    if (c++ > 50) { clearInterval(ad); return 0; }
    shield.style.filter = "alpha(opacity=" + c + ");";
  }
  this.removealertform = function () {
    alertFram.innerHTML = "";
    shield.style.filter = "";
    shield.id = "";
    shield.style.position = "";
    shield.style.left = "";
    shield.style.top = "";
    shield.style.width = "";
    shield.style.height = "";
    shield.style.background = "";
    shield.style.textAlign = "";
    shield.style.zIndex = "";
    shield.style.filter = "";
    alertFram.id = "";
    alertFram.style.position = "";
    alertFram.style.left = "";
    alertFram.style.top = "";
    alertFram.style.marginLeft = "";
    alertFram.style.marginTop = "";
    alertFram.style.width = "";
    alertFram.style.height = "";
    alertFram.style.background = "";
    alertFram.style.textAlign = "";
    alertFram.style.lineHeight = "";
    alertFram.style.zIndex = "";
  }
  var ad = setInterval("doAlpha()", 10);
  alertFram.focus();
  document.body.onselectstart = function () { return false; };
}


function oMove(obj) {
  var otop, oleft;
  var mX, mY;
  mX = event.x ? event.x : event.pageX;
  mY = event.y ? event.y : event.pageY;
  if (!event.x) {
    otop = event.pageY - obj.offsetTop;
    oleft = event.pageX - obj.offsetLeft;
  }
  else {
    otop = event.y - obj.offsetTop;
    oleft = event.x - obj.offsetLeft;

  }
  var move = function () {
    if (!event.y) {
      obj.style.left = event.pageX - oleft;
      obj.style.top = event.pageY - otop;
    }
    else {
      obj.style.left = event.x - oleft;
      obj.style.top = event.y - otop;
    }
  }
  var up = function () {
    obj.onmousedown = null;
    obj.onmousemove = null;
    obj.style.filter = null;
    if (!obj.addEventListener) {

      obj.detachEvent("onmousemove", move);
      obj.detachEvent("onmouseup", up);
    }
    else {
      obj.removeEventListener('mousemove', move, false);
      obj.removeEventListener('mouseup', up, false);
    }
  }
  if (obj.addEventListener) {
    obj.addEventListener("mousemove", move, false);
    obj.addEventListener("mouseup", up, false);
  } else {
    obj.attachEvent("onmousemove", move);
    obj.attachEvent("onmouseup", up);
  }

} 