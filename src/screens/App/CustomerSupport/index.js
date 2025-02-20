import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { ComponentWrapper, MainHeader, MainWrapper } from "../../../components";
import {
  renderBubble,
  renderSend,
  renderTime,
} from "../../../components/appComponents/staticComponents";
import { colors } from "../../../constants";
import { width, totalSize } from "react-native-dimension";
import { useChat } from "../../../hooks/useChat";
import { firebase } from "@react-native-firebase/auth";
import { useSelector } from "react-redux";
const CustomerSupport = () => {
  const { onhandleSend, messages, setMessages } = useChat();
  const user_redux = useSelector((state) => state.user);
   useEffect(() => {
     const unsub = firebase
       .firestore()
       .collection("support")
       .doc(user_redux.id)
       .onSnapshot((doc) => {
         if (doc.exists) {
           const msgs = doc?.data();
           setMessages(msgs["messages"].reverse());
         }
       });
     return () => unsub();
   }, []);
  return (
    <MainWrapper>
      <ComponentWrapper>
        <MainHeader title={"Customer Support"} />
      </ComponentWrapper>
      <GiftedChat
        messages={messages}
        multiline
        renderBubble={renderBubble}
        renderSend={renderSend}
        renderTime={renderTime}
        renderAvatar={() => null}
        onSend={onhandleSend}
        user={{
          id: user_redux?.id,
        }}
      />
    </MainWrapper>
  );
};

export default CustomerSupport;

const styles = StyleSheet.create({
  input: {
    marginHorizontal: width(2),
    paddingHorizontal: 16,
    borderRadius: totalSize(3),
    backgroundColor: colors.appBgColor13,
  },
});
