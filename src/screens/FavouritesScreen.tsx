import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Job, JobsListResponse } from '../services/coopleApi';
import { JobCard } from '../components/JobCard';
import { toggle } from '../features/favourites/favouritesSlice';

interface FavouritesScreenProps {
  navigation: {
    navigate: (screen: string, params: { id: string }) => void;
  };
}

interface QueryCache {
  data?: JobsListResponse;
  status?: string;
}

interface ApiState {
  queries?: Record<string, QueryCache>;
}

export default function FavouritesScreen({ navigation }: FavouritesScreenProps) {
  const favourites = useSelector((state: RootState) => state.favourites.ids);
  const allJobsCache = useSelector(
    (state: RootState) => (state['coopleApi'] as ApiState)?.queries || {}
  );
  const dispatch = useDispatch();

  const jobsMap = new Map<string, Job>();
  Object.values(allJobsCache).forEach((query: QueryCache) => {
    if (query?.data?.data?.items) {
      query.data.data.items.forEach((job: Job) => {
        if (favourites.includes(job.workAssignmentId)) {
          jobsMap.set(job.workAssignmentId, job);
        }
      });
    }
  });
  const jobs = Array.from(jobsMap.values());

  const renderItem = ({ item }: { item: Job }) => (
    <JobCard
      job={item}
      isFavourite={favourites.includes(item.workAssignmentId)}
      onPress={() => navigation.navigate('JobDetails', { id: item.workAssignmentId })}
      onToggleFavourite={() => dispatch(toggle(item.workAssignmentId))}
    />
  );

  if (!jobs.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No favourite jobs yet</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff0f5' }}>
      <FlatList
        data={jobs}
        renderItem={renderItem}
        keyExtractor={item => item.workAssignmentId}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff0f5',
  },
  emptyText: {
    fontSize: 18, color: '#888',
  },
  list: {
    padding: 8,
  },
});
