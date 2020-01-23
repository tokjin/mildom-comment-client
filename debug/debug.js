console.log = function() {
    let logText = '';
    let d = new Date();
    let month = parseInt(d.getMonth())+1;
    logText = '['+d.getFullYear()+'/'+month+'/'+d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds()+'] ';
    
    for(var i = 0; i < arguments.length; ++i){
        logText += JSON.stringify(arguments[i])+', ';
    }

    noticeDraw(logText, 'debug')
}
