import { Pressable, Text } from "react-native"
import { buttonStyles } from "./button.style"

export const Button = ({ title, handlePress }) => {
  return (
    <Pressable style={ buttonStyles.container } onPress={ handlePress }>
        <Text style={ buttonStyles.btnText }>{ title }</Text>
    </Pressable>
  )
}
