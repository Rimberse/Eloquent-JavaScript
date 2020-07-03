class Picture {
    constructor(width, height, pixels) {
        this.width = width;
        this.height = height;
        this.pixels = pixels;
    }

    static empty(width, height, color) {
        let pixels = new Array(width * height).fill(color);
        return new Picture(width, height, pixels);
    }

    pixel(x, y) {
        return this.pixels[x + y * this.width];
    }

    draw(pixels) {
        let copy = this.pixels.slice();
        for (let { x, y, color } of pixels) {
            copy[x + y * this.width] = color;
        }
        return new Picture(this.width, this.height, copy);
    }
};

const updateState = (state, action) => {
    return Object.assign({}, state, action);
};

const elt = (type, props, ...children) => {
    let dom = document.createElement(type);
    if (props) Object.assign(dom, props);

    for (let child of children) {
        if (typeof child != 'string') dom.appendChild(child);
        else dom.appendChild(document.createTextNode(child));
    }
    return dom;
};

const scale = 10;

/* class PictureCanvas {
    constructor(picture, pointerDown) {
        this.dom = elt('canvas', {
            onmousedown: event => this.mouse(event, pointerDown),
            ontouchstart: event => this.touch(event, pointerDown)
        });
        this.syncState(picture);
    }

    syncState(picture) {
        if (this.picture == picture) return;
        this.picture = picture;
        drawPicture(this.picture, this.dom, scale);
    }
};

const drawPicture = (picture, canvas, scale) => {
    canvas.width = picture.width * scale;
    canvas.height = picture.height * scale;
    let cx = canvas.getContext('2d');

    for (let y = 0; y < picture.height; y++) {
        for (let x = 0; x < picture.width; x++) {
            cx.fillStyle = picture.pixel(x, y);
            cx.fillRect(x * scale, y * scale, scale, scale);
        }
    }
};

PictureCanvas.prototype.mouse = function (downEvent, onDown) {
    if (downEvent.button != 0) return;
    let pos = pointerPosition(downEvent, this.dom);
    let onMove = onDown(pos);
    if (!onMove) return;
    let move = moveEvent => {
        if (moveEvent.buttons == 0) {
            this.dom.removeEventListener('mousemove', move);
        } else {
            let newPos = pointerPosition(moveEvent, this.dom);
            if (newPos.x == pos.x && newPos.y == pos.y) return;
            pos = newPos;
            onMove(newPos);
        }
    };
    this.dom.addEventListener('mousemove', move);
};

const pointerPosition = (pos, domNode) => {
    const rect = domNode.getBoundingClientRect();
    return {
        x: Math.floor((pos.clientX - rect.left) / scale),
        y: Math.floor((pos.clientY - rect.top) / scale)
    };
};

PictureCanvas.prototype.touch = function (startEvent, onDown) {
    let pos = pointerPosition(startEvent.touches[0], this.dom);
    let onMove = onDown(pos);
    startEvent.preventDefault();
    if (!onMove) return;
    let move = moveEvent => {
        let newPos = pointerPosition(moveEvent.touches[0], this.dom);
        if (newPos.x == pos.x && newPos.y == pos.y) return;
        pos = newPos;
        onMove(newPos);
    };

    let end = () => {
        this.dom.removeEventListener('touchmove', move);
        this.dom.removeEventListener('touchend', end);
    };
    this.dom.addEventListener('touchmove', move);
    this.dom.addEventListener('touchend', end);
};

class PixelEditor {
    constructor(state, config) {
        let {tools, controls, dispatch} = config;
        this.state = state;

        this.canvas = new PictureCanvas(state.picture, pos => {
            let tool = tools[this.state.tool];
            let onMove = tool(pos, this.state, dispatch);
            if (onMove) return pos => onMove(pos, this.state);
        });
        this.controls = controls.map(Control => new Control(state, config));
        this.dom = elt('div', {}, this.canvas.dom, elt('br'), ...this.controls.reduce((a, c) => a.concat(' ', c.dom), []));
    }

    syncState(state) {
        this.state = state;
        this.canvas.syncState(state.picture);
        for (let ctrl of this.controls) ctrl.syncState(state);
    }
}; */

