const app = {
    data() {
        return {
            scene: 'sigin',
            modal: false,
            NotStaff: '',
            showNotPoints: false,
            NotPoint: 'Prikol Prikol',
            alertAnim_points: false,
            alertAnim_stuff: false,
            user_reg: {
                "full_name": '',
                "login": "",
                "password": "",
                "password_confirmation": ""
            },
            user_log: {
                "login": '',
                "password": ''
            },
            FnErrorMsg: false,
            LErrorMsg: false,
            PErrorMsg: false,
            PcErrorMsg: false,
            SlErrorMsg: false,
            SpErrorMsg: false,
            token: localStorage.getItem('token'),
            new_stuff: {
                'full_name': '',
                'photo': null
            },
            imgDrag: '',
            File: [],
            stuffList: '',
        }
    },
    methods: {
        async reg() {
            let res = await fetch('http://wsq-m3.skills17.ru/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    mode: 'cors',
                    body: JSON.stringify(this.user_reg)
                })
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        // МЫ ЗАРЕГАЛИСЬ УРА
                        console.log('Всё чики пуки')
                        this.scene = 'index'
                    } else {
                        // МЫ В ДЕРЬМЕ
                        this.FnErrorMsg = (data.error.errors.full_name) ? data.error.errors.full_name : false
                        this.LErrorMsg = (data.error.errors.login) ? data.error.errors.login : false
                        this.PErrorMsg = (data.error.errors.password) ? data.error.errors.password : false
                        this.PcErrorMsg = (data.error.errors.password_confirmation) ? data.error.errors.password_confirmation : false
                        console.log(data)
                        console.log(this.FnErrorMsg)
                    }
                })
        },
        async log() {
            if (this.token != null) {
                console.log('МОЖНО Я ВОЙДУ?')
                this.scene = 'index'
            } else {
                let res = await fetch('http://wsq-m3.skills17.ru/api/login', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(this.user_log)
                    })
                    .then(res => res.json())
                    .then(data => {
                        if (!data.error) {
                            // МЫ ВОШЛИ УРА
                            console.log('Всё чики пуки')
                            localStorage.setItem('token', data.data.token)
                            console.log(localStorage.getItem('token'))
                            this.scene = 'index'
                        } else {
                            // МЫ В ДЕРЬМЕ
                            this.SlErrorMsg = (data.error.errors.login) ? data.error.errors.login : false
                            this.SpErrorMsg = (data.error.errors.password) ? data.error.errors.password : false
                        }
                    })
            }
        },
        async getStuff() {
            let res = await fetch('http://wsq-m3.skills17.ru/api/staff', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.token
                    }
                })
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        //УРА
                        this.stuffList = data.data.items
                        console.log(this.stuffList)
                    } else {
                        // МЫ В ДЕРЬМЕ
                        console.log(data.error)
                    }
                })
        },
        async postStuff() {
            let fr = new FormData()
            fr.append('photo', this.File[0])
            fr.append('full_name', this.new_stuff.full_name)
            let res = await fetch('http://wsq-m3.skills17.ru/api/staff', {
                    method: "POST",
                    headers: {
                        'Authorization': 'Bearer ' + this.token
                    },
                    body: fr
                })
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        this.getStuff()
                        this.showNot_stuff()
                        this.showModal()
                        this.NotStaff = 'Employee added successfully!'
                    } else {
                        alert('Произошла ошибоЧка')
                        console.log(data.error)
                    }
                })

        },
        async getPoints() {
            let res = await fetch('http://wsq-m3.skills17.ru/api/points', {
                    method: "GET",
                    // headers: {
                    //     'Authorization': 'Bearer ' + this.token
                    // }
                })
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        //УРА
                        this.stuffList = data.data.items
                        console.log(this.stuffList)
                    } else {
                        // МЫ В ДЕРЬМЕ
                        console.log(data.error)
                    }
                })
        },
        // async postPoints() {
        //     let res = await fetch('http://wsq-m3.skills17.ru/api/points', {
        //             method: "POST",
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify()
        //         })
        //         .then(res => res.json())
        //         .then(data => {
        //             if (!data.error) {
        //                 // УРА

        //             } else {
        //                 // МЫ В ДЕРЬМЕ
        //                 alert('Произошла ошибоЧка')
        //                 console.log(data.error)
        //             }
        //         })
        // },
        dragFile(e) {
            this.File = e.dataTransfer.files;
            this.new_stuff.photo = window.URL.createObjectURL(this.File[0])
        },
        uploadFile(e) {
            this.File = e.target.files;
            this.new_stuff.photo = window.URL.createObjectURL(this.File[0])
        },
        showModal() {
            this.modal = !this.modal
            this.new_stuff.photo = null
            this.new_stuff.full_name = ''
        },
        nav(page) {
            this.scene = page
            if (this.scene == 'index') {
                this.getPoints()
            }
            if (this.scene == 'stuff') {
                this.getStuff()
            }
        },
        showNot_stuff() {
            this.showNotStaff = true
            setTimeout(() => this.alertAnim_stuff = true, 3000)
        },
        showNot_points() {
            this.showNotPoints = true
            setTimeout(() => this.alertAnim_points = true, 3000)
        },
        singThing() {
            this.showSigin = !this.showSigin
            this.showSingup = !this.showSingup
        },
    },
    mounted() {
        if (this.token) {
            this.scene = 'index'
            this.getPoints()
        } else {
            this.scene = 'sigin'
        }
    }

}
Vue.createApp(app).mount('#app')