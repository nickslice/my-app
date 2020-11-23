import React from 'react';
import Info from './components/info';
import Form from './components/form';
import Weather from './components/weather';
// import Example from './components/weather';
import logo from './logo.svg';
import clouds from './clouds.svg';
import './App.css';
const MY_KEY = 'bda543e5629a98642aa8195f41ad407b';

class App extends React.Component {

  state = {
    temp: undefined,
    temp_max: undefined,
    temp_min: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined
  }


  getWeather = async (e) => {
    e.preventDefault();
    let city = e.target.elements.city.value;
    
    if(city) {
      const api_url = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${MY_KEY}&units=metric`);
      const data = await api_url.json();
      let sunset = data.sys.sunset;
      let date = new Date();
      date.setTime(sunset);
      let sunsetDate = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      this.setState({
        temp: data.main.temp,
        temp_max: data.main.temp_max,
        temp_min: data.main.temp_min,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunset: sunsetDate,
        error: undefined
      });
    } else {
      this.setState({
        temp: undefined,
        temp_max: undefined,
        temp_min: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: 'Enter your city'
      });
    }
  }  
  render() {
    return(
      <div className="App">
        <div className="App-container">
          <div className="App-pictures">
            <img src={logo} className="App-logo" alt="logo" />
            <img src={clouds} className="App-clouds" alt="logo" />
          </div>
          <Info />
          <Form weatherMethod={this.getWeather} />
          <Weather 
            temp={this.state.temp}
            temp_max={this.state.temp_max}
            temp_min={this.state.temp_min}
            city={this.state.city}
            country={this.state.country}
            pressure={this.state.pressure}
            sunset={this.state.sunset}
            error={this.state.error}
          />
        </div>
      </div>
    );
  }
}

export default App;