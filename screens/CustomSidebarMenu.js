import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image } from 'react-native';
import { getAuth } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import db from '../config'
import {
	DrawerContentScrollView,
	DrawerItemList,
} from '@react-navigation/drawer';

export default class CustomSidebarMenu extends component{
	componentDidMount() {
		const auth = getAuth();
		const userId = auth.currentUser.uid;}
  
 render(){
    return(
        <View style={{flex:1, backgroundColor: 'FFD1DC', }}>
			<Image
			    source={require('../assets/logo.png')}
				style={styles.sideMenuProfileIcon}></Image>
            <DrawerContentScrollView {...props}>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>
        </View>
    )
   }     


}

const styles = StyleSheet.create({
	sideMenuProfileIcon: {
		width: 140,
		height: 140,
		borderRadius: 30,
		alignSelf: 'center',
		marginTop: 60,
		resizeMode: 'contain',
	},
});