/* eslint-disable no-unused-expressions */
/* eslint-disable react/react-in-jsx-scope */
import {
  View, Text, Image, Alert, ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import {
  DobInput, FirstNameInput, GenderInput, LastNameInput,
} from '../../../components/InputText/InputText';
import Button from '../../../components/Button/Button';
import { COLORS, images } from '../../../constants';

import profileDataStyles from './profileData.styles';
import { showToast, signUp, validateDob } from '../../../utils';

function ProfileData() {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { email, password } = useLocalSearchParams();

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={profileDataStyles.container}>
        <Image
          source={images.profileData}
          resizeMode="contain"
          style={profileDataStyles.image}
        />
        <View style={profileDataStyles.body}>
          <Text style={profileDataStyles.headertext}>Let us know you better</Text>
        </View>
        <View style={profileDataStyles.inputContainer}>
          <FirstNameInput
            handleOnChange={(text) => { text.trim() === '' ? setFirstName('') : setFirstName(text.trim()); }}
            textValue={firstName}
            autoFocus
          />
          <LastNameInput
            handleOnChange={(text) => { text.trim() === '' ? setLastName('') : setLastName(text.trim()); }}
            textValue={lastName}
          />
          <GenderInput
            handleOnChange={(text) => { text.trim() === '' ? setGender('') : setGender(text.trim()); }}
            textValue={gender}
          />
          <DobInput
            handleOnChange={(text) => { text.trim() === '' ? setDob('') : setDob(text.trim()); }}
            textValue={dob}
          />
        </View>
        <View style={profileDataStyles.buttonContainer}>
          <Button
            title="Submit"
            handlePress={async () => {
              if (
                firstName.length > 3 && lastName.length > 3 && gender.length > 3 && validateDob(dob)
              ) {
                // signup user
                await signUp(
                  firstName,
                  lastName,
                  email,
                  password,
                  dob,
                  gender,
                  setIsLoading,
                  router,
                );
              } else if (Platform.OS === 'android') {
                showToast('Please verify your details are valid and try again');
              } else {
                Alert.alert('', 'Please verify your details are valid and try again');
              }
            }}
            isDisabled={false}
          />
          <Text style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{ isLoading ? <ActivityIndicator size="large" color={COLORS.btnColor} /> : null }</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default ProfileData;
