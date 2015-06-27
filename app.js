firebaseRef = new Firebase("https://21-app-library.firebaseio.com/");
var userName;
if(window.localStorage.getItem("userName") == null) {
    window.localStorage.removeItem("firebase:session::21-app-library");
    window.localStorage.removeItem("firebase:host:21-app-library.firebaseio.com");
    userName = "default";
} else {
    userName = window.localStorage.getItem("userName").toLowerCase();
    var y = userName.split("");
    y[0] = y[0].toUpperCase();
    y = y.join("");
    var displayName = y;
}
var loggedIn = firebaseRef.getAuth();
if (loggedIn == null) {
    App_LogOut();
}
firebaseRef.onAuth(function(d) {
    if(d == null) {
        window.localStorage.removeItem("firebase:session::21-app-library");
        window.localStorage.removeItem("firebase:host:21-app-library.firebaseio.com");
        userName = "default";
        vex.dialog.confirm({
            message: "Your login session has expired. Login again",
            callback: function(v) {
                if (v) {
                    App_LogInModal();
                } else {
                    
                }
            }
        })
        App_LogOut();
    } else {
        console.log(d);
    }
});
(function(d) {
    d.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function(f, e) {
        d.fx.step[e] = function(g) {
            if(!g.colorInit) {
                g.start = c(g.elem, e);
                g.end = b(g.end);
                g.colorInit = true
            }
            g.elem.style[e] = "rgb(" + [Math.max(Math.min(parseInt((g.pos * (g.end[0] - g.start[0])) + g.start[0]), 255), 0), Math.max(Math.min(parseInt((g.pos * (g.end[1] - g.start[1])) + g.start[1]), 255), 0), Math.max(Math.min(parseInt((g.pos * (g.end[2] - g.start[2])) + g.start[2]), 255), 0)].join(",") + ")"
        }
    });

    function b(f) {
        var e;
        if(f && f.constructor == Array && f.length == 3) {
            return f
        }
        if(e = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)) {
            return [parseInt(e[1]), parseInt(e[2]), parseInt(e[3])]
        }
        if(e = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)) {
            return [parseFloat(e[1]) * 2.55, parseFloat(e[2]) * 2.55, parseFloat(e[3]) * 2.55]
        }
        if(e = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)) {
            return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
        }
        if(e = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)) {
            return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
        }
        if(e = /rgba\(0, 0, 0, 0\)/.exec(f)) {
            return a.transparent
        }
        return a[d.trim(f).toLowerCase()]
    }

    function c(g, e) {
        var f;
        do {
            f = d.css(g, e);
            if(f != "" && f != "transparent" || d.nodeName(g, "body")) {
                break
            }
            e = "backgroundColor"
        } while (g = g.parentNode);
        return b(f)
    }
    var a = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    }
})(jQuery);

function App_AddAppFromModal(num) {
    console.log("entered modal func");
    if(num == 1) {
        $('#nameOfApp').val("");
        $('#imgUrlOfApp').val("");
        $('#websiteOfApp').val("");
        $('#addApp').modal('hide');
        //alert("canceled");
        return;
    } else {
        var name = $('#nameOfApp').val();
        var img = $('#imgUrlOfApp').val();
        var website = $('#websiteOfApp').val();
        $('#nameOfApp').val("");
        $('#imgUrlOfApp').val("");
        $('#websiteOfApp').val("");
        $('#addApp').modal('hide');
        if(website.indexOf("http") == -1) {
            website = "http://" + website;
        } else {}
        if(img.indexOf("http") == -1) {
            img = "http://" + img;
        } else {}
        App_Bitly(img, function(img_NEW) {
            var k = img_NEW.split("");
            k[k.length - 1] = undefined;
            img_NEW = k.join("");
            App_AddApp(name, img_NEW, website);
            //img = img_NEW;
            //App_AddApp(name, img_NEW, website_NEW);
            //App_Bitly(website, function(website_NEW) {
            //website = website_NEW;
            //v = website_NEW.split("");
            //v[v.length - 1] = undefined;
            // website_NEW = v.join("");
            //});
        });
        //alert("received");
    }
}

function App_Bitly(longUrl, callback) {
    var b = $.ajax({
        type: "GET",
        url: "https://api-ssl.bitly.com/v3/shorten?",
        data: {
            "access_token": "9a2861b820eb39eda2c7ad0955d92c3261710894",
            "longUrl": longUrl,
            "format": "txt"
        },
        success: function(a) {
            var b = a.split("http://");
            a = "https://" + b[1];
            callback(a);
        }
    });
    //console.log(b);
    //return b.responseText;
}

