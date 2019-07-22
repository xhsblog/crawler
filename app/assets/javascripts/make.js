Array.prototype.remove = function (dx) {

  if (isNaN(dx)) {
    return false;
  }
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

  } else {


    parentnode = but.parentNode.parentNode.parentNode.parentNode.parentNode;
    pnode = but.parentNode.parentNode.parentNode.parentNode;
    for (var i = 0, c = parentnode.childNodes; i < c.length; i++) {

      if (!c[i].id) {
        continue;
      }


      if ($("type-" + c[i].id)) {
        optionlength = $("type-" + c[i].id).options.length;
        $("type-" + c[i].id).removeChild($("type-" + c[i].id).getElementsByTagName('option')[optionlength - 1]);
      }

    }


    have_select_test_value.remove(value);

    but.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(but.parentNode.parentNode.parentNode.parentNode);



  };


  retObj.save();
}

function test_type_up(sender, id) {


  testlistparent = $('testlist');

  itempri = "";
  itemcurrent = "";
  c = testlistparent.childNodes;

  for (var i = 0; i < c.length; i++) {

    if (!c[i].id) {
      continue;
    }

    if (c[i].id == "testitemdiv-" + id) {
      itemcurrent = c[i];
      break;
    } else {
      itempri = c[i];
    }
  }


  if (itempri) {
    swapdiv(itemcurrent, itempri)
    set_order();
  }

}

function test_type_down(sender, id) {

  testlistparent = $('testlist');
  itemnext = "";
  itemcurrent = "";
  c = testlistparent.childNodes;
  for (var i = c.length - 1; i >= 0; i--) {

    if (!c[i].id) {
      continue;
    }

    if (c[i].id == "testitemdiv-" + id) {
      itemcurrent = c[i];
      break;
    } else {
      itemnext = c[i];
    }
  }

  if (itemnext) {

    swapdiv(itemnext, itemcurrent)
    set_order();
  }



}


function swapdiv(p1, p2) {

  var b = document.createElement('div');
  b.id = p1.id;

  b.className = "spy";
  b.style.background = "white";
  b.style.marginBottom = "10px";

  b.innerHTML = p1.innerHTML;

  p2.parentNode.removeChild(p1);

  p2.parentNode.insertBefore(b, p2);




}

function moveto(p, pos) {
  if (!pos) {
    return;
  }
  parentnode = p.parentNode.parentNode.parentNode.parentNode.parentNode;
  pnode = p.parentNode.parentNode.parentNode.parentNode;
  var pprev;
  loop = 0;
  pprev = "";
  ppafter = "";
  for (var i = 0, c = parentnode.childNodes; i < c.length; i++) {

    if (!c[i].id) {
      continue;
    }
    loop++;
    if (c[i].id == pnode.id) {
      pos = parseInt(pos) + 1;
      continue;
    }
    if (loop == pos) {
      pprev = c[i];
      if (c[i].id == pnode.id) {
        return;
      }
      break;
    }

    ppafter = c[i];

  }

  p.value = 0;
  if (!pprev) {
    if (ppafter) {
      movetodown(pnode, parentnode);
    } else {
      return;
    }
  } else {
    swap(pnode, pprev);
  }
  p.scrollIntoView();
  set_order();

}


function movetodown(p1, parentnodeitem) {

  var b = document.createElement('li');

  b.id = p1.id;
  var currentdata = p1.value
  b.innerHTML = p1.innerHTML;




  p1.parentNode.removeChild(p1);

  parentnodeitem.appendChild(b);

  b.value = currentdata;


}


function set_type_state(but, id) {

  var testtype = $(id);

  if (but.value == '收缩') {
    but.value = '展开';
    testtype.style.display = "none";

  } else {

    but.value = '收缩';
    testtype.style.display = "";



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


      var myAjax = new Ajax.Request(url, {
        method: 'post',
        postBody: "",
        onSuccess: successdaan,
        onFailure: failuredaan
      });
    }

    daan.style.display = "";
    but.value = "答案 <<"


  } else {
    daan.style.display = "none";
    but.value = "答案 >>";
  }

  return false;


};


var currenttype = 0;

function make_test(page) {
  if (have_select_test_value.length == 0) {
    alert("你的试题篮没有试题，请添加试题到试题篮。");
    return;
  }
  showpage = page;
  window.scrollTo(0, 0);

  cry();
  window.setTimeout("make_testajaxpage();", 1000);


}

function make_testajaxpage() {

  var success = function (t) {
    html = t.responseText;
    if (html == "0") {
      alert("生成文件失败，请联系管理员");
      return;
    }
    if (html == "2") {
      alert("登陆用户才能组卷");
      $('showtiptext').innerHTML = pp = "<a href='/login/'style='color:green;font-size:16px;'  title='提示' >点击登陆系统,你的试卷不会丢失</a>";;
      return;
    }

    if (html == "1") {
      alert("为保证其他用户组卷速度，一天只能组6张试卷，欢迎你明天再来。cooco。因你而专业!!!");
    } else {
      $('showtiptext').innerHTML = pp = "<a href='" + html + "'style='color:red;font-size:16px;'  title='提示' target='_blank'>点击下载(切记不能用迅雷)</a>";;
    };
    $('showtip').style.display = "";
  }
  var failure = function (t) {
    alert("网络繁忙请稍候再试!!");
    $('showtip').style.display = "";
  }
  var url = '/maketestfinish/';

  var myAjax = new Ajax.Request(url, {
    method: 'post',
    postBody: "",
    onSuccess: success,
    onFailure: failure
  });

}


