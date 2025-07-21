// src/screens/LoginScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      navigation.replace('HomeScreen');
    }
  }, [user]);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/check-icon.png')} style={styles.logoImage} />
        </View>

        <Text style={styles.title}>Welcome Back!</Text>

        <TextInput
          placeholder="EMAIL ADDRESS"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="PASSWORD"
          placeholderTextColor="#999"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.7 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>Log In</Text>}
        </TouchableOpacity>

        <Text style={styles.footer}>
          Don’t have an account?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('RegisterScreen')}>
            Get started!
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f4f5f7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logoContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logoImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c2c2c',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    marginBottom: 12,
    color: '#000',
  },
  button: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 5,
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  error: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  footer: {
    color: '#999',
    marginTop: 20,
    fontSize: 14,
  },
  link: {
    color: '#6C63FF',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
