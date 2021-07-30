import { Button } from '@material-ui/core';
import React, { useState } from 'react';

const options = [
  {
    header: {
      name: 'Account',
    },
    values: [
      {
        name: 'Profile',
        description:
          'Your email adress is your identity on this app and is used to log in.',
      },
      {
        name: 'Profile',
        description:
          'Your email adress is your identity on this app and is used to log in.',
      },
    ],
  },
  {
    header: {
      name: 'Applications',
    },
    values: [
      {
        name: 'Profile',
        description:
          'Your email adress is your identity on this app and is used to log in.',
      },
      {
        name: 'Profile',
        description:
          'Your email adress is your identity on this app and is used to log in.',
      },
    ],
  },
  {
    header: {
      name: 'Billing',
    },
    values: [
      {
        name: 'Profile',
        description:
          'Your email adress is your identity on this app and is used to log in.',
      },
      {
        name: 'Profile',
        description:
          'Your email adress is your identity on this app and is used to log in.',
      },
    ],
  },
  {
    header: {
      name: 'Support',
    },
    values: [
      {
        name: 'Profile',
        description:
          'Your email adress is your identity on this app and is used to log in.',
      },
      {
        name: 'Profile',
        description:
          'Your email adress is your identity on this app and is used to log in.',
      },
    ],
  },
];

const AppSettings = () => {
  const [visibleOptions, setVisibleOptions] = useState(options);

  const onChange = (e) => {
    e.preventDefault();
    const value = e.target.value;

    if (value.trim().lenght === 0) {
      setVisibleOptions(options);
      return;
    }

    const returnedItems = [];

    visibleOptions.forEach((option, index) => {
      const foundOptions = option.values.filter((item) => {
        return (
          item.name.toLocaleLowerCase().search(value.trim().toLowerCase()) !==
            -1 ||
          item.description
            .toLocaleLowerCase()
            .search(value.trim().toLowerCase()) !== -1
        );
      });

      returnedItems[index] = {
        header: {
          name: option.header.name,
        },
        values: foundOptions,
      };

      if (
        option.header.name
          .toLocaleLowerCase()
          .search(value.trim().toLowerCase()) !== -1
      ) {
        returnedItems[index] = {
          header: {
            name: option.header.name,
          },
          values: options[index].values,
        };
      }
    });

    setVisibleOptions(returnedItems);
  };

  return (
    <div className="App">
      <div className="container my-5">
        <h1>
          <span>
            <Button className="btn btn-secondary">
              {' '}
              <span>&lt;</span> Back{' '}
            </Button>{' '}
          </span>
          Settings
        </h1>

        <input
          type="text"
          className="form-control mt-5"
          onChange={onChange}
          placeholder="Search..."
        />

        <div>
          {visibleOptions.map((option) => (
            <div key={option.header.name} className="mt-5 mt-2">
              <h3>{option.header.name}</h3>
              <div>
                {option.values.map((value) => (
                  <div key={value.name}>
                    <ul className="list-group">
                      <li className="list-group-item mb-2">
                        <h6 className="font-weight-bold">{value.name}</h6>
                        <h6>{value.description}</h6>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppSettings;
