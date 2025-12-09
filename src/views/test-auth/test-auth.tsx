import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { encode as btoa } from 'base-64';

export function AuthDebugScreen() {
  const [username, setUsername] = useState('dagursmari');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');

  const testAuth = async () => {
    setResult('Testing...');
    
    try {
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();

      if (!trimmedUsername || !trimmedPassword) {
        Alert.alert('Error', 'Username and password cannot be empty!');
        return;
      }

      // Create Basic Auth header (exactly like Postman)
      const credentials = `${trimmedUsername}:${trimmedPassword}`;
      const base64Credentials = btoa(credentials);
      const authHeader = `Basic ${base64Credentials}`;
      
      console.log('Credentials:', credentials.replace(/:.*/, ':***'));
      console.log('Base64:', base64Credentials.substring(0, 20) + '...');
      console.log('Auth Header:', authHeader.substring(0, 30) + '...');
      
      const response = await fetch('https://api.kvikmyndir.is/authenticate', {
        method: 'POST',
        headers: {
          'Authorization': authHeader,
        },
      });

      console.log('Status:', response.status);
      const data = await response.json();
      console.log('Response:', data);
      
      setResult(JSON.stringify(data, null, 2));
      
      if (data.success) {
        Alert.alert('Success! 🎉', 'Authentication worked!');
      } else {
        Alert.alert('Failed', data.message);
      }
      
    } catch (error) {
      console.error('Error:', error);
      setResult(`Error: ${error}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Auth Debugger (Basic Auth)</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      <Button title="Test Authentication" onPress={testAuth} />
      
      <Text style={styles.resultLabel}>Result:</Text>
      <Text style={styles.result}>{result}</Text>
      
      <Text style={styles.hint}>
        This now uses Basic Auth (same as Postman)
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  resultLabel: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 10,
    fontFamily: 'monospace',
    fontSize: 12,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
  },
  hint: {
    marginTop: 20,
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});