import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
} from 'react-native';
import { AuthContext } from '../../context/AuthContext';

type FollowingUser = {
  id: number;
  fullname: string;
  userimage?: string;
};

const FollowingScreen: React.FC = () => {
  const [following, setFollowing] = useState<FollowingUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        if (!auth?.user?.id) return;

        const res = await fetch(
          `https://api.reparv.in/territoryapp/user/add/${auth.user.id}/sales/following`,
        );
        const data = await res.json();
        setFollowing(data);
      } catch (e) {
        console.error('Failed to fetch following', e);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowing();
  }, [auth?.user?.id]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 30 }} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={following}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={
                item.userimage
                  ? { uri: `https://api.reparv.in${item.userimage}` }
                  : require('../../../assets/community/user.png')
              }
              style={styles.avatar}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.fullname || 'Unnamed User'}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 0.4,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
    backgroundColor: '#eee',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
});

export default FollowingScreen;
