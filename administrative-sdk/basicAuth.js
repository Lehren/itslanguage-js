/* eslint-disable
 callback-return,
 camelcase,
 func-style,
 handle-callback-err,
 max-len,
 no-unused-vars
 */
class BasicAuth {
  /**
   * BasicAuth domain model.
   *
   * @constructor
   * @param {string} tenantId The tenant identifier to create this BasicAuth for.
   * @param {string} [principal] The principal. If none is given, one is generated.
   * @param {string} [credentials] The credentials. If none is given, one is generated.
   */
  constructor(tenantId, principal, credentials) {
    if (typeof tenantId !== 'string') {
      throw new Error(
        'tenantId parameter of type "string" is required');
    }
    this.tenantId = tenantId;
    if (typeof principal !== 'string' &&
      principal !== null &&
      principal !== undefined) {
      throw new Error(
        'principal parameter of type "string|null|undefined" is required');
    }
    this.principal = principal;
    if (typeof credentials !== 'string' &&
      credentials !== null &&
      credentials !== undefined) {
      throw new Error(
        'credentials parameter of type "string|null|undefined" is required');
    }
    this.credentials = credentials;
  }

  /**
   * Create a basic auth.
   *
   * @param {Connection} connection Object to connect to.
   * @returns {Promise} Promise containing this.
   * @rejects If the server returned an error.
   */
  createBasicAuth(connection) {
    var url = connection.settings.apiUrl + '/basicauths';
    var formData = JSON.stringify(this);
    return connection._secureAjaxPost(url, formData)
      .then(data => {
        this.principal = data.principal;
        this.created = new Date(data.created);
        this.updated = new Date(data.updated);
        // Credentials are only supplied when generated by the backend.
        if (data.credentials) {
          this.credentials = data.credentials;
        }
        return this;
      });
  }
}

module.exports = {
  BasicAuth: BasicAuth
};
