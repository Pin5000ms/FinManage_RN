import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import React, { useState } from 'react';
import colors from '../../config/colors';
import store from '../../redux/store'

import { SwitchIconSrc } from '../components/SwitchIconSrc';
import { accountAdded } from '../../redux/actionCreator';

const styles = StyleSheet.create({
      textInput: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        },
      Button: {
        backgroundColor: colors._2,
        margin: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
      },
      ButtonText: {
        textAlign: 'center',
        color: colors.uguisucha,
        fontWeight: 'bold',
      },
      selected: {
        backgroundColor: colors._1,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
      },

      unselected: {
        backgroundColor: colors._2,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
      },

      icon: {
        /*圖示大小*/
        width: 100,
        height: 100,
        /*圖示右側與文字的間隔*/
        marginLeft : 20,
        marginRight : 20,
        /*圓形圖示*/
      },
    });




function AddPage ({navigation}) {
    const [inputText, setText] = useState('');
    const [inputNumber, setNum] = useState(0);

    const [inputType, setType] = useState('bank');
    function RadioButton( {label , id}) {
      return (
        <TouchableOpacity style={inputType === id ? styles.selected : styles.unselected} 
                 onPress = {  () => setType(id)  }>
                  <Text>{label}</Text>
        </TouchableOpacity>
        
      );
    }
    
  
  

    return (
      <View>

        <View style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <RadioButton label={'銀行'} id={'bank'}></RadioButton>
            <RadioButton label={'現金'} id={'cash'} ></RadioButton>
            <RadioButton label={'股票'} id={'stock'} ></RadioButton>
          </View>
          <View style={{flexDirection: 'row'}}>
            <RadioButton label={'外幣'} id={'foreign'} ></RadioButton>
            <RadioButton label={'黃金'} id={'gold'} ></RadioButton>
            <RadioButton label={'數位'} id={'digit'} ></RadioButton>
          </View>
        </View>

        <View  style = {{flexDirection:'row', alignItems: 'center'}} >
          <View flex= {1} style = {{flexDirection:'row', justifyContent: 'center'}}>
            <Image
              style={styles.icon}
              source={SwitchIconSrc(inputType)} //根據option選擇Icon
            />
          </View>
          <View flex= {2} style = {{flexDirection:'column', justifyContent: 'center'}}>
            <TextInput
              style={styles.textInput}
              onChangeText={setText}
              placeholder="請輸入名稱"
            />
            <TextInput
              style={styles.textInput}
              onChangeText={setNum} 
              placeholder="價值"
              keyboardType="numeric"
              defaultValue = "0"
            />
          </View>
        </View>
        
        <TouchableOpacity style={styles.Button} onPress = {() => { 
          store.dispatch(accountAdded(inputText, inputNumber, inputType)),
          navigation.navigate('HomeStack') }  }>
          <Text style={styles.ButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress = {() => { 
          navigation.navigate('HomeStack') }  }>
          <Text style={styles.ButtonText}>Cancle</Text>
        </TouchableOpacity>
        
      </View>
    );
  
}

export default AddPage;