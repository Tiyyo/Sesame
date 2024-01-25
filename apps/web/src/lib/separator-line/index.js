"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var css_1 = require("../../../styled-system/css");
/* style */
var container = (0, css_1.css)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    py: '0.5rem',
});
var line = (0, css_1.css)({
    display: 'flex',
    border: '1px solid',
    borderColor: 'grey-light',
    opacity: '10',
    flexBasis: '40%',
});
var words = (0, css_1.css)({
    font: 'light',
    fontSize: 'xs',
    fontWeight: '400',
    color: 'grey',
});
/* style */
function SeparatorLine(_a) {
    var separatorWords = _a.separatorWords;
    return (<div className={container}>
      <div className={line}></div>
      <p className={words}>{separatorWords}</p>
      <div className={line}></div>
    </div>);
}
exports.default = SeparatorLine;
