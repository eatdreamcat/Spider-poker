window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  AudioController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1d6d0OoirhGUovLXt4pSNNX", "AudioController");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HashMap_1 = require("../utils/HashMap");
    var EventManager_1 = require("./EventManager");
    var EventName_1 = require("./EventName");
    var AudioController = function() {
      function AudioController() {
        this.audioID = {};
        this.clips = new HashMap_1.HashMap();
      }
      Object.defineProperty(AudioController, "inst", {
        get: function() {
          return this.ins ? this.ins : this.ins = new AudioController();
        },
        enumerable: true,
        configurable: true
      });
      AudioController.prototype.init = function(callback) {
        console.warn(" start load AudioClip ");
        var self = this;
        cc.loader.loadResDir("preLoadSounds", cc.AudioClip, function(err, clips, urls) {
          if (err) console.error(err); else {
            for (var _i = 0, clips_1 = clips; _i < clips_1.length; _i++) {
              var clip = clips_1[_i];
              self.clips.add(clip.name, clip);
            }
            self.initEvent();
            callback && callback();
          }
        });
      };
      AudioController.prototype.initEvent = function() {
        var _this = this;
        EventManager_1.gEventMgr.targetOff(this);
        this.audioID["bgm"] = this.play("normal_bgm", true, 1.5, true);
        console.log("this.audioID bgm = ", null === this.audioID["bgm"]);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_KILL_EFFECT, function() {
          _this.audioID["fruit_break"] = _this.play("fruit_break", false, 2.5);
          cc.audioEngine.setFinishCallback(_this.audioID["fruit_break"], function() {
            this.audioID["fruit_break"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_30_BGM, function() {
          null != _this.audioID["bgm"] && _this.stop(_this.audioID["bgm"]);
          _this.audioID["time_counting"] = _this.play("time_counting", true, 3);
          _this.audioID["bgm"] = _this.play("bgm_30secs", true, 1.5, true);
          null == _this.audioID["specialA_bgm"] && null == _this.audioID["specialB_bgm"] || cc.audioEngine.pause(_this.audioID["bgm"]);
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.GAME_RESTART, function() {
          null != _this.audioID["bgm"] && _this.stop(_this.audioID["bgm"]);
          null != _this.audioID["time_counting"] && _this.stop(_this.audioID["time_counting"]);
          _this.audioID["bgm"] = _this.play("normal_bgm", true, 1.5, true);
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_BIU, function() {
          _this.audioID["biu"] = _this.play("biu", false, .5);
          cc.audioEngine.setFinishCallback(_this.audioID["biu"], function() {
            this.audioID["biu"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_TOUCH, function() {
          _this.audioID["touch"] = _this.play("touch");
          cc.audioEngine.setFinishCallback(_this.audioID["touch"], function() {
            this.audioID["touch"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_PLACE, function() {
          _this.audioID["lay"] = _this.play("lay");
          cc.audioEngine.setFinishCallback(_this.audioID["lay"], function() {
            this.audioID["lay"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_SPECIAL_A_BGM, function(play) {
          console.log(" SpecialA_bgm:", play);
          if (play) {
            null != _this.audioID["bgm"] && cc.audioEngine.pause(_this.audioID["bgm"]);
            _this.audioID["SpecialA_bgm"] = _this.play("SpecialA_bgm", true);
          } else {
            null != _this.audioID["bgm"] && cc.audioEngine.resume(_this.audioID["bgm"]);
            if (null != _this.audioID["SpecialA_bgm"]) {
              cc.audioEngine.stop(_this.audioID["SpecialA_bgm"]);
              _this.audioID["SpecialA_bgm"] = null;
            }
          }
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_SPECIAL_B_BGM, function(play) {
          console.log(" SpecialB_bgm:", play);
          if (play) {
            null != _this.audioID["bgm"] && cc.audioEngine.pause(_this.audioID["bgm"]);
            _this.audioID["SpecialB_bgm"] = _this.play("SpecialB_bgm", true);
          } else {
            null != _this.audioID["bgm"] && cc.audioEngine.resume(_this.audioID["bgm"]);
            if (null != _this.audioID["SpecialB_bgm"]) {
              cc.audioEngine.stop(_this.audioID["SpecialB_bgm"]);
              _this.audioID["SpecialB_bgm"] = null;
            }
          }
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_OVER, function() {
          null != _this.audioID["time_counting"] && _this.stop(_this.audioID["time_counting"]);
          _this.audioID["over"] = _this.play("over");
          cc.audioEngine.setFinishCallback(_this.audioID["over"], function() {
            this.audioID["over"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_OVER_NO_PLACE, function() {
          null != _this.audioID["bgm"] && _this.stop(_this.audioID["bgm"]);
          _this.audioID["over_no_place"] = _this.play("over_no_place");
          cc.audioEngine.setFinishCallback(_this.audioID["over_no_place"], function() {
            this.audioID["over_no_place"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_LAY_FAIL, function() {
          _this.audioID["lay_fail"] = _this.play("lay_fail");
          cc.audioEngine.setFinishCallback(_this.audioID["lay_fail"], function() {
            this.audioID["lay_fail"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_OVER_TIME_UP, function() {
          null != _this.audioID["bgm"] && _this.stop(_this.audioID["bgm"]);
          _this.audioID["frezon"] = _this.play("frezon");
          cc.audioEngine.setFinishCallback(_this.audioID["frezon"], function() {
            this.audioID["frezon"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_OVER_TAB, function() {
          _this.audioID["over_biu"] = _this.play("over_biu");
          cc.audioEngine.setFinishCallback(_this.audioID["over_biu"], function() {
            this.audioID["over_biu"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_SCORE, function(isPlay) {
          if (isPlay) _this.audioID["score"] = _this.play("score", true, 1); else if (null != _this.audioID["score"]) {
            _this.stop(_this.audioID["score"]);
            _this.audioID["score"] = null;
          }
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_SPECIAL_A, function() {
          console.log(" specialA -----------------------------", _this.audioID["specialA"]);
          _this.audioID["specialA"] = _this.play("specialA", false, 1.5);
          cc.audioEngine.setFinishCallback(_this.audioID["specialA"], function() {
            this.audioID["specialA"] = null;
          }.bind(_this));
        }, this);
        EventManager_1.gEventMgr.on(EventName_1.GlobalEvent.PLAY_SPECIAL_B, function() {
          console.log(" specialB -----------------------------", _this.audioID["specialB"]);
          _this.audioID["specialB"] = _this.play("specialB", false, 1.5);
          cc.audioEngine.setFinishCallback(_this.audioID["specialB"], function() {
            this.audioID["specialB"] = null;
          }.bind(_this));
        }, this);
      };
      AudioController.prototype.stop = function(audioID, clipName) {
        if (AudioController.canPlay) cc.audioEngine.stop(audioID); else for (var _i = 0, _a = AudioController.PlayedList; _i < _a.length; _i++) {
          var clipItem = _a[_i];
          clipItem.skip = clipItem.clipName == clipName;
        }
      };
      AudioController.prototype.play = function(clipName, loop, volume, isBgm, timePass) {
        var _this = this;
        void 0 === loop && (loop = false);
        void 0 === volume && (volume = 1);
        void 0 === isBgm && (isBgm = false);
        void 0 === timePass && (timePass = 0);
        if (!AudioController.canPlay && !AudioController.hasBindTouch) {
          AudioController.hasBindTouch = true;
          var self_1 = this;
          var playFunc_1 = function() {
            cc.game.canvas.removeEventListener("touchstart", playFunc_1);
            AudioController.canPlay = true;
            var item;
            while ((item = AudioController.PlayedList.pop()) && self_1.clips.get(item.clipName) && !item.skip) {
              var audioID = cc.audioEngine.play(self_1.clips.get(item.clipName), item.loop, item.volume);
              if (item.isBgm) {
                self_1.audioID["bgm"] = audioID;
                cc.audioEngine.setCurrentTime(audioID, (Date.now() - item.supTime) / 1e3 % cc.audioEngine.getDuration(audioID));
              } else cc.audioEngine.setCurrentTime(audioID, (Date.now() - item.supTime) / 1e3);
            }
          };
          cc.game.canvas.addEventListener("touchstart", playFunc_1);
        }
        if (!this.clips.get(clipName)) {
          var now_1 = Date.now();
          cc.loader.loadRes("sounds/" + clipName, cc.AudioClip, function(err, clip) {
            if (err) console.error(err); else {
              _this.clips.add(clip.name, clip);
              var pass = (Date.now() - now_1) / 1e3;
              _this.audioID[clipName] = _this.play(clipName, loop, volume, isBgm, pass);
            }
          });
          return -1;
        }
        if (AudioController.canPlay) {
          var audioID = cc.audioEngine.play(this.clips.get(clipName), loop, volume);
          cc.audioEngine.setCurrentTime(audioID, timePass % cc.audioEngine.getDuration(audioID));
          return audioID;
        }
        AudioController.PlayedList.push({
          clipName: clipName,
          loop: loop,
          volume: volume,
          supTime: Date.now() - timePass / 1e3,
          skip: false,
          isBgm: isBgm
        });
        return -2;
      };
      AudioController.PlayedList = [];
      AudioController.canPlay = cc.sys.os.toLowerCase() != cc.sys.OS_IOS.toLowerCase();
      AudioController.hasBindTouch = false;
      return AudioController;
    }();
    exports.gAudio = AudioController.inst;
    cc._RF.pop();
  }, {
    "../utils/HashMap": "HashMap",
    "./EventManager": "EventManager",
    "./EventName": "EventName"
  } ],
  EventManager: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "15a47pj/bZLz4bw5c1lt4L9", "EventManager");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventManager = function() {
      function EventManager() {
        this.eventTarget = new cc.EventTarget();
      }
      Object.defineProperty(EventManager, "inst", {
        get: function() {
          return this.ins ? this.ins : this.ins = new EventManager();
        },
        enumerable: true,
        configurable: true
      });
      EventManager.prototype.emit = function(type, arg1, arg2, arg3, arg4, arg5) {
        this.eventTarget.emit(type.toString(), arg1, arg2, arg3, arg4, arg5);
      };
      EventManager.prototype.on = function(type, callback, target, useCapture) {
        return this.eventTarget.on(type.toString(), callback, target, useCapture);
      };
      EventManager.prototype.once = function(type, callback, target) {
        this.eventTarget.once(type.toString(), callback, target);
      };
      EventManager.prototype.dispatchEvent = function(event) {
        this.eventTarget.dispatchEvent(event);
      };
      EventManager.prototype.off = function(type, callback, target) {
        this.eventTarget.off(type.toString(), callback, target);
      };
      EventManager.prototype.hasEventListener = function(type) {
        return this.eventTarget.hasEventListener(type.toString());
      };
      EventManager.prototype.targetOff = function(target) {
        this.eventTarget.targetOff(target);
      };
      return EventManager;
    }();
    exports.gEventMgr = EventManager.inst;
    cc._RF.pop();
  }, {} ],
  EventName: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bf67a7QRNNGpo1qJkcJdq4+", "EventName");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GlobalEvent;
    (function(GlobalEvent) {
      GlobalEvent[GlobalEvent["Cube_ADJUST_DONE"] = 0] = "Cube_ADJUST_DONE";
      GlobalEvent[GlobalEvent["DRAG_ADJUST_DONE"] = 1] = "DRAG_ADJUST_DONE";
      GlobalEvent[GlobalEvent["CUBE_BOX_DRAGING"] = 2] = "CUBE_BOX_DRAGING";
      GlobalEvent[GlobalEvent["CUBE_BOX_DRAG_INDEX"] = 3] = "CUBE_BOX_DRAG_INDEX";
      GlobalEvent[GlobalEvent["CUBE_BOX_DRAG_CANCEL"] = 4] = "CUBE_BOX_DRAG_CANCEL";
      GlobalEvent[GlobalEvent["CUBE_BOX_PLACE_DONE"] = 5] = "CUBE_BOX_PLACE_DONE";
      GlobalEvent[GlobalEvent["CUBE_BOX_SET_STATE_DONE"] = 6] = "CUBE_BOX_SET_STATE_DONE";
      GlobalEvent[GlobalEvent["GAME_START"] = 7] = "GAME_START";
      GlobalEvent[GlobalEvent["GAME_RESTART"] = 8] = "GAME_RESTART";
      GlobalEvent[GlobalEvent["EAT_COL"] = 9] = "EAT_COL";
      GlobalEvent[GlobalEvent["EAT_ROW"] = 10] = "EAT_ROW";
      GlobalEvent[GlobalEvent["KILL_DIRECTLY"] = 11] = "KILL_DIRECTLY";
      GlobalEvent[GlobalEvent["UPDATE_SCORE"] = 12] = "UPDATE_SCORE";
      GlobalEvent[GlobalEvent["UPDATE_COMBO"] = 13] = "UPDATE_COMBO";
      GlobalEvent[GlobalEvent["GAME_OVER"] = 14] = "GAME_OVER";
      GlobalEvent[GlobalEvent["ON_KILL"] = 15] = "ON_KILL";
      GlobalEvent[GlobalEvent["ROW_EFFECT"] = 16] = "ROW_EFFECT";
      GlobalEvent[GlobalEvent["COL_EFFECT"] = 17] = "COL_EFFECT";
      GlobalEvent[GlobalEvent["SHOW_TEXT"] = 18] = "SHOW_TEXT";
      GlobalEvent[GlobalEvent["UPDATE_PRE_SCORE"] = 19] = "UPDATE_PRE_SCORE";
      GlobalEvent[GlobalEvent["SHOW_OVER_LAYER"] = 20] = "SHOW_OVER_LAYER";
      GlobalEvent[GlobalEvent["CLEAR_CUBE_ROOT"] = 21] = "CLEAR_CUBE_ROOT";
      GlobalEvent[GlobalEvent["PREPARE_CUBE_BG"] = 22] = "PREPARE_CUBE_BG";
      GlobalEvent[GlobalEvent["PLAY_RAINBOW_EFFECT"] = 23] = "PLAY_RAINBOW_EFFECT";
      GlobalEvent[GlobalEvent["UPDATE_RAINBOW_SCORE"] = 24] = "UPDATE_RAINBOW_SCORE";
      GlobalEvent[GlobalEvent["PLAY_KILL_EFFECT"] = 25] = "PLAY_KILL_EFFECT";
      GlobalEvent[GlobalEvent["PLAY_30_BGM"] = 26] = "PLAY_30_BGM";
      GlobalEvent[GlobalEvent["PLAY_LETSGO"] = 27] = "PLAY_LETSGO";
      GlobalEvent[GlobalEvent["PLAY_BIU"] = 28] = "PLAY_BIU";
      GlobalEvent[GlobalEvent["PLAY_TOUCH"] = 29] = "PLAY_TOUCH";
      GlobalEvent[GlobalEvent["PLAY_PLACE"] = 30] = "PLAY_PLACE";
      GlobalEvent[GlobalEvent["PLAY_TEXT"] = 31] = "PLAY_TEXT";
      GlobalEvent[GlobalEvent["PLAY_SCORE"] = 32] = "PLAY_SCORE";
      GlobalEvent[GlobalEvent["PLAY_OVER"] = 33] = "PLAY_OVER";
      GlobalEvent[GlobalEvent["PLAY_SPECIAL_A"] = 34] = "PLAY_SPECIAL_A";
      GlobalEvent[GlobalEvent["PLAY_SPECIAL_B"] = 35] = "PLAY_SPECIAL_B";
      GlobalEvent[GlobalEvent["PLAY_OVER_NO_PLACE"] = 36] = "PLAY_OVER_NO_PLACE";
      GlobalEvent[GlobalEvent["PLAY_OVER_TIME_UP"] = 37] = "PLAY_OVER_TIME_UP";
      GlobalEvent[GlobalEvent["PLAY_OVER_TAB"] = 38] = "PLAY_OVER_TAB";
      GlobalEvent[GlobalEvent["PLAY_LAY_FAIL"] = 39] = "PLAY_LAY_FAIL";
      GlobalEvent[GlobalEvent["PLAY_SPECIAL_B_BGM"] = 40] = "PLAY_SPECIAL_B_BGM";
      GlobalEvent[GlobalEvent["PLAY_SPECIAL_A_BGM"] = 41] = "PLAY_SPECIAL_A_BGM";
    })(GlobalEvent = exports.GlobalEvent || (exports.GlobalEvent = {}));
    cc._RF.pop();
  }, {} ],
  GameFactory: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "44968IEriNJurc3wbMrKqft", "GameFactory");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HashMap_1 = require("../utils/HashMap");
    var ObjPool = function() {
      function ObjPool(template, initSize, poolHandlerComps) {
        this._pool = [];
        this.poolHandlerComps = [];
        this.poolHandlerComps = poolHandlerComps;
        this.template = template;
        this.initPool(initSize);
      }
      ObjPool.prototype.initPool = function(size) {
        for (var i = 0; i < size; ++i) {
          var newNode = cc.instantiate(this.template);
          this.put(newNode);
        }
      };
      ObjPool.prototype.size = function() {
        return this._pool.length;
      };
      ObjPool.prototype.clear = function() {
        var count = this._pool.length;
        for (var i = 0; i < count; ++i) this._pool[i].destroy && this._pool[i].destroy();
        this._pool.length = 0;
      };
      ObjPool.prototype.put = function(obj) {
        if (obj && -1 === this._pool.indexOf(obj)) {
          obj.removeFromParent(false);
          if (this.poolHandlerComps) {
            var handlers = this.poolHandlerComps;
            for (var _i = 0, handlers_1 = handlers; _i < handlers_1.length; _i++) {
              var handler = handlers_1[_i];
              var comp = obj.getComponent(handler);
              comp && comp.unuse && comp.unuse.apply(comp);
            }
          } else {
            var handlers = obj.getComponents(cc.Component);
            for (var _a = 0, handlers_2 = handlers; _a < handlers_2.length; _a++) {
              var handler = handlers_2[_a];
              handler && handler.unuse && handler.unuse.apply(handler);
            }
          }
          this._pool.push(obj);
        }
      };
      ObjPool.prototype.get = function() {
        var _ = [];
        for (var _i = 0; _i < arguments.length; _i++) _[_i] = arguments[_i];
        var last = this._pool.length - 1;
        if (last < 0) {
          console.warn(" last < 0 ");
          this.initPool(1);
        }
        last = this._pool.length - 1;
        var obj = this._pool[last];
        this._pool.length = last;
        if (this.poolHandlerComps) {
          var handlers = this.poolHandlerComps;
          for (var _a = 0, handlers_3 = handlers; _a < handlers_3.length; _a++) {
            var handler = handlers_3[_a];
            var comp = obj.getComponent(handler);
            comp && comp.reuse && comp.reuse.apply(comp, arguments);
          }
        } else {
          var handlers = obj.getComponents(cc.Component);
          for (var _b = 0, handlers_4 = handlers; _b < handlers_4.length; _b++) {
            var handler = handlers_4[_b];
            handler && handler.reuse && handler.reuse.apply(handler, arguments);
          }
        }
        return obj;
      };
      return ObjPool;
    }();
    var Step;
    (function(Step) {
      Step[Step["INIT"] = 0] = "INIT";
      Step[Step["POKER"] = 4] = "POKER";
      Step[Step["DONE"] = 4] = "DONE";
    })(Step || (Step = {}));
    var GameFactory = function() {
      function GameFactory() {
        this.step = Step.INIT;
        this.PokerPool = new HashMap_1.HashMap();
      }
      Object.defineProperty(GameFactory, "inst", {
        get: function() {
          return this.ins ? this.ins : this.ins = new GameFactory();
        },
        enumerable: true,
        configurable: true
      });
      GameFactory.prototype.init = function(callback, poker) {
        this.doneCallback = callback;
        this.initPoker(300, poker);
      };
      GameFactory.prototype.nextStep = function(step) {
        this.step |= step;
        console.log("Factory Step:" + Step[step]);
        this.step >= Step.DONE && this.doneCallback && this.doneCallback();
      };
      GameFactory.prototype.initPoker = function(initCount, prefab) {
        var self = this;
        if (prefab) {
          self.PokerPool.add("Poker", new ObjPool(prefab, initCount));
          self.nextStep(Step.POKER);
        } else cc.loader.loadRes("prefabs/poker", cc.Prefab, function(err, prefabRes) {
          if (err) console.error(err); else {
            self.PokerPool.add("Poker", new ObjPool(prefabRes, initCount));
            self.nextStep(Step.POKER);
          }
        });
      };
      GameFactory.prototype.getPoker = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        return this.PokerPool.get("Poker").get(args);
      };
      GameFactory.prototype.putPoker = function(poker) {
        this.PokerPool.get("Poker").put(poker);
      };
      return GameFactory;
    }();
    exports.gFactory = GameFactory.inst;
    cc._RF.pop();
  }, {
    "../utils/HashMap": "HashMap"
  } ],
  GameScene: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e1b90/rohdEk4SdmmEZANaD", "GameScene");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameFactory_1 = require("./controller/GameFactory");
    var Game_1 = require("./controller/Game");
    var Poker_1 = require("./Poker");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var celerx = require("./utils/celerx");
    var LOAD_STEP;
    (function(LOAD_STEP) {
      LOAD_STEP[LOAD_STEP["READY"] = 0] = "READY";
      LOAD_STEP[LOAD_STEP["PREFABS"] = 2] = "PREFABS";
      LOAD_STEP[LOAD_STEP["AUDIO"] = 16] = "AUDIO";
      LOAD_STEP[LOAD_STEP["CELER"] = 32] = "CELER";
      LOAD_STEP[LOAD_STEP["GUIDE"] = 64] = "GUIDE";
      LOAD_STEP[LOAD_STEP["DONE"] = 98] = "DONE";
    })(LOAD_STEP = exports.LOAD_STEP || (exports.LOAD_STEP = {}));
    var GameScene = function(_super) {
      __extends(GameScene, _super);
      function GameScene() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.Poker = null;
        _this.PokerClip = null;
        _this.PlaceRoot = null;
        _this.PokerDevl = null;
        _this.RemoveNode = null;
        _this.BackButton = null;
        _this.step = LOAD_STEP.READY;
        _this.canDispatchPoker = false;
        _this.dispatchCardCount = 38;
        return _this;
      }
      GameScene.prototype.onLoad = function() {
        Game_1.Game.removeNode = this.RemoveNode;
        celerx.ready();
        CMath.randomSeed = Math.random();
        var self = this;
        celerx.onStart(function() {
          self.celerStart();
        }.bind(this));
        true, this.celerStart();
        GameFactory_1.gFactory.init(function() {
          this.nextStep(LOAD_STEP.PREFABS);
        }.bind(this), this.Poker);
        for (var _i = 0, _a = this.PlaceRoot.children; _i < _a.length; _i++) {
          var child = _a[_i];
          Game_1.Game.placePokerRoot.add(parseInt(child.name), child);
        }
        this.nextStep(LOAD_STEP.GUIDE);
        this.PokerClip.on(cc.Node.EventType.TOUCH_START, this.dispatchPoker, this);
        this.BackButton.node.on(cc.Node.EventType.TOUCH_START, Game_1.Game.backStep, Game_1.Game);
      };
      GameScene.prototype.celerStart = function() {
        var match = celerx.getMatch();
        if (match && match.sharedRandomSeed) {
          CMath.randomSeed = match.sharedRandomSeed;
          CMath.sharedSeed = match.sharedRandomSeed;
        } else CMath.randomSeed = Math.random();
        this.nextStep(LOAD_STEP.CELER);
        match && match.shouldLaunchTutorial || true;
      };
      GameScene.prototype.nextStep = function(loadStep) {
        this.step |= loadStep;
        console.log("CUR STEP:" + LOAD_STEP[loadStep] + ", total: " + this.step);
        this.step >= LOAD_STEP.DONE && this.startGame();
      };
      GameScene.prototype.startGame = function() {
        var _this = this;
        for (var j = 0; j < 6; j++) {
          var pokerNum = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13 ];
          while (pokerNum.length > 0) {
            var i = pokerNum.splice(Math.floor(CMath.getRandom() * pokerNum.length), 1);
            var pokerNode = GameFactory_1.gFactory.getPoker(i);
            pokerNode.name = this.PokerDevl.childrenCount.toString();
            pokerNode.x = 0;
            pokerNode.y = .3 * -this.PokerDevl.childrenCount;
            this.PokerDevl.addChild(pokerNode);
          }
        }
        var count = 0;
        var totalCount = this.PokerDevl.childrenCount;
        var func2 = function() {
          var pokerNode = _this.PokerDevl.getChildByName((totalCount - count++ - 1).toString());
          if (!pokerNode) {
            console.log(_this.PokerDevl.children);
            _this.canDispatchPoker = true;
            return;
          }
          var targetPos = cc.v2(0, 0);
          if (_this.PokerClip.childrenCount > 0) {
            var child = _this.PokerClip.children[_this.PokerClip.childrenCount - 1];
            targetPos = cc.v2(child.x - 20, child.y);
          }
          var selfPos = _this.PokerClip.convertToNodeSpaceAR(pokerNode.parent.parent.convertToWorldSpaceAR(pokerNode.position));
          var poker_1 = pokerNode.getComponent(Poker_1.default);
          pokerNode.setParent(_this.PokerClip);
          pokerNode.setPosition(selfPos);
          pokerNode.group = "top";
          pokerNode.runAction(cc.sequence(cc.moveTo(.1, targetPos.x, targetPos.y), cc.callFunc(function() {
            pokerNode.group = "default";
            poker_1.setLastPosition();
            func2();
          }, _this)));
        };
        var func1 = function() {
          if (count >= _this.dispatchCardCount) {
            func2();
            return;
          }
          var pos = count++ % 8;
          var pokerNode = _this.PokerDevl.getChildByName((totalCount - count).toString());
          var targetNode = Game_1.Game.placePokerRoot.get(pos);
          if (targetNode) {
            var selfPos = targetNode.convertToNodeSpaceAR(pokerNode.parent.convertToWorldSpaceAR(pokerNode.position));
            var offset = -15;
            if (!targetNode.getComponent(Poker_1.default)) {
              Game_1.Game.placePokerRoot.add(pos, pokerNode);
              offset = 0;
            }
            pokerNode.setParent(targetNode);
            var poker_2 = pokerNode.getComponent(Poker_1.default);
            pokerNode.setPosition(selfPos);
            if (count > _this.dispatchCardCount - 8) {
              poker_2.flipCard(.1);
              poker_2.setNormal();
            }
            pokerNode.group = "top";
            pokerNode.runAction(cc.sequence(cc.moveTo(.1, 0, offset), cc.callFunc(function() {
              pokerNode.group = "default";
              poker_2.setDefaultPosition();
              func1();
            }, _this)));
          }
        };
        func1();
      };
      GameScene.prototype.onPokerClipAddChild = function() {};
      GameScene.prototype.dispatchPoker = function() {
        var _this = this;
        if (this.PokerClip.childrenCount <= 0 || !this.canDispatchPoker) return;
        var nodes = [];
        var parents = [];
        var poses = [];
        var funcs = [];
        Game_1.Game.placePokerRoot.forEach(function(index, targetNode) {
          if (_this.PokerClip.childrenCount <= 0) return;
          var pokerNode = _this.PokerClip.children[_this.PokerClip.childrenCount - 1];
          var selfPos = targetNode.convertToNodeSpaceAR(pokerNode.parent.convertToWorldSpaceAR(pokerNode.position));
          var poker = pokerNode.getComponent(Poker_1.default);
          nodes.push(pokerNode);
          parents.push(pokerNode.getParent());
          poses.push(pokerNode.position.clone());
          funcs.push({
            callback: poker.flipCard,
            args: [ .1 ],
            target: poker
          });
          pokerNode.setParent(targetNode);
          pokerNode.setPosition(selfPos);
          var offset = -30;
          if (!targetNode.getComponent(Poker_1.default)) {
            Game_1.Game.placePokerRoot.add(index, pokerNode);
            offset = 0;
          }
          poker.flipCard(.1);
          poker.setNormal();
          pokerNode.group = "top";
          pokerNode.runAction(cc.sequence(cc.moveTo(.3, 0, offset), cc.callFunc(function() {
            poker.setDefaultPosition();
            pokerNode.group = "default";
          }, _this)));
        });
        Game_1.Game.addStep(nodes, parents, poses, funcs);
      };
      GameScene.prototype.start = function() {};
      __decorate([ property(cc.Prefab) ], GameScene.prototype, "Poker", void 0);
      __decorate([ property(cc.Node) ], GameScene.prototype, "PokerClip", void 0);
      __decorate([ property(cc.Node) ], GameScene.prototype, "PlaceRoot", void 0);
      __decorate([ property(cc.Node) ], GameScene.prototype, "PokerDevl", void 0);
      __decorate([ property(cc.Node) ], GameScene.prototype, "RemoveNode", void 0);
      __decorate([ property(cc.Button) ], GameScene.prototype, "BackButton", void 0);
      GameScene = __decorate([ ccclass ], GameScene);
      return GameScene;
    }(cc.Component);
    exports.default = GameScene;
    cc._RF.pop();
  }, {
    "./Poker": "Poker",
    "./controller/Game": "Game",
    "./controller/GameFactory": "GameFactory",
    "./utils/celerx": "celerx"
  } ],
  Game: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "40425qmjHtE2rUaEpFgHzOS", "Game");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HashMap_1 = require("../utils/HashMap");
    var Poker_1 = require("../Poker");
    var GameMgr = function() {
      function GameMgr() {
        this.placePokerRoot = new HashMap_1.HashMap();
        this.stepInfoArray = [];
      }
      GameMgr.prototype.GameMgr = function() {};
      Object.defineProperty(GameMgr, "inst", {
        get: function() {
          return this._inst ? this._inst : this._inst = new GameMgr();
        },
        enumerable: true,
        configurable: true
      });
      GameMgr.prototype.addStep = function(node, lastParent, lastPos, func) {
        this.stepInfoArray.push({
          node: node,
          lastParent: lastParent,
          lastPos: lastPos,
          func: func
        });
      };
      GameMgr.prototype.clearStep = function() {
        this.stepInfoArray.length = 0;
      };
      GameMgr.prototype.backStep = function() {
        if (this.stepInfoArray.length <= 0) {
          console.warn(" no cache step!");
          return;
        }
        var step = this.stepInfoArray.pop();
        var _loop_1 = function() {
          var node = step.node.pop();
          var parent = step.lastParent.pop();
          var pos = step.lastPos.pop();
          var func = step.func ? step.func.pop() : null;
          if ("PokerClip" == parent.name) {
            var selfPos = parent.convertToNodeSpaceAR(node.getParent().convertToWorldSpaceAR(node.position));
            node.setPosition(selfPos);
          } else node.setPosition(pos);
          node.setParent(parent);
          node.group = "top";
          func && func.callback && func.target && func.callback.apply(func.target, func.args);
          var poker = node.getComponent(Poker_1.default);
          if (poker) {
            var returnPos = "PokerClip" == parent.name ? poker.getLastPosition() : poker.getDefaultPosition();
            parent.getComponent(Poker_1.default) ? (parent.getComponent(Poker_1.default).getForward() && parent.getComponent(Poker_1.default).getForward().getCardState() == Poker_1.CardState.Back || !parent.getComponent(Poker_1.default).getForward() || parent.getComponent(Poker_1.default).getCardState() == Poker_1.CardState.Back) && (returnPos.y = -15) : returnPos.y = 0;
            poker.node.runAction(cc.sequence(cc.moveTo(.1, returnPos.x, returnPos.y), cc.callFunc(function() {
              node.group = "default";
            }, this_1)));
          }
        };
        var this_1 = this;
        while (step.node.length > 0) _loop_1();
      };
      return GameMgr;
    }();
    exports.Game = GameMgr.inst;
    true, window["Game"] = exports.Game;
    cc._RF.pop();
  }, {
    "../Poker": "Poker",
    "../utils/HashMap": "HashMap"
  } ],
  HashMap: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "07791aKdvNDo7wFtZ+VAQS2", "HashMap");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var HashMap = function() {
      function HashMap() {
        this._list = new Array();
        this.clear();
      }
      HashMap.prototype.getIndexByKey = function(key) {
        var count = this._list.length;
        for (var index = 0; index < count; index++) {
          var element = this._list[index];
          if (element.key == key) return index;
        }
        return -1;
      };
      HashMap.prototype.keyOf = function(value) {
        var count = this._list.length;
        for (var index = 0; index < count; index++) {
          var element = this._list[index];
          if (element.value == value) return element.key;
        }
        return null;
      };
      Object.defineProperty(HashMap.prototype, "keys", {
        get: function() {
          var keys = new Array();
          for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
            var element = _a[_i];
            element && keys.push(element.key);
          }
          return keys;
        },
        enumerable: true,
        configurable: true
      });
      HashMap.prototype.add = function(key, value) {
        var data = {
          key: key,
          value: value
        };
        var index = this.getIndexByKey(key);
        -1 != index ? this._list[index] = data : this._list.push(data);
      };
      Object.defineProperty(HashMap.prototype, "values", {
        get: function() {
          return this._list;
        },
        enumerable: true,
        configurable: true
      });
      HashMap.prototype.remove = function(key) {
        var index = this.getIndexByKey(key);
        if (-1 != index) {
          var data = this._list[index];
          this._list.splice(index, 1);
          return data;
        }
        return null;
      };
      HashMap.prototype.has = function(key) {
        var index = this.getIndexByKey(key);
        return -1 != index;
      };
      HashMap.prototype.get = function(key) {
        var index = this.getIndexByKey(key);
        if (-1 != index) {
          var data = this._list[index];
          return data.value;
        }
        return null;
      };
      Object.defineProperty(HashMap.prototype, "length", {
        get: function() {
          return this._list.length;
        },
        enumerable: true,
        configurable: true
      });
      HashMap.prototype.sort = function(compare) {
        this._list.sort(compare);
      };
      HashMap.prototype.forEachKeyValue = function(f) {
        var count = this._list.length;
        for (var index = 0; index < count; index++) {
          var element = this._list[index];
          f(element);
        }
      };
      HashMap.prototype.forEach = function(f) {
        var count = this._list.length;
        for (var index = 0; index < count; index++) {
          var element = this._list[index];
          f(element.key, element.value);
        }
      };
      HashMap.prototype.clear = function() {
        this._list = [];
      };
      return HashMap;
    }();
    exports.HashMap = HashMap;
    cc._RF.pop();
  }, {} ],
  PokerRoot: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "11cba6M6B9Awbm3ikseAzvv", "PokerRoot");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Game_1 = require("./controller/Game");
    var Poker_1 = require("./Poker");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PokerRoot = function(_super) {
      __extends(PokerRoot, _super);
      function PokerRoot() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      PokerRoot.prototype.onLoad = function() {
        this.node.on(cc.Node.EventType.CHILD_ADDED, this.onAddChild, this);
        this.node.on(cc.Node.EventType.CHILD_REMOVED, this.onChildRemove, this);
      };
      PokerRoot.prototype.start = function() {};
      PokerRoot.prototype.onChildRemove = function() {
        Game_1.Game.placePokerRoot.add(parseInt(this.node.name), this.node);
      };
      PokerRoot.prototype.onAddChild = function(child) {
        var poker = child.getComponent(Poker_1.default);
        if (!poker) {
          console.error(" \u6ca1\u6709 Poker\u7c7b");
          return;
        }
        this.setNewRoot(poker);
        this.next = poker;
      };
      PokerRoot.prototype.setNewRoot = function(poker) {
        if (poker.getNext()) this.setNewRoot(poker.getNext()); else {
          Game_1.Game.placePokerRoot.add(parseInt(this.node.name), poker.node);
          poker.setNormal();
        }
      };
      PokerRoot.prototype.update = function(dt) {
        null != Game_1.Game.placePokerRoot.keyOf(this.node) ? this.node.color = cc.Color.RED : this.node.color = cc.Color.WHITE;
      };
      PokerRoot = __decorate([ ccclass ], PokerRoot);
      return PokerRoot;
    }(cc.Component);
    exports.default = PokerRoot;
    cc._RF.pop();
  }, {
    "./Poker": "Poker",
    "./controller/Game": "Game"
  } ],
  Poker: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "19c3a5acP5K/YiwGw559yBs", "Poker");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Game_1 = require("./controller/Game");
    var GameFactory_1 = require("./controller/GameFactory");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var CardState;
    (function(CardState) {
      CardState[CardState["Front"] = 0] = "Front";
      CardState[CardState["Back"] = 1] = "Back";
    })(CardState = exports.CardState || (exports.CardState = {}));
    var Poker = function(_super) {
      __extends(Poker, _super);
      function Poker() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.frontCard = null;
        _this.backCard = null;
        _this.pokerAtlas = null;
        _this.flips = [];
        _this.value = 0;
        _this.canMove = false;
        _this.key = -1;
        _this.next = null;
        _this.forward = null;
        _this.defualtChildCount = 0;
        _this.isCheck = false;
        _this.isToRemove = false;
        _this.placeLimit = 75;
        return _this;
      }
      Poker_1 = Poker;
      Poker.prototype.reuse = function() {
        this.value = arguments[0][0][0];
        this.frontCard.spriteFrame = this.pokerAtlas.getSpriteFrame("spade_" + this.value);
        this.setCardState(CardState.Back);
        this.initEvent();
        this.isToRemove = false;
      };
      Poker.prototype.unuse = function() {
        this.node.targetOff(this);
      };
      Poker.prototype.getNext = function() {
        return this.next;
      };
      Poker.prototype.getForward = function() {
        return this.forward;
      };
      Poker.prototype.getValue = function() {
        return this.value;
      };
      Poker.prototype.getCardState = function() {
        return this.carState;
      };
      Poker.prototype.onLoad = function() {
        this.defualtChildCount = this.node.childrenCount;
        console.log(" default children count:", this.defualtChildCount);
        this.setCardState(CardState.Back);
        this.node["_onSetParent"] = this.onSetParent.bind(this);
      };
      Poker.prototype.initEvent = function() {
        this.node.on(cc.Node.EventType.CHILD_ADDED, this.onAddChild, this);
        this.node.on(cc.Node.EventType.CHILD_REMOVED, this.onChildRemove, this);
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onMove, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onMoveEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onMoveEnd, this);
        this.node.on("check-done", this.onCheckDone, this);
      };
      Poker.prototype.onCheckDone = function(key) {
        var _this = this;
        console.log(" check done: ", key, ":", this.key, this.value);
        if (this.key != key || !this.isCheck) return;
        this.scheduleOnce(function() {
          var selfPos = Game_1.Game.removeNode.convertToNodeSpaceAR(_this.node.parent.convertToWorldSpaceAR(_this.node.position));
          _this.isToRemove = true;
          _this.node.setParent(Game_1.Game.removeNode);
          _this.node.setPosition(selfPos);
          var dir = _this.value % 2 == 1 ? 1 : -1;
          _this.canMove = false;
          _this.node.group = "top";
          _this.node.runAction(cc.sequence(cc.delayTime(_this.value / 50), cc.sequence(cc.repeat(cc.spawn(cc.moveBy(.01, 1.5 * dir, 25).easing(cc.easeQuinticActionOut()), cc.rotateBy(.01, 20 * dir).easing(cc.easeQuadraticActionIn())), 30), cc.repeat(cc.spawn(cc.moveBy(.01, 2 * dir, -25).easing(cc.easeQuinticActionIn()), cc.rotateBy(.01, 20 * dir).easing(cc.easeQuadraticActionIn())), 150), cc.callFunc(function() {
            console.log("done!");
            GameFactory_1.gFactory.putPoker(_this.node);
          }, _this))));
        }, this.value / 1e3);
      };
      Poker.prototype.setDefaultPosition = function(pos) {
        this.defaultPos = pos || this.node.position.clone();
      };
      Poker.prototype.setLastPosition = function(pos) {
        this.lastPos = pos || this.node.position.clone();
      };
      Poker.prototype.getDefaultPosition = function() {
        return this.defaultPos.clone();
      };
      Poker.prototype.getLastPosition = function() {
        return this.lastPos.clone();
      };
      Poker.prototype.setKey = function(key) {
        this.key = key;
        this.node.getChildByName("Label").getComponent(cc.Label).string = key.toString();
        this.next && this.next.setKey(key);
      };
      Poker.prototype.getKey = function() {
        return this.key;
      };
      Poker.prototype.onTouchStart = function(e) {};
      Poker.prototype.onMove = function(e) {
        e.bubbles = false;
        if (!this.canMove) return;
        this.node.group = "top";
        var move = e.getDelta();
        this.node.x += move.x;
        this.node.y += move.y;
      };
      Poker.prototype.onMoveEnd = function(e) {
        var _this = this;
        e.bubbles = false;
        if (this.defaultPos && this.canMove) {
          var placeIndex = this.checkCanPlace();
          placeIndex >= 0 ? this.placeToNewRoot(placeIndex) : this.node.runAction(cc.sequence(cc.moveTo(.1, this.defaultPos.x, this.defaultPos.y), cc.callFunc(function() {
            _this.node.group = "default";
          }, this)));
        }
      };
      Poker.prototype.checkCanPlace = function() {
        var _this = this;
        var distance = this.placeLimit;
        var index = -1;
        Game_1.Game.placePokerRoot.forEach(function(key, root) {
          var poker = root.getComponent(Poker_1);
          if (poker && Poker_1.checkBeNext(poker, _this) || !poker) {
            var dis = CMath.Distance(_this.node.parent.convertToNodeSpaceAR(root.parent.convertToWorldSpaceAR(root.position)), _this.node.position);
            if (dis < distance) {
              distance = dis;
              index = key;
            }
          }
        });
        return index;
      };
      Poker.prototype.updateRootNode = function(index) {
        if (this.node.childrenCount <= this.defualtChildCount) {
          Game_1.Game.placePokerRoot.add(index, this.node);
          this.check(1);
        } else {
          if (!this.next) return;
          this.next.updateRootNode.call(this.next, index);
        }
      };
      Poker.prototype.placeToNewRoot = function(index) {
        var _this = this;
        var root = Game_1.Game.placePokerRoot.get(index);
        var selfPos = root.convertToNodeSpaceAR(this.node.parent.convertToWorldSpaceAR(this.node.position));
        this.forward && this.forward.carState == CardState.Back ? Game_1.Game.addStep([ this.node ], [ this.node.getParent() ], [ this.node.position.clone() ], [ {
          callback: this.forward.flipCard,
          args: [ .1 ],
          target: this.forward
        } ]) : Game_1.Game.addStep([ this.node ], [ this.node.getParent() ], [ this.node.position.clone() ]);
        this.node.setParent(root);
        this.node.setPosition(selfPos);
        var offset = 0;
        root.getComponent(Poker_1) && (offset = -30);
        this.node.runAction(cc.sequence(cc.moveTo(.1, 0, offset), cc.callFunc(function() {
          _this.setDefaultPosition();
          _this.node.group = "default";
        }, this)));
      };
      Poker.prototype.check = function(valua) {
        if (this.carState == CardState.Back) return;
        console.log(" check :", valua, this.value);
        if (this.value == valua) {
          this.isCheck = true;
          if (13 == valua) {
            this.emitCheckDone();
            Game_1.Game.clearStep();
          } else this.forward && this.forward.check.call(this.forward, valua + 1);
        } else this.isCheck = false;
      };
      Poker.prototype.emitCheckDone = function() {
        this.node.emit("check-done", this.key);
        this.next && this.next.emitCheckDone.call(this.next);
      };
      Poker.prototype.onAddChild = function(child) {
        console.log("onAddChild:", this.value, this.key);
        var poker = child.getComponent(Poker_1);
        if (!poker) {
          console.error(" \u6ca1\u6709 Poker\u7c7b");
          return;
        }
        poker.forward = this;
        this.next = poker;
        if (Poker_1.checkBeNext(this, this.next)) this.setNormal(); else {
          console.log(" onAddChild call setAllGray:", this.value, ",key:", this.key);
          this.setAllGray();
        }
        poker.setNormal();
        this.updateRootNode(this.key);
      };
      Poker.checkBeNext = function(poker, next) {
        if (!next || !poker) return false;
        return poker.getValue() - next.getValue() == 1;
      };
      Poker.prototype.onChildRemove = function() {
        console.log(" onChildRemove:", this.node.childrenCount);
        if (this.node.childrenCount <= this.defualtChildCount && !this.isToRemove) {
          this.next = null;
          Game_1.Game.placePokerRoot.add(this.key, this.node);
          this.setNormal();
          this.carState == CardState.Back ? this.flipCard(.1) : this.forward && this.forward.updateState.call(this.forward);
        }
      };
      Poker.prototype.updateState = function() {
        if (this.next) {
          if (Poker_1.checkBeNext(this, this.next) && this.next.isNormal()) this.setNormal(); else {
            this.frontCard.node.color = cc.Color.GRAY;
            this.canMove = false;
          }
          this.forward && this.forward.updateState.call(this.forward);
        } else this.setNormal();
      };
      Poker.prototype.setAllGray = function() {
        if (!this.node.parent) return;
        console.warn(" setGray:", this.value, ",key:", this.key);
        this.frontCard.node.color = cc.Color.GRAY;
        this.canMove = false;
        if (this.forward) {
          console.log(" self call setAllGray:", this.forward.getValue(), ",key:", this.forward.getKey());
          this.forward.setAllGray.call(this.forward);
        }
      };
      Poker.prototype.setNormal = function() {
        console.log("setNormal:", this.value, ",key:", this.key);
        this.frontCard.node.color = cc.Color.WHITE;
        this.canMove = this.carState == CardState.Front;
      };
      Poker.prototype.isGray = function() {
        return this.frontCard.node.color == cc.Color.GRAY && false == this.canMove;
      };
      Poker.prototype.setCardState = function(state) {
        console.log("setCardState:", this.value, this.key);
        this.carState = state;
        this.frontCard.node.scaleX = this.carState == CardState.Front ? 1 : 0;
        this.backCard.node.scaleX = this.carState == CardState.Back ? 1 : 0;
        this.canMove = this.carState == CardState.Front;
        this.canMove && this.next && !Poker_1.checkBeNext(this, this.next) && (this.canMove = false);
        if (this.canMove) {
          this.frontCard.node.color = cc.Color.WHITE;
          this.setDefaultPosition();
        } else this.frontCard.node.color = cc.Color.GRAY;
      };
      Poker.prototype.isNormal = function() {
        return this.carState == CardState.Front && this.canMove;
      };
      Poker.prototype.flipCard = function(duration) {
        var _this = this;
        void 0 === duration && (duration = 1);
        if (this.frontCard.node.getNumberOfRunningActions() > 0 || this.backCard.node.getNumberOfRunningActions() > 0) {
          console.warn("\u7ffb\u9762\u672a\u5b8c\u6210");
          this.flips.push(duration);
          return;
        }
        if (this.carState == CardState.Back) {
          this.frontCard.node.runAction(cc.sequence(cc.delayTime(duration), cc.scaleTo(duration, 1, 1), cc.callFunc(function() {
            _this.setCardState(CardState.Front);
            if (_this.flips.length > 0) {
              _this.frontCard.node.stopAllActions();
              _this.flipCard.call(_this, _this.flips.pop());
            }
          }, this)));
          this.backCard.node.runAction(cc.scaleTo(duration, 0, 1));
        } else {
          this.backCard.node.runAction(cc.sequence(cc.delayTime(duration), cc.scaleTo(duration, 1, 1), cc.callFunc(function() {
            _this.setCardState(CardState.Back);
            if (_this.flips.length > 0) {
              _this.backCard.node.stopAllActions();
              _this.flipCard.call(_this, _this.flips.pop());
            }
          }, this)));
          this.frontCard.node.runAction(cc.scaleTo(duration, 0, 1));
        }
      };
      Poker.prototype.start = function() {};
      Poker.prototype.update = function(dt) {
        null != Game_1.Game.placePokerRoot.keyOf(this.node) ? this.frontCard.node.color = this.canMove ? cc.Color.GREEN : cc.Color.RED : this.frontCard.node.color = this.canMove ? cc.Color.WHITE : cc.Color.GRAY;
      };
      Poker.prototype.onSetParent = function(parent) {
        if (!parent) return;
        if (this.isToRemove) return;
        var poker = parent.getComponent(Poker_1);
        if (poker) {
          this.forward = poker;
          this.setKey(poker.getKey());
        } else {
          this.forward = null;
          this.setKey(parseInt(parent.name));
        }
      };
      var Poker_1;
      __decorate([ property(cc.Sprite) ], Poker.prototype, "frontCard", void 0);
      __decorate([ property(cc.Sprite) ], Poker.prototype, "backCard", void 0);
      __decorate([ property(cc.SpriteAtlas) ], Poker.prototype, "pokerAtlas", void 0);
      Poker = Poker_1 = __decorate([ ccclass ], Poker);
      return Poker;
    }(cc.Component);
    exports.default = Poker;
    cc._RF.pop();
  }, {
    "./controller/Game": "Game",
    "./controller/GameFactory": "GameFactory"
  } ],
  celerx: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "153b7Xcy2FNELHDjVpmsk/P", "celerx");
    "use strict";
    var _typeof2 = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
      return typeof obj;
    } : function(obj) {
      return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    function binary_to_base64(e) {
      for (var t = new Uint8Array(e), r = new Array(), n = 0, i = 0, a = new Array(3), o = new Array(4), d = t.length, s = 0; d--; ) if (a[n++] = t[s++], 
      3 == n) {
        for (o[0] = (252 & a[0]) >> 2, o[1] = ((3 & a[0]) << 4) + ((240 & a[1]) >> 4), o[2] = ((15 & a[1]) << 2) + ((192 & a[2]) >> 6), 
        o[3] = 63 & a[2], n = 0; n < 4; n++) r += base64_chars.charAt(o[n]);
        n = 0;
      }
      if (n) {
        for (i = n; i < 3; i++) a[i] = 0;
        for (o[0] = (252 & a[0]) >> 2, o[1] = ((3 & a[0]) << 4) + ((240 & a[1]) >> 4), o[2] = ((15 & a[1]) << 2) + ((192 & a[2]) >> 6), 
        o[3] = 63 & a[2], i = 0; i < n + 1; i++) r += base64_chars.charAt(o[i]);
        for (;n++ < 3; ) r += "=";
      }
      return r;
    }
    function dec2hex(e) {
      for (var t = hD.substr(15 & e, 1); e > 15; ) e >>= 4, t = hD.substr(15 & e, 1) + t;
      return t;
    }
    function base64_decode(e) {
      var t, r, n, i, a, o, d, s = new Array(), c = 0, l = e;
      if (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""), l != e && alert("Warning! Characters outside Base64 range in input string ignored."), 
      e.length % 4) return alert("Error: Input length is not a multiple of 4 bytes."), 
      "";
      for (var u = 0; c < e.length; ) i = keyStr.indexOf(e.charAt(c++)), a = keyStr.indexOf(e.charAt(c++)), 
      o = keyStr.indexOf(e.charAt(c++)), d = keyStr.indexOf(e.charAt(c++)), t = i << 2 | a >> 4, 
      r = (15 & a) << 4 | o >> 2, n = (3 & o) << 6 | d, s[u++] = t, 64 != o && (s[u++] = r), 
      64 != d && (s[u++] = n);
      return s;
    }
    var _typeof = "function" == typeof Symbol && "symbol" == _typeof2(Symbol.iterator) ? function(e) {
      return "undefined" === typeof e ? "undefined" : _typeof2(e);
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : "undefined" === typeof e ? "undefined" : _typeof2(e);
    }, bridge = {
      default: void 0,
      call: function call(e, t, r) {
        var n = "";
        if ("function" == typeof t && (r = t, t = {}), t = {
          data: void 0 === t ? null : t
        }, "function" == typeof r) {
          var i = "dscb" + window.dscb++;
          window[i] = r, t._dscbstub = i;
        }
        return t = JSON.stringify(t), window._dsbridge ? n = _dsbridge.call(e, t) : (window._dswk || -1 != navigator.userAgent.indexOf("_dsbridge")) && (n = prompt("_dsbridge=" + e, t)), 
        JSON.parse(n || "{}").data;
      },
      register: function register(e, t, r) {
        r = r ? window._dsaf : window._dsf, window._dsInit || (window._dsInit = !0, setTimeout(function() {
          bridge.call("_dsb.dsinit");
        }, 0)), "object" == (void 0 === t ? "undefined" : _typeof(t)) ? r._obs[e] = t : r[e] = t;
      },
      registerAsyn: function registerAsyn(e, t) {
        this.register(e, t, !0);
      },
      hasNativeMethod: function hasNativeMethod(e, t) {
        return this.call("_dsb.hasNativeMethod", {
          name: e,
          type: t || "all"
        });
      },
      disableJavascriptDialogBlock: function disableJavascriptDialogBlock(e) {
        this.call("_dsb.disableJavascriptDialogBlock", {
          disable: !1 !== e
        });
      }
    };
    !function() {
      if (!window._dsf) {
        var e, t = {
          _dsf: {
            _obs: {}
          },
          _dsaf: {
            _obs: {}
          },
          dscb: 0,
          celerx: bridge,
          close: function close() {
            bridge.call("_dsb.closePage");
          },
          _handleMessageFromNative: function _handleMessageFromNative(e) {
            var t = JSON.parse(e.data), r = {
              id: e.callbackId,
              complete: !0
            }, n = this._dsf[e.method], i = this._dsaf[e.method], a = function a(e, n) {
              r.data = e.apply(n, t), bridge.call("_dsb.returnValue", r);
            }, o = function o(e, n) {
              t.push(function(e, t) {
                r.data = e, r.complete = !1 !== t, bridge.call("_dsb.returnValue", r);
              }), e.apply(n, t);
            };
            if (n) a(n, this._dsf); else if (i) o(i, this._dsaf); else if (n = e.method.split("."), 
            !(2 > n.length)) {
              e = n.pop();
              var n = n.join("."), i = this._dsf._obs, i = i[n] || {}, d = i[e];
              d && "function" == typeof d ? a(d, i) : (i = this._dsaf._obs, i = i[n] || {}, (d = i[e]) && "function" == typeof d && o(d, i));
            }
          }
        };
        for (e in t) window[e] = t[e];
        bridge.register("_hasJavascriptMethod", function(e, t) {
          return t = e.split("."), 2 > t.length ? !(!_dsf[t] && !_dsaf[t]) : (e = t.pop(), 
          t = t.join("."), (t = _dsf._obs[t] || _dsaf._obs[t]) && !!t[e]);
        });
      }
    }();
    var base64_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", hD = "0123456789ABCDEF", keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    module.exports = {
      onStateReceived: function onStateReceived(e) {
        return bridge.register("onStateReceived", function(t) {
          var r = base64_decode(t);
          return e(new Uint8Array(r));
        });
      },
      onCourtModeStarted: function onCourtModeStarted(e) {
        return bridge.register("onCourtModeStarted", e);
      },
      getMatch: function getMatch() {
        var e = bridge.call("getMatch", "123");
        try {
          e = JSON.parse(e);
        } catch (e) {}
        return e;
      },
      showCourtModeDialog: function showCourtModeDialog() {
        return bridge.call("showCourtModeDialog");
      },
      start: function start() {
        return bridge.call("start");
      },
      sendState: function sendState(e) {
        return bridge.call("sendState", binary_to_base64(e));
      },
      draw: function draw(e) {
        return bridge.call("draw", binary_to_base64(e));
      },
      win: function win(e) {
        return bridge.call("win", binary_to_base64(e));
      },
      lose: function lose(e) {
        return bridge.call("lose", binary_to_base64(e));
      },
      surrender: function surrender(e) {
        return bridge.call("surrender", binary_to_base64(e));
      },
      applyAction: function applyAction(e, t) {
        return bridge.call("applyAction", binary_to_base64(e), t);
      },
      getOnChainState: function getOnChainState(e) {
        return bridge.call("getOnChainState", "123", function(t) {
          var r = base64_decode(t);
          return e(new Uint8Array(r));
        });
      },
      getOnChainActionDeadline: function getOnChainActionDeadline(e) {
        return bridge.call("getOnChainActionDeadline", "123", e);
      },
      getCurrentBlockNumber: function getCurrentBlockNumber() {
        return bridge.call("getCurrentBlockNumber", "123");
      },
      finalizeOnChainGame: function finalizeOnChainGame(e) {
        return bridge.call("finalizeOnChainGame", "123", e);
      },
      submitScore: function submitScore(e) {
        return bridge.call("submitScore", e);
      },
      ready: function ready() {
        return bridge.call("ready");
      },
      onStart: function onStart(e) {
        return bridge.register("onStart", e);
      }
    };
    cc._RF.pop();
  }, {} ]
}, {}, [ "GameScene", "Poker", "PokerRoot", "AudioController", "EventManager", "EventName", "Game", "GameFactory", "HashMap", "celerx" ]);