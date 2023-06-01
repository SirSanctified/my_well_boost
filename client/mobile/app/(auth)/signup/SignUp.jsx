/* eslint-disable react/react-in-jsx-scope */
import {
  View, Text, SafeAreaView, Image,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { EmailInput, PasswordInput } from '../../../components/InputText/InputText';
import Button from '../../../components/Button/Button';
import signUpStyles from './signup.style';
import { images } from '../../../constants';
import { areCredentialsValid } from '../../../utils';

function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={signUpStyles.container}>
        <Image
          source={images.signup}
          resizeMode="contain"
          style={signUpStyles.image}
        />
        <View>
          <Text style={signUpStyles.headerText}>Welcome to MyWellBoost</Text>
        </View>
        <EmailInput
          handleOnChange={(text) => {
            setEmail(text);
          }}
          textValue={email}
          password={false}
          autoFocus
        />
        <PasswordInput
          placeholder="Password (must be 8 characters or more)"
          handleOnChange={(text) => { setPassword(text); }}
          textValue={password}
          password
        />
        <PasswordInput
          placeholder="Confirm Password"
          handleOnChange={(text) => { setConfirmPass(text); }}
          textValue={confirmPass}
          password
        />
        <View style={signUpStyles.button}>
          <Button
            title="Register"
            handlePress={async () => {
              if (areCredentialsValid(email, password, confirmPass)) {
                router.push({
                  pathname: '/disclaimer/Disclaimer',
                  params: { email, password },
                });
              } else {
                setPassword('');
                setConfirmPass('');
              }
            }}
            isDisabled={false}
          />
        </View>
        <View style={signUpStyles.bottomText}>
          <Text>
            Already have an account?
            <Link href="/login/Login" style={signUpStyles.linkText}>Sign in</Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SignUp;
