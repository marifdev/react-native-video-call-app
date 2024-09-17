import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, Button, View, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import StyledButton from '@/components/StyledButton'
import SignInWithOAuth from '@/components/SignInWithOAuth'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      // console.error(JSON.stringify(err, null, 2))
      Alert.alert('Whoops', 'Invalid email or password')
    }
  }, [isLoaded, emailAddress, password])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className='justify-center flex-1 gap-2 p-5 bg-white'
    >
      <View
        className='flex items-center justify-center flex-1'
      >
        <MaterialIcons name='video-chat' size={150} color='#4f46e5' />
      </View>
      <View
        className='flex-1'
      >
        <TextInput
          className='p-5 mb-2 border-2 border-indigo-600 rounded-lg'
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
        <TextInput
          className='p-5 border-2 border-indigo-600 rounded-lg'
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <View
          className='my-5 border-b border-indigo-600'
        />
        <StyledButton title='Sign In' onPress={onSignInPress} />

        <Text
          className='my-3 font-bold text-center text-indigo-600'
        >OR</Text>
        <SignInWithOAuth />
        <View
          className='flex flex-row justify-center mt-5'
        >
          <Text
          >Don't have an account? </Text>
          <Link
            href='/(auth)/sign-up'
            className='font-bold text-blue-500 underline'
          >Sign Up</Link>
        </View>
      </View>

    </KeyboardAvoidingView>
  )
}