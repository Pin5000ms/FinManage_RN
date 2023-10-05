import { Text, View} from 'react-native';
import React, { useState } from 'react';
import store from '../../store/configureStore';
import {LineChart, PieChart} from "react-native-chart-kit";
import { Dimensions } from 'react-native';


var datepicked = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59)

const onDateChange = (date) => {
    datepicked = new Date(date)
    const year = datepicked.getFullYear()
    const month = datepicked.getMonth()
    const day = datepicked.getDate()
    datepicked = new Date(year, month, day, 23, 59, 59)
  }

function convertToDate(item) {
    const dateStr = item.timeStamp.split('-')[0]
    const timeStr = item.timeStamp.split('-')[1]
    const dateparts = dateStr.split('/'); // 將日期字串分割成 [月, 日, 年]
    const year = parseInt(dateparts[0]);
    const month = parseInt(dateparts[1]);
    const day = parseInt(dateparts[2]);
    const [time, period] = timeStr.split(" ");
    const [hours, minutes, seconds] = time.split(":");
    const date = new Date(year, month - 1, day, hours, minutes, seconds)
  return date;
}

function calculateTotalValue(targetDate) {
  // 將資料以 id 為鍵進行分組，取每個 id 最新的一筆資料
  const latestDataById = store.getState().assetHistory.reduce((result, item) => {
    if (!result[item.id] || new Date(item.timeStamp) > new Date(result[item.id].timeStamp) ) 
    {
      result[item.id] = item;
    }
    return result;
  }, {});

  const latestData = Object.values(latestDataById)

  const filteredData = latestData.filter(item => {
    const date = convertToDate(item)
    return date <= targetDate;
  });

  //選取日期之前的總資產
  const totalValue = filteredData.reduce((accumulator, item) => accumulator + item.value, 0);

  return totalValue/1000;
}

function XMonthAgoDate(datepicked, n){
  if(datepicked !== undefined){
    // 複製日期物件以免修改原始日期
    const oneMonthAgo = new Date(datepicked);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - n);

    // 複製日期物件以免修改上一個步驟的日期
    const lastDayOfLastMonth = new Date(oneMonthAgo);
    lastDayOfLastMonth.setMonth(lastDayOfLastMonth.getMonth() + 1, 0);
    return lastDayOfLastMonth;
  }
}

function XMonthAgoDateStr(datepicked, n){
  
  if(datepicked !== undefined){
    // 複製日期物件以免修改原始日期
    const oneMonthAgo = new Date(datepicked);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - n);

    // 複製日期物件以免修改上一個步驟的日期
    const lastDayOfLastMonth = new Date(oneMonthAgo);
    lastDayOfLastMonth.setMonth(lastDayOfLastMonth.getMonth() + 1, 0);
  

    if(n!=0){
      return lastDayOfLastMonth.getMonth() + 1 + '/31';
    }
    else{
      var curDate = new Date(datepicked);
      return curDate.getMonth() + 1 + '/' + curDate.getDate();
    }
  }
  
}

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

function OverViewPage() {
    //usestate 要放在function裡面
    const [chartdata, setChartData] = useState({
        labels: [XMonthAgoDateStr(datepicked,5),
                  XMonthAgoDateStr(datepicked,4),
                    XMonthAgoDateStr(datepicked,3),
                      XMonthAgoDateStr(datepicked,2),
                        XMonthAgoDateStr(datepicked,1),
                          XMonthAgoDateStr(datepicked,0)],
        datasets: [
          {
            data: [
              calculateTotalValue(XMonthAgoDate(datepicked, 5)),
              calculateTotalValue(XMonthAgoDate(datepicked, 4)),
              calculateTotalValue(XMonthAgoDate(datepicked, 3)),
              calculateTotalValue(XMonthAgoDate(datepicked, 2)),
              calculateTotalValue(XMonthAgoDate(datepicked, 1)),
              calculateTotalValue(datepicked)
            ]
          }
        ]
      });
      
    const updateChartData = () => {
    const newLabels = [
        XMonthAgoDateStr(datepicked, 5),
        XMonthAgoDateStr(datepicked, 4),
        XMonthAgoDateStr(datepicked, 3),
        XMonthAgoDateStr(datepicked, 2),
        XMonthAgoDateStr(datepicked, 1),
        XMonthAgoDateStr(datepicked, 0),
    ];

    const newData = [
        calculateTotalValue(XMonthAgoDate(datepicked, 5)),
        calculateTotalValue(XMonthAgoDate(datepicked, 4)),
        calculateTotalValue(XMonthAgoDate(datepicked, 3)),
        calculateTotalValue(XMonthAgoDate(datepicked, 2)),
        calculateTotalValue(XMonthAgoDate(datepicked, 1)),
        calculateTotalValue(datepicked),
    ];

    //利用setChartData更新圖表數據
    setChartData({
        labels: newLabels,
        datasets: [
        {
            data: newData,
        },
        ],
    });
    };

    //store發生變化時，呼叫updateChartData
    const unsubscribe = store.subscribe(() => {
    updateChartData()
    })


    const [data1,setData1] = useState(transformData(store.getState().accounts));

    const unsubscribe1 = store.subscribe(() => {
    setData1(
        transformData(store.getState().accounts)
    )
    })
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  
            <LineChart
              data={chartdata}
              width={Dimensions.get("window").width} // from react-native
              height={220}
              yAxisLabel="$"
              yAxisSuffix="k"
              yAxisInterval={1} // optional, defaults to 1
              chartConfig={{
                backgroundColor: "#e26a00",
                backgroundGradientFrom: "#fb8c00",
                backgroundGradientTo: "#ffa726",
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                  borderRadius: 16
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726"
                }
              }}
              bezier
              style={{
                marginVertical: 8,
                borderRadius: 16
              }}
            />

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
        </View>
      );

}

export default OverViewPage;