const path = require('path');
const fs = require('fs');
const Handlebars = require('handlebars');

const DIR = {
  controller: './../src/controllers',
  model: './../src/models',
  route: './../src/routes',
  middleware: './../src/middlewares',
};

function createFromStub(config) {
  let {name, type, options = {}, timestamps = true} = config;
  let fileLocation = path.join(__dirname, `${DIR[type]}/${name}.${type}.js`);
  const stub = path.join(__dirname, `./template/crud-${type}.nodejs.stub`);

  switch (type) {
    case 'controller':
      options = {
        name,
        model: name.charAt(0).toUpperCase() + name.slice(1),
        ...options,
      };
      break;
    case 'model':
      options = {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        schema: `${name}Schema`,
        timestamps: timestamps ? ', { timestamps: true } ' : '',
        ...options,
      };
      break;
    case 'route':
      options = {
        name,
        ...options,
      };
      break;
    case 'middleware':
      options = {
        name,
        ...options,
      };
      break;
  }

  /** check if controller exist */
  const isExists = fs.existsSync(fileLocation);
  if (isExists) {
    console.log(`${type} with name ${name} is exists!`);
    return;
  }

  /** create controller */
  const source = fs.readFileSync(stub, 'utf8');
  const template = Handlebars.compile(source);
  const contents = template(options);

  fs.writeFile(fileLocation, contents, err => {
    if (err)
      console.log(`Cannot create ${type} file`);

    console.log(`Create ${type} success`);
  });
}

exports.crud = [
  'crud',
  'Crud stub',
  {
    name: {
      describe: 'Crud name',
      alias: 'n'
    },
  },
  function(data) {
    const [, name = data.name] = data._;

    if (!name) {
      console.error('Missing name parameter. Typing --help for description.');
    }

    createFromStub({
      name,
      type: 'controller',
    });

    createFromStub({
      name,
      type: 'model',
    });

    createFromStub({
      name,
      type: 'route',
    });

    createFromStub({
      name: `${name}-create`,
      type: 'middleware',
      options: {
        name
      }
    });

    createFromStub({
      name: `${name}-update`,
      type: 'middleware',
      options: {
        name
      }
    });
  },
];

exports.controller = [
  'controller',
  'Create crud controller',
  {
    name: {
      describe: 'Controller name',
      alias: 'n'
    },
  },
  function(data) {
    const [, name = data.name] = data._;

    if (!name) {
      console.error('Missing name parameter. Typing --help for description.');
    }

    createFromStub({
      name,
      type: 'controller',
    });
  },
];

exports.model = [
  'model',
  'Create crud model',
  {
    name: {
      describe: 'Model name',
      alias: 'n',
    },
  },
  function(data) {
    const [, name = data.name] = data._;

    if (!name) {
      console.error('Missing name parameter. Typing --help for description.');
    }

    createFromStub({
      name,
      type: 'model',
    });
  },
];

exports.middleware = [
  'middleware',
  'Create crud middleware',
  {
    name: {
      describe: 'Middleware name',
      alias: 'n',
    },
  },
  function(data) {
    const [, name = data.name] = data._;

    if (!name) {
      console.error('Missing name parameter. Typing --help for description.');
    }

    createFromStub({
      name,
      type: 'middleware'
    });
  },
];

exports.route = [
  'route',
  'Create crud route',
  {
    name: {
      describe: 'Route name',
      alias: 'n',
    },
  },
  function(data) {
    const [, name = data.name] = data._;

    if (!name) {
      console.error('Missing name parameter. Typing --help for description.');
    }

    createFromStub({
      name,
      type: 'route',
    });
  },
];
