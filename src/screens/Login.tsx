import React, { useContext, useState } from "react";
import {
    View,
    Text,
    Alert,
    TextInput,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import backgroundImage from "../../assets/bg-login.jpeg";
import { AuthenticatedUserContext } from "../context/AuthenticatedUserContext";

interface LoginProps {
    navigation: StackNavigationProp<any, any>;
}

const Login = ({ navigation }: LoginProps) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setUser } = useContext(AuthenticatedUserContext);

    const onHandleLogin = () => {
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    setUser(userCredential.user);
                    navigation.navigate("ChatStack")
                })
                .catch((err) => Alert.alert("Erro", err.message));
        }
    };

    return (
        <ImageBackground
            source={backgroundImage}
            resizeMode="cover"
            className="flex-1"
        >
            <SafeAreaView className="flex-1 justify-center items-center px-10">
                <View className="w-full gap-y-4">
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={"white"}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        autoFocus
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                        className="bg-black/30 border-2 border-white px-5 py-4 w-full rounded-full text-white font-bold"
                    />
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={"white"}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                        autoFocus
                        textContentType="password"
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                        className="bg-black/30 border-2 border-white px-5 py-4 w-full rounded-full text-white font-bold"
                    />
                    <TouchableOpacity
                        className="rounded-full bg-blue-primary px-2 justify-center items-center py-3"
                        onPress={onHandleLogin}
                    >
                        <Text className="text-white font-semibold text-lg">Log In</Text>
                    </TouchableOpacity>
                    <View className="flex-row gap-x-2 items-center justify-center">
                        <Text className="text-gray-500">Don't have an account yet?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                            <Text className="text-blue-secondary font-bold">Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default Login;
