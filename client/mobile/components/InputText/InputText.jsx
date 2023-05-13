import { TextInput } from 'react-native'
import { inputTextStyles } from './inputText.styles'


const InputText = ({ placeholder, handleOnChange, textValue, autoFocus }) => {
  return (
    <TextInput 
      placeholder={ placeholder }
      onChange={ handleOnChange }
      value={ textValue }
      autoFocus={ autoFocus }
      style={ inputTextStyles.input}
    />
  )
}

export default InputText