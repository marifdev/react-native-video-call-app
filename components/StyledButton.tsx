import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

type StyledButtonProps = {
  title: string,
  onPress: () => void,
  style?: any,
}
const StyledButton = ({
  title,
  onPress,
  style,
}: StyledButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
      className='w-full p-3 bg-indigo-600 rounded-md'
    >
      <Text
        className='text-base font-bold text-center text-white'
      >{title}</Text>
    </TouchableOpacity>
  )
}

export default StyledButton