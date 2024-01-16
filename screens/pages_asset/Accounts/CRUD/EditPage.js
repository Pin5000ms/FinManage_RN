import {Text, View, TouchableOpacity, TextInput, Image} from 'react-native';
import React, { useState } from 'react';
import { SwitchIconSrc } from '../../../components/SwitchIconSrc';
import AddEditStyles from '../../../components/Styles';
import { EditAccount } from '../../../components/Utility';




function AccountEdit({navigation, id, name, type}){
  const [inputText, setText] = useState(name);
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
              EditAccount(id, inputText, type)
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



function EditPage ({route, navigation}) {
    const {id} = route.params;
    const {name} = route.params;
    const {type} = route.params;
    
  
    const [inputType, setType] = useState(type);
    function RadioButton(props) {
      return (
          <TouchableOpacity style={inputType === props.type ? AddEditStyles.selected : AddEditStyles.unselected} 
                 onPress = {  () => setType(props.type)  }>
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

        <AccountEdit navigation={navigation} id={id} name={name} type={inputType}/>
        
      </View>
    );
  
}

export default EditPage;