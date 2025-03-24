/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface User {
  /** @format int64 */
  userId?: number;
  username: string;
  /** @format email */
  email: string;
  passwordHash: string;
}

export interface UserUpdate {
  /** @format int64 */
  userId: number;
  username: string;
  /** @format email */
  email: string;
  passwordHash: string;
}

export interface UserPatch {
  /** @format int64 */
  userId?: number;
  username?: string;
  /** @format email */
  email?: string;
  passwordHash?: string;
}

export enum TaskStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface Task {
  /** @format int64 */
  taskId?: number;
  /** @format int64 */
  userId?: number;
  title: string;
  description?: string;
  status?: TaskStatus;
  /** @format date */
  date: string;
  /** @format time */
  time?: string;
  tags: TagReference[];
}

export interface TaskUpdate {
  /** @format int64 */
  taskId: number;
  title: string;
  description?: string;
  status?: TaskStatus;
  /** @format date */
  date: string;
  /** @format time */
  time?: string;
  tags: TagReference[];
}

export interface TaskPatch {
  /** @format int64 */
  taskId?: number;
  title?: string;
  description?: string;
  status?: TaskStatus;
  /** @format date */
  date?: string;
  /** @format time */
  time?: string;
  tags?: TagReference[];
}

export interface TaskRequest {
  title: string;
  description?: string;
  status?: TaskStatus;
  /** @format date */
  date: string;
  /** @format time */
  time?: string;
  tags?: TagReference[];
}

export interface TagReference {
  /** @format int64 */
  taskId?: number;
  /** @format int64 */
  tagId: number;
}

export type TagTask = Task[];

export interface Tag {
  /** @format int64 */
  id: number;
  name: string;
}

export interface TagUpdate {
  /** @format int64 */
  id: number;
  name: string;
}

export interface TagPatch {
  /** @format int64 */
  id?: number;
  name?: string;
}

export interface TagRequest {
  name: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://localhost:8080/todo";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title ToDo Application API
 * @version 1.0.0
 * @baseUrl http://localhost:8080/todo
 *
 * API for managing users, tasks, and tags in a ToDo application
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  users = {
    /**
     * No description
     *
     * @name UsersList
     * @summary Get all users
     * @request GET:/users
     */
    usersList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/users`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersCreate
     * @summary Create a new user
     * @request POST:/users
     */
    usersCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/users`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersDetail
     * @summary Get a user by ID
     * @request GET:/users/{userId}
     */
    usersDetail: (userId: number, params: RequestParams = {}) =>
      this.request<User, void>({
        path: `/users/${userId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersUpdate
     * @summary Update a user
     * @request PUT:/users/{userId}
     */
    usersUpdate: (userId: number, data: UserUpdate, params: RequestParams = {}) =>
      this.request<User, void>({
        path: `/users/${userId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersPartialUpdate
     * @summary Partial Update a user
     * @request PATCH:/users/{userId}
     */
    usersPartialUpdate: (userId: number, data: UserPatch, params: RequestParams = {}) =>
      this.request<User, void>({
        path: `/users/${userId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name UsersDelete
     * @summary Delete a user
     * @request DELETE:/users/{userId}
     */
    usersDelete: (userId: number, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/${userId}`,
        method: "DELETE",
        ...params,
      }),
  };
  userId = {
    /**
     * No description
     *
     * @name TasksDetail
     * @summary Get all tasks
     * @request GET:/{userId}/tasks
     */
    tasksDetail: (
      userId: string,
      query?: {
        filter?:
          | "TODAY_TODO"
          | "TOMORROW_TODO"
          | "CURRENT_WEEK_TODO"
          | "LAST_WEEK_TODO"
          | "NEXT_WEEK_TODO"
          | "LAST_MONTH"
          | "CURRENT_MONTH"
          | "NEXT_MONTH";
      },
      params: RequestParams = {},
    ) =>
      this.request<TagTask, any>({
        path: `/${userId}/tasks`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name TasksCreate
     * @summary Create a new task
     * @request POST:/{userId}/tasks
     */
    tasksCreate: (userId: string, data: TaskRequest, params: RequestParams = {}) =>
      this.request<Task, any>({
        path: `/${userId}/tasks`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name TasksDetail2
     * @summary Get a task by ID
     * @request GET:/{userId}/tasks/{taskId}
     * @originalName tasksDetail
     * @duplicate
     */
    tasksDetail2: (taskId: number, userId: string, params: RequestParams = {}) =>
      this.request<Task, void>({
        path: `/${userId}/tasks/${taskId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name TasksUpdate
     * @summary Update a task
     * @request PUT:/{userId}/tasks/{taskId}
     */
    tasksUpdate: (taskId: number, userId: string, data: TaskUpdate, params: RequestParams = {}) =>
      this.request<Task, void>({
        path: `/${userId}/tasks/${taskId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name TasksPartialUpdate
     * @summary Partial Update a task
     * @request PATCH:/{userId}/tasks/{taskId}
     */
    tasksPartialUpdate: (taskId: number, userId: string, data: TaskPatch, params: RequestParams = {}) =>
      this.request<Task, void>({
        path: `/${userId}/tasks/${taskId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name TasksDelete
     * @summary Delete a task
     * @request DELETE:/{userId}/tasks/{taskId}
     */
    tasksDelete: (taskId: number, userId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/${userId}/tasks/${taskId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @name TagsDetail
     * @summary Get all tags
     * @request GET:/{userId}/tags
     */
    tagsDetail: (userId: string, params: RequestParams = {}) =>
      this.request<Tag[], any>({
        path: `/${userId}/tags`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name TagsCreate
     * @summary Create a new tag
     * @request POST:/{userId}/tags
     */
    tagsCreate: (userId: string, data: TagRequest, params: RequestParams = {}) =>
      this.request<Tag, any>({
        path: `/${userId}/tags`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name TagsDetail2
     * @summary Get a tag by ID
     * @request GET:/{userId}/tags/{tagId}
     * @originalName tagsDetail
     * @duplicate
     */
    tagsDetail2: (tagId: number, userId: string, params: RequestParams = {}) =>
      this.request<Tag, void>({
        path: `/${userId}/tags/${tagId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name TagsUpdate
     * @summary Update a tag
     * @request PUT:/{userId}/tags/{tagId}
     */
    tagsUpdate: (tagId: number, userId: string, data: TagUpdate, params: RequestParams = {}) =>
      this.request<Tag, void>({
        path: `/${userId}/tags/${tagId}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name TagsPartialUpdate
     * @summary Partial Update a tag
     * @request PATCH:/{userId}/tags/{tagId}
     */
    tagsPartialUpdate: (tagId: number, userId: string, data: TagPatch, params: RequestParams = {}) =>
      this.request<Tag, void>({
        path: `/${userId}/tags/${tagId}`,
        method: "PATCH",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name TagsDelete
     * @summary Delete a tag
     * @request DELETE:/{userId}/tags/{tagId}
     */
    tagsDelete: (tagId: number, userId: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/${userId}/tags/${tagId}`,
        method: "DELETE",
        ...params,
      }),

    /**
     * No description
     *
     * @name TasksDetail3
     * @summary Get tasks by tagId
     * @request GET:/{userId}/tags/{tagId}/tasks
     * @originalName tasksDetail
     * @duplicate
     */
    tasksDetail3: (userId: number, tagId: number, params: RequestParams = {}) =>
      this.request<TagTask, void>({
        path: `/${userId}/tags/${tagId}/tasks`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
