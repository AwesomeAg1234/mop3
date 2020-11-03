var fs = require("fs");
var userIP;
var username;
var myScript = document.createElement("script");
myScript.setAttribute("src", "http://mope2.io/userIP.php?v=" + Math.random());
document.body.appendChild(myScript);
//fs.writeFile('log.txt', `user ${userIP} joined!`, function(err) {
   //if (err) {
    //  return console.error(err);
  // }
function writeLog(string) {
  fs.writeFile('log.txt',String(string), function(err) {
    if (err) {
      console.log("error")
    }
  })
}
function stringToHash(string) { 
                  
                var hash = 0; 
                  
                if (string.length == 0) return hash; 
                  
                for (i = 0; i < string.length; i++) { 
                    char = string.charCodeAt(i); 
                    hash = ((hash << 5) - hash) + char; 
                    hash = hash & hash; 
                } 
                  
                return String(hash); 
            } 
var camzoom = 26;
(function() {
    var t = {
        scope: {}
    };
    t.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(t, e, a) {
        if (a.get || a.set)
            throw new TypeError("ES3 does not support getters and setters.");
        t != Array.prototype && t != Object.prototype && (t[e] = a.value)
    }
    ;
    t.getGlobal = function(t) {
        return "undefined" != typeof window && window === t ? t : "undefined" != typeof global ? global : t
    }
    ;
    t.global = t.getGlobal(this);
    t.polyfill = function(e, a, i, n) {
        if (a) {
            i = t.global;
            e = e.split(".");
            for (n = 0; n < e.length - 1; n++) {
                var s = e[n];
                s in i || (i[s] = {});
                i = i[s]
            }
            e = e[e.length - 1];
            n = i[e];
            a = a(n);
            a != n && null != a && t.defineProperty(i, e, {
                configurable: !0,
                writable: !0,
                value: a
            })
        }
    }
    ;
    t.polyfill("Array.prototype.fill", function(t) {
        return t ? t : function(t, e, a) {
            var i = this.length || 0;
            0 > e && (e = Math.max(0, i + e));
            if (null == a || a > i)
                a = i;
            a = Number(a);
            0 > a && (a = Math.max(0, i + a));
            for (e = Number(e || 0); e < a; e++)
                this[e] = t;
            return this
        }
    }, "es6-impl", "es3");
    t.polyfill("Math.trunc", function(t) {
        return t ? t : function(t) {
            t = Number(t);
            if (isNaN(t) || Infinity === t || -Infinity === t || 0 === t)
                return t;
            var e = Math.floor(Math.abs(t));
            return 0 > t ? -e : e
        }
    }, "es6-impl", "es3");
    var e = 153
      , a = !1
      , i = "45.63.15.119"
      , n = 400
      , s = []
      , l = {
        USA: []
    };
    function r(t, e, a) {
        t = {
            name: t,
            ip: e,
            region: a,
            playersCount: -1,
            ping: 1e4,
            domOptionIndex: 0
        };
        s.push(t);
        l[a].push(t);
        return t
    }
    if (a)
        o = "USA",
        console.log("DEBUG MODE!!!!!!!!!!!!!!!!!!!!!!!", o),
        r("LOCAL TEST", "", o);
    else {
        var o = "USA";
        //var europe = "EUROPE"
        //var asia = "ASIA"
		r("US WEST", "52.38.222.2", o);
    //r("LONDON 1", "52.56.69.195", o)
    //r("INDIA", "13.126.210.66", o)
        //r("TESTSERVER", "0.0.0.0", o);
       // r("LOCALTESTING2", "0.0.0.0", o);
    }
    var h = 2;
    function c(t) {
        t = t.split("+").join(" ");
        for (var e = {}, a, i = /[?&]?([^=]+)=([^&]*)/g; a = i.exec(t); )
            e[decodeURIComponent(a[1])] = decodeURIComponent(a[2]);
        return e
    }
    var f = c(document.location.search)
      , g = 0 < f.mobileios
      , u = 0 < f.mobileAndroid
      , p = g || u
      , y = !1
      , m = 0 < f.videoson
      , w = 0 < f.nofullscr
      , b = !1
      , I = f.s
      , P = f.l;
    null != I && null != P && 5 < P.length && (b = !0);
    function M(t) {
        this.serverObj = t;
        this.testWs = new WebSocket("ws://" + this.serverObj.ip + ":7020");
        this.startT = +new Date;
        this.testWs.binaryType = "arraybuffer";
        var e = this;
        this.pingsDelayMsTot = this.pingsRec = 0;
        this.testWs.onopen = function() {
            e.sendPing()
        }
        ;
        this.sendPing = function() {
            var t = new Ja(1);
            t.writeUInt8(255);
            e.testWs.send(t.dataView.buffer);
            this.startT = +new Date
        }
        ;
        this.testWs.onmessage = function(t) {
            t = new Va(new DataView(t.data));
            255 == t.readUInt8() && (t = +new Date - e.startT,
            e.pingsRec += 1,
            e.pingsDelayMsTot += t,
            3 <= e.pingsRec ? (e.serverObj.ping = e.pingsDelayMsTot / e.pingsRec,
            e.testWs.close(),
            C(e)) : e.sendPing())
        }
    }
    var v = Ta(0, Math.max(0, s.length - 1 - h)), A = s[v], x = s[Math.max(0, Ta(0, s.length - 1 - h))], T = x.region, k = [], S = !1, E;
    function U() {
        if (!S) {
            S = !0;
            for (var t in l)
                l.hasOwnProperty(t) && 0 < l[t].length && k.push(new M(l[t][0]));
            E = setTimeout(function() {
                for (var t = 0; t < k.length; t++)
                    k[t].testWs.close();
                D()
            }, 3e3)
        }
    }
    function C(t) {
        t.serverObj.ping < x.ping && (x = t.serverObj);
        t = k.indexOf(t);
        -1 != t && k.splice(t, 1);
        0 == k.length && (console.log("pingtest: all finished"),
        E && clearTimeout(E),
        D())
    }
    function D() {
        S = !1;
        console.log("@@@@  Fastest region is " + x.region + " with ping " + x.ping + "ms ");
        var t = l[x.region].slice();
        t.sort(function(t, e) {
            return t.playersCount < e.playersCount ? 1 : t.playersCount > e.playersCount ? -1 : 0
        });
        for (var e = !1, a = 0; a < t.length; a++)
            if (t[a].playersCount < n) {
                A = t[a];
                v = s.indexOf(A);
                e = !0;
                break
            }
        if (!e)
            for (a = 0; a < t.length; a++)
                if (t[a].playersCount < 2 * n) {
                    A = t[a];
                    v = s.indexOf(A);
                    e = !0;
                    break
                }
        e || (A = t[Ta(0, t.length - 1)],
        v = s.indexOf(A));
        T = x.region;
        ti();
        $a();
        console.log("Connecting to best server...");
        ii() && ya.close();
        Ka()
    }
    var B;
    function _(t) {
        if (window.WebViewJavascriptBridge)
            return t(WebViewJavascriptBridge);
        if (window.WVJBCallbacks)
            return window.WVJBCallbacks.push(t);
        window.WVJBCallbacks = [t];
        var e = document.createElement("iframe");
        e.style.display = "none";
        e.src = "wvjbscheme://__BRIDGE_LOADED__";
        document.documentElement.appendChild(e);
        setTimeout(function() {
            document.documentElement.removeChild(e)
        }, 0)
    }
    g && _(function(t) {
        B = t;
        t.registerHandler("testJavascriptHandler", function(t, e) {
            console.log("ObjC called testJavascriptHandler with", t);
            e({
                "Javascript Says": "Right back atcha!"
            })
        })
    });
    function O() {
        B && g && B.callHandler("adShowCallBack", {
            foo: "bar"
        }, function(t) {
            console.log("JS got response " + t)
        })
    }
    function R() {
        console.log("Showing ad android...");
        window.location = "myscheme://showAdmob"
    }
    var F = 0
      , L = 0;
    if (window.localStorage)
        var W = 1 * window.localStorage.getItem("lastAdShowT") || 0
          , H = +new Date - W
          , L = 0 < H ? W : 0
          , F = 1 * window.localStorage.getItem("gamesSinceAd");
    var G = 0
      , Y = +new Date
      , N = !1;
    function X() {
        return !y || p || "undefined" == typeof adplayer ? (console.log("preroll: no show: ads disabled"),
        !1) : m ? (console.log("preroll: test mode, always show video ad!"),
        !0) : 1 > G && 0 == L ? (console.log("preroll: no show: NEW PLAYER, no games yet started!"),
        !1) : 300 < (+new Date - L) / 1e3 && 0 < F ? (console.log("preroll: show: time limit passed!"),
        !0) : 3 <= F ? (console.log("preroll: show: 3+ games passed!"),
        !0) : !1
    }
    function z() {
        "undefined" != typeof aipPlayer ? (console.log("Loading video preroll..."),
        adplayer = new aipPlayer({
            AD_WIDTH: 960,
            AD_HEIGHT: 540,
            AD_FULLSCREEN: !1,
            PREROLL_ELEM: document.getElementById("preroll"),
            AIP_COMPLETE: function() {
                console.log("Video ad finished.");
                N = !1;
                F = 0;
                L = +new Date;
                if (window.localStorage)
                    try {
                        window.localStorage.setItem("lastAdShowT", L),
                        window.localStorage.setItem("gamesSinceAd", F)
                    } catch (t) {}
                bi()
            }
        })) : (console.log("Video ad (blocked) -finished."),
        N = !1,
        bi())
    }
    function j(t, e) {
        var a = document.head || document.getElementsByTagName("head")[0]
          , i = document.createElement("script")
          , n = !0;
        i.async = "async";
        i.type = "text/javascript";
        i.charset = "UTF-8";
        i.src = t;
        i.onload = i.onreadystatechange = function() {
            !n || i.readyState && !/loaded|complete/.test(i.readyState) || (n = !1,
            e(),
            i.onload = i.onreadystatechange = null)
        }
        ;
        a.appendChild(i)
    }
    y && !p && j("//api.adinplay.com/player/v2/MOP/mope.io/player.min.js", z);
    var V = .175
      , J = "#3FBA54"
      , q = "#09992F"
      , Z = "#4ae05e"
      , K = "#4E66E4"
      , Q = "#4655A6"
      , $ = "#F35F53"
      , tt = "#CF6259"
      , et = "#FF911E"
      , at = "#C67019"
      , it = "#EF3C31"
      , nt = q
      , st = "#4AE05E"
	  , boardBar = !0
	  , xpbar = !0
	  , waterbar = !1
	  , mapbar = !1
      , lt = "#8C9688";
    this.getOutlineColor = function() {
        return this.isGreenOutlined() ? "#4AE05E" : q
    }
    ;
    this.isGreenOutlined = function() {
        return this.oType == Ct ? 0 < ha[this.type - 1] : 0 < ca[this.oType - 1]
    }
    ;
	    var V = .175,
    LAND_CL = "#3FBA54",
    HILL_CL = "#09992F",
    Z = "#09992F",
    WATER_DROP_CL = "#4E66E4",
    WATER_SOURCE_COLOR = "#4854a2", // #4854a2
    BERRY_CL = "#F35F53",
    BERRY_BUSH_CL = "#CF6259",
    CAVIAR_CL = "#FF911E",
    CAVIAR_BUSH_CL = "#C67019",
    OUTLINE_PREDATOR = "#EF3C31", // #EF3C31
    nt = HILL_CL,
    OUTLINE_EDIBLE = "#4AE05E", // #4AE05E
    ROCK_CL = "#8C9688";
    boardBar = !0,
    xpbar = !0,
    waterbar = !1,
    mapbar = !1;
    this.getOutlineColor = function() {
        return this.isGreenOutlined() ? OUTLINE_EDIBLE : HILL_CL
    };
    this.isGreenOutlined = function() {
        return this.oType == O_PLAYER ? 0 < ha[this.type - 1] : 0 < ca[this.oType - 1]
    };
    var MOUSE = 1,
    RABBIT = 2,
    PIG = 3,
    FOX = 4,
    DEER = 5,
    MOLE = 6,
    ZEBRA = 7,
    ut = 8,
    pt = 9,
    yt = 10,
    mt = 11,
    wt = 12,
    bt = 13,
    It = 15,
    Pt = 16,
    Mt = 17,
    vt = 18,
    At = 19,
    xt = 20,
    Tt = 21,
    kt = 22,
    St = 23,
    Et = 24,
    PUFFERFISH = 25,
	dinomon = 33,
	elephant = 34,
    DOLPHIN = 26,
    DUGONG = 27,
    HIGHBROW_BOTTLENOSE = 28,
    KILLER_WHALE = 29,
    GIANT_SQUID = 30,
	AwesomeAg = 35,
	GOATGAMER = 36,
	THEBIGFOOT = 31,
    ProXYGamer = 32,
    BlackDragon = 37,
    stingerr = 69,
    Ut = 1,
    O_PLAYER = 2,
    HILL = 3,
    WATER_SOURCE = 4,
    BERRY_BUSHES = 5,
    BERRY = 6,
    WATER_DROP = 7,
    MUSHROOM = 8,
    SMALL_HOLE = 9,
    GREEN_BUSH = 10,
    MUD = 11,
    ROCKS = 12,
    ROCK = 12,
    BIG_HOLE = 13,
    LAKE = 14,
    LILYPAD = 15,
    ISLAND = 16,
    REDMUSHROOM = 17,
    BIG_MUSHROOM = 18,
    OCEAN_BIOME = 19,
    CAVIAR = 20,
    CAVIAR_BUSH = 21,
    WHIRLPOOL = 22,
    LIGHTNING = 23,
    SQIUD_INK = 24,
	PEAR = 25,
	VOLCANO = 26,
	BOOST_SPEED = 27,
	YETI_ABILITY = 28,
	NEW_OBJ = 29
	  , rt = 1
      , ot = 2
      , ht = 3
      , dt = 4
      , ct = 5
      , ft = 6
      , gt = 7
      , ut = 8
      , pt = 9
      , yt = 10
      , mt = 11
      , wt = 12
      , bt = 13
      , It = 14
      , Pt = 15
      , Mt = 16
      , vt = 17
      , At = 18
      , xt = 19
      , Tt = 20
      , kt = 21
      , St = 22
      , Et = 23
      , Ut = 1
      , Ct = 2
      , Dt = 3
      , Bt = 4
      , _t = 5
      , Ot = 6
      , Rt = 7
      , Ft = 8
      , Lt = 9
      , Wt = 10
      , Ht = 11
      , Gt = 12
      , Yt = 13
      , Nt = 14
      , Xt = 15
      , zt = 16
      , jt = 17
      , Vt = 18
      , Jt = 19
      , qt = 20
      , Zt = 21
      , Kt = 22
      , Qt = 23
      , $t = 24
      , te = document.getElementById("gCanvas")
      , ee = null
      , ae = null
      , ie = te.getContext("2d");
    ie.shadowColor = "black";
    var ne = !1, se = Math.min(window.devicePixelRatio, 2), le = n_camzoom = 2.7, le = 1, re = camy = n_camx = n_camy = o_camx = o_camy = 0, oe = 1, he = 0, de = 0, ce = 0, fe = 0, ge = 0, ue = 0, pe = !1, ye = !1, me, we, be = 0, Ie = 0;
    skins = {};
    var Pe = !1
      , Me = !1
      , ve = !1
      , Ae = !1
      , xe = !1;
    if (window.localStorage) {
        Pe = 0 < window.localStorage.getItem("options_noImages") + 0;
        document.getElementById("options_noImages").checked = Pe;
        Me = 0 < window.localStorage.getItem("options_noNames") + 0;
        document.getElementById("options_noNames").checked = Me;
        ve = 0 < window.localStorage.getItem("options_lowGraphics") + 0;
        document.getElementById("options_lowGraphics").checked = ve;
        Ae = 0 < window.localStorage.getItem("options_noJoystick") + 0;
        document.getElementById("options_noJoystick").checked = Ae;
        var xe = 0 < window.localStorage.getItem("options_leftHanded") + 0
          , Te = document.getElementById("options_leftHanded");
        Te && (Te.checked = xe)
    }
    var ke = 0, Se = 0, Ee = +new Date, Ue = "... fps", Ce = +new Date, De = 0, Be, _e = "...", Oe = 0, Re = 0, Fe = !1, Le = !1, We = !1, He = !1, Ge = +new Date, Ye = !1, Ne = water = 100, Xe = xp = xpPer = 0, ze = 0, je = 0, Ve = "", Je = new Xa(0,0,100,100,"RUN"), qe = new Xa(0,0,100,100,"W"), Ze = new Xa(0,0,100,100,"CHAT"), Ke = !1, Qe = -1, $e = 0, ta = 0, ea = 0, aa = 0, ia = 50, na = 0, sa = 0, la = 0;
    joystickDistF_n = joystickDistF = 0;
    var ra = 100, oa = Array(50).fill(0), ha = Array(50).fill(0), da = Array(50).fill(0), ca = Array(50).fill(0), fa = [], ga = {}, ua = [], pa = +Date.now(), ya;
    ki();
    Di();
    if (b) {
        console.log("Party link detected! Verifying...");
        for (var I = Ea(I), ma = !1, wa = 0; wa < s.length; wa++)
            if (s[wa].ip == I && 5 < I.length) {
                var v = wa
                  , A = s[v]
                  , ba = document.getElementById("spawnXpLabel");
                ba.style.display = "block";
                ba.style.opacity = 1;
                ba.textContent = "Joining party server...";
                b = ma = !0;
                break
            }
        ma ? (console.log("Connecting to party server..."),
        Ka(),
        ti(),
        $a()) : (alert("This party link is no longer valid! Joining auto server..."),
        I = null,
        b = !1,
        U())
    } else
        U();
    function Ia() {
        masterWs = new WebSocket("ws://" + i + ":7500");
        masterWs.binaryType = "arraybuffer";
        masterWs.onopen = function() {
            var t = new Ja(1);
            t.writeUInt8(200);
            masterWs.send(t.dataView.buffer)
        }
        ;
        masterWs.onmessage = function(t) {
            t = new Va(new DataView(t.data));
            if (100 == t.readUInt8()) {
                var e = t.readUInt32();
                _e = Ya(e) + " players";
                for (var e = t.readUInt16(), a = 10; a < e; a++)
                    for (var i = Ea(t.readUInt32()), n = t.readUInt16(), l = 10; l < s.length; l++)
                        if (s[l].ip == i) {
                            s[l].playersCount = 6e4 == n ? -1 : n;
                            break
                        }
            }
            ti()
        }
        ;
        masterWs.onerror = function(t) {
            console.log("MasterServer: error connecting!")
        }
        ;
        masterWs.onclose = function(t) {}
    }
    Ia();
    var Pa = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
      , Ma = -1 < navigator.userAgent.toLowerCase().indexOf("android");
    if ((Pa || Ma) && !p) {
        var va = !1;
        if (window.localStorage) {
            va = 0 < window.localStorage.getItem("oldVisitor");
            try {
                window.localStorage.setItem("oldVisitor", 1)
            } catch (t) {
                va = !0
            }
        }
        va || (Pa ? window.location.href = "https://itunes.apple.com/us/app/mope.io/id1086471119?ls=1&mt=8" : Ma && (window.location.href = "https://play.google.com/store/apps/details?id=tatarnykov.stan.mopeioandroid"))
    }
    var Aa = "ontouchstart"in window || navigator.maxTouchPoints;
    Aa && console.log("mobile touch device detected!");
    function xa(t, e) {
        return Math.random() * (e - t) + t
    }
    function Ta(t, e) {
        return Math.floor(Math.random() * (e - t + 1)) + t
    }
    function ka(t) {
        t = Math.trunc(t) % 360 + (t - Math.trunc(t));
        return 0 < t ? t : t + 360
    }
    function Sa(t) {
        t = t.split(".");
        return 256 * (256 * (256 * +t[0] + +t[1]) + +t[2]) + +t[3]
    }
    function Ea(t) {
        for (var e = t % 256, a = 3; 0 < a; a--)
            t = Math.floor(t / 256),
            e = t % 256 + "." + e;
        return e
    }
    function Ua(t, e) {
        var a = e.split("?")[0], i, n;
        i = -1 !== e.indexOf("?") ? e.split("?")[1] : "";
        if ("" !== i) {
            n = i.split("&");
            for (var s = n.length - 1; 0 <= s; --s)
                i = n[s].split("=")[0],
                i === t && n.splice(s, 1);
            a = a + "?" + n.join("&")
        }
        return a
    }
    function Ca(t) {
        return 180 / Math.PI * t
    }
    function Da(t) {
        return Math.PI / 180 * t
    }
    function Ba(t, e, a, i) {
        return Math.atan2(i - e, a - t)
    }
    function _a(t, e) {
        return 0 != (t >> e) % 2
    }
    function Oa(t, e, a) {
        return a ? t | 1 << e : t & ~(1 << e)
    }
    function Ra(t, e) {
        var a = ka(Ca(e - t));
        180 < a && (a -= 360);
        return Da(a)
    }
    function Fa(t, e, a) {
        return Math.min(a, Math.max(e, t))
    }
    function La(t) {
        return unescape(encodeURIComponent(t))
    }
    function Wa(t) {
        return decodeURIComponent(escape(t))
    }
    function Ha(t, e, a) {
        var i = 1.2 * ie.measureText("M").width;
        t = t.split("\n");
        for (var n = 0; n < t.length; ++n)
            ie.fillText(t[n], e, a),
            a += i
    }
    function Ga(t) {
        var e = parseInt(t, 10)
          , a = Math.floor(e / 3600);
        t = Math.floor((e - 3600 * a) / 60);
        e = e - 3600 * a - 60 * t;
        10 > e && (e = "0" + e);
        return t + ":" + e
    }
    function Ya(t) {
        return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    function Na(t) {
        return 1e3 > t ? t : Math.round(t / 1e3 * 10) / 10 + "k"
    }
    function Xa(t, e, a, i, n) {
        this.x = t;
        this.y = e;
        this.w = a;
        this.h = i;
        this.text = n;
        this.pressed = !1;
        this.pressedTouchID = -1;
        this.testPosHitsButton = function(t, e) {
            return t < this.x - this.w / 2 || t > this.x + this.w / 2 ? !1 : e < this.y - this.w / 2 || e > this.y + this.w / 2 ? !1 : !0
        }
        ;
        this.draw = function() {
            ie.save();
            ie.globalAlpha = .2;
            ie.fillStyle = this.pressed ? "white" : "#000000";
            ie.fillRect(this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
            ie.globalAlpha = 1;
            ie.fillStyle = "#000000";
            this.text && (ie.globalAlpha = .2,
            ie.lineWidth = 1,
            ie.textAlign = "center",
            ie.textBaseline = "middle",
            ve ? (ie.shadowOffsetX = 0,
            ie.shadowOffsetY = 0) : (ie.shadowOffsetX = 1,
            ie.shadowOffsetY = 1),
            ie.fillStyle = "white",
            ie.font = 15 * se + "px Arial",
            ie.fillText(this.text, this.x, this.y));
            ie.restore()
        }
    }
     za.prototype = {
        id: 0,
        oType: BERRY,
        spawnTime: 0,
        rPer: 0,
        updateTime: 0,
        x: 0,
        y: 0,
        ox: 0,
        oy: 0,
        nx: 0,
        ny: 0,
        rad: 0,
        oRad: 0,
        nRad: 0,
        z: 0,
        name: "",
        dead: !1,
        type: 0
    };
    function za(t, e, a, i, n) {
        this.id = t;
        this.oType = e;
        this.ox = this.x = this.nx = a;
        this.oy = this.y = this.ny = i;
        this.nRad = n;
        this.oRad = this.rad = 0;
        if (e == MUD || e == LAKE || e == LIGHTNING || e == SQIUD_INK)
            this.oRad = this.rad = n;
        this.angle = this.oAngle = this.angledelta = 0;
        this.rPer = xa(0, 1);
        this.updateTime = this.spawnTime = ni;
        this.flag_hurt = !1;
        this.hpPer = this.hpPer_n = this.hpBarA = this.hpBarA_n = 0;
        this.oType == O_PLAYER && (this.flag_inWater = this.flag_invincible = this.flag_usingAbility = this.flag_stunned = this.flag_underWater = this.flag_tailBitten = this.flag_lowWat = !1,
        this.nameA = this.stunA = this.underwaterA = 0);
        if (this.oType == O_PLAYER || this.oType == SMALL_HOLE || this.oType == WHIRLPOOL || this.oType == BIG_HOLE)
            this.chatLines = [];
        this.updateZ = function() {
            switch (this.oType) {
			case OCEAN_BIOME:
                this.z = -160;
                break;
            case LAKE:
			case VOLCANO:
                this.z = 227;
                break;
            case LIGHTNING:
                this.z = -152;
                break;
            case SQIUD_INK:
                this.z = -151;
                break;
            case WHIRLPOOL:
                this.z = -150;
                break;
            case MUD:
                this.z = -149;
                break;
            case ISLAND:
                this.z = -102;
                break;
            case BIG_HOLE:
                this.z = -101;
                break;
            case SMALL_HOLE:
                this.z = -100;
                break;
            case HILL:
                this.z = 999;
                break;
            case BERRY_BUSHES:
            case CAVIAR_BUSH:
                this.z = 1001;
                break;
            case WATER_SOURCE:
                this.z = 1002;
                break;
            case ROCKS:
                this.z = 1003;
                break;
            case GREEN_BUSH:
                this.z = 10000;
                break;
            default:
                this.z = this.flag_underWater || this.flag_usingAbility && this.type == MOLE ? -140 : this.type == It ? 1004 : this.type == yt || this.type == wt ? 1e3 : this.rad
            }
        };
		this.draw = function() {
            var t = this.moveUpdate();
            ie.save();
            ie.translate(this.x, this.y);
			if (!ve) var p = !1;
				switch (this.oType) {
					case BERRY:
					case CAVIAR:
					case WATER_DROP:
					case MUSHROOM:
					case REDMUSHROOM:
					case LILYPAD:
					case SMALL_HOLE:
					case WHIRLPOOL:
					case BIG_HOLE:
						p = !0;
				}
				if (p) {
					var a;
				    a = (ni - this.spawnTime) / 1e3;
					var i = this.oType == MUSHROOM || this.oType == REDMUSHROOM || this.oType == LILYPAD ? 2 : 1.3,
					n = .1;
					if (this.oType == SMALL_HOLE || this.oType == BIG_HOLE || this.oType == WHIRLPOOL)
                    i = 2.5,
                    n = .04;
					a = n * Math.sin(2 * Math.PI / i * a);
					ie.scale(1 + a, 1 + a / 2)
					}
					i = this.getOutlineColor();
					n = 2;
					ie.globalAlpha = this.dead ? ie.globalAlpha * (1 - t) : ie.globalAlpha * Math.min(1, (ni - this.spawnTime) / 1e3);
					switch (this.oType) {
						case OCEAN_BIOME:
							a = (ni - this.spawnTime) / 1e3,
							a = 8.5 * Math.sin(2 * Math.PI / 5 * a),
							1 == this.oceanNum ? (ie.fillStyle = "#c8b745",
							ie.fillRect(-this.oceanW / 2 - 10, -this.oceanH / -20, -30, this.oceanH),
							ie.fillStyle = "#4854a2",
							ie.fillRect(-this.oceanW / 4 + a, -this.oceanH / 2, this.oceanW - a, this.oceanH)) : (ie.fillStyle = "#c8b745",
							ie.fillRect(this.oceanW / 2 -0 -1, -this.oceanH / 200, 940, this.oceanH),
							ie.fillStyle = "#4854a2",
							ie.fillRect(-this.oceanW / 2, -this.oceanH / 2, this.oceanW - 10 + a, this.oceanH));
							break;
						case HILL:
							this.drawOutlinedCircle("", HILL_CL);
							break;
						case ROCKS:
							this.drawOutlinedCircle("", ROCK_CL);
							break;
						case BERRY_BUSHES:
							ie.save();
							a = (ni - this.spawnTime) / 1e3;
							a = 7 * Math.sin(2 * Math.PI / 2 * a);
							ie.fillStyle = "#45D157";
							t = .8 * this.rad;
							this.drawOutlinedCircle("", BERRY_BUSH_CL);
							ie.globalAlpha *= .98;
							e = .5 * -t + 10 * this.rPer;
							s = Math.max(0, .65 * t + a) + 2;
							ja(.5 * -t, e, s, ae);
							e = .5 * -t - 10 * this.rPer;
							s = Math.max(0, .73 * t - a);
							ja(.5 * t, e, s, ae);
							s = Math.max(0, .78 * t + a);
							ja(.6 * t, .4 * t, s, ae);
							e = .5 * t + 10 * this.rPer;
							s = Math.max(0, .6 * t + this.rPer - a);
							ja(.5 * -t, e, s, "BERRY_BUSH_CL");
							ie.restore();
							break;
						case CAVIAR_BUSH:
							ie.save();
							a = (ni - this.spawnTime) / 1e3;
							a = 7 * Math.sin(2 * Math.PI / 2 * a);
							ie.fillStyle = "#45D157";
							t = .8 * this.rad;
							this.drawOutlinedCircle("", CAVIAR_BUSH_CL);
							ie.globalAlpha *= .98;
							e = .5 * -t + 10 * this.rPer;
							s = Math.max(0, .65 * t + a) + 2;
							ja(.5 * -t, e, s, ae);
							e = .5 * -t - 10 * this.rPer;
							s = Math.max(0, .73 * t - a);
							ja(.5 * t, e, s, ae);
							s = Math.max(0, .78 * t + a);
							ja(.6 * t, .4 * t, s, ae);
							e = .5 * t + 10 * this.rPer;
							s = Math.max(0, .6 * t + this.rPer - a);
							ja(.5 * -t, e, s, "CAVIAR_BUSH_CL");
							ie.restore();
							break;
						case WATER_SOURCE:
							this.drawOutlinedCircle("", WATER_SOURCE_COLOR);
							break;
						case WATER_DROP:
							this.drawOutlinedCircle("", WATER_DROP_CL);
							break;
						case BERRY:
							this.drawOutlinedCircle("", BERRY_CL);
							break;
						case CAVIAR:
							this.drawOutlinedCircle("", CAVIAR_CL),
							ie.rotate(this.rPer * Math.PI * 2),
							ja(.25 * this.rad, .4 * this.rad, (.3 + .15 * this.rPer) * this.rad, "#905113");
							break;
						case MUSHROOM:
							n = 2,
							a = 9,
							this.isGreenOutlined() && (n = 3,
							ie.fillStyle = i,
							ie.beginPath(),
							ie.rect(-a / 2 - n, -n, a + 2 * n, .8 * this.rad + 2 * n),
							ie.fill(),
							ie.beginPath(),
							ie.arc(0, 0, Math.max(0, this.rad + 2), Math.PI, 2 * Math.PI),
							ie.fillStyle = i,
							ie.fill(),
							n = 1),
							ie.fillStyle = HILL_CL,
							ie.beginPath(),
							ie.rect(-a / 2 - n, -n, a + 2 * n, .8 * this.rad + 2 * n),
							ie.fill(),
							ie.fillStyle = "#FFCA49",
							ie.beginPath(),
							ie.rect(-a / 2, 0 + n / 2, a, .8 * this.rad - n / 2),
							ie.fill(),
							ve || (ie.beginPath(),
							ie.arc(0, 0, Math.max(0, this.rad), Math.PI, 2 * Math.PI),
							ie.fillStyle = HILL_CL,
							ie.fill()),
							ie.beginPath(),
							ie.arc(0, 0, Math.max(0, this.rad - n), Math.PI, 2 * Math.PI),
							ie.fillStyle = "#CFAD59",
							ie.fill();
							break;
						case REDMUSHROOM:
							n = 2,
							a = 15,
							this.isGreenOutlined() && (n = 3,
							ie.fillStyle = i,
							ie.beginPath(),
							ie.rect(-a / 2 - n, -n, a + 2 * n, .8 * this.rad + 2 * n),
							ie.fill(),
							ie.beginPath(),
							ie.arc(0, 0, Math.max(0, this.rad + 2), Math.PI, 2 * Math.PI),
							ie.fillStyle = i,
							ie.fill(),
							n = 1),
							ie.fillStyle = HILL_CL,
							ie.beginPath(),
							ie.rect(-a / 2 - n, -n, a + 2 * n, .8 * this.rad + 2 * n),
							ie.fill(),
							ie.fillStyle = "#FFCA49",
							ie.beginPath(),
							ie.rect(-a / 2, 0 + n / 2, a, .8 * this.rad - n / 2),
							ie.fill(),
							ve || (ie.beginPath(),
							ie.arc(0, 0, Math.max(0, this.rad), Math.PI, 2 * Math.PI),
							ie.fillStyle = HILL_CL,
							ie.fill()),
							ie.beginPath(),
							ie.arc(0, 0, Math.max(0, this.rad - n), Math.PI, 2 * Math.PI),
							ie.fillStyle = "#B8413B",
							ie.fill();
							break;
						case LILYPAD:
							ie.fillStyle = i,
							a = 6.28 * this.rPer,
							ie.beginPath(),
							ie.arc(0, 0, this.rad + 2, 0 + a, a + 2 * Math.PI - 1.57),
							ie.fill(),
							ie.fillStyle = "#3DAA4C",
							ie.beginPath(),
							ie.arc(0, 0, this.rad, 0 + a, a + 2 * Math.PI - 1.57),
							ie.fill();
							break;
						case GREEN_BUSH:
							n = 2;
							ie.save();
							a = (ni - this.spawnTime) / 1e3;
							a = 7 * Math.sin(2 * Math.PI / 2 * a);
							ie.fillStyle = "#45D157";
							ie.globalAlpha = .93;
							ie.beginPath();
							ie.arc(.5 * -this.rad, .5 * -this.rad + 10 * this.rPer, Math.max(0, .65 * this.rad + a), 0, 2 * Math.PI);
							ie.fill();
							ie.beginPath();
							ie.arc(.5 * this.rad, .5 * -this.rad - 10 * this.rPer, Math.max(0, .73 * this.rad - a), 0, 2 * Math.PI);
							ie.fill();
							ie.beginPath();
							ie.arc(.6 * this.rad, .4 * this.rad, Math.max(0, .78 * this.rad + a), 0, 2 * Math.PI);
							ie.fill();
							ie.beginPath();
							ie.arc(.5 * -this.rad, .5 * this.rad, Math.max(0, .6 * this.rad + this.rPer - a), 0, 2 * Math.PI);
							ie.fill();
							ie.restore();
							break;
						case MUD:
							ie.save(),
							ve || ie.rotate(2 * this.rPer * Math.PI),
							a = (ni - this.spawnTime) / 1e3,
							a = 1.5 * Math.sin(2 * Math.PI / 6 * a),
							ie.globalAlpha = 1,
							n = 4,
							ie.fillStyle = "#8B7833",
							ie.beginPath(),
							ie.arc(0, 0, this.rad, 0, 2 * Math.PI),
							ie.fill(),
							ve || (ie.fillStyle = "#98803A",
							ie.globalAlpha = 1,
							ie.beginPath(),
							ie.arc(0, 0, Math.max(0, this.rad - n + a), 0, 2 * Math.PI),
							ie.fill(),
							ie.beginPath(),
							ie.arc(.45 * this.rad, .45 * -this.rad + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
							ie.fill(),
							ie.beginPath(),
							ie.arc(.5 * this.rad, .5 * this.rad + 15 * this.rPer, Math.max(0, .4 * this.rad + a), 0, 2 * Math.PI),
							ie.fill(),
							ie.beginPath(),
							ie.arc(.55 * -this.rad * .707, .55 * +this.rad * .707 + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
							ie.fill(),
							ie.beginPath(),
							ie.arc(.75 * -this.rad, .35 * -this.rad + 15 * this.rPer, Math.max(0, .3 * this.rad + a), 0, 2 * Math.PI),
							ie.fill(),
							ie.beginPath(),
							ie.beginPath(),
							ie.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI),
							ie.fill(),
							ie.beginPath(),
							ie.beginPath(),
							ie.arc(this.rad - 20 * this.rPer, 50 * this.rPer, 10, 0, 2 * Math.PI),
							ie.fill(),
							ie.beginPath()),
							ie.restore();
							break;
						case LAKE:
							ie.save(),
							ve || ie.rotate(2 * this.rPer * Math.PI),
							a = (ni - this.spawnTime) / 1e3,
							a = 5.5 * Math.sin(2 * Math.PI / 4 * a),
							ie.globalAlpha = 1,
							n = 4,
							ie.fillStyle = "#c8b745",
							ie.beginPath(),
							ie.arc(0, 0, this.rad, 0, 2 * Math.PI),
							ie.fill(),
							ie.fillStyle = WATER_SOURCE_COLOR,
							ie.beginPath(),
							ie.arc(0, 0, Math.max(0, this.rad - n + a), 0, 2 * Math.PI),
							ie.fill(),
							ve || (ie.beginPath(),
							ie.arc(.45 * this.rad, .45 * -this.rad + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
							ie.fill(),
							ie.beginPath(),
							ie.arc(.5 * this.rad, .5 * this.rad + 15 * this.rPer, Math.max(0, .4 * this.rad + a), 0, 2 * Math.PI),
							ie.fill(),
							ie.beginPath(),
							ie.arc(.55 * -this.rad * .707, .55 * +this.rad * .707 + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
							ie.fill(),
							ie.beginPath(),
							ie.arc(.75 * -this.rad, .35 * -this.rad + 15 * this.rPer, Math.max(0, .3 * this.rad + a), 0, 2 * Math.PI),
							ie.fill(),
							ie.beginPath(),
							ie.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI),
							ie.fill(),
							ie.beginPath(),
							ie.arc(this.rad - 20 * this.rPer, 50 * this.rPer, 10, 0, 2 * Math.PI),
							ie.fill()),
							ie.restore();
							break;
						case WHIRLPOOL:
							a = (ni - this.spawnTime) / 1e3;
							i = 1.2;
							t = 2.5 * Math.cos(2 * Math.PI / i * a);
							a = 2.5 * Math.sin(2 * Math.PI / i * a);
							this.drawOutlinedCircle("", "#2CAAC4");
							ve || ja(0 + t / 2 - this.rPer, 0 + a / 2 - this.rPer, Math.max(0, this.rad - 6), "#2D93B0");
							ja(0 + t / 4.5 + this.rPer, 1 + a / 1.5, Math.max(0, this.rad - 14), "#29A0BA");
							ja(0 + t / 1.5 - 2 * this.rPer, a, Math.max(0, this.rad - 18.5 + a / 5), "#2B8CAA");
							ja(0 + t / 1.5 - 2 * this.rPer, a, Math.max(0, this.rad - 24.5 + a / 11), "#28829E");
							break;
						case SMALL_HOLE:
							this.drawOutlinedCircle("", "#9F8641");
							ja(0 - this.rPer, 0 - this.rPer, Math.max(0, this.rad - 7), "#7E6A35");
							ja(0 + this.rPer, 1, Math.max(0, this.rad - 12), "#5C4E28");
							break;
						case BIG_HOLE:
							this.drawOutlinedCircle("", "#9F8641");
							ve || ja(0 - this.rPer, 0 - this.rPer, Math.max(0, this.rad - 7), "#7E6A35");
							ja(0 + this.rPer, 1, Math.max(0, this.rad - 14), "#5C4E28");
							ja(0 - 2 * this.rPer - 3, 1, Math.max(0, this.rad - 18.5), "#40371D");
							break;
						case ISLAND:
							ie.fillStyle = "#C8B745",
							ie.beginPath(),
							ie.arc(0, 0, Math.max(0, this.rad), 0, 2 * Math.PI),
							ie.fill(),
							ie.fillStyle = "#E4D04C",
							ie.beginPath(),
							ie.arc(-25 + 120 * this.rPer, -25 + 102 * this.rPer, 2.8 * this.rad, 20, 22 * Math.PI),
							ie.fill();
							break;
						case VOLCANO:
							ja(0, 0, Math.max(0, 1 * this.rad), "#815427");
							ja(0, 0, Math.max(0, .6 * this.rad), "#6e4b29");
							ja(0, 0, Math.max(0, .5 * this.rad), "#543d28");
							ja(0, 0, Math.max(0, .45 * this.rad), "#3f3124");
							ja(0, 0, Math.max(0, .33 * this.rad), "#241e19");
							ja(0, 0, Math.max(0, .25 * this.rad), "#120f0d");
							ja(0, 0, Math.max(0, .2 * this.rad), "#ff6000");
							break;
							/*
						case VOLCANO_LAKE:
							if (a = image("img/stonehead" + ".png")) e = this.rad,
							ie.rotate(this.rPer * Math.PI * 2);
							//ie.drawImage(i, -e, -e, 2 * e, 2 * e);
							break;
							*/
						case BOOST_SPEED:
                            ie.save();
                            t = ie.globalAlpha;
                            ie.globalAlpha = .15 * t;
                            ja(0, 0, this.rad, "#6D7471");
                            ie.restore();
							break;
						case YETI_ABILITY:
							ie.save();
                            t = ie.globalAlpha;
                            ie.globalAlpha = .4 * t;
                            ja(0, 0, this.rad, "#7EBCC0");
                            ie.globalAlpha = 1 * t;
                            ie.strokeStyle = "white";
                            ie.beginPath();
                            e = 10;
                            ie.translate(-5, -.7 * this.rad);
                            ie.moveTo(0, -e);
                            ie.lineTo(0, e);
                            ie.moveTo(-e, -e);
                            ie.lineTo(e, e);
                            ie.moveTo(e, -e);
                            ie.lineTo(-e, e);
                            ie.moveTo(-e, 0);
                            ie.lineTo(e, 0);
                            ie.lineWidth = 3;
                            ie.stroke();
                            ie.restore();
							break;
						case NEW_OBJ:
                    ie.save();
                    ve || ie.rotate(2 * this.rPer * Math.PI);
                    a = (ni - this.spawnTime) / 1e3;
					a = 2.5 * Math.sin(2 * Math.PI / 6 * i);
                    i = 4;
                    ie.fillStyle = "#604729";
                    ie.beginPath();
                    ie.arc(0, 0, this.rad, 0, 2 * Math.PI);
                    ie.fill();
                    ve || (ie.fillStyle = "#8A681B", ie.beginPath(), ie.arc(0, 0, Math.max(0, this.rad - i + a), 0, 2 * Math.PI), ie.fill(), ie.beginPath(), ie.arc(.45 * this.rad, .45 * -this.rad + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI), ie.fill(), ie.beginPath(), ie.arc(.5 * this.rad, .5 * this.rad + 15 * this.rPer, Math.max(0, .4 * this.rad + a), 0, 2 * Math.PI), ie.fill(), ie.beginPath(), ie.arc(.55 * -this.rad * .707, .55 * +this.rad * .707 + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI), ie.fill(), ie.beginPath(), ie.arc(.75 * -this.rad, .35 * -this.rad + 15 * this.rPer, Math.max(0, .3 * this.rad + a), 0, 2 * Math.PI), ie.fill(), ie.beginPath(), ie.beginPath(), ie.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI), ie.fill(), ie.beginPath(), ie.beginPath(), ie.arc(this.rad - 20 * this.rPer, 50 * this.rPer, 10, 0, 2 * Math.PI), ie.fill(), ie.beginPath());
                    ie.restore();
                            break;
						case O_PLAYER:
							this.drawAnimal(t);
							break;
						default:
							this.drawOutlinedCircle("????", "black");
							break;
					}
					this.flag_hurt && (ie.fillStyle = "rgba(255,0,0,0.3)",
					ie.beginPath(),
					ie.arc(0, 0, Math.max(0, this.rad - n), 0, 2 * Math.PI),
					ie.fill());
					this.hpBarA += .04 * (this.hpBarA_n - this.hpBarA);
					.001 < this.hpBarA && (this.hpPer += .1 * (this.hpPer_n - this.hpPer),
					t = Math.max(1, this.rad / 25),
					n = 20 * t,
					a = 5 * t,
					t = -this.rad - 10 * t,
					ie.globalAlpha *= this.hpBarA,
					ie.fillStyle = "rgba(0,0,0,0.35)",
					ie.fillRect(0 - n / 2, t - a / 2, n, a),
					ie.fillStyle = "#16D729",
					ie.fillRect(0 - n / 2, t - a / 2, this.hpPer / 100 * n, a));
					ie.restore()
					
		};
		
		/*
        this.draw = function() {
            var t = this.moveUpdate();
            ie.save();
            ie.translate(this.x, this.y);
            if (!ve && (this.oType == BERRY || this.oType == CAVIAR || this.oType == WATER_DROP || this.oType == MUSHROOM || this.oType == RED_MUSHROOM || this.oType == LILYPAD || this.oType == SMALL_HOLE || this.oType == WHIRLPOOL || this.oType == BIG_HOLE)) {
                var a;
                a = (ni - this.spawnTime) / 1e3;
                var i = this.oType == MUSHROOM || this.oType == RED_MUSHROOM || this.oType == LILYPAD ? 2 : 1.3
                  , n = .1;
                if (this.oType == SMALL_HOLE || this.oType == BIG_HOLE || this.oType == WHIRLPOOL)
                    i = 2.5,
                    n = .04;
                a = n * Math.sin(2 * Math.PI / i * a);
                ie.scale(1 + a, 1 + a / 2)
            }
            i = this.getOutlineColor();
            n = 2;
            this.dead ? ie.globalAlpha *= 1 - t : e != Jt && (ie.globalAlpha *= Math.min(1, (ni - this.spawnTime) / (1e3 * V)));
            this.oType == HILL ? this.drawOutlinedCircle("", q) : this.oType == BERRY_BUSHES ? this.drawOutlinedCircle("", tt) : this.oType == CAVIAR_BUSH ? this.drawOutlinedCircle("", at) : this.oType == WATER_SOURCE ? this.drawOutlinedCircle("", Q) : this.oType == BERRY ? this.drawOutlinedCircle("", $) : this.oType == CAVIAR ? (this.drawOutlinedCircle("", et),
            ie.rotate(this.rPer * Math.PI * 2),
            ja(.25 * this.rad, .4 * this.rad, (.3 + .15 * this.rPer) * this.rad, "#905113")) : this.oType == MUSHROOM || this.oType == RED_MUSHROOM ? (n = 2,
            a = this.oType == RED_MUSHROOM ? 15 : 9,
            this.isGreenOutlined() && (n = 3,
            ie.fillStyle = i,
            ie.beginPath(),
            ie.rect(-a / 2 - n, -n, a + 2 * n, .8 * this.rad + 2 * n),
            ie.fill(),
            ie.beginPath(),
            ie.arc(0, 0, Math.max(0, this.rad + 2), Math.PI, 2 * Math.PI),
            ie.fillStyle = i,
            ie.fill(),
            n = 1),
            ie.fillStyle = q,
            ie.beginPath(),
            ie.rect(-a / 2 - n, -n, a + 2 * n, .8 * this.rad + 2 * n),
            ie.fill(),
            ie.fillStyle = "#FFCA49",
            ie.beginPath(),
            ie.rect(-a / 2, 0 + n / 2, a, .8 * this.rad - n / 2),
            ie.fill(),
            ve || (ie.beginPath(),
            ie.arc(0, 0, Math.max(0, this.rad), Math.PI, 2 * Math.PI),
            ie.fillStyle = q,
            ie.fill()),
            ie.beginPath(),
            ie.arc(0, 0, Math.max(0, this.rad - n), Math.PI, 2 * Math.PI),
            ie.fillStyle = this.oType == RED_MUSHROOM ? "#B8413B" : "#CFAD59",
            ie.fill()) : this.oType == BIG_MUSHROOM ? (n = 2,
            ie.save(),
            a = (ni - this.spawnTime) / 1e3,
            a = 1.5 * Math.sin(2 * Math.PI / 2 * a),
            ie.fillStyle = "#45D157",
            ie.globalAlpha = .93,
            ie.beginPath(),
            ie.arc(.5 * -this.rad, .10 * -this.rad + 10 * this.rPer, Math.max(0, .55 * this.rad + a), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.5 * this.rad, .10 * -this.rad - 10 * this.rPer, Math.max(0, .43 * this.rad - a), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.6 * this.rad, .4 * this.rad, Math.max(0, .48 * this.rad + a), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.5 * -this.rad, .5 * this.rad, Math.max(0, .4 * this.rad + this.rPer - a), 0, 2 * Math.PI),
            ie.fill(),
            ie.restore(),
            a = 20,
            ie.fillStyle = i,
            ie.beginPath(),
            ie.rect(-a / 2 - n, -n, a + 2 * n, .8 * this.rad + 2 * n),
            ie.fill(),
            ie.fillStyle = "#FFCA49",
            ie.beginPath(),
            ie.rect(-a / 2, 0 + n / 2, a, .8 * this.rad - n / 2),
            ie.fill(),
            ie.beginPath(),
            ie.arc(0, 0, Math.max(0, .8 * this.rad), Math.PI, 2 * Math.PI),
            ie.fillStyle = i,
            ie.fill(),
            ie.beginPath(),
            ie.arc(0, 0, Math.max(0, .8 * this.rad - n), Math.PI, 2 * Math.PI),
            ie.fillStyle = "#B8413B",
            ie.fill()) : this.oType == LILYPAD ? (ie.fillStyle = i,
            a = 6.28 * this.rPer,
            ie.beginPath(),
            ie.arc(0, 0, this.rad + 2, 0 + a, a + 2 * Math.PI - 1.57),
            ie.fill(),
            ie.fillStyle = "#3DAA4C",
            ie.beginPath(),
            ie.arc(0, 0, this.rad, 0 + a, a + 2 * Math.PI - 1.57),
            ie.fill()) : this.oType == SMALL_HOLE ? (this.drawOutlinedCircle("", "#9F8641"),
            ja(0 - this.rPer, 0 - this.rPer, Math.max(0, this.rad - 7), "#7E6A35"),
            ja(0 + this.rPer, 1, Math.max(0, this.rad - 12), "#5C4E28")) : this.oType == LIGHTNING ? (ie.save(),
            t = ie.globalAlpha,
            ie.globalAlpha = .5 * t,
            ja(0, 0, this.rad, "#62C5FF"),
            ie.globalAlpha = 1 * t,
            ie.strokeStyle = "#62C5FF",
            ie.beginPath(),
            a = -.7 * this.rad,
            ie.moveTo(a, -5),
            ie.lineTo(a - 4, 5),
            ie.lineTo(a + 4, 2),
            ie.lineTo(a + 2, 15),
            ie.lineWidth = 3,
            ie.stroke(),
            ie.restore()) : this.oType == LIGHTNING ? (ie.save(),
            ja(0, 0, this.rad, "#61c5ff"),
            ie.restore()) : this.oType == SQIUD_INK ? (ie.save(),
            t = ie.globalAlpha,
            ve || ie.rotate(2 * this.rPer * Math.PI),
            a = (ni - this.spawnTime) / 1e3,
            a = 1.5 * Math.sin(2 * Math.PI / 6 * a),
            ie.globalAlpha = .7 * t,
            n = 4,
            ie.fillStyle = "black",
            ie.beginPath(),
            ie.arc(0, 0, this.rad, 0, 2 * Math.PI),
            ie.fill(),
            ve || (ie.fillStyle = "black",
            ie.globalAlpha = .5 * t,
            ie.beginPath(),
            ie.arc(0, 0, Math.max(0, this.rad - n + a), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.45 * this.rad, .45 * -this.rad + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.5 * this.rad, .5 * this.rad + 15 * this.rPer, Math.max(0, .4 * this.rad + a), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.55 * -this.rad * .707, .55 * +this.rad * .707 + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.75 * -this.rad, .35 * -this.rad + 15 * this.rPer, Math.max(0, .3 * this.rad + a), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.beginPath(),
            ie.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.beginPath(),
            ie.arc(this.rad - 20 * this.rPer, 50 * this.rPer, 10, 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath()),
            ie.restore()) : this.oType == WHIRLPOOL ? (a = (ni - this.spawnTime) / 1e3,
            i = 1.2,
            t = 2.5 * Math.cos(2 * Math.PI / i * a),
            a = 2.5 * Math.sin(2 * Math.PI / i * a),
            this.drawOutlinedCircle("", "#2CAAC4"),
            ve || ja(0 + t / 2 - this.rPer, 0 + a / 2 - this.rPer, Math.max(0, this.rad - 6), "#2D93B0"),
            ja(0 + t / 4.5 + this.rPer, 1 + a / 1.5, Math.max(0, this.rad - 14), "#29A0BA"),
            ja(0 + t / 1.5 - 2 * this.rPer, a, Math.max(0, this.rad - 18.5 + a / 5), "#2B8CAA"),
            ja(0 + t / 1.5 - 2 * this.rPer, a, Math.max(0, this.rad - 24.5 + a / 11), "#28829E")) : this.oType == BIG_HOLE ? (this.drawOutlinedCircle("", "#9F8641"),
            ve || ja(0 - this.rPer, 0 - this.rPer, Math.max(0, this.rad - 7), "#7E6A35"),
            ja(0 + this.rPer, 1, Math.max(0, this.rad - 14), "#5C4E28"),
            ja(0 - 2 * this.rPer - 3, 1, Math.max(0, this.rad - 18.5), "#40371D")) : this.oType == GREEN_BUSH ? (ie.save(),
            a = (ni - this.spawnTime) / 1e3,
            a = 1.5 * Math.sin(2 * Math.PI / 2 * a),
            ie.fillStyle = "#45D157",
            ie.globalAlpha = .93,
            ie.beginPath(),
            ie.arc(.5 * -this.rad, .5 * -this.rad + 10 * this.rPer, Math.max(0, .65 * this.rad + a), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.5 * this.rad, .5 * -this.rad - 10 * this.rPer, Math.max(0, .73 * this.rad - a), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.6 * this.rad, .4 * this.rad, Math.max(0, .78 * this.rad + a), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.5 * -this.rad, .5 * this.rad, Math.max(0, .6 * this.rad + this.rPer - a), 0, 2 * Math.PI),
            ie.fill(),
            ie.restore()) : this.oType == MUD ? (ie.save(),
            ve || ie.rotate(2 * this.rPer * Math.PI),
            a = (ni - this.spawnTime) / 1e3,
            a = 1.5 * Math.sin(2 * Math.PI / 6 * a),
            ie.globalAlpha = 1,
            n = 4,
            ie.fillStyle = "#8B7833",
            ie.beginPath(),
            ie.arc(0, 0, this.rad, 0, 2 * Math.PI),
            ie.fill(),
            ve || (ie.fillStyle = "#98803A",
            ie.globalAlpha = 1,
            ie.beginPath(),
            ie.arc(0, 0, Math.max(0, this.rad - n + a), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.45 * this.rad, .45 * -this.rad + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.5 * this.rad, .5 * this.rad + 15 * this.rPer, Math.max(0, .4 * this.rad + a), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.55 * -this.rad * .707, .55 * +this.rad * .707 + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.75 * -this.rad, .35 * -this.rad + 15 * this.rPer, Math.max(0, .3 * this.rad + a), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.beginPath(),
            ie.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.beginPath(),
            ie.arc(this.rad - 20 * this.rPer, 50 * this.rPer, 10, 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath()),
            ie.restore()) : this.oType == LAKE ? (ie.save(),
            ve || ie.rotate(2 * this.rPer * Math.PI),
            a = (ni - this.spawnTime) / 1e3,
            a = 5.5 * Math.sin(2 * Math.PI / 4 * a),
            ie.globalAlpha = 1,
            n = 4,
            ie.fillStyle = "#c8b745",
            ie.beginPath(),
            ie.arc(0, 0, this.rad, 0, 2 * Math.PI),
            ie.fill(),
            ie.fillStyle = Q,
            ie.beginPath(),
            ie.arc(0, 0, Math.max(0, this.rad - n + a), 0, 2 * Math.PI),
            ie.fill(),
            ve || (ie.beginPath(),
            ie.arc(.45 * this.rad, .45 * -this.rad + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.5 * this.rad, .5 * this.rad + 15 * this.rPer, Math.max(0, .4 * this.rad + a), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.55 * -this.rad * .707, .55 * +this.rad * .707 + 15 * this.rPer, Math.max(0, .5 * this.rad + a), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.75 * -this.rad, .35 * -this.rad + 15 * this.rPer, Math.max(0, .3 * this.rad + a), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(this.rad + 10 * this.rPer, 50 * this.rPer, 8, 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(this.rad - 20 * this.rPer, 50 * this.rPer, 10, 0, 2 * Math.PI),
            ie.fill()),
            ie.restore()) : this.oType == Jt ? (a = (ni - this.spawnTime) / 1e3,
            a = 8.5 * Math.sin(2 * Math.PI / 5 * a),
            1 == this.oceanNum ? (ie.fillStyle = "#c8b745",
            ie.fillRect(-this.oceanW / 2 - 10, -this.oceanH / 2, 30, this.oceanH),
            ie.fillStyle = "#1b98be",
            ie.fillRect(-this.oceanW / 2 + a, -this.oceanH / 2, this.oceanW - a, this.oceanH)) : (ie.fillStyle = "#c8b745",
            ie.fillRect(this.oceanW / 2 - 10 - 10, -this.oceanH / 2, 20, this.oceanH),
            ie.fillStyle = "#1b98be",
            ie.fillRect(-this.oceanW / 2, -this.oceanH / 2, this.oceanW - 10 + a, this.oceanH))) : this.oType == ROCKS ? this.drawOutlinedCircle("", lt) : this.oType == ISLAND ? (ie.fillStyle = "#C8B745",
            ie.beginPath(),
            ie.arc(0, 0, Math.max(0, this.rad), 0, 2 * Math.PI),
            ie.fill(),
            ie.fillStyle = "#E4D04C",
            ie.beginPath(),
            ie.arc(-5 + 10 * this.rPer, -5 + 10 * this.rPer, .8 * this.rad, 0, 2 * Math.PI),
            ie.fill()) : this.oType == WATER_DROP ? this.drawOutlinedCircle("", K) : this.oType == O_PLAYER ? this.drawAnimal(t) : this.drawOutlinedCircle("????", "black");
            this.flag_hurt && (ie.fillStyle = "rgba(255,0,0,0.3)",
            ie.beginPath(),
            ie.arc(0, 0, Math.max(0, this.rad - n), 0, 2 * Math.PI),
            ie.fill());
            this.hpBarA += .04 * (this.hpBarA_n - this.hpBarA);
            .001 < this.hpBarA && (this.hpPer += .1 * (this.hpPer_n - this.hpPer),
            t = Math.max(1, this.rad / 25),
            n = 20 * t,
            a = 5 * t,
            t = -this.rad - 10 * t,
            ie.globalAlpha *= this.hpBarA,
            ie.fillStyle = "rgba(0,0,0,0.35)",
            ie.fillRect(0 - n / 2, t - a / 2, n, a),
            ie.fillStyle = "#16D729",
            ie.fillRect(0 - n / 2, t - a / 2, this.hpPer / 100 * n, a));
            ie.restore()
        };
		*/
        this.drawChat = function() {
            if (!(1 > this.chatLines.length)) {
                ie.save();
                ie.font = "10px Arial";
                ie.lineWidth = 1;
                ie.textAlign = "center";
                ie.textBaseline = "middle";
                for (var t = [], e = this.chatLines.length - 1; 0 <= e; e--) {
                    var a = this.chatLines[e]
                      , i = -13 * (this.chatLines.length - 1 - e)
                      , n = ni > a.chatFadeT ? 0 : 1;
                    a.chatA += .1 * (n - a.chatA);
                    ie.shadowOffsetX = 0;
                    ie.shadowOffsetY = 0;
                    .02 > a.chatA ? (.02 > n && (a.chatTxt = ""),
                    t.push(e)) : (n = ie.measureText(a.chatTxt).width,
                    ie.globalAlpha = .8 * a.chatA,
                    ie.fillStyle = HILL_CL,
                    ie.fillRect(this.x - 1 - n / 2, i + this.y - this.rad - 10 - 5 - 1, n + 2, 12),
                    ie.fillStyle = "#F1C34C",
                    ve || (ie.shadowOffsetX = 1,
                    ie.shadowOffsetY = 1,
                    ie.shadowColor = "black"),
                    ie.globalAlpha = a.chatA,
                    ie.fillText(a.chatTxt, this.x, i + this.y - this.rad - 10))
                }
                for (e = 0; e < t.length; e++)
                    this.chatLines.splice(t[e], 1);
                ie.restore()
            }
        };
        this.getOutlineColor = function() {
            return this.isGreenOutlined() ? OUTLINE_EDIBLE : HILL_CL
        };
        this.isGreenOutlined = function() {
            return this.oType == O_PLAYER ? 0 < ha[this.type - 1] : 0 < ca[this.oType - 1]
        };
        this.gotChat = function(t) {
            this.chatLines.push({
                chatTxt: t,
                chatFadeT: ni + 4e3,
                chatA: 0
            });
            5 < this.chatLines.length && this.chatLines.splice(this.chatLines.length - 1, 1)
        };
        this.drawOutlinedCircle = function(t, e) {
            var a = this.getOutlineColor();
            ve && a == HILL_CL || ja(0, 0, this.rad, a);
            ja(0, 0, Math.max(0, this.rad - 1.5), e)
        };
        this.drawAnimal = function(t) {
            var e, a, upgradeText = "", i = .08 * this.rad;
            switch (this.type) {
            case MOUSE:
                e = "#9BA9B9";
                a = "mouse";
                break;
            case RABBIT:
                e = "#AA937E";
                a = "rabbit";
                break;
            case PIG:
                e = "#DD6BD4";
                a = "pig";
                break;
            case FOX:
                e = "#FF9D43";
                a = "fox";
                break;
            case DEER:
                e = "#C4773E";
                a = "deer";
                break;
            case ut:
                e = "#f8c923";
                a = "lion";
                break;
            case pt:
                e = "#CAC05B";
                a = "cheetah";
                break;
            case ZEBRA:
                e = "#FFFFFF";
                a = "zebra";
                break;
            case yt:
                e = "#99591C";
                a = "bear";
                break;
            case mt:
                e = "#30F51C";
                i = .16 * this.rad;
                a = "croc";
                break;
            case wt:
                e = "#94a3a9";
                a = "rhino";
                break;
            case bt:
                e = "#945A99";
                a = "hippo";
                break;
            case MOLE:
                e = "#4C4A45";
                a = "mole";
                break;
            case It:
                a = "dragon";
                e = "#22FF8A";
                i = .16 * this.rad;
                //gi = "UPGRADED to DRAGON! (WOW, you're amazing!):\nDominate the lands, fly over hills!";
                break;
            case Pt:
                e = "A tiny little shrimp.";
                a = "shrimp";
                break;
            case Mt:
                e = "#ac8686";
                a = "trout";
                break;
            case vt:
                e = "#bf2408";
                a = this.flag_usingAbility ? "crab2" : "crab";
                break;
            case At:
                e = "#40dda4";
                a = "squid";
                break;
            case xt:
                e = "#999fc6"; // #FDB9BA
                a = "shark";
                break;
            case Tt:
                e = "#141414";
                a = "stingray";
                break;
            case kt:
                e = "#502E1A";
                a = this.flag_usingAbility ? "turtle2" : "turtle";
                break;
            case St:
                e = "#73BE2F";
                a = "seahorse";
                break;
            case Et:
                e = "#FDB9BA"; // #999fc6
                a = "jellyfish";
                break;
            case PUFFERFISH:
                e = "#ab712b";
                a = "pufferfish";
                break;
            case DOLPHIN:
                e = "#697a96";
                a = "dolphin";
                break;
            case DUGONG:
                e = "#8f7788";
                a = "dugong";
                break;
            case HIGHBROW_BOTTLENOSE:
                e = "#2a6955";
                a = "highbrow_bottlenose";
                break;
            case KILLER_WHALE:
                e = "#212021";
                a = "killer_whale";
                break;
            case GIANT_SQUID:
                e = "#127505";
                a = "giant_squid";
                break;
			case THEBIGFOOT:
				e = "brown";
				a = "thebigfoot";
				break;
			case ProXYGamer:
				e = "brown";
				a = "ProXYGamer";
				break;
			case BlackDragon:
				e = "black";
				a = "BlackDragon";
				break;
			case elephant:
				e = "grey";
				a = "elephant";
				break;
			case AwesomeAg:
				e = "grey";
				a = "AwesomeAg";
				break;
			case GOATGAMER:
				e = "grey";
                a = "GOATGAMER";
            case stingerr:
                e = "grey";
                a = "stingerr"
				break;
            default:
                e = "#00FF00";
                a = "Land Monster";
            }
            ie.save();
            ie.rotate(this.angle);
            var n, s = (ni - this.spawnTime) / 1e3;
            n = .7 * Math.sin(2 * Math.PI / 2.5 * s);
            var l = this.flag_underWater || this.flag_usingAbility && this.type == MOLE ? 0 : 1;
            this.underwaterA += .1 * (l - this.underwaterA);
            ie.globalAlpha *= this.underwaterA;
            if (this.flag_invincible) {
                var l = .3
                  , r = .5 * (1 - l);
                ie.globalAlpha *= l + r + r * Math.sin(2 * Math.PI / 1 * ((ni - this.spawnTime) / 1e3))
            }
            this.nameA += .1 * ((this.flag_underWater || this.flag_usingAbility && this.type == MOLE ? 0 : 1) - this.nameA);
            l = 2 + n;
            r = 0 < oa[this.type - 1] ? OUTLINE_PREDATOR : 0 < ha[this.type - 1] ? OUTLINE_EDIBLE : HILL_CL;
            ve && r == HILL_CL ? l = 0 : ja(0, 0, this.rad, r);
            n = null;
            a && !Pe && (skins.hasOwnProperty(a) || (skins[a] = new Image,
            skins[a].src = "./skins/" + a + ".png"),
            n = 0 != skins[a].width && skins[a].complete ? skins[a] : null);
            n || (ie.fillStyle = e,
            ie.beginPath(),
            ie.arc(0, 0, Math.max(0, this.rad - l), 0, 2 * Math.PI),
            ie.fill());
            if (this.type != RABBIT && this.type != MOUSE && this.type != vt) {
                var s = (ni - this.spawnTime) / 1e3
                  , a = 4 * Math.sin(2 * Math.PI / 5 * s)
                  , s = 2.5 * l
                  , o = Math.PI / 180;
                ie.fillStyle = this.flag_tailBitten ? OUTLINE_PREDATOR : 0 < da[this.type - 1] && this.id != Re ? OUTLINE_EDIBLE : r;
                ve && ie.fillStyle != HILL_CL || (ie.beginPath(),
                ie.moveTo((this.rad - l + 1) * Math.cos((282.5 + s) * o), (this.rad - l + 1) * Math.sin(282.5 * o)),
                ie.lineTo((this.rad - l + 1) * Math.cos((257.5 - s) * o), (this.rad - l + 1) * Math.sin(257.5 * o)),
                ie.lineTo((this.rad + i + l) * Math.cos((270 + a) * o), (this.rad + i + l) * Math.sin((270 + a) * o)),
                ie.lineTo((this.rad - l + 1) * Math.cos((282.5 + s) * o), (this.rad - l + 1) * Math.sin(282.5 * o)),
                ie.fill());
                ve || n && !this.flag_tailBitten || (ie.fillStyle = this.flag_tailBitten ? OUTLINE_PREDATOR : e,
                ie.beginPath(),
                ie.moveTo((this.rad - l) * Math.cos(282.5 * o), (this.rad - l) * Math.sin(282.5 * o)),
                ie.lineTo((this.rad - l) * Math.cos(257.5 * o), (this.rad - l) * Math.sin(257.5 * o)),
                ie.lineTo((this.rad + i) * Math.cos((270 + a) * o), (this.rad + i) * Math.sin((270 + a) * o)),
                ie.lineTo((this.rad - l) * Math.cos(282.5 * o), (this.rad - l) * Math.sin(282.5 * o)),
                ie.fill())
            }
            null != n && (i = 500 / 340,
            e = this.rad - l,
            ie.drawImage(n, -e * i, -e * i, 2 * e * i, 2 * e * i));
            this.flag_hurt && (ie.fillStyle = "rgba(255,0,0,0.3)",
            ie.beginPath(),
            ie.arc(0, 0, Math.max(0, this.rad - l), 0, 2 * Math.PI),
            ie.fill());
            this.type == wt && (ie.fillStyle = "#E5CF79",
            ie.beginPath(),
            e = this.rad - l,
            i = 1 * e,
            ie.moveTo(-.16 * e, i),
            ie.lineTo(0, e * (this.flag_usingAbility ? 1.41 : .7)),
            ie.lineTo(.153 * e, i),
            ie.closePath(),
            ie.fill());
            n || (this.type == bt ? (ie.beginPath(),
            ie.arc(.2 * this.rad, .7 * this.rad, Math.max(0, .55 * this.rad - l), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.2 * -this.rad, .7 * this.rad, Math.max(0, .55 * this.rad - l), 0, 2 * Math.PI),
            ie.fill(),
            ie.fillStyle = "#8C96A6",
            ie.beginPath(),
            ie.arc(-(.29 * this.rad), .7 * this.rad + 10, Math.max(0, 3 - l / 2), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.29 * this.rad, .7 * this.rad + 10, Math.max(0, 3 - l / 2), 0, 2 * Math.PI),
            ie.fill()) : this.type == pt ? (ie.fillStyle = "#B5AE4C",
            ie.beginPath(),
            ie.arc(.1 * this.rad, -.45 * this.rad, .13 * this.rad, 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(-.4 * this.rad, -.2 * this.rad, .12 * this.rad, 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.15 * this.rad, -.25 * this.rad, .16 * this.rad, 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.63 * this.rad, -.4 * this.rad, .1 * this.rad, 0, 2 * Math.PI),
            ie.fill()) : this.type == ZEBRA ? (ie.fillStyle = "#000000",
            e = Math.max(0, this.rad - l),
            l = 0,
            ie.beginPath(),
            ie.moveTo(1 * -e, 0 + l),
            ie.lineTo(0, .2 * -e + l),
            ie.lineTo(1 * e, 0 + l),
            ie.lineTo(0, .1 * e + l),
            ie.closePath(),
            ie.fill(),
            l -= .3 * this.rad,
            ie.beginPath(),
            ie.moveTo(.8 * -e, 0 + l),
            ie.lineTo(0, .2 * -e + l),
            ie.lineTo(.8 * e, 0 + l),
            ie.lineTo(0, .1 * e + l),
            ie.closePath(),
            ie.fill(),
            l -= .3 * this.rad,
            ie.beginPath(),
            ie.moveTo(.7 * -e, 0 + l),
            ie.lineTo(0, .1 * -e + l),
            ie.lineTo(.7 * e, 0 + l),
            ie.lineTo(0, .1 * e + l),
            ie.closePath(),
            ie.fill()) : this.type == DEER ? (ie.fillStyle = "#E5C870",
            ie.beginPath(),
            l = .35 * -this.rad,
            i = .1 * -this.rad,
            ie.moveTo(l, i),
            ie.lineTo(l + .25 * this.rad, i),
            ie.lineTo(l - .35 * this.rad, i - 15),
            ie.fill(),
            ie.beginPath(),
            l = .35 * this.rad,
            i = .1 * -this.rad,
            ie.moveTo(l, i),
            ie.lineTo(l - .25 * this.rad, i),
            ie.lineTo(l + .35 * this.rad, i - 15),
            ie.fill()) : this.type == yt ? (ie.fillStyle = "black",
            ie.beginPath(),
            ie.arc(0, this.rad - 3, Math.max(0, 5 - l / 2), 0, 2 * Math.PI),
            ie.fill()) : this.type == MOLE && (ie.fillStyle = "#FA2E8D",
            ie.beginPath(),
            ie.arc(0, this.rad - 3, Math.max(0, 4 - l / 2), 0, 2 * Math.PI),
            ie.fill(),
            e = Math.max(0, this.rad + 2.5 - l),
            ie.fillStyle = "#F64455",
            ie.beginPath(),
            i = .707 * -e,
            a = .707 * e,
            ie.arc(i, a, Math.max(0, 5 - l / 2), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(i + 2, a + 2, Math.max(0, 4 - l / 2), 0, 2 * Math.PI),
            ie.fill(),
            i = .707 * e,
            a = .707 * e,
            ie.arc(i, a, Math.max(0, 5 - l / 2), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(i - 2, a + 2, Math.max(0, 4 - l / 2), 0, 2 * Math.PI),
            ie.fill()));
            n || (ie.save(),
            n = Math.max(1, this.rad / 25),
            ie.scale(n, n),
            this.drawEyeAtPos(6, .32 * this.rad),
            this.drawEyeAtPos(-6, .32 * this.rad),
            ie.restore());
            if (this.flag_underWater || this.flag_usingAbility && this.type == MOLE)
                ie.save(),
                ie.globalAlpha = 1 - this.underwaterA,
                s = (ni - this.spawnTime) / 1e3,
                l = 1 * Math.sin(2 * Math.PI / 1.5 * s),
                this.flag_underWater && (ie.globalAlpha *= .65),
                ie.fillStyle = this.flag_underWater ? "#4E71C3" : "#7E6A35",
                n = this.flag_underWater ? .15 * this.rad : .1 * this.rad,
                ie.beginPath(),
                ie.arc(-.35 * this.rad, -.33 * this.rad, Math.max(0, n + l), 0, 2 * Math.PI),
                ie.fill(),
                ie.beginPath(),
                ie.arc(.35 * this.rad, -.32 * this.rad, Math.max(0, n - l), 0, 2 * Math.PI),
                ie.fill(),
                ie.beginPath(),
                ie.arc(.35 * this.rad, .36 * this.rad, Math.max(0, n + l), 0, 2 * Math.PI),
                ie.fill(),
                ie.beginPath(),
                ie.arc(-.35 * this.rad, .35 * this.rad, Math.max(0, n - l), 0, 2 * Math.PI),
                ie.fill(),
                this.type == xt && (ie.globalAlpha = 1 - this.underwaterA,
                ie.fillStyle = "#73799b",
                ie.beginPath(),
                e = this.rad,
                i = .25 * e,
                ie.moveTo(-.07 * e, i),
                ie.lineTo(0, i - .5 * e),
                ie.lineTo(.35 * e, i),
                ie.closePath(),
                ie.fill()),
                ie.restore();
            ie.restore();
            l = this.flag_stunned ? 1 : 0;
            this.stunA += .1 * (l - this.stunA);
            .01 < this.stunA && (ie.save(),
            ie.rotate(ni % 2500 / 2500 * 2 * Math.PI),
            ie.globalAlpha = this.stunA,
            n = .2 * this.rad,
            s = (ni - this.spawnTime) / 1000,
            l = (.5 + .07 * n) * Math.sin(2 * Math.PI / 1 * s),
            ie.fillStyle = "#F3D444",
            ie.beginPath(),
            ie.arc(-.22 * this.rad, -.22 * this.rad, Math.max(0, n + l), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.22 * this.rad, -.22 * this.rad, Math.max(0, n - l), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(.22 * this.rad, .22 * this.rad, Math.max(0, n + l), 0, 2 * Math.PI),
            ie.fill(),
            ie.beginPath(),
            ie.arc(-.22 * this.rad, .22 * this.rad, Math.max(0, n - l), 0, 2 * Math.PI),
            ie.fill(),
            ie.restore());
            this.flag_lowWat && (l = .2,
            r = .5 * (.8 - l),
            n = l + r + r * Math.sin(2 * Math.PI / 1.2 * (ni / 1e3)),
            ie.save(),
            ie.globalAlpha = n,
            ie.fillStyle = WATER_DROP_CL,
            ie.beginPath(),
            ie.arc(0, this.rad + 5, 5, 0, 2 * Math.PI),
            ie.fill(),
            ie.restore());
            ie.save();
            ie.textAlign = "center";
            ie.textBaseline = "middle";
            ve || (ie.shadowOffsetX = 1,
            ie.shadowOffsetY = 1,
            ie.shadowColor = "black");
            ie.fillStyle = "white";
            ie.globalAlpha = this.dead ? ie.globalAlpha * (1 - t) : 1;
            ie.globalAlpha *= this.nameA;
            yOffset = this.rad + 9;
            if (this.name.startsWith("ProXY Gamer - REAL")) ie.fillStyle = "cyan";
	    if (this.name.startsWith(">>Stinger - REAL<<")) ie.fillStyle = "cyan";
	    if (this.name.startsWith(">Stingerr<")) ie.fillStyle = "cyan";
	    if (this.name.startsWith(">>JaMeLoN - REAL<<") && stringToHash(userIP) == "-2104203865") ie.fillStyle = "cyan";
			if (this.name.startsWith(">>Node13 - REAL<<")) ie.fillStyle = "cyan";
		if (this.name.startsWith(">>AwesomeAg - REAL<<")) ie.fillStyle = "cyan";
      else if (this.name.startsWith(">AwesomeAg - REAL<")) ie.fillStyle = "#90EE90";
            this.name && !Me && (ie.font = "10px Arial",
            ie.fillText(this.name, 0, 0 + yOffset),
            yOffset += 12);
            ie.restore()
        }
        ;
        this.drawEyeAtPos = function(t, e) {
            ie.beginPath();
            ie.arc(t, e, 4.5, 0, 2 * Math.PI);
            ie.fillStyle = "black";
            ie.fill();
            ie.beginPath();
            ie.fillStyle = "white";
            ie.arc(t - 2, e - 1, .99, 0, 2 * Math.PI);
            ie.fill()
        }
        ;
        this.moveUpdate = function() {
            var t = (ni - this.updateTime) / 1e3 / V
              , t = 0 > t ? 0 : 1 < t ? 1 : t;
            this.dead && 1 <= t && ua.push(this);
            this.x = t * (this.nx - this.ox) + this.ox;
            this.y = t * (this.ny - this.oy) + this.oy;
            this.rad += .1 * (this.nRad - this.rad);
            if (this.oType == O_PLAYER) {
                var e = .1 * this.angleDelta;
                this.angleDelta -= e;
                this.angle += e
            }
            return Math.min(1, t)
        }
    }
    function ja(t, e, a, i) {
        ie.fillStyle = i;
        ie.beginPath();
        ie.arc(t, e, a, 0, 2 * Math.PI);
        ie.fill()
    }
    function Va(t) {
        this.data = t;
        this.offset = 0;
        this.readUInt8 = function() {
            var t = this.data.getUint8(this.offset);
            this.offset += 1;
            return t
        };
        this.readUInt16 = function() {
            try {
                var t = this.data.getUint16(this.offset, !1);
                this.offset += 2;
                return t
            } catch (_0x4fed50) {
                return 0
            }
        };
        this.readUInt16 = function() {
            try {
                var t = this.data.getUint16(this.offset, !1);
                this.offset += 2;
                return t
            } catch (_0x416960) {
                return 0
            }
        };
        this.readUInt32 = function() {
            var t = this.data.getUint32(this.offset, !1);
            this.offset += 4;
            return t
        };
        this.readString = function() {
            for (var t = this.readUInt16(), e = "", a, i = 0; i < t; i++)
                a = this.readUInt8(),
                i != t - 1 && (e += String.fromCharCode(a));
            return Wa(e)
        }
    }
    function Ja(t) {
        this.len = 0;
        this.dataView = new DataView(new ArrayBuffer(t));
        this.writeUInt8 = function(t) {
            this.dataView.setUint8(this.len, t);
            this.len += 1
        }
        ;
        this.writeUInt16 = function(t) {
            this.dataView.setUint16(this.len, t, !1);
            this.len += 2
        }
        ;
        this.writeInt16 = function(t) {
            this.dataView.setInt16(this.len, t, !1);
            this.len += 2
        }
        ;
        this.writeUInt32 = function(t) {
            this.dataView.setUint32(this.len, t, !1);
            this.len += 4
        }
        ;
        this.writeString = function(t) {
            t = La(t);
            len = t.length;
            this.writeUInt16(t.length);
            for (var e = 0; e < len; e++)
                this.writeUInt8(t.charCodeAt(e))
        }
    }
    var qa, Za = 0;
    function Ka() {
        ii() && (theWs = ya,
        ya = null,
        theWs.close());
        1 < Za && (v += 1,
        v > s.length - 1 && (v = 0),
        A = s[v],
        $a());
        Ye = !1;
        document.getElementById("connecting").style.visibility = "visible";
        Ii();
        console.log("Connecting to " + A.name + "...");
        ya = new WebSocket("ws://" + A.ip + ":7020");
        ya.binaryType = "arraybuffer";
        ya.onopen = function() {
            Za = 0;
            document.getElementById("startMenu").style.visibility = "visible";
            document.getElementById("connecting").style.visibility = "hidden";
        }
        ;
        ya.onmessage = function(t) {
            ei(new DataView(t.data))
        }
        ;
        ya.onclose = function(t) {
            this == ya && (Za += 1,
            Le = Fe = We = !1,
            Ye || (qa = setTimeout(function() {
                Ka()
            }, 2e3),
            document.getElementById("connecting").style.visibility = "visible"))
        }
        ;
        ya.onerror = function() {
            console.log("socket error!")
        }
    }
    document.getElementById("serverSelect").onchange = Qa;
    function Qa() {
        v = document.getElementById("serverSelect").selectedIndex;
        A = s[v];
        $a();
        console.log("Server changed...");
        ii() && ya.close();
        b = !1;
        document.getElementById("spawnXpLabel").style.opacity = 0;
        P = I = null;
        Ka()
    }
    function $a() {
        if (window.localStorage)
            try {
                window.localStorage.setItem("lastServerIP", A.ip)
            } catch (t) {}
        document.getElementById("serverSelect").selectedIndex = v
    }
    function ti() {
        for (var t = document.getElementById("serverSelect"); t.lastChild; )
            t.removeChild(t.lastChild);
        for (var e = -1, a = 0; a < s.length; a++) {
            var i = document.createElement("option");
            i.text = s[a].name + " [" + (0 > s[a].playersCount ? "..." : s[a].playersCount) + " players]";
            s[a].ip == A.ip && (e = a);
            t.add(i)
        }
        -1 == e && (e = 0);
        t.selectedIndex = e
    }
    function ei(t) {
        t = new Va(t);
        switch (t.readUInt8()) {
        case 1:
            nPlayers = t.readUInt16();
            _e = Ya(nPlayers) + " players";
            serverVer = t.readUInt16();
            serverVer > e ? setTimeout(function() {
                p || (window.onbeforeunload = null);
                console.log("Old client (ver " + e + "/" + serverVer + ")");
                alert("mop3.io has been updated! Servers have restarted, Refresh needed.");
                window.location.reload()
            }, 1500) : (serverVer > e && console.log("Old server version detected!"),
            document.getElementById("startMenuWrapper").style.display = "block",
            wi(!0));
            break;
        case 2:
            var a = t.readUInt8();
            if (1 == a) {
                We || (document.getElementById("startButton").style.visibility = "visible");
                spectating = 2 == t.readUInt8();
                Fe = !spectating;
                Le = spectating;
                He = We = !0;
                Re = t.readUInt32();
                myRoomID = t.readUInt16();
                be = t.readUInt16();
                Ie = t.readUInt16();
                re = o_camx = n_camx = t.readUInt16() / 4;
                camy = o_camy = n_camy = t.readUInt16() / 4;
                n_camzoom = t.readUInt16() / 1e3;
                le = 1.5 * n_camzoom;
                spectating || di(t);
                spectating || (document.getElementById("startMenuWrapper").style.display = "none",
                p || (window.onbeforeunload = function(t) {
                    return "You're alive in a game, close mop3.io?"
                }
                ));
                if (!spectating && (G += 1,
                F += 1,
                window.localStorage))
                    try {
                        window.localStorage.setItem("gamesSinceAd", F)
                    } catch (t) {}
                b && (t = document.getElementById("spawnXpLabel"),
                t.style.display = "block",
                t.style.opacity = 1,
                t.textContent = "Joined party server :)");
                Di()
            } else if (0 == a) {
                t = document.getElementById("spawnXpLabel");
                t.style.display = "block";
                t.style.opacity = 1;
                t.textContent = "Error: this server is full!";
                b = !1;
                var i = A;
                setTimeout(function() {
                    Fe || A != i || (Za = 100,
                    Ka())
                }, 1e3)
            } else
                2 == a && (t = document.getElementById("spawnXpLabel"),
                t.style.display = "block",
                t.style.opacity = 1,
                t.textContent = "Error: link is invalid/expired!",
                b = !1,
                t = document.location.href,
                t = Ua("l", t),
                t = Ua("s", t),
                window.history.pushState("", document.title, t),
                alert("Error, your mope.io party link is invalid/ expired!"),
                setTimeout(function() {
                    Fe || A != i || ya.close()
                }, 3e3));
            break;
        case 8:
            var a = t.readUInt8()
              , n = t.readUInt8();
            lbData = [];
            for (wa = 0; wa < n; ++wa)
                lbData.push({
                    rank: t.readUInt8(),
                    name: t.readString(),
                    score: t.readUInt32()
                });
            ci(lbData, 0, a);
            break;
        case 10:
            nPlayers = t.readUInt16();
            _e = Ya(nPlayers) + " players";
            break;
        case 18:
            a = t.readUInt8();
            ra = t.readUInt32();
            switch (a) {
            case rt:
                gi = "A little mouse...\n Eat red berries to grow!\n Red-outlined players can eat you!";
                break;
            case ot:
                gi = "UPGRADED to rabbit:\nRemember, Eat anything outlined in LIGHT-GREEN!\n (You can now eat MICE!)";
                break;
            case ht:
                gi = "UPGRADED to PIG:\n You can now eat MUSHROOMS\n+ Pigs move FAST through MUD!";
                break;
            case dt:
                gi = "UPGRADED to FOX! ,\n (You can hide inside red berry bushes!)";
                break;
            case ct:
                gi = "UPGRADED to DEER:\n You can Eat LILLYPADS in Lakes/Oceans and Red Mushrooms around the map!";
                break;
            case ft:
                gi = "UPGRADED to MOLE! :\n Go in ANY hiding hole and hold W to dig around!";
                break;
            case gt:
                gi = "UPGRADED to ZEBRA! :\nYou can eat Mushroom bushes!\n (Often found inside lakes/oceans!)";
                break;
            case ut:
                gi = "UPGRADED to LION:\n Rawr, let's go hunt zebras!";
                break;
            case pt:
                gi = "UPGRADED to CHEETAH:\n Cheetahs love eating lions.";
                break;
            case yt:
                gi = "UPGRADED to BEAR:\n Bears climb through green hills! (And can swim pretty well too)";
                break;
            case mt:
                gi = "UPGRADED to CROCODILE:\n(Now hide in water spots) + Swim well in Mud & Lakes/Oceans!";
                break;
            case bt:
                gi = "UPGRADED to HIPPO! :\nHippos are great swimmers, dominate the Lakes/Oceans/mud!";
                break;
            case wt:
                gi = "UPGRADED to RHINO! :\n Press W to CHARGE with your mighty horn!";
                break;
            case Pt:
                gi = "A little shrimp...\n Eat red berries to grow!\n Red-outlined players can eat you!";
                break;
            case Mt:
                gi = "UPGRADED to trout:\nRemember, Eat anything outlined in LIGHT-GREEN!\n (You can now eat SHRIMPs!)";
                break;
            case vt:
                gi = "UPGRADED to crab! :\n You can eat orange plankton! + Crabs can survive on dry land!\n (On land, Press W to go into your shell!)";
                break;
            case At:
                gi = "UPGRADED to squid! :\n Squids can use INK when injured (press W!) \n+ you can hide in Red Berry bushes!";
                break;
            case xt:
                gi = "UPGRADED to SHARK! :\n A vicous predator of the oceans!";
                break;
            case St:
                gi = "UPGRADED to SEA HORSE! :\n An agile hunter!";
                break;
            case Et:
                gi = "UPGRADED to JELLYFISH! :\n JELLYFISH BE LIEK";
                break;
            case kt:
                gi = "UPGRADED to TURTLE! :\n Lives well on land & water! (On land, Press W to go into your shell!)";
                break;
            case Tt:
                gi = "UPGRADED to STINGRAY! :\n Use electic shock (Release W key!) to shock animals! \n(Takes a few seconds to recharge)";
                break;
            case It:
                gi = "UPGRADED to DRAGON! (WOW, you're amazing!):\nDominate the lands, fly over hills!";
                break;
            case PUFFERFISH:
                gi = "UPGRADED to PUFFERFISH!";
                break;
            case DOLPHIN:
                gi = "UPGRADED to DOLPHIN!";
                break;
            case DUGONG:
                gi = "UPGRADED to DUGONG!";
                break;
            case HIGHBROW_BOTTLENOSE:
                gi = "UPGRADED to HIGHBROW BOTTLENOSE!";
                break;
            case KILLER_WHALE:
                gi = "UPGRADED to KILLER WHALE!";
                break;
            case GIANT_SQUID:
                gi = "UPGRADED to GIANT SQUID!";
                break;
			case ProXYGamer:
                gi = "UPGRADED to KING SHAH!";
                break;
			case AwesomeAg:
                gi = "UPGRADED to KING RIPPER!";
                break;
			case GOATGAMER:
                gi = "UPGRADED to KING STAN!";
                break;
			case BlackDragon:
                gi = "UPGRADED to BLACK DRAGON!";
                break;
			case elephant:
                gi = "UPGRADED to ELEPHANT!";
                break;
            case stingerr:
                gi = "UPGRADED to STINGERR!\nYou are a pro ytber xd"
            default:
                gi = "UPGRADED to LAND MONSTER \nRule the world! All will fear you!"
            }
            ui = "white";
            pi = +new Date + 7500;
            oa = Array(50).fill(0);
            a = t.readUInt8();
            for (n = 0; n < a; n++)
                oa[t.readUInt8() - 1] = 1;
            ha = Array(50).fill(0);
            a = t.readUInt8();
            for (n = 0; n < a; n++)
                ha[t.readUInt8() - 1] = 1;
            da = Array(50).fill(0);
            a = t.readUInt8();
            for (n = 0; n < a; n++)
                da[t.readUInt8() - 1] = 1;
            ca = Array(50).fill(0);
            a = t.readUInt8();
            for (n = 0; n < a; n++)
                ca[t.readUInt8() - 1] = 1;
            break;
        case 14:
            var a = t.readUInt8()
              , s = t.readUInt32();
            0 == a || 1 == a ? (gi = "Watch out! You were eaten!",
            ui = "#F1C34C",
            pi = +new Date + 2500) : 4 == a ? (gi = "You died of thirst :( Don't let your water run out!",
            ui = "#F1C34C",
            pi = +new Date + 3500) : 2 == a ? (gi = "You died from a jellyfish sting!",
            ui = "#F1C34C",
            pi = +new Date + 3500) : 3 == a && (gi = "You died from a stingray shock!",
            ui = "#F1C34C",
            pi = +new Date + 3500);
            console.log("died msg");
            Fe = !1;
            Le = !0;
            Ci();
            try {
                p || googletag.pubads().refresh()
            } catch (t) {
                console.log("error refreshing ad: " + t)
            }
            window.setTimeout(function() {
                if (!Fe) {
                    g && O();
                    u && R();
                    document.getElementById("startMenuWrapper").style.display = "block";
                    Ve = 0 < s ? "You'll spawn with +" + Na(s) + " XP!" : "";
                    je = 0;
                    var t = document.getElementById("spawnXpLabel");
                    t.style.opacity = 0;
                    Ve && setTimeout(function() {
                        Fe || (t.style.display = "block",
                        t.style.opacity = 1)
                    }, 1e3);
                    document.getElementById("spawnXpLabel").textContent = Ve;
                    p || (window.onbeforeunload = null)
                }
            }, 2e3);
            break;
        case 4:
            si(t);
            break;
        case 19:
            a = t.readUInt32();
            if (a = ga[a])
                t = t.readString(),
                a.gotChat(t);
            break;
        case 22:
            t = t.readString();
            a = Sa(A.ip);
            Pi("mope.io/?s=" + a + "&l=" + t);
            break;
        case 23:
            t = t.readUInt8(),
            Fe && (console.log("event msg"),
            1 == t ? (gi = "Ouch! Your tail got bitten!",
            pi = ni + 2500) : 2 == t ? (gi = "You've been stung by a jellyfish!",
            pi = ni + 2500) : 3 == t ? (gi = "ZAP! You've been shocked by a STINGRAY!",
            pi = ni + 2500) : 5 == t && (gi = "You've been inked!",
            pi = ni + 2500))
        }
    }
    function ai(t) {
        ya.send(t.dataView.buffer)
    }
    function ii() {
        return null != ya && ya.readyState == ya.OPEN
    }
    var ni = +new Date
      , pa = +new Date;
    function si(t) {
        pa = ni = +new Date;
        o_camx = re;
        o_camy = camy;
        n_camx = t.readUInt16() / 4;
        n_camy = t.readUInt16() / 4;
        n_camzoom = t.readUInt16() / 1e3;
        var e = t.readUInt8();
        _a(e, 1) || (Ne = t.readUInt8(),
        xp = t.readUInt32(),
        Xe = t.readUInt8());
        for (var a = t.readUInt16(), i = 0; i < a; i++) {
            var n = t.readUInt8()
              , s = t.readUInt32()
              , l = t.readUInt16() / 4
              , r = t.readUInt16() / 4
              , o = t.readUInt16() / 4
              , e = t.readUInt8()
              , h = null;
            0 < e && (h = ga[t.readUInt32()]);
            var d = new za(s,n,r,o,l)
              , e = ga[s];
            delete ga[s];
            e = fa.indexOf(e);
            -1 != e && fa.splice(e, 1);
            ga[s] = d;
            fa.push(d);
            h && (d.updateTime = ni,
            d.nx = d.x,
            d.ny = d.y,
            d.ox = h.x,
            d.oy = h.y,
            d.x = h.x,
            d.y = h.y);
            n == Ct && (e = t.readUInt8(),
            s = t.readString(),
            d.nickName = s,
            d.type = e,
            d.name = s ? s : "mop3.io");
            n == Jt && (e = t.readUInt16(),
            n = t.readUInt16(),
            d.oceanW = e,
            d.oceanH = n,
            d.oceanNum = r > be / 2 ? 1 : 0)
        }
        a = t.readUInt16();
        for (i = 0; i < a; i++) {
            s = t.readUInt32();
            r = t.readUInt16() / 4;
            o = t.readUInt16() / 4;
            l = t.readUInt16() / 10;
            if (d = ga[s])
                d.updateTime = ni,
                d.ox = d.x,
                d.oy = d.y,
                d.nx = r,
                d.ny = o,
                d.oRad = d.rad,
                d.nRad = l;
            d && d.oType == Ct && (r = t.readUInt8(),
            n = t.readUInt16(),
            e = t.readUInt8(),
            d.type = r,
            r = Da(n - 90),
            d.angleDelta = Ra(d.angle, r),
            d.oAngle = d.angle,
            d.flag_hurt = _a(e, 7),
            d.flag_lowWat = _a(e, 6),
            r = _a(e, 5),
            d.flag_underWater = _a(e, 4),
            d.flag_invincible = _a(e, 3),
            d.flag_usingAbility = _a(e, 2),
            e = _a(e, 0) ? t.readUInt8() : 0,
            d.flag_tailBitten = _a(e, 0),
            d.flag_stunned = _a(e, 1),
            r ? (r = t.readUInt8(),
            .001 > d.hpBarA && (d.hpPer = r),
            d.hpPer_n = r,
            d.hpBarA_n = 1) : d.hpBarA_n = 0);
            d && d.oType == Vt && (e = t.readUInt8(),
            d.flag_hurt = _a(e, 0),
            d.flag_hurt ? (r = t.readUInt8(),
            d.hpBarA = 1,
            d.hpPer = r,
            .5 > d.hpBarA && (d.hpPer = r),
            d.hpPer_n = r,
            d.hpBarA_n = 1) : d.hpBarA_n = 0);
            d || console.log("PROBLEM, NO OBJ!")
        }
        a = t.readUInt16();
        for (r = 0; r < a; r++)
            d = t.readUInt32(),
            i = 0 < t.readUInt8() ? t.readUInt32() : 0,
            d = ga[d],
            i = 0 < i ? ga[i] : void 0,
            d && (d.dead = !0,
            d.updateTime = ni,
            d.oType != Qt && d.oType != $t && (i ? (d.ox = d.x,
            d.oy = d.y,
            d.oRad = d.rad,
            d.nx = i.nx,
            d.ny = i.ny,
            d.nRad = Math.min(d.rad, i.rad),
            d.hp_n = 0) : (d.ox = d.x,
            d.oy = d.y,
            d.oRad = d.rad,
            d.nx = d.x,
            d.ny = d.y,
            d.nRad = 0)))
    }
    function li(t, e) {
        crossHx = t;
        crossHy = e;
        crossL = 30;
        ie.beginPath();
        ie.moveTo(crossHx, crossHy - crossL / 2);
        ie.lineTo(crossHx, crossHy + crossL / 2);
        ie.stroke();
        ie.moveTo(crossHx - crossL / 2, crossHy);
        ie.lineTo(crossHx + crossL / 2, crossHy);
        ie.stroke()
    }
    function ri() {
        if (!ve) {
            ie.fillStyle = LAND_CL;
            ie.fillRect(0, 0, me, we);
            ie.save();
            ie.strokeStyle = "black";
            ie.globalAlpha = .055;
            ie.scale(le, le);
            for (var t = me / le, e = we / le, a = -.5 + (-re + t / 2) % 30; a < t; a += 30)
                ie.beginPath(),
                ie.moveTo(a, 0),
                ie.lineTo(a, e),
                ie.stroke();
            for (a = -.5 + (-camy + e / 2) % 30; a < e; a += 30)
                ie.beginPath(),
                ie.moveTo(0, a),
                ie.lineTo(t, a),
                ie.stroke();
            ie.restore()
        }
    }
    var oi = 250
      , hi = 250;
    function di(t) {
        oi = be / Ie * hi;
        ae = document.createElement("canvas");
        ae.width = oi;
        ae.height = hi;
        var e = ae.getContext("2d");
        e.globalAlpha = .35;
        e.fillStyle = "#000000";
        e.fillRect(0, 0, ae.width, ae.height);
        for (var a = oi / 200, i = hi / 200, n = t.readUInt16(), s = 0; 2 > s; s++) {
            e.fillStyle = WATER_DROP_CL;
            e.globalAlpha = .5;
            var l = oi / be;
            0 == s ? e.fillRect(0 * l, 0 * l, n * l, Ie * l) : e.fillRect((be - n) * l, 0 * l, n * l, Ie * l)
        }
        n = t.readUInt16();
        e.fillStyle = WATER_DROP_CL;
        e.globalAlpha = .5;
        for (s = 0; s < n; s++) {
            var l = t.readUInt8() * a
              , r = t.readUInt8() * i
              , o = 5 * t.readUInt8();
            e.beginPath();
            e.arc(l, r, Math.max(1, oi / be * o), 0, 2 * Math.PI);
            e.fill()
        }
        n = t.readUInt16();
        e.fillStyle = "#907A33";
        e.globalAlpha = .7;
        for (s = 0; s < n; s++)
            l = t.readUInt8() * a,
            r = t.readUInt8() * i,
            e.beginPath(),
            e.arc(l, r, Math.max(2.5, oi / be * 200), 0, 2 * Math.PI),
            e.fill();
        n = t.readUInt16();
        e.fillStyle = HILL_CL;
        e.globalAlpha = 1;
        for (s = 0; s < n; s++)
            l = t.readUInt8() * a,
            r = t.readUInt8() * i,
            e.beginPath(),
            e.arc(l, r, Math.max(1.5, oi / be * 50), 0, 2 * Math.PI),
            e.fill();
        n = t.readUInt16();
        e.fillStyle = "#A89937";
        e.globalAlpha = .6;
        for (s = 0; s < n; s++)
            l = t.readUInt8() * a,
            r = t.readUInt8() * i,
            e.beginPath(),
            e.arc(l, r, Math.max(1.5, oi / be * 100), 0, 2 * Math.PI),
            e.fill();
        n = t.readUInt16();
        e.fillStyle = BERRY_CL;
        e.globalAlpha = 1;
        for (s = 0; s < n; s++)
            l = t.readUInt8() * a,
            r = t.readUInt8() * i,
            e.beginPath(),
            e.arc(l, r, Math.max(2.5, oi / be * 40), 0, 2 * Math.PI),
            e.fill();
        n = t.readUInt16();
        e.fillStyle = CAVIAR_CL;
        e.globalAlpha = 1;
        for (s = 0; s < n; s++)
            l = t.readUInt8() * a,
            r = t.readUInt8() * i,
            e.beginPath(),
            e.arc(l, r, Math.max(2.5, oi / be * 40), 0, 2 * Math.PI),
            e.fill();
        n = t.readUInt16();
        e.fillStyle = WATER_DROP_CL;
        e.globalAlpha = 1;
        for (s = 0; s < n; s++)
            l = t.readUInt8() * a,
            r = t.readUInt8() * i,
            e.beginPath(),
            e.arc(l, r, Math.max(2.5, oi / be * 50), 0, 2 * Math.PI),
            e.fill()
    }
        function ci(t, e, a) {
        ee = null;
        if (0 != t.length && boardBar) {
            ee = document.createElement("canvas");
            e = ee.getContext("2d");
            var i;
            i = 55 + 22 * t.length;
            ee.width = 270;
            ee.height = i;
            e.globalAlpha = 0.2;
            e.fillStyle = "#000000";
            e.fillRect(0, 0, ee.width, ee.width);
            e.globalAlpha = 1;
            e.fillStyle = "#FFFFFF";
            i = A.name; // Надпись сервера, над топами игроков
            e.font = "24px Arial"; // Размер шрифта i = A.name
            ve || (e.shadowOffsetX = 1,
            e.shadowOffsetY = 1);
            e.shadowColor = "black";
            e.fillText(i, 110 - e.measureText(i).width / 2, 40);
            var n;
            e.textAlign = "left";
            e.font = "17px Arial";
            for (n = 0; n < t.length; ++n)
                i = Me ? "" : t[n].name || "mope.io",
                a == t[n].rank ? (e.fillStyle = "#FEED92",
                Me && (i = "you")) : e.fillStyle = "#FFFFFF",
                i = t[n].rank + ". " + i + " (" + Na(t[n].score) + ")",
                e.fillText(i, 15, 65 + 22 * n)
        }
    }
    function fi() {
        ie.save();
        if (Fe && xpbar) {
            water += .1 * (Ne - water);
            xpPer += .03 * (Xe - xpPer);
            var t = ga[Re],
            e = t && t.type == MOLE && t.flag_usingAbility,
            t = t && (t.flag_underWater || e),
            e = 1,
            a = 15 >= water;
            a && (e = .7 + .3 * Math.sin(2 * Math.PI / 1.2 * (ni / 1e3)));
            var i = Math.min(450, .9 * me) * oe
              , n = 30 * oe
              , s = me / 2
              , l = we - 60 * oe;
            ie.globalAlpha = .35 * e;
            ie.fillStyle = "#000000";
            ie.fillRect(s - i / 2, l - n / 2, i, n);
            ie.globalAlpha = e;
            ie.fillStyle = t ? "#8CCEF4" : WATER_DROP_CL;
            ie.fillRect(s - i / 2, l - n / 2, water / 100 * i, n);
            ie.fillStyle = pe ? a ? BERRY_CL : "orange" : a ? BERRY_CL : "white";
            ie.globalAlpha = 1 * e;
            ie.font = 22 * oe + "px Arial";
            ie.lineWidth = 1;
            ie.textAlign = "center";
            ie.textBaseline = "middle";
            ie.shadowColor = "black";
            ve || (a ? (ie.shadowOffsetX = 0,
            ie.shadowOffsetY = 0) : (ie.shadowOffsetX = 1,
            ie.shadowOffsetY = 1));
            t ? ie.fillText(a ? "LOW AIR" : "AIR", s, l) : ie.fillText(a ? "LOW WATER" : "WATER", s, l);
            ie.shadowOffsetX = 0;
            ie.shadowOffsetY = 0;
            ie.globalAlpha = .35;
            ie.fillStyle = "#000000";
            l = we - n / 2 - 5;
            i = .9 * me;
            ie.fillRect(s - i / 2, l - n / 2, i, n);
            ie.globalAlpha = 1;
            ie.fillStyle = "#F3C553";
            ie.fillRect(s - i / 2, l - n / 2, xpPer / 100 * i, n); //;
            ie.fillStyle = "white"; //;
            ie.globalAlpha = 1; //;
            ie.shadowColor = "black"; //;
            ve || (ie.shadowOffsetX = 1,
            ie.shadowOffsetY = 1); //;
            ie.fillText("" + Na(xp) + " xp  /  " + Na(ra) + " xp (" + Xe + "% to Next Animal)", s, l); // Шкала XP (данные xp, определяет массу до следующего животного)
            ie.shadowOffsetX = 0;
            ie.shadowOffsetY = 0;
            Aa && (Je.draw(),
            qe.draw(),
            Ze.draw(),
            na += .1 * ((Ke ? 1 : 0) - na),
            .005 < na && Fe && (ie.globalAlpha = .3 * na,
            ie.beginPath(),
            ie.arc($e, ta, ia * se, 0, 2 * Math.PI),
            ie.fillStyle = "#000000",
            ie.fill(),
            ie.globalAlpha = .5 * na,
            ie.beginPath(),
            ie.arc(ea, aa, ia * se * .57, 0, 2 * Math.PI),
            ie.fillStyle = "#000000",
            ie.fill(),
            t = .3 * la,
            la -= t,
            sa += t,
            joystickDistF += .1 * (joystickDistF_n - joystickDistF),
            ie.save(),
            ie.translate(me / 2, we / 2),
            ie.rotate(sa),
            ie.globalAlpha = .5 * na,
            ie.beginPath(),
            ie.fillStyle = "#000000",
            t = 40 * se,
            ga[Re] && (t = (9 + ga[Re].rad) * le),
            t *= .1 + .9 * joystickDistF,
            e = 15 * se,
            ie.moveTo(t + 30 * se * (.2 + .8 * joystickDistF), 0),
            ie.lineTo(t, e / 2),
            ie.lineTo(t, -e / 2),
            ie.closePath(),
            ie.fill(),
            ie.restore()))
        }
        ie.restore()
    }
    var gi = "Ready to survive!",
    ui = "white",
    pi = +new Date + 0;
    function ScreenText(ArgumentText, ArgumentText2) {
        gi = ArgumentText;
        pi = + new Date + ArgumentText2;
    };
    function yi() {
        var t = (pi - ni) / 1e3 / 1
          , t = 0 > t ? 0 : 1 < t ? 1 : t;
        0 >= t || (ie.save(),
        ie.translate(me / 2, .2 * we),
        ie.scale(oe, oe),
        ie.font = "25px Arial",
        ie.lineWidth = 1,
        ie.textAlign = "center",
        ie.textBaseline = "middle",
        ve || (ie.shadowOffsetX = 1,
        ie.shadowOffsetY = 1,
        ie.shadowColor = "black"),
        ie.fillStyle = ui,
        pha = pha = ie.globalAlpha = t,
        Ha(gi, 0, 0),
        ie.restore())
    }
    function mi(t) {
        ni = +new Date;
        window.requestAnimationFrame(mi);
        ie.clearRect(0, 0, me, we);
        t = (ni - pa) / 1e3 / .2;
        t = 0 > t ? 0 : 1 < t ? 1 : t;
        re = t * (n_camx - o_camx) + o_camx;
        camy = t * (n_camy - o_camy) + o_camy;
        le = (25 * le + n_camzoom) / camzoom;
        Ei();
        ri();
        ie.save();
        t = me / 2;
        var e = we / 2;
        ie.translate(t * (1 - le) + (t - re) * le, e * (1 - le) + (e - camy) * le);
        ie.scale(le, le);
        ie.save();
        He && (t = 10,
        t = 600,
        ie.globalAlpha = .5,
        ie.fillStyle = Z,
        ie.fillRect(0 - t, 0 - t, be + 2 * t, t),
        ie.fillRect(0 - t, Ie, be + 2 * t, t),
        ie.globalAlpha = .6,
        ie.fillStyle = K,
        ie.fillRect(0 - t, -.5, t, Ie + 1),
        ie.fillRect(be, -.5, t, Ie + 1));
        ie.restore();
        ua = [];
        for (d = 0; d < fa.length; d++)
            fa[d].updateZ();
        fa.sort(function(t, e) {
            return t.z == e.z ? t.id - e.id : t.z - e.z
        });
        for (d = 0; d < fa.length; d++)
            fa[d].draw();
        if (!Me)
            for (d = 0; d < fa.length; d++)
                "undefined" != typeof fa[d].chatLines && fa[d].drawChat();
        for (d = 0; d < ua.length; d++)
            t = ua[d],
            ga.hasOwnProperty(t.id) && delete ga[t.id],
            t = fa.indexOf(t),
            -1 != t && fa.splice(t, 1);
        ie.restore();
        Fe && (ee && ee.width && ie.drawImage(ee, 10 * se, 10 * se, ee.width * oe, ee.height * oe),
        ae && ae.width && ie.drawImage(ae, me - (10 * se + ae.width * oe), 10 * se, oi * oe, hi * oe),
        t = ga[Re]) && (ie.fillStyle = "white",
        ie.beginPath(),
        ie.arc(me - (10 * se + ae.width * oe) + t.x * ae.width * oe / be, 10 * se + t.y * ae.height * oe / Ie, 3, 0, 2 * Math.PI),
        ie.fill());
        yi();
        fi();
        370 > xi && Fe || (ie.save(),
        ie.font = "15px Arial",
        ie.lineWidth = 1,
        ie.textAlign = "right",
        ie.textBaseline = "bottom",
        ve || (ie.shadowOffsetX = 1,
        ie.shadowOffsetY = 1,
        ie.shadowColor = "black"),
        ie.fillStyle = "white",
        ie.fillText(_e, me - 5, we - 2),
        ve && (ke += 1,
        1e3 < ni - Ee && (Ee = +new Date,
        Ue = ke + " fps",
        ke = 0,
        console.log("fps: (avg. " + 1e3 * De / (ni - Ce) + ")")),
        De += 1,
        ie.fillText(Ue, me - 5, we - 45)),
        ie.restore())
    }
    window.requestAnimationFrame ? window.requestAnimationFrame(mi) : setInterval(draw, 1e3 / 60);
    function wi(t) {
        if (ii() && !Fe) {
            playerName = nickInput.value.replace(/(<([^>]+)>)/gi, "").substring(0, 20);
            var e = 9 + La(playerName).length + 1;
            null != I && null != P && (e += La(P).length + 2);
            mes = new Ja(e);
            mes.writeUInt8(2);
            mes.writeString(playerName);
            mes.writeUInt8(t ? 2 : 1);
            mes.writeUInt16(me);
            mes.writeUInt16(we);
            b ? (mes.writeUInt8(1),
            mes.writeString(P)) : mes.writeUInt8(0);
            ai(mes);
            if (!t && window.localStorage)
                try {
                    window.localStorage.setItem("nick", playerName + "")
                } catch (t) {}
        }
    }
    var bi = function() {
        console.log("Video done, joining game!");
        document.getElementById("spawn_cell").play();
        wi(!1)
    };
    function Ii() {
        document.getElementById("partyLinkOpenBut") && (document.getElementById("partyLinkOpenBut").style.display = "block",
        document.getElementById("partyLinkClicked").style.display = "none")
    }
    document.getElementById("partyLinkOpenBut") && (document.getElementById("partyLinkOpenBut").onclick = function() {
        We && (document.getElementById("partyLinkOpenBut") && (document.getElementById("partyLinkOpenBut").style.display = "none",
        document.getElementById("partyLinkClicked").style.display = "block"),
        newMsg = new Ja(1),
        newMsg.writeUInt8(22),
        ai(newMsg))
    }
    );
    function Pi(t) {
        var e = document.getElementById("partyLinkTxt");
        e.value = t;
        e.setSelectionRange(0, e.value.length);
        e.focus();
        e.setSelectionRange(0, e.value.length)
    }
    document.getElementById("partyLinkCopyBut") && (document.getElementById("partyLinkCopyBut").onclick = function() {
        var t = document.getElementById("partyLinkTxt");
        t.focus();
        t.setSelectionRange(0, t.value.length);
        try {
            document.execCommand("copy"),
            partyLinkCopyBut.text = "Copied!",
            setTimeout(function() {
                partyLinkCopyBut.text = "Copy"
            }, 1e3)
        } catch (t) {}
    }
    );
    document.getElementById("startButton").onclick = function() {
        Ci();
        document.getElementById("spawn_cell").play();
        !N && We && (X() ? (adplayer.startPreRoll(),
        N = !0,
        document.getElementById("startMenuWrapper").style.display = "none") : wi(!1))
    }
    ;
    document.getElementById("settingsButton").onclick = function() {
        var t = document.getElementById("optionsDiv");
        t.style.display = "none" == t.style.display ? "block" : "none";
        console.log("onlick")
    }
    ;
    document.getElementById("options_noImages").onchange = function() {
        if (window.localStorage) {
            Pe = document.getElementById("options_noImages").checked;
            try {
                window.localStorage.setItem("options_noImages", Pe ? 1 : 0)
            } catch (t) {}
            console.log("options_noimages: saved as " + window.localStorage.getItem("options_noImages"))
        }
    }
    ;
    document.getElementById("options_noNames").onchange = function() {
        if (window.localStorage) {
            Me = document.getElementById("options_noNames").checked;
            try {
                window.localStorage.setItem("options_noNames", Me ? 1 : 0)
            } catch (t) {}
            console.log("options_noNames: saved as " + window.localStorage.getItem("options_noNames"))
        }
    }
    ;
    document.getElementById("options_lowGraphics").onchange = function() {
        if (window.localStorage) {
            ve = document.getElementById("options_lowGraphics").checked;
            try {
                window.localStorage.setItem("options_lowGraphics", ve ? 1 : 0)
            } catch (t) {}
            ki();
            console.log("options_lowGraphics: saved as " + window.localStorage.getItem("options_lowGraphics"))
        }
    }
    ;
    document.getElementById("options_noJoystick").onchange = function() {
        if (window.localStorage) {
            Ae = document.getElementById("options_noJoystick").checked;
            try {
                window.localStorage.setItem("options_noJoystick", Ae ? 1 : 0)
            } catch (t) {}
            ki();
            console.log("options_noJoystick: saved as " + window.localStorage.getItem("options_noJoystick"))
        }
    }
    ;
    var Mi = document.getElementById("options_leftHanded");
    Mi && (Mi.onchange = function() {
        if (window.localStorage) {
            xe = Mi.checked;
            try {
                window.localStorage.setItem("options_leftHanded", xe ? 1 : 0)
            } catch (t) {}
            ki();
            console.log("options_leftHanded: saved as " + window.localStorage.getItem("options_leftHanded"))
        }
    }
    );
    var vi = !1;
    document.onkeydown = function(t) {
        Ci();
        var e = t.keyCode || t.which;
        32 == e && !vi && Fe ? (t.preventDefault(),
        Si(1, !0)) : 87 == e && !vi && Fe && (t.preventDefault(),
        Si(2, !0))
    }
    ;
    document.onkeyup = function(t) {
        var e = t.keyCode || t.which;
        13 != e || Fe ? Fe && (e = t.keyCode || t.which,
        32 != e || vi ? (87 != e || vi || (t.preventDefault(),
        Si(2, !1)),
        13 == e && Fe && Ai()) : Si(1, !1)) : document.getElementById("startButton").click()
    }
    ;
    function Ai() {
        var t = document.getElementById("chatinput");
        if (!vi && Fe)
            console.log("opening chatbox"),
            t.style.visibility = "visible",
            t.focus(),
            vi = !0,
            t.onblur = function() {
                vi && Ai()
            }
            ;
        else if (vi) {
            console.log("closing chatbox");
            var e = t.value + "";
            vi = !1;
            t.style.visibility = "hidden";
            t.blur();
            0 < e.length && Fe && (newMsg = new Ja(3 + La(e).length),
            newMsg.writeUInt8(19),
            newMsg.writeString(e),
            ai(newMsg));
            t.value = ""
        }
    }
    window.onresize = ki;
    var xi = 100
      , Ti = 100;
    function ki() {
        xi = window.innerWidth;
        Ti = window.innerHeight;
        se = window.devicePixelRatio;
        me = xi * se;
        we = Ti * se;
        te.width = me;
        te.height = we;
        te.style.width = xi + "px";
        te.style.height = Ti + "px";
        document.getElementById("chatinput").style.marginTop = Ti / 2 - 50 + "px";
        Aa && (Je.w = Je.h = 95 * se,
        qe.w = qe.h = 95 * se,
        Ze.w = 60 * se,
        Ze.h = 30 * se,
        Je.x = 25 * se + Je.w / 2,
        Je.y = we - (25 * se + Je.w / 2),
        xe && (Je.x = me - Je.x),
        qe.x = Je.x,
        qe.y = Je.y - (10 * se + qe.w / 2 + Je.w / 2),
        Ze.x = 72.5 * se + 125 * se,
        Ze.y = 15 * se + Ze.h / 2);
        oe = Math.max(me / 1344, we / 756);
        oe = Math.min(1, Math.max(.4, oe * se));
        500 > Math.min(xi, Ti) && (oe = se / 2 * .9);
        ii() && (mes = new Ja(5),
        mes.writeUInt8(17),
        mes.writeUInt16(me),
        mes.writeUInt16(we),
        ai(mes))
    }
    function Si(t, e) {
        1 == t ? (pe != e && ii() && Fe && (e && Ui(),
        mes = new Ja(2),
        mes.writeUInt8(21),
        mes.writeUInt8(e ? 1 : 0),
        ai(mes)),
        pe = e) : 2 == t ? (ye != e && ii() && Fe && (e && Ui(),
        mes = new Ja(2),
        mes.writeUInt8(20),
        mes.writeUInt8(e ? 1 : 0),
        ai(mes)),
        ye = e) : 3 == t && (ye != e && ii() && Fe && (e && Ui(),
        mes = new Ja(2),
        mes.writeUInt8(20),
        mes.writeUInt8(e ? 1 : 0),
        ai(mes)),
        ye = e)
    }
    window.requestAnimationFrame ? window.requestAnimationFrame(mi) : setInterval(draw, 1e3 / 60);
    function wi(t) {
        if (ii() && !Fe) {
            playerName = nickInput.value.replace(/(<([^>]+)>)/gi, "").substring(0, 20);
            var e = 9 + La(playerName).length + 1;
            null != I && null != P && (e += La(P).length + 2);
            mes = new Ja(e);
            mes.writeUInt8(2);
            mes.writeString(playerName);
            mes.writeUInt8(t ? 2 : 1);
            mes.writeUInt16(me);
            mes.writeUInt16(we);
            b ? (mes.writeUInt8(1),
            mes.writeString(P)) : mes.writeUInt8(0);
            ai(mes);
            if (!t && window.localStorage)
                try {
                    window.localStorage.setItem("nick", playerName + "")
                } catch (t) {}
        }
    }
    var vi = !1,
    AfkMode = false;
    document.onkeydown = function(t) {
        Ci();
        var e = t.keyCode || t.which;
        32 == e && !vi && Fe ? (t.preventDefault(),
        Si(1, !0)) : 87 == e && !vi && Fe && (t.preventDefault(),
        Si(2, !0))
    };
/*
    document.onkeypress = function(e) {
        console.log(e)
    }
*/
var numAniType = 0;
    document.onkeydown = function(Hothets) {
        Ci();
        var e = Hothets.keyCode || Hothets.which;
        if (9 == e) Hothets.preventDefault();
        else if (!vi & Fe)
            switch (e) {
			case 27:
                Hothets.preventDefault();
                ScreenText("Movement lock (ESC KEY): " + ((AfkMode = !AfkMode) ? "ON" : "OFF"), 2500);
			break;
            case 90:
                Hothets.preventDefault();
                newMsg = new Ja(3 + La("X: " + ge).length),
                newMsg.writeUInt8(19),
                newMsg.writeString("X: " + ge),
                ai(newMsg);
                newMsg = new Ja(3 + La("Y: " + fe).length),
                newMsg.writeUInt8(19),
                newMsg.writeString("Y: " + fe),
                ai(newMsg);
                break;
            case 38:
                numAniType++;
                if (numAniType == 1) {
                Ai();
				document.getElementById("chatinput").value="a:1";
				Ai();
				Ai();
				document.getElementById("chatinput").value="xp:0";
				Ai();
                }
            if (numAniType === 2) {
                Ai();
                document.getElementById("chatinput").value="a:2";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:50";
                Ai();
                break;
            }
            if (numAniType === 3) {
                Ai();
                document.getElementById("chatinput").value="a:3";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:200";
                Ai();
                break;
            }
            if (numAniType === 4) {
                Ai();
                document.getElementById("chatinput").value="a:4";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:450";
                Ai();
                break;
            }
            if (numAniType === 5) {
                Ai();
                document.getElementById("chatinput").value="a:5";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:1000";
                Ai();
                break;
            }
            if (numAniType === 6) {
                Ai();
                document.getElementById("chatinput").value="a:6";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:2100";
                Ai();
                break;
            }
            if (numAniType === 7) {
                Ai();
                document.getElementById("chatinput").value="a:7";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:4200";
                Ai();
                break;
            }
            if (numAniType === 8) {
                Ai();
                document.getElementById("chatinput").value="a:8";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:7900";
                Ai();
                break;
            }
            if (numAniType === 9) {
                Ai();
                document.getElementById("chatinput").value="a:9";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:15000";
                Ai();
                break;
            }
            if (numAniType === 10) {
                Ai();
                document.getElementById("chatinput").value="a:10";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:28500";
                Ai();
                break;
            }
            if (numAniType === 11) {
                Ai();
                document.getElementById("chatinput").value="a:11";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:54000";
                Ai();
                break;
            }
            if (numAniType === 12) {
                Ai();
                document.getElementById("chatinput").value="a:12";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:105000";
                Ai();
                break;
            }
            if (numAniType === 13) {
                Ai();
                document.getElementById("chatinput").value="a:13";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:200000";
                Ai();
                break;
            }
            if (numAniType === 14) {
                Ai();
                document.getElementById("chatinput").value="a:14";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:1000000";
                Ai();
                numAniType = 1;
                break;
            }
                break;
            case 40: 
                Hothets.preventDefault(),
                numAniType--;
                if (numAniType == 1) {
                Ai();document.getElementById("chatinput").value="a:1";Ai();Ai();document.getElementById("chatinput").value="xp: 0";Ai();
                }
            if (numAniType === 2) {
                Ai();
                document.getElementById("chatinput").value="a:2";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:50";
                Ai();
                break;
            }
            if (numAniType === 3) {
                Ai();
                document.getElementById("chatinput").value="a:3";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:200";
                Ai();
                break;
            }
            if (numAniType === 4) {
                Ai();
                document.getElementById("chatinput").value="a:4";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:450";
                Ai();
                break;
            }
            if (numAniType === 5) {
                Ai();
                document.getElementById("chatinput").value="a:5";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:1000";
                Ai();
                break;
            }
            if (numAniType === 6) {
                Ai();
                document.getElementById("chatinput").value="a:6";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:2100";
                Ai();
                break;
            }
            if (numAniType === 7) {
                Ai();
                document.getElementById("chatinput").value="a:7";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:4200";
                Ai();
                break;
            }
            if (numAniType === 8) {
                Ai();
                document.getElementById("chatinput").value="a:8";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:7900";
                Ai();
                break;
            }
            if (numAniType === 9) {
                Ai();
                document.getElementById("chatinput").value="a:9";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:15000";
                Ai();
                break;
            }
            if (numAniType === 10) {
                Ai();
                document.getElementById("chatinput").value="a:10";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:28500";
                Ai();
                break;
            }
            if (numAniType === 11) {
                Ai();
                document.getElementById("chatinput").value="a:11";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:54000";
                Ai();
                break;
            }
            if (numAniType === 12) {
                Ai();
                document.getElementById("chatinput").value="a:12";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:105000";
                Ai();
                break;
            }
            if (numAniType === 13) {
                Ai();
                document.getElementById("chatinput").value="a:34";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:200000";
                Ai();
                break;
            }
            if (numAniType === 14) {
                Ai();
                document.getElementById("chatinput").value="a:14";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:1000000";
                Ai();
                break;
			}
			if (numAniType === 15) {
				Ai();
                document.getElementById("chatinput").value="a:32";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:1000000";
                Ai();
                break;
			}
			if (numAniType === 16) {
				Ai();
                document.getElementById("chatinput").value="a:24";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:1000000";
                Ai();
                break;
			}
			if (numAniType === 17) {
				Ai();
                document.getElementById("chatinput").value="a:33";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:1000000";
                Ai();
                break;
			}
			if (numAniType === 18) {
				Ai();
                document.getElementById("chatinput").value="a:31";
                Ai();
                Ai();
                document.getElementById("chatinput").value="xp:1000000";
                Ai();
                break;
			}
                break;
                break;
            case 107:
            case 187:
                    camzoom = camzoom - 0.20;
                break;
            case 109:
            case 189:
                    camzoom = camzoom + 0.20;
                break;
            case 36:
                    camzoom = 26;
                break;
        }
    };

    function Ui() {
    if (AfkMode) {
        var player = ga[Re];
        if (player) {
            ce = player.x, fe = player.y;
        } else {
            return
        }
    }
        ii() && Fe && (.1 < Math.abs(ge - ce) || .1 < Math.abs(ue - fe)) && (mes = new Ja(6),
        mes.writeUInt8(5),
        mes.writeInt16(ce),
        mes.writeInt16(fe),
        ai(mes))
    }
    document.onkeyup = function(t) {
        var e = t.keyCode || t.which;
        13 != e || Fe ? Fe && (e = t.keyCode || t.which,
        32 != e || vi ? (87 != e || vi || (t.preventDefault(),
        Si(2, !1)),
        13 == e && Fe && Ai()) : Si(1, !1)) : document.getElementById("startButton").click()
    };
    function Ai() {
        var t = document.getElementById("chatinput");
        if (!vi && Fe)
            console.log("opening chatbox"),
            t.style.visibility = "visible",
            t.focus(),
            vi = !0,
            t.onblur = function() {
                vi && Ai()
            };
        else if (vi) {
            console.log("closing chatbox");
            var e = t.value + "";
            vi = !1;
            t.style.visibility = "hidden";
            t.blur();
            0 < e.length && Fe && (newMsg = new Ja(3 + La(e).length),
            newMsg.writeUInt8(19),
            newMsg.writeString(e),
            ai(newMsg));
            //console.log(e) // Выводит в консоль значения, написанные в чате
            t.value = ""
        }
    }
    window.onresize = ki;
    var xi = 100
      , Ti = 100;
    function ki() {
        xi = window.innerWidth;
        Ti = window.innerHeight;
        se = window.devicePixelRatio;
        me = xi * se;
        we = Ti * se;
        te.width = me;
        te.height = we;
        te.style.width = xi + "px";
        te.style.height = Ti + "px";
        document.getElementById("chatinput").style.marginTop = Ti / 2 - 55 + "px";
        Aa && (Je.w = Je.h = 95 * se,
        qe.w = qe.h = 95 * se,
        Ze.w = 60 * se,
        Ze.h = 30 * se,
        Je.x = 25 * se + Je.w / 2,
        Je.y = we - (25 * se + Je.w / 2),
        xe && (Je.x = me - Je.x),
        qe.x = Je.x,
        qe.y = Je.y - (10 * se + qe.w / 2 + Je.w / 2),
        Ze.x = 72.5 * se + 125 * se,
        Ze.y = 15 * se + Ze.h / 2);
        oe = Math.max(me / 1344, we / 756);
        oe = Math.min(1, Math.max(.4, oe * se));
        500 > Math.min(xi, Ti) && (oe = se / 2 * .9);
        ii() && (mes = new Ja(5),
        mes.writeUInt8(17),
        mes.writeUInt16(me),
        mes.writeUInt16(we),
        ai(mes))
    }
    function Si(t, e) {
        1 == t ? (pe != e && ii() && Fe && (e && Ui(),
        mes = new Ja(2),
        mes.writeUInt8(21),
        mes.writeUInt8(e ? 1 : 0),
        ai(mes)),
        pe = e) : 2 == t ? (ye != e && ii() && Fe && (e && Ui(),
        mes = new Ja(2),
        mes.writeUInt8(20),
        mes.writeUInt8(e ? 1 : 0),
        ai(mes)),
        ye = e) : 3 == t && (ye != e && ii() && Fe && (e && Ui(),
        mes = new Ja(2),
        mes.writeUInt8(20),
        mes.writeUInt8(e ? 1 : 0),
        ai(mes)),
        ye = e)
    }
    te.addEventListener("gesturestart", function(t) {
        console.log("gesture start!");
        t.preventDefault()
    });
    te.ontouchstart = function(t) {
        Ci();
        console.log("touch start!");
        if (Aa)
            for (var e = 0; e < t.changedTouches.length; e++) {
                var a = t.changedTouches[e]
                  , i = Je.testPosHitsButton(a.clientX * se, a.clientY * se);
                if (!Je.pressed && i) {
                    t.preventDefault();
                    Je.pressed = !0;
                    Je.pressedTouchID = a.identifier;
                    Si(1, !0);
                    return
                }
                i = qe.testPosHitsButton(a.clientX * se, a.clientY * se);
                if (!qe.pressed && i) {
                    t.preventDefault();
                    qe.pressed = !0;
                    qe.pressedTouchID = a.identifier;
                    Si(2, !0);
                    return
                }
                i = Ze.testPosHitsButton(a.clientX * se, a.clientY * se);
                if (!Ze.pressed && i) {
                    t.preventDefault();
                    Ai();
                    return
                }
                if (!Ae && !Ke && Fe) {
                    Ke = !0;
                    $e = a.clientX * se;
                    ta = a.clientY * se;
                    ea = $e;
                    aa = ta;
                    Qe = a.identifier;
                    return
                }
            }
        he = t.touches[0].clientX * se;
        de = t.touches[0].clientY * se;
        Ei()
    }
    ;
    te.ontouchmove = function(t) {
        Ci();
        t.preventDefault();
        for (var e = 0; e < t.changedTouches.length; e++) {
            var a = t.changedTouches[e];
            if (a.identifier != Je.pressedTouchID && a.identifier != qe.pressedTouchID && a.identifier != Ze.pressedTouchID)
                if (Ae)
                    he = a.clientX * se,
                    de = a.clientY * se,
                    Ei();
                else if (Ke && a.identifier == Qe) {
                    var i = a.clientX * se - $e
                      , a = a.clientY * se - ta
                      , n = Math.sqrt(i * i + a * a);
                    if (0 < n) {
                        var i = i / n
                          , a = a / n
                          , n = Math.min(1, n / (ia * se))
                          , s = Math.pow(n, 3);
                        .1 > s && (s = 0);
                        s *= 300 * se;
                        la = Ra(sa, Math.atan2(a, i));
                        joystickDistF_n = n;
                        ea = $e + ia * se * i * n;
                        aa = ta + ia * se * a * n;
                        he = me / 2 + i * s;
                        de = we / 2 + a * s;
                        Ei()
                    }
                }
        }
    }
    ;
    te.ontouchend = function(t) {
        console.log("touch end!");
        if (Aa && Fe)
            for (var e = 0; e < t.changedTouches.length; e++) {
                var a = t.changedTouches[e];
                Ke && a.identifier == Qe && (Ke = !1,
                Qe = -1);
                Je.pressed && Je.pressedTouchID == a.identifier ? (Je.pressed = !1,
                Je.pressedTouchID = -1,
                Si(1, !1),
                console.log("run released!")) : qe.pressed && qe.pressedTouchID == a.identifier && (qe.pressed = !1,
                qe.pressedTouchID = -1,
                Si(2, !1),
                console.log("button released!"))
            }
    }
    ;
    te.ontouchcancel = function(t) {
        console.log("touch cancel");
        te.ontouchend(t)
    }
    ;
    te.ontouchleave = function(t) {
        console.log("touch leave")
    }
    ;
    te.onmousemove = function(t) {
        he = t.clientX * se;
        de = t.clientY * se;
        Ei();
        Ye || Ci()
    }
    ;
    te.onmousedown = function(t) {
        Ci();
        1 == t.which && Si(1, !0);
        3 == t.which && Si(2, !0)
    }
    ;
    te.onmouseup = function(t) {
        1 == t.which && Si(1, !1);
        3 == t.which && Si(2, !1)
    };
    te.onblur = function(t) {
        Si(1, !1);
        Si(2, !1)
    };
    window.onfocus = function(t) {
        Ci()
    };
    window.onmouseout = function(t) {
        null == t.toElement && null == t.relatedTarget && (Si(1, !1),
        Si(2, !1))
    };
    document.oncontextmenu = document.body.oncontextmenu = function() {
        return !Fe
    };
    function Ei() {
        var t = me / 2
          , e = we / 2;
        ge = ce;
        ue = fe;
        ce = (he - (t - re * le)) / le;
        fe = (de - (e - camy * le)) / le
    }
    function Ui() {
    if (AfkMode) {
        var player = ga[Re];
        if (player) {
            ce = player.x, fe = player.y;
        } else {
            return
        }
    }
        ii() && Fe && (.1 < Math.abs(ge - ce) || .1 < Math.abs(ue - fe)) && (mes = new Ja(6),
        mes.writeUInt8(5),
        mes.writeInt16(ce),
        mes.writeInt16(fe),
        ai(mes))
    }
    setInterval(Ui, 20);
    function Ci() {
        Ge = +new Date;
        Ye && (Ye = !1,
        p || (window.onbeforeunload = null),
        document.getElementById("connecting").style.visibility = "visible",
        window.location.reload())
    }
    setInterval(function() {
        +new Date - Ge > 6e4 * (Fe ? 240 : 10) && !Ye && We && (console.log("Disconnected for afk..."),
        Ye = !0,
        ii() && socket.close())
    }, 5e3);
    function Di() {
        ki();
        ga = {};
        fa = [];
        ua = [];
        Ne = water = 100;
        water = Ne = Xe = xpPer = xp = 0;
        if (!b) {
            Ve = "";
            var t = document.getElementById("spawnXpLabel");
            t.style.display = Ve ? "block" : "none";
            t.textContent = Ve
        }
        Ze.pressed = !1;
        Je.pressed = !1;
        Ke = qe.pressed = !1
    }
    window.onload = function() {
        ki();
        if (window.localStorage) {
            var t = document.getElementById("nickInput");
            t.value = window.localStorage.getItem("nick");
            t.setSelectionRange(0, t.value.length);
            Aa || t.focus()
        }
    }
	
							/*
							if (a = image("img/stonehead" + ".png")) e = this.rad,
							ie.rotate(this.rPer * Math.PI * 2),
							ie.drawImage(n, -e, -e, 2 * e, 2 * e);
							*/
							/*
							VOLCANO
							
							ja(0, 0, Math.max(0, 1 * this.rad), "#815427");
							ja(0, 0, Math.max(0, .6 * this.rad), "#6e4b29");
							ja(0, 0, Math.max(0, .5 * this.rad), "#543d28");
							ja(0, 0, Math.max(0, .45 * this.rad), "#3f3124");
							ja(0, 0, Math.max(0, .33 * this.rad), "#241e19");
							ja(0, 0, Math.max(0, .25 * this.rad), "#120f0d");
							ja(0, 0, Math.max(0, .2 * this.rad), "#ff6000");
							*/

//}
// Текст на экран
/*
function ScreenText(ArgumentText, ArgumentText2) {
    gi = ArgumentText;
    pi = + new Date + ArgumentText2;
}
*/
//)();


();
        }
)();
