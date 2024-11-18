import { StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
const Fallback = () => {
    return (
        <View style={{alignItems: "center"}}>
            <Image source= {require('../../assets/todolist.png')} style={{width: 300, height: 300}}/>
            <Text>"Get Started – Add Your Tasks and Conquer Your Day!"</Text>
        </View>
    );
};

export default Fallback;

const styles = StyleSheet.create({});