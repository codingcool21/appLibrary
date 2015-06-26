var userName = "default";
(function (d) {
    d.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function (f, e) {
        d.fx.step[e] = function (g) {
            if (!g.colorInit) {
                g.start = c(g.elem, e);
                g.end = b(g.end);
                g.colorInit = true
            }
            g.elem.style[e] = "rgb(" + [Math.max(Math.min(parseInt((g.pos * (g.end[0] - g.start[0])) + g.start[0]), 255), 0), Math.max(Math.min(parseInt((g.pos * (g.end[1] - g.start[1])) + g.start[1]), 255), 0), Math.max(Math.min(parseInt((g.pos * (g.end[2] - g.start[2])) + g.start[2]), 255), 0)].join(",") + ")"
        }
    });

    function b(f) {
        var e;
        if (f && f.constructor == Array && f.length == 3) {
            return f
        }
        if (e = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(f)) {
            return [parseInt(e[1]), parseInt(e[2]), parseInt(e[3])]
        }
        if (e = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(f)) {
            return [parseFloat(e[1]) * 2.55, parseFloat(e[2]) * 2.55, parseFloat(e[3]) * 2.55]
        }
        if (e = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(f)) {
            return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
        }
        if (e = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(f)) {
            return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
        }
        if (e = /rgba\(0, 0, 0, 0\)/.exec(f)) {
            return a.transparent
        }
        return a[d.trim(f).toLowerCase()]
    }

    function c(g, e) {
        var f;
        do {
            f = d.css(g, e);
            if (f != "" && f != "transparent" || d.nodeName(g, "body")) {
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
    if (num == 1) {
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
        if (website.indexOf("http") == -1) {
            website = "http://" + website;
        } else {}
        if (img.indexOf("http") == -1) {
            img = "http://" + img;
        } else {}
        App_Bitly(img, function (img_NEW) {
            //img = img_NEW;
            App_Bitly(website, function (website_NEW) {
                //website = website_NEW;
                App_AddApp(name, img_NEW, website_NEW);
            });
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
        success: function (a) {
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
    firebaseRef.child("users/" + userName + "/" + identifier + "/").set(null);
}

function App_AddApp(name, imglink, urllink) {
    //alert(imglink);
    var o = {};
    o.name = name;
    o.img = imglink;
    o.website = urllink;
    //alert("imglink");
    firebaseRef.child("users/" + userName + "/").push(o);
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
    for (var i = 0; i < 15; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function App_Main() {
    //if (document.location.origin !== "http://brenda-exotic-4500.codio.io" || document.location.origin !== "http://brenda-exotic-3000.codio.io") {
      //  document.location = "https://brenda-exotic-4500.codio.io";
    //}
    firebaseRef = new Firebase("https://21-app-library.firebaseio.com/");
    firebaseRef.child("users/" + userName).on("value", function (a) {
        $(".app").remove();
        $("#loading").hide();
        var newApps = a.val();
        //appListFromFirebase = newApps;
        for (var app in newApps) {
            App_AddAppFromFirebase(newApps[app]["name"], newApps[app]["img"], newApps[app]["website"], app);
        }
        $(".main").append($("<div class='app'>").html("<div class='add'><button data-toggle='modal' data-target='#addApp' class='glyphicon glyphicon-plus'></button></div>"));
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

    $("#addApp").keydown(function (e) {
        if (e.which == 13) {
            $("#addAppBTN").trigger("click");
        }
        if (e.which == 27) {
            $('#nameOfApp').val("");
            $('#imgUrlOfApp').val("");
            $('#websiteOfApp').val("");
            $('#addApp').modal('hide');
        }
    });
    $("#addAppBTN").click(function () {
        //App_AddApp($('#nameOfApp').val(), $('#imgUrlOfApp').val(), $('#websiteOfApp').val());
        console.log("click func");
        //App_AddAppFromModal(1);
    });

}
$(App_Main);
