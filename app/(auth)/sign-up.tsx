import * as React from 'react'
import { TextInput, Button, View, KeyboardAvoidingView, Platform, Alert, Text } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import StyledButton from '@/components/StyledButton'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert('Whoops', err.errors[0].message)
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      Alert.alert('Whoops', 'Invalid code')
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className='justify-center flex-1 gap-2 p-5 bg-white'
    >
      {!pendingVerification && (
        <>
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
          <StyledButton title='Sign Up' onPress={onSignUpPress} />
        </>
      )}
      {pendingVerification && (
        <>
          <Text
            className='text-lg text-center'
          >
            We've sent a verification code to your email. Please enter it below.
          </Text>
          <TextInput
            className='p-5 my-5 border-2 border-indigo-600 rounded-lg '
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)} />
          <StyledButton title="Verify Email" onPress={onPressVerify} />
        </>
      )}
    </KeyboardAvoidingView>
  )
}