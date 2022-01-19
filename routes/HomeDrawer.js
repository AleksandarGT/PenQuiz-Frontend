
import React, { useCallback, useEffect } from 'react'
import { useAuthActions, useSignalR } from '../hooks'
import {
    createDrawerNavigator, DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer'
import { View, Button, Text, useWindowDimensions, InteractionManager } from 'react-native'
import { Center } from 'native-base'
import { AccountDetails } from '../components/AccountDetails'
import PublicGameDashboard from '../components/GameDashboardComponents/PublicGameDashboard'
import PrivateGameDashboard from '../components/GameDashboardComponents/PrivateGameDashboard'
import { SubmitQuestionBase } from '../components/AddQuestionComponents/SubmitQuestionBase'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { gameInstanceAtom } from '../state'

const Drawer = createDrawerNavigator()

export function HomeDrawer() {
    useSignalR()

    const [gameInstance, setGameInstance] = useRecoilState(gameInstanceAtom)
    const actions = useAuthActions()
    const dimensions = useWindowDimensions()

    const isLargeScreen = dimensions.width >= 768





    function CustomLogout(props) {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem inactiveTintColor="#DEDEDE" label="Logout" onPress={() => actions.logout()} />
            </DrawerContentScrollView>
        )
    }

    // const isFocused = useIsFocused()

    // useEffect(() => {
    //     if (!isFocused || gameInstance == null) return
    //     setGameInstance(null)
    // }, [isFocused])


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
            <Drawer.Screen options={drawerScreenOptions} name="Public Game" component={PublicGameDashboard} />
            <Drawer.Screen options={drawerScreenOptions} name="Private Game" component={PrivateGameDashboard} />
            <Drawer.Screen options={drawerScreenOptions} name="Account" component={AccountDetails} />
            <Drawer.Screen options={drawerScreenOptions} name="Submit Question" component={SubmitQuestionBase} />
        </Drawer.Navigator>
    )
}