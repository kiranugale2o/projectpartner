import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Animated,
  Dimensions,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
  Linking,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import CustomPicker from '../../component/CustomPicker';
// import Header from './index2';
// import {Key} from 'lucide-react';
import {EventInputData} from '../..';
import DateSelectPopup from '../../component/DateSelectedPopup';
import {RootStackParamList} from '../../types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import PostNotification from '../../component/PostNotification';
import {AuthContext} from '../../context/AuthContext';
import {calanderOprtions, formatDateToShort} from '../../utils';
import CalanderCard from '../../component/CalanderCard';

const {height} = Dimensions.get('window');

const ScheduleData = {
  cname: '',
  cnumber: '',
  eventstatus: '',
  pname: '',
  pdate: '',
};

export interface MeetingFollowUp {
  followupid: number;
  visitdate: string | null; // `null` when no visit date is set
  remark: string;
  status: string; // e.g., "Cancelled"
  changestatus: number; // likely a flag (0 or 1)
  propertyName: string;
  customer: string;
  contact: string;
  fullname: string;
}

const screenHeight = Dimensions.get('window').height;

const CalenderComponent: React.FC = () => {
  type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;
  const navigation = useNavigation<NavigationProp>();
  const [visible, setVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [ticketDes, setTicketDis] = useState<string>('');
  const [sucessShow, setSuccessShow] = useState<boolean>(false);
  const [mainScreen, setMain] = useState<boolean>(true);
  const [buttonShow, setButtonShow] = useState<boolean>(false);
  const [scheduleVisit, setScheduleVisit] =
    useState<typeof ScheduleData>(ScheduleData);

  const options = [
    {label: 'Visit Schedule', value: 'Visit Schedule', id: '#7E7E7E'},
    {label: 'Visit Reschedule', value: 'Visit Reschedule', id: '#0068FF'},
  ];
  const drawerHeighte = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const onBackPress = () => {
      if (visible) {
        closeDrawer();
        setSuccessShow(false);
        setVisible(true);
        return true;
      }
      return false;
    };

    const hardwareBackSub = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress,
    );

    const blurSub = navigation.addListener('blur', () => {
      if (visible) {
        closeDrawer(); // Close drawer when user leaves tab
        setSuccessShow(false);
        setVisible(true);
      }
    });

    return () => {
      hardwareBackSub.remove();
      blurSub(); // Cleanup blur listener
    };
  }, [navigation, visible]);
  const openDrawer = () => {
    setVisible(true);
    Animated.timing(drawerHeighte, {
      toValue: height * 0.5,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const closeDrawer = () => {
    Animated.timing(drawerHeighte, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setScheduleVisit({
        cname: '',
        cnumber: '',
        eventstatus: '',
        pname: '',
        pdate: '',
      });
      setSelectedDate('');
      setSelectedValue('');
      setButtonShow(false);
      setVisible(false);
    });
  };

  useEffect(() => {
    if (
      scheduleVisit.cname !== '' &&
      scheduleVisit.cnumber !== '' &&
      scheduleVisit.eventstatus !== '' &&
      scheduleVisit.pdate !== '' &&
      scheduleVisit.pname !== ''
    ) {
      setButtonShow(true);
    } else {
      setButtonShow(false);
    }
  }, [scheduleVisit]);
  const handleChange = (name: string, value: string) => {
    setScheduleVisit({...scheduleVisit, [name]: value});
  };

  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [selectedVisitData, setSelectedVisitData] = useState<any[]>([]);

  const [showCards, setShowCards] = useState(true);
  const [scrollY] = useState(new Animated.Value(0)); // Track scroll position
  const [lastOffset, setLastOffset] = useState(0); // Last scroll position to track direction

  const [modalVisible, setModalVisible] = useState(false);

  // Calculate the Inquiry Section height dynamically based on scroll position
  const inquiryHeight = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [screenHeight / 3, screenHeight], // Start from 1/3 screen height and expand to full height
    extrapolate: 'clamp',
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, -screenHeight / 3], // Move the header up as you scroll down
    extrapolate: 'clamp',
  });

  const [isAtTop, setIsAtTop] = useState(true);

  // Handle Scroll
  const handleCardScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY === 0) {
      setShowCards(true);
      setIsAtTop(true); // We're at the top
    } else {
      setShowCards(false);
      setIsAtTop(false); // We're not at the top
    }
  };
  // Get today's date in YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];
  const auth = useContext(AuthContext);
  const [meeting, setMeetings] = useState<MeetingFollowUp[]>([]);
  const [updatedMeeting, setUpdatedMeetings] = useState<MeetingFollowUp[]>([]);

  const handleDayPress = (day: any) => {
    const dateStr = day.dateString;
    setSelectedDate(dateStr);

    // Filter meetings for the selected date
    const dataForDate = meeting.filter(
      item => item.visitdate?.slice(0, 10) === dateStr,
    );
    //etSelectedVisitData(dataForDate);
    setUpdatedMeetings(dataForDate);
  };
  const handleOk = (date: any) => {
    setSelectedDate(date);
    setPopupVisible(false);
    handleChange('pdate', `${date.day}-${date.month}-${date.year}`);
  };

  const handleSubmit = () => {
    closeDrawer();
    setSuccessShow(true); // Show success message
    setMain(false);

    // After 2 seconds (2000ms), hide the success message
    setTimeout(() => {
      setSuccessShow(false);
      setMain(true); // Or whatever you want to do after success
    }, 2000); // 2 seconds
  };

  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  const fetchMeetings = async () => {
    try {
      const response = await fetch(
        'https://api.reparv.in/sales/calender/meetings',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.token}`,
            // or real JWT token if using auth middleware
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error('API error:', data.message);
        Alert.alert('Error', data.message);
        return;
      }

      console.log('Fetched meetings:', data);
      setMeetings(data);
      setUpdatedMeetings(data);
    } catch (error) {
      console.error('Network error:', error);
      Alert.alert('Error', 'Failed to fetch meetings');
    }
  };

  useEffect(() => {
    fetchMeetings();
    // const interval = setInterval(fetchMeetings, 30000); //tch every 30s
    // return () => clearInterval(interval); // cleanup on unmount
  }, []);

  // Create markedDates object
  //onst [selectedDate, setSelectedDate] = useState<string | null>(null);

  // const markedDates = useMemo(() => {
  //   const acc: {[key: string]: any} = {};

  //   // Step 1: Mark visit dates with red dot
  //   meeting.forEach(item => {
  //     const date = item.visitdate?.slice(0, 10);
  //     if (!date) return;

  //     acc[date] = {
  //       dots: [{key: 'visit', color: 'red'}],
  //     };
  //   });

  //   // Step 2: Highlight today's date always
  //   acc[today] = {
  //     ...(acc[today] || {}),
  //     selected: true,
  //     selectedColor: '#00A36C',
  //     selectedTextColor: '#fff',
  //   };

  //   // Step 3: If user selects a different date
  //   if (selectedDate && selectedDate !== today) {
  //     acc[selectedDate] = {
  //       ...(acc[selectedDate] || {}),
  //       selected: true,
  //       selectedColor: '#00A36C',
  //       selectedTextColor: '#fff',
  //       dots: [], // remove dot if selected
  //     };
  //   }

  //   return acc;
  // }, [meeting, selectedDate, today]);

  const markedDates = useMemo(() => {
    const acc: {[key: string]: any} = {};

    // Step 1: Mark visit dates based on whether they're in the past or future
    meeting.forEach(item => {
      const date = item.visitdate?.slice(0, 10);
      if (!date) return;

      const isPast = new Date(date) < new Date(today);

      acc[date] = {
        ...(acc[date] || {}),
        dots: [
          {
            key: 'visit',
            color: isPast ? 'red' : 'gold', // red if past, gold (yellow flag) if today/future
          },
        ],
      };
    });

    // Step 2: Highlight today's date always
    acc[today] = {
      ...(acc[today] || {}),
      selected: true,
      selectedColor: '#00A36C',
      selectedTextColor: '#fff',
    };

    // Step 3: Highlight selected date (if different from today)
    if (selectedDate && selectedDate !== today) {
      acc[selectedDate] = {
        ...(acc[selectedDate] || {}),
        selected: true,
        selectedColor: '#00A36C',
        selectedTextColor: '#fff',
        dots: [], // remove dot if selected
      };
    }

    return acc;
  }, [meeting, selectedDate, today]);

  const selected = !calanderOprtions.find(opt => opt.value === selectedValue)
    ?.select;

  const selectColor = calanderOprtions.find(
    opt => opt.value === selectedValue,
  )?.color;

  let selectedLabel = calanderOprtions.find(
    opt => opt.value === selectedValue,
  )?.label;

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setModalVisible(false);
  };
  return (
    <View style={{flex: 1, width: '100%', backgroundColor: 'white'}}>
      {mainScreen && (
        <View style={[styles.container]}>
          <Animated.View
            style={{
              marginTop: 10,
              display: `${showCards ? 'flex' : 'none'}`,
            }}>
            <View style={styles.calendarWrapper}>
              <Calendar
                // onDayPress={day => {
                //   setSelectedDate(day.dateString);
                // }}
                onDayPress={handleDayPress}
                markedDates={markedDates}
                markingType="multi-dot"
                theme={{
                  calendarBackground: '#FFFFFF',
                  textSectionTitleColor: '#000',
                  dayTextColor: '#000',
                  todayTextColor: '#000',
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
          </Animated.View>

          <View style={{top: 20}}>
            <Text style={styles.heading}>Upcoming Visits</Text>
            {/* Cards */}
          </View>
          <ScrollView
            style={{
              marginTop: 30,
            }}
            onScroll={handleCardScroll}
            contentContainerStyle={{flexGrow: 1}}
            scrollEventThrottle={16} // Make scroll events smoother
          >
            {updatedMeeting?.map((d, i) => (
              <CalanderCard key={i} d={d} />
            ))}
            <View
              style={{
                padding: 20,
                height: 300,
              }}>
            <Text>.</Text>
            </View>
          </ScrollView>

          {/* Button at Bottom */}
          <TouchableOpacity
            style={[
              styles.btncontainer,
              {
                display: 'none',
              },
            ]}
            onPress={openDrawer}>
            <View style={styles.iconWrapper}>
              <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <Path
                  d="M6.73684 14.7368C6.73684 15.0719 6.86992 15.3931 7.10681 15.63C7.3437 15.8669 7.66499 16 8 16C8.33501 16 8.6563 15.8669 8.89319 15.63C9.13008 15.3931 9.26316 15.0719 9.26316 14.7368V9.26316H14.7368C15.0719 9.26316 15.3931 9.13008 15.63 8.89319C15.8669 8.6563 16 8.33501 16 8C16 7.66499 15.8669 7.3437 15.63 7.10681C15.3931 6.86992 15.0719 6.73684 14.7368 6.73684H9.26316V1.26316C9.26316 0.928148 9.13008 0.606858 8.89319 0.36997C8.6563 0.133082 8.33501 0 8 0C7.66499 0 7.3437 0.133082 7.10681 0.36997C6.86992 0.606858 6.73684 0.928148 6.73684 1.26316V6.73684H1.26316C0.928148 6.73684 0.606858 6.86992 0.36997 7.10681C0.133082 7.3437 0 7.66499 0 8C0 8.33501 0.133082 8.6563 0.36997 8.89319C0.606858 9.13008 0.928148 9.26316 1.26316 9.26316H6.73684V14.7368Z"
                  fill="white"
                />
              </Svg>
            </View>
            <Text style={styles.btntext}>Schedule Visit</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Drawer */}
      {visible && (
        <TouchableOpacity style={styles.overlay} activeOpacity={1}>
          <Animated.View style={[styles.drawer]}>
            {/* Drawer Header */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <TouchableOpacity onPress={closeDrawer}>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <Path
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                    fill="black"
                    fillOpacity="0.4"
                  />
                </Svg>
              </TouchableOpacity>
              <Text style={styles.dtitle}>Schedule Visit</Text>
              <TouchableOpacity
                disabled={!buttonShow}
                style={[
                  styles.button,
                  {backgroundColor: `${buttonShow ? '#0BB501' : 'white'}`},
                ]}
                onPress={handleSubmit}>
                <Text
                  style={[
                    styles.saveText,
                    {color: `${buttonShow ? 'white' : 'gray'}`},
                  ]}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={styles.drawerContent}>
              {/* Input fields */}
              {EventInputData.map((d, i) => (
                <View
                  key={i}
                  style={{padding: 3, width: '95%', marginHorizontal: 'auto'}}>
                  {d.type === 'text' ? (
                    <>
                      <Text style={styles.dlabel}>{d.label}</Text>
                      <View style={styles.inputWrapper}>
                        <TextInput
                          style={{width: '100%', color: 'black'}}
                          onChangeText={text => handleChange(d.name, text)}
                          placeholder={d.placeHolder}
                          placeholderTextColor="#999"
                        />
                      </View>
                    </>
                  ) : d.type === 'date' ? (
                    <>
                      <View style={styles.inputWrapper}>
                        <TouchableOpacity
                          onPress={() => setPopupVisible(true)}
                          style={styles.dbutton}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              justifyContent: 'space-between',
                            }}>
                            <Text>
                              {!selectedDate ? (
                                <Text style={{color: 'gray'}}>Date</Text>
                              ) : (
                                <Text style={styles.dselectedText}>
                                  {`${selectedDate?.day}-${selectedDate?.month}-${selectedDate?.year}`}
                                </Text>
                              )}
                            </Text>
                            <Svg
                              width="18"
                              height="21"
                              viewBox="0 0 18 21"
                              fill="none">
                              <Rect
                                x="1"
                                y="3.3"
                                width="16"
                                height="16.2"
                                rx="2"
                                stroke="gray"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <Path
                                d="M12.5566 1.5V5.1"
                                stroke="gray"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <Path
                                d="M5.44336 1.5V5.1"
                                stroke="gray"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <Path
                                d="M1 8.7H17"
                                stroke="gray"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </Svg>
                          </View>
                        </TouchableOpacity>
                      </View>
                      <DateSelectPopup
                        visible={popupVisible}
                        onCancel={() => setPopupVisible(false)}
                        onOk={handleOk}
                      />
                    </>
                  ) : (
                    <>
                      <CustomPicker
                        placeholder="Event"
                        selectedValue={selectedValue}
                        onValueChange={value => {
                          setSelectedValue(value);
                          handleChange(d.name, value);
                        }}
                        options={options}
                        mytype={false}></CustomPicker>
                    </>
                  )}
                </View>
              ))}

              <View style={{padding: 10}}></View>
            </KeyboardAvoidingView>
          </Animated.View>
        </TouchableOpacity>
      )}

      {sucessShow && (
        <View style={Successstyles.container}>
          {/* Successmark */}
          <View>
            <Svg width="63" height="62" viewBox="0 0 63 62" fill="none">
              <G clipPath="url(#clip0_688_1756)">
                <Path
                  d="M59.9929 30.9987C60.9504 29.8837 61.6214 28.5519 61.9477 27.1188C62.274 25.6858 62.2457 24.1947 61.8652 22.7751C61.4848 21.3554 60.7638 20.0501 59.7646 18.9722C58.7655 17.8943 57.5185 17.0765 56.1317 16.5896C56.4034 15.1452 56.3186 13.6562 55.8846 12.252C55.4506 10.8477 54.6805 9.5706 53.6411 8.53137C52.6017 7.49214 51.3245 6.72221 49.9202 6.28837C48.5159 5.85453 47.0269 5.76989 45.5825 6.04179C45.0961 4.65471 44.2784 3.40733 43.2005 2.40795C42.1226 1.40858 40.817 0.68741 39.3972 0.307064C37.9773 -0.0732824 36.4861 -0.10131 35.053 0.225414C33.6198 0.552138 32.2881 1.22374 31.1734 2.18191C30.0584 1.2244 28.7266 0.553402 27.2935 0.22713C25.8605 -0.099143 24.3694 -0.0708388 22.9498 0.309586C21.5302 0.69001 20.2248 1.41106 19.1469 2.4102C18.069 3.40933 17.2512 4.65637 16.7644 6.04313C15.32 5.77167 13.8312 5.85669 12.4271 6.29082C11.0231 6.72495 9.74613 7.49508 8.70707 8.53441C7.668 9.57374 6.8982 10.8509 6.46443 12.2551C6.03065 13.6592 5.94601 15.148 6.21785 16.5923C4.83109 17.0791 3.58405 17.897 2.58491 18.9749C1.58578 20.0527 0.864716 21.3581 0.484292 22.7778C0.103867 24.1974 0.075559 25.6884 0.401832 27.1215C0.728104 28.5546 1.39911 29.8864 2.35662 31.0014C1.39882 32.1164 0.727606 33.4483 0.401241 34.8815C0.0748758 36.3147 0.103209 37.8059 0.4838 39.2257C0.864391 40.6455 1.58573 41.9509 2.58521 43.0287C3.58468 44.1065 4.83211 44.9241 6.21919 45.4105C5.94713 46.8548 6.03166 48.3437 6.46549 49.748C6.89932 51.1522 7.66932 52.4294 8.70864 53.4685C9.74797 54.5077 11.0252 55.2776 12.4295 55.7112C13.8338 56.1449 15.3227 56.2292 16.767 55.957C17.2539 57.3437 18.0717 58.5908 19.1496 59.5899C20.2275 60.589 21.5328 61.3101 22.9525 61.6905C24.3721 62.0709 25.8632 62.0993 27.2962 61.773C28.7293 61.4467 30.0611 60.7757 31.1761 59.8182C32.2911 60.776 33.623 61.4472 35.0562 61.7736C36.4894 62.0999 37.9806 62.0716 39.4004 61.691C40.8202 61.3104 42.1256 60.5891 43.2034 59.5896C44.2812 58.5901 45.0988 57.3427 45.5852 55.9556C47.0296 56.2276 48.5185 56.143 49.9228 55.7092C51.327 55.2754 52.6042 54.5054 53.6435 53.4661C54.6828 52.4268 55.4528 51.1496 55.8866 49.7454C56.3204 48.3411 56.405 46.8522 56.133 45.4078C57.5199 44.9211 58.7671 44.1033 59.7662 43.0253C60.7654 41.9474 61.4865 40.6419 61.8668 39.2222C62.2471 37.8025 62.2752 36.3114 61.9486 34.8783C61.6221 33.4452 60.9508 32.1135 59.9929 30.9987Z"
                  fill="#18C07A"
                />
                <Path
                  d="M25.6095 42.8322L16.9949 34.2231C16.668 33.8956 16.4844 33.4518 16.4844 32.9891C16.4844 32.5263 16.668 32.0825 16.9949 31.7551L18.0415 30.7071C18.369 30.3802 18.8128 30.1966 19.2755 30.1966C19.7383 30.1966 20.1821 30.3802 20.5096 30.7071L26.7716 36.9652L41.5193 21.2932C41.8366 20.9565 42.2746 20.7595 42.737 20.7453C43.1995 20.7312 43.6487 20.9012 43.9859 21.218L45.0607 22.2323C45.3979 22.5497 45.5951 22.9879 45.6092 23.4507C45.6234 23.9135 45.4531 24.363 45.136 24.7003L28.1192 42.7933C27.9589 42.964 27.766 43.1008 27.5519 43.1955C27.3377 43.2902 27.1067 43.3409 26.8726 43.3446C26.6385 43.3482 26.406 43.3047 26.189 43.2167C25.972 43.1287 25.7749 42.9979 25.6095 42.8322Z"
                  fill="white"
                />
              </G>
              <Defs>
                <ClipPath id="clip0_688_1756">
                  <Rect
                    width="62"
                    height="62"
                    fill="white"
                    transform="translate(0.175781)"
                  />
                </ClipPath>
              </Defs>
            </Svg>
          </View>

          <Text style={Successstyles.visitScheduledText}>
            Visit Scheduled Successfully
          </Text>

          <Text style={Successstyles.clientDetails}>
            Client:
            <Text
              style={{
                marginInline: 'auto',
                color: 'black',
                fontWeight: '600',
              }}>
              Pawan
            </Text>
            {'\n'}Project:
            <Text
              style={{
                marginInline: 'auto',
                color: 'black',
                fontWeight: '600',
              }}>
              Siddhivinayak
            </Text>{' '}
            {'\n'}Visit Date:{' '}
            <Text
              style={{
                color: 'black',
                fontWeight: '600',
              }}>
              2 Feb 2025
            </Text>{' '}
          </Text>
          {/* Sticker*/}
          <View style={Successstyles.sticker} />
        </View>
      )}
    </View>
  );
};

export default CalenderComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 16,
    backgroundColor: 'white',
  },

  calendarWrapper: {
    width: '99%',
    marginInline: 'auto',
    //height: 320,
    backgroundColor: '#fff',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 0.5,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar: {
    width: 320,
    // height: 320,
    borderRadius: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 16,
    fontFamily: 'Inter',
  },
  card: {
    backgroundColor: '#fff',
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 0.5,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  column: {
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.4)',
    fontFamily: 'Inter',
  },

  dbutton: {
    width: '100%',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
  },
  dbuttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginTop: 4,
    fontFamily: 'Inter',
    borderColor: 'gray',
  },
  dselectedText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '400',
  },
  text: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  date: {
    fontSize: 16,
    color: '#000',
    marginTop: 4,
    textAlign: 'left',
    fontFamily: 'Inter',
    fontWeight: '600',
  },
  chip: {
    // backgroundColor: '#E9F2FF',
    // paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 30,
    marginTop: 6,
  },
  chipText: {
    color: 'black',
    fontSize: 12,

    fontWeight: '700',
    // fontFamily: 'Roboto',
  },
  container2: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,

    backgroundColor: 'white',
    borderRadius: 30,
    height: 28,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  phone: {
    fontSize: 16,
    color: '#0068FF',
    fontWeight: '500',
    marginRight: 6,
    fontFamily: 'Roboto',
  },
  btncontainer: {
    position: 'absolute',
    width: 168,
    height: 44,
    bottom: 20,
    right: 10,
    backgroundColor: '#0BB501',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,

    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
    elevation: 1, // for Android shadow
  },
  iconWrapper: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vector: {
    width: 16,
    height: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 3, // optional to make it look like an icon
  },
  btntext: {
    width: 112,
    height: 20,
    fontFamily: 'Inter',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    color: '#FFFFFF',
  },

  openButton: {
    backgroundColor: '#0BB501',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 90,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  drawerContent: {
    marginTop: 40,
  },
  drawer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  dtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E2A40',
  },
  button: {
    width: 120,
    height: 40,
    paddingVertical: 6,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10, // only supported in React Native >= 0.71+ or with tailwind libraries
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    alignSelf: 'center', // margin: 0 auto
  },
  saveText: {
    fontFamily: 'Lato',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26, // 160% of 16px
    color: 'rgba(0, 0, 0, 0.4)',
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.4)',
  },

  dlabel: {
    height: 15,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 15,
    color: 'rgba(0, 0, 0, 0.4)',
    marginBottom: 8,
  },
  inputWrapper: {
    width: '100%',
    height: 51,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  input: {
    width: 326,
    height: 19,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 19,
    color: 'black',
    // color: 'rgba(0, 0, 0, 0.4)',
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#FEFEFE',
    padding: 10,
    marginTop: 10,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontWeight: '600',
  },
  closeButton: {
    marginTop: 20,

    alignItems: 'center',
    backgroundColor: '#0BB501',
    padding: 12,
    borderRadius: 4,
  },
  closebuttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

const Successstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  visitScheduledText: {
    height: 40,
    marginInline: 'auto',
    top: 10,
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 18.32,
    lineHeight: 18,
    textAlign: 'center',
    letterSpacing: -0.458015,
    color: '#000000',
  },
  clientDetails: {
    marginInline: 'auto',
    fontFamily: 'Inter',
    fontWeight: '400',
    fontSize: 16,

    lineHeight: 24,
    color: '#989898',
  },
  sticker: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  vectorBackground: {
    position: 'absolute',
    left: '26.3%',
    right: '26.72%',
    top: '33.46%',
    bottom: '30.09%',
    backgroundColor: '#18C07A',
  },
});
