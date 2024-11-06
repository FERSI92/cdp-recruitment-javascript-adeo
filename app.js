const DataProcessor = require('./src');
const data = require('./data');

async function main() {
  try {
    // Check if arguments are provided
    if (process.argv.length <= 2) {
      throw new Error('No arguments provided. Please provide valid arguments.');
    }

    const processor = new DataProcessor();
    const operation = process.argv[2]; // Gets the third argument (e.g., --filter=ry)
        
    // Validate operation format
    if (!operation.startsWith('--filter') && !operation.startsWith('--count')) {
      throw new Error('The operation provided doesn\'t exist. Please provide valid operation (--filter or --count).');
    }

    // Process the operation
    const result = await processor.processOperation(operation, data.data);
        
    // Output the result
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

main();
