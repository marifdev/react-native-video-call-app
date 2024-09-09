import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View>
      <SignedIn>
        <Text>Welcome to your Clerk app!</Text>
      </SignedIn>
      <SignedOut>
        <Text>Sign in to access your Clerk app.</Text>
      </SignedOut>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
