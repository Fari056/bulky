import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useCallback, useState, useEffect } from 'react'
import { GiftedChat, InputToolbar, } from 'react-native-gifted-chat';
import { DriverChatHeader, MainWrapper } from '../../../components'
import { DriverChatBubble, DriverChatTime, renderBubble, renderSend, renderTime } from '../../../components/appComponents/staticComponents';
import { width, totalSize } from 'react-native-dimension'
import firestore from "@react-native-firebase/firestore";
import { colors } from '../../../constants';
import { useChat } from '../../../hooks/useChat';
import { firebase } from "@react-native-firebase/auth";
import { useSelector } from 'react-redux';
import { Icon } from 'react-native-elements';
const Chat = ({ route }) => {
  const { receiver_id } = route.params;
  const bookings_redux = useSelector((state) => state.bookings);
  const [data, setData] = useState();
  useEffect(() => {
    setData(bookings_redux);
  }, []);
  const user_redux = useSelector((state) => state.user);
  const sender_id = user_redux.id;
  const { onSend, messages, setMessages, renderInputToolbar } = useChat(
    sender_id,
    receiver_id
  );
  useEffect(() => {
    const unsub = firebase
      .firestore()
      .collection("chats")
      .doc(receiver_id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          const msgs = doc?.data();
          setMessages(msgs["messages"].reverse());
        }
      });
    return () => unsub();
  }, [receiver_id, setMessages]);
  return (
    <MainWrapper>
      <DriverChatHeader
        phoneNumber={data?.[0]?.user?.phone || ""}
        userName={`${data?.[0]?.user?.firstName || ""} ${data?.[0]?.user?.lastName || ""
          }`}
        photo={data?.[0]?.user?.photo || ""}
      />
      <GiftedChat
        messages={messages}
        // multiline
        renderBubble={DriverChatBubble}
        renderSend={renderSend}
        renderTime={DriverChatTime}
        renderInputToolbar={renderInputToolbar}
        renderAvatar={() => null}
        textInputStyle={styles.input}
        onSend={onSend}
        user={{
          _id: sender_id,
        }}
      />
    </MainWrapper>
  );
}

export default Chat
const styles = StyleSheet.create({
  input: {
    borderWidth: 0,
    marginLeft: width(3),
    marginRight: width(2),
    borderRadius: totalSize(3),
    backgroundColor: colors.appBgColor13,
  }
})