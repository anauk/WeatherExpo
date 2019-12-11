import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import {primaryGradientArray} from './utils/Colors';
import Header from './components/Header'
import Input from "./components/Input";
import LineChartCust from "./components/LineChart";
const url = "http://api.openweathermap.org/data/2.5/group?id=2643741,2644688,2633352,2654675,2988507,2990969,2911298,2925535,2950159,3120501,3128760,5128581,4140963,4930956,5106834,5391959,5368361,5809844,4099974,4440906&appid=dbcaa66da67aa39ff0789a51fdf52524&units=metric"
export default class Main extends React.Component {
  state = {
    inputValue: '',
    data: null,
    loading: false
  };
  newInputValue = value => {
    this.setState({
      inputValue: value
    });
  };
  componentDidMount = () => {
    this.fetchData()
  }
  fetchData = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET'
      })
      const data = await response.json()
      const res = this.CreateWeatherJson(data)
      console.log(res, 'RES')
      this.setState({ data: res, loading: true })
    } catch (e) {
      console.warn('e', e)
      throw e
    }
  }
  CreateWeatherJson = (json) => {
    let newJson = "";
    for (let i = 0; i < json.list.length; i++) {
      let cityId = json.list[i].id;
      let cityName = json.list[i].name;
      let temp = json.list[i].main.temp
      newJson = newJson + "{";
      newJson = newJson + "\"cityId\"" + ": " + cityId + ","
      newJson = newJson + "\"cityName\"" + ": " + "\"" + cityName + "\"" + ","
      newJson = newJson + "\"temp\"" + ": " + temp + ","
      newJson = newJson + "},";
    }
    return "[" + newJson.slice(0, newJson.length - 1) + "]"
  }

  render() {
    const { inputValue, data } = this.state
    return (
      <View style={{flex: 1}}>
        <LinearGradient
          colors={primaryGradientArray}
          style={{flex: 1}}>
          <View style={styles.centered}>
            <Header title='Weather'/>
          </View>
          <View style={styles.inputContainer}>
            <Input inputValue={inputValue} onChangeText={this.newInputValue}/>
          </View>
          <LineChartCust />
        </LinearGradient>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centered: {
    alignItems: 'center'
  },
  inputContainer: {
    marginTop: 40,
    paddingLeft: 15
  }
});
