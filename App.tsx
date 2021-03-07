import * as React from "react";
import { Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

const AppContext = React.createContext({});

const ModalScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Modal</Text>
    </View>
  );
};

const HomeScreen = ({ navigation }: any) => {
  const { text }: any = React.useContext(AppContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Your text: {text}</Text>
      <Button title="Open modal" onPress={() => navigation.navigate("Modal")} />
      <Button
        title="Open settings"
        onPress={() => navigation.navigate("Settings")}
      />
    </View>
  );
};

const ProfileScreen = () => {
  const { text, setText }: any = React.useContext(AppContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Changing state inside tab screen should not redirect us to home"
        onPress={() => setText(text === "hello" ? "hi" : "hello")}
      />
    </View>
  );
};

const SettingsScreen = () => {
  const { text, setText }: any = React.useContext(AppContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Changing state inside Screen will not redirect us"
        onPress={() => setText(text === "hello" ? "hi" : "hello")}
      />
    </View>
  );
};

export default function App() {
  const [text, setText] = React.useState("");

  const Root = createStackNavigator();
  const Main = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const TabStack = () => {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  };

  const MainNav = () => {
    return (
      <Main.Navigator>
        <Main.Screen name="HomeTabs" component={TabStack} />
        <Main.Screen name="Settings" component={SettingsScreen} />
      </Main.Navigator>
    );
  };

  return (
    <AppContext.Provider value={{ text, setText }}>
      <NavigationContainer>
        <Root.Navigator mode="modal">
          <Root.Screen name="MainNav" component={MainNav} />
          <Root.Screen name="Modal" component={ModalScreen} />
        </Root.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
