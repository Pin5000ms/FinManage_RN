import {Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import React, { useState } from 'react';
import { SwitchIconSrc } from '../../../components/SwitchIconSrc';
import AddEditStyles from '../../../components/Styles';
import { EditAccount } from '../../../components/Utility';



function EditPage ({navigation, route}) {
    
    const {account} = route.params;
    
    const id = account.id
    const name = account.name
    const type = account.type

    const [inputType, setType] = useState(type);
    const [inputName, setName] = useState(name);

    function RadioButton(props) {
      return (
        <TouchableOpacity style={inputType === props.type ? AddEditStyles.selected : AddEditStyles.unselected} onPress = {() => setType(props.type)}>
          <Text style={AddEditStyles.buttonText}>{props.label}</Text>
        </TouchableOpacity>
      );
    }

    
    return (
      <View flex= {1}>

        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <View flex= {1}>
            <Image
                style={AddEditStyles.icon}
                source={SwitchIconSrc(inputType)} //根據type選擇Icon
              />
          </View>
          <View flex= {1} style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row'}}>
              <RadioButton label={'銀行'} type={'bank'}></RadioButton>
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

        <View  style = {{flexDirection:'column', justifyContent: 'center', alignItems: 'center'}} >
          <View style = {{flexDirection:'row', alignItems: 'center'}}>
            <TextInput flex = {1}
                  style={AddEditStyles.textInput}
                  onChangeText={setName}
                  placeholder="請輸入名稱"
                  value= {inputName}
                />
          </View>
        </View>


        {/* 儲存 */}
        <TouchableOpacity style={AddEditStyles.button} onPress = 
            {() => 
              { 
                EditAccount(id, inputName, inputType)
                navigation.goBack();
              }  
            }>
            <Text style={AddEditStyles.buttonText}>Save</Text>
        </TouchableOpacity>

        {/* 取消 */}
        <TouchableOpacity style={AddEditStyles.button} onPress = {() => { 
          navigation.goBack() }  }>
          <Text style={AddEditStyles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        
      </View>
    );
  
}

export default EditPage;