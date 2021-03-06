let roomId = 10176526;        // Mildomの部屋ID（URLの最後の数字）

const chatNoticeMode = true;    // コメントを表示するかどうか
const chatInUserName = false;    // 流れるコメントに@名前を含める(含めない場合はfalse)
const chatSpeed = 7000;         // コメントが流れる速度（少ないほど早い）
const chatLengthMax = 30;       // コメントの最大表示文字数

const giftNoticeMode = true;        // ギフトを画面に出すかどうか
const giftNoticeFeederMode = true;  // ギフトが来た時に画面下に速報を出すかどうか
const giftSpeed = 5000;             // ギフトが落ちる速度（少ないほど早い）
const giftNoticeSound = true;       // ギフトが来た時にサウンドを再生していいか

const followerNoticeMode = true;    // フォロー通知を出すかどうか
const followerNoticeSound = true;   // フォロー通知の際にサウンドを再生していいか

const onAddNoticeMode = false;      // 入室の通知を出すかどうか
const userIcon = true;              // ビュワーでユーザーのアイコンを表示するかどうか

const speechMode = false;           // ビュワーで読み上げを有効にするか
const currentVer = 'v1.2.2';

// レイアウトやデザインはcssファイルを編集して下さい。
// 通知音を変えたい場合はhtmlファイルを編集して下さい。