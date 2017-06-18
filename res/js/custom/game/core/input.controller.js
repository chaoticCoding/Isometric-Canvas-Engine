/**
* class for watching and binding keyboard and mouse events
* en.wikipedia.org/wiki/DOM_events Dome events
* Devloped by Shawn Palmer, Chaotic Coding
*
***/
var game = game || {};

game.Input = (function () {

    // Storage for event callbacks
    var Bindings = {};

    // Storage for the events to be tracked
    var eventBindings = {};

    /** Action Definitions
     *
     * Used for Storing Action types
     */
    var ACTIONs = {
        'MouseCLICK': 0,
        'MouseUP': 1,
        'MouseDOWN': 2,
        'MouseDBLCLICK': 3,
        'Contextual': 4,

        'KeyPRESS': 5,
        'KeyDOWN': 6,
        'KeyUP': 7,

        'RESIZE': -1,
    };

    /** Key Definitions
     *
     * This is has the name and ID for all common key and mouse bindings
     */
    var KEY = {
        'MOUSE1': 0,
        'MOUSE2': 2,
        'MOUSE3': 3,
        'MWHEEL_UP': -4,
        'MWHEEL_DOWN': -5,

        'BACKSPACE': 8,
        'TAB': 9,
        'ENTER': 13,
        'PAUSE': 19,
        'CAPS': 20,
        'ESC': 27,
        'SPACE': 32,
        'PAGE_UP': 33,
        'PAGE_DOWN': 34,
        'END': 35,
        'HOME': 36,
        'LEFT_ARROW': 37,
        'UP_ARROW': 38,
        'RIGHT_ARROW': 39,
        'DOWN_ARROW': 40,
        'INSERT': 45,
        'DELETE': 46,
        '0': 48,
        '1': 49,
        '2': 50,
        '3': 51,
        '4': 52,
        '5': 53,
        '6': 54,
        '7': 55,
        '8': 56,
        '9': 57,
        'A': 65,
        'B': 66,
        'C': 67,
        'D': 68,
        'E': 69,
        'F': 70,
        'G': 71,
        'H': 72,
        'I': 73,
        'J': 74,
        'K': 75,
        'L': 76,
        'M': 77,
        'N': 78,
        'O': 79,
        'P': 80,
        'Q': 81,
        'R': 82,
        'S': 83,
        'T': 84,
        'U': 85,
        'V': 86,
        'W': 87,
        'X': 88,
        'Y': 89,
        'Z': 90,
        'NUMPAD_0': 96,
        'NUMPAD_1': 97,
        'NUMPAD_2': 98,
        'NUMPAD_3': 99,
        'NUMPAD_4': 100,
        'NUMPAD_5': 101,
        'NUMPAD_6': 102,
        'NUMPAD_7': 103,
        'NUMPAD_8': 104,
        'NUMPAD_9': 105,
        'MULTIPLY': 106,
        'ADD': 107,
        'SUBSTRACT': 109,
        'DECIMAL': 110,
        'DIVIDE': 111,
        'F1': 112,
        'F2': 113,
        'F3': 114,
        'F4': 115,
        'F5': 116,
        'F6': 117,
        'F7': 118,
        'F8': 119,
        'F9': 120,
        'F10': 121,
        'F11': 122,
        'F12': 123,
        'SHIFT': 16,
        'CTRL': 17,
        'ALT': 18,
        'PLUS': 187,
        'COMMA': 188,
        'MINUS': 189,
        'PERIOD': 190,

        'resize': 'resize',
    };

    //Storage event triggers to watch
    var isUsingMouse = false; // will be set to try if mouse monitoring is enabled
    var isUsingKeyboard = false; // will be set to try if Keyboard monitoring is enabled
    var allowContextMenu = true; // will be set to false if Contextual Menus should be disabled

    //------------ Mouse Pointer ------------
    /**
     * Container for storing the current location of the mouse position
     ***/
    var _Mouse = {
        x: 0, //
        y: 0, //
        target: null, //
    };

    //------------ Main Init ------------
    /** Init functions
     *
     * Attaches parent object for later callbacks
     *
     * creates spaces for ACTION in Bindings
     *
     * @param p
     ***/
    console.log("Starting Input Engine");
    /**
     * creats Empty arrays for future key bindings/ also helps to prevents duplicate bindings
     ***/

    for (var act in ACTIONs) {
        if(ACTIONs.hasOwnProperty(act))
			Bindings[ACTIONs[act]] = []
    }

    //------------ :Main Init ------------

    //------------ Event Router ------------
    /**
     *
     * routes incoming events to their attached bindings
     *
     * @param event
     * @returns {*}
     ***/
    function handleEvent(event) {
        if (eventBindings[event.type]) {
            return eventBindings[event.type](event, this);
        }
    }
    //------------ :Event Router ------------

    //------------ Contextual Listener ------------
    /**
     * enables contextual menu (Right click)
     ***/
    function enableContext() {
        window.removeEventListener('contextmenu');
        eventBindings['contextmenu'] = null;

        allowContextMenu = true;
        console.log("Contextual Menu - Enabled");

    }

    /**
     * disables contextual menu (Right click)
     ***/
    function disableContext() {
        window.addEventListener('contextmenu', this, false);

        eventBindings['contextmenu'] = onContextMenu;

        allowContextMenu = false;
        console.log("Contextual Menu - Disabled");

    }
    //------------ :Contextual Listener ------------

    //------------ Window Listener ------------
    /**
     * init for enabling keyboard
     ***/
    function initWindow() {
        window.addEventListener('resize', this, false);
        window.addEventListener('orientationchange', this, false);

        eventBindings['resize'] = onWindowResize;
        eventBindings['orientationchange'] = onWindowResize;

        console.log("Window bindings - Enabled");
    }

    /**
     * function for removing keyboard Listeners
     ***/
    function killWindow() {
        window.removeEventListener('resize');
        window.removeEventListener('orientationchange');

        eventBindings['resize'] = null;
        eventBindings['orientationchange'] = null;

        console.log("Window bindings - Disabled");
    }
    //------------ :Window Listener ------------

    //------------ Keyboard Listener ------------
    /**
     * init for enabling keyboard
     ***/
    function initKeyboard() {
        if (isUsingKeyboard && isUsingMouse == true) {
            return;
        }

        window.addEventListener('keypress', this, false);
        window.addEventListener('keydown', this, false);
        window.addEventListener('keyup', this, false);

        eventBindings['keypress'] = onKeyPress;
        eventBindings['keydown'] = onKeyDown;
        eventBindings['keyup'] = onKeyUp;

        isUsingKeyboard = true;

        console.log("Keyboard Bindings - Enabled");
    }

    /**
     * function for removing keyboard Listeners
     ***/
    function killKeyboard() {
        window.removeEventListener('keypress');
        window.removeEventListener('keydown');
        window.removeEventListener('keyup');

        eventBindings['keypress'] = null;
        eventBindings['keydown'] = null;
        eventBindings['keyup'] = null;

        isUsingKeyboard = false;
        console.log("Keyboard Bindings - Disabled");
    }
    //------------ :Keyboard Listener ------------


    //------------ Mouse Listener ------------
    /**
     * init for enabling mouse
     ***/
    function initMouse() {
        if (isUsingMouse && isUsingMouse == true) {
            return;
        }

        window.addEventListener('mousedown', this, false);
        window.addEventListener('mouseup', this, false);

        window.addEventListener('click', this, false);
        window.addEventListener('dblclick', this, false);

        window.addEventListener('mousemove', this, false);

        eventBindings['mousedown'] = this.onMouseDown;
        eventBindings['mouseup'] = this.onMouseUp;

        eventBindings['click'] = this.onClick;
        eventBindings['dblclick'] = onDblClick;

        eventBindings['mousemove'] = onMouseMove;

        isUsingMouse = true;
        console.log("Mouse Bindings - Enabled");
    };

    /**
     * function for removing mouse Listeners
     ***/
    function killMouse() {
        window.removeEventListener('mousedown');
        window.removeEventListener('mouseup');

        window.removeEventListener('click');
        window.removeEventListener('dblclick');

        window.removeEventListener('mousemove');

        eventBindings['mousedown'] = null;
        eventBindings['mouseup'] = null;

        eventBindings['click'] = null;
        eventBindings['dblclick'] = null;

        eventBindings['mousemove'] = null;

        eventBindings['contextmenu'] = null;

        isUsingMouse = false;
        console.log("Mouse Bindings - Disabled");

    }
    //------------ :Mouse Listener ------------


    //------------ Kill all Listeners ------------
    /**
     * function for removing Event Listeners
     ***/
    function killall() {
        killMouse();
        killKeyboard();
    }
    //------------ :Kill all Listeners ------------


    //------------ Binding ------------
    /**
     * function for binding new events to their function. only one function can be bound to a event
     *
     * @param key
     * @param Action
     * @param Command
     */
    function bind(key, Action, Command) {

       // console.log("Binding: " + Action + ":" + key + " : " + Command);

        Bindings[Action][key] = Command;

        //console.log(Bindings[Action][key]);

    }

    /**
     * function for removing binding for one event
     *
     * @param key
     */
    function unbind(key, Action) {
        Bindings[Action][key] = null;

        console.log("Unbinding: " + Action + ":" + key);

    }

    /**
     * function for removing all existing bindings
     ***/
    function unbindall() {
        Bindings = [];
        initBindings();

        console.log("Unbinding: all");
    }
    //------------ :Binding ------------


    //------------ Keyboard ------------
    /** onKeyPress - Triggered from handleEvent();
     *
     * function for using actions bound to "On Key Press" events
     *
     * @param event
     * @param obj
     */
    function onKeyPress(event, obj) {

        if (isUsingKeyboard == true) {

            var code = event.keyCode;

            var action = Bindings[ACTIONs.KeyPRESS][code];
            if (action) {
                action();

                //event.preventDefault();
            }
        }
    }

    /** onKeyDown - Triggered from handleEvent();
     *
     * function for using actions bound to "On Key Down" events
     *
     * @param event
     * @param obj
     */
    function onKeyDown(event) {
        if (isUsingKeyboard == true) {

            var code = event.keyCode;

            var action = Bindings[ACTIONs.KeyDOWN][code];
            if (action) {
                action();

                event.preventDefault();
            }
        }
    }

    /** onKeyUp - Triggered from handleEvent();
     *
     * function for using actions bound to "On Key Up" events
     *
     * @param event
     * @param obj
     */
    function onKeyUp(event) {

        if (isUsingKeyboard == true) {

            var code = event.keyCode;

            var action = Bindings[ACTIONs.KeyUP][code];
            if (action) {
                action();

                event.preventDefault();
            }
        }
    }
    //------------ :Keyboard ------------


    //------------ Mouse Buttons ------------
    /** onMouseDown - Triggered from handleEvent();
     *
     * function for using actions bound to "On Mouse Down" events
     *
     * @param event
     * @param obj
     */
    function onMouseDown(event, obj) {
        if (obj.isUsingMouse) {
            if (obj.allowContextMenu == false)
                event.preventDefault();

            var code = event.button;

            var action = obj.Bindings[obj.ACTIONs.MouseDOWN][code];
            if (action) {
                action();
            }
        }
    }

    /** onMouseUp - Triggered from handleEvent();
     *
     * function for using actions bound to "On Mouse Up" events
     *
     * @param event
     * @param obj
     */
    function onMouseUp(event, obj) {
        if (obj.isUsingMouse) {

            var code = event.button;

            var action = obj.Bindings[obj.ACTIONs.MouseUP][code];
            if (action) {
                action();
            }
        }
    }

    /** onClick - Triggered from handleEvent();
     *
     * function for using actions bound to "On Mouse Click" events
     *
     * @param event
     * @param obj
     */
    function onClick(event, obj) {
        if (obj.isUsingMouse) {

            var code = event.button;

            var action = obj.Bindings[obj.ACTIONs.MouseCLICK][code];
            if (action) {
                action();
            }
        }
    }

    /** onBblClick - Triggered from handleEvent();
     *
     * function for using actions bound to "On Mouse Double Click" events
     *
     * @param event
     * @param obj
     */
    function onDblClick(event, obj) {
        if (obj.isUsingMouse) {

            var code = event.button;

            var action = obj.Bindings[obj.ACTIONs.MouseDBLCLICK][code];
            if (action) {
                action();
            }
        }
    }

    /** onContextMenu - Triggered from handleEvent();
     *
     * function for using actions bound to "On Context Menu" events
     *
     * @param event
     * @param obj
     */
    function onContextMenu(event, obj) {
        if (obj.isUsingMouse) {
            if (obj.allowContextMenu == false)
                event.preventDefault();

            var code = event.button;

            var action = obj.Bindings[obj.ACTIONs.Contextual][code];
            if (action) {
                action();
            }
        }
    }
    //------------ :Mouse Buttons ------------


    //------------ Mouse Actions ------------

    /** onMouseMove - Triggered from handleEvent();
     *
     * @param event
     * @param obj
     */
    function onMouseMove(event) {
        if (isUsingMouse) {
            var root = document.documentElement;

            if (event.srcElement.tagName == "CANVAS") {

                var rect = event.srcElement.getBoundingClientRect();

                _Mouse.x = event.offsetX;
                _Mouse.y = event.offsetY;
                _Mouse.target = event.srcElement.tagName;

            } else {
                _Mouse.x = event.pageX; // + window.pageXOffset;
                _Mouse.y = event.pageY; // + window.pageYOffset;
                _Mouse.target = event.srcElement.tagName;

            }
        }
    }

    /** TODO - watch for mouse moving into bounding areas
     *
     * URL: http://math.stackexchange.com/questions/190111/how-to-check-if-a-point-is-inside-a-rectangle
     * URL: http://hyperphysics.phy-astr.gsu.edu/hbase/vsca.html
     *
     * Detects mouse movements into bounding box
     *
     * @param event
     * @param obj
     */
    function onMouseOver(event, obj) {
        if (obj.isUsingMouse) {

            var code = event.keyCode;

            var action = obj.Bindings[code];
            if (action) {
                //action();
            }
        }
    }
    //------------ :Mouse Actions ------------

    //------------ Window Actions ------------
    /** onWindowResize - Triggered from handleEvent();
     *
     * @param event
     * @param obj
     */
    function onWindowResize(event, obj) {
        var code = event.type;

        var action = obj.Bindings[obj.ACTIONs.RESIZE][code];
        if (action) {
            action();
        }
    }

	/**
	 * returns public functions
	 */
	return{
		initKeyboard: initKeyboard,
		initMouse: initMouse,
		initWindow: initWindow,

		handleEvent: handleEvent,

		onKeyPress: onKeyPress,
		onKeyDown: onKeyDown,
		onKeyUp: onKeyUp,

		onMouseDown: onMouseDown,
		onMouseUp: onMouseUp,
		onClick: onClick,
		onDblClick: onDblClick,
		onContextMenu: onContextMenu,

		onMouseMove: onMouseMove,

		onMouseOver: onMouseOver,

		onWindowResize: onWindowResize,


		bind: bind,

		KEY: KEY,
		ACTIONs:ACTIONs,

		_Mouse: _Mouse,
	};
    //------------ :Window Actions ------------
})();