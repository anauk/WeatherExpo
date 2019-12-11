import React from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {
  LineChart
} from 'react-native-chart-kit';

export default class LineChartCust extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          {/*Example of Bezier LineChart*/}
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              padding: 16,
              marginTop: 16,
            }}>
            Weather
          </Text>
          <LineChart
            data={{
              labels: ['January', 'February', 'March', 'April'],
              datasets: [
                {
                  data: [20, 45, 28, 80, 99, 43],
                  strokeWidth: 2, // optional
                },
              ],
            }}
            width={Dimensions.get('window').width - 16} // from react-native
            height={220}
            yAxisLabel={'$'}
            chartConfig={{
              backgroundColor: '#1cc910',
              backgroundGradientFrom: '#eff3ff',
              backgroundGradientTo: '#efefef',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    paddingTop: 30
  },
});
