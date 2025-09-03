import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'Home' | 'Deals' | 'Transactions' | 'Invite'>('Home');
  const [searchQuery, setSearchQuery] = useState('');

  const recentData = [
    { id: 1, name: 'Raman', label: 'Label' },
    { id: 2, name: 'Tanmay', label: 'Label' },
    { id: 3, name: 'Rajesh', label: 'Label' },
  ];

  const tabs = [
    { id: 'Home', icon: 'home-outline', label: 'Home' },
    { id: 'Deals', icon: 'pricetags-outline', label: 'Deals' },
    { id: 'Transactions', icon: 'swap-horizontal-outline', label: 'Transactions' },
    { id: 'Invite', icon: 'person-add-outline', label: 'Invite' },
  ];

  const contacts = [
    { id: 1, name: 'Ethan Harper', phone: '+1 (555) 123-4567', icon: 'person' },
    { id: 2, name: 'Ethan Harper', phone: '+1 (555) 123-4567', icon: 'person' },
    { id: 3, name: 'Ethan Harper', phone: '+1 (555) 123-4567', icon: 'person' },
    { id: 4, name: 'Ethan Harper', phone: '+1 (555) 123-4567', icon: 'person' },
  ];

  return (
    <View style={styles.screen}>
      {/* Top Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[styles.tab, activeTab === tab.id && styles.activeTab]}
            onPress={() => setActiveTab(tab.id as any)}
          >
            <Ionicons
              name={tab.icon as any}
              size={24}
              color={activeTab === tab.id ? '#007AFF' : '#555'}
            />
            <Text style={[styles.tabLabel, activeTab === tab.id && { color: '#007AFF' }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content Area */}
      <View style={styles.content}>
        {activeTab === 'Home' && (
          <>
            {/* Activity Section */}
            <View style={styles.box}>
              <Text style={styles.sectionTitle}>Activity</Text>
              <Text>Some activity details here</Text>
            </View>

            {/* Recents Section */}
            <View style={styles.box}>
              <Text style={styles.sectionTitle}>Recents</Text>
              {recentData.map((item) => (
                <View key={item.id} style={styles.recentItem}>
                  <Ionicons name="person-circle-outline" size={40} color="#007AFF" />
                  <View style={{ marginLeft: 10 }}>
                    <Text>{item.name}</Text>
                    <Text>{item.label}</Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Transactions Section */}
            <View style={styles.box}>
              <Text style={styles.sectionTitle}>Transactions</Text>
              <Text>No transactions yet</Text>
            </View>
          </>
        )}

        {activeTab === 'Deals' && (
          <View style={styles.centerBox}>
            <Text style={styles.sectionTitle}>Deals Screen</Text>
          </View>
        )}

        {activeTab === 'Transactions' && (
          <View style={styles.centerBox}>
            <Text style={styles.sectionTitle}>Transactions Screen</Text>
          </View>
        )}

        {activeTab === 'Invite' && (
          <View style={styles.inviteContainer}>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Select Contact</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Enter a mobile number or name"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
            <View style={styles.optionRow}>
              <TouchableOpacity style={styles.optionButton}>
                <Ionicons name="add" size={20} color="#007AFF" />
                <Text style={styles.optionText}>New Mobile Number</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.optionButton}>
                <Ionicons name="scan" size={20} color="#007AFF" />
                <Text style={styles.optionText}>Scan OR Download App</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.contactsHeader}>ALL CONTACTS</Text>
            {contacts.map((contact) => (
              <View key={contact.id} style={styles.contactItem}>
                <Ionicons name={contact.icon} size={40} color="#007AFF" style={styles.contactIcon} />
                <View style={styles.contactInfo}>
                  <Text>{contact.name}</Text>
                  <Text style={styles.contactPhone}>{contact.phone}</Text>
                </View>
                <TouchableOpacity style={styles.selectButton}>
                  <Ionicons name="checkmark" size={20} color="#007AFF" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Floating Action Button (only on Home) */}
      {activeTab === 'Home' && (
        <TouchableOpacity style={styles.createButton} onPress={() => router.push('/create')}>
          <Text style={styles.createButtonText}>+ Create New</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: { alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: '#007AFF' },
  tabLabel: { fontSize: 12, marginTop: 4 },
  content: { flex: 1 },
  box: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    margin: 8,
    padding: 12,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  sectionTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 8 },
  recentItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 4,
  },
  createButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  inviteContainer: { flex: 1, padding: 10 },
  backButton: { marginBottom: 10 },
  headerText: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  searchContainer: { marginBottom: 10 },
  searchInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10 },
  optionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  optionButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#e0e0e0', padding: 10, borderRadius: 5 },
  optionText: { marginLeft: 5, color: '#007AFF' },
  contactsHeader: { fontWeight: 'bold', marginBottom: 10 },
  contactItem: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  contactIcon: { marginRight: 10 },
  contactInfo: { flex: 1 },
  contactPhone: { color: '#555' },
  selectButton: { padding: 5 },
});

export default HomeScreen;