/* eslint-disable no-unused-expressions */
import {
  SafeAreaView, ScrollView, Text, View, Image, Pressable, ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../../../context/auth';
import {
  deleteProfile, getHistory, isEmailValid, updateProfile, validateDob,
} from '../../../utils';
import styles from '../../../styles/index.styles';
import accountStyles from '../../../styles/account.style';
import { images, COLORS } from '../../../constants';
import {
  DobInput, EmailInput, FirstNameInput, GenderInput, GoalsInput, HistoryInput, LastNameInput,
} from '../../../components/InputText/InputText';

function Account() {
  const { logout, update, user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setlastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [gender, setGender] = useState(user?.gender);
  const [dateOfBirth, setDateofBirth] = useState(user?.dateOfBirth);
  const [history, setHistory] = useState('');
  const [goals, setGoals] = useState('');
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await getHistory(user?.id, user?.token, setIsLoading, setHistory, setGoals);
    })();
  }, [user]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, backgroundColor: COLORS.bgPrimary }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
        <View style={accountStyles.container}>
          <View style={styles.profileContainer}>
            <View>
              <Image
                style={styles.profileImage}
                source={images.defaultProfile}
                resizeMode="contain"
              />
              <Text style={styles.profileText}>
                {user?.email}
              </Text>
            </View>
          </View>
          <View style={accountStyles.inputContainer}>
            <FirstNameInput
              handleOnChange={(text) => { text === '' ? setFirstName('') : setFirstName(text); }}
              textValue={firstName}
            />
            <LastNameInput
              handleOnChange={(text) => { text === '' ? setlastName('') : setlastName(text); }}
              textValue={lastName}
            />
            <EmailInput
              handleOnChange={(text) => { text === '' ? setEmail('') : setEmail(text); }}
              textValue={email}
            />
            <GenderInput
              handleOnChange={(text) => { text === '' ? setGender('') : setGender(text); }}
              textValue={gender}
            />
            <DobInput
              handleOnChange={(text) => { text === '' ? setDateofBirth('') : setDateofBirth(text); }}
              textValue={dateOfBirth}
            />
          </View>
          <View style={accountStyles.buttonContainer}>
            <View>
              <Pressable
                onPress={async () => {
                  if (isEmailValid(email) && validateDob(dateOfBirth)) {
                    await updateProfile(user?.id, user?.token, update, {
                      firstName, lastName, email, gender, dateOfBirth,
                    }, setIsUpdateLoading);
                  }
                }}
                style={accountStyles.updateButton}
              >
                <Text style={styles.buttonText}>Update Profile</Text>
              </Pressable>
              { isUpdateLoading ? <Text style={{ marginTop: 3, alignItems: 'center', textAlign: 'center' }}><ActivityIndicator size="large" color={COLORS.btnColor} /></Text> : null }
            </View>
            <View>
              <Pressable
                onPress={async () => {
                  await deleteProfile(user?.id, user?.token, logout, setIsDeleteLoading, router);
                }}
                style={accountStyles.deleteButton}
              >
                <Text style={styles.buttonText}>Delete Profile</Text>
              </Pressable>
              {isDeleteLoading ? <Text style={{ marginTop: 3, alignItems: 'center', textAlign: 'center' }}><ActivityIndicator size="large" color={COLORS.btnColor} /></Text> : null }
            </View>
          </View>
          <View style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <Text style={accountStyles.header}>Medical History and Goals</Text>
            { isLoading ? <ActivityIndicator size="large" color={COLORS.btnColor} /> : null }
            <View>
              <HistoryInput
                handleOnChange={() => {}}
                textValue={history}
              />
              <GoalsInput
                handleOnChange={() => {}}
                textValue={goals}
              />
            </View>
            <Text style={accountStyles.bottomText}>
              To update your history and goals, kindly visit the history screen.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Account;
