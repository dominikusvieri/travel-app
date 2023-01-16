import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Avatar } from '../assets'
import MenuContainer from '../components/MenuContainer'
import { Hotels } from '../assets'
import { Attractions } from '../assets'
import { Restaurants } from '../assets'
import { FontAwesome } from '@expo/vector-icons';
import ItemCardContainer from '../components/ItemCardContainer'
import { NotFound } from '../assets'
import { getPlacesData } from '../api'


const Discover = () => {
  const navigation = useNavigation()

  const [type, setType] = useState('restaurants')

  const [isLoading, setIsLoading] = useState(false)

  const [mainData, setMainData] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  useEffect(() => {
    setIsLoading(true)
    getPlacesData().then(data => {
      setMainData(data)
      setInterval(() => {
        setIsLoading(false)
      }, 2000)
    })
  }, [])
  return (
    <SafeAreaView className="flex-1 bg-white relative pt-8">
      <View className="flex-row items-center justify-between px-8">
        <View>
          <Text className="text-[32px] text-[#0b646b] font-bold">Discovery</Text>
          <Text className="text-[28px] text-[#0b646b] font-light">the beauty today</Text>
        </View>

        <View className="w-12 h-12 bg-gray-500 rounded-md items-center justify-center">
          <Image
            source={Avatar}
            className="w-full h-full rounded-md object-cover"
          />
        </View>
      </View>

      {/* Menu Container */}
      {isLoading ?
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#00ff00" />
        </View>
        :
        <ScrollView>
          <View className="flex-row items-center justify-between px-8 mt-8">
            <MenuContainer
              key={"hotel"}
              title="Hotels"
              imageSrc={Hotels}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"attractions"}
              title="Attractions"
              imageSrc={Attractions}
              type={type}
              setType={setType}
            />

            <MenuContainer
              key={"restaurants"}
              title="Restaurants"
              imageSrc={Restaurants}
              type={type}
              setType={setType}
            />
          </View>

          {/* Top Tips  */}
          <View>
            <View className="flex-row items-center justify-between px-8 mt-8">
              <Text className="text-[#2c7379] text-[20px] font-bold">Top Tips</Text>
              <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                <Text className="text-[#a0c4c7] text-[18px] font-bold">Explore</Text>
                <FontAwesome name="long-arrow-right" size={24} color="#a0c4c7" />
              </TouchableOpacity>
            </View>

            <View className="px-8 mt-8 flex-row items-center justify-evenly flex-wrap">
              {mainData?.length > 0 ? (
                <>
                  {mainData?.map((data, i) => (
                    <ItemCardContainer
                      key={i}
                      imageSrc={
                        data?.photo?.images?.medium?.url ?
                        data?.photo?.images?.medium?.url :
                        "https://i.pinimg.com/564x/32/24/89/3224894a867134cdf1e7dbb326e75d06.jpg"
                      }
                      title={data?.name}
                      location={data?.location_string}
                      data={data}
                    />
                  ))}
                </>) :
                (<>
                  <View className="w-full h-[600px] items-center space-y-4 justify-center">
                    <Image
                      source={NotFound}
                      className="w-32 h-32 object-cover"
                    />
                    <Text>
                      Opps.. No Data Found
                    </Text>
                  </View>
                </>)
              }
            </View>
          </View>
        </ScrollView>
      }
    </SafeAreaView>
  )
}

export default Discover