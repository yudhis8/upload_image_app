import React, {useState, useEffect, useContext} from 'react';
import {
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import Header from './../../component/header';
import styles from './style';
import Entypo from 'react-native-vector-icons/Entypo';
import database from '@react-native-firebase/database';
import messaging from '@react-native-firebase/messaging';
import {UserContext} from './../../context';
import notifee from '@notifee/react-native';

const ImageItem = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('Detail', {data: props.data})}
      style={styles.imageArea}>
      <Image
        source={{
          uri: props.data.path,
        }}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};
const Home = (props) => {
  const [data, setData] = useState([]);
  const [token, setToken] = useContext(UserContext);
  useEffect(() => {
    registerDevice();
    requestPermission();
    readData();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      onDisplayNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  async function onDisplayNotification(props) {
    console.log(
      '🚀 ~ file: index.js ~ line 51 ~ onDisplayNotification ~ props',
      props,
    );
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'upload',
      name: 'upload Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: props.data.title,
      body: props.data.body,
      android: {
        channelId,
        smallIcon: 'ic-launcher', // optional, defaults to 'ic_launcher'.
      },
    });
  }

  const registerDevice = async () => {
    // Register the device with FCM
    await messaging().registerDeviceForRemoteMessages();

    // Get the token
    const token = await messaging().getToken();
    setToken(token);
  };
  const requestPermission = async () => {
    try {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
    } catch (err) {
      console.warn(err);
    }
  };
  const readData = () => {
    database()
      .ref('image/')
      .on('value', (snap) => {
        if (snap.val()) {
          const dataSnapshot = snap.val();
          const data = [];
          Object.keys(dataSnapshot).map((key) => {
            const dataImage = dataSnapshot[key];
            data.push(dataImage);
          });
          setData(data);
        } else {
          setData([]);
        }
      });
  };
  console.log(data);
  return (
    <View style={styles.container}>
      <Header title="Home" noBack />
      {data.length == 0 ? (
        <View style={styles.emptyImage}>
          <Text style={styles.emptyText}>
            Current image is empty. Press plus button to add new one!
          </Text>
        </View>
      ) : (
        <ScrollView>
          <View style={styles.rowArea}>
            {data.map((data, index) => {
              return <ImageItem key={index} data={data} {...props} />;
            })}
          </View>
        </ScrollView>
      )}
      <TouchableOpacity
        onPress={() => props.navigation.navigate('ModalCamera')}
        style={styles.flyButton}>
        <Entypo name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Home;
