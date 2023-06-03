/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { TextInput, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants';
import inputTextStyles from './inputText.styles';

export default function InputText({
  placeholder, handleOnChange, textValue, autoFocus, lines, password,
}) {
  return (
    <TextInput
      placeholder={placeholder}
      onChangeText={(text) => handleOnChange(text)}
      value={textValue}
      autoFocus={autoFocus}
      numberOfLines={lines || 1}
      style={inputTextStyles.input}
      secureTextEntry={!!password}
      autoCapitalize="none"
    />
  );
}

export function EmailInput({
  handleOnChange, textValue, autoFocus, lines, password,
}) {
  return (
    <View style={inputTextStyles.inputContainer}>
      <Fontisto name="email" size={20} color={COLORS.btnColor} />
      <InputText
        placeholder="Email Address"
        autoFocus={autoFocus}
        handleOnChange={handleOnChange}
        textValue={textValue}
        lines={lines}
        password={password}
      />
    </View>
  );
}

export function PasswordInput({
  placeholder, handleOnChange, textValue, autoFocus, lines, password,
}) {
  return (
    <View style={inputTextStyles.inputContainer}>
      <FontAwesome name="key" size={20} color={COLORS.btnColor} />
      <InputText
        placeholder={placeholder}
        autoFocus={autoFocus || false}
        handleOnChange={handleOnChange}
        textValue={textValue}
        password={password || false}
        lines={lines}
      />
    </View>
  );
}

export function CodeInput({
  placeholder, handleOnChange, textValue, autoFocus, lines, password,
}) {
  return (
    <View style={inputTextStyles.inputContainer}>
      <FontAwesome name="qrcode" size={20} color={COLORS.btnColor} />
      <InputText
        placeholder={placeholder}
        autoFocus={autoFocus || false}
        handleOnChange={handleOnChange}
        textValue={textValue}
        password={password || false}
        lines={lines}
      />
    </View>
  );
}

export function GenderInput({
  handleOnChange, textValue, autoFocus, lines, password,
}) {
  return (
    <View style={inputTextStyles.inputContainer}>
      <MaterialCommunityIcons name="gender-male-female" size={20} color={COLORS.btnColor} />
      <InputText
        placeholder="Gender"
        autoFocus={autoFocus || false}
        handleOnChange={handleOnChange}
        textValue={textValue}
        password={password || false}
        lines={lines}
      />
    </View>
  );
}

export function DobInput({
  handleOnChange, textValue, autoFocus, lines,
}) {
  return (
    <View style={inputTextStyles.inputContainer}>
      <MaterialCommunityIcons name="calendar" size={20} color={COLORS.btnColor} />
      <InputText
        placeholder="Date of Birth (YYYY-MM-DD)"
        autoFocus={autoFocus || false}
        handleOnChange={handleOnChange}
        textValue={textValue}
        password={false}
        lines={lines}
      />
    </View>
  );
}

export function FirstNameInput({
  handleOnChange, textValue, autoFocus, lines,
}) {
  return (
    <View style={inputTextStyles.inputContainer}>
      <FontAwesome name="user-o" size={20} color={COLORS.btnColor} />
      <InputText
        placeholder="First Name (must be more than 3 characters)"
        autoFocus={autoFocus || false}
        handleOnChange={handleOnChange}
        textValue={textValue}
        password={false}
        lines={lines}
      />
    </View>
  );
}

export function LastNameInput({
  handleOnChange, textValue, autoFocus, lines,
}) {
  return (
    <View style={inputTextStyles.inputContainer}>
      <FontAwesome name="user-o" size={20} color={COLORS.btnColor} />
      <InputText
        placeholder="Last Name (must be more than 3 characters)"
        autoFocus={autoFocus || false}
        handleOnChange={handleOnChange}
        textValue={textValue}
        password={false}
        lines={lines}
      />
    </View>
  );
}

export function HistoryInput({
  handleOnChange, textValue, autoFocus, lines,
}) {
  return (
    <View style={inputTextStyles.inputContainer}>
      <FontAwesome name="history" size={20} color={COLORS.btnColor} />
      <InputText
        placeholder="What is your current lifestyle like?"
        autoFocus={autoFocus || false}
        handleOnChange={handleOnChange}
        textValue={textValue}
        password={false}
        lines={lines}
      />
    </View>
  );
}

export function GoalsInput({
  handleOnChange, textValue, autoFocus, lines,
}) {
  return (
    <View style={inputTextStyles.inputContainer}>
      <FontAwesome name="bullseye" size={20} color={COLORS.btnColor} />
      <InputText
        placeholder="What are your health goals?"
        autoFocus={autoFocus || false}
        handleOnChange={handleOnChange}
        textValue={textValue}
        password={false}
        lines={lines}
      />
    </View>
  );
}
