/**
 * Created by hezhenzhen on 2016/12/12.
 */
var arg;
var onresize = function(){
    var deviceWidth = document.documentElement.clientWidth||window.innerWidth||document.body.clientWidth;
    if(deviceWidth > 750) deviceWidth = 750;
    document.documentElement.style.fontSize = deviceWidth / 7.5 + 'px';
    arg = deviceWidth / 7.5 / 100;
};
onresize();
window.addEventListener("resize",onresize);
function object(){
    this.x=0;
    this.y=0;
    this.l=11;
    this.w = 0;
    this.h = 0;
    this.s = 0;
    this.image=new Image();
}
function getSucTips(){
    var tips = ['五千年难遇！', '  加油！  ', '厉害呀word哥！', '  你真棒！  ', ' ', ' ', ' ', ' '];
    var tip_index = Math.round(Math.random()*7);
    var the_tip = tips[tip_index];
    return the_tip;
}
function getFillTips(){
    var tips = ['看准点呀姐！', '不会这么倒霉吧！', '哎呀，我去！', ' ', ' ', ' '];
    var tip_index = Math.round(Math.random()*5);
    var the_tip = tips[tip_index];
    return the_tip;
}
window.onload = function(){
    onresize();
    var ca = document.getElementById('gameCanvas');
    var clientW = document.documentElement.clientWidth;
    var clientH = document.documentElement.clientHeight;
    var cTop = parseInt(206 * arg);
    alert(clientH - cTop);
    var nHei = clientH - cTop;
    var canvasWidth = Math.floor(clientW * 750 / 750);
    var canvasHeight = Math.floor(clientW * nHei / 750);
    ca.setAttribute('width', canvasWidth + 'px');
    ca.setAttribute('height', nHei + 'px');
    var cWidth = ca.clientWidth;
    var cHeight = ca.clientHeight;
    var ctx = ca.getContext("2d");
    var zl = 100;
    var tu = new Array();
    var B = arg.toFixed(2);
    var playerWidth = 240 * B;
    var playerHeight = 170 * B;
    var shi = 0;
    var chi = 0;
    var fs = 0;
    var h = 30;
    var remainTime;
    var maskO = document.getElementById('mask');
    var p2_clock = document.getElementById('p2_clock');
    var res_box = document.getElementById('res_box');
    var pop_bonus = document.getElementById("pop_bonus");
    var bonus_res = document.getElementById("bonus_res");
    var bonus_mask = document.getElementById("bonus_mask");
    var pageLoad = document.getElementById('page0');
    var pageStart = document.getElementById('page1');
    var pageGame = document.getElementById('page2');
    // var music = document.getElementById('p2_cd');
    var _musicP = document.getElementById('p2_music');
    var audio = document.getElementById('audio');
    var p1_start = document.getElementById('p1_start');
    var tip_pops = document.getElementById('tip_pops');
    var tips_tits = document.getElementById('tips_tits');
    var pop_close = document.getElementById('pop_close');
    var tab_cs = document.getElementsByClassName('tab-c');
    var p1_tip = document.getElementById('p1_tip');
    var again_btn = document.getElementById('again_btn');
    var look_btn = document.getElementById('look_btn');
    var get_btn = document.getElementById('get_btn');
    var look_link = document.getElementById('look_link');
    var share = document.getElementById('share');
    var share_btn = document.getElementById('share_btn');
    var cur_load = document.getElementById('cur_load');
    var load_star = document.getElementById('load_star');
    var load_txt = document.getElementById('load_txt');
    var player = new Image();
    var startGame;
    player.src = 'images/p2_hz.png';
    var player_b = new Image();
    player_b.src = 'images/boom.png';
    var player_l = new Image();
    player_l.src = 'images/light.png';
    var sprite = new object();
    sprite.x = 0;
    sprite.y = cHeight - playerHeight - 10;
    sprite.image = player;
    audio.pause();
    //加载页
    var loadFun = {
        init: function(){
            cur_load.style.width = '0.1rem';
            load_star.style.left = '0rem';
            loadFun.setLoad();
        },
        setLoad: function(){
            var tt;
            var num = 0;
            var loadl = 0;
            var imgs = document.getElementsByTagName('img');
            var len = imgs.length;
            for(var i = 0; i < len; i++) {
                console.log(imgs[i].complete);
                if (imgs[i].complete) {
                    loadl++
                }
            }
            tt = setInterval(function(){
                var _w = parseFloat(cur_load.style.width.replace('rem', ''));
                var _nw = parseFloat(_w + 0.049).toFixed(3);
                if (_nw >= 4.9) _nw = 4.9;
                cur_load.style.width = _nw + 'rem';
                load_star.style.left = (_nw - .42) + 'rem';
                num ++;
                load_txt.innerHTML = num + '%';
                if(_nw >= 4.9 ){
                    clearInterval(tt);
                    if(loadl == len){
                        load_txt.innerHTML = num + '100%';
                        pageLoad.style.display = 'none';
                        pageStart.style.display = 'block';
                    }
                }
            }, 30);
            // Pace.on('start', function(){
            //     tt = setInterval(function(){
            //         var _w = parseFloat(cur_load.style.width.replace('rem', ''));
            //         var _nw = _w + 0.049;
            //         if (_nw >= 4.9) _nw = 4.9;
            //         cur_load.style.width = _nw + 'rem';
            //         load_star.style.left = (_nw - .42) + 'rem';
            //         num ++;
            //         load_txt.innerHTML = num + '%';
            //     }, 10);
            // });
            // Pace.on('done', function(){
            //     clearInterval(tt);
            //     load_txt.innerHTML = num + '100%';
            //     pageLoad.style.display = 'none';
            //     pageStart.style.display = 'block';
            // });
        }

    };
    loadFun.init();
    function movePlayer(event){
        event.preventDefault();
        var x = event.targetTouches[0].pageX;
        sprite.x = x - playerWidth/2;
        if(sprite.x + playerWidth >= cWidth) sprite.x = cWidth-playerWidth;
        else if(sprite.x <= playerWidth/2) sprite.x = 0;
    }
    //查看奖金--提现页面
    function lookBonus(cur){
        pop_bonus.style.display = 'none';
        bonus_mask.style.display = 'none';
        bonus_res.style.display = 'none';
        var tab_ts = tips_tits.getElementsByClassName('tab-t');
        for(var i=0; i<tab_cs.length; i++){
            if(i==cur){
                tab_cs[cur].setAttribute('class', 'tab-c active');
                tab_ts[cur].setAttribute('class', 'tab-t tit' + cur + ' active');
            }else{
                tab_cs[i].setAttribute('class', 'tab-c');
                tab_ts[i].setAttribute('class', 'tab-t tit' + i);
            }
        }
        res_box.style.display = 'none';
        tip_pops.style.display = 'block';
    }
    //游戏设置
    var gameSet = {
        B: 0.56,
        speed: 10,
        gameTime: 30,
        beginTime: new Date(),
        init: function () {
            shi = 0;
            tu = [];
            ctx.clearRect(0,0,cWidth,cHeight);
            this.beginTime = new Date();
            gameSet.setCanvas();
            gameSet.setPlayer();
            gameSet.interval();
            ca.addEventListener("touchmove", movePlayer, false);
        },
        setCanvas: function () {
            ca.setAttribute('width', canvasWidth + 'px');
            ca.setAttribute('height', nHei + 'px');
            cWidth = ca.clientWidth;
            cHeight = ca.clientHeight;
        },
        setPlayer: function () {
            var player = new Image();
            player.src = 'images/p2_hz.png';
            sprite.x = 0;
            sprite.y = cHeight - playerHeight - 10;
            sprite.image = player;
        },
        controlSpeed: function () {
            if (remainTime > 20) {
                h = 10;
                this.speed = 24;
            }else if (remainTime > 10) {
                h = 5;
                this.speed = 26;
            } else if (remainTime > 5) {
                h = 5;
                this.speed = 28;
            } else {
                h = 5;
                this.speed = 30;
            }
        },
        buildImg: function () {
            if (shi % h == 0) {
                for (var j = chi; j < (chi + 1); j++) {
                    tu[j] = new object();
                    var k = Math.round(Math.random() * zl);
                    if (k < 10) {
                        tu[j].image.src = "images/pro_1.png";
                        tu[j].q = 1;
                        tu[j].w = 142;
                        tu[j].h = 228;
                    } else if (k < 20) {
                        tu[j].image.src = "images/pro_2.png";
                        tu[j].q = 1;
                        tu[j].w = 174;
                        tu[j].h = 200;
                    } else if (k < 30) {
                        tu[j].image.src = "images/pro_3.png";
                        tu[j].q = 1;
                        tu[j].w = 135;
                        tu[j].h = 215;
                    }else if (k < 40) {
                        tu[j].image.src = "images/pro_4.png";
                        tu[j].q = 1;
                        tu[j].w = 132;
                        tu[j].h = 205;
                    }else if (k < 50) {
                        tu[j].image.src = "images/pro_5.png";
                        tu[j].q = 1;
                        tu[j].w = 133;
                        tu[j].h = 201;
                    }else if (k < 60) {
                        tu[j].image.src = "images/pro_6.png";
                        tu[j].q = 1;
                        tu[j].w = 133;
                        tu[j].h = 213;
                    }else if (k < 70) {
                        tu[j].image.src = "images/pro_7.png";
                        tu[j].q = 1;
                        tu[j].w = 137;
                        tu[j].h = 244;
                    }else if (k < 80) {
                        tu[j].image.src = "images/pro_8.png";
                        tu[j].q = 1;
                        tu[j].w = 169;
                        tu[j].h = 212;
                    } else {
                        tu[j].image.src = "images/pro_boom.png";
                        tu[j].q = 2;
                        tu[j].w = 146;
                        tu[j].h = 203;
                    }
                    var range = cWidth - tu[j].w*0.5;
                    var i = Math.round(Math.random() * range);
                    if (j == chi + 1) {
                        while (Math.abs(i - tu[2 * chi].x) < 30) {
                            i = Math.round(Math.random() * range);
                        }
                    }
                    tu[j].x = i;
                    tu[j].y = -Math.round(Math.random() * 100);
                }
                chi++;
                if (chi == 5) chi = 0;
            }
            shi++;
        },
        getPoint: function(a,b){
            var B = this.B;
            var c = a.x - b.x;
            var d = a.y - b.y;
            if(c < b.image.width*B && c > -a.image.width*B  && d < b.image.height*B && d > -a.image.height*B){
                return true;
            }else{
                return false;
            }
        },
        checkTime: function(){
            var _f = 0;
            var nowTime = new Date();
            var beginTime = this.beginTime;
            var t = (nowTime.getTime()-beginTime.getTime())/1000;
            var _p = parseInt((nowTime.getTime()-beginTime.getTime())/1000);
            remainTime = this.gameTime-parseInt((nowTime.getTime()-beginTime.getTime())/1000);
            _f = 100 - parseInt((t - _p)*100);
            if(_f == 100) _f = 0;
            document.getElementById('Time').innerHTML = remainTime + ':' + _f;
        },
        drawCanvas: function () {
            this.controlSpeed();
            this.buildImg();
            var tip = '';
            for (var i = 0; i < tu.length; i++) {
                var t_tip = '';
                if (gameSet.getPoint(sprite, tu[i])) {
                    if (tu[i].q == 1) {
                        fs += 5;
                        tip = "+5";
                        t_tip = getSucTips();
                        ctx.drawImage(player_l,sprite.x+playerWidth*.3,sprite.y-60, playerWidth, playerHeight);
                    } else if (tu[i].q == 2) {
                        fs -= 20;
                        fs = fs < 0 ? 0 : fs;
                        tip = "-20";
                        t_tip = getFillTips();
                        ctx.drawImage(player_b,sprite.x+playerWidth*.3,sprite.y-60, playerWidth, playerHeight);
                    }
                    tu[i].y += 200;
                } else if (!gameSet.getPoint(sprite, tu[i])) {
                    tu[i].y += this.speed;
                }
                //设置字体样式
                ctx.font = "30px Arial";
                //设置字体填充颜色
                ctx.fillStyle = "#c22004";
                ctx.fillText(tip, sprite.x + 60, sprite.y);
                ctx.font = "24px Microsoft YaHei";
                ctx.fillStyle = "#ffec05";
                ctx.fillText(t_tip, cWidth/4, cHeight/2);
                tu[i].s = tu[i].s >= 0.9 ? 1 : tu[i].s += 0.1;
                ctx.drawImage(tu[i].image, tu[i].x, tu[i].y, tu[i].w*B*tu[i].s, tu[i].h*B*tu[i].s);
            }
        },
        stop: function(){
            var flag = false;
            shi = 0;
            clearInterval(startGame);
            ctx.clearRect(0,0,cWidth,cHeight);
            maskO.style.display = 'block';
            p2_clock.style.display = 'block';
            maskO.addEventListener('touchstart', function(event){
                event.preventDefault();
            }, false);
            document.getElementById('curPoint').innerHTML = fs;
            setTimeout(function(){
                p2_clock.style.display = 'none';
                if(fs >= 100){
                    res_box.setAttribute('class', 'p2_success');
                    flag = true
                }else{
                    res_box.setAttribute('class', 'p2_fail');
                }
                fs = 0;
                res_box.style.display = 'block';
                if(flag){
                    setTimeout(function(){
                        pop_bonus.style.display = 'block';
                        bonus_mask.style.display = 'block';
                    }, 10)
                }
            }, 1500)
        },
        interval: function(){
            startGame = setInterval(function(){
                ctx.clearRect(0,0,cWidth,cHeight);
                ctx.drawImage(sprite.image,sprite.x,sprite.y, playerWidth, playerHeight);
                gameSet.drawCanvas();
                document.getElementById('point').innerHTML = fs;
                gameSet.checkTime();
                if(remainTime==0) {
                    document.getElementById('Time').innerHTML = "00:00";
                    gameSet.stop()
                }
            },100);
        }
    };
    //music控制
    _musicP.addEventListener('touchstart', function(){
        if(audio.paused){
            audio.play();
            _musicP.setAttribute('class', 'p2_music music_on');
        }else{
            audio.pause();
            _musicP.setAttribute('class', 'p2_music');
        }
    }, false);
    // 开始游戏按钮
    p1_start.addEventListener('touchstart', function(){
        pageStart.style.display = 'none';
        pageGame.style.display = 'block';
        gameSet.init();
    }, false);
    //点击红包查看奖金
    bonus_mask.addEventListener('touchstart', function(){
        bonus_mask.style.display = 'none';
        bonus_res.style.display = 'block';
    }, false);
    //锦囊切换
    tips_tits.addEventListener('touchstart', function(event){
        var target = event.target;
        var index = target.getAttribute('index');
        var tab_ts = tips_tits.getElementsByClassName('tab-t');
        for(var i=0; i<tab_cs.length; i++){
            if(i==index){
                tab_cs[index].setAttribute('class', 'tab-c active');
                tab_ts[index].setAttribute('class', 'tab-t tit' + index + ' active');
            }else{
                tab_cs[i].setAttribute('class', 'tab-c');
                tab_ts[i].setAttribute('class', 'tab-t tit' + i);
            }
        }
    }, false);
    //关闭锦囊
    pop_close.addEventListener('touchstart',function(){
        tip_pops.style.display = 'none';
        maskO.style.display = 'none';
        pageGame.style.display = 'none';
        pageStart.style.display = 'block';
    }, false);
    //弹出锦囊
    p1_tip.addEventListener('touchstart',function(){
        maskO.style.display = 'block';
        tip_pops.style.display = 'block';
    }, false);
    //再玩一次
    again_btn.addEventListener('touchstart',function(){
        fs = 0;
        maskO.style.display = 'none';
        res_box.style.display = 'none';
        gameSet.init();
    }, false);
    //分享提示
    share_btn.addEventListener('touchstart',function(){
        share.style.display = 'block';
    }, false);
    //点击分享提示隐藏
    share.addEventListener('touchstart',function(){
        share.style.display = 'none';
    }, false);
    //查看红包
    look_btn.addEventListener('touchstart',function(){
        this.style.display = 'none';
        // setTimeout(function(){
        //     lookBonus(2)
        // }, 3000)

    }, false);
    //立即提取
    get_btn.addEventListener('touchstart',function(){
        this.style.display = 'none';
        // lookBonus(2)
    }, false);
    //排行榜
    look_link.addEventListener('touchstart',function(){lookBonus(1)}, false);
};