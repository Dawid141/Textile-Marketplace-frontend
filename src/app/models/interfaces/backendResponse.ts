export interface BackendResponse {
  message: string,
  status: string,
  data: any // TODO consider the use of T generic in place of any
}
