
var style = `
<style type='text/css' id='exc-style'>

.notify * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}

.notify {
    position: fixed;
    min-width: 350px;
    max-width: 450px;
    background: #ffff;
    font-size: 14px;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    color: #494949;
    border-radius: 4px;
    border: 1px solid #dedede;
    box-shadow: rgba(0, 0, 0, 0.0980392) 0px 2px 4px;
    z-index: 999;
    // opacity: .8;
    // filter: alpha(opacity=80);
}

.notify:hover {
    opacity: 1;
    filter: alpha(opacity=100);
}

.notify .notify-icon {
    float: left;
    position: absolute;
    width: 50px;
    height: 100%;
    border-right: 1px solid #ddd;
    text-align: center;
    overflow: hidden;
}

.notify .notify-icon .notify-icon-inner {
    position: relative;
    top: 50%;
    margin-top: -9px;
}

.notify .notify-icon .notify-icon-inner img {
    max-width: 40px;
    max-height: 40px;
}

.notify .notify-text {
    float: left;
    padding: 10px 15px;
    margin-left: 50px;
    width:72%;
}

.notify .notify-text h3 {
    display: block;
    padding: 0;
    margin: 3px 0;
    font-size: 14px;
    font-weight: bold;
    line-height: normal;
}
.notify .notify-text h4 {
    display: block;
    padding: 0;
    margin: 3px 0;
    font-size: 12px;
    font-weight: bold;
    line-height: normal;
}

.notify .notify-text p {
    margin: 5px 0;
    margin-bottom: 0;
    padding: 0;
    font-size: 12px;
    font-weight: normal;
    line-height: 14px;
}

.notify .notify-close-btn {
    position: absolute;
    display: block;
    width: 10px;
    height: 10px;
    right: -10px;
    top: -10px;
    cursor: pointer;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGNzdGMTE3NDA3MjA2ODExOEMxNDkyODc0N0NBMUEwNCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3N0ZBOTUxNzNERkIxMUUyQUZGMEFDRjY0RjNFODlDOCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3N0ZBOTUxNjNERkIxMUUyQUZGMEFDRjY0RjNFODlDOCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IE1hY2ludG9zaCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkY3N0YxMTc0MDcyMDY4MTE4MDgzRkQyMTE2MTM0QUNBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkY3N0YxMTc0MDcyMDY4MTE4QzE0OTI4NzQ3Q0ExQTA0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+5Ke+4QAAAMlJREFUeNqkk90KwyAMha0dvp/ghfthsFcb67YLYe83EBdZlCxL3KCFU0nM+WqjTqUUs+bZ1Nd2d6jDDDqDHqCk1AeQBx1B+Xa9vAFovmNBwFwSzAvIoWKFWJxciNGxmJtp3FeQMDkziCEfcCTObYUUEPE3JAg3xwawZKJBMsm5kZkDNIhqlgC0+J/cFyAIDTOD3fkABKXbeQSxP8xRaWyHNIAfdFvbHU8BJ9JdqdscktDTD9ITtCcnTLpMDRLwMlWPmdZe55cAAwD+1kOdnSr5eQAAAABJRU5ErkJggg==') no-repeat center;
    background-size: 10px,10px;
    background-color: #fff;
    padding: 10px;
    border-radius: 50%;
    border: 1px solid #ddd;
}

.notify .notify-close-btn:hover {
    background-color: #f3f3f3;
}

.notify .notify-close-btn:active {
    background-color: #ddd;
}

/* themes */
.notify.dark-theme {
    background: rgba(44,46,47,.9);
    color: #fafafa;
    border-color: #333;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 2px 4px;
}

.notify.dark-theme .notify-icon {
    border-color: rgba(44,46,47,1);
}

.notify.dark-theme .notify-close-btn {
    background: url('data:image/png;base64,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') no-repeat center;
    background-size: 10px,10px;
    background-color: rgba(44,46,47,.9);
    border: 1px solid #333;
}

.notify.dark-theme .notify-close-btn:hover {
    background-color: #313131;
}

.notify.dark-theme .notify-close-btn:active {
    background-color: #222;
}

.notify.success {
    background: white;
    color: #000000;
    border-color: #e9ebee;
}

.notify.success .notify-icon,
.notify.success .notify-close-btn {
    border-color: #d4d7dc;
}

.notify.error {
    background: #F77975;
    color: #fff;
    border-color: #ffc23700;
}
.notify-icon-inner
{
    margin-top:20px;
}
.notify.error .notify-icon,
.notify.error .notify-close-btn {
    border-color: black;
}

.notify.info {
    background: #78C5E7;
    color: #fff;
    border-color: #ffc23700;
}

.notify.info .notify-icon,
.notify.info .notify-close-btn {
    border-color: #e9ebee;
}

.notify.warning {
    background: #ffeaa8;
    color: #826200;
    border-color: #e9ebee;
}

.notify.warning .notify-icon,
.notify.warning .notify-close-btn {
    border-color: #ffc237;
}

/* sizes */
.notify.size-small {
    min-width: 250px;
    max-width: 350px;
    font-size: 12px;
}

.notify.size-small .notify-text h3 {
    font-size: 12px;
}

.notify.size-small .notify-text p {
    font-size: 10px;
}

/* positions */
.notify.notify-top-left {
    top: 20px;
    left: 20px;
}

.notify.notify-top-right {
    top: 20px;
    right: 20px;
}

.notify.notify-top-center {
    top: 20px;
    left: 50%;
    margin-left: -196px;
}

.notify.notify-bottom-left {
    bottom: 20px;
    left: 20px;
}

.notify.notify-bottom-right {
    bottom: 20px;
    right: 20px;
}

.notify.notify-bottom-center {
    bottom: 20px;
    left: 50%;
    margin-left: -196px;
}

.notify.notify-top-full {
    max-width: none;
    top: -1px;
    bottom: auto;
    right: 50px;
    left: 50px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.notify.notify-top-full .notify-close-btn,
.notify.notify-top-center .notify-close-btn {
    top: auto;
    bottom: -10px;
}

.notify.notify-bottom-full {
    max-width: none;
    bottom: -1px;
    right: 50px;
    left: 50px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
}

.notify.notify-center-center {
    top: 50%;
    left: 50%;
    margin-left: -196px;
    margin-top: -26px;
}

/*options*/
.notify.notify-without-title .notify-text h3 {
    margin: 5px 0;
}

.notify.notify-without-title .notify-text p {
    margin-bottom: 5px;
}

.notify.notify-without-icon .notify-text {
    margin-left: 0;
}

.notify-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.05);
    z-index: 998;
}

.notify-overlay.light {
    background: rgba(255,255,255,0.3);
}

/* facefone cmt v1.0 */
.facefone-cmt
{
 margin-left: 10px;
 width: 70px;
 padding: 5px;
 background: #337ab7;
 font-size: 12px;
 color: #fff;
 border: 0;
 right: 25px;
 border-radius: 20px;
 cursor: pointer;
 padding-left: 15px;
 float: right;
 margin-top: 5px;
    line-height: 20px;
}

.facefone-cmt > div img
{
    content:url("https://icons.iconarchive.com/icons/graphicloads/100-flat/16/phone-icon.png");
}

.facefone-cmt:after {
    content: "Lấy SĐT";
}

.facefone-cmt:hover
{
    background:#cc9900;
}

.facefone-cmt.found
{
    background:#00b300;
    font-size:14px;
    width:120px;
}

.facefone-cmt.found > div img
{
    content:url("https://icons.iconarchive.com/icons/custom-icon-design/flatastic-9/16/Accept-icon.png");
}

.facefone-cmt.found:after {
    content: attr(data-content);
}

.facefone-cmt.notfound
{
    background:#ff3333;
}

.facefone-cmt.notfound:after {
    content: "Ko Thấy";
}

.facefone-cmt.notfound > div img
{
    content:url("https://icons.iconarchive.com/icons/martz90/circle-addon2/16/warning-icon.png");
}

.facefone-cmt.loading
{
    background:#ff751a;
}

.facefone-cmt.loading:after {
    content: "Đang tìm";
}

.facefone-cmt.loading > div img
{
    width: 16px;
    height: 16px;
    content:url("https://admin.facefone.vn/img/loading.svg");
}

.facefone-cmt.loading:hover
{
    background:red;
}

/* facefone pancake v1.0 */
.facefone-pancake
{   
 width: 100px;
 height: 26px;
 font-size: 12px;
 vertical-align: middle;
 background-color: #337ab7;
 color: #fff;
 border-radius: 13px;
 padding: 7px;
 padding-right: 20px;
 margin-right: 14px;
 cursor: pointer;
 background-position: right 8px bottom 6px;
 background-repeat: no-repeat;
 background-size: 14px 14px;
 background-image: url(https://icons.iconarchive.com/icons/graphicloads/100-flat/16/phone-icon.png);
 padding-top: 7px;
 line-height: 15px;
}

.facefone-pancake:after {
    content: "Lấy SĐT";
}

.facefone-pancake:hover
{
    background:#cc9900;
    background-position: right 8px bottom 6px;
    background-repeat: no-repeat;
    background-size: 14px 14px;
    background-image: url(https://icons.iconarchive.com/icons/graphicloads/100-flat/16/phone-icon.png);
}

.facefone-pancake.found
{
    background:#00b300;
    background-position: right 8px bottom 6px;
    background-repeat: no-repeat;
    background-size: 14px 14px;
    background-image: url(https://icons.iconarchive.com/icons/custom-icon-design/flatastic-9/16/Accept-icon.png);
}

.facefone-pancake.found:after {
    content: "Đã thấy";
}

.facefone-pancake.notfound
{
    background:#ff3333;
    background-position: right 8px bottom 6px;
    background-repeat: no-repeat;
    background-size: 14px 14px;
    background-image: url("https://icons.iconarchive.com/icons/martz90/circle-addon2/16/warning-icon.png");
}

.facefone-pancake.notfound:after {
    content: "Ko Thấy";
}


.facefone-pancake.loading
{
    background:#ff751a;
    background-position: right 8px bottom 6px;
    background-repeat: no-repeat;
    background-size: 14px 14px;
    background-image: url("https://admin.facefone.vn/img/loading.svg");
}

.facefone-pancake.loading:after {
    content: "Đang tìm";
}

.facefone-pancake.loading:hover
{
    background:red;
    background-position: right 8px bottom 6px;
    background-repeat: no-repeat;
    background-size: 14px 14px;
    background-image: url("https://admin.facefone.vn/img/loading.svg");
}


/* facefone-chat v1.0*/
.facefone-chat
{
    background-image:url(https://admin.facefone.vn/img/phone.png);
    background-position: 3px 5px;
    background-size: 14px 14px;
    background-repeat:no-repeat
}

.facefone-chat.found
{
    background-image:url(https://icons.iconarchive.com/icons/custom-icon-design/flatastic-9/16/Accept-icon.png);
}

.facefone-chat.notfound
{
    background-image:url(https://icons.iconarchive.com/icons/martz90/circle-addon2/16/warning-icon.png);
}

.facefone-chat.loading
{
    background-image:url(https://admin.facefone.vn/img/loading.svg);
}
.fbNub._50mz .loading {
    display: block;
    margin-top: 0px;
}
// ._3-a6._4eno ._10la._10lg ._10lp {
//     bottom: 0px;
//     transform: translateY(-3px);
// }
._2e7q .UFICommentContent
{
   max-width: 175px !important;
   float: left !important;
}
#fbPhotoSnowliftFeedback .UFICommentContent
{
   max-width: 145px !important;
   float: left !important;
}
.UFICommentContent
{
   max-width: 280px !important;
   float: left !important;
}
.Facetel-Copy
{
    background: #40b8ff;
    border: 0;
    padding: 7px;
    border-radius: 24px;
    color: white;
    margin: -12% 15px 0px 0px;
    box-shadow: 1px 2px #969696;
    float: right;
}
</style>`;
 $(document).ready(function(){
    $('._66n3').off('click');
});
$(document).on("click", "._5qi9._5qib", function () {
    try {
        if ($('#exc-style').length <= 0) {
            $("head").append(style);
        }
        var ListBox = $('._3_9e._s0f._50mz._50m_.fbNub._50-v.opened._27_3');
        // var ListBox = $('_3_9e._s0f._50mz._50m_.fbNub._50-v.focusedTab.opened._27_3');
        var i;
        var uid;
        var uname;
        var url;
        for(i = 0;i<ListBox.length;i++)
        {
            var item =ListBox[i];
            if(!item.querySelector("#facefone-chat"))
            {
                uid =item.className.split(':')[1];
                uname = item.querySelector('.titlebarText,._1ogo').textContent;
                url = item.querySelector('.titlebarText,._2mgq').href;
                console.log(uid);
                console.log(uname);
                console.log(url);
                // var elm = item.querySelector("._3a61._4620");
                var elm = item.querySelector("._15p6,._2rt2");
                // var elm = item.querySelector("._66n2");
                var newElm = document.createElement("div");
                newElm.innerHTML ='<div class="_461_" ><a  id="facefone-chat" aria-label="Lấy SĐT của '+ uname +'" class="button _3olv facefone-chat"'+
                ' data-hover="tooltip" data-tooltip-alignv="top"'+
                'data-tooltip-content="Lấy SĐT của '+ uname +'" '+
                ' uname = "'+uname+'" uid = "'+uid+'" url = "'+btoa(url)+'" '+
                'role="button" href="#"></a></div>';
                newElm.className = '_66n5';
                elm.parentNode.insertBefore(newElm, elm.nextSibling);
            }
            
        }
    } catch (e) {
    }
});


