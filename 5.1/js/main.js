let url = 'https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&appid=82f6e4e93ef9f6b021c0c9b2bd8b6459'

const app = {
    data(){
        return{
            recentCities: ['London','Kazan','Kaliningrad'],
            todayWeather: [
                {
                    temp: 29,
                    img: 'images/cloudy.png',
                    time: '15:00'
                },
                {
                    temp: 19,
                    img: 'images/cloudy.png',
                    time: '16:00'
                },
                {
                    temp: -1,
                    img: 'images/cloudy.png',
                    time: '17:00'
                },
                {
                    temp: 13,
                    img: 'images/cloudy.png',
                    time: '18:00'
                },
                {
                    temp: 40,
                    img: 'images/cloudy.png',
                    time: '19:00'
                }
            ],
            val: '',
            inputText: '',
            hum: '',
            temp:'',
            wind:'',
            now:'',
            today:'',
            imageSrc:'images/cloudy.png',
            errorMsg: ''
        }
    },
    methods: {
        async GetWeather(){
            this.url = `https://api.openweathermap.org/data/2.5/weather?q=${this.inputText}&units=metric&appid=a4116dbaeee398e8456d2ce44b4c1c19`
            let response = await fetch(this.url)
            if(!response.ok){
                alert('Введен неправильный город, извинись')
                this.errorMsg = 'error'
            }else{
                this.val = await response.json()
                this.errorMsg = ''
            }
        },
        async changeInfo(){
            await this.GetWeather()
            if(!this.val){
                alert('ТАКОГО ГОРОДА НЕТ')
            }else{
                this.recentCities.pop()
                this.recentCities.splice(0,0,this.inputText)
                this.hum = this.val.main.humidity
                this.temp = Math.round((this.val.main.temp_max + this.val.main.temp_min) / 2)
                this.wind = Math.round(this.val.wind.speed)

                this.now = new Date()
                this.today = [this.now.getDate(),0]
                switch(this.now.getMonth()){
                    case 0: this.today[1] = 'Янв'; break;
                    case 1: this.today[1] = 'Фев'; break;
                    case 2: this.today[1] = 'Март'; break;
                    case 3: this.today[1] = 'Апр'; break;
                    case 4: this.today[1] = 'Май'; break;
                    case 5: this.today[1] = 'Июнь'; break;
                    case 6: this.today[1] = 'Июль';  break;
                    case 7: this.today[1] = 'Авг'; break;
                    case 8: this.today[1] = 'Сент'; break;
                    case 9: this.today[1] = 'Окт'; break;
                    case 10: this.today[1] = 'Нояб'; break;
                    case 11: this.today[1] = 'Дек'; break;
                }
                this.changeImg()
            }
        },
        changeRecent(index){
            this.inputText = this.recentCities[index]
            this.changeInfo()
        },
        changeImg(){
            switch(this.val.weather[0].description){
                case 'overcast clouds': 
                case 'scattered clouds': this.imageSrc="images/cloudy2.png";
                break;
                case "clear sky": this.imageSrc="images/sunny.png";
                break;
                case "light rain": this.imageSrc="images/rain.png";
                break;
                default: this.imageSrc="images/cloudy.png";
            }
        }
    },
    mounted(){
        this.inputText = 'Moscow'
        this.changeInfo()
    }

}
Vue.createApp(app).mount('#app')