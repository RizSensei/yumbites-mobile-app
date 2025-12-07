import React, { useState } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
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

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      console.log('Login data:', data);
      // TODO: Implement login API call
      // Example: await loginUser(data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // On success
      Alert.alert('Success', 'Logged in successfully!');
      router.replace('/home');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
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
            <ThemedText style={styles.title}>Welcome Back</ThemedText>
            <ThemedText style={styles.subtitle}>Sign in to your account</ThemedText>
          </View>

          <Spacer height={30} />

          {/* Form */}
          <View style={styles.formContainer}>
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
                  // leftIcon={<Ionicons name="mail-outline" size={20} color={Colors.primary} />}
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
                  placeholder="Enter your password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors.password}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete="password"
                  // leftIcon={<Ionicons name="lock-closed-outline" size={20} color={Colors.primary} />}
                  // rightIcon={
                  //   <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  //     <Ionicons 
                  //       name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                  //       size={20} 
                  //       color={Colors.primary} 
                  //     />
                  //   </TouchableOpacity>
                  // }
                />
              )}
            />

            {/* Forgot Password Link */}
            <TouchableOpacity 
              style={styles.forgotPasswordContainer}
              onPress={handleForgotPassword}
            >
              <ThemedText style={styles.forgotPasswordText}>Forgot Password?</ThemedText>
            </TouchableOpacity>

            <Spacer height={25} />

            {/* Login Button */}
            <Button
              title={isSubmitting ? "Signing in..." : "Sign In"}
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

            {/* Social Login */}
            <View style={styles.socialContainer}>
              <Button
                title="Continue with Google"
                variant="secondary"
                onPress={() => Alert.alert('Google Login', 'Would be implemented')}
                leftIcon={<Ionicons name="logo-google" size={20} color={Colors.primary} />}
              />
              
              <Spacer height={12} />
              
              <Button
                title="Continue with Apple"
                variant="secondary"
                onPress={() => Alert.alert('Apple Login', 'Would be implemented')}
                leftIcon={<Ionicons name="logo-apple" size={20} color={Colors.primary} />}
              />
            </View>

            <Spacer height={40} />

            {/* Register Link */}
            <View style={styles.registerContainer}>
              <ThemedText style={styles.registerText}>Don't have an account? </ThemedText>
              <Link href="/register" asChild>
                <TouchableOpacity>
                  <ThemedText style={styles.registerLink}>Sign Up</ThemedText>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </ScrollView>
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
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
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    color: '#666',
  },
  registerLink: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
    marginLeft: 4,
  },
});