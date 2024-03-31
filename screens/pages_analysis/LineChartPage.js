import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { LineChart } from 'react-native-chart-kit';
import { ScrollView, Dimensions } from 'react-native';
import store from '../../store/configureStore';
// https://morioh.com/p/4d176b3d77be
// https://www.npmjs.com/package/react-native-calendar-picker
import { TouchableOpacity } from 'react-native-gesture-handler';

import { getTotalSumByDate } from '../components/Utility';

let datepicked = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 23, 59, 59)


function XMonthAgoDate(datepicked, n){
  if(datepicked !== undefined){
    // 複製日期物件以免修改原始日期
    const oneMonthAgo = new Date(datepicked);
    // 將日期設置為下個月的第一天
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - n + 1, 1);

    // 減去一天
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 1);

    // 複製日期物件以免修改上一個步驟的日期
    const lastDayOfLastMonth = new Date(oneMonthAgo);

    return lastDayOfLastMonth;
  }
}

function XMonthAgoDateStr(datepicked, n){
  
  if(datepicked !== undefined){

    const lastDayOfLastMonth = XMonthAgoDate(datepicked, n)

    if(n!=0){
      return lastDayOfLastMonth.getMonth() + 1 + '/' + lastDayOfLastMonth.getDate();
    }
    else{
      let curDate = new Date(datepicked);
      return curDate.getMonth() + 1 + '/' + curDate.getDate();
    }
  }
  
}


const LineChartPage = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const handleShowCalendar = () => {setShowCalendar(!showCalendar);};

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
            getTotalSumByDate(XMonthAgoDate(datepicked, 5)),
            getTotalSumByDate(XMonthAgoDate(datepicked, 4)),
            getTotalSumByDate(XMonthAgoDate(datepicked, 3)),
            getTotalSumByDate(XMonthAgoDate(datepicked, 2)),
            getTotalSumByDate(XMonthAgoDate(datepicked, 1)),
            getTotalSumByDate(datepicked)
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
        getTotalSumByDate(XMonthAgoDate(datepicked, 5)),
        getTotalSumByDate(XMonthAgoDate(datepicked, 4)),
        getTotalSumByDate(XMonthAgoDate(datepicked, 3)),
        getTotalSumByDate(XMonthAgoDate(datepicked, 2)),
        getTotalSumByDate(XMonthAgoDate(datepicked, 1)),
        getTotalSumByDate(datepicked),
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


    const onDateChange = (date) => {
      datepicked = new Date(date)
      const year = datepicked.getFullYear()
      const month = datepicked.getMonth()
      const day = datepicked.getDate()
      datepicked = new Date(year, month, day, 23, 59, 59)
      updateChartData()
    }

    if (showCalendar)
    {
        return (
            <View>
                <TouchableOpacity style = {{borderRadius:5, elevation: 5, margin:20}} title="選擇日期" onPress={handleShowCalendar}>
                    <Text style = {{margin:20,textAlign: 'center'}}>選擇日期</Text>
                </TouchableOpacity>
                <CalendarPicker
                    weekdays={['日', '一', '二', '三', '四', '五', '六']}
                    months={['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']}
                    previousTitle="往前"
                    nextTitle="往後"
                    selectMonthTitle = '選擇月份 '
                    selectYearTitle = '選擇年份'
                    onDateChange={onDateChange}
                    style = {{borderRadius:10, elevation: 4, margin:20  }}/>
            </View>
            )
    }
    else
    {
        return(
          <View>

            <TouchableOpacity style = {{borderRadius:5, elevation: 5, margin:20}} title="選擇日期" onPress={handleShowCalendar}>
                <Text style = {{margin:20,textAlign: 'center'}}>選擇日期</Text>
            </TouchableOpacity>
            
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={true} // to hide scroll bar
              >
              
              <LineChart
                data={chartdata}
                width={chartdata.labels.length*Dimensions.get("window").width/6} // 一個畫面寬度放6個label
                height={220}
                //yAxisLabel="$"
                //yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                //withHorizontalLabels={false} // 移除Y軸標籤
                withDots={true}
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
                fromZero
                style={{
                  paddingRight:60, //移除Y軸標籤後，移除左邊的空白處 https://github.com/indiespirit/react-native-chart-kit/issues/90
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
            </ScrollView>


          </View>
            
        )
    }
};

export default LineChartPage;