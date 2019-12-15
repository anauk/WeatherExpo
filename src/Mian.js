import React from 'react';
import {StyleSheet, View } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {primaryGradientArray} from './utils/Colors';
import Header from './components/Header'
import Input from "./components/Input";
import LineChartCust from "./components/LineChartCust";
import {API_KEY} from "./config";

export default class Main extends React.Component {
  state = {
    city: '',
    data: {
      labels: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"],
      datasets:[
        {
          data:[0, 0, 0, 0, 0, 0],
        }
]
    },
    loading: true,
    error: undefined
  };
  newInputValue = value => {
      this.setState({
        city: value,
      });
  };
  loadJson = async (url) => {
    let resp = await fetch(url)
    if(resp.status === 200){
      return resp.json()
    }
  }
  fetchCity = async () => {
    const { city }  = this.state
    return await this.loadJson(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&lang=ru&units=metric&APPID=${API_KEY}`)
  }
  handleCity = async (e) => {
      e.preventDefault()
    this.fetchCity()
          .then(response => {
            console.log(response, 'response')
            return response
          })
          .then(city => {
            console.log(city, 'CITY')
            const dailyData = city.list.filter(reading => reading.dt_txt.includes("18:00:00"))
            console.log(dailyData,'dailyData')
            const dataClone = {...this.state.data}
            const weeklyDay = dailyData.map(value => new Date(value.dt * 1000).toLocaleString('en', {weekday: 'long'}))
            const values = dailyData.map(value => Math.round((value.main.temp)))
            console.log(weeklyDay,'wekk')
            console.log(values,'value')
            dataClone.labels = weeklyDay
            dataClone.datasets[0].data = values
            dataClone.datasets[0].strokeWidth = 2
            console.log(dataClone,'dataClone')

            this.setState({
              data: dataClone,
              error: undefined,
              loading: false
            })
          })
          .catch(error => {
            console.log(error, 'error from catch')
            this.setState({
              error: alert('Such city does not exist! Try again!!!'),
              loading: false
            })
          })
  }
  render() {
    const { city, data } = this.state

    return (
      <View style={styles.main}>
        <LinearGradient
          colors={primaryGradientArray}
          style={{flex: 1}}>
          <View style={styles.centered}>
            <Header title='Weather'/>
          </View>
          <View style={styles.inputContainer}>
            <Input
              inputValue={city}
              onChangeText={this.newInputValue}
              onDoneAddItem={this.handleCity}
            />
          </View>
          {data ? <LineChartCust city={city} data={data}/> : null}
        </LinearGradient>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main: {
    flex: 1
  },
  container: {
    flex: 1
  },
  centered: {
    alignItems: 'center'
  },
  inputContainer: {
    marginTop: 40,
    paddingLeft: 15
  },
  containerIndicator: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  button: {
  },
  textButton: {
    fontSize: 34,
    color: '#f1a895',
    fontWeight: '500'
  }
});
