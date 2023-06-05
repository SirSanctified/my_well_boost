/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import {
  ScrollView, View, FlatList, Text, ActivityIndicator, KeyboardAvoidingView,
} from 'react-native';
import { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import dashboardStyles from '../../../styles/dashboard.styles';
import { COLORS } from '../../../constants';
import { getActivities, getRecommendations } from '../../../utils';
import { useAuth } from '../../../context/auth';

function ActivityItem({ item }, setIsSelected, isSelected) {
  return (
    <View style={dashboardStyles.activity}>
      <View style={isSelected
        ? dashboardStyles.selectedRadioButton
        : dashboardStyles.unselectedRadioButton}
      />
      <View style={dashboardStyles.activityTextContainer}>
        <Text style={{ width: '100%', lineHeight: 20 }} selectable onPress={() => setIsSelected(!isSelected)}>{ item.trim() }</Text>
      </View>
    </View>
  );
}
function Dashboard() {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActivitiesLoading, setIsActivitiesLoading] = useState(false);
  const [error, setError] = useState(true);
  const [activities, setActivities] = useState([]);
  const [isSelected, setIsSelected] = useState();
  const [isUserAvailable, setIsUserAvailable] = useState(false);
  const { user } = useAuth();
  const userId = user ? user.id : null;
  const token = user ? user.token : null;

  useEffect(() => {
    (async () => {
      if (user) {
        setIsUserAvailable(true);
        await getRecommendations(userId, token, setIsLoading, setRecommendations);
        try {
          setError(false);
          await getActivities(userId, token, setActivities, setIsActivitiesLoading);
        } catch (err) {
          setError(true);
          console.log(err);
        }
      } else {
        setIsUserAvailable(false);
      }
    })();
  }, [user]);

  return (
    (isUserAvailable
      ? (
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: COLORS.bgPrimary }} contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
          <KeyboardAvoidingView style={{ flex: 1 }}>
            <View style={dashboardStyles.container}>
              <Text style={dashboardStyles.header}>Your recommended Lifestyle modifications</Text>
              <View style={dashboardStyles.listContainer}>
                <FlatList
                  data={recommendations}
                  renderItem={({ item }) => (
                    <Text style={dashboardStyles.recommendation}>{ item.trim() }</Text>
                  )}
                  keyExtractor={(item) => item}
                  scrollEnabled={false}
                />
              </View>
              <Text style={dashboardStyles.header}>Today&#39;s Activities</Text>
              <View style={{ marginTop: 20, marginBottom: 80 }}>
                {isActivitiesLoading
                  ? <ActivityIndicator size={100} color={COLORS.btnColor} />
                  : null }
                { !error && activities.length > 1
                  ? (
                    <FlatList
                      data={activities}
                      renderItem={({ item }) => (ActivityItem({ item }, setIsSelected, isSelected))}
                      keyExtractor={(item) => item}
                      scrollEnabled={false}
                    />
                  )
                  : (
                    <>
                      { isLoading
                        ? <ActivityIndicator size="large" color={COLORS.btnColor} />
                        : (
                          <>
                            <Text style={{ color: '#ff00ff' }}>{activities[0]}</Text>
                            <FontAwesome
                              name="refresh"
                              size={36}
                              color={COLORS.btnColor}
                              onPress={async () => {
                                await getActivities(userId, token, setActivities, setIsLoading);
                              }}
                              style={{ marginTop: 20, alignSelf: 'center' }}
                            />
                          </>
                        )}
                    </>
                  )}

              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      )
      : <View style={dashboardStyles.container}><ActivityIndicator size="large" color={COLORS.btnColor} /></View>)
  );
}

export default Dashboard;
