import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, Button, View, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import StyledButton from '@/components/StyledButton'

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
      className='justify-center flex-1 gap-2 p-5 bg-appPurple'
    >
      <MaterialIcons name='video-chat' size={160} color='white'
        className='self-center w-full'
      />
      <TextInput
        className='p-5 bg-white rounded-lg'
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        className='p-5 bg-white rounded-lg'
        value={password}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      {/* divider */}
      <View
        className='my-5 border-b border-white'
      />
      <StyledButton title='Sign In' onPress={onSignInPress} />
      <View>
        <Text>Don't have an account?</Text>
        <Link href="/sign-up">
          <Text>Sign up</Text>
        </Link>
      </View>
    </KeyboardAvoidingView>
  )
}