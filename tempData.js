import { colors } from "./src/constants/colors.js";
import { SCREEN } from "./src/constants/screens.js";
import { Strings } from "./src/constants/strings.js";
import { Images } from "./src/utilities/index.js";

export const OnBoarding = [
    { id: '1', uri: Images.onBoarding1, title: Strings.title, description: Strings.description },
    { id: '2', uri: Images.onBoarding2, title: Strings.title, description: Strings.description },
    { id: '3', uri: Images.onBoarding3, title: Strings.title, description: Strings.description },
]
export const userTypes = [
    { id: '1', uri: Images.client, role: 'I am a Client', description: Strings.description, bgColor: colors.appBgColor5, activeColor: colors.appIcon1 },
    { id: '2', uri: Images.driver, role: 'I am a Driver', description: Strings.description, bgColor: colors.appBgColor6, activeColor: colors.appIcon2 },
    { id: '3', uri: Images.helper, role: 'I am a Helper', description: Strings.description, bgColor: colors.appBgColor7, activeColor: colors.appIcon3 },
]
export const vehicleCompanies = [
    { label: "Honda", value: "Honda" },
    { label: "Toyota", value: "Toyota" },
    { label: "Ford", value: "ford" },
    { label: "BMW", value: "bmw" },
];
export const VehicleModal = [
    { label: '2020', value: '2020' },
    { label: '2022', value: '2022' },
]
export const VehicleColors = [
    { label: 'White', value: 'White' },
    { label: 'Red', value: 'Red' },
    { label: 'Black', value: 'Black' },
]
export const VehicleClass = [
    { label: 'A Class', value: 'A Class' },
    { label: 'B Class', value: 'B Class' },
    { label: 'C Class', value: 'C Class' },
]
export const VehicleType = [
    { label: 'Truck', value: 'Truck' },
    { label: 'Suzuki', value: 'Suzuki' },
]
export const options = [
    { id: "1", label: "Items less than 1 ft x 1 ft x 1 ft up to 25 lbs" },
    { id: "2", label: "Items less than 1 ft x 1 ft x 1 ft up to 60 lbs" },
    { id: "3", label: "Items up to 8 feet and under 60 lbs" },
    { id: "4", label: "Items 8 ft - 16 ft and over 60 lbs" },
    { id: "5", label: "Sheets (plywood, drywall)" },
    { id: "6", label: "Door" },
    { id: "7", label: "Windows" },
    { id: "8", label: "Landscaping material (dirt, mulch, gravel)" },
];
export const m_options = [
    { id: "1", label: "Traditional 2 wheel" },
    { id: "2", label: "Tricycle" },
    { id: "3", label: "Golf Cart" },
    { id: "4", label: "4 wheeler" },
    { id: "5", label: "Side by side" },
];
export const Itemdata = [
    { id: "1", title: "Bed", type: "Bed" },
    { id: "2", title: "Bike", type: "Bike" },
    { id: "3", title: "Boxes", type: "Boxes" },
    { id: "4", title: "Boats", type: "Boats" },
    { id: "5", title: "Motorcycle", type: "Motorcycle" },
    { id: "6", title: "TV", type: "TV" },
    { id: "7", title: "Construction", type: "Construction" },
    { id: "8", title: "Appliances", type: "Appliances" },
];
export const VehicleName = [
    { label: "Civic", value: "Civic" },
    { label: "GLI", value: "GLI" },
    { label: "Cruiser", value: "Cruiser" },
    { label: "Mustang", value: "mustang" },
    { label: "X5", value: "x5" },
];
export const Settings = [
    { id: '1', title: 'Notification Setting', iconName: 'notifications-outline', iconType: 'ionicon', screen: SCREEN.notificationSetting },
    { id: '2', title: 'History', iconName: 'history', iconType: 'material-community', screen: SCREEN.history },
    { id: '3', title: 'My Booking', iconName: 'calendar', iconType: 'antdesign', screen: SCREEN.myBookings },
    { id: '4', title: 'Feedback', iconName: 'people-outline', iconType: 'ionicon', screen: SCREEN.feedBack },
    { id: '5', title: 'PrivacyPolicy', iconName: 'security', iconType: 'material-community', screen: SCREEN.privacyPolicy },
    { id: '6', title: 'Terms of Use', iconName: 'document-text-outline', iconType: 'ionicon', screen: SCREEN.privacyPolicy },
    { id: '7', title: 'Customer Support', iconName: 'customerservice', iconType: 'antdesign', screen: SCREEN.customerSupport },
    { id: '8', title: 'Rating & Review', iconName: 'star', iconType: 'feather', screen: SCREEN.driverReviews },
    { id: '9', title: 'Logout', iconName: 'logout', iconType: 'material-icon', screen: SCREEN.onboarding },
]
export const categories = [
    {
        title: 'Common',
        notifications: [
            { id: 'notification1', title: 'General Notification', enable: true },
            { id: 'notification2', title: 'Sound', enable: false },
            { id: 'notification3', title: 'Sound', enable: false },
        ],
    },
    {
        title: 'System & services update',
        notifications: [
            { id: 'notification4', title: 'Lorem ipsum', enable: true },
            { id: 'notification5', title: 'Lorem ipsum', enable: false },
            { id: 'notification6', title: 'Lorem ipsum', enable: false },
            { id: 'notification7', title: 'Lorem ipsum', enable: false },
            { id: 'notification8', title: 'Lorem ipsum', enable: false },
        ],
    },
    {
        title: 'System & services update',
        notifications: [
            { id: 'notification9', title: 'New Service Available', enable: true },
            { id: 'notification10', title: 'New Tips Available', enable: false },
        ],
    },
];
export const VehiclesList = [
    { id: '1', vehiclePhoto: Images.vehicle1, userName: 'Abc', pickupTime: '9:08 PM . 8 min away', price: '800' },
    { id: '2', vehiclePhoto: Images.vehicle2, userName: 'Abc', pickupTime: '9:08 PM . 8 min away', price: '700' },
    { id: '3', vehiclePhoto: Images.vehicle1, userName: 'Abc', pickupTime: '9:08 PM . 8 min away', price: '500' },
    { id: '4', vehiclePhoto: Images.vehicle2, userName: 'Abc', pickupTime: '9:08 PM . 8 min away', price: '800' },
    { id: '5', vehiclePhoto: Images.vehicle1, userName: 'Abc', pickupTime: '9:08 PM . 8 min away', price: '300' },
]
export const DriverReview = [
    { id: '1', user_profile: Images.user1, user_name: 'George', ratingStar: 3, comment: 'Driver is very good and respectable', date: '1 Day ago' },
    { id: '2', user_profile: Images.user1, user_name: 'George', ratingStar: 4, comment: 'Driver is very good and respectable', date: '2 Days ago' },
    { id: '3', user_profile: Images.user1, user_name: 'George', ratingStar: 5, comment: 'Driver is very good and respectable', date: '1 Day ago' },
    { id: '4', user_profile: Images.user1, user_name: 'George', ratingStar: 3, comment: 'Driver is very good and respectable', date: '3 Days ago' },
]
export const PaymentMethods = [
    { id: '1', title: 'Credit Card', source: Images.creditCard },
    { id: '2', title: 'GooglePay', source: Images.googlePay },
    { id: '3', title: 'ApplePay', source: Images.applePay },
    { id: '4', title: 'Samsung', source: Images.samsungPay },
]
export const CancelDeliveryReasond = [
    { id: '1', title: 'Waiting for driver too long' },
    { id: '2', title: 'Complaint about driver' },
    { id: '3', title: 'Driver asked me to cancel' },
    { id: '4', title: 'Driver arrived early' },
    { id: '5', title: 'Driver not getting closer' },
]
export const CancelDeliveryReasonsFromDriver = [
    { id: '1', title: 'Lorem ipsum dolor sit amet' },
    { id: '2', title: 'Complaint about user' },
    { id: '3', title: 'User asked me to cancel' },
    { id: '4', title: 'User arrived early' },
    { id: '5', title: 'User not getting closer' },
]

