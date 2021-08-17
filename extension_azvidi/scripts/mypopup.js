var authcode;

function copyPhone() {
    document.oncopy = function (event) {
        $item = event.target;
        event.clipboardData.setData("text/plain", $item.innerHTML);
        event.preventDefault();
    };
    document.execCommand("Copy", false, null);
}

function switchpanel(event) {
    $item = event.target;
    if ($item.className.indexOf('active') >= 0) {
        localStorage.switchpanel = "seoquake-slider-button";
        $item.className = localStorage.switchpanel;
    }
    else {
        localStorage.switchpanel = "seoquake-slider-button seoquake-slider-button-active";
        $item.className = localStorage.switchpanel;
    }
    checkswitchpanel($item.className);
}

function checkswitchpanel(className) {
    if (className.indexOf('active') >= 0)
        $('#ScanHistory').fadeIn();
    else
        $('#ScanHistory').fadeOut();
}

$(document).ready(function () {
    if (!localStorage.switchpanel)
        localStorage.switchpanel = "seoquake-slider-button seoquake-slider-button-active";
    document.getElementById("switch-panel").className = localStorage.switchpanel;
    checkswitchpanel(localStorage.switchpanel);
    document.getElementById("switch-panel").addEventListener("click", switchpanel);

    authcode = localStorage.accessToken;
    // console.log(JSON.stringify(authcode));
    if (authcode) {
        //get Info
        $(".data-login").hide();
        $(".data-panel").show();
        $(".loading-login").show();
        $(".info").hide();
        $.ajax({
            type: "GET",
            url: localStorage.domain + "/api/user-info",
            data: {
                token: authcode
            },
            dataType: "json",
            success: function (response) {
                // res = JSON.stringify(response);
                // alert(res);
                // alert(response.user.name);

                if (response.status == 200) {
                    $("#profile-name").text(response.user.name);
                    if (response.user.avatar) {
                        $("#profile-picture").attr("src", response.user.avatar);
                    } else {
                        $("#profile-picture").attr("src", 'img/avatar.png');
                    }

                    if (response.user.roles[0].name == 'guess') {
                        $("#profile-type").text("Điểm còn lại:");
                        $("#profile-expired").text(response.user.credit - response.user.profit + " điểm");

                    } else {
                        $("#profile-type").text("Hạn sử dụng:");
                        $("#profile-expired").text(response.user.expired);
                    }
                    $(".profile .data").show();
                    $(".loading-login").hide();
                    $(".info").show();
                }
                else {
                    localStorage.removeItem('accessToken');
                    $(".data-login").show();
                    $(".data-panel").hide();
                    $(".loading-login").hide();
                    $(".info").hide();
                }
                $(".profile #loading").hide();
            }
        });
        //get Scan

        $.ajax({
            type: "GET",
            url: localStorage.domain + "/api/list-scan",
            data: {
                token: authcode
            },
            dataType: "json",
            success: function (response) {

                if (response.status == 200) {
                    if (response.data !== false && Object.keys(response.data).length > 0) {
                        var length = Object.keys(response.data).length;
                        var i;
                        var table = document.getElementById("data-lastscan");
                        for (i = 0; i < length; i++) {
                            var ScanRow = response.data[i];
                            var row = table.insertRow(1);
                            var ScanDate = row.insertCell(0);
                            var Name = row.insertCell(1);
                            // var Gender = row.insertCell(2);
                            // var Source = row.insertCell(3);
                            // var Location = row.insertCell(4);
                            var Phone = row.insertCell(2);
                            var uName = '';
                            if (ScanRow.name) {
                                uName = ScanRow.name;
                                if (uName.length > 15)
                                    uName = uName.substr(0, 15) + "...";
                            }
                            // var uSource = '';
                            // if (ScanRow.location) {
                            //     uSource = ScanRow.location;
                            //     if (uSource.length > 24)
                            //         uSource = uSource.substr(0, 24) + "...";
                            // }
                            var src_link = '#';
                            if (ScanRow.link) {
                                src_link = ScanRow.link;
                            }
                            var gender = 'N/A';
                            if (ScanRow.gender)
                                gender = ScanRow.gender.replace("0", "Nữ").replace("1", "Nam")

                            ScanDate.innerHTML = ScanRow.created_at;
                            Name.innerHTML = "<a class= 'atext' id ='atext' href='" + ScanRow.link + "' target='_blank'>" + uName + "</a>";
                            // Gender.innerHTML = gender;
                            // Source.innerHTML = "<a class= 'atext' id ='atext' href='" + src_link + "' target='_blank'>" + ScanRow.source + "</a>";
                            // Location.innerHTML = uSource;
                            Phone.innerHTML = ((isNaN(ScanRow.phone.replace("+", "")) ? ScanRow.phone : "<span class='atext' id='btnCopyPhone'>" + ScanRow.phone + "</span>"));
                            document.getElementById("btnCopyPhone").addEventListener("click", copyPhone);
                        }
                    }

                    $(".profile .data").show();
                    $(".loading-login").hide();
                    $(".info").show();

                } else {
                    localStorage.removeItem('accessToken');
                    $(".data-login").show();
                    $(".data-panel").hide();
                    $(".loading-login").hide();
                    $(".info").hide();
                }
                $(".profile #loading").hide();
            }
        });
    } else {
        $(".data-login").show();
        $(".data-panel").hide();
        $(".loading-login").hide();
        $(".info").hide();
    }

    $(".logout").click(function () {
        localStorage.removeItem('accessToken');
        $(".data-login").show();
        $(".data-panel").hide();
        $(".loading-login").hide();
        $(".info").hide();
    })
});
