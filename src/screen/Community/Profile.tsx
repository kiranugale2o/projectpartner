import React, { useCallback, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types';
import UserPostCard from '../../component/community/UserPost';
import Loader from '../../component/loader';
import Svg, { Line, Path } from 'react-native-svg';

// ────────────────────────────────────────────────
//  Component
// ────────────────────────────────────────────────
const UserProfile: React.FC = () => {
  type UserProfileRouteProp = RouteProp<RootStackParamList, 'UserProfile'>;
  const { params } = useRoute<UserProfileRouteProp>();
  const { user } = params;

  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<any[]>([]);

  // fetch posts
  const fetchUserPosts = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.reparv.in/salesapp/post/getUserPosts?id=${user?.salespersonsid}`,
      );
      if (!res.ok) throw new Error(`Status ${res.status}`);
      const data = await res.json();
      setPost(data);
    } catch (e) {
      console.error('Failed to fetch user posts', e);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserPosts();
    }, []),
  );

  /* ───────────────────────────────────────────── */
  return (
    <View style={styles.page}>
      {/* 1. Avatar + Name  */}
      <View style={styles.profileHeader}>
        <Image
          source={
            user.userimage
              ? { uri: `https://api.reparv.in${user.userimage}` }
              : require('../../../assets/community/user.png')
          }
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.fullname}</Text>

        {/* 2. Stats card */}
        <View style={styles.statsCard}>
          <Stat label="Contact" value={user.contact || '—'} />
          <Divider />
          <Stat label="City" value={user.city || '—'} />
          <Divider />
          <Stat label="Posts" value={post.length.toString()} />
        </View>
      </View>

      {/* 3. Posts Heading */}
      <Text style={styles.postsHeading}>Posts</Text>

      {/* 4. Loader */}
      {loading && <Loader />}

      {/* 5. Posts List */}
      <ScrollView contentContainerStyle={styles.postsWrapper}>
        {post.length ? (
          post.map((p, i) => <UserPostCard key={i.toString()} post={p} />)
        ) : !loading ? (
          <NoPostPlaceholder />
        ) : null}
      </ScrollView>
    </View>
  );
};

export default UserProfile;

/* ────────────────────────────────────────────────
   Helper Components
   ───────────────────────────────────────────── */
const Stat = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.stat}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const Divider = () => <View style={styles.divider} />;

const NoPostPlaceholder = () => (
  <View style={styles.noPostBox}>
    <Svg
      width={44}
      height={44}
      viewBox="0 0 24 24"
      stroke="gray"
      fill="white"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round">
      <Line x1="2" y1="2" x2="22" y2="22" />
      <Path d="M7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16" />
      <Path d="M9.5 4h5L17 7h3a2 2 0 0 1 2 2v7.5" />
      <Path d="M14.121 15.121A3 3 0 1 1 9.88 10.88" />
    </Svg>
    <Text style={styles.noPostText}>No Posts Yet</Text>
  </View>
);

/* ────────────────────────────────────────────────
   Styles
   ───────────────────────────────────────────── */
const GREEN = '#16a34a';
const DARK_GREEN = '#15803d';

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#fff' },

  /* Header */
  profileHeader: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },

  /* Stats card */
  statsCard: {
    flexDirection: 'row',
    marginTop: 12,
    backgroundColor: GREEN,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  stat: { alignItems: 'center', paddingHorizontal: 8 },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#e5ffe9',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: DARK_GREEN,
    marginHorizontal: 4,
  },

  /* Posts heading */
  postsHeading: {
    marginLeft: 16,
    marginTop: 8,
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
  },

  /* Posts list */
  postsWrapper: {
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },

  /* No post placeholder */
  noPostBox: {
    alignItems: 'center',
    marginTop: 40,
    gap: 12,
  },
  noPostText: {
    fontSize: 18,
    color: '#4b5563',
  },
});
