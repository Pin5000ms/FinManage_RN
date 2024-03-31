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
      { key: 'first', title: '趨勢' },
      { key: 'second', title: '比例' },
    ]);

    //客製化TabView的Header
    const renderTabBar = props => (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: colors._1 }}
        style={{ backgroundColor: colors._6, height: 40}} //加justifyContent: 'center', alignItems: 'center'字會不見
        renderLabel={({ route, focused, color }) => (
          <Text style={{ color: colors._1, fontSize:14, height:30}}>
              {route.title}
          </Text>
        )}
      />
    );
    

    return (
      // <TabView
      //   renderTabBar={renderTabBar}
      //   navigationState={{ index, routes }}
      //   renderScene={renderScene}
      //   onIndexChange={setIndex}
      //   initialLayout={{ width: layout.width }}
      //   swipeEnabled={false} //禁用滑動煥頁
      // />
      <LineChartPage/>
    );

}

export default OverViewPage;