// types.ts (or at the top of your file)
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

//sales person
export interface SalesPerson {
  id: number;
  fullname: string;
  contact: string;
  email: string;
  userimage: string | null;
  username: string | null;
  password: string | null;
  role: 'Sales Person' | string;
  address: string;
  city: string;
  adharno: string;
  panno: string;
  rerano: string;
  experience: string;
  adharimage: string;
  panimage: string;
  status: 'Active' | 'Inactive' | string;
  loginstatus: 'active' | 'inactive' | string;
  paymentStatus: 'success' | 'failed' | string;
  paymentId: string;
  registrationAmount: number;
  updated_at: string; // Use Date if you parse to Date object
  created_at: string; // Use Date if you parse to Date object
}

// enquirers
export interface Enquirer {
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
  frontView: string[];
  territoryName: string | null;
  territoryContact: string | null;
}

//PropertyInfo

export interface PropertyInfo {
  propertyid: number;
  builderid: number;
  partnerid: number | null;
  employeeid: number | null;
  projectpartnerid: number | null;
  propertyCategory: string;
  propertyType: string;
  propertyName: string;
  emi: number;
  totalSalesPrice: string;
  totalOfferPrice: string;
  propertyApprovedBy: string;
  distanceFromCityCenter: string;
  reraStatus: string | null;
  perYearReturn: string | null;
  stampDuty: string;
  registrationFee: string;
  gst: string;
  advocateFee: string;
  msebWater: string;
  maintenance: string;
  other: string;
  address: string;
  location: string;
  city: string;
  frontView: string; // JSON stringified array
  sideView: string;
  hallView: string;
  kitchenView: string;
  bedroomView: string;
  bathroomView: string | null;
  balconyView: string | null;
  nearestLandmark: string;
  developedAmenities: string;
  builtYear: string;
  furnishing: string;
  ownershipType: string;
  carpetArea: string;
  builtUpArea: string;
  totalFloors: string;
  floorNo: string;
  parkingAvailability: string;
  propertyFacing: string;
  reraRegistered: string;
  loanAvailability: string;
  waterSupply: string;
  powerBackup: string;
  locationFeature: string;
  sizeAreaFeature: string;
  parkingFeature: string;
  terraceFeature: string;
  ageOfPropertyFeature: string;
  furnishingFeature: string;
  amenitiesFeature: string;
  propertyStatusFeature: string;
  floorNumberFeature: string;
  smartHomeFeature: string;
  securityBenefit: string;
  primeLocationBenefit: string;
  rentalIncomeBenefit: string;
  qualityBenefit: string;
  capitalAppreciationBenefit: string;
  ecofriendlyBenefit: string;
  rejectreason: string | null;
  status: string;
  approve: string;
  updated_at: string;
  created_at: string;
}

//enquiry details
export interface EnquiryDetails {
  enquirersid: number;
  propertyid: number;
  salespersonid: number;
  territorypartnerid: number;
  source: string | null;
  customer: string;
  contact: string;
  location: string | null;
  city: string | null;
  minbudget: number | null;
  maxbudget: number | null;
  category: string | null;
  status: string;
  assign: string;
  message: string | null;
  visitdate: string; // Format: "YYYY-MM-DD"
  territorystatus: string;
  state: string | null;
  updated_at: string; // ISO timestamp
  created_at: string; // ISO timestamp
  territoryName: string;
  territoryContact: string;
  territoryFollowUp: string | null;
  territoryStatus: string | null;
}

export type RootStackParamList = {
  Sign_In: undefined;
  ForgotPassword: undefined;
  EmailVerification: undefined;
  PasswordResetMessage: undefined;
  SetNewPassword: undefined;
  PasswordChangedSuccess: undefined;
  Home: undefined;

  FindTerritory: undefined;
  SelectTerritoryPartner: undefined;
  ProjectLocation: undefined;
  ConfirmSchedule: {selectedIndex: number};
  SuccessScreen: undefined;
  AddClient: undefined;
  Flat: {flatType: string};
  FlatInfo: {flat: Property};
  UserProfile: {user: SalesPerson};
  ProfileUpdateSuccess: undefined;
  Community: undefined;
  NewPost: undefined;
  Referral: undefined;
  Tickets: undefined;
  PropertyDetails: {
    propertyid: number;
    enquirersid: number | null;
    salespersonid: number | null;
    booktype: string;
  };
  EnquiryDetail: {enquiry: Enquirer};

  // add other screens here
};
