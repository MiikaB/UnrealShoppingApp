import React, { Component } from 'react';
import {TouchableOpacity ,StyleSheet, View, Text, Button, FlatList, ActivityIndicator } from 'react-native';



class Recipes extends Component {
  static navigationOptions = {
    title : 'Recipes'
  };
  constructor(props) {
    super(props);
    this.state = { recipes: [] };
  }
      
  componentDidMount() {
    this.fetchRecipes;
  }
      fetchRecipes = () => {
        fetch("http://10.213.106.145:8080/recipebook_miika/recipes")
        .then(response => response.json())
        .then(responseJSON => this.setState({ recipes: responseJSON.recipe }))
        console.log(recipes)
        .catch(error => console.log(error))
      }

  flatListItemSeparator = () => {
        return (
          <View style={{
             height: .5,
             width:"100%",
             backgroundColor:"rgba(0,0,0,0.5)",
        }}
        />
        );
        }

    renderItem = (recipes) => {
          <TouchableOpacity style={styles.list}>
          <Text style={styles.lightText}>{recipes.id}</Text>

          </TouchableOpacity>
      };

      /*
      if(this.state.isLoading){
        return(
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        )   
      }
      */
     render() {
      return (
        <View>
          <Text style={{fontSize:24}}>Reseptit {this.state.recipes.name}</Text>
        </View>
      )};
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
     },
    loader:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff"
     },
    list:{
      paddingVertical: 4,
      margin: 5,
      backgroundColor: "#fff"
     }
  });

export default Recipes;