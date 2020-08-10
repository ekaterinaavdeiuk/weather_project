import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = '8ec1ae37fae10ed71d8422431fd7d9a7';

class App extends React.Component {
    state = {
        temp: undefined,
        city: undefined,
        country: undefined,
        sunrise: undefined,
        sunset: undefined,
        error: undefined
    }

    gettingWeather = async (e) => {
        e.preventDefault();

        const city = e.target.elements.city.value;
        const api_url = await
            fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await api_url.json();
        console.log(api_url);
        console.log(data);
        let sunset_date;
        console.log(data);
        if (!api_url.ok) {
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                pressure: undefined,
                sunset: undefined,
                error: 'Вы ввели несуществующий город'
            });
        } else {
            if (city) {
                let sunset = data.sys.sunset;
                let getTimeZone = new Date();
                let currentTimeZone = - getTimeZone.getTimezoneOffset() * 60 * 1000;
                const date = new Date(sunset * 1000 - (currentTimeZone - data.timezone * 1000));
                sunset_date = date.toLocaleTimeString();

                this.setState({
                    temp: data.main.temp,
                    city: data.name,
                    country: data.sys.country,
                    pressure: data.main.pressure,
                    sunset: sunset_date,
                    error: undefined
                })
            } else {
                this.setState({
                    temp: undefined,
                    city: undefined,
                    country: undefined,
                    pressure: undefined,
                    sunset: undefined,
                    error: 'Введите название города'
                });
            }
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 info">
                                <Info/>
                            </div>
                            <div className="col-sm-7 form">
                                <Form weatherMethod={this.gettingWeather}/>
                                <Weather
                                    temp={this.state.temp}
                                    city={this.state.city}
                                    country={this.state.country}
                                    pressure={this.state.pressure}
                                    sunset={this.state.sunset}
                                    error={this.state.error}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;