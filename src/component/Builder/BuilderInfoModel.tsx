import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { X } from 'lucide-react-native';

interface BuilderInfoProps {
  visible: boolean;
  onClose: () => void;
  data: {
    company_name: string;
    contact_person: string;
    contact: string;
    email: string;
    website: string;
    office_address: string;
    registration_no: string;
    status: string;
    
    notes: string;
  
  };
}

const BuilderInfoModal: React.FC<BuilderInfoProps> = ({ visible, onClose, data }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* 👷 Header */}
          <View style={styles.header}>
           
            <Text style={styles.title}> Builder Details</Text>
            <TouchableOpacity onPress={onClose}>
              <X color="#444" size={24} />
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {Object.entries(data).map(([key, value]) => {
              const displayKey = key.replace(/_/g, ' ');
              const badgeFields = ['status', 'loginstatus'];

              return (
                <View key={key} style={styles.row}>
                  <Text style={styles.label}>{displayKey}:</Text>
                  {badgeFields.includes(key) ? (
                    <View
                      style={[
                        styles.badge,
                        {
                          backgroundColor:
                            key === 'status'
                              ? value === 'Active'
                                ? '#e6f9ec'
                                : '#fdecea'
                              : value === 'Active'
                              ? '#e6f3ff'
                              : '#f3f3f3',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgeText,
                          {
                            color:
                              value === 'Active'
                                ? '#2e7d32'
                                : key === 'loginstatus'
                                ? '#1e88e5'
                                : '#b71c1c',
                          },
                        ]}
                      >
                        {value || '-'}
                      </Text>
                    </View>
                  ) : (
                    <Text style={styles.value}>{value || '-'}</Text>
                  )}
                  <View style={styles.divider} />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    width: '100%',
    backgroundColor: '#00000077',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '92%',
    maxHeight: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  row: {
    marginBottom: 10,
  },
  label: {
    color: '#444',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
    textTransform: 'capitalize',
  },
  value: {
    fontSize: 15,
    color: '#2c2c2c',
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#e1e4e8',
    marginTop: 6,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 4,
  },
  badgeText: {
    fontWeight: '600',
    fontSize: 13,
  },
});

export default BuilderInfoModal;
