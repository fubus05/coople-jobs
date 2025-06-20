import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Job } from '../services/coopleApi';

interface JobCardProps {
  job: Job;
  isFavourite: boolean;
  onPress: () => void;
  onToggleFavourite: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, isFavourite, onPress, onToggleFavourite }) => (
  <TouchableOpacity onPress={onPress} style={styles.card} activeOpacity={0.9}>
    <View style={{ flex: 1 }}>
      <Text style={styles.title}>{job.workAssignmentName}</Text>
      <Text style={styles.city}>{job.jobLocation?.city}</Text>
      <Text style={styles.wage}>
        CHF <Text style={styles.wageAmount}>{job.hourlyWage?.amount}</Text>
        <Text style={styles.perHour}> / hour</Text>
      </Text>
    </View>
    <TouchableOpacity onPress={onToggleFavourite} style={styles.favBtn}>
      <Ionicons
        name={isFavourite ? 'star' : 'star-outline'}
        size={28}
        color={isFavourite ? '#f50057' : '#ccc'}
      />
    </TouchableOpacity>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#f50057',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#22223b',
    marginBottom: 6,
  },
  city: {
    fontSize: 15,
    color: '#666',
    marginBottom: 6,
  },
  wage: {
    fontSize: 16,
    color: '#f50057',
    fontWeight: 'bold',
  },
  wageAmount: {
    color: '#f50057',
    fontWeight: 'bold',
  },
  perHour: {
    color: '#888',
    fontWeight: 'normal',
  },
  favBtn: {
    marginLeft: 18,
    padding: 4,
  },
});
