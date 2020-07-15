// Import React core components
import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

// Import contexts
import {StateContext} from '../contexts/StateContext';
import {UserContext} from '../contexts/UserContext';

import NewUserForm from './NewUserForm';

const Home = ({navigation}) => {

  const {safe, warning, danger} = useContext(StateContext);
  const {user, isNewUser} = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(isNewUser);
  return (
    <View style={styles.container}>
      <Modal visible={modalOpen}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <NewUserForm
              setModalOpen={setModalOpen}
              userUid={user.uid}
              userName={user.displayName}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Text>Home</Text>
      <Text>
        Safe: {JSON.stringify(safe)}, Warning: {JSON.stringify(warning)}, Danger: {JSON.stringify(danger)}
      </Text>
      <Button
        title="Map"
        onPress={() =>
          navigation.push('Map', {name: 'User Location and Red Zones Map'})
        }
      />
      <Button title="Open Drawer" onPress={() => navigation.toggleDrawer()} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
