import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Header from './../../component/header';
import {RNCamera} from 'react-native-camera';
import Geolocation from '@react-native-community/geolocation';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import styles from './style';
const CameraModal = (props) => {
  let camera;
  const [path, setPath] = useState('');
  const [name, setName] = useState('');
  const [downloadPath, setDownloadPath] = useState('');
  const [coor, setCoor] = useState();
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  useEffect(() => {
    Geolocation.getCurrentPosition((info) => setCoor(info.coords));
  }, []);

  const takePicture = async () => {
    if (camera) {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      console.log(data);
      setPath(data);
      const name = data.uri.split('/');
      console.log('🚀 ~ file: index.js ~ line 34 ~ takePicture ~ name', name);
      setName(name[name.length - 1]);
    }
  };

  //need enabled biling
  const getPlace = async () => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coor.latitude},${coor.longitude}&key=AIzaSyAHeC1ASO1z-8j_I2G3uCNpLFEnAF-xsV0`;
    let response = await fetch(url);
    let json = await response.json();
    console.log('🚀 ~ file: index.js ~ line 48 ~ getPlace ~ json', json);
    return json.movies;
  };

  const upload = async () => {
    setUploading(true);
    setTransferred(0);

    const ref = storage().ref('image/' + name);
    // set progress state
    const task = ref.putFile(path.uri);
    task.on('state_changed', (snapshot) => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      );
    });
    try {
      // getPlace();
      await task;
      const url = await ref
        .getDownloadURL()
        .catch((error) => console.log(error));
      setDownloadPath(url);
      database().ref('image').push({
        photo: name,
        path: url,
        lat: coor.latitude,
        lng: coor.longitude,
      });
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!',
    );
    setPath('');
    props.navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Header onBackPress={() => props.navigation.goBack()} title="Camera" />

      {path == '' ? (
        <>
          <RNCamera
            ref={(ref) => {
              camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
          />
          <View
            style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => takePicture()}
              style={styles.capture}>
              <Text style={{fontSize: 14}}> SNAP </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Image style={styles.image} source={{uri: path.uri}}></Image>
          <View
            style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => upload()} style={styles.capture}>
              <Text style={{fontSize: 14}}> UPLOAD </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPath('')}
              style={styles.capture}>
              <Text style={{fontSize: 14}}> RE-TAKE </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <Modal transparent={true} animationType="slide" visible={uploading}>
        <View style={styles.modal}>
          <ActivityIndicator size={'large'} color="orange" />
          <Text style={styles.size}>{transferred} KB</Text>
        </View>
      </Modal>
    </View>
  );
};

export default CameraModal;
