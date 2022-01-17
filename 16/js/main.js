const App = Vue.createApp({
    data() {
        return {
            canvas: null,
            ctx: null,
            line_type: 'round',
            line_color: '#000000',
            line_size: 5
        }
    },
    methods: {
        onload() {
            setTimeout(() => {
                this.canvas = this.$refs.canvas
                this.ctx = this.canvas.getContext('2d')
                this.setCanvasSize()
            }, 100)
        },
        setCanvasSize() {
            canvas.width = innerWidth - canvas.offsetLeft
            canvas.height = innerHeight - canvas.offsetTop - 80

        },
        clearCanvas() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        draw(e) {
            this.ctx.lineCap = this.line_type
            this.ctx.lineWidth = this.line_size
            this.ctx.strokeStyle = this.line_color
            var x = e.offsetX;
            var y = e.offsetY;
            var dx = e.movementX;
            var dy = e.movementY;
            if (e.buttons === 1) {
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
                this.ctx.lineTo(x - dx, y - dy);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        }
    },
    mounted() {
        this.onload()
    },
})

App.mount('#app')