class ToolSelect {
    constructor(state, { tools, dispatch }) {
        this.select = elt('select', {
            onchange: () => dispatch({ tool: this.select.value })
        }, ...Object.keys(tools).map(name => elt('option', {
            selected: name == state.tool
        }, name)));
        this.dom = elt('label', null, '🖌 Tool: ', this.select);
    }
    syncState(state) { this.select.value = state.tool; }
};

class ColorSelect {
    constructor(state, { dispatch }) {
        this.input = elt('input', {
            type: 'color',
            value: state.color,
            onchange: () => dispatch({ color: this.input.value })
        });
        this.dom = elt('label', null, '🎨 Color: ', this.input);
    }
    syncState(state) { this.input.value = state.color; }
};

/* const draw = (pos, state, dispatch) => {
    const drawPixel = ({ x, y }, state) => {
        const drawn = { x, y, color: state.color };
        dispatch({ picture: state.picture.draw([drawn]) });
    };
    drawPixel(pos, state);
    return drawPixel;
}; */

const rectangle = (start, state, dispatch) => {
    const drawRectangle = pos => {
        const xStart = Math.min(start.x, pos.x);
        const yStart = Math.min(start.y, pos.y);
        const xEnd = Math.max(start.x, pos.x);
        const yEnd = Math.max(start.y, pos.y);
        const drawn = [];
        for (let y = yStart; y <= yEnd; y++) {
            for (let x = xStart; x <= xEnd; x++) {
                drawn.push({ x, y, color: state.color });
            }
        }
        dispatch({ picture: state.picture.draw(drawn) });
    };
    drawRectangle(start);
    return drawRectangle;
};

const around = [{ dx: -1, dy: 0 }, { dx: 1, dy: 0 },
{ dx: 0, dy: -1 }, { dx: 0, dy: 1 }];

const fill = ({ x, y }, state, dispatch) => {
    const targetColor = state.picture.pixel(x, y);
    const drawn = [{ x, y, color: state.color }];
    for (let done = 0; done < drawn.length; done++) {
        for (let { dx, dy } of around) {
            let x = drawn[done].x + dx, y = drawn[done].y + dy;
            if (x >= 0 && x < state.picture.width && y >= 0 && y < state.height && state.picture.pixel(x, y) == targetColor && !drawn.some(p => p.x == x && p.y == y)) {
                drawn.push({ x, y, color: state.color });
            }
        }
    }
    dispatch({ picture: state.picture.draw(drawn) });
};

const pick = (pos, state, dispatch) => {
    dispatch({ color: state.picture.pixel(pos.x, pos.y) });
};

class SaveButton {
    constructor(state) {
        this.picture = state.picture;
        this.dom = elt('button', {
            onclick: () => this.save()
        }, '💾 Save');
    }

    save() {
        const canvas = elt('canvas');
        drawPicture(this.picture, canvas, 1);
        const link = elt('a', {
            href: canvas.toDataURL(),
            download: 'pixelart.png'
        });
        document.body.appendChild(link);
        link.click();
        link.remove();
    }
    syncState(state) { this.picture = state.picture };
};

class LoadButton {
    constructor(_, { dispatch }) {
        this.dom = elt('button', {
            onclick: () => startLoad(dispatch)
        }, '📁 Load');
    }
    syncState() { }
}

const startLoad = dispatch => {
    let input = elt('input', {
        type: 'file',
        onchange: () => finishLoad(input.files[0], dispatch)
    });
    document.body.appendChild(input);
    input.click();
    input.remove();
};

const finishLoad = (file, dispatch) => {
    if (file == null) return;
    let reader = new FileReader();
    reader.addEventListener('load', () => {
        let image = elt('img', {
            onload: () => dispatch({
                picture: pictureFromImage(image)
            }),
            src: reader.result
        });
    });
    reader.readAsDataURL(file);
};

