import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { lighterWhite, circleActive, lightWhite } from '../utils/Colors';
import {
  LineChart
} from 'react-native-chart-kit';

const LineChartCust = ({data, city}) => {
    return (
      <View style={styles.container}>
        <View>
          <Text
            style={styles.title}>
            {city}
          </Text>
          <LineChart
            data={data}
            width={Dimensions.get('window').width - 16}
            height={220}
            yAxisLabel={'°C'}
            chartConfig={{
              backgroundGradientFrom: lightWhite,
              backgroundGradientTo: circleActive,
              decimalPlaces: 2,
              color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.gradient}
          />
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    paddingTop: 10
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    padding: 16,
    marginTop: 16,
    color: lighterWhite,
    fontWeight: 'bold'
  },
  gradient: {
    marginVertical: 8,
    borderRadius: 6,
  }
});
export default LineChartCust;
