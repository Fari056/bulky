import { useState, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Route } from '../../constants';
import { addToArrayCustom, getAllFriends, saveData, uniqueID } from '../../backend/utility';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { totalSize, width, height } from "react-native-dimension";
import { Wrapper } from '../../components';
import { colors } from '../../constants';
import { Icon } from "react-native-elements";
import { InputToolbar } from 'react-native-gifted-chat';
import ImagePicker from "react-native-image-crop-picker";
import { uploadFile } from '../../backend/utility';
export const useChat = (sender_id, receiver_id) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const navigation = useNavigation();
  const user_redux = useSelector((state) => state.user);
  const onSend = useCallback(
    (messages = []) => {
      if (!messages[0]) return;
      const newMessage = {
        ...messages[0],
        createdAt:
          Date.parse(messages[0].createdAt) || new Date().toISOString(),
        recieverId: receiver_id,
        isSeen: false,
        text: messages[0].text ?? "",
        user: messages[0].user ?? {
          _id: sender_id,
          name: user_redux?.firstName || "User",
        },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessage)
      );
      const message = {
        id: receiver_id,
        keys: [receiver_id, sender_id],
        lastMessage: {
          sender: sender_id,
          text: newMessage?.text ?? "",
          image: newMessage?.image ?? "",
          createdAt: newMessage?.createdAt ?? "",
          id: receiver_id,
          receiverId: receiver_id,
        },
        users: [
          {
            _id: receiver_id,
            userName: "reciever_name",
            avatar: "",
          },
          {
            _id: sender_id,
            userName: `${user_redux?.firstName ?? "static_first_name"} ${user_redux?.lastName ?? ""
              }`,
            avatar: user_redux?.photo ?? "",
          },
        ],
        messages: [newMessage],
        createdAt: Date.parse(new Date()),
        updatedAt: Date.parse(new Date()),
      };

      addToArrayCustom("chats", receiver_id, "messages", newMessage)
        .then((res) => {
          if (!res) {
            saveData("chats", receiver_id, message)
              .then((res) => { })
              .catch((error) => {
                console.log("error of chat 1", error);
              });
          }
        })
        .catch((err) => console.log("err", err));
    },
    [receiver_id, sender_id, user_redux]
  );

  const onhandleSend = async (messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages[0])
    );
    messages[0].createdAt = Date.parse(messages[0].createdAt);
    messages[0].recieverId = reciever?._id ?? "static_reciever_id";
    messages[0].isSeen = false;
    let message = {
      id: id,
      keys: [
        reciever?._id ?? "static_reciever_id",
        user_redux?.id ?? "static_user_id",
      ],
      lastMessage: {
        sender: user_redux?.id ?? "static_user_id",
        text: messages[0].text,
        createdAt: messages[0].createdAt,
        id: id,
        receiverid: reciever?._id ?? "static_reciever_id",
      },
      users: [
        {
          _id: reciever?._id ?? "static_reciever_id",
          userName: reciever?.name ?? "static_reciever_name",
          avatar: reciever?.photo ?? "",
        },
        {
          _id: user_redux?.id ?? "static_user_id",
          userName: `${user_redux?.firstName ?? "static_first_name"} ${user_redux?.lastName ?? ""
            }`,
          avatar: user_redux?.photo ?? "",
        },
      ],
      messages: [messages[0]],
      createdAt: Date.parse(new Date()),
      updatedAt: Date.parse(new Date()),
    };
    addToArrayCustom("support", user_redux?.id, "messages", messages[0])
      .then((res) => {
        if (!res) {
          saveData("support", user_redux?.id, message)
            .then((res) => { })
            .catch((error) => {
              console.log("error of chat 1", error);
            });
        }
      })
      .catch((err) => console.log("err", err));
  };

  const saveMessageToFirestore = (newMessage) => {
    const message = {
      id: receiver_id,
      Message: {
        sender: sender_id || "",
        text: newMessage.text,
        createdAt: newMessage.createdAt,
        image: newMessage.image || "",
      },
      user: {
        id: sender_id || "",
        userName: user_redux.firstName + " " + (user_redux?.lastName || ""),
        avatar: user_redux?.photo || "",
      },
      messages: [newMessage],
      createdAt: Date.parse(new Date()),
      updatedAt: Date.parse(new Date()),
    };

    // Remove undefined or empty keys
    const cleanMessage = JSON.parse(JSON.stringify(message));
    addToArrayCustom("chats", receiver_id, "messages", newMessage)
      .then((res) => {
        if (!res) {
          saveData("chats", receiver_id, cleanMessage)
            .then(() => {
              console.log("Chat saved successfully");
            })
            .catch((error) => {
              console.log("Error saving chat", error);
            });
        }
      })
      .catch((err) => console.log("Error adding to array", err));
  };
  const handleImagePick = async () => {
    try {
      const image = await ImagePicker.openPicker({
        mediaType: "photo",
        cropping: true,
      });

      if (image) {
        const fileName = image.path.split("/").pop();
        const imageUrl = await uploadFile(image.path, fileName);
        const imageMessage = {
          _id: new Date().getTime(),
          text: "",
          createdAt: new Date(),
          user: {
            _id: sender_id ?? "static_user_id",
          },
          image: imageUrl,
        };

        onSend([imageMessage]);
      }
    } catch (error) {
      console.error("Image picker error: ", error);
    }
  };

  const renderInputToolbar = (props) => {
    return (
      <Wrapper style={{ flexDirection: "row", alignItems: "center" }}>
        <Wrapper style={{ width: width(82) }}>
          <InputToolbar {...props} />
        </Wrapper>
        <Wrapper style={{ marginLeft: width(1), width: width(8) }}>
          <TouchableOpacity style={{}}>
            <Icon name="mic" type="feather" size={20} color={colors.iconColor1} />
          </TouchableOpacity>
        </Wrapper>
        <Wrapper style={{ width: width(8) }}>
          <TouchableOpacity
            style={{ marginRight: 0 }}
            onPress={handleImagePick}
          >
            <Icon
              name="image"
              type="feather"
              size={20}
              color={colors.iconColor1}
            />
          </TouchableOpacity>
        </Wrapper>
      </Wrapper>
    );
  };
  const GetList = async () => {
    try {
      setLoading(true);
      let res = await getAllFriends("chats", "keys", sender_id);
      if (res) {
        setList(res);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const StartChat = (item) => {
    let id = uniqueID();
    // let receiver = FindOther(item?.users, user_redux?._id)
    let sender = {
      name: user_redux?.firstName + " " + user_redux?.lastName ?? "",
      id: sender_id,
      avatar: user_redux?.photo,
    };
    getAllFriends("chats", "keys", sender_id)
      .then((res) => {
        if (res?.length == 0) {
          console.log("New Chat");
          GOTOCHAT(item, id);
        } else {
          const already_chatted = res?.find((i) => {
            return i?.keys?.filter((ii) => ii === item?._id).length > 0;
          });
          console.log(already_chatted);
          if (already_chatted) {
            console.log("Already IN Chat");
            id = already_chatted?.id;
            GOTOCHAT(item, id);
          } else {
            id = uniqueID();
            console.log("kjgjv");
            GOTOCHAT(item, id);
          }
        }
      })
      .catch((err) => console.log("err", err));
  };

  const findOther = (users) => {
    return users.find((f) => f.id !== user_redux?._id);
  };

  const GOTOCHAT = (receiver, id) => {
    navigation.navigate(Route.CHAT, {
      reciever: receiver,
      id: id,
    });
  };

  return {
    messages,
    setMessages,
    onSend,
    GetList,
    list,
    setList,
    loading,
    StartChat,
    findOther,
    user_redux,
    messages,
    renderInputToolbar,
    onhandleSend,
  };
};
