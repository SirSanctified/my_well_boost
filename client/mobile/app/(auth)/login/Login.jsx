/* eslint-disable no-unused-expressions */
/* eslint-disable react/react-in-jsx-scope */
import {
  SafeAreaView, View, Text, Image, ActivityIndicator,
} from 'react-native';
import { useRouter, Link } from 'expo-router';
import { useState } from 'react';

import loginStyles from './login.styles';
import Button from '../../../components/Button/Button';
import { COLORS, images } from '../../../constants';
import { signIn } from '../../../utils';
import { useAuth } from '../../../context/auth';
import { EmailInput, PasswordInput } from '../../../components/InputText/InputText';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={loginStyles.container}>
        <Image
          source={images.login}
          resizeMode="contain"
          style={loginStyles.image}
        />
        <View style={loginStyles.textContainer}>
          <Text style={loginStyles.headerText}>Welcome Back</Text>
        </View>
        <View style={loginStyles.inputContainer}>
          <EmailInput
            autoFocus
            handleOnChange={(text) => { setEmail(text); }}
            textValue={email}
          />
          <PasswordInput
            placeholder="Your password"
            autoFocus={false}
            handleOnChange={(text) => { setPassword(text); }}
            textValue={password}
            password
          />
        </View>
        <View style={loginStyles.forgotPasswordContainer}>
          <Text style={loginStyles.linkText}><Link href="/forgotPassword/ForgotPassword" style={loginStyles.link}>Forgot password?</Link></Text>
        </View>
        <View style={loginStyles.buttonContainer}>
          <Button
            title="Sign in"
            isDisabled={false}
            handlePress={async () => {
              await signIn(email, password, login, setIsLoading, router);
            }}
          />
        </View>
        <Text style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{ isLoading ? <ActivityIndicator size="large" color={COLORS.btnColor} /> : null }</Text>
        <View style={loginStyles.bottomTextContainer}>
          <Text style={loginStyles.bottomText}>
            Don&#39;t have an account?
            <Link href="/signup/SignUp" style={loginStyles.linkText}>Register</Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Login;
