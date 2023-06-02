/* eslint-disable react/react-in-jsx-scope */
import {
  SafeAreaView, View, Text, ActivityIndicator, Alert, Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import Button from '../../../components/Button/Button';
// eslint-disable-next-line import/named
import { CodeInput, PasswordInput } from '../../../components/InputText/InputText';
import { isPasswordSimilar, resetPassword, showToast } from '../../../utils';

import { COLORS } from '../../../constants';
import activationStyles from '../activation/activation.styles';

function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [resetCode, setResetCode] = useState('');
  const { userId } = useLocalSearchParams();
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={activationStyles.container}>
        <Text>
          Enter the 8-digit reset code you received with your email along with your new password. \
          Note that the reset code is case sensitive.
        </Text>
        <View>
          <CodeInput
            placeholder="Enter your password reset code"
            textValue={resetCode}
            handleOnChange={(text) => { setResetCode(text); }}
            autoFocus
          />
          <PasswordInput
            placeholder="Enter your new password"
            textValue={password}
            handleOnChange={(text) => { setPassword(text); }}
            autoFocus={false}
            password
          />
          <PasswordInput
            placeholder="Confirm your new password"
            textValue={password2}
            handleOnChange={(text) => { setPassword2(text); }}
            autoFocus={false}
            password
          />
        </View>
        <View style={{ marginTop: 30 }}>
          <Button
            title="Reset Password"
            isDisabled={false}
            handlePress={async () => {
              if (isPasswordSimilar(password, password2)) {
                await resetPassword(userId, resetCode, password, setIsLoading, router);
              } else if (Platform.OS === 'android') {
                showToast('Passwords must be similar');
              } else {
                Alert.alert('', 'Passwords must be similar');
              }
            }}
          />
          <Text style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{ isLoading ? <ActivityIndicator size="large" color={COLORS.btnColor} /> : null }</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default ResetPassword;
