import React from "react";

const Form = props => (
    <form onSubmit={props.weatherMethod}>
        <input type="text" name="city" placeholder="Город"/>
        <div className="button"><button>Получить погоду</button></div>
    </form>
)

export default Form;