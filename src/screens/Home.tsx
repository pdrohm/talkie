import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';


interface HomeProps {

}

const Home = ({ }: HomeProps) => {
    const navigation = useNavigation();

    return (
        <View className='flex-1'>
            <Header />
        </View>
    );
}

export default Home;