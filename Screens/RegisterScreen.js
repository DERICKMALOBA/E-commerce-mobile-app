import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";


  const RegisterScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigation = useNavigation();
    const handleRegister = () => {
      // API call to register user
      const user = {
        name: name,
        email: email,
        password: password
        
      };
      axios
    .post("http://10.20.6.212/register", user)
    .then((response) => {
      console.log(response.data);
      Alert.alert("User Registered Successfully");
      setName("");
      setEmail("");
      setPassword("");
    })
    .catch((error) => {
      Alert.alert("Registration Error");
      console.log(error);
    });
  
    }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={{
            uri: "https://e7.pngegg.com/pngimages/732/34/png-clipart-logo-amazon-com-brand-flipkart-others-text-orange.png",
          }}
        />
      </View>

      <KeyboardAvoidingView style={styles.formContainer}>
        <Text style={styles.title}>Register to your account</Text>

        <View style={styles.inputContainer}>
          <MaterialIcons name="person" size={24} color="gray" />
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Input your name"
            placeholderTextColor="gray"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={24} color="gray" />
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholder="Input your email"
            placeholderTextColor="gray"
          />
        </View>

        <View style={styles.inputContainer}>
          <AntDesign name="lock" size={24} color="gray" />
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="gray"
          />
        </View>

        <Pressable onPress={handleRegister} style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register</Text>
        </Pressable>

        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.signInText}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  logo: {
    width: 150,
    height: 100,
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#041E42",
    textAlign: "center",
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D0D0D0",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    color: "black",
    fontSize: 16,
    paddingVertical: 10,
    marginLeft: 10,
  },
  registerButton: {
    width: "100%",
    backgroundColor: "#FEBE10",
    borderRadius: 6,
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  registerButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  signInText: {
    color: "gray",
    fontSize: 16,
    textAlign: "center",
  },
});
