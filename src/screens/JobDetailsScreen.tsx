import React from 'react'
import { ScrollView, Text, ActivityIndicator, View, StyleSheet, Linking, TouchableOpacity } from 'react-native'
import { useGetJobQuery } from '../services/coopleApi'
import { StackScreenProps } from '@react-navigation/stack'

type RootStackParamList = {
  MainTabs: undefined;
  JobDetails: { id: string };
};

type Props = StackScreenProps<RootStackParamList, 'JobDetails'>;

function formatDate(timestamp: number): string {
  const ts = timestamp > 1e12 ? Math.floor(timestamp / 1000) : timestamp;
  const date = new Date(ts * 1000);
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

const JobDetailsScreen = ({ route, navigation }: Props) => {
  const { id } = route.params
  const { data, isLoading, error } = useGetJobQuery(id)

  if (isLoading) return <ActivityIndicator style={{ marginTop: 40 }} color="#f50057" />
  if (error) return <Text style={styles.error}>Failed to load job details: {JSON.stringify(error)}</Text>
  if (!data?.data) return <Text style={styles.error}>No job data found</Text>

  const job = data.data

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{job.workAssignmentName}</Text>
        <Text style={styles.label}>City: <Text style={styles.value}>{job.jobLocation?.city || '—'}</Text></Text>
        <Text style={styles.label}>Wage: <Text style={styles.salary}>{job.hourlyWage?.amount} CHF/hour</Text></Text>
        <Text style={styles.label}>Requirements:</Text>
        <Text style={styles.value}>{job.requirements || '—'}</Text>
        <Text style={styles.label}>Period:</Text>
        <Text style={styles.value}>{formatDate(job.periodFrom)} — {formatDate(job.periodTo)}</Text>
        {job.branchLink && (
          <TouchableOpacity onPress={() => job.branchLink && Linking.openURL(job.branchLink)}>
            <Text style={styles.link}>More about this job</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  )
}

export default JobDetailsScreen

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff0f5',
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#f50057',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#22223b',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
    color: '#22223b',
  },
  value: {
    fontWeight: 'normal',
    color: '#333',
  },
  salary: {
    color: '#f50057',
    fontWeight: 'bold',
  },
  link: {
    marginTop: 18,
    color: '#f50057',
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  error: {
    color: '#c00',
    margin: 20,
    textAlign: 'center',
  },
})
