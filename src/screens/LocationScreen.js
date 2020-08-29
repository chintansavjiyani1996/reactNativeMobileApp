import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Text, TouchableOpacity, Image, Alert } from 'react-native'
import { useNavigation, useRoute } from "@react-navigation/native"
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { Images } from '../utils/Images'
import Header from '../components/Header';

function LocationScreen() {

  const navigation = useNavigation()
  const route = useRoute()
  const [origin, setMapOrigin] = useState({})
  const [destination, setMapdestination] = useState({})
  const [region, setMapregion] = useState({
    latitude: 23.033863,
    longitude: 72.585022,
    latitudeDelta: 8.015,
    longitudeDelta: 8.0121,
  })

  useEffect(() => {
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setMapOrigin({ latitude: position.coords.latitude, longitude: position.coords.longitude })
        setMapregion({
          latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: 8.015,
          longitudeDelta: 8.0121,
        })
      })

    const latitude = parseFloat(route.params.location.lat)
    const longitude = parseFloat(route.params.location.long)
    setMapdestination({ latitude, longitude })
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.backButton} >
        <Header titleText={"Map View"} isBack={true} onBack={navigation.goBack} />
      </View>
      <MapView
        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.mapView}
        key={'AIzaSyAFBmCNOPrVgEmKK_5fWqPeEcsS3x8uWpE'}
        region={region}
      >
        <Marker
          coordinate={origin}
          image={Images.pin}
        />
        <Marker
          coordinate={destination}
          image={Images.pin}
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: "absolute", zIndex: 55, top: 0, width: "100%"
  },
});

export default LocationScreen

