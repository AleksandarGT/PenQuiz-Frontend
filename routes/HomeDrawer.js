
import React from 'react';
import { authActions } from '../actions';
import {
    createDrawerNavigator, DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { useWindowDimensions } from 'react-native';
import { View, Button, Text } from 'react-native';

const Drawer = createDrawerNavigator();

export function HomeDrawer() {

    const actions = authActions();
    const dimensions = useWindowDimensions();

    const isLargeScreen = dimensions.width >= 768;

    function CustomLogout(props) {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem label="Logout" onPress={() => actions.logout()} />
            </DrawerContentScrollView>
        );
    }

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: isLargeScreen ? false : true,
                drawerType: isLargeScreen ? 'permanent' : 'front',
                drawerStyle: isLargeScreen ? null : { width: '80%', },
            }}
            drawerContent={props => <CustomLogout {...props} />}
        >
            <Drawer.Screen name="Feed" component={Feed} />
            <Drawer.Screen name="Article" component={Article} />
        </Drawer.Navigator>
    );
}

function Feed({ navigation, route }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Feed Screen</Text>
            <Button
                title="Go to articlke"
                onPress={() => {
                    navigation.navigate('Article', {
                        url: 'picachu-i-want-u'
                    })
                }}
            />
        </View>
    );
}

function Article({ navigation, route }) {
    const url = route.params?.url ?? "DefaultURL"
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Article Screen: {url}</Text>
        </View>
    );
}