/* eslint-disable react/function-component-definition */
import {
  SafeAreaView, ScrollView, Text, View,
} from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../../context/auth';
import chatStyles from '../../../styles/chat.styles';
import { ChatInput } from '../../../components/InputText/InputText';
import { COLORS } from '../../../constants';

const Chat = () => {
  // const router = useRouter();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [children, setChildren] = useState([]);
  const { user } = useAuth();
  const token = user ? user.token : null;
  const addChild = (childMessage, sender) => {
    const randomNum = Math.random() * 100000;
    const child = sender === 'ai' ? (
      <View style={chatStyles.aiMessage} key={childMessage.length * randomNum}>
        <Text selectable key={childMessage + randomNum}>{childMessage}</Text>
      </View>
    ) : (
      <View style={chatStyles.userMessage} key={childMessage.length * randomNum}>
        <Text selectable key={childMessage + randomNum}>{childMessage}</Text>
      </View>
    );
    setChildren((prevChildren) => [...prevChildren, child]);
  };
  return (
    <SafeAreaView style={chatStyles.container}>
      <ScrollView style={chatStyles.chatContainer} contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={chatStyles.title}>MyWellBoost AI</Text>
        <View style={{ width: '100%' }}>
          { children.map((child) => child)}
          {isLoading ? (
            <View style={chatStyles.aiMessage}>
              <Text>Thinking...</Text>
            </View>
          ) : null }
        </View>
      </ScrollView>
      <View style={{
        marginBottom: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10,
      }}
      >
        <FontAwesome
          name="trash-o"
          size={30}
          color={COLORS.btnColor}
          onPress={() => setChildren([])}
        />
        <ChatInput
          handleOnChange={(text) => { setMessage(text); }}
          textValue={message}
          setReply={setChildren}
          setIsLoading={setIsLoading}
          addChild={addChild}
          token={token}
          setMessage={setMessage}
        />
      </View>
    </SafeAreaView>
  );
};

export default Chat;
