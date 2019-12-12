import React from 'react';
import { StyleSheet } from 'react-native';

export const ShoppingbagStyles = StyleSheet.create({
    title: {
      fontSize: 25,
      alignItems: 'center',
      paddingTop: 20,
      paddingBottom: 10,
      marginLeft: 15
    },
    text: {
      fontSize: 20,
      alignItems: 'center',
      paddingBottom: 15,
      paddingTop: 15,
      paddingLeft: 25,
      paddingRight: 20,
      marginLeft: 15
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      marginTop: 10
    },
    textFont30: {
        fontSize: 30
      },
    animationFont:{
      fontSize: 22,
      paddingBottom: 15,
      paddingTop: 15,
      paddingLeft: 25,
      paddingRight: 20,
       marginLeft: 15
    },
    boldFirstLetter: {
      fontWeight: "bold",
      fontSize: 35,
      color: "#003067"
    },
    NavigationButtons: {
      padding: 10,
      alignItems: "center",
      marginTop: 10,
      marginLeft: 20,
      marginRight: 20,
      backgroundColor: "#fff",
      shadowColor: "#000000",
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.8,
      shadowRadius: 3,
      elevation: 5,
      borderRadius: 4,
      marginBottom: 10
    },
    ViewStyle: {
      backgroundColor: "#DCDCDC",
      height: "100%"
    },
    TextCenter: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
    }
  });
