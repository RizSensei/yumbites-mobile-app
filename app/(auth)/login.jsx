import React from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { ThemedText, ThemedView, Spacer } from '../../components/theme';
import { Colors } from '../../constants/Colors';
import { Link } from 'expo-router';
import Input from '../../components/Input';
import Button from '../../components/Button';

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log('Login data:', data);
      // TODO: Implement login API call
      // Example: await loginUser(data);
    } catch (error) {
      console.error('Login error:', error);
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
          <ThemedText style={styles.title}>Login to your account</ThemedText>

          <Spacer height={30} />

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
                autoComplete="password"
              />
            )}
          />

          <Spacer height={20} />

          <Button
            title="Login"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
          />

          <Spacer height={20} />

          <Link href="/register" style={styles.link}>
            <ThemedText>Don't have an account? Register</ThemedText>
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

export default Login;

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