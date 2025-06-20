import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { EndpointBuilder } from '@reduxjs/toolkit/query'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'

export interface Job {
  workAssignmentId: string;
  waReadableId: string;
  hourlyWage: { amount: number; currencyId: number };
  salary: { amount: number; currencyId: number };
  jobSkill: { jobProfileId: number; educationalLevelId: number };
  workAssignmentName: string;
  jobLocation: { addressStreet: string; extraAddress: string; zip: string; city: string; state: string; countryId: number };
  requirements?: string;
  periodFrom: number;
  periodTo: number;
  datePublished: number;
  branchLink?: string;
}

export interface JobsListResponse {
  status: number;
  data: { items: Job[] };
}

export interface JobResponse {
  status: number;
  data: Job;
}

export const coopleApi = createApi({
  reducerPath: 'coopleApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.coople.com/ch/resources/api/work-assignments/public-jobs' }),
  endpoints: (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
    listJobs: builder.query<JobsListResponse, { pageNum: number; pageSize: number }>({
      query: ({ pageNum, pageSize }: { pageNum: number; pageSize: number }) => 
        `list?pageNum=${pageNum}&pageSize=${pageSize}`    }),
    getJob: builder.query<JobResponse, string>({
      query: (id: string) => id
    })
  })
})

export const { useListJobsQuery, useGetJobQuery } = coopleApi
