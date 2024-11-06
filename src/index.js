const OperationContext = require('./OperationContext');

class DataProcessor {
  constructor() {
    this.context = new OperationContext();
  }
  /**
 * @param {string} operation - The operation to be performed on the data.
 * @param {array} data - The array of countries => people => animals.
 * @returns {promise} - A promise that resolves to the result of the operation.
 */
  async processOperation(operation, data) {
    try {
      return await this.context.executeOperation(operation, data);
    } catch (error) {
      console.error('Processing failed:', error.message);
      throw error;
    }
  }
}

module.exports = DataProcessor;