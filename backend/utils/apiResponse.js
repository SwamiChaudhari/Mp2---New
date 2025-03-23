class ApiResponse {
  constructor(success, data = null, message = '', pagination = null) {
    this.success = success;
    if (data) this.data = data;
    if (message) this.message = message;
    if (pagination) this.pagination = pagination;
    this.timestamp = new Date().toISOString();
  }

  static success(data, message = '', pagination = null) {
    return new ApiResponse(true, data, message, pagination);
  }

  static error(message, data = null) {
    return new ApiResponse(false, data, message);
  }
}

module.exports = ApiResponse;
