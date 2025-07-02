import {X} from 'lucide-react-native';
import React, {useContext, useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import ConfirmBookingPopup from './ConfirmBookingPopup';
import {payNow} from '../utils/razorpay';
import {AuthContext} from '../context/AuthContext';
import Toast from 'react-native-toast-message';
import SuccessModal from './PaymentModules/SuccessModel';
import {PropertyInfo} from '../types';
import WingsFlatsList from './wingList';
import {wdata} from '../utils';
import axios from 'axios';
import Loader from './loader';

const width = Dimensions.get('window').width;

interface Property {
  propertyid: number;
  property_name: string;
  builderid: number;
  employeeid: number | null;
  projectpartnerid: number | null;
  partnerid: number | null;
  propertytypeid: string;
  address: string;
  location: string;
  city: string;
  image: string;
  likes: number;
  videourl: string | null;
  rerano: string;
  reradocument: string | null;
  map: string | null;
  area: number;
  sqft_price: number;
  extra: string;
  rejectreason: string | null;
  status: string;
  approve: string;
  updated_at: string;
  created_at: string;
}

interface Props {
  pdata: PropertyInfo;
  eid: number;
  sid: number;
}

const Wings: React.FC<Props> = ({pdata, eid, sid}) => {
  const [selectedRoom, setSelectedRoom] = useState<{
    wing: string;
    room: string;
  } | null>(null);

  const [showDrawer, setShowDrawer] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const auth = useContext(AuthContext);

  const wings = [
    {
      wingName: 'Wing A',
      col1: [
        {room: '701', available: true},
        {room: '601', available: false},
        {room: '501', available: true},
        {room: '401', available: false},
        {room: '301', available: true},
        {room: '201', available: false},
        {room: '101', available: true},
      ],
      col2: [
        {room: '702', available: true},
        {room: '602', available: false},
        {room: '502', available: true},
        {room: '402', available: false},
        {room: '302', available: true},
        {room: '202', available: false},
        {room: '102', available: true},
      ],
      col3: [
        {room: '703', available: true},
        {room: '603', available: false},
        {room: '503', available: true},
        {room: '403', available: false},
        {room: '303', available: true},
        {room: '203', available: false},
        {room: '103', available: true},
      ],
      col4: [
        {room: '704', available: true},
        {room: '604', available: false},
        {room: '504', available: true},
        {room: '404', available: false},
        {room: '304', available: true},
        {room: '204', available: false},
        {room: '104', available: true},
      ],
      col5: [
        {room: '705', available: true},
        {room: '605', available: false},
        {room: '505', available: true},
        {room: '405', available: false},
        {room: '305', available: true},
        {room: '205', available: false},
        {room: '105', available: true},
      ],
    },
    {
      wingName: 'Wing B',
      col1: [
        {room: '801', available: false},
        {room: '701', available: true},
        {room: '601', available: false},
        {room: '501', available: true},
        {room: '401', available: false},
      ],
      col2: [
        {room: '802', available: true},
        {room: '702', available: true},
        {room: '602', available: false},
        {room: '502', available: true},
        {room: '402', available: false},
      ],
      col3: [
        {room: '803', available: false},
        {room: '703', available: true},
        {room: '603', available: false},
        {room: '503', available: true},
        {room: '403', available: false},
      ],
      col4: [
        {room: '804', available: true},
        {room: '704', available: false},
        {room: '604', available: true},
        {room: '504', available: false},
        {room: '404', available: true},
      ],
      col5: [
        {room: '805', available: true},
        {room: '705', available: false},
        {room: '605', available: true},
        {room: '505', available: false},
        {room: '405', available: true},
      ],
    },
  ];

  const details = [
    ['Carpet Area', `${pdata?.carpetArea}950 Sq.ft.`],
    ['Super Buildup', ' Sq.ft.'],
    ['Type Of Flat', '2 BHK'],
    ['Floor', '1'],
    ['Wing', 'A'],
    ['Flat Facing', 'East'],
    ['Facing', 'Garden'],
    ['Sq.Ft. Price', '₹5,500'],
    ['Mouza', 'West City'],
    ['Khasara No.', 'KH-4234'],
    ['Club House Charge', '₹100,000'],
    ['Parking Charge', '₹300,000'],
    ['Water & Electric Charge', '₹30000'],
    ['Society Deposit', '₹50000'],
    ['Maintenance', '₹5000'],
    ['Document Charges', '₹50000'],
  ];

  const [showSuccess, setShowSuccess] = useState(false);
  const [successModel, setModel] = useState(false);

  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(
          `https://api.reparv.in/sales/properties/additionalinfo/get/${pdata?.propertyid}`,
        );
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        console.log(data);

        setProperty(data);
      } catch (error) {
        console.error('Error fetching property:', error);
      }
    };

    if (pdata?.propertyid) fetchProperty();
  }, [pdata?.propertyid]);

  if (!property) return <Text>Wings & Flat Not Found !</Text>;

  return (
    <>
      <WingsFlatsList
        data={property}
        sid={sid}
        eid={eid}
        pid={pdata?.propertyid}
      />

      {/* <Modal transparent visible={showDrawer} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={WingDetailsStyle.card}>
            <TouchableOpacity
              style={{alignSelf: 'flex-end'}}
              onPress={() => setShowDrawer(false)}>
              <X size={20} />
            </TouchableOpacity>
            <View style={WingDetailsStyle.separator}></View>
            <Text style={WingDetailsStyle.title}>Flat Details</Text>

            {details.map(([label, value], index) => (
              <View key={index} style={WingDetailsStyle.detailRow}>
                <Text style={WingDetailsStyle.label}>{label}</Text>
                <Text style={WingDetailsStyle.value}>{value}</Text>
              </View>
            ))}

            <View style={WingDetailsStyle.detailRow}>
              <Text style={WingDetailsStyle.label}>Total Value</Text>
              <Text style={[WingDetailsStyle.value, {color: '#0068FF'}]}>
                ₹7,265,000
              </Text>
            </View>
            <View style={WingDetailsStyle.container}>
              <TouchableOpacity
                onPress={() => {
                  setShowPopup(true);
                  setShowDrawer(false);
                }}
                style={WingDetailsStyle.button}>
                <Text style={WingDetailsStyle.buttonText}>Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {showPopup && (
        <ConfirmBookingPopup
          visible={showPopup}
          onClose={() => setShowPopup(false)}
          onConfirm={() => {
            setShowPopup(false);
            handlePayment();
          }}
        />
      )}

      <Modal visible={auth?.isPaymentSuccess} transparent animationType="fade">
        <SuccessModal onClose={() => auth?.setIsPaymentSuccess(false)} />
      </Modal> */}

      {/* {auth?.isPaymentSuccess && (
        <SuccessModal onClose={() => setShowSuccess(false)} />
      )} */}
    </>
  );
};

export default Wings;
