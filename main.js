// APIキーを設定
const API_KEY = 'AIzaSyBQMUAntN0JBn5wycbXd9Wy2uMQOq-EqnI';

// エンドポイントURLを設定
const ENDPOINT_URL = 'https://www.googleapis.com/youtube/v3/search';
const searchBox = document.getElementById('search-box');
const results = document.getElementById('results');

searchBox.addEventListener('change', (event) => {
  const query = event.target.value;

  // APIリクエストを作成
  const request = `${ENDPOINT_URL}?part=snippet&q=${query}&type=video&key=${API_KEY}`;

  // APIリクエストを送信
  fetch(request)
    .then(response => response.json())
    .then(data => {
      const items = data.items;
      renderResults(items);
    });
});
function renderResults(items) {
  results.innerHTML = '';

  items.forEach(item => {
   // 動画タイトルと説明を取得
    const title = item.snippet.title;
    const description = item.snippet.description;

    // 動画IDを取得
    const videoId = item.id.videoId;

    // 動画サムネイルのURLを取得
    const thumbnailUrl = item.snippet.thumbnails.medium.url;

    // 動画のダウンロードリンクを作成
    const downloadLink = `<a href="https://www.youtube.com/watch?v=${videoId}&feature=youtu.be" download>${title}</a>`;

    // HTMLを作成
    const html = `
      <div>
        <img src="${thumbnailUrl}">
        <div>
          <h2>${downloadLink}</h2>
          <p>${description}</p>
          <div id="player-${videoId}"></div>
        </div>
      </div>
    `;

    results.insertAdjacentHTML('beforeend', html);

    // YouTube Player APIの読み込み
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 動画再生用の関数
    let player;
    window.onYouTubeIframeAPIReady = function() {
      player = new YT.Player(`player-${videoId}`, {
        height: '360',
        width: '640',
        videoId: videoId
      });
    }
  });
}
