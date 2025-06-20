import { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator, StyleSheet, RefreshControl, ListRenderItem } from 'react-native'
import { useListJobsQuery, Job } from '../services/coopleApi'
import { useDispatch, useSelector } from 'react-redux'
import { toggle } from '../features/favourites/favouritesSlice'
import { RootState } from '../store'
import NetInfo from '@react-native-community/netinfo'

const PAGE_SIZE = 30

interface JobListScreenProps {
  navigation: {
    navigate: (screen: string, params: { id: string }) => void
  }
}

export default function JobListScreen({ navigation }: JobListScreenProps) {
  const [page, setPage] = useState(0)
  const [jobs, setJobs] = useState<Job[]>([])
  const [refreshing, setRefreshing] = useState(false)
  const [isOffline, setIsOffline] = useState(false)

  const { data, isLoading, isFetching, error, refetch } = useListJobsQuery({ pageNum: page, pageSize: PAGE_SIZE })
  const favourites = useSelector((state: RootState) => state.favourites.ids)
  const dispatch = useDispatch()

  useEffect(() => {
    if (data?.data?.items) {
      if (page === 0) setJobs(data.data.items)
      else setJobs(prev => [...prev, ...data.data.items])
    }
  }, [data])

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOffline(!state.isConnected)
    })
    return () => unsubscribe()
  }, [])

  // Pull-to-refresh
  const onRefresh = async () => {
    setRefreshing(true)
    setPage(0)
    await refetch()
    setRefreshing(false)
  }

  const renderItem: ListRenderItem<Job> = ({ item }) => {
    const id = item.workAssignmentId
    const fav = favourites.includes(id)
    return (
      <TouchableOpacity onPress={() => navigation.navigate('JobDetails', { id })}>
        <View style={styles.jobCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.jobTitle}>{item.workAssignmentName}</Text>
            <Text style={styles.jobCity}>{item.jobLocation?.city}</Text>
            <Text style={styles.jobWage}>CHF {item.hourlyWage?.amount} / hour</Text>
          </View>
          <TouchableOpacity onPress={() => dispatch(toggle(id))}>
            <Text style={[styles.fav, fav && styles.favActive]}>{fav ? '★' : '☆'}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
  }

  if (isLoading && jobs.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f50057" />
        <Text style={{ marginTop: 16, color: '#888' }}>Loading jobs…</Text>
      </View>
    )
  }

  if (isOffline) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>No Internet Connection</Text>
        <Text style={styles.errorText}>Please check your connection and try again.</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Error loading jobs</Text>
        <Text style={styles.errorText}>{JSON.stringify(error)}</Text>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff0f5' }}>
      <FlatList<Job>
        data={jobs}
        renderItem={renderItem}
        keyExtractor={item => item.workAssignmentId}
        onEndReached={() => setPage(prev => prev + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={isFetching ? <ActivityIndicator style={{ margin: 16 }} /> : null}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#f50057" />
        }
        ListEmptyComponent={
          !isLoading ? (
            <View style={styles.center}>
              <Text style={styles.emptyText}>No jobs found</Text>
            </View>
          ) : null
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff0f5',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c00',
    marginBottom: 8,
  },
  errorText: {
    color: '#c00',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
  list: {
    padding: 8,
  },
  jobCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    shadowColor: '#f50057',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  jobTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#22223b',
  },
  jobCity: {
    fontSize: 15,
    color: '#666',
    marginBottom: 4,
  },
  jobWage: {
    fontSize: 15,
    color: '#f50057',
    fontWeight: 'bold',
  },
  fav: {
    fontSize: 28,
    marginLeft: 16,
    color: '#ccc',
  },
  favActive: {
    color: '#f50057',
    textShadowColor: '#fff0f5',
    textShadowRadius: 4,
  },
})
