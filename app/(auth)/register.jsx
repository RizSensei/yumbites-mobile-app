import React, { useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { ThemedText, ThemedView, Spacer } from '../../components/theme';
import { Colors } from '../../constants/Colors';
import { Link, useRouter } from 'expo-router';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Ionicons } from '@expo/vector-icons';

const Register = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      console.log('Register data:', data);
      // TODO: Implement register API call
      // Example: await registerUser(data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // On success
      Alert.alert('Success', 'Account created successfully!');
      router.replace('/home');
    } catch (error) {
      console.error('Register error:', error);
      Alert.alert('Error', 'Registration failed. Please try again.');
    }
  };

  return (
    <ThemedView safeArea={true}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <ThemedText style={styles.title}>Create Account</ThemedText>
            <ThemedText style={styles.subtitle}>Join YumBites and start ordering</ThemedText>
          </View>

          <Spacer height={30} />

          {/* Form */}
          <View style={styles.formContainer}>
            <Controller
              control={control}
              name="name"
              rules={{
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.name}
                  autoCapitalize="words"
                  autoComplete="name"
                  leftIcon={<Ionicons name="person-outline" size={20} color={Colors.primary} />}
                />
              )}
            />

            <Spacer height={15} />

            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Please enter a valid email',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Email Address"
                  placeholder="you@example.com"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  leftIcon={<Ionicons name="mail-outline" size={20} color={Colors.primary} />}
                />
              )}
            />

            <Spacer height={15} />

            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Minimum 6 characters required',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Password"
                  placeholder="Create a password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password-new"
                  leftIcon={<Ionicons name="lock-closed-outline" size={20} color={Colors.primary} />}
                  rightIcon={
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                      <Ionicons 
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                        size={20} 
                        color={Colors.primary} 
                      />
                    </TouchableOpacity>
                  }
                />
              )}
            />

            <Spacer height={15} />

            <Controller
              control={control}
              name="confirmPassword"
              rules={{
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'Passwords do not match',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.confirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  autoCapitalize="none"
                  autoComplete="password-new"
                  leftIcon={<Ionicons name="lock-closed-outline" size={20} color={Colors.primary} />}
                  rightIcon={
                    <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <Ionicons 
                        name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} 
                        size={20} 
                        color={Colors.primary} 
                      />
                    </TouchableOpacity>
                  }
                />
              )}
            />

            {/* Password Requirements */}
            <View style={styles.passwordRequirements}>
              <ThemedText style={styles.requirementsTitle}>Password must contain:</ThemedText>
              <View style={styles.requirementItem}>
                <Ionicons 
                  name={password?.length >= 6 ? "checkmark-circle" : "ellipse-outline"} 
                  size={14} 
                  color={password?.length >= 6 ? Colors.primary : '#999'} 
                />
                <ThemedText style={[
                  styles.requirementText,
                  password?.length >= 6 && styles.requirementMet
                ]}>
                  At least 6 characters
                </ThemedText>
              </View>
            </View>

            <Spacer height={25} />

            {/* Register Button */}
            <Button
              title={isSubmitting ? "Creating Account..." : "Create Account"}
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
              disabled={isSubmitting}
            />

            <Spacer height={30} />

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <ThemedText style={styles.dividerText}>or</ThemedText>
              <View style={styles.divider} />
            </View>

            <Spacer height={30} />

            {/* Social Sign Up */}
            <View style={styles.socialContainer}>
              <Button
                title="Sign up with Google"
                variant="secondary"
                onPress={() => Alert.alert('Google Sign Up', 'Would be implemented')}
                leftIcon={<Ionicons name="logo-google" size={20} color={Colors.primary} />}
              />
              
              <Spacer height={12} />
              
              <Button
                title="Sign up with Apple"
                variant="secondary"
                onPress={() => Alert.alert('Apple Sign Up', 'Would be implemented')}
                leftIcon={<Ionicons name="logo-apple" size={20} color={Colors.primary} />}
              />
            </View>

            <Spacer height={40} />

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <ThemedText style={styles.loginText}>Already have an account? </ThemedText>
              <Link href="/login" asChild>
                <TouchableOpacity>
                  <ThemedText style={styles.loginLink}>Sign In</ThemedText>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
    </ThemedView>
  );
};

export default Register;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  passwordRequirements: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  requirementText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  requirementMet: {
    color: Colors.primary,
    fontWeight: '500',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#999',
  },
  socialContainer: {
    width: '100%',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#666',
  },
  loginLink: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});