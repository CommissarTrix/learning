const App = Vue.createApp({
    data() {
        return {
            TS: 'OMS',
            data: [{
                sp: '1234 12345678',
                ts: 'DMS',
                date: '14.08.2020',
                sk: 'СК МЕД-АСКЕР',
                tel: '8 (495) 123-45-67'
            }, {
                sp: '9876 543210',
                ts: 'OMS',
                date: '15.08.2021',
                sk: 'СК МЕД-АСКЕР',
                tel: '8 (495) 123-45-67'
            }, {
                sp: '1234-123456-78',
                ts: 'DMS',
                date: '16.08.2022',
                sk: 'СК Рандеву',
                tel: '8 (499) 123-45-68'
            }, {
                sp: '98-76 5432-10',
                ts: 'OMS',
                date: '24.11.2023',
                sk: 'СК Рандеву',
                tel: '8 (499) 123-45-68'
            }, {
                sp: '12-341234-5678',
                ts: 'DMS',
                date: '25.11.2024',
                sk: 'Страх-трах',
                tel: '8 (812) 123-45-69'
            }, {
                sp: '9876-543210',
                ts: 'OMS',
                date: '26.11.2025',
                sk: 'Страх-трах',
                tel: '8 (812) 123-45-69'
            }],
            services: [{
                name: 'Первичный приём врача-стоматолога терапевта',
                status: 'ok',
                id: '1'
            }, {
                name: 'Полирование челюсти',
                status: 'ok',
                id: '2'
            }, {
                name: 'Снятие камней с 1 зуба',
                status: 'ok',
                id: '3'
            }, {
                name: 'Рентген верхней и нижней челюстей',
                status: 'ok',
                id: '4'
            }, {
                name: 'МРТ грудной клетки',
                status: 'ok',
                id: '5'
            }, {
                name: 'МРТ челюсти',
                status: 'notok',
                id: '6'
            }, {
                name: 'Рентген грудной клетки',
                status: 'notok',
                id: '7'
            }, {
                name: 'Исследование функции внешнего дыхания',
                status: 'notok',
                id: '8'
            }, {
                name: 'Денситометрия',
                status: 'notok',
                id: '9'
            }, {
                name: 'МРТ головного мозга',
                status: 'notok',
                id: '10'
            }, ],
            input_polis: '',
            input_sk: '',
            input_service: '',
            temp_service: '',
            inputed_services: [],
            showSK: false,
            showServices: false,
            checked: false,
            check_polis: false,
            check_sk: false,
            SK_tel: '',
            date_polis: '',
            scene: 'main',
        }
    },
    methods: {
        unfocusSK() {
            setTimeout(() => {
                this.showSK = false
            }, 150)
        },
        unfocusServices() {
            setTimeout(() => {
                this.showServices = false
            }, 150)
        },
        addService(id) {
            for (let i = 0; i < this.services.length; i++) {
                if (this.services[i].id == id) {
                    for (let k = 0; k < this.inputed_services.length; k++) {
                        if (this.inputed_services[k].id == id) {
                            return
                        }
                    }
                    this.inputed_services.push(this.services[i])
                }
            }
        },
        removeService(id) {
            this.inputed_services = this.inputed_services.filter(el => el.id != id)
        },
        filterTS() {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].sp.includes(this.input_polis)) {
                    this.TS = this.data[i].ts
                }
            }
        },
        filterServices() {
            if (!this.input_service) {
                this.temp_service = this.services
            } else {
                this.temp_service = this.services.filter(el => el.name.toLowerCase().includes(this.input_service.toLowerCase()))
            }
        },
        check() {
            this.checked = true
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].sk == this.input_sk) {
                    this.check_sk = true
                    this.SK_tel = this.data[i].tel
                }
            }
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].sp.split(/[.,\/ -]/).join('') == this.input_polis.split(/[.,\/ -]/).join('') &&
                    this.data[i].sk == this.input_sk) {
                    this.check_polis = true
                    this.date_polis = this.data[i].date

                    console.log('полис подошел')
                    console.log(this.date_polis)
                }
            }
            if (this.check_polis == false) {
                this.scene = 'error'
                console.log(this.scene)
            }
        },
        uncheck() {
            this.checked = false
            this.check_polis = false
            this.check_sk = false
            this.inputed_services = []
            this.input_polis = ''
            this.input_sk = ''
            this.input_service = ''
            this.scene = 'main'
        }
    },
    mounted() {
        this.filterServices()
    },
})

App.mount('#app')