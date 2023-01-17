import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'

const ItemCardContainer = ({ imageSrc, title, location, data }) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={()=> navigation.navigate("ItemScreen", {param : data})}
      className="rounded-md border border-gray-500 space-y-2 px-3 py-2 shadow-md bg-white 2-[182px] my-2">
      <Image
        source={{ uri: imageSrc }}
        className="w-20 h-20 rounded-md object-cover"
      />

      {title ? (
        <>
          <Text className="text-[#428288] text-[16px] font-bold">
            {title?.length > 8 ? `${title.slice(0, 8)}..` : title}
          </Text>

          <View className="flex-row items-center space-x-1">
            <FontAwesome name="map-marker" size={16} color="black" />
            <Text className="text-[#428288] text-[14px] font-bold">
              {location?.length > 8 ? `${location.slice(0, 8)}..` : location}
            </Text>
          </View>
        </>) : (<></>)}
    </TouchableOpacity>
  )
}

export default ItemCardContainer