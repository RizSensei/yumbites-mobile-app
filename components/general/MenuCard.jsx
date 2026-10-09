import { Ionicons } from '@expo/vector-icons';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { menuCardStyles as styles } from '../../styles/menu-card';

const MenuCard = ({ item, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <TouchableOpacity
          style={styles.favoriteButton}
          accessibilityLabel={`Add ${item.name} to favourites`}
        >
          <Ionicons name="heart-outline" size={17} color="#E65D40" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        
        <View style={styles.footer}>
          <Text style={styles.price}>${Number(item.price || 0).toFixed(2)}</Text>
          <TouchableOpacity style={styles.addButton} accessibilityLabel={`Add ${item.name} to cart`}>
            <Ionicons name="add" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MenuCard;