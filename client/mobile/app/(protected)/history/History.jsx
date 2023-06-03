/* eslint-disable no-unused-expressions */
/* eslint-disable react/react-in-jsx-scope */
import {
  SafeAreaView, View, Text, Image, ActivityIndicator, Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import historyStyles from '../../../styles/history.styles';
import { images, COLORS } from '../../../constants';
import { GoalsInput, HistoryInput } from '../../../components/InputText/InputText';
import Button from '../../../components/Button/Button';
import styles from '../../../styles/index.styles';
import { createRecommendation, showToast, toastMessage } from '../../../utils';
import { useAuth } from '../../../context/auth';

function History() {
  const router = useRouter();
  const [history, setHistory] = useState('');
  const [goals, setGoals] = useState('');
  const { user } = useAuth();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isUserAvailable, setIsUserAvailable] = useState(false);
  useEffect(() => {
    (async () => {
      if (user) setUserData(user);
      if (userData) {
        setIsUserAvailable(true);
      } else {
        setIsUserAvailable(false);
      }
    })();
  }, [user]);

  const userId = userData?.id;
  const token = userData?.token;

  return (
    (isUserAvailable ? (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={historyStyles.container}>
          <View style={styles.profileContainer}>
            <View>
              <Image
                style={styles.profileImage}
                source={images.defaultProfile}
                resizeMode="contain"
              />
              <Text style={styles.profileText}>
                {userData?.firstName}
                {' '}
                {userData?.lastName}
              </Text>
            </View>
          </View>
          <View style={historyStyles.historyContainer}>
            <Text style={historyStyles.headerText}>
              Let&#39;s work on getting your lifestyle and health history and your goals.

            </Text>
            <HistoryInput
              handleOnChange={(text) => { text === '' ? setHistory('') : setHistory(text); }}
              textValue={history}
              autoFocus
              lines={5}
            />
            <GoalsInput
              handleOnChange={(text) => { text === '' ? setGoals('') : setGoals(text); }}
              textValue={goals}
              autoFocus={false}
              lines={5}
            />
          </View>
          <View style={historyStyles.buttonContainer}>
            <Button
              title="Submit"
              handlePress={async () => {
                if (history !== '' && goals !== '') {
                  await createRecommendation(history, goals, userId, token, setIsLoading, router);
                } else if (Platform.OS === 'android') {
                  showToast('Please fill in all fields so we can help you better');
                } else {
                  toastMessage('Please fill in all fields so we can help you better', 'info');
                }
              }}
              isDisabled={false}
            />
            <Text style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{ isLoading ? <ActivityIndicator size="large" color={COLORS.btnColor} /> : null }</Text>
          </View>
        </View>
      </SafeAreaView>
    ) : <View style={historyStyles.container}><Text style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{ isLoading ? <ActivityIndicator size="large" color={COLORS.btnColor} /> : null }</Text></View>)
  );
}

export default History;