function App_DeleteApp(i) {
    var identifier = $(i).parent().parent(".app").attr("data-identifier");
    //alert(i.parent().parent(".app").attr("data-identifier"));
    firebaseRef.child("users/" + userName + "/apps/" + identifier + "/").set(null);
}

function App_AddApp(name, imglink, urllink) {
    //alert(imglink);
    var o = {};
    o.name = name;
    o.img = imglink;
    o.website = urllink;
    //alert("imglink");
    firebaseRef.child("users/" + userName + "/apps/").push(o);
    //location.reload();
}

function App_AddAppFromFirebase(name, imglink, urllink, appidentifier) {
    var app = $("<div class='app' data-identifier='" + appidentifier + "'>").html("<div class='app-delete'><img class='close' src='close.png' height='28' width='28' onclick='App_DeleteApp($(this))'></div><div class='app-title'></div><div class='app-img'></div><div class='app-link'></div>");
    $(app).find(".app-title").text(name);
    $(app).find(".app-img").html("<img>").find("img").attr("src", imglink).attr("width", "210em").attr("height", "200");
    $(app).find(".app-link").html("<a>").find("a").addClass("btn btn-primary").attr("href", urllink).text("Open App");
    $(app).appendTo(".main");
    //App_AppAnimations();
}
/*function App_AppAnimations() {
        $(".app").mouseover(function () {
            $(this).animate({
                backgroundColor: "yellow"
            }, "fast");
        }).mouseleave(function () {
            $(".app").animate({
                backgroundColor: "lightgreen"
            }, "fast");
        });
    }*/

function App_Generate15RandChar() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < 15; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function App_LogIn(us, pa) {
    us = us.toLowerCase();
    $.post("logIn.php", {
        "username": us,
        "password": pa
    }, function(data) {
        if(data.indexOf("Error: ") == -1) {
            var j = us.split("");
            j[0] = j[0].toUpperCase();
            j = j.join("");
            /*vex.dialog.alert({
                message: 'Welcome to App Library, ' + us + "!"
            });*/
            userName = us;
            window.localStorage.setItem("userName", us);
            firebaseRef.off("value");
            firebaseRef.authWithCustomToken(data, function(error) {
                if(error) {
                    vex.dialog.alert({
                        message: 'Error: ' + error
                    });
                    $("#loading").hide();
                    $("#examples").show();
                    $("#logInBtn").show();
                    $("#signUpBtn").show();
                    firebaseRef.child("users/" + "default" + "/apps/").on("value", function(b) {
                        getData(b);
                    });
                } else {
                    $("#examples").hide();
                    var y = userName.split("");
                    y[0] = y[0].toUpperCase();
                    y = y.join("");
                    var displayName = y;
                    //firebaseRef.off("value");
                    firebaseRef.child("users/" + userName + "/apps/").on("value", function(b) {
                        getData(b);
                    });
                    $("#loading").hide();
                }
            });
        } else {
            var b = data.split("");
            b[b.length - 1] = undefined;
            data = b.join("");
            vex.dialog.confirm({
                message: data + ".\nDo you want to try logging in again?",
                callback: function(value) {
                    if(value) {
                        App_LogInModal();
                    } else {
                        $("#loading").hide()
                        $("#examples").show();
                        $(".app").show();
                        $("#logInBtn").show();
                        $("#signUpBtn").show();
                        return;
                    }
                }
            });
        }
    });
}

function App_LogInModal() {
    $(".app").hide();
    $("#loading").show();
    $("#examples").hide();
    $("#logInBtn").hide();
    $("#signUpBtn").hide();
    vex.dialog.open({
        message: 'Enter your username and password: ',
        input: '<input name="username" type="text" placeholder="Username" required /> <input name="password" type="password" placeholder="Password" required />',
        buttons: [
            $.extend({}, vex.dialog.buttons.YES, {
                text: 'Login'
            }), $.extend({}, vex.dialog.buttons.NO, {
                text: 'Back'
            })
        ],
        callback: function(data) {
            if(data === false) {
                $(".app").show();
                $("#loading").hide();
                $("#examples").show();
                $("#logInBtn").show();
                $("#signUpBtn").show();
            } else {
                App_LogIn(data.username, data.password);
            }
        }
    });
}
var getData = function(a) {
    var y = userName.split("");
    y[0] = y[0].toUpperCase();
    y = y.join("");
    var displayName = y;
    $(".app").remove();
    $("#loading").hide();
    $("#loggedInBtnDiv").hide();
    $("#search").hide();
    $("#ifSearchNotAvailable").hide();
    $("#signBtnGroup").hide();
    if(userName == "default") {
        $("#ifSearchNotAvailable").show();
        $("#signBtnGroup").show();
        $("#logInBtn").show();
        $("#signUpBtn").show();
        $("#examples").show();
        var newApps = a.val();
        //newApps["key"] = undefined;
        //console.log(newApps);
        //tt = newApps;
        //console.log(newApps);
        for(var app in newApps) {
            //console.log(app);
            App_AddAppFromFirebase(newApps[app]["name"], newApps[app]["img"], newApps[app]["website"], app);
        }
        $(".app-delete").remove();
        //$(".main").append($("<div class='app'>").html("<div class='add'><button data-toggle='modal' data-target='#addApp' class='glyphicon glyphicon-plus'></button></div>"));
    } else {
        $("#logInBtn").hide();
        $("#signUpBtn").hide();
        $("#userNameField").text(displayName);
        $("#loggedInBtnDiv").show();
        $("#search").show();
        newApps = a.val();
        //appListFromFirebase = newApps;
        //console.log(newApps);
        savedApps = newApps;
        for(var app in newApps) {
            App_AddAppFromFirebase(newApps[app]["name"], newApps[app]["img"], newApps[app]["website"], app);
        }
        $(".main").append($("<div id='addAppCard' class='app'>").html("<div class='add'><button data-toggle='modal' data-target='#addApp' class='glyphicon glyphicon-plus'></button></div>"));
        $("#addAppCard").height($(".app").height());
        $("#searchInput").keyup(function() {
            App_SearchApps();
        });
    }
}

