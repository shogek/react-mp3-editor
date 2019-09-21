export default {
  // The color of the cursor.
  color: 'white',
  // Hide the cursor when the mouse leaves the waveform.
  hideOnBlur: true,
  // The width of the cursor.
  width: '2px',
  // 	Show the time on the cursor.
  showTime: true,
  // The opacity of the cursor.
  opacity: '1',
  // An object with custom styles which are applied to the cursor time element.
  customShowTimeStyle: {
    opacity: 1,
    'margin-left': '5px',
    'padding': '1px 7px 3px 7px',
    'border-radius': '0.2em',
    'background-color': 'white',
  },
  // An object with custom styles which are applied to the cursor element.
  customStyle: {
    // The cursor doesn't center to the mouse so we shift it.
    'margin-left': '13.5px',
  },
};