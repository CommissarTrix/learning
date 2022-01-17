var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//ползунки
let handels = {
    top_left: {
        x: 50,
        y: 50
    },
    top_right: {
        x: 250,
        y: 50
    },
    bottom_left: {
        x: 50,
        y: 250
    },
    bottom_right: {
        x: 250,
        y: 250
    },
}
const handle_size = 20

function setCanvasSize() {
    canvas.width = innerWidth - 10
    canvas.height = innerHeight - 10
}

function renderHandels() {
    for (let key in handels) {
        let el = handels[key]

        ctx.fillRect(el.x, el.y, handle_size, handle_size)
    }
}
//зону между ними
function renderSquare() {
    let tl = handels.top_left
    let tr = handels.top_right
    let bl = handels.bottom_left
    let br = handels.bottom_right

    ctx.beginPath()
    ctx.moveTo(tl.x + handle_size / 2, tl.y + handle_size / 2)
    ctx.lineTo(tr.x + handle_size / 2, tr.y + handle_size / 2)
    ctx.lineTo(br.x + handle_size / 2, br.y + handle_size / 2)
    ctx.lineTo(bl.x + handle_size / 2, bl.y + handle_size / 2)
    ctx.closePath()
    ctx.stroke()
}
//общий вывод
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    renderHandels()
    renderSquare()
    requestAnimationFrame(render)
}

function checkCollision(pos) {
    for (let key in handels) {
        let el = handels[key]

        if (pos.x > el.x && pos.x < el.x + handle_size && pos.y > el.y && pos.y < el.y + handle_size) {
            current_drag = key
            return true
        }
    }
    current_drag = ''
    return false
}

function movePoint(pos) {
    let x_val = pos.x - handle_size / 2
    let y_val = pos.y - handle_size / 2

    handels[current_drag] = {
        x: x_val,
        y: y_val
    }

    handels[current_drag.replace('top', 'bottom')].x = x_val
    handels[current_drag.replace('bottom', 'top')].x = x_val
    handels[current_drag.replace('left', 'right')].y = y_val
    handels[current_drag.replace('right', 'left')].y = y_val
}

document.onmousemove = (e) => {
    let pos = {
        x: e.pageX,
        y: e.pageY
    }
}

setCanvasSize()
render()