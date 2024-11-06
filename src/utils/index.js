const extractOperation = (operation) => {
  if (!operation || typeof operation !== 'string') {
    throw new Error('Invalid operation format');
  }

  // Handle both formats: "--filter=ry" and "--filter ry"
  if (operation.includes('=')) {
    const [operationType, pattern] = operation.split('=');
    return [operationType, pattern];
  }
    
  const [operationType, ...params] = operation.split(' ');
  return [operationType, params.join(' ')];
};

module.exports = {
  extractOperation
};