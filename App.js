import * as React from 'react';
import { Text, View, StyleSheet, Image, Linking, Button } from 'react-native';
import myRep from './components/myRep';
import myScript from './components/myScript';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Call Your Local Represenatives {'\n'}
        What is your cause?</Text>
        <Text style={styles.causes}>Green Energy • Economic • Racism • Harassment • Discrimination 
        • Bullying • Domestic Violence • Immigration • Education • Veterans • Environmental • Healthcare 
        • Abortion • Tax Fairness • Prison Reform • Marijuana • Gun Laws • Privacy • Human Rights • Discriminatory Lending • 
        Disability • Equality • Social Security • Juvenile Justice • LGBTQ • Human Trafficking • Global Warming 
        • Freedom of Speech</Text>
        <Image style={styles.mainlogo} source={require('./assets/myRep.png')} />
        <Text style={styles.blue}>Who represents me in congress?</Text>
        <Text style={styles.text}>Click the myRep tab below to find your local representative and call today to make noise and help make change.</Text>
        <Button onPress={() => 
            Linking.openURL('http://www.freedomofspeechproject.com/privacy-policy.html') }
            title="Privacy Policy" /> 

      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeScreen },
    myRep: { screen: myRep },
    myScript: { screen: myScript },
  },
  {
    tabBarOptions: {
      activeBackgroundColor: 'red',
      inactiveBackgroundColor: '#2c62a7',
      tabStyle: {
        //    height: 53,
        borderRightWidth: 1,
      },
      labelStyle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#ffffff',
      },
    },
  }
);

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    textAlignVertical: 'top',
  },
  paragraph: {
    marginTop: 70,
    marginBottom: 0,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'top',
    color: '#2c62a7',
  },
  text: {
    marginBottom: 0,
    marginTop: 10,
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'top',
    color: 'red',
  },
 blue: {
    marginBottom: 0,
    marginTop: 10,
    fontSize: 23,
    textAlign: 'center',
    textAlignVertical: 'top',
    color: '#2c62a7',
    fontWeight: 'bold',
  },
 causes: {
    padding: 10,
    marginTop: 5,
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'top',
    color: 'red',
  },
  mainlogo: {
    marginTop: 10,
    marginBottom: 20,
    height: 300,
    width: 300,
  },
});
