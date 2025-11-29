import React from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { ThemedText, ThemedView, Spacer } from '../../components/theme';
import { Colors } from '../../constants/Colors';
import { Link } from 'expo-router';
import Input from '../../components/Input';
import Button from '../../components/Button';

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

  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      console.log('Register data:', data);
      // TODO: Implement register API call
      // Example: await registerUser(data);
    } catch (error) {
      console.error('Register error:', error);
    }
  };

  return (
    <ThemedView safeArea={true}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <ThemedText style={styles.title}>Create an account</ThemedText>

          <Spacer height={30} />

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
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Email"
                placeholder="Enter your email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Password"
                placeholder="Enter your password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password-new"
              />
            )}
          />

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
                secureTextEntry
                autoCapitalize="none"
                autoComplete="password-new"
              />
            )}
          />

          <Spacer height={20} />

          <Button
            title="Register"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
          />

          <Spacer height={20} />

          <Link href="/login" style={styles.link}>
            <ThemedText>Already have an account? Login</ThemedText>
          </Link>

          <Spacer height={20} />

          <Link href="/" style={styles.link}>
            <ThemedText>Back to Home Page</ThemedText>
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  link: {
    textAlign: 'center',
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});