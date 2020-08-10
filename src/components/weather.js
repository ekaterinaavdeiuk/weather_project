import React from "react";

const Weather = props => (
    <div className="infoWeath">
        {props.city &&
        <div>
            <p><span>Местоположение:</span> {props.city}, {props.country}</p>
            <p><span>Температура:</span> {props.temp}</p>
            <p><span>Давление:</span> {props.pressure}</p>
            <p><span>Заход солнца:</span> {props.sunset}</p>
        </div>
        }
        <p className="error">{props.error}</p>
    </div>
)

export default Weather;