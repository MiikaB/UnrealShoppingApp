import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, } from 'react-native';
import SliderEntry from '../modules/SliderEntry';
import { sliderWidth, itemWidth } from '../styles/SliderEntry.style';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';

const entries = [
  {
    title:'Fresh tomatos',
    illustration: 'https://i.imgur.com/4XScU8J.jpg',
  },
  {
   title:'Vegetable Soup',
   illustration: 'https://i.imgur.com/HFEFssS.jpg',
  },
  {
   title:'Pork with Green Beans',
   illustration: 'https://i.imgur.com/PVGTH7m.jpg',
  },
  {
   title:'Pineapple Ham',
   illustration: 'https://i.imgur.com/oyLfawp.jpg',
  },
  {
   title:'Chocolate Mirror Glaze',
   illustration: 'https://i.imgur.com/79r0tMP.jpg',
  },
];

  class Home extends React.Component {
      static navigationOptions = {
          title : 'Unreal Shopping App'
      };

      _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }
    
      _renderItem ({item, index}) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    }
    
      _renderDarkItem ({item, index}) {
        return <SliderEntry data={item} />;
    }

    render() {
      return (
        <View style={ShopStyles.ViewStyle}>
        <View style={{marginTop:12, marginBottom: 12}}>
        <Carousel
              ref={(c) => { this._carousel = c; }}
              data={entries}
              renderItem={this._renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              enableMomentum={true}
              loop={true}
              autoplay={true}
              autoplayDelay={500}
              autoplayInterval={3000}
          />
        </View>
        <TouchableOpacity 
        style={ShopStyles.NavigationButtons}
        onPress={() => this.props.navigation.navigate('Shopbag')}>
            <Text style={ShopStyles.NavigationButtonsText}>Shopping bag</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={ShopStyles.NavigationButtons}
        onPress={() => this.props.navigation.navigate('Recipes')}>
            <Text style={ShopStyles.NavigationButtonsText}>Recipes</Text>
        </TouchableOpacity>
        </View>
      );
    }
  }

  const ShopStyles = StyleSheet.create({
    buttons: {
        fontSize: 20,
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
      NavigationButtonsText: {
        color: "#003067",
        fontSize: 18,
        fontWeight: "300"
      },
      activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
      },
      ViewStyle: {
        backgroundColor:'#DCDCDC',
        height: "100%"
      },
    });

  export default Home;