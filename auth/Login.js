import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import img from "../linkimagem";
import Imagem from "../components/Imagem";
import Input from "../components/Input";
import Label from "../components/Label";
import Button from "../components/Button";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin=()=>{
    Alert.alert("Login","Usuário: "+ username + " pass: "+password)
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imagem}>
        <Imagem caption={"Bem-vindo!"} source={img} />
      </View>
      <View style={styles.inputs}>
        <Label text="Username" />
        <Input
          onChangeText={(e) => setUsername(e)}          
          placeholder={"Your Username"}
          value={username}
        />
        <Label text="Password" />
        <Input
          onChangeText={(e) => setPassword(e)}
          secureTextEntry={true}
          placeholder={"Your Password"}
          value={password}
        />
      </View>
      <View style={styles.buttons}>
        <Button text={"Login"} onPress={()=>handleLogin()}/>
        <Button text={"Register"} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imagem: {
    flex: 2,
  },
  inputs: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
  },
  buttons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
