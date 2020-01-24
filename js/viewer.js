/////////////////////////////////////////////////////////
////////////            宣言と初期化            ///////////
////////////////////////////////////////////////////////

const drawArea = $('.drawArea');
let chkbxScrollStatus, chkbxSpeakStatus, chkbxOnAddStatus, chkbxFollowStatus, chkbxGiftStatus, chkbxCommentStatus;

if(chatNoticeMode){
    $('#chkComment').prop('checked', true);
    chkbxCommentStatus = true;
}
if(giftNoticeMode){
    $('#chkGift').prop('checked', true);
    chkbxGiftStatus = true;
}
if(followerNoticeMode){
    $('#chkFollow').prop('checked', true);
    chkbxFollowStatus = true;
}
if(onAddNoticeMode){
    $('#chkOnAdd').prop('checked', true);
    chkbxOnAddStatus = true;
}
if(speechMode){
    $('#chkSpeak').prop('checked', true);
    chkbxSpeakStatus = true;
}

$('.inputRoomId').val(roomId);

/////////////////////////////////////////////////////////
////////////            function             ////////////
////////////////////////////////////////////////////////

let giftDraw = (giftId, count, senderName) => {
    let giftName = 'unknown gift name';
    let giftPrice = 0;
    let giftUrl = 'https://';
    let giftCategory = 1;
    if(!count) count = 1;
    
    giftList.forEach(function(val){
        if(giftId == val.gift_id){
            giftName = val.name;
            giftPrice = val.price;
            giftUrl = val.pic;
            giftCategory = val.category;
        }
    });
    
    drawArea.append('<div class="chat gift">'+senderName+'さんが'+giftName+'('+giftPrice+'pt)を贈りました。x'+count+'</div>');
    speechText(senderName+'さんが'+giftName+'を贈りました。', 'gift');
    statusCheck();
}

let chatDraw = (text, name, img) => {
    let stickerPattern = /\[\/[+-]?\d+\]/g;
    let hitText = text.match(stickerPattern);
    
    if(hitText){
        hitText.forEach(function(v){
            stickerList.forEach(function(val){
                let targetText = '[/'+val.id+']';
                text = text.replace(targetText, '<img src="https://vpic.mildom.com/download/file/'+val.pic+'" class="iconSize">');
            });
        })
    }
    let insertTag = '';
    if(userIcon) insertTag = '<div class="chat comment"><div id="name"><img src="'+img+'" class="iconSize"> '+name+'</div><div id="text">'+text+'</div></div>';
    else insertTag = '<div class="chat comment"><div id="name">'+name+'</div><div id="text">'+text+'</div></div>';
    
    drawArea.append(insertTag);
    speechText(text, 'comment');
    statusCheck();
}

let noticeDraw = (text, type) => {
    let insertTag = '<div class="chat notice '+type+'">';
    if(type != 'debug') insertTag += '<img src="https://www.mildom.com/assets/mildom_logo.png" class="iconSize"> ';
    insertTag += text+'</div>';
    
    drawArea.append(insertTag);
    speechText(text, type);
    statusCheck();
}

let onAddDraw = (name) => {
    noticeDraw(name+'さんが入室しました。', 'onAdd');
}

let followDraw = (name) => {
    noticeDraw(name+'さんがフォローしました。', 'follow');
}

let statusCheck = () => {
    if(!chkbxCommentStatus) $('.comment').css('display', 'none');
    if(!chkbxGiftStatus) $('.gift').css('display', 'none');
    if(!chkbxFollowStatus) $('.follow').css('display', 'none');
    if(!chkbxOnAddStatus) $('.onAdd').css('display', 'none');
    if(chkbxScrollStatus) window.scrollTo(0, document.body.scrollHeight);
}

let speechText = (text, type) => {
    if(!chkbxSpeakStatus) return;
    switch(type){
        case 'comment':
            if(!chkbxCommentStatus) return;
            break;
        
        case 'gift':
            if(!chkbxGiftStatus) return;
            break;
        
        case 'follow':
            if(!chkbxFollowStatus) return;
            break;
        
        case 'onAdd':
            if(!chkbxOnAddStatus) return;
            break;
    }
    
    let ssu = new SpeechSynthesisUtterance(text);
    ssu.lang = 'ja-JP';
    ssu.rate = 1.5;
    ssu.pitch = 1.3;
    speechSynthesis.speak(ssu);
}

/////////////////////////////////////////////////////////
////////////            メイン処理            ////////////
////////////////////////////////////////////////////////

$(document).ready(function () {
    
});

/////////////////////////////////////////////////////////
////////////            トリガー              ////////////
////////////////////////////////////////////////////////

$('#startBtn').on('click', () => {
    let inputRoomId = $('.inputRoomId').val();
    wsConnect(inputRoomId);
    $('#startBtn').css('display', 'none');
    $('#stopBtn').css('display', 'inline-block');
});

$('#stopBtn').on('click', () => {
    wsDisconnect();
    $('#stopBtn').css('display', 'none');
    $('#startBtn').css('display', 'inline-block');
});

$('.adArea').on('click', () => {
    $('.adArea').remove();
})

$('#chkComment').on('change', () => {
    chkbxCommentStatus = $('#chkComment').prop('checked');
    if (chkbxCommentStatus) $('.comment').css('display', 'block');
    else $('.comment').css('display', 'none');
});

$('#chkGift').on('change', () => {
    chkbxGiftStatus = $('#chkGift').prop('checked');
    if (chkbxGiftStatus) $('.gift').css('display', 'block');
    else $('.gift').css('display', 'none');
});

$('#chkFollow').on('change', () => {
    chkbxFollowStatus = $('#chkFollow').prop('checked');
    if (chkbxFollowStatus) $('.follow').css('display', 'block');
    else $('.follow').css('display', 'none');
});

$('#chkOnAdd').on('change', () => {
    chkbxOnAddStatus = $('#chkOnAdd').prop('checked');
    if (chkbxOnAddStatus) $('.onAdd').css('display', 'block');
    else $('.onAdd').css('display', 'none');
});

$('#chkSpeak').on('change', () => {
    chkbxSpeakStatus = $('#chkSpeak').prop('checked');
});

$('#chkScroll').on('change', () => {
    chkbxScrollStatus = $('#chkScroll').prop('checked');
});

