import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import facebook from './assets/facebook.png'
import password from './assets/password.png'
import user from './assets/user.png'
import email from './assets/email.png'
import { useEffect, useState } from 'react';

export default function App() {
  const [useremail, setEmail] = useState("");
  const [username, setName] = useState("");
  const [userpassword, setPassword] = useState("");
  const [checkSubmit, setSubmit] = useState(false);
  const [screen, setScreen] = useState(false);

  const isValidEmail = (useremail) => {
    return useremail.includes("@") && useremail.includes(".");
  }


  useEffect(() => {
    const show = Keyboard.addListener("keyboardDidShow", () => {
      setScreen(true);
    });
    const hide = Keyboard.addListener("keyboardDidHide", () => {
      setScreen(false);
    });
    return () => {
      show.remove();
      hide.remove();
    }
  }, []);

  const HandleSubmit = () => {
    if (username.trim() === "") {
      Alert.alert('Please enter username');
    }
    if (useremail.trim() === "" || !isValidEmail(useremail)) {
      Alert.alert('Please enter a valid email');
    }

    if (userpassword.trim() === "" || userpassword.length < 6) {
      Alert.alert('password must have 6 characters');
    }
    else {
      setSubmit(true);
      Alert.alert("Registration Successful");
    }
  }


  const HandleClear = () => {

    setName("");
    setEmail("");
    setPassword("");
    setSubmit(false);

  }

  return (
    <SafeAreaView style={styles.safearea}>
      <KeyboardAvoidingView style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image source={facebook} style={styles.image} />
            </View>
            <View style={[styles.formContainer, !screen && { marginBottom: 0 }]}>
              <View style={styles.inputdecoration}>
                <Image source={user} style={styles.img} />
                <TextInput placeholder='Enter Name...' value={username} onChangeText={setName} style={styles.textDesign}></TextInput>
              </View>

              <View style={styles.inputdecoration}>
                <Image source={email} style={styles.img} />
                <TextInput placeholder='Enter Email...' value={useremail} onChangeText={setEmail} style={styles.textDesign}></TextInput>
              </View >

              <View style={styles.inputdecoration}>
                <Image source={password} style={styles.img} />
                <TextInput placeholder='Enter Password...' value={userpassword} onChangeText={setPassword} style={styles.textDesign} secureTextEntry></TextInput>
              </View>

            </View>
            <View style={[styles.buttoncontainer, !screen && { marginTop: 0 }]}>
              <TouchableOpacity style={styles.button} onPress={HandleSubmit}><Text style={styles.buttonfont}>Submit</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button1} onPress={HandleClear}><Text style={styles.buttonfont}>Clear</Text></TouchableOpacity>
            </View>

            <StatusBar style="auto" />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,

  },
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: '#ffffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    height: '15%',
    width: '100%',
    objectFit: 'contain',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  image: {
    height: 70,
    width: 70,

  },
  formContainer: {
    marginTop: '4%',
    height: '30%',
    width: '85%',
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: 30,

  },
  inputdecoration: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    height: 50,
    alignItems: 'center',
    borderWidth: .7,
    paddingLeft: 10,
    marginBottom: 12,
    borderRadius: 10,
  },
  textDesign: {
    fontSize: 15,
    width: '90%',
  },
  img: {
    width: '10%',
    objectFit: 'contain'
  },
  buttoncontainer: {
    marginTop: '7%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',

  },
  button: {
    width: '85%',
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: 'blue',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 5,
  },
  buttonfont: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17
  },
  button1: {
    width: '85%',
    paddingTop: 14,
    paddingBottom: 14,
    backgroundColor: 'rgba(255, 0, 0, 1)',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 5,
  },
  text: {
    padding: 0,
    margin: 0,
    height: 10,
  }



});
