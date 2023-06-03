/* eslint-disable no-unused-expressions */
/* eslint-disable react/react-in-jsx-scope */
import {
  SafeAreaView, View, Text, ActivityIndicator, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import Button from '../../../components/Button/Button';
import { CodeInput } from '../../../components/InputText/InputText';
import { activate, showToast, toastMessage } from '../../../utils';

import { COLORS } from '../../../constants';
import activationStyles from './activation.styles';

function Activation() {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={activationStyles.container}>
        <Text>
          Enter the 8-digit activation code you received from your email in the textbox below
        </Text>
        <View style={{ marginVertical: 16 }}>
          <CodeInput
            placeholder="Enter your activation code"
            textValue={token}
            handleOnChange={(text) => { text?.trim() ? setToken(text.trim()) : setToken(''); }}
            autoFocus
          />
        </View>
        <View>
          <Button
            title="Activate Account"
            isDisabled={false}
            handlePress={async () => {
              if (token.length === 8) {
                await activate(token, setIsLoading, router);
              } else if (Platform.OS === 'android') {
                showToast('The token must be 8 characters long');
              } else {
                toastMessage('The token must be 8 characters long', 'info');
              }
            }}
          />
          <Text style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{ isLoading ? <ActivityIndicator size="large" color={COLORS.btnColor} /> : null }</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Activation;
