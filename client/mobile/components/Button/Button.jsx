/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Pressable, Text } from 'react-native';
import buttonStyles from './button.style';

export default function Button({ title, handlePress, isDisabled }) {
  return (
    <Pressable style={buttonStyles.container} onPress={handlePress} disabled={isDisabled}>
      <Text style={buttonStyles.btnText}>{ title }</Text>
    </Pressable>
  );
}
