if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/chessendgametraining/sw.js', { scope: '/chessendgametraining/' })})}