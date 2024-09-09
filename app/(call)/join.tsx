import { useClerk } from '@clerk/clerk-expo'
import { View, Text, Button } from 'react-native'
import React from 'react'

export default function JoinScreen() {
  const { signOut } = useClerk()
  return (
    <View>
      <Text>JoinScreen</Text>
      <Button title='Sign out' onPress={() => signOut()} />
    </View>
  )
}