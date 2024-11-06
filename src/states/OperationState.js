class OperationState {
  execute() {
    throw new Error('execute() must be implemented by concrete states');
  }
}

module.exports = OperationState;