
import React from 'react';
import { useAuthActions } from '../hooks';
import {
    createDrawerNavigator, DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { View, Button, Text, useWindowDimensions } from 'react-native'
import { Center } from 'native-base'
import { HomeGame } from '../components/HomeGame'
const Drawer = createDrawerNavigator();

export function HomeDrawer() {

    const actions = useAuthActions();
    const dimensions = useWindowDimensions();

    const isLargeScreen = dimensions.width >= 768;

    function CustomLogout(props) {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem inactiveTintColor="#DEDEDE" label="Logout" onPress={() => actions.logout()} />
            </DrawerContentScrollView>
        );
    }

    const drawerScreenOptions = {
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "#DEDEDE",
        drawerActiveBackgroundColor: "#0E328E",
    }

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: isLargeScreen ? false : true,
                drawerType: isLargeScreen ? 'permanent' : 'front',
                drawerStyle: isLargeScreen ? {
                    borderRightWidth: 0, // Make 1 if you want border between drawer and content
                    backgroundColor: "#032157"
                } : {
                    backgroundColor: "#032157",
                    width: "80%"
                },
            }}
            drawerContent={props => <CustomLogout {...props} />}
        >
            <Drawer.Screen options={drawerScreenOptions} name="Game" component={HomeGame} />
        </Drawer.Navigator>
    );
}