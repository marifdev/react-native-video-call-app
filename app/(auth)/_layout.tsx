import React from 'react'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'

export default function AuthRootLayout() {

  return (
    <SafeAreaView className='flex-1 bg-appPurple'>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.tabBarActiveTintColor,
          },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name='sign-in'
          options={{
            headerShown: false,
            title: 'Sign In',
          }}
        />
        <Stack.Screen name='sign-up'
          options={{
            headerStyle: {
              backgroundColor: Colors.tabBarActiveTintColor,
            },
            headerTintColor: '#fff',
            title: 'Create a new account',
            headerBackTitle: 'Sign In',

          }}
        />
      </Stack>
    </SafeAreaView>
  )
}