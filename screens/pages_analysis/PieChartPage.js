import { Text, View} from 'react-native';
import React, { useState } from 'react';
import store from '../../store/configureStore';
import {PieChart} from "react-native-chart-kit";


const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function transformData(inputData) {
  const result = inputData.map((item) =>(
  {
    name: item.name,
    val: item.value,
    color: randomColor(),
    legendFontColor: '#7F7F7F',
    legendFontSize: 15
  }
  ));
  return result;
}

function transformDataByType(inputData) {
  const datatmp = inputData.reduce((acc, curr) => {
    const {value, type } = curr;
    if (!acc[type]) {
      acc[type] = { name: type, sum: 0 };
    }
    acc[type].sum += value;
    return acc;
  }, {});

  const result = Object.values(datatmp).map((item) => ({
    name: item.name,
    sum: item.sum,
    color: randomColor(),
    legendFontColor: '#7F7F7F',
    legendFontSize: 15
  }));

  return result;
}

function PieChartPage() {


  const [data1,setData1] = useState(transformData(store.getState().accounts));

  const unsubscribe1 = store.subscribe(() => {
    setData1(
      transformData(store.getState().accounts)
    )
  })

  const [data2,setData2] = useState(transformDataByType(store.getState().accounts));

  const unsubscribe2 = store.subscribe(() => {
    setData2(
      transformDataByType(store.getState().accounts)
    )
  })

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Pie Chart Analysis by Account</Text>

          <PieChart
            data={data1}
            width={300}
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              absolute: true,
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="val"
            backgroundColor="transparent"
            paddingLeft="15"
          />
          

          <Text>Pie Chart Analysis by Type</Text>
          <PieChart
            data={data2}
            width={300}
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              absolute: true,
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            accessor="sum"
            backgroundColor="transparent"
            paddingLeft="15"
          />
      </View>
    );
  }

export default PieChartPage;