Apps = new Meteor.Collection("apps");

Template.apps.apps = function() {
  return Apps.find({},{sort:{'submittedOn':-1}});
};

Template.apps.events({
  'submit #new_app': function(event) {
    event.preventDefault();
    var appName = document.getElementById("new_app_name").value;
    var appUrl = document.getElementById("new_app_url").value;

    appUrl.search(/https:\/\/itunes.apple.com\/us\/app/);

    Meteor.call("addApp",appName,appUrl
      // ,function(error,appId){
      // console.log('added app with Id..'+appId);}
      );
    document.getElementById("new_app_name").value ="";
    document.getElementById("new_app_url").value ="";
  },

  'click .remove':function(event) {
    event.preventDefault();
    Meteor.call("removeApp",this._id);
  },

  'click .approve':function(event) {
    event.preventDefault();
    Meteor.call("approveApp",this._id);
  },

  'click .reject':function(event) {
    event.preventDefault();
    Meteor.call("rejectApp",this._id);
  }
});

// Template.app.rendered = function(){
//   $('.approved').tooltip(); //initialize all tooltips in this template
// };

Template.apps.helpers({
  submitter : function(app){
    submitter = Meteor.user.findOne({"_id" : app.submittedBy});
    return submitter.name;
  }
});

Template.nav.events({
    'click .createAdmin':function(event) {
    event.preventDefault();
    Meteor.call("createAdmin",Meteor.user());
  }
});

// Template.nav.helpers({
//   adminExists : function(){
//     if (Meteor.users.count({roles: "admin"}) < 1){
//       return false;
//     }
//     else {
//       return true;
//     }
//   }
// });
