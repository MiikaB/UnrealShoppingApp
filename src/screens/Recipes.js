import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import { ListItem, Button, Input, Overlay } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Snackbar } from 'react-native-paper';


export default function Recipes() {
      
  const [recipes, setRecipes] = useState([]);
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [guide, setGuide] = useState('');
  const [id, setId] = useState('');
  const [loader, setLoader] = useState(true);
  const url = "";
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(false);

      useEffect(() => {
        fetchRecipes();
      },[]); 

      const fetchRecipes = () => {
        fetch(url)
        .then(response => response.json())
        .then((responseJSON) => {
          setId(responseJSON.recipe.id);
          setRecipes(responseJSON.recipe);
          setLoader(false);
          console.log(recipes);
          })
        .catch(error => console.log("ERROR HAPPENED:::" + error))
      }

      const postRecipe = () => {
        fetch(url, {
          method:'POST',
          headers:{
            'Accept' : 'application/json',
            'Content-Type' : 'application/json;charset=utf-8',
          },
          body: JSON.stringify({
            'name' : name,
            'ingredients' : ingredients,
            'id' : id + 1,
            'guide' : guide,
          })
        });
        setVisible(false);
        setName('');
        setIngredients('');
        setGuide('');
        fetchRecipes();
        setSuccess(true);
      }

      const deleteRecipe = (index) => {
        fetch(url + "?id=" + index, {
          method:'DELETE',
        });
        fetchRecipes();
      }

      const Separator = () => {
        return <View style={styles.separator} />;
    }

      if(loader){
        return(
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#0000ff"/>
          </View>
        )   
        }
      return (
        <View style={styles.container}>
        <View style={{marginBottom:5}}>
        <Button
            title="New Recipe"
            onPress={() => {
              setVisible(true);
            }}
          />
        </View>
        <Overlay
          isVisible={visible}
          windowBackgroundColor="rgba(255, 255, 255, .5)"
          overlayBackgroundColor="white"
          width="87%"
          height="87%">
          <Text style={{fontSize:20,marginTop:20, textAlign:'center', alignItems:'center', marginBottom:15}}>New Recipe</Text>
          <View style={{marginBottom:30}}>
          <Input style={{marginBottom:15}} placeholder='Recipe Name' onChangeText = {name => setName(name)} value={name}
        />
          <Input style={{marginBottom:15}} placeholder='Ingredients' onChangeText = {ingredients => setIngredients(ingredients)} value={ingredients}
        />
          <Input style={{marginBottom:20}} placeholder='Guide' onChangeText = {guide => setGuide(guide)} value={guide}
        />
        </View>
          <View style={{marginTop:30, marginBottom:10, justifyContent:'center'}}>
          <Button style={{}} title="Add Recipe" onPress={postRecipe}/>
          </View>
          <Button title="Cancel" onPress={() => (setVisible(false))}/>
          </Overlay>
        <ScrollView>

        {recipes.map((item, index) => (
          <View>
          <ListItem
          key={(index) => index.toString()}
          key={index}
          title={`${item.name}`}
          titleStyle={{fontWeight:'bold', fontSize:20}}
          subtitle={`\nAinekset: ${item.ingredients}\n\nOhje: ${item.guide}`}
          subtitleStyle={{fontSize:18}}
          onLongPress={() => Alert.alert('Deleting, are you sure?','',
          [
            {text: 'Delete', onPress: () => {deleteRecipe(item.id)}},
            {text: 'Cancel', style:'cancel'},
          ],
          {cancelable: false},
          )}
          chevron
        />
        <Separator/>
        </View>
        ))}        
        </ScrollView>
        <View>
        <Snackbar
              style={{backgroundColor:'green',marginTop:20}}
              visible={success}
              onDismiss={() => setSuccess(false)}>
                Success! Recipe saved to database
        </Snackbar>

        </View>
        </View>
      )};

  Recipes.navigationOptions = ({navigate}) => ({title: "Recipes"})

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#DCDCDC"
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
     },
     recipe:{
       borderRadius:1,
       borderColor:'black'
     },
     separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });