import getenv from "getenv.ts";
const fetch = require("node-fetch");

export class Weather
{
    #API_KEY = getenv.string("WEATHER_KEY");

    current = async (city: string) => {
        await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.#API_KEY).then(info => {
            return info.json();
        }).then(content => {
            return [{
                weat: content.weather[0].main,
                temp: (content.main.temp - 273.15).toFixed(2)
            }];
        }).catch(error => {
            console.log(error);
        });
    }

    futur = async (city: string, days: number = 7) => {
        await fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + this.#API_KEY).then(info => {
            return info.json();
        }).then(content => {
            let weather = [];
            content.list.forEach(element => {
                if (element.dt_txt.endsWith('12:00:00')) {
                    weather.push({
                        weat: element.weather[0].main,
                        temp: (element.main.temp - 273.15).toFixed(2)
                    });
                }
            });
            return weather;
        }).catch(error => {
            console.log(error);
        });
    }
}