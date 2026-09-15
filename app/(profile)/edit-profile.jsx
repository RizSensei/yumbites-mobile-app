import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../components/Button';
import { Spacer, ThemedText, ThemedView } from '../../components/theme';
import { Colors } from '../../constants/Colors';
import { editProfileStyles as styles } from '../../styles/edit-profile';

const EditProfile = () => {
  // User data state
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (234) 567-8900',
    address: '123 Main Street, City',
    bio: 'Food lover and home cook',
  });

  // Form state
  const [formData, setFormData] = useState({ ...userData });
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop');
  const [isLoading, setIsLoading] = useState(false);
  const [fieldToEdit, setFieldToEdit] = useState(null);
  const [editValue, setEditValue] = useState('');

  // Request permissions on mount
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission needed', 'Sorry, we need camera roll permissions to change your profile picture.');
        }
      }
    })();
  }, []);

  // Handle image picker
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
        Alert.alert('Success', 'Profile picture updated!');
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  // Handle form field change
  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  // Start editing a specific field
  const startEditingField = (field) => {
    setFieldToEdit(field);
    setEditValue(formData[field]);
  };

  // Save edited field
  const saveField = () => {
    if (editValue.trim()) {
      handleChange(fieldToEdit, editValue);
      setFieldToEdit(null);
      Alert.alert('Success', `${fieldToEdit.charAt(0).toUpperCase() + fieldToEdit.slice(1)} updated!`);
    }
  };

  // Handle save profile
  const handleSaveProfile = async () => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user data
      setUserData({ ...formData });
      
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to save profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Render edit field modal
  const renderEditFieldModal = () => (
    <Modal
      visible={fieldToEdit !== null}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setFieldToEdit(null)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.modalTitle}>
              Edit {fieldToEdit === 'name' ? 'Name' : 
                    fieldToEdit === 'email' ? 'Email' : 
                    fieldToEdit === 'phone' ? 'Phone' : 
                    fieldToEdit === 'address' ? 'Address' : 'Bio'}
            </ThemedText>
            <TouchableOpacity onPress={() => setFieldToEdit(null)}>
              <Ionicons name="close" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          <Spacer height={20} />

          <TextInput
            style={[styles.modalInput, fieldToEdit === 'bio' && styles.bioInput]}
            value={editValue}
            onChangeText={setEditValue}
            placeholder={`Enter your ${fieldToEdit}`}
            multiline={fieldToEdit === 'bio'}
            numberOfLines={fieldToEdit === 'bio' ? 4 : 1}
          />

          <Spacer height={30} />

          <View style={styles.modalButtons}>
            <Button
              title="Cancel"
              variant="secondary"
              onPress={() => setFieldToEdit(null)}
              style={styles.modalButton}
            />
            <Button
              title="Save"
              onPress={saveField}
              style={styles.modalButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <ThemedView safeArea={true} style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>Edit Profile</ThemedText>
          <ThemedText style={styles.headerSubtitle}>Update your personal information</ThemedText>
        </View>

        <Spacer height={20} />

        {/* Profile Picture Section */}
        <View style={styles.profileImageSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: profileImage }}
              style={styles.profileImage}
            />
            <TouchableOpacity 
              style={styles.editImageButton}
              onPress={pickImage}
            >
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <Spacer height={10} />
          
          <TouchableOpacity onPress={pickImage}>
            <ThemedText style={styles.changePhotoText}>Change Photo</ThemedText>
          </TouchableOpacity>
        </View>

        <Spacer height={30} />

        {/* Profile Information */}
        <View style={styles.infoContainer}>
          {/* Name Field */}
          <View style={styles.fieldContainer}>
            <View style={styles.fieldHeader}>
              <Ionicons name="person-outline" size={20} color={Colors.primary} />
              <ThemedText style={styles.fieldLabel}>Full Name</ThemedText>
            </View>
            <TouchableOpacity 
              style={styles.fieldContent}
              onPress={() => startEditingField('name')}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.fieldValue} numberOfLines={1}>
                {formData.name}
              </ThemedText>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          {/* Email Field */}
          <View style={styles.fieldContainer}>
            <View style={styles.fieldHeader}>
              <Ionicons name="mail-outline" size={20} color={Colors.primary} />
              <ThemedText style={styles.fieldLabel}>Email Address</ThemedText>
            </View>
            <TouchableOpacity 
              style={styles.fieldContent}
              onPress={() => startEditingField('email')}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.fieldValue} numberOfLines={1}>
                {formData.email}
              </ThemedText>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          {/* Phone Field */}
          <View style={styles.fieldContainer}>
            <View style={styles.fieldHeader}>
              <Ionicons name="call-outline" size={20} color={Colors.primary} />
              <ThemedText style={styles.fieldLabel}>Phone Number</ThemedText>
            </View>
            <TouchableOpacity 
              style={styles.fieldContent}
              onPress={() => startEditingField('phone')}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.fieldValue} numberOfLines={1}>
                {formData.phone}
              </ThemedText>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          {/* Address Field */}
          <View style={styles.fieldContainer}>
            <View style={styles.fieldHeader}>
              <Ionicons name="location-outline" size={20} color={Colors.primary} />
              <ThemedText style={styles.fieldLabel}>Delivery Address</ThemedText>
            </View>
            <TouchableOpacity 
              style={styles.fieldContent}
              onPress={() => startEditingField('address')}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.fieldValue} numberOfLines={2}>
                {formData.address}
              </ThemedText>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>

          <View style={styles.separator} />

          {/* Bio Field */}
          <View style={styles.fieldContainer}>
            <View style={styles.fieldHeader}>
              <Ionicons name="document-text-outline" size={20} color={Colors.primary} />
              <ThemedText style={styles.fieldLabel}>Bio</ThemedText>
            </View>
            <TouchableOpacity 
              style={styles.fieldContent}
              onPress={() => startEditingField('bio')}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.fieldValue} numberOfLines={3}>
                {formData.bio || 'Add a short bio about yourself...'}
              </ThemedText>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          </View>
        </View>

        <Spacer height={40} />

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Save Changes"
            onPress={handleSaveProfile}
            loading={isLoading}
            disabled={isLoading}
          />
        </View>

        <Spacer height={40} />
      </ScrollView>

      {/* Edit Field Modal */}
      {renderEditFieldModal()}
    </ThemedView>
  );
};

export default EditProfile;