var trimStart = require('lodash.trimstart');
var trimEnd = require('lodash.trimend');
var toArray = require('lodash.toarray');

var protocolRelativeUrlRe = /^\/\/.*\..*\//;

module.exports.slashJoin = function() {
  var items = toArray(arguments);
  for (var i = 0; i < items.length; i++) {
    // Trim off any leading slashes
    if (i > 0) {
      items[i] = trimStart(items[i], '/');
    }

    // If not the last item and the rightmost character is a slash
    if (i < items.length - 1) {
      items[i] = trimEnd(items[i], '/');
    }
  }

  return items.join('/');
};

module.exports.stripExtraLeadingSlash = function(pathAttr) {
  // If there is a leading double slash, detect if this is a valid
  // non-protocol path like //fonts.google.com/ or a rogue double-slash like
  // //oops/image.jpg. If there is no '.' between the leading double slash
  // and the next slash, then strip off the first slash.
  if (pathAttr.substr(0, 2) !== '//') return pathAttr;

  // Detect if this is a valid protocol relative absolute URL like //fonts.google.com/
  if (protocolRelativeUrlRe.test(pathAttr)) return pathAttr;

  return pathAttr.substr(1);
};
