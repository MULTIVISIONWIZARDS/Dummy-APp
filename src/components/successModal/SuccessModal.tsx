// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Modal,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import Colors from '../../constants/Colors';


// interface SuccessModalProps {
//   visible: boolean;
//   onClose: () => void;
//   onEdit?: () => void;
//   title?: string;
//   message?: string;
//   image?: any;
// }

// const SuccessModal: React.FC<SuccessModalProps> = ({
//   visible,
//   onClose,
//   onEdit,
//   title = 'Congratulations!',
//   message = 'Your appointment with Dr. David Patel is confirmed for June 30, 2023, at 10:00 AM.',
//   image = require('../../assets/check.png'), // Add a success image in assets
// }) => {
//   return (
//     <Modal transparent visible={visible} animationType="fade">
//       <View style={styles.overlay}>
//         <View style={styles.modalContainer}>
//           <Image source={image} style={styles.image} resizeMode="contain" />
//           <Text style={styles.title}>{title}</Text>
//           <Text style={styles.message}>{message}</Text>

//           <View style={styles.buttonContainer}>
//             <TouchableOpacity style={styles.doneButton} activeOpacity={0.7} onPress={onClose}>
//               <Text style={styles.doneText}>Done</Text>
//             </TouchableOpacity>
//             {onEdit && (
//               <TouchableOpacity style={styles.editButton} onPress={onEdit}>
//                 <Text style={styles.editText}>Edit your appointment</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modalContainer: {
//     width: '85%',
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 20,
//     alignItems: 'center',
//     elevation: 5,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#4caf50',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   message: {
//     fontSize: 16,
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 25,
//   },
//   buttonContainer: {
//     width: '100%',
//   },
//   doneButton: {
//     backgroundColor: Colors.primary || '#4caf50',
//     paddingVertical: 12,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   doneText: {
//     color: 'white',
//     fontWeight: '600',
//     textAlign: 'center',
//     fontSize: 16,
//   },
//   editButton: {
//     borderColor: Colors.primary || '#4caf50',
//     borderWidth: 1,
//     paddingVertical: 12,
//     borderRadius: 10,
//   },
//   editText: {
//     color: Colors.primary || '#4caf50',
//     fontWeight: '600',
//     textAlign: 'center',
//     fontSize: 16,
//   },
// });

// export default SuccessModal;

import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Colors from '../../constants/Colors';

type ModalType = 'success' | 'error' | 'warning';

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  onEdit?: () => void;
  title?: string;
  message?: string;
  type?: ModalType; // success, error, warning
}

const images = {
  success: require('../../assets/check.png'), // success image
  error: require('../../assets/delete.png'),   // error image
  warning: require('../../assets/precaution.png'), // warning image
};

const colors = {
  success:  '#4caf50',
  error: '#f44336',
  warning: '#ff9800',
};

const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  onClose,
  onEdit,
  title,
  message,
  type = 'success',
}) => {
  const modalImage = images[type];
  const modalColor = colors[type];

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Image source={modalImage} style={styles.image} resizeMode="contain" />
          <Text style={[styles.title, { color: modalColor }]}>{title || ''}</Text>
          <Text style={styles.message}>{message || ''}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.doneButton, { backgroundColor: modalColor }]} activeOpacity={0.7} onPress={onClose}>
              <Text style={styles.doneText}>Done</Text>
            </TouchableOpacity>
            {onEdit && (
              <TouchableOpacity style={[styles.editButton, { borderColor: modalColor }]} onPress={onEdit}>
                <Text style={[styles.editText, { color: modalColor }]}>Edit your appointment</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 25,
  },
  buttonContainer: {
    width: '100%',
  },
  doneButton: {
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  doneText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  editButton: {
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 10,
  },
  editText: {
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default SuccessModal;

// const [modalVisible, setModalVisible] = useState(false);
//       <SuccessModal
//         visible={modalVisible}
//         title='Congratualtion Meeting booked'
//         message=' Waiting for approval...'
//         onClose={() => setModalVisible(false)}
//          type="success"
//         // onEdit={() => alert('Edit appointment pressed')}
//       />