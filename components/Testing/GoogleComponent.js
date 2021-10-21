import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View, Button, Alert } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    iosClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    androidClientId: 'GOOGLE_GUID.apps.googleusercontent.com',
    webClientId: '765711093147-j8b16iv096jprl4q92rqlrjcrb7rm0bl.apps.googleusercontent.com',
  });

  const useRestrictedRoute = ({ token }) => {
    console.log(token)
    fetch("http://localhost:5000/api/account", {
      headers: {
        'Authorization': 'Bearer ' + token,
      }
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)

        setInterval(() => {
          refreshToken()
        }, 5000)
      })
      .catch((e) => console.log(e))
  }

  const refreshToken = () => {
    fetch("http://localhost:5000/api/account/refresh-token", {
      method: 'POST',
      credentials: 'include',
    })
    .then((response) => response.json())
    .then((json) => {
      console.log("Successfully fetched refresh token, response is:")
      console.log(json)
    })
    .catch((er) => console.log(er))
  }

  const authenticateUser = () => {
    fetch("http://localhost:5000/api/account/authenticate", {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        TokenId: response.params.id_token
      })
    })
    .then((response) => response.json())
    .then((json) => {
      useRestrictedRoute({ token: json.jwtToken })
    })
  }

  React.useEffect(() => {
    if (response?.type === 'success') {
      console.log(response)

      authenticateUser()
    }
  }, [response]);

  return (
    <View style={{ alignItems: "center", justifyContent: "center", }}>
      <CustomButton onpress={() => {
        console.log("ey")
        promptAsync()
      }} />
    </View>
  );
}

const CustomButton = ({ onpress }) => {
  return (
    <TouchableOpacity
      style={{ height: 150, width: 150, alignItems: "center", justifyContent: "center", backgroundColor: "black", }}
      onPress={onpress}
    >
      <Text style={{ color: "white" }}>{"yoyo"}</Text>
    </TouchableOpacity>
  )
}