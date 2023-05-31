import { TextInput, SafeAreaView, ScrollView, Text, View, Image, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/auth'
import { deleteProfile, getHistory, isEmailValid, logoutUser, updateProfile, validateDob } from '../../../utils'
import styles from '../../../styles/index.styles'
import { accountStyles } from './account.style'
import { images } from "../../../constants"
import { useRouter } from 'expo-router'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { COLORS } from '../../../constants'

const Account = () => {
  const { logout, update, user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isUpdateLoading, setIsUpdateLoading] = useState(false)
  const [isDeleteLoading, setIsDeleteLoading] = useState(false)
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setlastName] = useState(user?.lastName)
  const [email, setEmail] = useState(user?.email)
  const [gender, setGender] = useState(user?.gender)
  const [dateOfBirth, setDateofBirth] = useState(user?.dateOfBirth)
  const [history, setHistory] = useState('')
  const [goals, setGoals] = useState('')
  const router = useRouter()

  useEffect(() => {
    (async () => {
      await getHistory(user?.id, user?.token, setIsLoading, setHistory, setGoals)
    })()
  }, [user])

  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={ accountStyles.container}>
        <View style={ styles.profileContainer }>
          <View>
            <Image 
              source={ images.defaultProfile }
              resizeMode="contain"
              style={ styles.profileImage }
            />
            <View>
              <Text style={ styles.profileText }>{user?.email}</Text>
            </View>
          </View>
          <View >
            <FontAwesome 
              name='sign-out' 
              onPress={async () => {
                await logoutUser(user.id, user.token, logout, setIsLoading, router)
              }} 
              size={ 40 }
              color={ COLORS.btnColor }
              />
              <Text style={styles.profileText}>Logout</Text>
            </View>
        </View>
        <View style={accountStyles.inputContainer}>
          <View style={{ width: '50%', marginVertical: 5}}>
            <Text>First Name:</Text>
            <TextInput 
              placeholder='First Name'
              value={ firstName}
              onChangeText={(text) => setFirstName(text)}
              style={ accountStyles.input}
            />
          </View>
          <View style={{ width: '50%', marginVertical: 5}}>
            <Text>Last Name:</Text>
            <TextInput 
              placeholder='Last Name'
              value={ lastName}
              onChangeText={(text) => setlastName(text)}
              style={ accountStyles.input}
            />
          </View>
          <View style={{ width: '50%', marginVertical: 5}}>
            <Text>Email Address:</Text>
            <TextInput 
              placeholder='Email address'
              value={ email}
              onChangeText={(text) => setEmail(text)}
              style={ accountStyles.input}
            />
          </View>
          <View style={{ width: '50%', marginVertical: 5}}>
            <Text>Gender:</Text>
            <TextInput 
              placeholder='Gender'
              value={ gender}
              onChangeText={(text) => setGender(text)}
              style={ accountStyles.input}
            />
          </View>
          <View style={{ width: '50%', marginVertical: 5}}>
            <Text>Date of Birth:</Text>
            <TextInput 
              placeholder='Date Of Birth (YYYY-MM-DD)'
              value={ dateOfBirth }
              onChangeText={(text) => setDateofBirth(text)}
              style={ accountStyles.input}
            />
          </View>
        </View>
        <View style={ accountStyles.buttonContainer }>
          <View>
            <Pressable 
              onPress={async () => {
                if (isEmailValid(email) && validateDob(dateOfBirth)) {
                  await updateProfile(user?.id, user?.token, update, {firstName, lastName, email, gender, dateOfBirth}, setIsUpdateLoading)
                }
              }}
              style={ accountStyles.updateButton}
            >
              <Text style={ styles.buttonText }>Update Profile</Text>
            </Pressable>
            { isUpdateLoading ? <Text style={{ marginTop: 3, alignItems: 'center', textAlign: 'center'}}><ActivityIndicator size={'large'} color={ COLORS.btnColor }/></Text> : null }
          </View>
          <View>
            <Pressable 
              onPress={async () => {
                await deleteProfile(user?.id, user?.token, logout, setIsDeleteLoading, router)
              }}
              style={ accountStyles.deleteButton}
            >
              <Text style={ styles.buttonText }>Delete Profile</Text>
            </Pressable>
            {isDeleteLoading ? <Text style={{ marginTop: 3, alignItems: 'center', textAlign: 'center'}}><ActivityIndicator size={'large'} color={ COLORS.btnColor }/></Text> : null }
          </View>
        </View>
        <ScrollView contentContainerStyle={{ alignItems: 'flex-start', justifyContent: 'flex-start'}}>
          <Text style={accountStyles.header}>Medical History and Goals</Text>
          <View style={{marginHorizontal: 20}}>
            <View style={{ width:"100%", marginVertical: 5}}>
              <Text>Medical History:</Text>
              <Text style={ accountStyles.historyInput}>{history}</Text>
            </View>
            <View style={{ width:"100%", marginVertical: 5 }}>
              <Text>Health Goals:</Text>
              <Text style={ accountStyles.historyInput }>{goals}</Text>
            </View>
          </View>
          <Text style={accountStyles.bottomText}>To update your history and goals, kindly visit the history screen.</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Account
