const OperationState = require('./OperationState');

class FilterOperation extends OperationState {
  execute(data, params) {
    try {
      this.validateData(data);
      this.validateParams(params);
      return this.processData(data, params);
    } catch (error) {
      throw new Error(`Filter operation failed: ${error.message}`);
    }
  }

  validateData(data) {
    if (!data || !Array.isArray(data)) {
      throw new Error('Invalid input data structure');
    }
  }

  validateParams(params) {
    if (typeof params !== 'string' || params.trim().length === 0) {
      throw new Error('Invalid filter parameter');
    }
  }

  processData(data, params) {
    const filteredArray = data.map(country => {
      this.validateCountry(country);
      const filteredPeople = this.processPeople(country.people || [], params);
            
      return filteredPeople.length > 0 
        ? { name: country.name, people: filteredPeople }
        : null;
    }).filter(Boolean);

    return filteredArray.length > 0 ? filteredArray : null;
  }

  validateCountry(country) {
    if (!country || typeof country.name !== 'string') {
      throw new Error('Invalid country structure');
    }
  }

  processPeople(people, params) {
    if (!Array.isArray(people)) return [];

    return people.map(person => {
      this.validatePerson(person);
      const filteredAnimals = this.processAnimals(person.animals || [], params);
            
      return filteredAnimals.length > 0
        ? { name: person.name, animals: filteredAnimals }
        : null;
    }).filter(Boolean);
  }

  validatePerson(person) {
    if (!person || typeof person.name !== 'string') {
      throw new Error('Invalid person structure');
    }
  }

  processAnimals(animals, params) {
    if (!Array.isArray(animals)) return [];

    return animals.filter(animal => {
      this.validateAnimal(animal);
      return animal.name.toLowerCase().includes(params.toLowerCase());
    });
  }

  validateAnimal(animal) {
    if (!animal || typeof animal.name !== 'string') {
      throw new Error('Invalid animal structure');
    }
  }
}

module.exports = FilterOperation;