function clearalltest() {
  setCookie(lesson_type_testname + "test", "", 1);
}

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

    if (a.length) {
      retObj.setup(a ? a.split(',') : null);
    }
  },

  setup: function (a) {
    have_select_test_value = new Array();
    for (var i = 0; i < a.length; i++) {

      buttonfind = "test-" + a[i];



      if ($(buttonfind)) {

        $(buttonfind).value = '[-]试题篮';
        $(buttonfind).style.color = 'red';
      }
      have_select_test_value.push(a[i]);
    }

  }
};


function getElementsByClassName(className, parentElement) {
  var elems = ($(parentElement) || document.body).getElementsByTagName("*");

  var result = [];
  for (i = 0; j = elems[i]; i++) {

    if (j.className == className) {

      result.push(j);
    }
  }
  return result;
}




function set_order() {

  var current = new Array();

  var classBlack = getElementsByClassName('ullist', "testlist");

  for (var i = 0; i < classBlack.length; i++) {
    for (var p = 0, e = classBlack[i].childNodes; p < e.length; p++) {
      if (e[p].value) {
        current.push(e[p].value);
      }
    }
  }

  have_select_test_value = current;
  retObj.save();
}

function moveup(p) {
  parentnode = p.parentNode.parentNode.parentNode.parentNode.parentNode;
  pnode = p.parentNode.parentNode.parentNode.parentNode;
  var pprev;
  for (var i = 0, c = parentnode.childNodes; i < c.length; i++) {

    if (!c[i].id) {
      continue;
    }


    if (c[i].id == pnode.id) {
      if (!pprev) {
        return;
      }
      break;
    };
    pprev = c[i];

  }


  swap(pnode, pprev);
  p.scrollIntoView();
  set_order();

}

function movedown(p) {
  parentnode = p.parentNode.parentNode.parentNode.parentNode.parentNode;
  pnode = p.parentNode.parentNode.parentNode.parentNode;
  var c = parentnode.childNodes;
  var pprev;
  for (var i = c.length - 1; i >= 0; i--) {

    if (!c[i].id) {
      continue;
    }


    if (c[i].id == pnode.id) {
      if (!pprev) {
        return;
      }
      break;
    };
    pprev = c[i];

  }


  swap(pprev, pnode);
  p.scrollIntoView();
  set_order();
}

function swap(p1, p2) {

  var b = document.createElement('li');

  b.id = p1.id;
  var currentdata = p1.value
  b.innerHTML = p1.innerHTML;

  p2.parentNode.removeChild(p1);

  p2.parentNode.insertBefore(b, p2);

  b.value = currentdata;


}

function page_load() {
  retObj.load();

}




page_load();





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



test = function (txt) {
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
  strHtml += "<li id='tips' title=\"移動\" style=\"cursor:move;background:#002F9C;text-align:left;padding-left:5px;font-size:12px;font-weight:bold;color: red;height:25px;line-height:25px;border-left:1px solid #FFFFFF;border-top:1px solid #FFFFFF;border-right:1px solid #FFFFFF;\">请稍等大约需要20秒左右时间</li>\n";
  strHtml += "<li style=\"background:#5A7EDC;text-align:center;font-size:12px;color: #FFFFFF;height:120px;line-height:120px;border-left:1px solid #FFFFFF;border-right:1px solid #FFFFFF;\"><div id=\"showtiptext\">" + txt + "</div></li>\n";
  strHtml += "<li style=\"background:#002F9C;text-align:center;font-weight:bold;height:25px;line-height:25px; border-left:1px solid #FFFFFF;border-bottom:1px solid #FFFFFF;border-right:1px solid #FFFFFF;\"><input id = \"showtip\" type=button value=' 关闭 'style=\"display:none\" onclick=\"removealertform();\"></li>\n";
  strHtml += "</ul>\n";
  alertFram.innerHTML = strHtml;
  document.body.appendChild(alertFram);
  document.body.appendChild(shield);

  var c = 0;
  this.doAlpha = function () {
    if (c++ > 50) {
      clearInterval(ad);
      return 0;
    }
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
  document.body.onselectstart = function () {
    return false;
  };
}


function oMove(obj) {
  var otop, oleft;
  var mX, mY;
  mX = event.x ? event.x : event.pageX;
  mY = event.y ? event.y : event.pageY;
  if (!event.x) {
    otop = event.pageY - obj.offsetTop;
    oleft = event.pageX - obj.offsetLeft;
  } else {
    otop = event.y - obj.offsetTop;
    oleft = event.x - obj.offsetLeft;

  }
  var move = function () {
    if (!event.y) {
      obj.style.left = event.pageX - oleft;
      obj.style.top = event.pageY - otop;
    } else {
      obj.style.left = event.x - oleft;
      obj.style.top = event.y - otop;
    }
  }
  var up = function () {
    obj.onmousedown = null;
    obj.onmousemove = null;
    obj.style.filter = null;
    if (!obj.addEventListener) {
      //obj.releaseCapture();
      obj.detachEvent("onmousemove", move);
      obj.detachEvent("onmouseup", up);
    } else {
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