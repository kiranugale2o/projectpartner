import { useEffect, useState } from 'react';
import {
  Alert,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomPicker from '../CustomPicker';
import { Picker } from '@react-native-picker/picker';
import { X } from 'lucide-react-native';

interface TicketUpdateProp {
  visible: boolean;
  onClose: () => void;
  ticketData: {
    ticketNo: string;
    adminName: string;
    department: string;
    employee: string;
    issue: string;
    description: string;
    adminid: string;
    departmentid: string;
    employeeid: string;
    ticketId: string;
  };
}

interface NewTicket {
  adminid: string;
  departmentid: string;
  employeeid: string;
  issue: string;
  details: string;
}

interface Admin {
  id: string;
  name: string;
}

interface Department {
  departmentid: string;
  department: string;
}

interface Employee {
  id: string;
  name: string;
}

const TicketUpdateModel: React.FC<TicketUpdateProp> = ({
  visible,
  onClose,
  ticketData,
}) => {
  const [newTicket, setNewTicketData] = useState<NewTicket>({
    adminid: ticketData?.adminid,
    departmentid: ticketData?.departmentid,
    employeeid: ticketData?.employeeid,
    issue: ticketData?.issue,
    details: ticketData?.description,
  });

  const [adminData, setAdminData] = useState<Admin[]>([]);
  const [departmentData, setDepartmentData] = useState<Department[]>([]);
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const issueOptions = [
    { label: 'Technical Issue', value: 'Technical Issue' },
    { label: 'Commission Issue', value: 'Commission Issue' },
    { label: 'Lead Issue', value: 'Lead Issue' },
  ];

  useEffect(() => {
    setNewTicketData({
      adminid: ticketData?.adminid,
      departmentid: ticketData?.departmentid,
      employeeid: ticketData?.employeeid,
      issue: ticketData?.issue,
      details: ticketData?.description,
    });
  }, [visible]);

  const fetchAdminData = async () => {
    try {
      const response = await fetch(
        'https://api.reparv.in/sales/tickets/admins',
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      if (!response.ok) throw new Error('Failed to fetch Admins');
      const data = await response.json();
      setAdminData(data);
    } catch (err) {
      console.error('Error fetching admins:', err);
    }
  };

  const fetchDepartmentData = async () => {
    try {
      const response = await fetch(
        'https://api.reparv.in/sales/tickets/departments',
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      if (!response.ok) throw new Error('Failed to fetch departments');
      const data = await response.json();
      setDepartmentData(data);
    } catch (err) {
      console.error('Error fetching departments:', err);
    }
  };

  const fetchEmployeeData = async (id: string) => {
    try {
      const response = await fetch(
        `https://api.reparv.in/sales/tickets/employees/${id}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      if (!response.ok) throw new Error('Failed to fetch employees');
      const data = await response.json();
      setEmployeeData(data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  useEffect(() => {
    fetchAdminData();
    fetchDepartmentData();
  }, []);

  useEffect(() => {
    if (adminData.length > 0 && newTicket.adminid === '') {
      setNewTicketData(prev => ({
        ...prev,
        adminid: adminData[0].id,
      }));
    }
  }, [adminData]);

  useEffect(() => {
    if (newTicket.adminid !== '') {
      setNewTicketData(prev => ({
        ...prev,
        departmentid: '',
        employeeid: '',
      }));
    }
  }, [newTicket.adminid]);

  useEffect(() => {
    if (newTicket.departmentid) {
      fetchEmployeeData(newTicket.departmentid);
    }
  }, [newTicket.departmentid]);

  const updateTicket = async () => {
    const endpoint = `edit/${ticketData.ticketId}`;
    try {
      const response = await fetch(
        `https://api.reparv.in/sales/tickets/${endpoint}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTicket),
        },
      );

      if (response.status === 409) {
        Alert.alert('Something went wrong');
      } else if (!response.ok) {
        throw new Error(`Failed to update ticket. Status: ${response.status}`);
      } else {
        Alert.alert('Ticket updated successfully!');
        onClose();
      }

      setNewTicketData({
        adminid: '',
        departmentid: '',
        employeeid: '',
        issue: '',
        details: '',
      });
    } catch (err: any) {
      console.error('Error updating ticket:', err.message);
    }
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 12,
            padding: 30,
            width: '95%',
            elevation: 5,
          }}
        >
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 16,
                color: 'black',
              }}
            >
              Ticket Details
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={20} />
            </TouchableOpacity>
          </View>

          {/* Issue Picker */}
          <Text
            style={{
              fontSize: 14,
              marginTop: 10,
              color: '#00000066',
              fontWeight: '500',
            }}
          >
            Issue Category
          </Text>
          <CustomPicker
            placeholder="Select Issue"
            selectedValue={newTicket.issue}
            onValueChange={value =>
              setNewTicketData({ ...newTicket, issue: value })
            }
            options={issueOptions}
            mytype={false}
          />

          {/* Admin Picker */}
          <Text
            style={{
              fontSize: 14,
              marginTop: 10,
              color: '#00000066',
              fontWeight: '500',
            }}
          >
            Select Admin
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#00000033',
              borderRadius: 4,
            }}
          >
            <Picker
              selectedValue={newTicket.adminid}
              onValueChange={itemValue =>
                setNewTicketData({ ...newTicket, adminid: itemValue })
              }
              style={{ fontSize: 16, color: '#000' }}
            >
              <Picker.Item label="Select Admin" value="" />
              {adminData.map(admin => (
                <Picker.Item
                  key={admin.id}
                  label={admin.name}
                  value={admin.id}
                />
              ))}
            </Picker>
          </View>

          {/* Department Picker */}
          <Text
            style={{
              fontSize: 14,
              marginTop: 10,
              color: '#00000066',
              fontWeight: '500',
            }}
          >
            Department
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#00000033',
              borderRadius: 4,
            }}
          >
            <Picker
              selectedValue={newTicket.departmentid}
              enabled={newTicket.adminid == ''}
              onValueChange={itemValue =>
                setNewTicketData({ ...newTicket, departmentid: itemValue })
              }
              style={{ fontSize: 16, color: '#000' }}
            >
              <Picker.Item label="Select Department" value="" />
              {departmentData.map(dept => (
                <Picker.Item
                  key={dept.departmentid}
                  label={dept.department}
                  value={dept.departmentid}
                />
              ))}
            </Picker>
          </View>

          {/* Employee Picker */}
          <Text
            style={{
              fontSize: 14,
              marginTop: 10,
              color: '#00000066',
              fontWeight: '500',
            }}
          >
            Employee
          </Text>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#00000033',
              borderRadius: 4,
            }}
          >
            <Picker
              selectedValue={newTicket.employeeid}
              enabled={newTicket.departmentid !== ''}
              onValueChange={itemValue =>
                setNewTicketData({ ...newTicket, employeeid: itemValue })
              }
              style={{ fontSize: 16, color: '#000' }}
            >
              <Picker.Item label="Select Employee" value="" />
              {employeeData.map(emp => (
                <Picker.Item key={emp.id} label={emp.name} value={emp.id} />
              ))}
            </Picker>
          </View>

          {/* Description */}
          <Text style={{ fontSize: 14, marginVertical: 10, color: '#2E2A40' }}>
            Ticket Description:
          </Text>
          <TextInput
            style={{
              color: 'black',
              borderColor: 'rgba(0, 0, 0, 0.2)',
              borderWidth: 1,
              borderRadius: 4,
              height: 50,
            }}
            placeholder="Type ticket issue..."
            placeholderTextColor="#000"
            value={newTicket?.details}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChangeText={value =>
              setNewTicketData({ ...newTicket, details: value })
            }
            multiline
          />

          {/* Action Buttons */}
          <View
            style={{
              marginTop: 20,
              width: '90%',
              marginHorizontal: 'auto',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setNewTicketData({
                  adminid: '',
                  departmentid: '',
                  employeeid: '',
                  issue: '',
                  details: '',
                });
                onClose(); // ✅ fixed
              }}
              style={{ backgroundColor: 'gray', padding: 10, borderRadius: 10 }}
            >
              <Text style={{ color: 'white' }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={updateTicket}
              style={{
                backgroundColor: 'green',
                padding: 10,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: 'white' }}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TicketUpdateModel;
