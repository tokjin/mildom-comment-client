/////////////////////////////////////////////////////////
////////////            宣言                  ///////////
////////////////////////////////////////////////////////

let stickerList = [];
let giftList = [];
let ws;

/////////////////////////////////////////////////////////
////////////            function             ////////////
////////////////////////////////////////////////////////

let getStickerList = () => {
    ajaxStickerList().done(function (res) {
        let listJson = res.body;
        listJson.official_emotions.forEach(function(val){ stickerList.push(val); });
        if(listJson.fans_group_emotions) listJson.fans_group_emotions.forEach(function(val){ stickerList.push(val); });
        console.log('Sticker List Load.');
    }).fail(function (res) { console.log('getStickerList failed'); });
}

let ajaxStickerList = () => {
    let url = 'https://cloudac.mildom.com/nonolive/gappserv/emotion/getListV1?room_id='+roomId+'&__platform=web';
    return $.ajax({ url: url, type: 'GET' });
}

let getGiftList = () => {
    ajaxGiftList().done(function (res) {
        let listJson = res.body;
        listJson.models.forEach(function(val){ giftList.push(val); });
        listJson.pack.forEach(function(val){ giftList.push(val); });
        console.log('Gift List Load.');
    }).fail(function (res) { console.log('getGiftList failed'); });
}

let ajaxGiftList = () => {
    let url = 'https://cloudac.mildom.com/nonolive/gappserv/gift/find';
    return $.ajax({ url: url, type: 'GET' });
}

let randText = (type, len) => {
    let p = 36;
    
    if(type == 'Int') p = 10;
    if(!len) len = 10;
    
    return Math.random().toString(p).slice(0-len);
}

/////////////////////////////////////////////////////////
////////////            メイン処理            ////////////
////////////////////////////////////////////////////////

$(document).ready(function () {
    getStickerList();
    getGiftList();
    
    wsConnect();
    $(window).on("beforeunload", function (e) { wsDisconnect });
});

//////////////////////////////////////////////////////////////
////////////            WebSocketの処理            ////////////
//////////////////////////////////////////////////////////////

let wsConnect = (id) => {
    if(id) roomId = id;
    let wsUri = "wss://jp-room1.mildom.com/?roomId=" + roomId;
    ws = new WebSocket(wsUri);
    ws.onopen = (e) => { onOpen(e) };
    ws.onclose = (e) => { onClose(e) };
    ws.onmessage = (e) => { onMessage(e) };
    ws.onerror = (e) => { onError(e) };
    noticeDraw('起動しました('+currentVer+')', 'info');
}

let wsDisconnect = () => {
    ws.close()
}

let onOpen = (e) => {
    console.log("CONNECTED: "+roomId);
    noticeDraw('ID:'+roomId+' へ接続しました。', 'open');
    let guestId = "pc-gp-"+randText('Str',8)+"-"+randText('Str',4)+"-"+randText('Str',4)+"-"+randText('Int',4)+"-"+randText('Str',12);
    let userName = "guest"+randText('Int',6);
    doSend('{"userId":0,"level":1,"userName":"'+userName+'","guestId":"'+guestId+'","roomId":'+roomId+',"cmd":"enterRoom","reqId":1,"reConnect":1,"nobleLevel":0,"avatarDecortaion":0,"enterroomEffect":0,"nobleClose":0,"nobleSeatClose":0}');
}

let onClose = (e) => {
    console.log("DISCONNECTED");
    noticeDraw('ID:'+roomId+' を切断しました。', 'close');
}

let onMessage = (e) => {
    let d = JSON.parse(e.data);
    
    switch(d.cmd){
        case 'enterRoom': // 接続完了
            console.log(d.cmd, d.userCount);
            break;
            
        case 'onAdd': // 入室通知
            console.log(d.cmd, d.userName);
            onAddDraw(d.userName);
            break;
            
        case 'onLove': // 
            console.log(d.cmd, d.userName + ' / ' + d.count, d.countSum);
            break;
            
        case 'onGift': // ギフトの受信
            console.log(d.cmd, d.userName + ' / ' + d.giftId, d.count);
            giftDraw(d.giftId, d.count, d.userName);
            break;
            
        case 'onChat': // チャットの受信
            console.log(d.cmd, d.userName, d.msg);
            chatDraw(d.msg, d.userName, d.userImg);
            break;
            
        case 'onUserCount': // 同時接続者数の通知
            console.log(d.cmd, d.userCount);
            break;
            
        case 'onActivity': // ランキングなどの情報
            break;
            
        case 'runCmdNotify': // その他の通知
            if(d.runCmd == 'on_host_followed'){ // フォロー通知
                console.log(d.runCmd, d.runBody.user_name);
                let followedUserName = d.runBody.user_name;
                if(!followedUserName) followedUserName = 'guest'
                followDraw(followedUserName);
            } else console.log(d);
            break;
            
        default:
            console.log(d);
            break;
    }
}

let onError = (e) => {
    console.log('ERROR:' + e.data);
    ws.close();
}

let doSend = (m) => {
    ws.send(m);
}




