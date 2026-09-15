import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import { ThemedText, ThemedView } from '../../../components/theme';
import { changePasswordStyles as styles } from '../../../styles/change-password';

const ChangePassword = () => {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Missing information', 'Please complete all password fields.');
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert('Password too short', 'Your new password must be at least 8 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Passwords do not match', 'Please make sure both new password fields match.');
      return;
    }

    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSaving(false);
    Alert.alert('Password updated', 'Your password has been changed successfully.', [
      { text: 'Done', onPress: () => router.back() },
    ]);
  };

  return (
    <ThemedView safeArea={true} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Change Password</ThemedText>
          <ThemedText style={styles.subtitle}>
            Choose a strong password you do not use anywhere else.
          </ThemedText>
        </View>

        <View style={styles.form}>
          <Input
            label="Current password"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            secureTextEntry={true}
            placeholder="Enter your current password"
            autoCapitalize="none"
          />
          <Input
            label="New password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={true}
            placeholder="At least 8 characters"
            autoCapitalize="none"
          />
          <Input
            label="Confirm new password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
            placeholder="Re-enter your new password"
            autoCapitalize="none"
          />

          <Button title="Update Password" onPress={handleChangePassword} loading={isSaving} />
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default ChangePassword;
