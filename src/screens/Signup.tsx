import React, { useContext, useState } from "react";
import {
    View,
    Text,
    Alert,
    TextInput,
    TouchableOpacity,
    ImageBackground,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../config/firebase";
import { StackNavigationProp } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import backgroundImage from "../../assets/bg-signup.jpeg";
import { AuthenticatedUserContext } from "../context/AuthenticatedUserContext";

interface LoginProps {
    navigation: StackNavigationProp<any, any>;
}

const Login = ({ navigation }: LoginProps) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { setUser } = useContext(AuthenticatedUserContext);



    const onHandleSignup = () => {
        if (name !== "" && email !== "" && password !== "") {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    updateProfile(userCredential.user, {
                        displayName: name
                    }).then(() => {
                        setUser(userCredential.user);
                        navigation.navigate("ChatStack");
                    }).catch((error) => {
                        console.error("Error updating displayName:", error);
                    });
                })
                .catch((err) => {
                    Alert.alert("Erro no cadastro", err.message);
                });
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
                        placeholder="Name"
                        placeholderTextColor={"white"}
                        textContentType="name"
                        autoFocus
                        value={name}
                        onChangeText={(value) => setName(value)}
                        className="bg-black/30 border-2 border-white px-5 py-4 w-full rounded-full text-white font-bold"
                    />
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
                        className="rounded-full bg-green-secondary px-2 justify-center items-center py-3"
                        onPress={onHandleSignup}
                    >
                        <Text className="text-white font-semibold text-lg">Sign Up</Text>
                    </TouchableOpacity>

                    <View className="flex-row gap-x-2 items-center justify-center">
                        <Text className="text-gray-500">Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text className="text-green-secondary font-bold">Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

export default Login;
