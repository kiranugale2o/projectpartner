import React, { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const formatIndianAmount = amount => {
  const num = parseInt(amount, 10);
  if (num >= 10000000) return `${(num / 10000000).toFixed(1)} Cr`;
  if (num >= 100000) return `${(num / 100000).toFixed(1)} Lakh`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)} Thousand`;
  return num.toString();
};

const PropertyDropdown = ({ propertyList, propertyId, setPropertyId }) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const formatted = propertyList.map(property => ({
      label: `${property.propertyName}\n| ${
        property.builtUpArea
      } SqFt\n| ₹${formatIndianAmount(property.totalOfferPrice)}`,
      value: property.propertyid,
    }));
    setItems(formatted);
  }, [propertyList]);

  return (
    <DropDownPicker
      open={open}
      value={propertyId}
      items={items}
      setOpen={setOpen}
      setValue={setPropertyId}
      setItems={setItems}
      placeholder="Select Property"
      style={{
        borderColor: '#00000033',
        borderRadius: 6,
        minHeight: 50,
        paddingHorizontal: 10,
      }}
      dropDownContainerStyle={{
        borderColor: '#00000033',
        maxHeight: 300,
      }}
      textStyle={{
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 22,
      }}
      listMode="SCROLLVIEW"
    />
  );
};

export default PropertyDropdown;
