/////////////////////////////////////////////////////////
////////////            宣言                  ///////////
////////////////////////////////////////////////////////

const drawArea = $('.drawArea');

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
    
    drawArea.append('<div class="chat gift">'+senderName+'さんが'+giftName+'('+giftPrice+')を贈りました。x'+count+'</div>');
    pageScroll();
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
    pageScroll();
}

let noticeDraw = (text, type) => {
    let insertTag = '<div class="chat comment notice '+type+'">';
    if(type != 'debug') insertTag += '<div class="chat comment notice '+type+'"><img src="assets/mildom_logo.png" class="iconSize"> ';
    insertTag += text+'</div>';
    
    drawArea.append(insertTag);
    pageScroll();
}

let onAddDraw = (name) => {
    noticeDraw(name+'さんが入室しました。', 'onAdd');
}

let followDraw = (name) => {
    noticeDraw(name+'さんがフォローしました。', 'follow');
}

let pageScroll = () => {
    window.scrollTo(0, document.body.scrollHeight);
}

/////////////////////////////////////////////////////////
////////////            メイン処理            ////////////
////////////////////////////////////////////////////////

$(document).ready(function () {
    
});

