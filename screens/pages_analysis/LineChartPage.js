import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import store from '../../store/configureStore';
// https://morioh.com/p/4d176b3d77be
// https://www.npmjs.com/package/react-native-calendar-picker
import { TouchableOpacity } from 'react-native-gesture-handler';

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

          </View>
            
        )
    }
};

export default LineChartPage;