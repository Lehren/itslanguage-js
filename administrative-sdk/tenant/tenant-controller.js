/**
 * Controller class for the Tenant model.
 */
module.exports = class TenantController {
  /**
   * @param connection Object to connect to.
   */
  constructor(connection) {
    this.connection = connection;
  }

  /**
   * Create a tenant.
   *
   * @param {its.Tenant} tenant Object to create.
   * @returns Promise containing the newly created object.
   * @rejects If the server returned an error..
   */
  createTenant(tenant) {
    const url = this.connection.settings.apiUrl + '/tenants';
    const fd = JSON.stringify(tenant);
    return this.connection._secureAjaxPost(url, fd)
      .then(data => {
        // Update the id in case domain model didn't contain one.
        tenant.id = data.id;
        tenant.created = new Date(data.created);
        tenant.updated = new Date(data.updated);
        return tenant;
      });
  }
};