const pictureFromImage = image => {
    const width = Math.min(100, image.width);
    const height = Math.min(100, image.height);
    const canvas = elt('canvas', { width, height });
    const cx = canvas.getContext('2d');
    cx.drawImage(image, 0, 0);
    const pixels = [];
    const { data } = cx.getImageData(0, 0, width, height);

    const hex = n => n.toString(16).padStart(2, '0');

    for (let i = 0; i < data.length; i += 4) {
        let [r, g, b] = data.slice(i, i + 3);
        pixels.push('#' + hex(r) + hex(g) + hex(b));
    }
    return new Picture(width, height, pixels);
};

const historyUpdateState = (state, action) => {
    if (action.undo == true) {
        if (state.done.length == 0) return state;
        return Object.assign({}, state, {
            picture: state.done[0],
            done: state.done.slice(1),
            doneAt: 0
        });
    } else if (action.picture && state.doneAt < Date.now() - 1000) {
        return Object.assign({}, state, action, {
            done: [state.picture, ...state.done],
            doneAt: Date.now()
        });
    } else {
        return Object.assign({}, state, action);
    }
};

class UndoButton {
    constructor(state, { dispatch }) {
        this.dom = elt('button', {
            onclick: () => dispatch({ undo: true }),
            disabled: state.done.length == 0
        }, '⮪ Undo');
    }
    syncState(state) {
        this.dom.disabled = state.done.length == 0;
    }
};

const startState = {
    tool: 'draw',
    color: '#000000',
    picture: Picture.empty(60, 30, '#f0f0f0'),
    done: [],
    doneAt: 0
};

const baseControls = [ToolSelect, ColorSelect, SaveButton, LoadButton, UndoButton];

const startPixelEditor = ({ state = startState, tools = baseTools, controls = baseControls }) => {
    const app = new PixelEditor(state, {
        tools,
        controls,
        dispatch(action) {
            state = historyUpdateState(state, action);
            app.syncState(state);
        }
    });
    return app.dom;
};

//********************************** Exercises **********************************//

// Keyboard Bindings - My Solution
class PixelEditor {
    constructor(state, config) {
        let { tools, controls, dispatch } = config;
        this.state = state;

        this.canvas = new PictureCanvas(state.picture, pos => {
            let tool = tools[this.state.tool];
            let onMove = tool(pos, this.state, dispatch);
            if (onMove) return pos => onMove(pos, this.state);
        });
        this.controls = controls.map(Control => new Control(state, config));
        this.dom = elt('div', { tabIndex: 0, onkeydown: event => this.keyDown(event, config) }, this.canvas.dom, elt('br'), ...this.controls.reduce((a, c) => a.concat(' ', c.dom), []));
    }

    keyDown(event, config) {
        if ((event.key).toLowerCase() == 'z' && (event.ctrlKey || event.metaKey)) {
            event.preventDefault();
            config.dispatch({ undo: true });
        } else if (!event.ctrlKey && !event.metaKey) {          // !event.ctrlKey && !event.metaKey && Object.keys(config.tools).map(tool => tool.slice(0, 1)).includes((event.key).toLowerCase())
            Object.keys(config.tools).forEach(tool => {
                if ((event.key).toLowerCase() == tool.slice(0, 1)) {
                    event.preventDefault();
                    config.dispatch({ tool });
                }
            });
        }
    };

    syncState(state) {
        this.state = state;
        this.canvas.syncState(state.picture);
        for (let ctrl of this.controls) ctrl.syncState(state);
    }
};

//****************************** Author's Solution ******************************//
// class PixelEditor {
//     constructor(state, config) {
//         let { tools, controls, dispatch } = config;
//         this.state = state;

