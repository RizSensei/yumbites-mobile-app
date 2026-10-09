import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Spacer, ThemedText, ThemedView } from '../../components/theme';
import { Colors } from '../../constants/Colors';
import { loginStyles as styles } from '../../styles/login';
import { useAuth } from '../../contexts/auth-context';

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
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      await login(data);
      Alert.alert('Success', 'Logged in successfully!');
      router.replace('/(dashboard)/home');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  return (
    <ThemedView safeArea={true} style={styles.screen}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <LinearGradient colors={['#F78355', '#EC6345', '#D94D40']} style={styles.hero}>
            <View style={styles.brandRow}>
              <View style={styles.brandIcon}>
                <Ionicons name="restaurant" size={19} color="#E85D40" />
              </View>
              <ThemedText style={styles.brandName}>YUMBITES</ThemedText>
              <ThemedText style={styles.brandDot}> · FOOD, FEEL GOOD</ThemedText>
            </View>
            <View style={styles.heroContent}>
              <View style={styles.heroCopy}>
                <ThemedText style={styles.eyebrow}>YOUR TABLE IS WAITING</ThemedText>
                <ThemedText style={styles.title}>Good food.{'\n'}Great to see you.</ThemedText>
                <ThemedText style={styles.subtitle}>Sign in and let the cravings begin.</ThemedText>
              </View>
              <View style={styles.plate}>
                <ThemedText style={styles.foodEmoji}>🍜</ThemedText>
              </View>
            </View>
            <View style={styles.heroCircle} />
          </LinearGradient>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.formHeading}>
              <ThemedText style={styles.formTitle}>Welcome back</ThemedText>
              <ThemedText style={styles.formSubtitle}>Pick up right where you left off.</ThemedText>
            </View>
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
                  leftIcon={<Ionicons name="mail-outline" size={18} color="#A18F83" />}
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
                  leftIcon={<Ionicons name="lock-closed-outline" size={18} color="#A18F83" />}
                  rightIcon={
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                      hitSlop={8}
                    >
                      <Ionicons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        size={19}
                        color="#A18F83"
                      />
                    </TouchableOpacity>
                  }
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

            <Spacer height={20} />

            {/* Login Button */}
            <Button
              title={isSubmitting ? "Signing in..." : "Sign In"}
              onPress={handleSubmit(onSubmit)}
              loading={isSubmitting}
              disabled={isSubmitting}
            />

            <Spacer height={22} />

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <ThemedText style={styles.dividerText}>or</ThemedText>
              <View style={styles.divider} />
            </View>

            <Spacer height={22} />

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

            <Spacer height={28} />

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