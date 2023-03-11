import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import React, { useState } from 'react';
import colors from '../../config/colors';

import store from '../../redux/store'
import {accountEdited} from '../../redux/actionCreator';

const styles = StyleSheet.create({
      textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        },
      editButton: {
        backgroundColor: colors.shironeri,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
      },
      editButtonText: {
        textAlign: 'center',
        color: colors.uguisucha,
        fontWeight: 'bold',
      },
    });


function EditPage ({route, navigation}) {
    const {Key} = route.params;
    const {Name} = route.params;
    const {Val} = route.params;
  
    const [text, setText] = useState(Name);
    const [number, setNum] = useState(Val);
  
  
    
    return (
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={setText}
          defaultValue={Name}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setNum} 
          defaultValue={`${Val}`}
          value = {number.toString()}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.editButton} onPress = {() => { 
          store.dispatch(accountEdited(Key, text, number)),
          navigation.navigate('HomeStack') }  }>
          <Text style={styles.editButtonText}>Save</Text>
        </TouchableOpacity>
        
      </View>
    );
  
}

export default EditPage;