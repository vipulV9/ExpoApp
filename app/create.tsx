import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const CreateScreen = () => {
  const router = useRouter();
  const [transactionType, setTransactionType] = useState<'send' | 'request'>('send');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    // Handle transaction creation logic here
    console.log({ transactionType, amount, recipient, note });
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create New Transaction</Text>
        </View>

        <View style={styles.typeSelector}>
          <TouchableOpacity 
            style={[
              styles.typeButton, 
              transactionType === 'send' && styles.selectedType
            ]}
            onPress={() => setTransactionType('send')}
          >
            <Ionicons 
              name="arrow-up-circle-outline" 
              size={24} 
              color={transactionType === 'send' ? '#fff' : '#007AFF'} 
            />
            <Text style={[
              styles.typeText, 
              transactionType === 'send' && styles.selectedTypeText
            ]}>Send</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.typeButton, 
              transactionType === 'request' && styles.selectedType
            ]}
            onPress={() => setTransactionType('request')}
          >
            <Ionicons 
              name="arrow-down-circle-outline" 
              size={24} 
              color={transactionType === 'request' ? '#fff' : '#007AFF'} 
            />
            <Text style={[
              styles.typeText, 
              transactionType === 'request' && styles.selectedTypeText
            ]}>Request</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Amount</Text>
            <View style={styles.amountContainer}>
              <Text style={styles.currencySymbol}>$</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>To</Text>
            <View style={styles.toInputContainer}>
              <Ionicons name="person-circle-outline" size={24} color="#999" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Name, email, or phone number"
                value={recipient}
                onChangeText={setRecipient}
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Note</Text>
            <TextInput
              style={[styles.input, styles.noteInput]}
              placeholder="Add a note..."
              multiline
              value={note}
              onChangeText={setNote}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.submitButton, 
            (!amount || !recipient) && styles.disabledButton
          ]}
          onPress={handleSubmit}
          disabled={!amount || !recipient}
        >
          <Text style={styles.submitButtonText}>
            {transactionType === 'send' ? 'Send Payment' : 'Request Payment'}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  typeSelector: {
    flexDirection: 'row',
    padding: 16,
    justifyContent: 'space-around',
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#007AFF',
    width: '45%',
  },
  selectedType: {
    backgroundColor: '#007AFF',
  },
  typeText: {
    marginLeft: 8,
    fontWeight: '600',
    color: '#007AFF',
  },
  selectedTypeText: {
    color: '#fff',
  },
  formContainer: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
  },
  currencySymbol: {
    fontSize: 24,
    color: '#333',
    marginRight: 8,
  },
  amountInput: {
    fontSize: 24,
    flex: 1,
  },
  toInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 8,
  },
  input: {
    fontSize: 16,
    flex: 1,
    paddingVertical: 8,
  },
  inputIcon: {
    marginRight: 8,
  },
  noteInput: {
    height: 80,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    textAlignVertical: 'top',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default CreateScreen;