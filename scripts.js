// Create global array of users
var users = ["freecodecamp", "storbeck", "terakilobyte", "ESL_SC2", "habathcx", "RobotCaleb", "cretetion", "nevercreated5468", "thomasballinger", "dreamleague", "spamfish", "noobs2ninjas", "beohoff", "sheevergaming", "comster404"];

function getData() {
  users.forEach(function(user) {
    function createURL(user, type) {
      return 'https://api.twitch.tv/kraken/' + type + '/' + user + '?callback=?';
    };
    $.getJSON(createURL(user, "streams"), function(response) {
      var streaming;
      var game;
      var message;
      var viewers;
      if (response.status === 404) {
        streaming = "offline";
        game = null;
        message = "Account does not exist";
      } else if (response.status === 422) {
        streaming = "offline";
        game = null;
        message = "Account closed";
      } else if (response.stream === null) {
        streaming = "offline";
        game = null;
        message = "Offline";
      } else if (response.stream !== null) {
        streaming = "online";
        game = response.stream.game;
        message = response.stream.channel.status;
        viewers = response.stream.viewers;
      };
      $.getJSON(createURL(user, "channels"), function(response) {
        var name;
        var img;
        var link;
        if (response.display_name === undefined) {
          name = user;
        } else {
          name = response.display_name;
        }
        if (response.logo === undefined || response.logo === null) {
          img = "img/question.jpg";
        } else {
          img = response.logo;
        }
        if (response.url === undefined) {
          link = '<h3>' + name;
        } else {
          link = '<a target="_blank" href=' + response.url + '><h3>' + name;
        }
        // put it all together and order
        if (streaming === "online") {
          $('#streaming').last().append('<div class="online"><b>' + link + '</h3><img src=' + img + '></a></b><br><b>' + game + '</b><br><i>' + message + '</i></p></div>');
        } else {
          $('#notStreaming').last().append('<div class="offline"><b>' + link + '</h3><img src=' + img + '></a></b><br><i>' + message + '</i></p></div>');
        }
      });
    });
  });
};

$(document).ready(function() {
  getData();
  $("#onlineButton").click(function() {
    $(".online").css('display', 'inherit');
    $(".offline").css('display', 'none');
  });
  $("#offlineButton").click(function() {
    $(".offline").css('display', 'inherit');
    $(".online").css('display', 'none');
  });
  $("#allButton").click(function() {
    $(".offline").css('display', 'inherit');
    $(".online").css('display', 'inherit');
  });
});