import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const slides = [
  { key: '1', text: 'Organize your tasks efficiently' },
  { key: '2', text: 'Stay focused and productive' },
  { key: '3', text: 'Achieve your goals every day' },
];

const SplashScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigation.replace('RegisterScreen');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.slideText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/check-icon.png')}
        style={styles.centerImage}
      />

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        style={styles.slider}
      />

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index && styles.dotActive,
            ]}
          />
        ))}
      </View>

      {/* Quarter Circle with Arrow */}
      <TouchableOpacity style={styles.nextButtonWrapper} onPress={handleNext}>
        <View style={styles.quarterCircle}>
          <Icon name="arrow-forward" size={36} color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  centerImage: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginTop: 100,
  },
  slider: {
    flexGrow: 0,
    height: 100,
    marginTop: 30,
  },
  slide: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slideText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  pagination: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#6C63FF',
  },
  nextButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  quarterCircle: {
    width: 150,
    height: 150,
    backgroundColor: '#6C63FF',
    borderTopLeftRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
