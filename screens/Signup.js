import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView,
	Platform,
	StatusBar,
	Image,
	TextInput,
	Alert,
	TouchableOpacity,
	Text,
} from 'react-native';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import db from '../config.js'


export default class SignupScreen extends React.Component {
constructor(props){
    super(props)
    this.state={
        email: '',
        passord: '',
        confirmPassword: '',
        first_name: '',
        last_name: ''
    }
}

registerUser= (email, password, confirmPassword, first_name, last_name)=>{
	if (password == confirmPassword) {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                Alert.alert('User registered!!');
                console.log(userCredential.user.uid);
                this.props.navigation.replace('Login');

                const dbRef = ref(db, '/users/' + userCredential.user.uid);

                set(dbRef, {
                    email: userCredential.user.email,
                    first_name: first_name,
                    last_name: last_name,
                });
            })
            .catch((error) => {
                Alert.alert(error.message);
            });
    } else {
        Alert.alert("Passwords don't match!");
    }

}
render(){
    const { email, password, confirmPassword, first_name, last_name } =
    this.state;
    return(
        <View style={styles.container}>
            <Text style={styles.appTitleText}> Sign up here! </Text>
            <TextInput
				style={styles.textinput}
				onChangeText={(text) => this.setState({ first_name: text })}
				placeholder={'First name'}
				placeholderTextColor={'#FFFFFF'}
			/>
			<TextInput
				style={styles.textinput}
				onChangeText={(text) => this.setState({ last_name: text })}
				placeholder={'Last name'}
				placeholderTextColor={'#FFFFFF'}
			/>
			<TextInput
				style={styles.textinput}
				onChangeText={(text) => this.setState({ email: text })}
				placeholder={'Enter Email'}
				placeholderTextColor={'#FFFFFF'}
			/>
			<TextInput
				style={styles.textinput}
				onChangeText={(text) => this.setState({ password: text })}
				placeholder={'Enter Password'}
				placeholderTextColor={'#FFFFFF'}
				secureTextEntry
					/>
			<TextInput
				style={styles.textinput}
				onChangeText={(text) => this.setState({ confirmPassword: text })}
				placeholder={'Re-enter Password'}
				placeholderTextColor={'#FFFFFF'}
				secureTextEntry
			/>
            <TouchableOpacity
				style={[styles.button, { marginTop: 20 }]}
				onPress={() =>
				this.registerUser(
					email,
					password,
					confirmPassword,
					first_name,
					last_name
							)
			}>
                <Text style={styles.buttonText}> Register!</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.replace('Login')}>
				<Text style={styles.buttonTextNewUser}>Login ?</Text>
			</TouchableOpacity>
        </View>
    )
}


}
const styles= StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#d5bcf0',
		alignItems: 'center',
		justifyContent: 'center',
	},
    appTitleText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 40,
		fontStyle: 'bold',
	},
    textinput:{
        borderWidth: 4,
        borderColor: 'black',
        borderRadius: 10
     },
     button:{
        alignSelf: 'center',
        borderColor: 'black',
        borderWidth: 4,
        borderRadius: 10,
        flexDirection: 'row',
        height: 30
         },
    buttonText: {
        fontSize: 17,
        color: '#15193c',
    },
    buttonTextNewUser: {
        fontSize: 12,
        color: '#FFFFFF',
        textDecorationLine: 'underline',
    }
})