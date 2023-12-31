import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 justify-around bg-white">
      <View className="space-y-2 ">
        <Text
          style={{fontSize: wp(11)}}
          className="text-center font-bold  text-gray-700">
          ConversAI
        </Text>
        <Text
          style={{fontSize: wp(6)}}
          className="text-center tracking-wider text-gray-600 font-semibold">
          Future is Here
        </Text>
      </View>

      <View className="flex-row justify-center">
        <Image
          source={require('../../assets/images/avatar.jpeg')}
          style={{width: wp(75), height: wp(75)}}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        className="bg-[#067fd0] mx-5 p-4 rounded-2xl">
        <Text
          style={{fontSize: wp(6)}}
          className="text-center font-bold text-white">
          Let's Chat
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
