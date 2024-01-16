import AddEditStyles from "./Styles";
export default function RadioButton(label , type, inputType, setType) {
    return (
        <TouchableOpacity style={inputType === type ? AddEditStyles.selected : AddEditStyles.unselected} 
                onPress = {  () => setType(type)  }>
                <Text style={AddEditStyles.buttonText}>{label}</Text>
        </TouchableOpacity>
    );
}