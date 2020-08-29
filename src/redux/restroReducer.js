// import remove from 'lodash.remove'
import { SERVER_URL } from "../constants/constants";
import { Restaurants } from "../schema/schemas";
import { useSelector, useDispatch } from 'react-redux'
import Realm from 'realm'
import { Alert } from "react-native";


export const RESTRO_LIST = 'RESTRO_LIST'
export const RESTRO_LIST_LENGTH = 'RESTRO_LIST_LENGTH'
export const RESTRO_LIST_APPEND = "RESTRO_LIST_APPEND"

const databasOptions = {
  path: 'contact.realm',
  schema: [Restaurants],
  schemaVersion: 0
}
// Action Creators



export function restrolist(restroList) {
  return {
    type: RESTRO_LIST,
    restroList
  }
}

export function restrolistAppend(restroList) {
  return {
    type: RESTRO_LIST_APPEND,
    restroList
  }
}

export function restrolistLength(length) {
  return {
    type: RESTRO_LIST_LENGTH,
    length
  }
}


export const getRestaurants = (pageNumber = 1) => {
  return dispatch => {

    Realm.open(databasOptions).then(realm => {
      let lessThanVal = (pageNumber - 1) * 5
      let greaterThanVal = (pageNumber) * 5
      // const restroList = realm.objects("Restaurants").filtered("id>" + lessThanVal + " AND  id <=" + greaterThanVal);
      const restroList = realm.objects("Restaurants");
      if (!restroList.isEmpty()) {
        // dispatch(restrolistAppend(restroList))
        dispatch(restrolist(restroList))
      } else {
        fetch('http://192.249.121.94/~mobile/interview/public/api/restaurants_list')
          .then(data =>
            data.json()
          ).then(response => {
            Realm.open(databasOptions).then(realm => {
              realm.write(() => {
                response.data.map(data => {
                  let images = []
                  data.img.map((imageData) => {
                    images.push(imageData.image)
                  })
                  const restroList = realm.create("Restaurants", {
                    id: data.id,
                    title: data.title,
                    phone_no: data.phone_no,
                    description: data.description,
                    rating: data.rating,
                    address: data.address,
                    city: data.city,
                    state: data.state,
                    country: data.country,
                    pincode: data.pincode,
                    long: data.long,
                    lat: data.lat,
                    created_at: data.created_at,
                    updated_at: data.updated_at,
                    img: images
                  });

                })
                const list = realm.objects("Restaurants")
                dispatch(restrolist(list))
                dispatch(restrolistLength(list.length))
              })
            })
          })
      }
    })
  }
}


export const config = () => new Promise((resolve, reject) => {
  Realm.open(databasOptions).then(realm => {
    useDispatch(setConfig(realm))
  })
})

// reducer

const initialState = {
  restroList: [],
  restroListLength: [],
}

function restroReducer(state = initialState, action) {

  switch (action.type) {
    case RESTRO_LIST:
      return {
        ...state,
        restroList: action.restroList
      }
    case RESTRO_LIST_APPEND:
      return {
        ...state,
        restroList: initialState.restroList.length == 0 ? action.restroList : initialState.restroList.concat(action.restroList)
      }
    case RESTRO_LIST_LENGTH:
      return {
        ...state,
        restroListLength: action.length
      }
    default:
      return state
  }
}

export default restroReducer
