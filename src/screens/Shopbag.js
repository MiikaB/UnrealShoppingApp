import React, { useState, useEffect, useCallback} from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { Input, Button, ListItem , Overlay} from 'react-native-elements';
import { Checkbox, Snackbar } from 'react-native-paper';
import * as firebase from 'firebase';


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

firebase.initializeApp(firebaseConfig);

firebase.database().ref('items/');

export default function Shopbag() {
  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [id, setId] = useState('');
  const [items, setItems] = useState([]);
  const [navigationOptions, setNavigationOptions] = useState('');
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(false);
  const [iteminfo, setItemInfo] = useState('');

useEffect(() => {
  setNavigationOptions({ title : 'Shopping Bag'});
  fetchData();
},[]);

const fetchData = useCallback(() => {
  firebase.database().ref('items/').on('value', snapshot => {
    const data = snapshot.val();
    const prods = Object.values(data);
    const keys = Object.keys(data);
    setItems(prods);
    setId(keys);
});
});

const saveItem = () => {
  firebase.database().ref('items/').push(
      {'product': product, 'amount': amount, 'checked' : false});
  setProduct('');
  setAmount('');
  setSuccess(true);
}

const deleteItem = (index) => {
firebase.database().ref('items/' + id[index]).remove()
}

const changeStatus = (index, checked) => {
  firebase.database().ref('items/' + id[index]).update(
    {'checked': !checked}
  ).then(() => {
    fetchData()
  })
}
      return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#DCDCDC'}}>
        <Overlay
            isVisible={visible}
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            overlayBackgroundColor="white"
            width="90%"
            height="85%"
          >
          <KeyboardAvoidingView behavior='padding' enabled>
          <Text style={{fontSize:20,marginTop:18,marginBottom:20, textAlign: 'center', justifyContent: 'center'}}>Enter item info</Text>
          <View style={{marginBottom:30}}>
              <Input placeholder='Product' onChangeText = {product => {setProduct(product),setItemInfo(product)}} value={product}
              />
              <Input placeholder='Amount' onChangeText = {amount => setAmount(amount)} value={amount}
              />
          </View>
          <View>
              <View style={{marginBottom:20}}>
                <Button title='Add' onPress={saveItem} />
              </View>
            <Button title='Exit' onPress={() => setVisible(false)}/>
          </View>
          </KeyboardAvoidingView>
          <Snackbar
              style={{backgroundColor:'green',marginTop:20}}
              visible={success}
              onDismiss={() => setSuccess(false)}>
                Success! Added {iteminfo} to basket
          </Snackbar>
        </Overlay>

            <View style={{width:'100%', height:'100%'}}>
            <Button
                title="Add to shopping basket"
                onPress={() => {
                  setVisible(true);
                }}
              />
              <Text
              style={{textAlign:'center', fontSize:20,
              marginTop:10, marginBottom:10, justifyContent:'center',
              textAlign:'center'}}>To Buy:</Text>
            <ScrollView>
            {
              items.map((item, index) => (
                <ListItem
                  key ={(index) => index.toString()}
                  key={index}
                  title={item.product}
                  titleStyle={{fontWeight:'bold'}}
                  subtitle={item.amount}
                  onLongPress={() => Alert.alert('Deleting, are you sure?','',
                  [
                    {text: 'Delete', onPress: () => {deleteItem(index)}},
                    {text: 'Cancel', style:'cancel'},
                  ],
                  {cancelable: false},
                  )}
                  bottomDivider
                  chevron
                  onPress={() => {changeStatus(index, item.checked) }}
                  rightElement={() => <Checkbox
                    status={item.checked ? 'checked' : 'unchecked'}
                    onPress={() => { changeStatus(index, item.checked) }}
                    />
                  }
                  />
                ))}
              </ScrollView>
            </View>
        </View>
      );
  }

  Shopbag.navigationOptions = ({navigate}) => ({title: "Shopping basket"})

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#DCDCDC',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });