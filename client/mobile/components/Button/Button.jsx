import { Pressable, Text } from "react-native"
import { buttonStyles } from "./button.style"

export const Button = ({ title, handlePress, isDisabled }) => {
  return (
    <Pressable style={ buttonStyles.container } onPress={ handlePress } disabled={isDisabled}>
        <Text style={ buttonStyles.btnText }>{ title }</Text>
    </Pressable>
  )
}
