//Function for Autosizing the textbox
(function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e(window.jQuery||window.$)})(function(e){var t,o={className:"autosizejs",append:"",callback:!1,resizeDelay:10},i='<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>',n=["fontFamily","fontSize","fontWeight","fontStyle","letterSpacing","textTransform","wordSpacing","textIndent"],s=e(i).data("autosize",!0)[0];s.style.lineHeight="99px","99px"===e(s).css("lineHeight")&&n.push("lineHeight"),s.style.lineHeight="",e.fn.autosize=function(i){return this.length?(i=e.extend({},o,i||{}),s.parentNode!==document.body&&e(document.body).append(s),this.each(function(){function o(){var t,o;"getComputedStyle"in window?(t=window.getComputedStyle(u),o=u.getBoundingClientRect().width,e.each(["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"],function(e,i){o-=parseInt(t[i],10)}),s.style.width=o+"px"):s.style.width=Math.max(p.width(),0)+"px"}function a(){var a={};if(t=u,s.className=i.className,d=parseInt(p.css("maxHeight"),10),e.each(n,function(e,t){a[t]=p.css(t)}),e(s).css(a),o(),window.chrome){var r=u.style.width;u.style.width="0px",u.offsetWidth,u.style.width=r}}function r(){var e,n;t!==u?a():o(),s.value=u.value+i.append,s.style.overflowY=u.style.overflowY,n=parseInt(u.style.height,10),s.scrollTop=0,s.scrollTop=9e4,e=s.scrollTop,d&&e>d?(u.style.overflowY="scroll",e=d):(u.style.overflowY="hidden",c>e&&(e=c)),e+=f,n!==e&&(u.style.height=e+"px",w&&i.callback.call(u,u))}function l(){clearTimeout(h),h=setTimeout(function(){var e=p.width();e!==g&&(g=e,r())},parseInt(i.resizeDelay,10))}var d,c,h,u=this,p=e(u),f=0,w=e.isFunction(i.callback),z={height:u.style.height,overflow:u.style.overflow,overflowY:u.style.overflowY,wordWrap:u.style.wordWrap,resize:u.style.resize},g=p.width();p.data("autosize")||(p.data("autosize",!0),("border-box"===p.css("box-sizing")||"border-box"===p.css("-moz-box-sizing")||"border-box"===p.css("-webkit-box-sizing"))&&(f=p.outerHeight()-p.height()),c=Math.max(parseInt(p.css("minHeight"),10)-f||0,p.height()),p.css({overflow:"hidden",overflowY:"hidden",wordWrap:"break-word",resize:"none"===p.css("resize")||"vertical"===p.css("resize")?"none":"horizontal"}),"onpropertychange"in u?"oninput"in u?p.on("input.autosize keyup.autosize",r):p.on("propertychange.autosize",function(){"value"===event.propertyName&&r()}):p.on("input.autosize",r),i.resizeDelay!==!1&&e(window).on("resize.autosize",l),p.on("autosize.resize",r),p.on("autosize.resizeIncludeStyle",function(){t=null,r()}),p.on("autosize.destroy",function(){t=null,clearTimeout(h),e(window).off("resize",l),p.off("autosize").off(".autosize").css(z).removeData("autosize")}),r())})):this}});

//Main JS Code
$(document).ready(function () {
    $.ajax({
        url: "http://gymkhana.iitb.ac.in/~hostel9/extension/mess.php",
        type: "get",
        crossDomain: "true",
        success: function (a) {
            a = a.trim();
            a = a.split(";;");
            $("#break").append(a[0]);
            $("#lunch").append(a[1]);
            $("#tiffin").append(a[2]);
            $("#dinner").append(a[3]);
            $(".dummy").css("visibility", "hidden");
            var b = new Date;
            a = b.getHours();
            b = b.getMinutes();
            console.log(a + " " + b);
            10 > a ? $("#break").addClass("food") : 14 > a ? $("#lunch").addClass("food") : 18 > a || 18 == a && 30 > b ? $("#tiffin").addClass("food") : 21 >=
                a && $("#dinner").addClass("food")
        },
        error: function () {
            $(".panel-body").html("<b>Error Connecting Server. Check your internet connection</b>")
        }
    })
});
$("#toggle,#close").click(function () {
    $("#register").toggleClass("hide");
    $("html, body").animate({
        scrollTop: $(document).height()
    }, "slow")
});
$("textarea").autosize();
$("#sub").keyup(function (a) {
    "" != $(this).val() ? ($("#name").removeAttr("disabled"), $("#sub1").removeClass("has-error")) : $("#name").attr("disabled", "disabled")
});
$("#name").keyup(function (a) {
    a = $(this).val();
    "" == $("#sub").val() ? $(this).attr("disabled", "disabled") : "" != a && $("#name1").removeClass("has-error")
});
$("#register").submit(function (a) {
    a = $("input[type=submit][clicked=true]").attr("id");
    if ("cancel" == a) return $(this)[0].reset(), $("#cancel").blur(), $("#submit").removeAttr("disabled"), $("#submit").val("Submit"), $("#ldap1").removeClass("has-error"), $("#pass1").removeClass("has-error"), $("#sub1").removeClass("has-error"), $("#name1").removeClass("has-error"), $("#login-msg").html(""), !1;
    a = $("#sub").val();
    var b = $("#name").val();
    if ("" == a) return $("#name").attr("disabled", "disabled"), $("#name1").addClass("has-error"),
    $("#sub1").addClass("has-error"), $("#submit").blur(), !1;
    if ("" == b) return $("#name1").addClass("has-error"), $("#submit").blur(), !1;
    $("#submit").attr("disabled", "disabled");
    $("#submit").val("submitting...");
    $.ajax({
        url: "http://gymkhana.iitb.ac.in/~hostel9/extension/cms.php",
        type: "POST",
        data: $(this).serialize(),
        crossDomain: "true",
        success: function (a) {
            a = a.trim();
            "" == a ? ($("#alert-trigger").html("<div class='alert alert-success'><button class=close>&times;</button>Email Sent Successfully</div>"), $("#submit").removeAttr("disabled"),
                $("#submit").val("Submit"), $("#name").attr("disabled", "disabled"), $("#register")[0].reset(), $("#login-msg").html(""), $("#ldap1").removeClass("has-error"), $("#pass1").removeClass("has-error")) : ("server_error" == a ? $("#login-msg").html("internal SERVER ERROR") : ($("#login-msg").html("wrong Username/Password"), $("#ldap1").hasClass("has-error") || $("#ldap1").addClass("has-error"), $("#pass1").hasClass("has-error") || $("#pass1").addClass("has-error")), $("#submit").removeAttr("disabled"), $("#submit").val("Submit"))
        },
        error: function (a) {
            $("#submit").removeAttr("disabled");
            $("#submit").val("Submit");
            $("#alert-trigger").html("<div class='alert alert-danger'><button class=close>&times;</button>Email Sending Failed</div>")
        }
    });
    return !1
});
$("#register input[type=submit]").click(function () {
    $("input[type=submit]", $(this).parents("form")).removeAttr("clicked");
    $(this).attr("clicked", "true")
});
$("#alert-trigger").on("click", "button", function () {
    $(".alert").remove()
});
