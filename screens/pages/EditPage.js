import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import React, { useState } from 'react';
import colors from '../../config/colors';
import store from '../../store/configureStore';
import {accountDeleted, accountEdited} from '../../store/account';
import { SwitchIconSrc } from '../components/SwitchIconSrc';



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
        borderRadius : 10
      },


    });


    

function EditPage ({route, navigation}) {
    const {Key} = route.params;
    const {Name} = route.params;
    const {Val} = route.params;
    const {Type} = route.params;
  
    const [inputText, setText] = useState(Name);
    const [inputNumber, setNum] = useState(Val);


    const [inputType, setType] = useState(Type);
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
              source={SwitchIconSrc(inputType)} //根據type選擇Icon
            />
          </View>
          <View flex= {2} style = {{flexDirection:'column', justifyContent: 'center'}}>
            <TextInput
              style={styles.textInput}
              onChangeText={setText}
              placeholder="請輸入名稱"
              defaultValue={Name}
            />
            <TextInput
              style={styles.textInput}
              onChangeText={setNum}  
              placeholder="價值"
              keyboardType="numeric"
              defaultValue = {inputNumber.toString()}
            />
          </View>
        </View>
        




        <TouchableOpacity style={styles.Button} onPress = {() => { 
          store.dispatch(accountEdited({key: Key,name: inputText,value: inputNumber,type: inputType})),
          navigation.navigate('HomeStack') }  }>
          <Text style={styles.ButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress = {() => { 
          store.dispatch(accountDeleted({key: Key})),
          navigation.navigate('HomeStack') }  }>
          <Text style={styles.ButtonText}>Delete</Text>
        </TouchableOpacity>
        
      </View>
    );
  
}

export default EditPage;