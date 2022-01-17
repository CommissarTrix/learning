var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//точки
points = [{ x: 0, y: 0 }]
const point_size = 2
let color = '#fff'
    // КОЛИЧЕТСВО ТОЧЕК
let points_count = 25

function addPoints() {
    for (let i = 0; i < points_count; i++) {
        points.push({
            x: Math.floor(Math.random() * canvas.width),
            y: Math.floor(Math.random() * canvas.height),
            right: Math.floor(Math.random() * 2) == 1 ? true : false,
            down: Math.floor(Math.random() * 2) == 1 ? true : false,
            velocity: Math.random() * +0.5 + 0.1
        })
    }
    console.log(points)
}

function setCanvasSize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}
//вывод и движение точек 
function renderPoints() {
    for (let i = 0; i < points.length; i++) {
        let el = points[i]
        ctx.beginPath()
        ctx.arc(el.x, el.y, point_size, 0, 360)
        ctx.closePath()
        ctx.strokeStyle = color
        ctx.fillStyle = color
        ctx.fill()
        ctx.lineWidth = 1
        ctx.stroke()
        if (i == 0) {
            continue
        }
        if (el.x > canvas.width - 1) {
            el.right = false
        }
        if (el.x < 3) {
            el.right = true
        }
        if (el.y > canvas.height - 1) {
            el.down = false
        }
        if (el.y < 3) {
            el.down = true
        }
        el.right ? el.x += el.velocity : el.x -= el.velocity
        el.down ? el.y += el.velocity : el.y -= el.velocity
    }

}
//зону между ними
function renderLines() {
    let difX = 0
    let difY = 0
    for (let i = 0; i < points.length; i++) {
        let el1 = points[i]
        for (let k = 0; k < points.length; k++) {
            let el2 = points[k]
            if (el1 === el2) {
                continue
            }
            difX = Math.abs(el1.x - el2.x)
            difY = Math.abs(el1.y - el2.y)
            if ((difX + difY) < 250) {
                ctx.beginPath()
                ctx.moveTo(el1.x, el1.y)
                ctx.lineTo(el2.x, el2.y)
                ctx.closePath()
                ctx.lineWidth = (1 - (difX + difY) / 250) * 3
                ctx.strokeStyle = color
                ctx.stroke()
            }
        }
    }
}

//общий вывод
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    renderPoints()
    renderLines()
    requestAnimationFrame(render)
}

document.onmousemove = (e) => {
    points[0] = {
        x: e.pageX,
        y: e.pageY
    }
}

setCanvasSize()
addPoints()
render()