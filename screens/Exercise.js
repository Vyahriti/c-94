import React from 'react';
import {View,Text,StyleSheet,TouchableOpacity,  FlatListView} from 'react-native'
import axios, { formToJSON } from 'axios';

//const axios = require('axios');
let fullresponse,response1,responseName1,responseEquipment1, responseExercise1
respon= this.state.response
const options = {
  method: 'GET',
  url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/lower%20legs',
  params: {limit: '10'},
  headers: {
    'X-RapidAPI-Key': 'a3ce41db6bmsh4d0152bd2b3c4ddp1f4d82jsn1d842efac78b',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
};


try {
  
	const response = await axios.request(options);
 	// console.log(response.data);
  fullresponse=response.data
  response1=JSON.stringify(response.data)
// flatlist.. item,key,renderitem
  responseEquipment1= response.data[0].equipment
  responseName1= response.data[0].name
  responseExercise1= response.data[0].instructions
this.setState({response: responseEquipment1, responseExercise1, responseName1})
console.log(respon)
} catch (error) {
	console.error(error);
}

export default class ExerciseScreen extends React.Component {
    constructor(props){
        super(props)
        this.state={
            bodyPart: '',
            response: []
        }
    }


renderItem = ({item})=>{

}

keyExtractor = (item, index) => index.toString();

render(){
    return(
        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}> Nutrition Information </Text>
            </View>
            <Text style={{marginTop: 15, fontColor: 'black', fontSize: 30, alignSelf: 'center'}}> 
                Enter a body part below and workouts to train it will generate
            </Text>
            <TextInput 
                style={styles.input}
                placeholder= 'Enter Workout'
                onChangeText={(text)=> this.setState({bodyPart: text})} />

            <FlatListView
            keyExtractor={this.keyExtractor}
            data={response}
            renderItems={this.renderItem}
            horizontal={true}
            />

        </View>
    )
}


}

const styles=StyleSheet.create({
    titleContainer: {
        flex:1,
        padding:24
    },
    titleText:{
        marginTop: 20,
        fontSize: 50,
        fontWeight: 'bold',
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 4,
        backgroundColor: '#d5bcf0',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 4,
        padding: 10,
        alignSelf: 'center'
      },
    })
    