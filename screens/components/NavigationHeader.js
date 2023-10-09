import { View, Text} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../config/colors';

export default function Header({ iconName, title }) {
    const insets = useSafeAreaInsets();//避免蓋到手機上方狀態列
    return (
      //在此處 Icon的 fontSize可以控制Icon大小
      <View style={{ 
        flexDirection: 'column', 
        justifyContent: 'flex-start',
        height: 70,
        backgroundColor: colors._6,
        // paddingTop: insets.top,//避免蓋到手機上方狀態列
        // paddingBottom: insets.bottom,
        // paddingLeft: insets.left,
        // paddingRight: insets.right,
        }}>
        <View style={{height: insets.top, backgroundColor: colors._6}}/>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', paddingTop : 5}}>
          {/* <Icon name={iconName} style={{color: colors.gray,  marginHorizontal: 10, fontSize:20, justifyContent: 'center', alignItems: 'center'}} />  */}
          <Text style={{fontSize:20, color: colors.gray, marginHorizontal: 10, marginBottom:5}}>{title}</Text>
        </View>
      </View>
    );
}

