var Main = (function() {

	var _eventLocker,
		_init = function() {
			var lockElm, testElm, helpElm;

			// イベントロッカー初期化('click'イベントを対象とする)
			_eventLocker = new EventLocker({ events: ['click'] });

			// ロックボタン
			lockElm = document.getElementById('lock_button');
			lockElm.addEventListener('click', function(e) {
				_eventLocker.lock(); // イベントロック
				_log('lock'); 
				setTimeout(function() { 
					_eventLocker.unlock(); // イベントアンロック
					_log('unlock'); 
				}, 5000);
			}, false);

			// テストボタン
			testElm = document.getElementById('test_button');
			testElm.addEventListener('click', function(e) {
				_log('test');
			}, false);

			// ヘルプボタン
			helpElm = document.getElementById('help_button');
			helpElm.addEventListener('click', function(e) {
				var text = 'まずtestボタンを押してください。\n'
						 + 'event logにtestと表示されます。\n\n'
						 + '次にlock 5 secondボタンを押してください。\n'
						 + '5秒間testボタンを押してもevent logもtestと表示されなくなります。';
				alert(text);
			}, false);
		},

		_log = function(contents) {
			var textElm = document.getElementById('log_textarea');
			textElm.innerHTML = contents + '\n' + textElm.innerHTML;
		};

	return {
		init: _init
	};
}());