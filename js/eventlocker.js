// イベントロック用コンストラクタ
var EventLocker = (function() {

    var _DEFAULT_EVENTS = [ 'click', 'dblclick', 'mousemove', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'wheel', 'keydown', 'keypress', 'keyup' ],
        _stopEvent = function(e) { e.stopPropagation(); }, // イベント伝播ストップ
        _locked = false,
        _EventLocker;

    //////////////////////////
    // コンストラクタ
    //////////////////////////
    _EventLocker = function(arg) {
        arg = arg || { delegator: document, events: _DEFAULT_EVENTS };
        arg.delegator = arg.delegator || document;
        arg.events = arg.events || _DEFAULT_EVENTS;
        this.delegator = arg.delegator;
        this.events = arg.events;
    };

    /////////////////////////
    // プロトタイプ
    /////////////////////////

    // 登録されているイベントをロックする
    _EventLocker.prototype.lock = function() {
        var elm = this.delegator;
        if(!this._locked) {
            this.events.forEach(function(el) {
                elm.addEventListener(el, _stopEvent, true);
            });
            this._locked = true;
        }
    };

    // 登録されているイベントのロックを解除する
    _EventLocker.prototype.unlock = function() {
        var elm = this.delegator;
        if(this._locked) {
            this.events.forEach(function(el) {
                elm.removeEventListener(el, _stopEvent, true);
            });
            this._locked = false;
        }
    };

    // 登録されているイベントのロックを解除する
    _EventLocker.prototype.isLocked = function() {
        return this._locked;
    };

    return  _EventLocker;

}());
