
import React, {  } from 'react'
import { useAuthActions, useSignalR } from '../hooks'
import {
    createDrawerNavigator, DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer'
import { useWindowDimensions, Platform } from 'react-native'
import { AccountDetails } from '../components/AccountDetails'
import PublicGameDashboard from '../components/GameDashboardComponents/PublicGameDashboard'
import PrivateGameDashboard from '../components/GameDashboardComponents/PrivateGameDashboard'
import { SubmitQuestionBase } from '../components/AddQuestionComponents/SubmitQuestionBase'
import { useRecoilValue } from 'recoil'
import { authAtom } from '../state'
import jwt_decode from "jwt-decode";
import VerifyQuestionComponent from '../components/AdminQuestionComponents/VerifyQuestionComponent'
import ViewQuestionComponent from '../components/AdminQuestionComponents/ViewQuestionComponent'
import BaseAdminAccountsComponent from '../components/AdminAccountsComponents/BaseAdminAccountsComponent'
import { AuthJWTToken } from '../types/authTypes'

const Drawer = createDrawerNavigator()

export function HomeDrawer() {
    useSignalR()

    const auth = useRecoilValue(authAtom)
    const actions = useAuthActions()
    const dimensions = useWindowDimensions()

    const isLargeScreen = dimensions.width >= 768 || Platform.OS != "web"

    const isAdmin = () => auth && jwt_decode<AuthJWTToken>(auth.jwtToken).role == "admin" ? true : false


    function CustomLogout(props: any) {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem inactiveTintColor="#DEDEDE" label="Logout" onPress={() => actions.logout()} />
            </DrawerContentScrollView>
        )
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
            <Drawer.Screen options={drawerScreenOptions} name="Public Game" component={PublicGameDashboard} />
            <Drawer.Screen options={drawerScreenOptions} name="Private Game" component={PrivateGameDashboard} />
            <Drawer.Screen options={drawerScreenOptions} name="Account" component={AccountDetails} />
            <Drawer.Screen options={drawerScreenOptions} name="Submit Question" component={SubmitQuestionBase} />
            {isAdmin() && <Drawer.Screen options={drawerScreenOptions} name="View users" component={BaseAdminAccountsComponent} />}
            {isAdmin() && <Drawer.Screen options={drawerScreenOptions} name="Verify Questions" component={VerifyQuestionComponent} />}
            {isAdmin() && <Drawer.Screen options={drawerScreenOptions} name="View Questions" component={ViewQuestionComponent} />}
        </Drawer.Navigator>
    )
}