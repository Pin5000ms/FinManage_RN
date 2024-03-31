import {StyleSheet, Text, View, TouchableOpacity, Image, Dimensions} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import colors from '../../../config/colors';
import store from '../../../store/configureStore';

import { Swipeable } from 'react-native-gesture-handler';

import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
  } from 'react-native-popup-menu';
import { SwitchIconSrc } from '../../components/SwitchIconSrc';
import { Animated } from 'react-native';
import { DeleteAccount, getAccountHistoryByAccountId, getAccountSumByAccountId} from '../../components/Utility';
import { AssetTag, EditAccountTag, AccountDetailTag, EditRecordTag } from '../../components/NavigationTag';


const styles = StyleSheet.create({
    /*List中每個item的樣式 */
    container: {
      /*控制圖示及文字是以水平方式排列*/
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: colors.white,
      /*item中的物件與邊緣的間隔 */
      padding: 20,
      /*每個item的上下間隔 */
      marginVertical: 6,
      marginHorizontal: 10,
      borderRadius: 10,
      //shadowColor: colors.black,
      //shadowOffset: {
      //  width: 5,
      //  height: 5,
      //},
      //shadowOpacity: 0.5,
      //shadowRadius: 10,
      //elevation: 5,//每張卡片下要有陰影
    },
    menuContainer:{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        padding: 50,
        flexDirection: "column",
    },
    deleteBox: {
        flex:1,
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 6,
        width: 50
    },
    editBox: {
        flex:1,
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginVertical: 6,
        width: 50
    },
    itemContainer: {
        flexDirection:'column',
        width: Dimensions.get("window").width - 220
      },
    itemName: {
        fontSize: 16,
        color: colors.black,
      },
    itemValue: {
        fontSize: 20,
        fontWeight:'bold',
        color: colors._1,
    },
    itemTime: {
        alignSelf:'flex-end', //從下面開始排
        marginBottom: -10, //再往下10
        fontSize: 14,
        color: colors._6,
        width:80,
    },
    icon: {
      /*圖示大小*/
      width: 50,
      height: 50,
      /*圖示右側與文字的間隔*/
      marginRight : 20,
      /*圓形圖示*/
      borderRadius : 50,
    },

});


/*自定義元件，開頭必須大寫 */
export default function AccountData ({account, navigation}) {
    //curitem => account : {id, name, type}
    const toAccountDetailPage = ()=> navigation.navigate(AccountDetailTag,{account})

    const toEditAccountPage = ()=> navigation.navigate(EditAccountTag,{account})

    //右滑動作
    const swipeRight = (progress, dragX) =>{

        const scale = dragX.interpolate({
            inputRange: [-500, -100, 0, 100, 500],
            outputRange: [1, 1, 0.2, 1, 1],//大於100或小於-100都設為1
        });

        //右滑動作產生控件
        return (
            <>
                <Animated.View style ={ {transform:[{scale:scale}]}}>
                    <TouchableOpacity style = {styles.deleteBox} onPress={()=> DeleteAccount(account.id)}>
                        <Icon name = "trash" size={25} color ={colors._2} />
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style ={ {transform:[{scale:scale}]}}>
                    <TouchableOpacity style = {styles.editBox} onPress={toAccountDetailPage}>
                        <Icon name = "edit" size={25} color ={colors._2} />
                    </TouchableOpacity> 
                </Animated.View>
            </>
        )
    }

    //每個account內的項目數和餘額
    const [count, setCount] = useState(getAccountHistoryByAccountId(account.id).length);
    const [sum, setSum] = useState(getAccountSumByAccountId(account.id));

    //若store發生改變，觸發setCount、setSum事件
    const unsubscribe = store.subscribe(() => {
        setCount(getAccountHistoryByAccountId(account.id).length)
        setSum(getAccountSumByAccountId(account.id))
    })

    return (
        <View style={styles.container}>
            <View style = {{flexDirection:'row', alignItems: 'center', flex: 1}} >
                <TouchableOpacity 
                    style ={{flexDirection:'row', alignItems: 'center', flex:1}}
                    onPress={toAccountDetailPage}>
                    <Image style={styles.icon}
                        source={SwitchIconSrc(account.type)} //根據type選擇Icon
                    />
                    <View style={styles.itemContainer}>
                        <Text style={styles.itemName}> {account.id} </Text>
                        <Text style={styles.itemName}> {account.name} </Text>
                        <Text style={styles.itemName}> {account.type} </Text>
                        <Text style={styles.itemName}> 共有 {count} 筆項目 </Text>
                        <Text style={styles.itemName}> 帳戶餘額{sum} </Text>
                    </View>
                </TouchableOpacity>
                <Menu renderer={renderers.Popover}>
                    <MenuTrigger style={{width:20, height:20, justifyContent:'center', alignItems:'center', borderRadius:20, bottom:20}}>
                        <Icon name='ellipsis-v' style={{fontSize:16, color: colors.gray}} />
                    </MenuTrigger>
                    <MenuOptions customStyles={{
                            optionsContainer: {
                                borderRadius: 10,
                                padding:10,
                                width:100
                            },
                        }}>
                        <MenuOption onSelect={toEditAccountPage}>
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={{color: colors.green, marginHorizontal:10}}>編輯</Text>
                                <Icon style={styles.editdelete} name = "edit" size={16} color ={colors.green} />
                            </View>
                        </MenuOption>
                        <MenuOption onSelect={()=> DeleteAccount(account.id)} >
                            <View style={{flexDirection:'row', alignItems:'center'}}>
                                <Text style={{color: colors.red, marginHorizontal:10}}>刪除</Text>
                                <Icon style={styles.editdelete} name = "trash" size={16} color ={colors.red} />
                            </View>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        </View>

    );
  };