export const DriverSettings = [
    { id: '1', title: 'Notification Setting', iconName: 'notifications-outline', iconType: 'ionicon', screen: SCREEN.driverNotificationSetting, stack: SCREEN.driverStack },
    { id: '2', title: 'Wallet', iconName: 'wallet', iconType: 'antdesign', screen: SCREEN.driverWallet, stack: SCREEN.driverStack },
    { id: '3', title: 'History', iconName: 'history', iconType: 'material-community', screen: SCREEN.driverHistory, stack: SCREEN.driverStack },
    { id: '4', title: 'My Reviews', iconName: 'staro', iconType: 'antdesign', screen: SCREEN.driverReviews, stack: SCREEN.driverStack },
    { id: '5', title: 'PrivacyPolicy', iconName: 'security', iconType: 'material-community', screen: SCREEN.privacyPolicy, stack: SCREEN.appStack },
    { id: '6', title: 'Feedback', iconName: 'people-outline', iconType: 'ionicon', screen: SCREEN.feedBack, stack: SCREEN.appStack },
    { id: '7', title: 'Terms of Use', iconName: 'document-text-outline', iconType: 'ionicon', screen: SCREEN.privacyPolicy, stack: SCREEN.appStack },
    { id: '8', title: 'Customer Support', iconName: 'customerservice', iconType: 'antdesign', screen: SCREEN.customerSupport, stack: SCREEN.appStack },
    { id: '9', title: 'Rating & Review', iconName: 'star', iconType: 'feather', screen: SCREEN.driverReviews, stack: SCREEN.driverStack },
    { id: '10', title: 'Logout', iconName: 'logout', iconType: 'material-icon', screen: SCREEN.onboarding, stack: SCREEN.authStack },
]

export const ChatUsers = [
    { id: 1, name: 'George', time: '8:30pm', message: 'I’m here to help you', profile: Images.user1 },
    { id: 2, name: 'Mashka Shofwanul', time: '8:30pm', message: 'I’m here to help you', profile: Images.noUser },
    { id: 3, name: 'Aadam', time: '8:30pm', message: 'I’m here to help you', profile: Images.user1 },
    { id: 4, name: 'John', time: '8:30pm', message: 'I’m here to help you', profile: Images.user1 },
    { id: 5, name: 'Mashka Shofwanul', time: '8:30pm', message: 'I’m here to help you', profile: Images.user1 },
    { id: 6, name: 'Alice', time: '8:30pm', message: 'I’m here to help you', profile: Images.user1 },
    { id: 7, name: 'Mashka Shofwanul', time: '8:30pm', message: 'I’m here to help you', profile: Images.noUser },
]
export const RewardPrices = [
    { id: '1', tip: '5' },
    { id: '2', tip: '10' },
    { id: '3', tip: '15' },
    { id: '4', tip: '20' },
    { id: '5', tip: 'Other' },
]