//         this.canvas = new PictureCanvas(state.picture, pos => {
//             let tool = tools[this.state.tool];
//             let onMove = tool(pos, this.state, dispatch);
//             if (onMove) {
//                 return pos => onMove(pos, this.state, dispatch);
//             }
//         });
//         this.controls = controls.map(
//             Control => new Control(state, config));
//         this.dom = elt("div", {
//             tabIndex: 0,
//             onkeydown: event => this.keyDown(event, config)
//         }, this.canvas.dom, elt("br"),
//             ...this.controls.reduce(
//                 (a, c) => a.concat(" ", c.dom), []));
//     }
//     keyDown(event, config) {
//         if (event.key == "z" && (event.ctrlKey || event.metaKey)) {
//             event.preventDefault();
//             config.dispatch({ undo: true });
//         } else if (!event.ctrlKey && !event.metaKey && !event.altKey) {
//             for (let tool of Object.keys(config.tools)) {
//                 if (tool[0] == event.key) {
//                     event.preventDefault();
//                     config.dispatch({ tool });
//                     return;
//                 }
//             }
//         }
//     }
//     syncState(state) {
//         this.state = state;
//         this.canvas.syncState(state.picture);
//         for (let ctrl of this.controls) ctrl.syncState(state);
//     }
// }

// document.querySelector("div")
//     .appendChild(startPixelEditor({}));
//*******************************************************************************//


// Efficient Drawing - My Solution
class PictureCanvas {
    constructor(picture, pointerDown) {
        this.dom = elt('canvas', {
            onmousedown: event => this.mouse(event, pointerDown),
            ontouchstart: event => this.touch(event, pointerDown)
        });
        this.syncState(picture);
    }

    syncState(picture) {
        if (this.picture == picture) return;
        const previousPicture = this.picture;
        this.picture = picture;
        drawPicture(this.picture, this.dom, scale, previousPicture);
    }
};

const drawPicture = (picture, canvas, scale, previousPicture) => {
    if (previousPicture == null || previousPicture.width != picture.width || previousPicture.height != picture.height) {
        canvas.width = picture.width * scale;
        canvas.height = picture.height * scale;
        previousPicture = null;
    }
    let cx = canvas.getContext('2d');

    for (let y = 0; y < picture.height; y++) {
        for (let x = 0; x < picture.width; x++) {
            if (previousPicture == null || previousPicture.pixel(x, y) != picture.pixel(x, y)) {
                cx.fillStyle = picture.pixel(x, y);
                cx.fillRect(x * scale, y * scale, scale, scale);
            }
        }
    }
};

// ---------------------------------------------------------------- //

PictureCanvas.prototype.mouse = function (downEvent, onDown) {
    if (downEvent.button != 0) return;
    let pos = pointerPosition(downEvent, this.dom);
    let onMove = onDown(pos);
    if (!onMove) return;
    let move = moveEvent => {
        if (moveEvent.buttons == 0) {
            this.dom.removeEventListener('mousemove', move);
        } else {
            let newPos = pointerPosition(moveEvent, this.dom);
            if (newPos.x == pos.x && newPos.y == pos.y) return;
            pos = newPos;
            onMove(newPos);
        }
    };
    this.dom.addEventListener('mousemove', move);
};

const pointerPosition = (pos, domNode) => {
    const rect = domNode.getBoundingClientRect();
    return {
        x: Math.floor((pos.clientX - rect.left) / scale),
        y: Math.floor((pos.clientY - rect.top) / scale)
    };
};

PictureCanvas.prototype.touch = function (startEvent, onDown) {
    let pos = pointerPosition(startEvent.touches[0], this.dom);
    let onMove = onDown(pos);
    startEvent.preventDefault();
    if (!onMove) return;
    let move = moveEvent => {
        let newPos = pointerPosition(moveEvent.touches[0], this.dom);
        if (newPos.x == pos.x && newPos.y == pos.y) return;
        pos = newPos;
        onMove(newPos);
    };

    let end = () => {
        this.dom.removeEventListener('touchmove', move);
        this.dom.removeEventListener('touchend', end);
    };
    this.dom.addEventListener('touchmove', move);
    this.dom.addEventListener('touchend', end);
};

//****************************** Author's Solution ******************************//
// PictureCanvas.prototype.syncState = function (picture) {
//     if (this.picture == picture) return;
//     drawPicture(picture, this.dom, scale, this.picture);
//     this.picture = picture;
// }

// function drawPicture(picture, canvas, scale, previous) {
//     if (previous == null ||
//         previous.width != picture.width ||
//         previous.height != picture.height) {
//         canvas.width = picture.width * scale;
//         canvas.height = picture.height * scale;
//         previous = null;
//     }

