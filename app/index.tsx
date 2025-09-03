import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Platform, TouchableOpacity, Modal } from 'react-native';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';

const PhoneVerificationScreen = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const verificationNumber = '15551234567';
  const isPhoneNumberValid = phoneNumber.length === 10 && /^\d{10}$/.test(phoneNumber);

  const openSMS = () => {
    const prefilledMessage = `VERIFY +91 ${phoneNumber}`;
    const url =
      Platform.OS === 'ios'
        ? `sms:${verificationNumber}&body=${encodeURIComponent(prefilledMessage)}`
        : `sms:${verificationNumber}?body=${encodeURIComponent(prefilledMessage)}`;

    Linking.openURL(url).catch((err) => console.error('Failed to open SMS app:', err));
    setModalVisible(false);
    router.push('/Bank');   // ✅ matches Bank.tsx
  // ✅ correct

  };

  useEffect(() => {
    if (modalVisible) {
      setSecondsLeft(5);

      timeoutRef.current = setTimeout(openSMS, 5000);

      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [modalVisible]);

  const handleContinue = () => {
    if (isPhoneNumberValid) {
      setModalVisible(true);
    }
  };

  const handleOpenNow = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    openSMS();
  };

  const handlePhoneNumberChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= 10) {
      setPhoneNumber(numericText);
    }
  };

  const clearInput = () => setPhoneNumber('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in or Sign up</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.prefix}>+91</Text>
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          keyboardType="numeric"
          maxLength={10}
        />
        {phoneNumber.length > 0 && (
          <TouchableOpacity onPress={clearInput}>
            <Text style={styles.clear}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.info}>SMS will be sent to verify. Charges may apply.</Text>

      <TouchableOpacity
        style={[styles.button, !isPhoneNumberValid && styles.buttonDisabled]}
        onPress={handleContinue}
        disabled={!isPhoneNumberValid}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Verify Your Number</Text>
            <Text style={styles.modalText}>
              Send the following prefilled message to {verificationNumber}:
            </Text>
            <Text style={styles.messagePreview}>VERIFY +91 {phoneNumber}</Text>
            <TouchableOpacity style={styles.button} onPress={handleOpenNow}>
              <Text style={styles.buttonText}>Open SMS App</Text>
            </TouchableOpacity>
            <Text style={styles.autoText}>
              Or it will auto-open in {secondsLeft} seconds...
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'stretch', padding: 20, backgroundColor: '#fff', marginTop: 60 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 20 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingHorizontal: 10, marginBottom: 10 },
  prefix: { fontSize: 16, marginRight: 6, color: '#333' },
  input: { flex: 1, fontSize: 16, paddingVertical: 10 },
  clear: { fontSize: 18, color: '#888', paddingHorizontal: 6 },
  info: { fontSize: 12, color: '#555', marginBottom: 20 },
  button: { backgroundColor: '#007AFF', paddingVertical: 14, borderRadius: 6, alignItems: 'center', marginBottom: 10 },
  buttonDisabled: { backgroundColor: '#ccc' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  modalContainer: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalView: { backgroundColor: 'white', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalText: { fontSize: 16, textAlign: 'center', marginBottom: 10 },
  messagePreview: { fontSize: 16, fontWeight: 'bold', color: '#007AFF', marginBottom: 20 },
  autoText: { fontSize: 14, color: '#666', marginTop: 10 },
});

export default PhoneVerificationScreen;