var savedApps = {};

function App_LogOut() {
    firebaseRef.off("value");
    firebaseRef.unauth();
    userName = "default";
    window.localStorage.removeItem("userName");
    //location.reload();
    firebaseRef.child("users/" + "default" + "/apps/").on("value", function(b) {
        getData(b);
    });
    //location.reload();
}
var newApps;
/*function callSearchKeydown() {
    $("#searchInput").keydown(App_SearchApps());
}*/

function App_SearchApps() {
    //$("#searchInput").keydown(App_SearchApps());
    //callSearchKeydown();
    if($("#searchInput").val() == "") {
        $(".app").show();
        $("#addAppCard").show();
    } else {
        $(".app").hide();
        $("#addAppCard").show();
        for(var o in savedApps) {
            if(savedApps[o]["name"].toLowerCase().indexOf($("#searchInput").val()) !== -1) {
                $("[data-identifier=" + o + "]").show();
                $("#addAppCard").show();
            } else {
                $("#addAppCard").show();
            }
        }
    }
}

function App_Main() {
    //alert("Anonymous func");
    if(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|BB10|Opera Mini/i.test(navigator.userAgent)) {
        $(".main").css("text-align", "center");
        $(".taskbar").css("text-align", "center");
        $("#examples").css("width", "100%");
        $("#examples").css("text-align", "center");
        $("#examples").css("margin-left", "0");
    } else {}
    //if (document.location.origin !== "http://brenda-exotic-4500.codio.io" || document.location.origin !== "http://brenda-exotic-3000.codio.io") {
    //  document.location = "https://brenda-exotic-4500.codio.io";
    //}
    firebaseRef.child("users/" + userName + "/apps/").on("value", function(b) {
        getData(b);
        //App_AddApp(newApp.name, newApp.img, newApp.website);
        //firebaseRef.off("");
    });
    /*firebaseRef.child("apps/").on("child_changed", function () {
        $(".app").remove();
        firebaseRef.child("apps/").on("child_added", function (a) {
            var newApp = a.val();
            App_AddApp(newApp.name, newApp.img, newApp.website);
            firebaseRef.off("child_added");
        });
    });*/
    //App_AppAnimations();
    $("#addApp").keydown(function(e) {
        if(e.which == 13) {
            $("#addAppBTN").trigger("click");
        }
        if(e.which == 27) {
            $('#nameOfApp').val("");
            $('#imgUrlOfApp').val("");
            $('#websiteOfApp').val("");
            $('#addApp').modal('hide');
        }
    });
    $("#addAppBTN").click(function() {
        //App_AddApp($('#nameOfApp').val(), $('#imgUrlOfApp').val(), $('#websiteOfApp').val());
        console.log("click func");
        //App_AddAppFromModal(1);
    });
    if(window.location.hostname == "brenda-exotic.codio.io") {
        $("#logInBtn").remove();
        $("#signUpBtn").remove();
        App_LogIn = undefined;
        App_LogOut = undefined;
        App_LogInModal = undefined;
        App_AddAppFromModal = undefined;
        vex.dialog.confirm({
            message: 'You are using an old version of this website which does not support logging in. Redirect to the new page?',
            callback: function(value) {
                if(value) {
                    location.href = "https://brenda-exotic-3000.codio.io/";
                } else {
                    $("#logInBtn").remove();
                    $("#signUpBtn").remove();
                }
            }
        });
    }
}
$(App_Main);