import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

const BankAccountScreen = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [accountNumber, setAccountNumber] = useState("");
  const [reAccountNumber, setReAccountNumber] = useState("");
  const [ifscCode] = useState("IDIB000S260");
  const [branchInfo] = useState("Villupuram, Tamilnadu");
  const [holderName] = useState("Ramesh Kumar T");

  // validation for first step
  const isAccountValid =
    accountNumber.length > 0 &&
    reAccountNumber.length > 0 &&
    accountNumber === reAccountNumber;

  const goNext = () => {
    if (step === 1 && isAccountValid) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
  router.push('/Home'); 
 
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Top Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={[styles.progressStep, step >= 1 && styles.progressActive]} />
        <View style={[styles.progressStep, step >= 2 && styles.progressActive]} />
        <View style={[styles.progressStep, step >= 3 && styles.progressActive]} />
      </View>

      {step === 1 && (
        <>
          <Text style={styles.title}>Add Your Bank Account</Text>
          <Text style={styles.subtitle}>
            Securely link your bank to send or receive money
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Bank account number"
            value={accountNumber}
            onChangeText={setAccountNumber}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Re-enter Bank account number"
            value={reAccountNumber}
            onChangeText={setReAccountNumber}
            secureTextEntry
          />

          <TouchableOpacity
            style={[styles.button, !isAccountValid && styles.buttonDisabled]}
            onPress={goNext}
            disabled={!isAccountValid}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.title}>Add Your Bank Account</Text>
          <Text style={styles.subtitle}>
            Securely link your bank to send or receive money
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Bank account number"
            value={accountNumber}
            editable={false}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Re-enter Bank account number"
            value={reAccountNumber}
            editable={false}
            secureTextEntry
          />

          <TextInput
            style={styles.input}
            placeholder="IFSC code"
            value={ifscCode}
            editable={false}
          />

          <Text style={styles.branchText}>{branchInfo}</Text>

          {/* Verified Box */}
          <View style={styles.verifiedBox}>
            <Ionicons name="checkmark-circle" size={20} color="green" />
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.verifiedText}>Account Verified</Text>
              <Text style={styles.holderName}>{holderName}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={goNext}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 3 && (
        <View style={styles.successContainer}>
          <Ionicons name="checkmark-circle" size={80} color="green" />
          <Text style={styles.successText}>
            Bank Account Linked Successfully!
          </Text>
          <TouchableOpacity style={styles.button} onPress={goNext}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 40,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  progressStep: {
    flex: 1,
    height: 4,
    marginHorizontal: 4,
    borderRadius: 2,
    backgroundColor: "#ddd",
  },
  progressActive: {
    backgroundColor: "#007AFF",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 12,
  },
  branchText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 12,
  },
  verifiedBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 20,
    backgroundColor: "#f9f9f9",
  },
  verifiedText: {
    color: "green",
    fontWeight: "600",
  },
  holderName: {
    fontSize: 16,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  successText: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    color: "green",
  },
});

export default BankAccountScreen;