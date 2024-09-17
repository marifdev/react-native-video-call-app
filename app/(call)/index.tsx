import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
import Dialog from "react-native-dialog";

export default function Index() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { signOut } = useAuth();
  return (
    <View>
      <TouchableOpacity
        className="absolute top-0 right-0 p-5"
        onPress={() => {
          setDialogOpen(true);
        }}
      >
        <MaterialCommunityIcons name="exit-run" size={24} color="blue" />
      </TouchableOpacity>
      <Dialog.Container visible={dialogOpen}>
        <Dialog.Title>Sign Out</Dialog.Title>
        <Dialog.Description>Are you sure you want to sign out?</Dialog.Description>
        <Dialog.Button
          label="Cancel"
          onPress={() => {
            setDialogOpen(false);
          }}
        />
        <Dialog.Button
          label="Sign Out"
          onPress={async () => {
            await signOut();
            setDialogOpen(false);
          }}
        />
      </Dialog.Container>
      <SignedIn>
        <Text>Welcome to your Clerk app!</Text>
      </SignedIn>
    </View>
  );
}
