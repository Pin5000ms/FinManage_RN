import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native';
import React, { useState } from 'react';
import colors from '../../config/colors';

import store from '../../redux/store'
import { accountAdded } from '../../redux/actionCreator';

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




function AddPage ({navigation}) {
    const [text, setText] = useState('');
    const [number, setNum] = useState(0);
    
    return (
      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={setText}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setNum} 
          value = {number.toString()}
          placeholder="useless placeholder"
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.editButton} onPress = {() => { 
            store.dispatch(accountAdded(text, number)), 
            navigation.navigate('HomeStack') }  
            }>
          <Text style={styles.editButtonText}>Save</Text>
        </TouchableOpacity>
        
      </View>
    );
  
}

export default AddPage;