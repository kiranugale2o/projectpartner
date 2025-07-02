import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import {PropertyInfo} from '../types';

interface Props {
  data: PropertyInfo;
}

const PropertyOverviewCard: React.FC<Props> = ({data}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Property overview</Text>

      <View style={styles.detailsWrapper}>
        {/* Row 1 */}
        <View style={styles.row}>
          {/* Property Type */}
          <View style={styles.detailBox}>
            <View style={styles.iconRow}>
              <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <Path
                  d="M3.5 21.5V7.5H7.5V3.5H17.5V11.5H21.5V21.5H13.5V17.5H11.5V21.5H3.5ZM5.5 19.5H7.5V17.5H5.5V19.5ZM5.5 15.5H7.5V13.5H5.5V15.5ZM5.5 11.5H7.5V9.5H5.5V11.5ZM9.5 15.5H11.5V13.5H9.5V15.5ZM9.5 11.5H11.5V9.5H9.5V11.5ZM9.5 7.5H11.5V5.5H9.5V7.5ZM13.5 15.5H15.5V13.5H13.5V15.5ZM13.5 11.5H15.5V9.5H13.5V11.5ZM13.5 7.5H15.5V5.5H13.5V7.5ZM17.5 19.5H19.5V17.5H17.5V19.5ZM17.5 15.5H19.5V13.5H17.5V15.5Z"
                  fill="black"
                />
              </Svg>

              <View style={styles.labelBox}>
                <Text style={styles.label}>Property Type</Text>
                <Text style={styles.value}>
                  {data?.propertyType === '' ? '__' : data?.propertyType}
                </Text>
              </View>
            </View>
          </View>

          {/* Ownership Type */}
          <View style={styles.detailBox}>
            <View style={styles.iconRow}>
              <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <Path
                  d="M19.5 14.5V8L14.5 4.5L9.5 8V9.5H7.5V7L14.5 2L21.5 7V14.5H19.5ZM15 8.5H16V7.5H15V8.5ZM13 8.5H14V7.5H13V8.5ZM15 10.5H16V9.5H15V10.5ZM13 10.5H14V9.5H13V10.5ZM7.5 19L14.45 20.9L20.4 19.05C20.3167 18.9 20.1958 18.7708 20.0375 18.6625C19.8792 18.5542 19.7 18.5 19.5 18.5H14.45C14 18.5 13.6417 18.4833 13.375 18.45C13.1083 18.4167 12.8333 18.35 12.55 18.25L10.225 17.475L10.775 15.525L12.8 16.2C13.0833 16.2833 13.4167 16.35 13.8 16.4C14.1833 16.45 14.75 16.4833 15.5 16.5C15.5 16.3167 15.4458 16.1417 15.3375 15.975C15.2292 15.8083 15.1 15.7 14.95 15.65L9.1 13.5H7.5V19ZM1.5 22.5V11.5H9.1C9.21667 11.5 9.33333 11.5125 9.45 11.5375C9.56667 11.5625 9.675 11.5917 9.775 11.625L15.65 13.8C16.2 14 16.6458 14.35 16.9875 14.85C17.3292 15.35 17.5 15.9 17.5 16.5H19.5C20.3333 16.5 21.0417 16.775 21.625 17.325C22.2083 17.875 22.5 18.6 22.5 19.5V20.5L14.5 23L7.5 21.05V22.5H1.5ZM3.5 20.5H5.5V13.5H3.5V20.5Z"
                  fill="black"
                />
              </Svg>

              <View style={styles.labelBox}>
                <Text style={styles.label}>Ownership Type</Text>
                <Text style={styles.value}>{data?.ownershipType}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          {/* Property Type */}
          <View style={styles.detailBox}>
            <View style={styles.iconRow}>
              <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <Path
                  d="M3.5 22.5V20.5H7V16H11.5V11.5H16V7H20.5V3.5H22.5V9H18V13.5H13.5V18H9V22.5H3.5Z"
                  fill="black"
                />
              </Svg>

              <View style={styles.labelBox}>
                <Text style={styles.label}>Total Floors</Text>
                <Text style={styles.value}>{data?.totalFloors}</Text>
              </View>
            </View>
          </View>

          {/* Ownership Type */}
          <View style={styles.detailBox}>
            <View style={styles.iconRow}>
              <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <Path
                  d="M15.5 19.5L14.075 18.1L18.675 13.5H2.5V11.5H18.675L14.1 6.9L15.5 5.5L22.5 12.5L15.5 19.5Z"
                  fill="black"
                />
              </Svg>

              <View style={styles.labelBox}>
                <Text style={styles.label}>Property Facing</Text>
                <Text style={styles.value}>{data?.propertyFacing}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Row 3 */}
        <View style={styles.row}>
          {/* Property Type */}
          <View style={styles.detailBox}>
            <View style={styles.iconRow}>
              <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
                <Path
                  d="M12.775 19C12.975 18.9833 13.1458 18.9042 13.2875 18.7625C13.4292 18.6208 13.5 18.45 13.5 18.25C13.5 18.0167 13.425 17.8292 13.275 17.6875C13.125 17.5458 12.9333 17.4833 12.7 17.5C12.0167 17.55 11.2917 17.3625 10.525 16.9375C9.75833 16.5125 9.275 15.7417 9.075 14.625C9.04167 14.4417 8.95417 14.2917 8.8125 14.175C8.67083 14.0583 8.50833 14 8.325 14C8.09167 14 7.9 14.0875 7.75 14.2625C7.6 14.4375 7.55 14.6417 7.6 14.875C7.88333 16.3917 8.55 17.475 9.6 18.125C10.65 18.775 11.7083 19.0667 12.775 19ZM12.5 22C10.2167 22 8.3125 21.2167 6.7875 19.65C5.2625 18.0833 4.5 16.1333 4.5 13.8C4.5 12.1333 5.1625 10.3208 6.4875 8.3625C7.8125 6.40417 9.81667 4.28333 12.5 2C15.1833 4.28333 17.1875 6.40417 18.5125 8.3625C19.8375 10.3208 20.5 12.1333 20.5 13.8C20.5 16.1333 19.7375 18.0833 18.2125 19.65C16.6875 21.2167 14.7833 22 12.5 22ZM12.5 20C14.2333 20 15.6667 19.4125 16.8 18.2375C17.9333 17.0625 18.5 15.5833 18.5 13.8C18.5 12.5833 17.9958 11.2083 16.9875 9.675C15.9792 8.14167 14.4833 6.46667 12.5 4.65C10.5167 6.46667 9.02083 8.14167 8.0125 9.675C7.00417 11.2083 6.5 12.5833 6.5 13.8C6.5 15.5833 7.06667 17.0625 8.2 18.2375C9.33333 19.4125 10.7667 20 12.5 20Z"
                  fill="black"
                />
              </Svg>

              <View style={styles.labelBox}>
                <Text style={styles.label}>Water Supply</Text>
                <Text style={[styles.value]}>{data?.waterSupply}</Text>
              </View>
            </View>
          </View>

          {/* Ownership Type */}
          <View style={styles.detailBox}>
            <View style={styles.iconRow}>
              <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <Path
                  d="M15 18.5C14.3 18.5 13.7083 18.2583 13.225 17.775C12.7417 17.2917 12.5 16.7 12.5 16C12.5 15.3 12.7417 14.7083 13.225 14.225C13.7083 13.7417 14.3 13.5 15 13.5C15.7 13.5 16.2917 13.7417 16.775 14.225C17.2583 14.7083 17.5 15.3 17.5 16C17.5 16.7 17.2583 17.2917 16.775 17.775C16.2917 18.2583 15.7 18.5 15 18.5ZM5.5 22.5C4.95 22.5 4.47917 22.3042 4.0875 21.9125C3.69583 21.5208 3.5 21.05 3.5 20.5V6.5C3.5 5.95 3.69583 5.47917 4.0875 5.0875C4.47917 4.69583 4.95 4.5 5.5 4.5H6.5V2.5H8.5V4.5H16.5V2.5H18.5V4.5H19.5C20.05 4.5 20.5208 4.69583 20.9125 5.0875C21.3042 5.47917 21.5 5.95 21.5 6.5V20.5C21.5 21.05 21.3042 21.5208 20.9125 21.9125C20.5208 22.3042 20.05 22.5 19.5 22.5H5.5ZM5.5 20.5H19.5V10.5H5.5V20.5ZM5.5 8.5H19.5V6.5H5.5V8.5Z"
                  fill="black"
                />
              </Svg>

              <View style={styles.labelBox}>
                <Text style={styles.label}>Built Year</Text>
                <Text style={styles.value}>{data?.builtYear}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Row 4 */}
        <View style={styles.row}>
          {/* Property Type */}
          <View style={styles.detailBox}>
            <View style={styles.iconRow}>
              <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <Path
                  d="M5.89891 7.146C5.72787 7.34713 5.55633 7.54776 5.3893 7.74388C5.06127 7.41284 4.77537 7.12493 4.5 6.84756C5.1982 6.14836 5.91044 5.43561 6.61366 4.73189C7.31738 5.43711 8.02912 6.14986 8.72631 6.84856C8.45396 7.12092 8.16605 7.40832 7.85306 7.72131C7.67199 7.51917 7.47738 7.30199 7.23361 7.03063V9.91622C8.54725 8.60058 9.89249 7.25434 11.2297 5.91512C10.8771 5.91512 10.4778 5.89054 10.0836 5.92264C9.74201 5.95023 9.50326 5.83788 9.28056 5.58608C9.01021 5.28062 8.70274 5.00776 8.36969 4.68023C8.49559 4.6707 8.5643 4.66117 8.63352 4.66117C11.9781 4.66067 15.3226 4.65916 18.6671 4.66117C19.7345 4.66167 20.4954 5.40552 20.4969 6.46636C20.5024 9.82845 20.4989 13.19 20.4989 16.5521C20.4989 16.5988 20.4939 16.6459 20.4292 16.7372C20.1262 16.4202 19.8368 16.0887 19.5148 15.7922C19.3056 15.5996 19.2214 15.399 19.2384 15.1161C19.2625 14.7204 19.2444 14.3221 19.2444 13.9289C17.9012 15.2736 16.5715 16.6043 15.2448 17.9325H18.136C17.8656 17.7118 17.6429 17.5302 17.4242 17.3516C17.7828 17.0066 18.0748 16.7257 18.3587 16.4518C19.0303 17.131 19.7395 17.8477 20.4437 18.5595C19.7616 19.2366 19.0463 19.9468 18.3386 20.649C18.0728 20.3782 17.7899 20.0903 17.4884 19.7833C17.658 19.6338 17.8511 19.4633 18.0442 19.2928C18.0321 19.2632 18.0201 19.2336 18.0076 19.2045H17.7312C14.4368 19.2045 11.1424 19.2055 7.84805 19.204C6.94621 19.204 6.29616 18.7666 6.04788 17.9711C5.97966 17.7524 5.9601 17.5117 5.9596 17.2804C5.95408 14.0021 5.95609 10.7238 5.95609 7.44544C5.95609 7.35716 5.95609 7.26838 5.95609 7.18011C5.93653 7.16857 5.91696 7.15753 5.8974 7.146H5.89891ZM7.21254 16.981C10.9032 13.2899 14.5878 9.60424 18.2764 5.91512C17.7507 5.91512 17.2105 5.91061 16.6703 5.92064C16.6011 5.92214 16.5209 5.98534 16.4657 6.04052C13.4211 9.0821 10.378 12.1257 7.33694 15.1713C7.28226 15.2265 7.21907 15.3067 7.21756 15.3759C7.20753 15.9156 7.21204 16.4553 7.21204 16.9805L7.21254 16.981ZM19.2444 6.91126C15.5628 10.5919 11.8818 14.2724 8.20567 17.9475C8.70725 17.9475 9.23943 17.952 9.77161 17.942C9.84082 17.9405 9.92007 17.8748 9.97525 17.8191C13.0249 14.7725 16.073 11.7239 19.1186 8.67381C19.1737 8.61864 19.2374 8.53838 19.2384 8.46917C19.2485 7.93749 19.2439 7.40532 19.2439 6.91126H19.2444ZM19.2444 10.4364C16.7401 12.9387 14.2332 15.4436 11.7268 17.9475C12.2349 17.9475 12.7665 17.952 13.2987 17.942C13.3674 17.9405 13.4457 17.8718 13.5014 17.8161C15.3763 15.9447 17.2492 14.0713 19.1201 12.1959C19.1747 12.1407 19.2374 12.06 19.2389 11.9903C19.249 11.4581 19.2444 10.9259 19.2444 10.4359V10.4364ZM7.21254 13.4328C9.72396 10.9224 12.2253 8.42152 14.7322 5.91512C14.2302 5.91512 13.715 5.91061 13.1999 5.92014C13.1297 5.92164 13.0479 5.98033 12.9933 6.0345C11.1058 7.91793 9.22087 9.80337 7.33794 11.6908C7.28327 11.746 7.21957 11.8257 7.21806 11.8955C7.20803 12.4116 7.21254 12.9277 7.21254 13.4328Z"
                  fill="black"
                />
              </Svg>

              <View style={styles.labelBox}>
                <Text style={styles.label}>Carpet Area</Text>
                <Text style={styles.value}>{data?.carpetArea} Sq.ft </Text>
              </View>
            </View>
          </View>

          {/* Ownership Type */}
          <View style={styles.detailBox}>
            <View style={styles.iconRow}>
              <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <Path
                  d="M2.5 19.5V17.5H8.5V11.5H14.5V5.5H22.5V7.5H16.5V13.5H10.5V19.5H2.5Z"
                  fill="black"
                />
              </Svg>

              <View style={styles.labelBox}>
                <Text style={styles.label}>Floor No</Text>
                <Text style={styles.value}>
                  {data?.floorNumberFeature} Floor
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Row 5 */}
        <View style={styles.row}>
          {/* Property Type */}
          <View style={styles.detailBox}>
            <View style={styles.iconRow}>
              <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <Path
                  d="M14.5 22.5V19.425L20.025 13.925C20.175 13.775 20.3417 13.6667 20.525 13.6C20.7083 13.5333 20.8917 13.5 21.075 13.5C21.275 13.5 21.4667 13.5375 21.65 13.6125C21.8333 13.6875 22 13.8 22.15 13.95L23.075 14.875C23.2083 15.025 23.3125 15.1917 23.3875 15.375C23.4625 15.5583 23.5 15.7417 23.5 15.925C23.5 16.1083 23.4667 16.2958 23.4 16.4875C23.3333 16.6792 23.225 16.85 23.075 17L17.575 22.5H14.5ZM16 21H16.95L19.975 17.95L19.525 17.475L19.05 17.025L16 20.05V21ZM6.5 22.5C5.95 22.5 5.47917 22.3042 5.0875 21.9125C4.69583 21.5208 4.5 21.05 4.5 20.5V4.5C4.5 3.95 4.69583 3.47917 5.0875 3.0875C5.47917 2.69583 5.95 2.5 6.5 2.5H14.5L20.5 8.5V11.5H18.5V9.5H13.5V4.5H6.5V20.5H12.5V22.5H6.5ZM19.525 17.475L19.05 17.025L19.975 17.95L19.525 17.475Z"
                  fill="black"
                />
              </Svg>

              <View style={styles.labelBox}>
                <Text style={styles.label}>RERA Registered</Text>
                <Text style={styles.value}>{data?.reraRegistered}</Text>
              </View>
            </View>
          </View>

          {/* Ownership Type */}
          <View style={styles.detailBox}>
            <View style={styles.iconRow}>
              <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
                <Path
                  d="M11.05 18.2L16.225 12H12.225L12.95 6.325L8.325 13H11.8L11.05 18.2ZM8.5 22L9.5 15H4.5L13.5 2H15.5L14.5 10H20.5L10.5 22H8.5Z"
                  fill="black"
                />
              </Svg>

              <View style={styles.labelBox}>
                <Text style={styles.label}>Power Backup</Text>
                <Text style={styles.value}>{data?.powerBackup}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Row 6 */}
        <View style={styles.row}>
          {/* Property Type */}
          <View style={styles.detailBox}>
            <View style={styles.iconRow}>
              <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
                <Path
                  d="M6.5 21V3H13.5C15.1667 3 16.5833 3.58333 17.75 4.75C18.9167 5.91667 19.5 7.33333 19.5 9C19.5 10.6667 18.9167 12.0833 17.75 13.25C16.5833 14.4167 15.1667 15 13.5 15H10.5V21H6.5ZM10.5 11H13.7C14.25 11 14.7208 10.8042 15.1125 10.4125C15.5042 10.0208 15.7 9.55 15.7 9C15.7 8.45 15.5042 7.97917 15.1125 7.5875C14.7208 7.19583 14.25 7 13.7 7H10.5V11Z"
                  fill="black"
                />
              </Svg>

              <View style={styles.labelBox}>
                <Text style={styles.label}>Parking Availability</Text>
                <Text style={styles.value}>{data?.parkingAvailability}</Text>
              </View>
            </View>
          </View>

          {/* Ownership Type */}
          <View style={styles.detailBox}>
            <View style={styles.iconRow}>
              <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <G clip-path="url(#clip0_1560_1433)">
                  <Path
                    d="M11.0974 19.1528L4.64718 12.7026C3.91709 11.9725 3.91709 10.6283 4.64718 9.89817L11.0974 3.44796C11.8275 2.71787 13.1717 2.71787 13.9018 3.44796L20.352 9.89817C21.0821 10.6283 21.0821 11.9725 20.352 12.7026L13.9018 19.1528C13.1717 19.8829 11.8275 19.8829 11.0974 19.1528V19.1528Z"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </G>
                <Defs>
                  <ClipPath id="clip0_1560_1433">
                    <Rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0.5 0.5)"
                    />
                  </ClipPath>
                </Defs>
              </Svg>

              <View style={styles.labelBox}>
                <Text style={styles.label}>Built-up Area</Text>
                <Text style={styles.value}>{data?.builtUpArea} Sq</Text>
              </View>
            </View>
          </View>
        </View>

        {/* row 7 */}
        <View style={styles.row}>
          {/* Property Type */}
          <View style={styles.detailBox}>
            <View style={styles.iconRow}>
              <Svg width="25" height="24" viewBox="0 0 25 24" fill="none">
                <Path
                  d="M8.9 21C7.38333 21 6.10417 20.4792 5.0625 19.4375C4.02083 18.3958 3.5 17.1167 3.5 15.6C3.5 14.9667 3.60833 14.35 3.825 13.75C4.04167 13.15 4.35 12.6083 4.75 12.125L8.3 7.85L5.875 3H19.125L16.7 7.85L20.25 12.125C20.65 12.6083 20.9583 13.15 21.175 13.75C21.3917 14.35 21.5 14.9667 21.5 15.6C21.5 17.1167 20.975 18.3958 19.925 19.4375C18.875 20.4792 17.6 21 16.1 21H8.9ZM12.5 16C11.95 16 11.4792 15.8042 11.0875 15.4125C10.6958 15.0208 10.5 14.55 10.5 14C10.5 13.45 10.6958 12.9792 11.0875 12.5875C11.4792 12.1958 11.95 12 12.5 12C13.05 12 13.5208 12.1958 13.9125 12.5875C14.3042 12.9792 14.5 13.45 14.5 14C14.5 14.55 14.3042 15.0208 13.9125 15.4125C13.5208 15.8042 13.05 16 12.5 16ZM10.125 7H14.875L15.875 5H9.125L10.125 7ZM8.9 19H16.1C17.05 19 17.8542 18.6708 18.5125 18.0125C19.1708 17.3542 19.5 16.55 19.5 15.6C19.5 15.2 19.4292 14.8125 19.2875 14.4375C19.1458 14.0625 18.95 13.725 18.7 13.425L15.025 9H10L6.3 13.4C6.05 13.7 5.85417 14.0417 5.7125 14.425C5.57083 14.8083 5.5 15.2 5.5 15.6C5.5 16.55 5.82917 17.3542 6.4875 18.0125C7.14583 18.6708 7.95 19 8.9 19Z"
                  fill="black"
                />
              </Svg>

              <View style={styles.labelBox}>
                <Text style={styles.label}>Loan Availability</Text>
                <Text style={styles.value}>{data?.loanAvailability}</Text>
              </View>
            </View>
          </View>

          {/* Ownership Type */}
          <View style={styles.detailBox}>
            <View style={styles.iconRow}>
              <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
                <Path
                  d="M5.5 21.5C5.21667 21.5 4.97917 21.4042 4.7875 21.2125C4.59583 21.0208 4.5 20.7833 4.5 20.5V19.5C3.66667 19.5 2.95833 19.2083 2.375 18.625C1.79167 18.0417 1.5 17.3333 1.5 16.5V11.5C1.5 10.6667 1.79167 9.95833 2.375 9.375C2.95833 8.79167 3.66667 8.5 4.5 8.5V6.5C4.5 5.66667 4.79167 4.95833 5.375 4.375C5.95833 3.79167 6.66667 3.5 7.5 3.5H17.5C18.3333 3.5 19.0417 3.79167 19.625 4.375C20.2083 4.95833 20.5 5.66667 20.5 6.5V8.5C21.3333 8.5 22.0417 8.79167 22.625 9.375C23.2083 9.95833 23.5 10.6667 23.5 11.5V16.5C23.5 17.3333 23.2083 18.0417 22.625 18.625C22.0417 19.2083 21.3333 19.5 20.5 19.5V20.5C20.5 20.7833 20.4042 21.0208 20.2125 21.2125C20.0208 21.4042 19.7833 21.5 19.5 21.5C19.2167 21.5 18.9792 21.4042 18.7875 21.2125C18.5958 21.0208 18.5 20.7833 18.5 20.5V19.5H6.5V20.5C6.5 20.7833 6.40417 21.0208 6.2125 21.2125C6.02083 21.4042 5.78333 21.5 5.5 21.5ZM4.5 17.5H20.5C20.7833 17.5 21.0208 17.4042 21.2125 17.2125C21.4042 17.0208 21.5 16.7833 21.5 16.5V11.5C21.5 11.2167 21.4042 10.9792 21.2125 10.7875C21.0208 10.5958 20.7833 10.5 20.5 10.5C20.2167 10.5 19.9792 10.5958 19.7875 10.7875C19.5958 10.9792 19.5 11.2167 19.5 11.5V15.5H5.5V11.5C5.5 11.2167 5.40417 10.9792 5.2125 10.7875C5.02083 10.5958 4.78333 10.5 4.5 10.5C4.21667 10.5 3.97917 10.5958 3.7875 10.7875C3.59583 10.9792 3.5 11.2167 3.5 11.5V16.5C3.5 16.7833 3.59583 17.0208 3.7875 17.2125C3.97917 17.4042 4.21667 17.5 4.5 17.5ZM7.5 13.5H17.5V11.5C17.5 11.05 17.5917 10.6417 17.775 10.275C17.9583 9.90833 18.2 9.58333 18.5 9.3V6.5C18.5 6.21667 18.4042 5.97917 18.2125 5.7875C18.0208 5.59583 17.7833 5.5 17.5 5.5H7.5C7.21667 5.5 6.97917 5.59583 6.7875 5.7875C6.59583 5.97917 6.5 6.21667 6.5 6.5V9.3C6.8 9.58333 7.04167 9.90833 7.225 10.275C7.40833 10.6417 7.5 11.05 7.5 11.5V13.5Z"
                  fill="black"
                />
              </Svg>

              <View style={styles.labelBox}>
                <Text style={styles.label}>Furnishing</Text>
                <Text style={styles.value}>{data?.furnishing}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',

    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    margin: 'auto',
    marginInline: 'auto',
    //alignItems: 'center',
    gap: 32,
  },
  heading: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 19,
    // textAlign: 'left',
    color: '#000',
  },
  detailsWrapper: {
    flexDirection: 'column',
    gap: 25,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  detailBox: {
    width: 165,
    height: 39,
    flexDirection: 'column',
    gap: 12,
  },
  detailBoxFull: {
    width: '80%',
    height: 56,
    flexDirection: 'column',
    gap: 12,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  labelBox: {
    flexDirection: 'column',
    gap: 8,
  },
  label: {
    fontFamily: 'Inter',
    fontSize: 12,
    lineHeight: 15,
    color: 'rgba(0, 0, 0, 0.4)',
  },
  value: {
    fontFamily: 'Inter',
    fontSize: 14,
    lineHeight: 17,
    color: '#000',
  },
  divider: {
    width: 165,
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: 4,
  },
});

export default PropertyOverviewCard;
