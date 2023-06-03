/* eslint-disable react/react-in-jsx-scope */
import {
  SafeAreaView, View, Text, Image, ActivityIndicator, Platform,
} from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { useState } from 'react';
import Button from '../../../components/Button/Button';
import { EmailInput } from '../../../components/InputText/InputText';
import forgotPasswordStyles from './forgotPassword.styles';
import { images, COLORS } from '../../../constants';
import {
  forgotPassword, isEmailValid, showToast, toastMessage,
} from '../../../utils';

function ForgotPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.bgPrimary },
          headerShadowVisible: false,
          headerTitle: '',
        }}
      />
      <View style={forgotPasswordStyles.container}>
        <Image
          source={images.forgot}
          resizeMode="contain"
          style={forgotPasswordStyles.image}
        />
        <View style={{ marginTop: 30 }}>
          <Text style={forgotPasswordStyles.headerText}>Reset Password</Text>
          <View style={{ marginTop: 30 }}>
            <Text style={forgotPasswordStyles.bodyText}>
              Please enter your email address and we will send you an email
              containing the instructions on how to reset your password.
            </Text>
            <Text style={forgotPasswordStyles.bodyText}>
              <Text style={forgotPasswordStyles.boldText}>Note</Text>
              : Use the email address you registered with.
            </Text>
          </View>
        </View>
        <View style={forgotPasswordStyles.inputContainer}>
          <EmailInput
            autoFocus
            placeholder="Enter your email address"
            handleOnChange={(text) => { setEmail(text); }}
            textValue={email}
          />
        </View>
        <View>
          <Button
            title="Reset Password"
            isDisabled={false}
            handlePress={async () => {
              if (isEmailValid(email)) {
                await forgotPassword(email, setIsLoading, router);
              } else if (Platform.OS === 'android') {
                showToast('Please enter a valid email address');
              } else {
                toastMessage('Please enter a valid email address', 'info');
              }
            }}
          />
          <Text style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{ isLoading ? <ActivityIndicator size="large" color={COLORS.btnColor} /> : null }</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ForgotPassword;
