import { TextInput } from 'react-native'
import { inputTextStyles } from './inputText.styles'


const InputText = ({ placeholder, handleOnChange, textValue, autoFocus, lines, password }) => {
  return (
    <TextInput 
      placeholder={ placeholder }
      onChangeText={ (text) => handleOnChange(text) }
      value={ textValue }
      autoFocus={ autoFocus }
      numberOfLines={ lines ? lines : 1}
      style={ inputTextStyles.input}
      secureTextEntry={ password ? true : false }
      autoCapitalize='none'
    />
  )
}

export default InputText