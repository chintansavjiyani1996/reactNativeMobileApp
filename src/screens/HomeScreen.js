import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { getRestaurants } from '../redux/restroReducer';
import { Images } from '../utils/Images';

function HomeScreen({ navigation }) {
  const restroList = useSelector(state => state.restroList)
  const restroListLength = useSelector(state => state.restroListLength)
  const dispatch = useDispatch();



  const [Data, setData] = useState([])
  const [length, setLength] = useState()
  const [page, setPage] = useState(1)

  useEffect(() => {

    dispatch(getRestaurants(page))
  }, [])

  useEffect(() => {
    setData(restroList)
  }, [restroList])

  useEffect(() => {
    setLength(restroListLength)
  }, [restroListLength])

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

  // Alert.alert("", JSON.stringify(Data[0]))
  function renderItemView({ item, index }) {
    const location = { long: item.long, lat: item.lat }

    return (
      <TouchableOpacity onPress={() => navigation.navigate('RestroDetails', { item })} style={styles.flatListItem}>
        <View>
          <Image source={{ uri: item.img[0] }} style={styles.image} />
        </View>
        <View>
          <Text style={styles.itemTitle}>
            {item.title}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {
              renderRatings(item.rating)
            }
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('LocationScreen', { location })} style={styles.locationicon}>
          <Image source={Images.pin} style={styles.pin} />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }


  return (
    <View style={styles.container}>
      <Header titleText={'Restaurants List'} />
      <FlatList
        extraData={Data}
        data={Data}
        renderItem={renderItemView}
        keyExtractor={item => item.id}
      // onEndReached={() => {
      //   if(Da)
      //   dispatch(getRestaurants(page + 1))
      //   setPage(page + 1)
      // }}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 20
  },
  fab: {
    position: 'absolute',
    margin: 20,
    right: 0,
    bottom: 10
  },
  itemTitle: {
    fontSize: 15,
  },
  image: {
    height: 50,
    width: 50,
    marginRight: 25
  },
  addContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-end',
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  addContact: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',

  },
  pin: {
    height: 25,
    width: 20,
  },
  star: {
    height: 10,
    width: 10,
  },
  locationicon: { flex: 1, alignItems: 'flex-end' },
  flatListItem: { padding: 10, marginVertical: 5, marginHorizontal: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }
})

export default HomeScreen
