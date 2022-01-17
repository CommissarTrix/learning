const App = Vue.createApp({
    data() {
        return {
            tickets: [],
            filtered_tabs_tickets: [],
            filtered_filters_tickets: [],
            filters: {
                all: true,
                bp: false,
                p1: false,
                p2: false,
                p3: false
            },
            cheap: true,
            fast: false,
            opt: false,
            searchId: '',
        }
    },
    methods: {
        async getSearch() {
            let res = await fetch('https://front-test.beta.aviasales.ru/search', {
                    method: "GET"
                })
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        this.searchId = data.searchId
                        console.log(this.searchId)
                        this.getTickets()
                    } else {
                        // МЫ В ДЕРЬМЕ
                        console.log(data.error)
                    }
                })
        },
        async getTickets() {
            let res = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${this.searchId}`, {
                    method: "GET"
                })
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        this.tickets = data.tickets
                        this.filtered_tabs_tickets = this.tickets
                        this.filterTabs()
                        this.filterFilters()
                    } else {
                        // МЫ В ДЕРЬМЕ
                        console.log(data.error)
                    }
                })
        },
        getTime(time, dur) {
            let now = new Date(time)
            let future = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + Math.floor(dur / 60), now.getMinutes() + Math.floor(dur % 60))
            return [
                [now.getHours(), now.getMinutes()],
                [future.getHours(), future.getMinutes()]
            ]
        },
        filterTabs() {
            if (this.cheap) {
                this.filtered_tabs_tickets = this.filtered_tabs_tickets.sort((a, b) => a.price > b.price ? 1 : -1)
            }
            if (this.fast) {
                this.filtered_tabs_tickets = this.filtered_tabs_tickets.sort((a, b) => a.segments[0].duration + a.segments[1].duration > b.segments[0].duration + b.segments[1].duration ? 1 : -1)
            }
            if (this.opt) {
                this.filtered_tabs_tickets = this.filtered_tabs_tickets.sort((a, b) => a.segments[0].duration + a.segments[1].duration + a.price > b.segments[0].duration + b.segments[1].duration + b.price ? 1 : -1)
            }
            this.filterFilters()
        },
        filterFilters() {
            if (Object.values(this.filters).indexOf(true) === -1) {
                this.filters.all = true
            }
            if (this.filters.all) {
                this.filtered_filters_tickets = this.filtered_tabs_tickets
            } else {
                this.filtered_filters_tickets = this.filtered_tabs_tickets.filter(el => {
                    let s0 = el.segments[0].stops.length
                    let s1 = el.segments[1].stops.length
                    if (this.filters.bp) {
                        if (s0 == 0 && s1 == 0) {
                            return true
                        }
                    }
                    if (this.filters.p1) {
                        if (s0 == 1 && s1 == 1) {
                            return true
                        }
                    }
                    if (this.filters.p2) {
                        if (s0 == 2 && s1 == 2) {
                            return true
                        }
                    }
                    if (this.filters.p3) {
                        if (s0 == 3 && s1 == 3) {
                            return true
                        }
                    }
                    return false
                })
            }
        },
    },
    mounted() {
        this.getSearch()

    },
})

App.mount('#app')