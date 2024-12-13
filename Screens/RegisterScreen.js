import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <View>
        <Image
          style={{ width: 150, height: 100 }}
          source={{
            uri: 'https://e7.pngegg.com/pngimages/732/34/png-clipart-logo-amazon-com-brand-flipkart-others-text-orange.png',
          }}
        />
      </View>
      <KeyboardAvoidingView style={{ flex: 1, width: '100%', paddingHorizontal: 20 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              color: '#041E42',
              textAlign: 'center',
            }}
            numberOfLines={1}
          >
            login 
          </Text>
        </View>
        <View style={{ marginTop: 70 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 30,
              borderRadius: 5,
              gap: 5,
              alignItems: 'center',
              backgroundColor: '#D0D0D0',
              paddingHorizontal: 10,
            }}
          >
            <MaterialIcons name="email" size={24} color="gray" />
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: 16,
              }}
              placeholder="Input your email"
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 30,
              borderRadius: 5,
              gap: 5,
              alignItems: 'center',
              backgroundColor: '#D0D0D0',
              paddingHorizontal: 10,
            }}
          >
            <AntDesign name="lock" size={24} color="gray" />
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={{
                color: 'gray',
                marginVertical: 10,
                width: 300,
                fontSize: 16,
              }}
              placeholder="Password"
            />
          </View>
        </View>
        <View
          style={{
            marginBottom: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Text>Keep me Logged In</Text>
          <Text style={{ color: '#007fff', fontWeight: '500' }}>Forgot password</Text>
        </View>
        <View style={{ marginTop: 80 }} />
        <Pressable
          style={{
            width: 200,
            backgroundColor: '#FEBE10',
            borderRadius: 6,
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 15,
          }}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Login</Text>
        </Pressable>
        <Pressable>
          <Text style={{ color: 'gray', fontSize: 16, textAlign: 'center' }}>
            Don't have an account? Sign up
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
