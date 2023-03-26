import colors from '../../config/colors';
import { StyleSheet } from 'react-native';

const AddEditStyles = StyleSheet.create({
    textInput: {
      height: 50,
      margin: 10,
      borderWidth: 1.5,
      borderRadius: 10,
      padding: 10,
      },
    button: {
      backgroundColor: colors._2,
      margin: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    buttonText: {
      textAlign: 'center',
      color: colors._3,
      fontWeight: 'bold',
    },

    selected: {
      backgroundColor: colors._1,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      margin: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
    },

    unselected: {
      backgroundColor: colors._2,
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      margin: 10,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
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

  export default AddEditStyles