const App = Vue.createApp({
    data() {
        return {
            passes: [{
                    name: 'Roma',
                    photo: 'images/1.jpeg',
                    data: 'Unlimited'
                },
                {
                    name: 'Prikoller',
                    photo: 'images/2.jpeg',
                    data: '20.11.2021'
                }
            ],
            File: [],
            new_pass: {
                name: '',
                photo: '',
                data: ''
            },
            unlimited: false,
            scene: "FirstStep",
        }
    },
    methods: {
        AddPass() {
            if (this.new_pass.name != '' || this.new_pass.photo != '' || this.new_pass.data != '') {
                this.passes.push(this.new_pass)
                this.new_pass = { name: '', photo: '', data: '' }
                alert('Дурачок добавлен!')
            } else {
                alert('Где-то ошибОчка')
            }
            this.scene = 'FirstStep'
        },
        dragFile(e) {
            this.File = e.dataTransfer.files;
            this.new_pass.photo = window.URL.createObjectURL(this.File[0])
            console.log(this.new_pass.photo)
        },
        uploadFile(e) {
            this.File = e.target.files;
            this.new_pass.photo = window.URL.createObjectURL(this.File[0])
            console.log(this.new_pass.photo)
        },
        checkboxInput() {
            if (this.unlimited == false) {
                this.unlimited = true;
                this.new_pass.data = 'Unlimited'
            } else {
                this.unlimited = false
                console.log('Должна быть дата ' + this.new_pass.data)
            }
        }
    },
    mounted() {
        this.$refs.Oleg.value = 4124214124
    }
})

App.mount('#app')