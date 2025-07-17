import { useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Svg, { Path } from 'react-native-svg';
import { RootStackParamList } from '../../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import MeetingCard from '../../component/MeetingCard';

const timeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
];

const TerritoryPartner: React.FC = () => {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
  const navigation = useNavigation<NavigationProp>();

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTab, setSelectedTab] = useState<
    'SlotFirst' | 'VisitScheduled'
  >('SlotFirst');
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM'); // default green selected
  console.log(selectedDate);

  return (
    <View
      style={{
        width: '100%',
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <View style={styles.frame135}>
        {/* Select Slot First */}
        <TouchableOpacity
          style={styles.frame120}
          onPress={() => setSelectedTab('SlotFirst')}
        >
          <View
            style={[
              styles.iconCircle,
              selectedTab === 'SlotFirst' ? styles.activeBg : styles.inactiveBg,
            ]}
          ></View>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'SlotFirst'
                ? styles.activeText
                : styles.inactiveText,
            ]}
          >
            Select Slot First
          </Text>
        </TouchableOpacity>

        {/* Visit Scheduled */}
        <TouchableOpacity
          style={styles.frame134}
          onPress={() => setSelectedTab('VisitScheduled')}
        >
          <View
            style={[
              styles.iconCircle,
              selectedTab === 'VisitScheduled'
                ? styles.activeBg
                : styles.inactiveBg,
            ]}
          ></View>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'VisitScheduled'
                ? styles.activeText
                : styles.inactiveText,
            ]}
          >
            Visit Scheduled
          </Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'SlotFirst' ? (
        <>
          <View style={styles.calendarWrapper}>
            <Calendar
              hideExtraDays={true}
              onDayPress={day => {
                console.log('Selected day', day);
                setSelectedDate(day.dateString);
              }}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  marked: true,
                  selectedColor: '#076300', // green background
                  selectedTextColor: '#ffffff',
                },
              }}
              theme={{
                calendarBackground: '#FFFFFF',
                textSectionTitleColor: '#000',
                selectedDayBackgroundColor: '#076300',
                selectedDayTextColor: '#FFF',
                todayTextColor: '#000',
                dayTextColor: '#000',
                textDisabledColor: 'gray',
                arrowColor: '#000',
                monthTextColor: '#000',
                textMonthFontWeight: '700',
                textDayFontWeight: '500',
                textDayFontSize: 13,
                textMonthFontSize: 14,
                textDayHeaderFontSize: 12,
              }}
              style={styles.calendar}
            />
          </View>

          {/* Show Time Slots Only If a Date Is Selected */}
          {selectedDate && (
            <>
              <Text style={time.selectTimeLabel}>Select a Time</Text>
              <View style={[time.container]}>
                {timeSlots.map((slot, index) => {
                  const isSelected = selectedSlot === slot;
                  const isDisabled = [
                    '12:00 PM',
                    '2:00 PM',
                    '4:00 PM',
                  ].includes(slot); // gray text
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => !isDisabled && setSelectedSlot(slot)}
                      activeOpacity={0.8}
                      style={[
                        time.slot,
                        isSelected && time.selectedSlot,
                        isDisabled && time.disabledSlot,
                      ]}
                    >
                      <Text
                        style={[
                          time.slotText,
                          isSelected && time.selectedSlotText,
                          isDisabled && time.disabledSlotText,
                        ]}
                      >
                        {slot}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TouchableOpacity
                style={styles.selectPartnerButton}
                onPress={() => {
                  navigation.navigate('ProjectLocation');
                }}
              >
                <Text style={styles.selectPartnerText}>Enter Location</Text>
              </TouchableOpacity>
            </>
          )}

          {selectedDate && <></>}
        </>
      ) : (
        <>
          <View
            style={{
              flex: 1,
              width: '100%',
            }}
          >
            <Text style={styles.statusText}>Visit Requests Status</Text>
            <ScrollView
              style={{
                flex: 1,
                top: 10,
              }}
            >
              <MeetingCard
                status="Accepted"
                timeAgo="2 hours ago"
                time="1:00 PM"
                date="Friday, April 4, 2025"
                location="Project Name, Address"
                person="kiran"
              />
              <MeetingCard
                status="Pending"
                timeAgo="2 hours ago"
                time="1:00 PM"
                date="Friday, April 4, 2025"
                location="Project Name, Address"
                person="kiran"
              />
              <MeetingCard
                status="Declined"
                timeAgo="2 hours ago"
                time="1:00 PM"
                date="Friday, April 4, 2025"
                location="Project Name, Address"
                person="kiran"
              />
            </ScrollView>
          </View>
        </>
      )}
    </View>
  );
};

const time = StyleSheet.create({
  selectTimeLabel: {
    // position: 'absolute',
    top: 16,
    // left: '50%',
    marginInline: 'auto',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 12,
    textAlign: 'center',
    color: '#000000',
  },

  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    width: 'auto',
    top: 30,
    // marginInline: 'auto',
  },
  slot: {
    justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 0.5,

    width: '24.5%',
    left: '10%',

    paddingVertical: 10,
  },
  selectedSlot: {
    backgroundColor: '#076300',
  },
  disabledSlot: {
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  slotText: {
    fontFamily: 'Roboto',
    fontWeight: '400',
    fontSize: 16,
    color: '#000000',
  },
  selectedSlotText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  disabledSlotText: {
    color: 'rgba(0, 0, 0, 0.4)',
  },
});
const styles = StyleSheet.create({
  frame135: {
    width: '100%',
    height: 52,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,

    gap: 38,
  },
  frame120: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  frame134: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  iconCircle: {
    width: 20,
    height: 20,
    marginTop: 5,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeBg: {
    color: '#076300',
  },
  inactiveBg: {},
  tabText: {
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 12,
    fontWeight: '800',
  },
  activeText: {
    fontWeight: '800',
    color: '#076300',
  },
  inactiveText: {
    fontWeight: '800',
    color: 'rgba(0, 0, 0, 0.4)',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    gap: 9,
    width: 122,
    height: 36,
    backgroundColor: '#0BB501',
    borderRadius: 16,
  },
  iconWrapper: {
    borderRadius: 9999, // Equivalent to Tailwind's 'rounded-full'
    borderWidth: 2, // Optional: adjust border thickness
    borderColor: 'white',
    width: 24, // Set width/height to make it a circle
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarWrapper: {
    width: '95%',

    marginTop: 10,
    marginInline: 'auto',

    backgroundColor: '#fff',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 0.5,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    // paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar: {
    width: 320,

    borderRadius: 16,
  },
  // selectPartnerButton: {
  //   // position: 'absolute',
  //   bottom: -90,
  //   width: '95%',
  //   height: 45,
  //   marginInline: 'auto',
  //   backgroundColor: '#0BB501',
  //   borderRadius: 4,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   paddingVertical: 6,
  //   paddingHorizontal: 12,
  //   gap: 10,
  // },

  selectPartnerButton: {
    position: 'absolute', // This is crucial
    bottom: 5, // Distance from the bottom of the screen
    left: 10,
    right: 5,
    // marginHorizontal: 'auto',
    marginInline: 'auto',
    width: '95%',
    height: 45,
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
  statusText: {
    top: 20,
    marginInline: 'auto',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '800',
    fontSize: 14,
    lineHeight: 12,
    height: 30,
    color: '#000000',
    zIndex: 10,
    backgroundColor: 'white',
  },
});

export default TerritoryPartner;
