const EventEmitter = require('events');
const FilterOperation = require('./states/FilterOperation');
const CountOperation = require('./states/CountOperation');

class OperationContext extends EventEmitter {
  constructor() {
    super();
    this.operations = new Map([
      ['--filter', new FilterOperation()],
      ['--count', new CountOperation()]
    ]);

    this.on('operationError', (error) => {
      console.error('Operation failed:', error.message);
    });
  }

  /**
     * 
     * @param {string} operation - The operation to be performed on the data.
     * @param {array} data - The array of countries => people => animals.
     * @returns {promise} - A promise that resolves to the result of the operation.
     */
  async executeOperation(operation, data) {
    try {
      const [operationType, params] = require('./utils').extractOperation(operation);
      const operationState = this.operations.get(operationType);

      if (!operationState) {
        throw new Error('The operation provided doesn\'t exist. Please provide valid operation.');
      }

      const result = await operationState.execute(data, params);
      this.emit('operationComplete', result);
      return result;
    } catch (error) {
      this.emit('operationError', error);
      throw error;
    }
  }
}

module.exports = OperationContext;