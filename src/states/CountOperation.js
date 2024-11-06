const OperationState = require('./OperationState');

class CountOperation extends OperationState {
  execute(data) {
    try {
      // Store validation methods in the instance
      this.validateData(data);
      return this.processData(data);
    } catch (error) {
      throw new Error(`Count operation failed: ${error.message}`);
    }
  }
    
  validateData(data) {
    if (!data || !Array.isArray(data)) {
      throw new Error('Invalid input data structure');
    }
  }
    
  processData(data) {
    return data.map(country => {
      this.validateCountry(country);
      const people = Array.isArray(country.people) ? country.people : [];
      const mappedPeople = this.processPeople(people);
    
      return {
        name: `${country.name} [${mappedPeople.length}]`,
        people: mappedPeople
      };
    });
  }
    
  validateCountry(country) {
    if (!country || typeof country.name !== 'string') {
      throw new Error('Invalid country structure');
    }
  }
    
  processPeople(people) {
    return people.map(person => {
      this.validatePerson(person);
      const animals = Array.isArray(person.animals) ? person.animals : [];
    
      return {
        name: `${person.name} [${animals.length}]`,
        animals
      };
    });
  }
    
  validatePerson(person) {
    if (!person || typeof person.name !== 'string') {
      throw new Error('Invalid person structure');
    }
  }
}

module.exports = CountOperation;