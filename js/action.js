var callback = function(buttonIndex) {
    setTimeout(function() {
      // like other Cordova plugins (prompt, confirm) the buttonIndex is 1-based (first button is index 1) 
      alert('button index clicked: ' + buttonIndex);
    });
  };
 
  function testShareSheet() {
    var options = {
        'androidTheme': window.plugins.actionsheet.ANDROID_THEMES.THEME_HOLO_LIGHT, // default is THEME_TRADITIONAL 
        'title': 'What do you want with this image?',
        'buttonLabels': ['Share via Facebook', 'Share via Twitter'],
        'androidEnableCancelButton' : true, // default false 
        'winphoneEnableCancelButton' : true, // default false 
        'addCancelButtonWithLabel': 'Cancel',
        'addDestructiveButtonWithLabel' : 'Delete it',
        'position': [20, 40] // for iPad pass in the [x, y] position of the popover 
    };
    // Depending on the buttonIndex, you can now call shareViaFacebook or shareViaTwitter 
    // of the SocialSharing plugin (https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin) 
    window.plugins.actionsheet.show(options, callback);
  };
 
  function testDeleteSheet() {
    var options = {
        'addCancelButtonWithLabel': 'Cancel',
        'addDestructiveButtonWithLabel' : 'Delete note'
    };
    window.plugins.actionsheet.show(options, callback);
  };
 
  function testLogoutSheet() {
    var options = {
        'buttonLabels': ['Log out'],
        'androidEnableCancelButton' : true, // default false 
        'winphoneEnableCancelButton' : true, // default false 
        'addCancelButtonWithLabel': 'Cancel'
    };
    window.plugins.actionsheet.show(options, callback);
  };