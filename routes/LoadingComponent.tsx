import { Box, Button, Center, Image, Text } from 'native-base';
import React from 'react';
import { View, ActivityIndicator, ImageBackground, Linking } from 'react-native';


interface IProps {
  message: string
  link?: string
}

export function LoadingComponent(props: IProps) {

  const handleLinkPress = () => {
    if (!props.link) return

    Linking.openURL(props.link)
  }

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
    }}>
      <ImageBackground source={require('../assets/crackbd.jpg')} resizeMode="cover" style={{
        flex: 1,
        justifyContent: "center"
      }}>

        <Center mb={2} >
          <Box backgroundColor={"#C8FBFF"} p={9} shadow={5} borderWidth={1} borderColor="#C5C5C5" borderRadius={25}>
            <Center>
              <Image
                mb={4}
                source={require('../assets/penguinLogoBackground.svg')}
                style={{ resizeMode: 'contain' }}
                alt="Alternate Text"
                size="xl"
              />
              <Text color="black" fontWeight="semibold" fontSize={{ base: "md", md: "lg", lg: "xl" }}>{props.message}</Text>
              {props.link && <Button mt={2} onPress={handleLinkPress} colorScheme={'cyan'}>
                <Text>Download PenQuiz</Text>
              </Button>}

              {/* Spacer */}
              <Box my={2} />
              {!props.link && <ActivityIndicator color="#032157" size="large" />}
            </Center>
          </Box>
        </Center>
      </ImageBackground>
    </View>
  )
}
