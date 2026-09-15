import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import Button from '../../../components/Button';
import { ThemedText, ThemedView } from '../../../components/theme';
import { Colors } from '../../../constants/Colors';
import { addressesStyles as styles } from '../../../styles/addresses';

const initialAddresses = [
  {
    id: 'home',
    label: 'Home',
    address: '123 Main Street, City',
    details: 'Apartment 4B',
    isDefault: true,
  },
  {
    id: 'work',
    label: 'Work',
    address: '45 Market Avenue, City',
    details: 'Floor 2',
    isDefault: false,
  },
];

const SavedAddresses = () => {
  const [addresses, setAddresses] = useState(initialAddresses);

  const handleAddAddress = () => {
    Alert.alert('Add address', 'Address entry will be available soon.');
  };

  const handleSetDefault = (id) => {
    setAddresses((currentAddresses) =>
      currentAddresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
  };

  const handleRemoveAddress = (id) => {
    Alert.alert('Remove address', 'Are you sure you want to remove this address?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => setAddresses((currentAddresses) => currentAddresses.filter((address) => address.id !== id)),
      },
    ]);
  };

  return (
    <ThemedView safeArea={true} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Saved Addresses</ThemedText>
          <ThemedText style={styles.subtitle}>
            Keep your delivery locations ready for checkout.
          </ThemedText>
        </View>

        <View style={styles.list}>
          {addresses.map((address) => (
            <View key={address.id} style={styles.addressCard}>
              <View style={styles.cardTop}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name={address.label === 'Home' ? 'home-outline' : 'briefcase-outline'}
                    size={22}
                    color={Colors.primary}
                  />
                </View>
                <View style={styles.addressDetails}>
                  <View style={styles.labelRow}>
                    <ThemedText style={styles.label}>{address.label}</ThemedText>
                    {address.isDefault && (
                      <View style={styles.defaultBadge}>
                        <ThemedText style={styles.defaultBadgeText}>Default</ThemedText>
                      </View>
                    )}
                  </View>
                  <ThemedText style={styles.address}>{address.address}</ThemedText>
                  <ThemedText style={styles.details}>{address.details}</ThemedText>
                </View>
                <TouchableOpacity
                  accessibilityLabel={`Remove ${address.label} address`}
                  onPress={() => handleRemoveAddress(address.id)}
                  style={styles.removeButton}
                >
                  <Ionicons name="trash-outline" size={20} color={Colors.warning} />
                </TouchableOpacity>
              </View>

              {!address.isDefault && (
                <TouchableOpacity onPress={() => handleSetDefault(address.id)} style={styles.defaultButton}>
                  <ThemedText style={styles.defaultButtonText}>Set as default</ThemedText>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>

        <Button title="Add New Address" onPress={handleAddAddress} />
      </ScrollView>
    </ThemedView>
  );
};

export default SavedAddresses;
