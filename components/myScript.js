import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, Linking, Button, Platform } from 'react-native';

export default class myScipt extends React.Component {
  render() {
    return (
      <View style={styles.MainContainer}>
      <View style={styles.nestedView}>
        {/* header of the UI */}
        <Image
          style={styles.logo}
          source={require('../assets/myRep-250.png')}
        />
        <Text style={styles.styleHeader}>
          Call Your Local Representatives
        </Text>
      </View>

        <Text style={styles.text}>{'\n'}Here is a script to help you with your call.
          {'\n'} {'\n'}
          Make clear statements regarding the issue you are
          calling about. Why you support or oppose certain legislation is
          irrelevant... try to get straight to the point.
          {'\n'} {'\n'}
          Hello, my name is ____________. I'm a constituent from YOUR STATE,
          and YOUR ZIPCODE. I am very concerned about 'state your praise or issue'
          and I strongly encourage the senator to please vote, pass bill, and or fund
          to help solve this situation. Thank you for your attention to this
          matter and I appreciate all your hard work you do in congress for the citizens. 
          {'\n'} {'\n'}
          You may be asked to be added to a database, you can say no as this will
          require more time. You may leave a message as well. Thank you for your activism 
          effort.{'\n'} 
        </Text>
        <View style={styles.Container}>
        <Image
          style={styles.botlogo}
          source={require('../assets/myRep-text.png')}/>
        <Button onPress={() => 
          Linking.openURL('mailto:contact@freedomofspeechproject.com') }
          title="Suggestions Welcome" />
                    <Text style={styles.text}>{'\n'}
        </Text>
      </View></View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
    marginTop: Platform.OS === 'ios' ? 22 : 22,
  },
  styleHeader: {
    marginTop: 40,
    paddingLeft: 10,
    fontSize: 25,
    textAlign: 'left',
    width: '70%',
    color: '#2c62a7',
    fontWeight: 'bold',
  },
  logo: {
    marginTop: 20,
    height: 100,
    width: 100,
  },
  nestedView: {
    flexDirection: 'row',
    paddingLeft: 10,
  },
  text: {
    margin: 10,
    marginTop: 5,
    fontSize: 18,
    textAlign: 'left',
    textAlignVertical: 'top',
    color: 'red',
  },
    Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botlogo: {
    height: 72,
    width: 175,
    flexDirection: 'column',
  },
});