//     let cx = canvas.getContext("2d");
//     for (let y = 0; y < picture.height; y++) {
//         for (let x = 0; x < picture.width; x++) {
//             let color = picture.pixel(x, y);
//             if (previous == null || previous.pixel(x, y) != color) {
//                 cx.fillStyle = color;
//                 cx.fillRect(x * scale, y * scale, scale, scale);
//             }
//         }
//     }
// }

// document.querySelector("div")
//     .appendChild(startPixelEditor({}));
//*******************************************************************************//


// Circles - My Solution
const circle = (start, state, dispatch) => {
    const drawCircle = pos => {
        const radius = Math.ceil(Math.sqrt(Math.pow(pos.x - start.x, 2) + Math.pow(pos.y - start.y, 2)));
        const drawn = [];
        for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
                let distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                if (distance > Math.sqrt(Math.pow(pos.x - start.x, 2) + Math.pow(pos.y - start.y, 2))) continue;
                let y = start.y + dy, x = start.x + dx;
                if (y < 0 || y >= state.picture.height || x < 0 || x >= state.picture.width) continue;
                drawn.push({ x, y, color: state.color });
            }
        }
        dispatch({ picture: state.picture.draw(drawn) });
    };
    drawCircle(start);
    return drawCircle;
};

/* document.querySelector('div').appendChild(startPixelEditor({
    tools: Object.assign({}, baseTools, { circle })
})); */

//****************************** Author's Solution ******************************//
// function circle(pos, state, dispatch) {
//     function drawCircle(to) {
//         let radius = Math.sqrt(Math.pow(to.x - pos.x, 2) +
//             Math.pow(to.y - pos.y, 2));
//         let radiusC = Math.ceil(radius);
//         let drawn = [];
//         for (let dy = -radiusC; dy <= radiusC; dy++) {
//             for (let dx = -radiusC; dx <= radiusC; dx++) {
//                 let dist = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
//                 if (dist > radius) continue;
//                 let y = pos.y + dy, x = pos.x + dx;
//                 if (y < 0 || y >= state.picture.height ||
//                     x < 0 || x >= state.picture.width) continue;
//                 drawn.push({ x, y, color: state.color });
//             }
//         }
//         dispatch({ picture: state.picture.draw(drawn) });
//     }
//     drawCircle(pos);
//     return drawCircle;
// }

// let dom = startPixelEditor({
//     tools: Object.assign({}, baseTools, { circle })
// });
// document.querySelector("div").appendChild(dom);
//*******************************************************************************//


// Proper Lines - My Solution

//****************************** Author's Solution ******************************//
const drawLine = (from, to, color) => {
    let points = [];
    if (Math.abs(from.x - to.x) > Math.abs(from.y - to.y)) {
        if (from.x > to.x) [from, to] = [to, from];
        let slope = (to.y - from.y) / (to.x - from.x);
        for (let { x, y } = from; x <= to.x; x++) {
            points.push({ x, y: Math.round(y), color });
            y += slope;
        }
    } else {
        if (from.y > to.y) [from, to] = [to, from];
        let slope = (to.x - from.x) / (to.y - from.y);
        for (let { x, y } = from; y <= to.y; y++) {
            points.push({ x: Math.round(x), y, color });
            x += slope;
        }
    }
    return points;
};

const draw = (pos, state, dispatch) => {
    const connect = (newPos, state) => {
        let line = drawLine(pos, newPos, state.color);
        pos = newPos;
        dispatch({ picture: state.picture.draw(line) });
    };
    connect(pos, state);
    return connect;
};

const baseTools = { draw, fill, rectangle, pick };

const line = (pos, state, dispatch) => {
    return end => {
        let line = drawLine(pos, end, state.color);
        dispatch({ picture: state.picture.draw(line) });
    };
};

document.querySelector('div').appendChild(startPixelEditor({
    tools: Object.assign({}, { draw, line, fill, rectangle, pick }, { circle })
}));
//*******************************************************************************//