import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
// https://morioh.com/p/4d176b3d77be
// https://www.npmjs.com/package/react-native-calendar-picker
import { TouchableOpacity } from 'react-native-gesture-handler';

const onDateChange = (date) => {
    console.log(date)
  }


const LineChartPage = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const handleShowCalendar = () => {setShowCalendar(!showCalendar);};
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
            <TouchableOpacity style = {{borderRadius:5, elevation: 5, margin:20}} title="選擇日期" onPress={handleShowCalendar}>
                <Text style = {{margin:20,textAlign: 'center'}}>選擇日期</Text>
            </TouchableOpacity>
        )
    }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    selectedDateText: {
      fontSize: 18,
      marginTop: 20,
    },
  });

export default LineChartPage;