// Success PopUp Component
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const SuccessScreen: React.FC = () => {
  return (
    <View style={Sucessstyles.container}>
      <View style={Sucessstyles.contentBox}>
        {/* Success Icon */}
        <View style={Sucessstyles.successMark}>
          <Image
            source={require('../../../assets/home/success.png')} // Replace with actual asset
            style={Sucessstyles.sticker}
          />
        </View>

        {/* Title and Info */}
        <View style={Sucessstyles.infoWrapper}>
          <Text style={Sucessstyles.successText}>
            Your meeting with Sarthak Umak has been successfully scheduled.
          </Text>
          {/* <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={{}}>Date:</Text>
            <Text style={Sucessstyles.meetingDetails}>
              Friday, April 4, 2025
            </Text>
          </View>

          <Text style={Sucessstyles.meetingDetails}>
            {'\n'}Time: 1:00 PM{'\n'}Location: Project Name, Address
          </Text> */}

          <View style={Sucessstyles.container2}>
            <Text style={Sucessstyles.text}>
              Date:
              <Text style={[Sucessstyles.text, { color: 'black' }]}>
                Friday, April 4, 2025
              </Text>{' '}
              {'\n'}
              Time:{' '}
              <Text style={[Sucessstyles.text, { color: 'black' }]}>
                1:00 PM
              </Text>
              {'\n'}
              Location:
              <Text style={[Sucessstyles.text, { color: 'black' }]}>
                Project Name, Address
              </Text>
            </Text>
          </View>
        </View>

        {/* Additional Info */}
        <View style={Sucessstyles.additionalInfo}>
          <Text style={Sucessstyles.calendarNote}>
            A calendar invitation has been sent to both you and the Territory
            Partner.
          </Text>
          <Text style={Sucessstyles.closingNote}>
            ✅ Get ready to close the deal!
          </Text>
        </View>
      </View>
    </View>
  );
};
//Success PopUp Style
const Sucessstyles = StyleSheet.create({
  container2: {
    width: '50%',
    height: 45,
    justifyContent: 'center', // aligns text vertically
  },
  text: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 15,
    color: '#989898',
  },
  container: {
    flex: 1,
    width: '100%',
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  contentBox: {
    width: '100%',
    height: 272,
    padding: 0,
    gap: 24,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  successMark: {
    width: 62,
    height: 62,
    marginBottom: 12,
  },
  sticker: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  infoWrapper: {
    width: 316,
    alignItems: 'center',
    gap: 16,
  },
  successText: {
    fontFamily: 'Inter',
    fontSize: 18,
    lineHeight: 22,
    color: '#000000',
    textAlign: 'center',
    letterSpacing: -0.46,
    width: 316,
  },
  meetingDetails: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 15,
    color: '#989898',
    textAlign: 'center',
    width: 204,
  },
  additionalInfo: {
    width: '100%',
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
  },
  calendarNote: {
    fontSize: 12,
    lineHeight: 15,
    color: '#989898',
    textAlign: 'center',
  },
  closingNote: {
    fontSize: 12,
    lineHeight: 15,
    color: '#000',
    textAlign: 'center',
  },
});

export default SuccessScreen;
