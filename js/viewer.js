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
    
    drawArea.append('<div class="chat gift">'+senderName+'さんが'+giftName+'を贈りました。x'+count+'</div>');
        window.scrollTo(0, document.body.scrollHeight);
    /*
    
    if(giftNoticeFeederMode) renderText.unshift({'text': senderName+'さんが'+giftName+'を贈りました。x'+count, 'type': 'gift'});
    if(!giftNoticeMode) return;
    if(giftNoticeSound) $('#soundGift').get(0).play();
    if(giftCategory == 3) count *= 15;
    
    [...Array(count)].map(() => { // 指定回数繰り返し
        let randId = 'gift'+randText('Int', 8);
        let randWidth = Math.random() * 1800;
        let randHeight = -(Math.random() * 500 + 50);
        let giftSpeedFix = giftSpeed + (Math.random() * 2500);
        
        let insertTag = '<img src="'+giftUrl+'" id="'+randId+'" class="gift" style="top: '+randHeight+'px; left: '+randWidth+'px;">';
        $('.giftArea').append(insertTag);

        $('#'+randId).css('display','block');
        $('#'+randId).animate({ top: 975 }, giftSpeedFix, 'swing', function () {
            $('#'+randId).animate({ top: 975 }, 3000, 'swing', function () {
                $('#'+randId).remove();
            });
        });
    })
    */
    
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
    window.scrollTo(0, document.body.scrollHeight);
}

let requestTextillate = (d) => {
    let insertTag = '<div class="chat comment notice"><img src="assets/mildom_logo.png" class="iconSize"> '+d.text+'</div>';
    drawArea.append(insertTag);
    window.scrollTo(0, document.body.scrollHeight);
}

let checkFunc = () => {    
    if(renderText.length){
        requestTextillate(renderText[0]);
        renderText.splice(0,1);
    }
}

/////////////////////////////////////////////////////////
////////////            メイン処理            ////////////
////////////////////////////////////////////////////////

$(document).ready(function () {
    mainLoop = setInterval(checkFunc, 500);
});

