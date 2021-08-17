
var successURL = 'https://www.facebook.com/connect/login_success.html';
localStorage.domain = 'https://admin.facefone.vn';

function getUTM(name) {
  if (localStorage.getItem(name))
    return localStorage.getItem(name);
  return "";
}

function onFacebookLogin() {
  chrome.tabs.getAllInWindow(null, function (tabs) {
    for (var i = 0; i < tabs.length; i++) {
      if (tabs[i].url.indexOf(successURL) == 0) {
        var params = tabs[i].url.split('#')[1];
        var auth = {
          utm_source: getUTM('azvidi_utm_source'),
          utm_medium: getUTM('azvidi_utm_medium'),
          utm_name: getUTM('azvidi_utm_name'),
          utm_term: getUTM('azvidi_utm_term'),
          seller: getUTM('azvidi_utm_content'),
          accessToken: params.split('&')[0].replace("access_token=", "")
        };
        // alert(auth.accessToken);
        chrome.tabs.get(tabs[i].id, function () {
          if (chrome.runtime.lastError) {
            console.log(chrome.runtime.lastError.message);
          } else {
            chrome.tabs.remove(tabs[i].id);
          }
        });
        $.ajax({
          type: "GET",
          url: localStorage.domain + "/api/loginFb",
          data: auth,
          dataType: "json",
          success: function (response) {
            
            // alert(res);
            if (response.status == 200) {
              localStorage.accessToken = response.token;
              // alert(localStorage.accessToken);
            }
            // console.log(tabs[i].id);

            //switch tab
            chrome.tabs.query({
              currentWindow: true,
              url: ["*://*.smax.in/*", "*://smax.in/*", "*://pages.fm/*"]
            }, function (tabs) {
              if (tabs.length > 0) {
                chrome.tabs.update(tabs[0].id, { "active": true }, function (tab) { });
              }
            });
          }
        });
        return;
      }
    }
  });
}

chrome.tabs.onUpdated.addListener(onFacebookLogin);

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {

    if (request.status == "getphone") {
      if (localStorage.accessToken) {
        $.ajax({
          cache: false,
          url: localStorage.domain + "/api/member-info",
          type: "GET",
          data: {
            uid: request.uid,
            src: request.src,
            name:  request.name,
            token: localStorage.accessToken
          },
          success: function (res) {
            // response = JSON.stringify(res);
            // alert(response);

            if (res.status == 200 || res.status == 201) {
              sendResponse({ status: res.status, data: res.message, picture: 'http://graph.facebook.com/'+request.uid+'/picture?type=square', email: res.message.email, location: '' });
            }
            else if(res.status == 401){
              sendResponse({ status: res.status, data: res.message, picture: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-1/64/cancel-icon.png', email: "", location: "" });
            }
          }
        });
      } else {
        sendResponse({ status: 400, data: "Vui lòng đăng nhập extension", picture: 'http://icons.iconarchive.com/icons/custom-icon-design/flatastic-1/64/cancel-icon.png', email: "", location: "" });
      }
    }
    else if (request.status == "login") {
      chrome.tabs.create({ url: "https://www.facebook.com/dialog/oauth?client_id=1931115790243808&response_type=token&scope=email&redirect_uri=https://www.facebook.com/connect/login_success.html", email: "", location: "" });
      sendResponse({ success: true })
    }
    return true;
  });