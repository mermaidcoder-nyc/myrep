import * as React from 'react';
import {
  StyleSheet,
  Platform,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  Image,
  TextInput,
  Linking,
} from 'react-native';
import {privateKey} from '../private'

/*
 * MyRep is the main component of the app. It displays a text input,
 * queries the google civicinfo api for information
 * and displays the results in a list.
 */
export default class MyRep extends React.Component {
  /*
   * constructor declares all the state the MyRep component will track.
   * apiError tracks if we get an error for the google api.
   * dataSource stores successful api responses we get from google.
   * defaultDataSource is a fallback we use when if the api returns an error,
   *   in case of error we want to still display useful information
   *   (display the representatives for new york).
   * isLoading tracks whether we have sent an api request and are waiting for
   *   the response. Used to power the spinner.
   * zip stores the user input in the zipcode input.
   */
  constructor(props) {
    super(props);
    this.state = {
      apiError: null,
      dataSource: null,
      defaultDataSource: null,
      isLoading: false,
      zip: '',
    };
  }

  /*
   * componentDidMount runs after this component has rendered for the first
   * time (with the initial state in the constructor). We want to proactively
   * fetch from google the representative data for new york and display that
   * as a useful default.
   */
  componentDidMount() {
    this.setState({ isLoading: true });
    return fetch(
      `https://www.googleapis.com/civicinfo/v2/representatives?address=Ny+10012&key=${privateKey.apiKey}`
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.officials,
          defaultDataSource: responseJson.officials,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  /*
   * componentDidUpdate runs when this component is rerendered. In react a
   * state change will trigger an update, and thus this function.
   * If the zipcode has changed we conditionally query google for the
   * representative information for that zipcode.
   */
  componentDidUpdate(prevProps, prevState) {
    const { zip } = this.state;
    if (zip.length === 5 && zip !== prevState.zip) {
      this.setState({ isLoading: true });
      fetch(
        `https://www.googleapis.com/civicinfo/v2/representatives?address=${
          this.state.zip
        }&key=${privateKey.apiKey}`
      )
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error) {
            /* if the zipcode is invalid, set the error state for this
             * component
             */
            this.setState({
              apiError: responseJson.error,
              isLoading: false,
              dataSource: responseJson.officials,
            });
          } else {
            this.setState({
              isLoading: false,
              dataSource: responseJson.officials,
            });
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  /*
   * handleZip is the callback for the zipcode input.
   * When a new user input is detected we update the zip state we are tracking
   * in component state.
   */
  handleZip = text => {
    if (text.length !== 5 ) {
      this.setState({ apiError: null, zip: text, dataSource: null });
    } else {
      this.setState({ apiError: null, zip: text });
    }
  };

  render() {
    const {
      apiError,
      defaultDataSource,
      dataSource,
      isLoading,
      zip
    } = this.state;

    /*
     * list is the main part of the UI.
     * If the app has a request inflight we show a spinner.
     * If we are in a valid state show the api results in a FlatList.
     * Else, show an error message to the user that they should provide a valid
     * zipcode.
     */
    let list;
    if (isLoading) {
      list = (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else if (!apiError && (zip.length === 0 || zip.length === 5)) {
      list = (
        <FlatList
          data={dataSource ? dataSource.slice(2) : defaultDataSource?.slice(2)}
          renderItem={({ item }) => (
            <View style={styles.styleView}>
              <Image
                source={item.photoUrl ? {  uri: item.photoUrl  } : (require('../assets/default-avatar.jpg'))}
                style={styles.representativePhoto}
              />
              <Text style={styles.textView}>
                <Text style={styles.bold}>{item.name}</Text>
                {'\n'}
                {item.party }
                {'\n'}
                <Text
                  onPress={() => {
                    Linking.openURL(`tel:${item.phones}`);
                  }}>
                  {item.phones}
                </Text>
                {'\n'}
                <Text style={styles.mail}
                    onPress={() => {
                    Linking.openURL(`mailto:${item.emails}`);
                  }}>
                  {item.emails}
                </Text>
              </Text>
              
            </View>
          )}
          keyExtractor={(item, index) => item.name}
        />
      );
    } else {
      list = <Text>Enter a valid zip</Text>;
    }

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
        {/* zipcode input */}
        <TextInput
          style={styles.styleInput}
          onChangeText={text => this.handleZip(text)}
          placeholder="Enter Your Zip Code"
          placeholderTextColor='red'
          value={zip}
        />
        {/* body of the UI, see definition of list above */}
        {list}
      </View>
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
  styleInput: {
    height: 60,
    padding: 10,
    marginTop: 15,
    fontSize: 23,
    borderWidth: 1,
    borderColor: '#ffe6e6',
    borderRadius: 8,
    marginBottom: 10,
  },
  styleView: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    paddingRight: 30,
    borderRadius: 8,
    padding: 10,
  },
  textView: {
    width: '100%',
    textAlignVertical: 'center',
    color: '#000',
    fontSize: 19,
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
  bold: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  mail: {
    fontSize: 16,
  },
  representativePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  }
});
