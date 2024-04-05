import React, { useContext } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { AuthenticatedUserContext } from '../context/AuthenticatedUserContext';
import defaultAvatar from '../../assets/defaultAvatar.png'

interface HeaderProps {

}

const Header = ({ }: HeaderProps) => {
    const { user } = useContext(AuthenticatedUserContext)

    return (
        <SafeAreaView >
            <View className='items-center justify-between flex-row h-40 px-5'>
                <Text className='text-lg'>Messages</Text>
                <TouchableOpacity>
                    <Image source={user?.photoURL ? { uri: user.photoURL } : defaultAvatar} className='h-14 w-14 rounded-full' />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default Header;