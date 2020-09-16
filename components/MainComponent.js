
import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import Dishdetail from "./DIshdetailComponent";
import { View, Platform, Image, StyleSheet, SafeAreaView, ScrollView, Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from "react-navigation";
import Home from "./HomeComponent";
import { createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import {Icon} from "react-native-elements";
import {connect} from 'react-redux';
import { fetchDishes, fetchComments, fetchLeaders, fetchPromos} from "../redux/ActionCreators";

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchProms: () => dispatch(fetchPromos())
})

const MenuNavigator = createStackNavigator({
        Menu: { screen: Menu,
            navigationOptions: ({ navigation }) => ({
                headerLeft: <Icon name="menu" size={24}
                                  color= 'black'
                                  onPress={ () => navigation.toggleDrawer() } />
            })},
        Dishdetail: { screen: Dishdetail }
    },
    {
        initialRouteName: 'Menu',
        navigationOptions: {
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: "#fff"
            }
        }
    }
);

const HomeNavigator = createStackNavigator({
    Home: { screen: Home,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="menu" size={24}
                              color= 'black'
                              onPress={ () => navigation.toggleDrawer() } />
        })}
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerLeft: <Icon name="menu" size={24}
                          color= 'white'
                          onPress={ () => navigation.toggleDrawer() } />
    })
});

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="menu" size={24}
                              color= 'black'
                              onPress={ () => navigation.toggleDrawer() } />
        })}
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerLeft: <Icon name="menu" size={24}
                          color= 'white'
                          onPress={ () => navigation.toggleDrawer() } />
    })
});

const AboutNavigator = createStackNavigator({
    About: { screen: About,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="menu" size={24}
                              color= 'black'
                              onPress={ () => navigation.toggleDrawer() } />
        })}
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerLeft: <Icon name="menu" size={24}
                          color= 'white'
                          onPress={ () => navigation.toggleDrawer() } />
    })
});

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{flex:1}}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Home:
        { screen: HomeNavigator,
            navigationOptions: {
                title: 'Home',
                drawerLabel: 'Home',
                drawerIcon:({tintColor}) =>(
                    <Icon name='home' type='font-awesome' size={24} color={tintColor}/>
                )
            }
        },
    Menu:
        { screen:MenuNavigator,
            navigationOptions: {
                title: 'Menu',
                drawerLabel: 'Menu',drawerIcon:({tintColor}) =>(
                    <Icon name='list' type='font-awesome' size={24} color={tintColor}/>
                )
            },
        },
    Contact:
        { screen:ContactNavigator,
            navigationOptions: {
                title: 'Contact',
                drawerLabel: 'Contact Us',
                drawerIcon:({tintColor}) =>(
                    <Icon name='address-card' type='font-awesome' size={22} color={tintColor}/>
                )
            },
        },
    About:
        { screen:AboutNavigator,
            navigationOptions: {
                title: 'About',
                drawerLabel: 'About Us',
                drawerIcon:({tintColor}) =>(
                    <Icon name='info-circle' type='font-awesome' size={24} color={tintColor}/>
                )
            },
        }
}, {
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent
});


const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {
    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchLeaders();
        this.props.fetchProms()
        this.props.fetchComments()
    }


    onDishSelect(dishId) {
        this.setState({selectedDish: dishId})
    }
    render() {

        return (
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <AppNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex:  1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
