import React, { useState } from 'react';
import { Text, View, Dimensions, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import PieChartPage from './PieChartPage';
import LineChartPage from './LineChartPage'
import colors from '../../config/colors';


const FirstRoute = () => (
  <LineChartPage/>
);

const SecondRoute = () => (
  <PieChartPage />
);

function OverViewPage() {

    
    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
    });
    

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'LineChart' },
      { key: 'second', title: 'PieChart' },
    ]);

    //客製化TabView的Header
    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: colors._2 }}
        style={{ backgroundColor: colors._1, height: 50}} //加justifyContent: 'center', alignItems: 'center'會出問題
        renderLabel={({ route, focused, color }) => (
          <Text style={{ color: color, fontSize:16}}>
              {route.title}
          </Text>
        )}
      />
    );
    

    return (
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    );

}

export default OverViewPage;