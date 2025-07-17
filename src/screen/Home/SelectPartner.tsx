import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

const SelectTerritoryPartner: React.FC = () => {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
  const navigation = useNavigation<NavigationProp>();

  const [selectedPartner, setSelectedPartner] = useState<number | null>(null);

  return (
    <>
      <View
        style={{
          width: '100%',
          flex: 1,
          backgroundColor: 'white',
        }}
      >
        <Text style={styles.partnerInfo}>
          Choose a Territory Partner available at this time
        </Text>

        <ScrollView
          style={{
            flex: 1,
            top: 40,
          }}
        >
          {/* Card */}

          {[1, 2, 3, 3, 3, 3, 3, 8, 7, 7, 7].map((partner, i) => {
            const isSelected = selectedPartner === i;

            return (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  setSelectedPartner(i);
                  console.log(selectedPartner);
                }}
                activeOpacity={0.8}
                style={[
                  styles.partnerCard,
                  isSelected && styles.selectedPartnerCard, // highlight if selected
                ]}
              >
                <View style={styles.partnerInfoWrapper}>
                  <View style={styles.avatarWrapper}>
                    <Image
                      source={require('../../../assets/booking/p1.png')}
                      style={styles.avatar}
                    />
                  </View>
                  <View style={styles.nameLocation}>
                    <Text style={styles.name}>Sarthak Umak</Text>
                    <Text style={styles.location}>Nagpur</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            if (selectedPartner !== null) {
              navigation.navigate('ConfirmSchedule', {
                selectedIndex: selectedPartner,
              });
            }
          }}
          disabled={selectedPartner === null}
          style={[
            styles.selectPartnerButton,
            selectedPartner === null && { backgroundColor: '#BDBDBD' }, // optional: grey out when disabled
          ]}
        >
          <Text style={styles.selectPartnerText}>Confirm Schedule</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default SelectTerritoryPartner;

const styles = StyleSheet.create({
  partnerInfo: {
    top: 20,
    width: '100%',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 12,
    marginInline: 10,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  partnerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 16,
    gap: 110,
    width: '95%',
    marginInline: 'auto',
    marginTop: 10,
    height: 64,
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 0.5,
    borderRadius: 8,
  },
  partnerInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarWrapper: {
    width: 36,
    height: 36,
    backgroundColor: '#D9D9D9',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: 'rgba(20, 20, 43, 0.16)',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 1,
    shadowRadius: 54,
  },
  avatar: {
    width: 36,
    height: 36,
    resizeMode: 'cover',
  },
  nameLocation: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 32,
  },
  name: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    color: '#000000',
  },
  location: {
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    color: 'rgba(0, 0, 0, 0.4)',
  },
  selectedPartnerCard: {
    borderColor: '#0BB501',
    borderWidth: 2,
    backgroundColor: 'rgba(11, 181, 1, 0.05)',
  },
  selectPartnerButton: {
    margin: 5,
    width: '95%',
    height: 45,
    marginInline: 'auto',
    backgroundColor: '#0BB501',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    gap: 10,
  },
  selectPartnerText: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26, // 160% of 16px
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
