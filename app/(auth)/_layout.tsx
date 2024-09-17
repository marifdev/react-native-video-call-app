import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/(call)'} />
  }
  return (
    <SafeAreaView className='flex-1 bg-appPurple'>
      <Stack
      >
        <Stack.Screen name='sign-in'
          options={{
            headerShown: false,
            title: 'Sign In',
          }}
        />
        <Stack.Screen name='sign-up'
          options={{
            title: 'Create a new account',
            headerBackTitle: 'Sign In',

          }}
        />
      </Stack>
    </SafeAreaView>
  )
}