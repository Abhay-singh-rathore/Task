// src/screens/RegisterScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      navigation.replace('HomeScreen');
    }
  }, [user]);

  const handleRegister = () => {
    dispatch(registerUser({ email, password }));
  };

  const handleGoogleSignIn = () => {
    // TODO: Implement Google sign-in logic
    console.log('Google Sign-In pressed');
  };

  const handleFacebookSignIn = () => {
    // TODO: Implement Facebook sign-in logic
    console.log('Facebook Sign-In pressed');
  };

  const handleAppleSignIn = () => {
    // TODO: Implement Apple sign-in logic
    console.log('Apple Sign-In pressed');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's Get Started!</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Sign up</Text>}
      </TouchableOpacity>

      <Text style={styles.orText}>Or sign up with</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialBtn} onPress={handleGoogleSignIn}>
          <Image source={require('../assets/google.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialBtn} onPress={handleFacebookSignIn}>
          <Image source={require('../assets/facebook.png')} style={styles.socialIcon} />
        </TouchableOpacity>
        {Platform.OS === 'ios' && (
          <TouchableOpacity style={styles.socialBtn} onPress={handleAppleSignIn}>
            <Image source={require('../assets/apple.png')} style={styles.socialIcon} />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.footer}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('LoginScreen')}>
          Log in
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: { color: 'white', fontWeight: 'bold' },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
  orText: { textAlign: 'center', marginVertical: 20, color: '#666' },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  socialBtn: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
  },
  socialIcon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  footer: { textAlign: 'center', marginTop: 10 },
  link: { color: '#6C63FF', fontWeight: 'bold' },
});

export default RegisterScreen;
