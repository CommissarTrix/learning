const App = Vue.createApp({
    data() {
        return {
            dashboard_data: {
                "errors_last_3days": [{
                        "count": 2,
                        "code": 502
                    },
                    {
                        "count": 720,
                        "code": 599
                    },
                    {
                        "count": 1780,
                        "code": null
                    }
                ],
                "errors_yesterday": [{
                        "count": 615,
                        "code": null
                    },
                    {
                        "count": 305,
                        "code": 599
                    },
                    {
                        "count": 1305,
                        "code": 501
                    }
                ],
                "errors_last_hour": [{
                    "count": 615,
                    "code": 500
                }, {
                    "count": 1615,
                    "code": 502
                }],
                "data": [{
                    "bookings_current_last_3days": 7556,
                    "timeout_yesterday": 0.217542189065684,
                    "zeroes_yesterday": 5.03052033295241,
                    "avg_price_yesterday": 9447.87135852322,
                    "clicks_current_last_hour": 1264,
                    "avg_price_last_hour": 10243.0263157895,
                    "zeroes_last_hour": null,
                    "mobile_pessimizer": 0.000999999974737875,
                    "bookings_current_last_hour": 32,
                    "searches_current_last_3days": 4445192,
                    "bookings_previous_last_hour": 98,
                    "str_yesterday": 14.9289099526066,
                    "errors_yesterday": 0.376232384954177,
                    "ctr_last_hour": 0.640574721245229,
                    "gate_id": 20,
                    "ctr_yesterday": 1.06052388326287,
                    "searches_current_yesterday": 2188541,
                    "bookings_previous_last_3days": 8647,
                    "zeroes_last_3days": 5.55262854787825,
                    "clicks_previous_last_hour": 784,
                    "timeout_last_3days": 0.122851836321131,
                    "errors_last_3days": 0.143953287057117,
                    "bookings_previous_yesterday": 3641,
                    "searches_previous_yesterday": 2050500,
                    "searches_previous_last_hour": 88385,
                    "str_last_hour": null,
                    "clicks_previous_yesterday": 23364,
                    "avg_price_last_3days": 10694.8964067661,
                    "searches_current_last_hour": 66815,
                    "web_pessimizer": 100.0,
                    "ctr_last_3days": 1.12946752356254,
                    "clicks_previous_last_3days": 60505,
                    "str_last_3days": 15.0496942657398,
                    "timeout_last_hour": null,
                    "clicks_current_last_3days": 50207,
                    "bookings_current_yesterday": 3465,
                    "searches_previous_last_3days": 6118984,
                    "errors_last_hour": null,
                    "clicks_current_yesterday": 23210
                }]
            },
            active_filer: 'last_hour',
            errors: {
                '500': null,
                '501': null,
                '502': null,
                Other: null,
            },
            errors_counts: {
                '500': 0,
                '501': 0,
                '502': 0,
                Other: 0,
            },
            searches_current: 0,
            searches_previous: 0,
            clicks_current: 0,
            clicks_previous: 0,
            bookings_current: 0,
            bookings_previous: 0.
        }
    },
    methods: {
        calc() {
            let sum = 0
            for (let key in this.errors_counts) {
                sum += this.errors_counts[key]
            }
            for (let key1 in this.errors) {
                for (let key2 in this.errors_counts) {
                    if (key1 === key2) {
                        this.errors[key1].style.width = this.errors_counts[key2] / sum * 100 + '%'
                    }
                }

            }
        },
        filter(value) {
            for (let key in this.errors_counts) {
                this.errors_counts[key] = 0
            }
            this.active_filer = value
            for (let i = 0; i < this.dashboard_data[`errors_${value}`].length; i++) {
                for (let key in this.errors_counts) {
                    if (key == 'Other' &&
                        this.dashboard_data[`errors_${value}`][i].code != 500 &&
                        this.dashboard_data[`errors_${value}`][i].code != 501 &&
                        this.dashboard_data[`errors_${value}`][i].code != 502) {
                        this.errors_counts[key] += this.dashboard_data[`errors_${value}`][i].count
                    }
                    if (parseInt(key) == this.dashboard_data[`errors_${value}`][i].code) {
                        this.errors_counts[key] = this.dashboard_data[`errors_${value}`][i].count
                    }
                }
            }
            this.clicks_current = this.dashboard_data.data[0][`clicks_current_${value}`] ? this.dashboard_data.data[0][`clicks_current_${value}`] : 0
            this.clicks_previous = this.dashboard_data.data[0][`clicks_previous_${value}`] ? this.dashboard_data.data[0][`clicks_previous_${value}`] : 0
            this.searches_current = this.dashboard_data.data[0][`searches_current_${value}`] ? this.dashboard_data.data[0][`searches_current_${value}`] : 0
            this.searches_previous = this.dashboard_data.data[0][`searches_previous_${value}`] ? this.dashboard_data.data[0][`searches_previous_${value}`] : 0
            this.bookings_current = this.dashboard_data.data[0][`bookings_current_${value}`] ? this.dashboard_data.data[0][`bookings_current_${value}`] : 0
            this.bookings_previous = this.dashboard_data.data[0][`bookings_previous_${value}`] ? this.dashboard_data.data[0][`bookings_previous_${value}`] : 0
            this.calc()
        },
    },
    mounted() {
        this.errors['500'] = this.$refs.error500
        this.errors['501'] = this.$refs.error501
        this.errors['502'] = this.$refs.error502
        this.errors.Other = this.$refs.errorOther
        this.filter("last_hour")
    },
})

App.mount('#app')