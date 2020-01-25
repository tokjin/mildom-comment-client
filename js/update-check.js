let getGitRepos = () => {
     ajaxGitRepos().done(function (res) {
        let latestVer = res[0].tag_name;
        if(latestVer != currentVer) {
            noticeDraw('コメントビューアのアップデートが見つかりました。('+currentVer+'->'+latestVer+')', 'info');
            noticeDraw('最新バージョンは<a href="https://github.com/tokjin/mildom-comment-client/releases/tag/v1.1.1">こちら</a>からダウンロードできます。', 'info');
        }
    }).fail(function (res) { console.log('getGitRepos failed'); });
}

let ajaxGitRepos = () => {
    let url = 'https://api.github.com/repos/tokjin/mildom-comment-client/releases';
    return $.ajax({ url: url, type: 'GET' });
}

getGitRepos();