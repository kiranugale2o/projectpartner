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

type Follower = {
  id: number;
  fullname: string;
  email: string;
  userimage?: string;
};

const FollowersScreen: React.FC = () => {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        if (!auth?.user?.id) return;

        const res = await fetch(
          `https://api.reparv.in/territoryapp/user/add/${auth.user.id}/sales/followers`,
        );
        const data = await res.json();
        setFollowers(data);
      } catch (e) {
        console.error('Failed to fetch followers', e);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, [auth?.user?.id]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 30 }} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={followers}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingVertical: 12 }}
        renderItem={({ item }) => (
          <View style={styles.followerItem}>
            <Image
              source={
                item.userimage
                  ? { uri: `https://api.reparv.in${item.userimage}` }
                  : require('../../../assets/community/user.png')
              }
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.name}>{item.fullname}</Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  followerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eee',
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    color: '#111',
  },
  email: {
    color: '#666',
    fontSize: 13,
  },
});

export default FollowersScreen;
