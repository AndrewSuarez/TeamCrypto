var UserProfile = (() => {
  var username = '';
  var name = '';
  var lastName = '';
  var email = '';
  var password = '';

  var getUsername = function () {
    return username;
  };

  var setUsername = function (uname) {
    username = uname;
  };
  var getName = function () {
    return name;
  };

  var setName = function (userName) {
    name = userName;
  };
  var getLastName = function () {
    return lastName;
  };

  var setLastName = function (userLastName) {
    lastName = userLastName;
  };
  var getEmail = function () {
    return email;
  };

  var setEmail = function (mail) {
    email = mail;
  };
  var getPassword = function () {
    return password;
  };

  var setPassword = function (pass) {
    password = pass;
  };

  return {
    getUsername: getUsername,
    setUsername: setUsername,
    getName: getName,
    setName: setName,
    getLastName: getLastName,
    setLastName: setLastName,
    getEmail: getEmail,
    setEmail: setEmail,
    getPassword: getPassword,
    setPassword: setPassword,
  };
})();

export default UserProfile;
