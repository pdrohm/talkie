import React, { useState } from 'react';
import { View } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

const Chat = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);

    const onSend = (newMessages: IMessage[]) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, newMessages)
        );
    };

    return (
        <View className='flex-1 mb-10'>
            <GiftedChat messages={messages} onSend={onSend} />
        </View>
    );
};

export default Chat;