$(document).on('click', 'body', function (event) {
    if (event.target.className == "exc-btn-sent") {
        try {
            if (!fbuser.uid) {
                alert("Chưa xác định được uid của user");
            }
            else if (chrome && chrome.runtime) {
                $(".exc-btn-sent").hide();
                $(".exc-btn-loading").show();
                chrome.runtime.sendMessage({
                    status: "getphone",
                    uid: fbuser.uid,
                }, function (response) {
                    // console.log(response)
                    $(".exc-btn-loading").hide();
                    if (response.phone) {
                        var phone = response.phone.toString().replace(/^84/, "0");
                        $(".exc-btn-phone").text(phone);
                        $(".exc-btn-phone").show()
                    }
                    else if (response.error) {
                        alert(response.error)
                        $(".exc-btn-sent").show();
                    }
                    else if (response.login) {
                        $(".exc-btn-login").show()
                    }
                });
            } else {
                alert("Trình duyệt cần refrest lại mới sử dụng được chức năng này");
            }
        } catch (e) {
            $(".exc-btn-loading").hide();
            $(".exc-btn-sent").show();
            if (
                e.message.match(/Invocation of form runtime\.connect/) &&
                e.message.match(/doesn't match definition runtime\.connect/)
                ) {
                alert("Trình duyệt cần refrest lại mới sử dụng được chức năng này");
            console.error('Chrome extension, Actson has been reloaded. Please refresh the page');
        } else {
            throw (e);
        }
    }
}
});


$(document).on('click', '#facefone-page-mes', function (event) {
    var item = $(event.currentTarget);
    console.log(item);

    if(item[0].className.indexOf('loading')<0)
    {
        item[0].className = "facefone-cmt loading";
        if (chrome && chrome.runtime) {
            var port = chrome.runtime.connect();
            chrome.runtime.sendMessage({
                status: "getphone",
                uid: item.attr("uid"),
                src: 'Page Message',
                name: item.attr("uname")
            }, function (response) {
                var type = "";
                if (response.status==200)
                {
                    type= "success";
                    item[0].className = "facefone-cmt found";
                }
                else
                {
                    type= "warning";
                    item[0].className = "facefone-cmt notfound";
                }
                GetPhoneProcess(response.status,type, item.attr("uname"),response.data,response.picture,response.email,response.location);
            });
        }
    }
    
});

$(document).on('click', '#facefone-mes', function (event) {
    var item = $(event.currentTarget);
    console.log(item);
    // console.log(item.attr("url"));
    if(isNaN(item.attr("uid")))
    {
        GetPhoneProcess("404","error",item.attr("uname"),"Không thể quét nhóm chat","http://icons.iconarchive.com/icons/custom-icon-design/flatastic-1/64/cancel-icon.png","","");
    }
    else
    {
        if(item[0].className.indexOf('loading')<0)
        {
            item[0].className = "facefone-cmt loading";
            if (chrome && chrome.runtime) {
                var port = chrome.runtime.connect();
                chrome.runtime.sendMessage({
                    status: "getphone",
                    uid: item.attr("uid"),
                    src: 'Message',
                    name: item.attr("uname")
                }, function (response) {
                    var type = "";
                    if (response.status==200)
                    {
                        type= "success";
                        item[0].className = "facefone-cmt found";
                    }
                    else
                    {
                        type= "warning";
                        item[0].className = "facefone-cmt notfound";
                    }
                    GetPhoneProcess(response.status,type, item.attr("uname"),response.data,response.picture,response.email,response.location);
                });
            }
        }
    }
});

$(document).on('click', '#facefone-chat', function (event) {
    var item = $(event.currentTarget);
    if(item[0].className.indexOf('loading')<0)
    {
        item[0].className = "_3olv facefone-chat loading";
        item.attr('data-tooltip-content','Đang lấy SĐT của '+item.attr("uname"));
        if (chrome && chrome.runtime) {
            var port = chrome.runtime.connect();
            console.log(item.attr("url"));
            chrome.runtime.sendMessage({
                status: "getphone",
                uid: item.attr("uid"),
                src: 'Inbox',
                name: item.attr("uname")
            }, function (response) {
                console.log(response);
                var type = "";
                if (response.status==200)
                {
                    type= "success";
                    item[0].className = "_3olv facefone-chat found";
                    item.attr('data-tooltip-content','Tìm thấy SĐT của '+item.attr("uname"));
                }
                else
                {
                    type= "warning";
                    item[0].className = "_3olv facefone-chat notfound";
                    item.attr('data-tooltip-content','Không tìm thấy SĐT của '+item.attr("uname"));
                }

                GetPhoneProcess(response.status,type, item.attr("uname"),response.data,response.picture,response.email,response.location);
            });
        }
        return false;
    }
});

$(document).on('click', '#facefone-pancake', function (event) {
    var item = $(event.currentTarget);
    console.log(item);
    if(item[0].className.indexOf('loading')<0)
    {
        item[0].className = "facefone-pancake loading";
        if (chrome && chrome.runtime) {
            var port = chrome.runtime.connect();
            chrome.runtime.sendMessage({
                status: "getphone",
                uid: item.attr("uid"),
                src: item.attr("source"),
                name: item.attr("uname")
            }, function (response) {
                var type = "";
                if (response.status==200)
                {
                    type= "success";
                    item[0].className = "facefone-pancake found";
                }
                else
                {
                    type= "warning";
                    item[0].className = "facefone-pancake notfound";
                }

                GetPhoneProcess(response.status,type, item.attr("uname"),response.data,response.picture,response.email,response.location);
            });
        }
    }
});

$(document).on('click', '#facefone-share', function (event) {
    var item = $(event.currentTarget);
    console.log(item);
    if(item[0].className.indexOf('loading')<0)
    {
        item[0].className = "facefone-cmt loading";
        if (chrome && chrome.runtime) {
            var port = chrome.runtime.connect();
            chrome.runtime.sendMessage({
                status: "getphone",
                uid: item.attr("uid"),
                src: 'Share',
                name: item.attr("uname")
            }, function (response) {
                var type = "";
                if (response.status==200)
                {
                    type= "success";
                    item[0].className = "facefone-cmt found";
                    $(item).attr('data-content',response.data);
                }
                else
                {
                    type= "warning";
                    item[0].className = "facefone-cmt notfound";
                }
                GetPhoneProcess(response.status,type, item.attr("uname"),response.data,response.picture,response.email,response.location);
            });
        }
    }
});

$(document).on('click', '#facefone-cmt', function (event) {
    var item = $(event.currentTarget);
    $(item).attr('isclick',1);
    console.log(item);
    if(item[0].className.indexOf('loading')<0)
    {
        item[0].className = "facefone-cmt loading";
        if (chrome && chrome.runtime) {
            var port = chrome.runtime.connect();
            chrome.runtime.sendMessage({
                status: "getphone",
                uid: item.attr("uid"),
                src: 'Comment',
                name: item.attr("uname")
            }, function (response) {
                var type = "";
                if (response.status==200)
                {
                    type= "success";
                    item[0].className = "facefone-cmt found";
                    $(item).attr('data-content',response.data);
                }
                else
                {
                    type= "warning";
                    item[0].className = "facefone-cmt notfound";
                }
                GetPhoneProcess(response.status,type, item.attr("uname"),response.data,response.picture,response.email,response.location);
            });
        }
    }
});

$(document).on('click', '#facefone-like', function (event) {
    var item = $(event.currentTarget);
    $(item).attr('isclick',1);
    console.log(item);
    if(item[0].className.indexOf('loading')<0)
    {
        item[0].className = "facefone-cmt loading";
        if (chrome && chrome.runtime) {
            var port = chrome.runtime.connect();
            chrome.runtime.sendMessage({
                status: "getphone",
                uid: item.attr("uid"),
                src: 'Like',
                name: item.attr("uname")
            }, function (response) {
                var type = "";
                if (response.status==200)
                {
                    type= "success";
                    item[0].className = "facefone-cmt found";
                    $(item).attr('data-content',response.data);
                }
                // if (response.status==406)
                // {
                //     //Verify 
                //     type= "warning";
                //     item[0].className = "facefone-cmt found";
                // }
                else
                {
                    type= "warning";
                    item[0].className = "facefone-cmt notfound";
                }
                GetPhoneProcess(response.status,type, item.attr("uname"),response.data,response.picture,response.email,response.location);
            });
        }
    }
});
$(document).on('mouseenter', '._5i_t', function (event) {
    if ($('#exc-style').length <= 0) {
        $("head").append(style);
    }
    var item = $(event.currentTarget);
    console.log(item.find("#facefone-like").length);
    if (item.find("#facefone-like").length <= 0) {
        var data = item.find("._5j0e.fsl.fwb.fcb")[0].getElementsByTagName('a')[0];

        if (data.getAttribute('data-hovercard').indexOf('page') < 0) {
            console.log(data.getAttribute('data-hovercard'));
            // var uid = '100003046772052';
            var uid = new URL("https://admin.facefone.vn" + data.getAttribute('data-hovercard')).searchParams.get("id");
            console.log(uid);
            var uname = data.innerHTML;
            var url = data.href;
            var src = "Like";
            var src_link = $('#facefone-like-temp').text();
            item.find("._6a._5j0d").prepend('<div class="_6a _6b" style="height:40px"><div class="facefone-cmt" stype="height: 30px" uid = "' + uid + '" uname = "' + uname + '" url = "' + btoa(src_link) + '" id="facefone-like">' +
                '<div style="width:120px; float:left;" id="facefone-mes-text"></div>' +
                '<div style="width:10px; float:right;padding-right: 5px;padding-top: 2px;"><img style="width:14px;height:14px" src= ""/>' +
                '</div>' +
                '</div></div>');
        }
    }
});

$(document).on('click', '._5l-3._1ht1._1ht2._23_m', function (event) {
    if ($('#exc-style').length <= 0) {
        $("head").append(style);
    }
    var item = $(event.currentTarget);
    var uid = ((item.find('._5l-3._1ht5')[0].id.indexOf('id_thread')>=0)?"IsThread":item.find('._5l-3._1ht5')[0].id.split(':')[1]);
    var uname = item.find('._1qt3._5l-3')[0].getAttribute("data-tooltip-content");
    var url = window.location.href;
    
    if ($('#facefone-mes').length <= 0) {
        $('._fl2').prepend('<li><div class="facefone-cmt" uid = "'+uid+'" uname = "'+uname+'" url = "'+btoa(url)+'" id="facefone-mes">'+
            '<div style="width:120px; float:left;" id="facefone-mes-text"></div>'+
            '<div style="width:10px; float:right;padding-right: 5px;padding-top: 2px;"><img style="width:14px;height:14px" src= ""/>'+
            '</div>'+
            '</div></li>');
    }else{
        $('#facefone-mes')[0].className='facefone-cmt';
        $('#facefone-mes').attr("uid",uid);
        $('#facefone-mes').attr("url",btoa(url));
        $('#facefone-mes').attr("uname",uname);
    }
});

$(document).on('mouseenter', '._4t2a ._6a._5u5j._6b', function (event) {
    var share = $(event.currentTarget);
    if ($('#exc-style').length <= 0) {
        $("head").append(style);
    }

    if(share[0].parentNode.parentNode.innerHTML.indexOf('facefone-share') < 0)
    {
        var uid = share.find('.profileLink').data('hovercard').split('?id=')[1].split('&extragetparams')[0];
        var uname = share.find('.profileLink')[0].innerText;
        var url = share.find('._5pcq')[0].href;
        share[0].parentNode.style.width='300px';
        share[0].parentNode.parentNode.innerHTML = share[0].parentNode.parentNode.innerHTML 
        + '<div style="margin-right:20px" class="facefone-cmt" id="facefone-share" uid="'+uid+'" style="margin-right:20px" url="'+btoa(url)+'" uname="'+uname+'">'+
        '<div style="width:120px; float:left;" id="facefone-cmt-text"></div>'+
        '<div style="width:10px; float:right;padding-right: 5px;padding-top: 2px;"><img style="width:14px;height:14px" src="https://www.facebook.com/"></div>'+
        '</div>';
    }
    
});


$(document).on('mouseenter','._4eek ._42ef,.UFIComment ._42ef', function (event) {
    var cmt = $(event.currentTarget);var url ="";
    console.log(cmt);
    if ($('#exc-style').length <= 0) {
        $("head").append(style);
    }
    if(!$(cmt).attr('ishavebutton')) {
        $(cmt).attr('ishavebutton',1);
        var uid = $(cmt).find('a').data('hovercard').split('?id=')[1].split('&extragetparams')[0];
        var uname = $(cmt).find('a').first().text();
        $(cmt).find('div:eq(2)').after(
                        '<div class="facefone-cmt" id="facefone-cmt" uid="'+uid+'" uname="'+uname+'">'+
                        '<div style="width:120px; float:left;" id="facefone-cmt-text"></div>'+
                        '<div style="width:10px; float:right;padding-right: 5px;padding-top: 2px;"><img style="width:14px;height:14px" src= ""/>'+
                        '</div>'+
                        '</div>'
                        );
    }
    // $(document).on('click', '.UFIComment._4oep', function (event) {
    //     var cmt = $(event.currentTarget); var url = "";
    //     if ($('#exc-style').length <= 0) {
    //         $("head").append(style);
    //     }
    //     if (cmt.find('.UFICommentContent').length > 0) {
    //         cmt.find('.UFICommentContent').each(function (index, item) {
    //             if (!$(item).attr('ishavebutton')) {
    //                 $(item).after(
    //                     '<div class="fatel-cmt" id="fatel-cmt">' +
    //                     '<div style="width:120px; float:left;" id="fatel-cmt-text"></div>' +
    //                     '<div style="width:10px; float:right;padding-right: 5px;padding-top: 2px;"><img style="width:14px;height:14px" src= ""/>' +
    //                     '</div>' +
    //                     '</div>'
    //                 );
    //                 $(item).attr('ishavebutton', 1);
    //                 var data = cmt.find(".UFICommentActorName")[0];
    //                 console.log(data);
    //                 var uid = $(item).find('a').data('hovercard').split('?id=')[1].split('&extragetparams')[0];//new URL("http://fatel.vn"+data.getAttribute("data-hovercard")).searchParams.get("id");
    //                 console.log(uid);
    //                 var uname = data.innerHTML;
    //                 // var uid = $(item).prev().find('a').data('hovercard').split('?id=')[1].split('&extragetparams')[0];
    //                 // var uname = $(item).prev().find('a').text();
    //                 try {
    //                     url = cmt.find(".uiLinkSubtle")[0].href;
    //                 }
    //                 catch (err) {
    //                     url = document.location.href;
    //                 }
    //                 // var url = $(item).prev();
    //                 // uiLinkSubtle
    //                 $(item).next().attr('uid', uid);
    //                 $(item).next().attr('url', btoa(url));
    //                 $(item).next().attr('uname', uname);
    //             }
    //         })
    //     }
    // });
});

$(document).on('mouseleave','._4eek ._42ef,.UFIComment ._42ef', function (event) {
    var cmt = $(event.currentTarget);var url ="";
    console.log(cmt);
    if ($('#exc-style').length <= 0) {
        $("head").append(style);
    }
    if($(cmt).attr('ishavebutton') && !$(cmt).find('#facefone-cmt').attr('isclick')) {
        $(cmt).removeAttr('ishavebutton');
        var uid = $(cmt).find('a').data('hovercard').split('?id=')[1].split('&extragetparams')[0];
        var uname = $(cmt).find('a').first().text();
        $(cmt).find('#facefone-cmt').remove();
    }
});

//pagefs.fm click
$(document).on('click', '.conversation-list-item', function (event) {
    // console.log("pancake");
    if ($('#exc-style').length <= 0) {
        $("head").append(style);
    }
    if($('#facefone-pancake').length > 0)
    {
        $('#facefone-pancake')[0].className = "facefone-pancake";
    }
    var item = $(event.currentTarget);
    var uid = item.find('.ant-avatar-image').find('img')[0].src.replace("https://graph.facebook.com/","").split("/")[0];
    setTimeout(function () {
        var contentItem = $('#messageCol .media-list-conversation div span');
        var content = contentItem[0].innerText;

        var uname = $('#messageCol #pageCustomer span').text();
        var url = "https:" + $('#messageCol .chat-menu-bar li a').attr("href");
        var src = (url.indexOf('thread') >=0 ? "Pancake Message":"Pancake Comment");
        if(content.indexOf('Page')>=0)
        {
            uid = contentItem.find('a')[0].href.replace('https://facebook.com/',"");
            uname = contentItem.find('a')[0].innerText;
        }
        if($('#facefone-pancake').length <= 0)
        {
            $('.chat-menu-bar').prepend('<li style="width: 110px;">'+
                '<div title="Lấy SĐT của '+uname+'" id="facefone-pancake" uid="'+uid+'" uname="'+uname+'" url="'+btoa(url)+'" source="'+src+'" class="facefone-pancake" '+
                'preserveaspectratio="xMidYMid meet" ></div></li>');
        }
        else
        {
            $('#facefone-pancake').attr('uid',uid);
            $('#facefone-pancake').attr('uname',uname);
            $('#facefone-pancake').attr('url',btoa(url));
            $('#facefone-pancake').attr('source',src);
            $('#facefone-pancake').attr('title',"Lấy SĐT của "+uname);
        }
    }, 800);
    
});

//facebook/page/inbox click
$(document).on('click', '.fb_content table ._29xb ._4k8w', function (event) {
    if ($('#exc-style').length <= 0) {
        $("head").append(style);
    }
    var item = $(event.currentTarget);
    var url = document.URL;
    var uid = new URL(url).searchParams.get("selected_item_id");
    var uname = item.find('._4k8x').find('._4ik4._4ik5').find('span')[0].innerText;
    setTimeout(function () {
        if($('#facefone-page-mes').length<=0)
        {
            $('._33uz').prepend(
                '<div class="_suc _5bpf" data-tooltip-content="Lấy SĐT của '+uname+'" data-hover="tooltip" data-tooltip-position="below" style="padding-top:10px">'+
                '<div id="facefone-page-mes" url="'+btoa(url)+'" uname="'+uname+'" uid="'+uid+'" class="facefone-cmt">'+
                '<div style="width:120px; float:left;"></div>'+
                '<div style="width:10px; float:right;padding-right: 5px;padding-top: 2px;">'+
                '<img style="width:14px;height:14px" src=""></div></div>'+
                '</div>');
        }
        else
        {
            $('#facefone-page-mes')[0].className = "facefone-cmt";
            $('#facefone-page-mes').attr('uid',uid);
            $('#facefone-page-mes').attr('uname',uname);
            $('#facefone-page-mes').attr('url',btoa(url));
            // $('#facefone-page-mes').attr('source',src);
            $('#facefone-page-mes').attr('data-tooltip-content',"Lấy SĐT của "+uname);
        }
    }, 800);
});

function GetPhoneProcess(status,type,name,data,picture,email,location){
    if ($('#exc-style').length <= 0) {
        $("head").append(style);
    }
    //var item = $(event.currentTarget);
    notify({
        type: type, //alert | success | error | warning | info
        title: name,
        email: email,
        location: location,
        status: status,
        message: data,
        position: {
        x: "right", //right | left | center
        y: "bottom" //top | bottom | center
    },
        icon: '<img src="'+picture+'" />', //<i>
        size: "normal", //normal | full | small
        overlay: false, //true | false
        closeBtn: true, //true | false
        overflowHide: false, //true | false
        spacing: 20, //number px
        theme: "dark-theme", //default | dark-theme
        autoHide: true, //true | false
        delay: 6000, //number ms
        onShow: null, //function
        onClick: null, //function
        onHide: null, //function
        template: '<div class="notify"><div class="notify-text"></div><div class="copyButton"></div></div>'
    });
}