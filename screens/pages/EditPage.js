import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import React, { useState } from 'react';
import colors from '../../config/colors';
import store from '../../store/configureStore';
import {accountDeleted, accountEdited} from '../../store/account';
import { SwitchIconSrc } from '../components/SwitchIconSrc';


const styles = StyleSheet.create({
      textInput: {
        height: 50,
        margin: 10,
        borderWidth: 1.5,
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
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
      },

      unselected: {
        backgroundColor: colors._2,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
      },

      icon: {
        /*圖示大小*/
        width: 100,
        height: 100,
        /*圖示右側與文字的間隔*/
        marginLeft : 10,
        marginRight : 10,
        /*圓形圖示*/
        borderRadius : 10
      },


    });


function SwitchNormalDetailEdit({navigation, id, Key, p1, p2}){

  const [inputText, setText] = useState(p1);
  const [inputValue, setVal] = useState(p2);
  const [inputAmount, setAmount] = useState(0);
  const [inputValPerUnit, setValPerUnit] = useState(0);

  const handleValChange = (value) => {
    var newValue = parseFloat(value)
    if(value === ''){
      newValue = 0;
    }
    setVal(newValue);
  };

  const handleAmountChange = (value) => {
    var newValue = parseFloat(value)
    if(value === ''){
      newValue = 0;
    }
    setAmount(newValue);
    
    const totalValue = value * inputValPerUnit;
    console.log(totalValue)
    setVal(totalValue);
  };

  const handleValPerUnitChange = (value) => {
    var newValue = parseFloat(value)
    if(value === ''){
      newValue = 0;
    }
    setValPerUnit(newValue);

    const totalValue = inputAmount * value;
    setVal(totalValue);
  };

  if (id == 'stock' || id == 'foreign' || id == 'gold' || id == 'digit')
  {
    return (
      <>
      <View  style = {{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}} >
        <View style = {{flexDirection:'row', alignItems: 'center'}}>
          <TextInput flex = {1}
                style={styles.textInput}
                onChangeText={setText}
                placeholder="請輸入名稱"
                defaultValue={p1}
              />
        </View>
      
        <View style = {{flexDirection:'row', alignItems: 'center'}}>
              <TextInput flex = {1}
                style={styles.textInput}
                onChangeText={handleValChange}  
                placeholder="總價值"
                keyboardType="numeric"
                value={inputValue.toString()}
              />
              <Text>=</Text>
              <TextInput flex = {1}
                style={styles.textInput}
                onChangeText={handleAmountChange}
                placeholder="數量"
                keyboardType="numeric"

              />
              <Text>x</Text>
              <TextInput flex = {1}
                style={styles.textInput}
                onChangeText={handleValPerUnitChange}  
                placeholder="價值/單位"
                keyboardType="numeric"

              />
        </View>
      </View>
      <TouchableOpacity style={styles.Button} onPress = {() => { 
          store.dispatch(accountEdited({key: Key, name: inputText,value: inputValue,type: id})),
          navigation.navigate('HomeStack') }  }>
          <Text style={styles.ButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Button} onPress = {() => { 
        store.dispatch(accountDeleted({key: Key})),
        navigation.navigate('HomeStack') }  }>
        <Text style={styles.ButtonText}>Delete</Text>
      </TouchableOpacity>
      </>
    )
    
  }
  else
  {
    return(
      <>
      <View  style = {{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}} >
        <View style = {{flexDirection:'row', alignItems: 'center'}}>
          <TextInput flex = {1}
                style={styles.textInput}
                onChangeText={setText}
                placeholder="請輸入名稱"
                defaultValue={p1}
              />
        </View>
      
        <View style = {{flexDirection:'row', alignItems: 'center'}}>
              <TextInput flex = {1}
                style={styles.textInput}
                onChangeText={handleValChange}  
                placeholder="總價值"
                keyboardType="numeric"
                value={inputValue.toString()}
              />
        </View>
      </View>
      <TouchableOpacity style={styles.Button} onPress = {() => { 
          store.dispatch(accountEdited({key: Key, name: inputText,value: inputValue,type: id})),
          navigation.navigate('HomeStack') }  }>
          <Text style={styles.ButtonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Button} onPress = {() => { 
        store.dispatch(accountDeleted({key: Key})),
        navigation.navigate('HomeStack') }  }>
        <Text style={styles.ButtonText}>Delete</Text>
      </TouchableOpacity>
      </>
      
    )
  }

}



function EditPage ({route, navigation}) {
    const {Key} = route.params;
    const {Name} = route.params;
    const {Val} = route.params;
    const {Type} = route.params;
  
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
        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <View flex= {1}>
            <Image
                style={styles.icon}
                source={SwitchIconSrc(inputType)} //根據type選擇Icon
              />
          </View>
          <View flex= {3} style={{flexDirection: 'column'}}>
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
        </View>

        <SwitchNormalDetailEdit navigation={navigation} id={inputType} Key={Key} p1={Name} p2={Val}/>
        
      </View>
    );
  
}

export default EditPage;