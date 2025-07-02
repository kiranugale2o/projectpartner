import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Dropdown} from 'react-native-element-dropdown';

interface Enquirer {
  enquirersid: number;
  propertyid: number;
  salespersonid: number;
  territorypartnerid: number | null;
  customer: string;
  contact: string;
  email: string | null;
  budget: string | null;
  location: string | null;
  city: string | null;
  status: string;
  assign: string;
  message: string | null;
  updated_at: string;
  created_at: string;
  frontView: string; // stringified array like "[\"/uploads/image.jpg\"]"
  territoryName: string | null;
  territoryContact: string | null;
}

type RouteParams = {
  EnquiryDetail: {
    enquiry: Enquirer;
  };
};

type OptionType = 'New' | 'Status' | 'View';

const EnquiryDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RouteParams, 'EnquiryDetail'>>();
  const {enquiry} = route.params;

  const images: string[] = JSON.parse(enquiry.frontView || '[]');

  const onActionPress = () => {
    Alert.alert('Action', `Contacting ${enquiry.contact}`);
    // You can replace this alert with actual navigation or phone call logic
  };

  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const handleChange = (name: string, value: OptionType): void => {
    console.log(`Selected ${value}`);
    setSelectedOption(value);
  };

  const [value, setValue] = useState('new');

  const data = [
    {label: 'View', value: 'view'},
    {label: 'Status', value: 'status'},
    {label: 'Territory Partner', value: 'tp'},
  ];

  // Helper to get color and icon by status
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return {backgroundColor: '#f0ad4e'}; // orange
      case 'completed':
        return {backgroundColor: '#5cb85c'}; // green
      case 'rejected':
        return {backgroundColor: '#d9534f'}; // red
      case 'in progress':
        return {backgroundColor: '#0275d8'}; // blue
      default:
        return {backgroundColor: '#5cb85c'}; // gray default
    }
  };

  //const [dropdownVisible, setDropdownVisible] = useState(false);
  const [statusValue, setStatusValue] = useState(enquiry.status);

  const statusStyle = getStatusStyle(enquiry.status);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{paddingBottom: 30}}>
      {images.length > 0 && (
        <View style={styles.imageContainer}>
          {images.map((img, idx) => (
            <Image
              key={idx}
              source={{uri: `https://api.reparv.in${img}`}}
              style={styles.image}
              resizeMode="cover"
            />
          ))}
        </View>
      )}
      <View style={styles.header}>
        <Text style={styles.title}>{enquiry.customer}</Text>
        <Dropdown
          style={styles.dropdown}
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Action"
          value={statusValue}
          onChange={item => {
            setStatusValue(item.value);
            setDropdownVisible(false);
          }}
        />
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Contact:</Text>
        <Text style={styles.value}>{enquiry.contact}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Assigned To:</Text>
        <Text style={styles.value}>{enquiry.assign}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Status:</Text>
        <View
          style={[
            styles.statusBox,
            {backgroundColor: statusStyle.backgroundColor},
          ]}>
          <Text style={styles.statusText}>{enquiry.status}</Text>
        </View>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{enquiry.location || 'N/A'}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>City:</Text>
        <Text style={styles.value}>{enquiry.city || 'N/A'}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Budget:</Text>
        <Text style={styles.value}>{enquiry.budget || 'N/A'}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{enquiry.email || 'N/A'}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.label}>Territory Partner:</Text>
        <Text style={styles.value}>
          {enquiry.territoryName || 'N/A'} ({enquiry.territoryContact || 'N/A'})
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e6f4ea',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  dropdown: {
    width: 200,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#218c4c',
    flex: 1,
    flexWrap: 'wrap',
  },
  wrapper: {
    padding: 20,
    width: 250,
  },
  actionButton: {
    color: 'black',
    paddingVertical: 10,
    paddingHorizontal: 5,
    //  width: 60,
    borderRadius: 6,
    borderWidth: 0.3,
    alignItems: 'center',
    justifyContent: 'flex-end',

    marginBottom: 8,
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
  selectedText: {
    marginTop: 10,
    fontSize: 16,
    color: '#2c3e50',
  },
  detailRow: {
    flexDirection: 'row',
    marginVertical: 6,
    flexWrap: 'wrap',
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    minWidth: 100,
    justifyContent: 'center',
  },
  statusIcon: {
    marginRight: 6,
    fontSize: 16,
  },
  statusText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c4f30',
    width: 130,
  },
  value: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    flex: 1,
    flexWrap: 'wrap',
  },
  imageContainer: {
    marginTop: 25,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 14,
    backgroundColor: '#ccc',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 3},
  },
});

export default EnquiryDetailScreen;
