import { Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import React, { useState } from 'react';
import { SwitchIconSrc } from '../../../components/SwitchIconSrc';
import AddEditStyles from '../../../components/Styles';
import { AddAccount, generateUniqueID } from '../../../components/Utility';
import Header from '../../../components/NavigationHeader';


function AccountAdd({navigation, type}){

  const [inputText, setText] = useState('')
  return (
    <>
    <View  style = {{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}} >
      <View style = {{flexDirection:'row', alignItems: 'center'}}>
        <TextInput flex = {1}
              style={AddEditStyles.textInput}
              onChangeText={setText}
              placeholder="請輸入名稱"
              value= {inputText}
            />
      </View>
    </View>
    <TouchableOpacity style={AddEditStyles.button} onPress = 
        {() => 
          { 
            AddAccount(generateUniqueID(), inputText, type)
            navigation.navigate('AssetPage');
          }  
        }>
        <Text style={AddEditStyles.buttonText}>Save</Text>
    </TouchableOpacity>
    <TouchableOpacity style={AddEditStyles.button} onPress = {() => { 
      navigation.navigate('AssetPage') }  }>
      <Text style={AddEditStyles.buttonText}>Cancle</Text>
    </TouchableOpacity>
    </>
  )
}


function AddPage ({navigation}) {

  const [inputType, setType] = useState('bank');
  function RadioButton( {label , type}) {
    return (
      <TouchableOpacity style={inputType === type ? AddEditStyles.selected : AddEditStyles.unselected} onPress = {() => setType(type)}>
        <Text style={AddEditStyles.buttonText}>{label}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <Header iconName={"plus"}  title="新增"></Header>

      <View style={{flexDirection: 'row', alignItems:'center'}}>
        <View flex= {1}>
          <Image
              style={AddEditStyles.icon}
              source={SwitchIconSrc(inputType)} //根據type選擇Icon
            />
        </View>
        <View flex= {2} style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <RadioButton label={'銀行'} type={'bank'} ></RadioButton>
            <RadioButton label={'現金'} type={'cash'} ></RadioButton>
            <RadioButton label={'股票'} type={'stock'} ></RadioButton>
          </View>
          <View style={{flexDirection: 'row'}}>
            <RadioButton label={'外幣'} type={'foreign'} ></RadioButton>
            <RadioButton label={'黃金'} type={'gold'} ></RadioButton>
            <RadioButton label={'數位'} type={'digit'} ></RadioButton>
          </View>
        </View>
      </View>

      <AccountAdd navigation={navigation} type={inputType}/>
      
    </View>
  );
  
}

export default AddPage;