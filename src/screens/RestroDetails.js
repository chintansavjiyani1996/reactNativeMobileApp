import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation, useRoute } from "@react-navigation/native"
import { Images } from '../utils/Images';

const width = Dimensions.get('window').width

function RestroDetails() {

  const navigation = useNavigation()
  const route = useRoute()
  const [Details, setDetails] = useState({})

  useEffect(() => {
    setDetails(route.params.item)
  }, [])

  function renderRatings(rating) {
    var stars = []
    for (let i = 0; i < rating; i++) {
      stars.push(<Image source={Images.star_fill} style={styles.star} />)
    }
    for (let i = 0; i < (5 - rating); i++) {
      stars.push(<Image source={Images.star_empty} style={styles.star} />)
    }
    return stars;
  }

  function renderSwiper() {
    var imgData = route.params.item.img;
    var imagesArray = []
    for (let i = 0; i < imgData.length; i++) {
      imagesArray.push(
        <View style={{ flex: 1 }}>
          <Image style={styles.img} source={{ uri: imgData[i] }} />
        </View>)
    }

    return imagesArray;
  }

  function onBack() {
    navigation.canGoBack() && navigation.goBack()
  }

  // Alert.alert("DDD", JSON.stringify(Details.img))
  return (
    <View style={{ flex: 1, }}>
      <TouchableOpacity style={{ position: "absolute", top: 20, bottom: 0, right: 0, left: 20, widht: 300, height: 100, zIndex: 100 }} onPress={onBack}>
        <Text style={{ color: "black", fontWeight: "meduim" }}>Back</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.formView}>
        <Swiper
          style={styles.wrapper}
          dot={<View style={styles.dot}></View>}
          activeDot={<View style={[styles.dot, { backgroundColor: '#ffef4d' }]}></View>}
        >
          {renderSwiper()}
        </Swiper>
        <View style={styles.DetailsView}>
          <Text style={styles.name}>
            {Details.name}
          </Text>
          <Text style={styles.phoneView}>
            {Details.phone_no}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {renderRatings(Details.rating)}
          </View>
          <Text style={styles.descStyle}>
            Description
        </Text>
          <Text style={styles.descStyle}>
            {Details.description}
          </Text>
          <Text style={styles.desc}>
            Address
        </Text>
          <Text style={styles.descStyle}>
            {Details.address}
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '5%',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  formView: {
    width: '100%',
  },
  DetailsView: {
    width: '90%',
    marginLeft: '5%',
    marginTop: '5%'
  },
  name: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  },
  phoneView: {
    color: 'gray',
    marginVertical: '2%'
  },
  descStyle: {
    color: 'gray',
    marginVertical: '2%',
    fontSize: 11
  },
  star: {
    height: 10,
    width: 10,
    marginVertical: '5%'
  },
  img: {
    height: 300,
    width: '100%'
  },
  wrapper: {
    height: 300
  },
  dot: {
    width: 13.3,
    height: 13.3,
    borderRadius: 13.3 / 2,
    backgroundColor: "#ffffff",
    marginHorizontal: 9
  }
})

export default RestroDetails
