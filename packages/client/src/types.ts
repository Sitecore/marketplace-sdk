import { CoreSDKConfig } from '@sitecore-marketplace-sdk/core';
import {
  MutationKey,
  MutationMap,
  NavbarItemsProps,
  QueryKey,
  QueryMap,
  SDKModule,
} from './sdk-types';

export type QueryStatus = 'idle' | 'loading' | 'error' | 'success';

export interface BaseQueryOptions<TData = unknown, TError extends Error = Error, TParams = {}> {
  /** Whether to subscribe to updates for this query */
  subscribe?: boolean;
  /** Called when the query successfully completes */
  onSuccess?: (data: TData) => void;
  /** Called when the query encounters an error */
  onError?: (error: TError) => void;
  /** Additional parameters for the query; always includes headers, query and body */
  params?: TParams;
  /** Custom timeout in milliseconds */
  timeoutMs?: number;
}

export interface QueryOptions<K extends QueryKey>
  extends BaseQueryOptions<QueryMap[K]['response'], Error, QueryMap[K]['params']> {}

export interface BaseQueryResult<TData = unknown, TError extends Error = Error> {
  /** The current data value */
  data: TData | undefined;
  /** The current error if any */
  error: TError | undefined;
  /** The current status of the query */
  status: QueryStatus;
  /** Whether the query is currently loading */
  isLoading: boolean;
  /** Whether the query has errored */
  isError: boolean;
  /** Whether the query was successful */
  isSuccess: boolean;
  /** Function to manually trigger a refetch */
  refetch: () => Promise<BaseQueryResult<TData, TError>>;
  /** Function to unsubscribe if subscribed */
  unsubscribe?: () => void;
}

export interface QueryResult<K extends QueryKey>
  extends BaseQueryResult<QueryMap[K]['response'], Error> {}

export interface StateQueryResult<TData = unknown, TError extends Error = Error>
  extends BaseQueryResult<TData, TError> {}

export interface BaseMutationOptions<TData = unknown, TError extends Error = Error, TParams = {}> {
  /** Called when the mutation successfully completes */
  onSuccess?: (data: TData) => void;
  /** Called when the mutation encounters an error */
  onError?: (error: TError) => void;
  /** Additional parameters for the mutation */
  params?: TParams;
  /** Custom timeout in milliseconds */
  timeoutMs?: number;
}

export interface MutationOptions<K extends MutationKey>
  extends BaseMutationOptions<MutationMap[K]['response'], Error, MutationMap[K]['params']> {}

/**
 * ClientSDKConfig is the configuration used by the Client SDK.
 * Instead of exposing a CoreSDK instance, users should provide the
 * configuration needed to initialize CoreSDK internally.
 */
export interface ClientSDKConfig extends CoreSDKConfig {
  /** The origin of the remote endpoint (e.g. client for the host, or host for the client) */
  targetOrigin?: string;
  /** Our own origin – this defaults to the value of window.location.origin */
  selfOrigin: string;
  /** Events that the SDK can listen for */
  events?: {
    onRouteUpdate?: (route: string) => void;
    onPageContextUpdate?: (data: any) => void;
    onPageContentLayoutUpdate?: (data: any) => void;
    onPageContentFieldsUpdate?: (data: any) => void;
  };
  navbarItems?: NavbarItemsProps;
}

export type ClientSDKInitConfig = {
  origin?: string;
  target: Window;
  timeout?: number;
  modules?: SDKModule[];
  events?: ClientSDKConfig['events'];
  navbarItems?: NavbarItemsProps;
};

export { UserInfo, ApplicationContext } from '@sitecore-marketplace-sdk/core';
