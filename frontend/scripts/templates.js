this["Tmpl"] = this["Tmpl"] || {};
this["Tmpl"]["navigation"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "  <div class=\"header-user\">\n  <a href=\"/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.T : depth0)) != null ? stack1.locale : stack1), depth0))
    + "/\" class=\"button--secondary js-logout\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.T : depth0)) != null ? stack1.nav : stack1)) != null ? stack1.logout : stack1), depth0))
    + "</a>\n  <ul>\n    <li><a href=\"/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.T : depth0)) != null ? stack1.locale : stack1), depth0))
    + "/\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.T : depth0)) != null ? stack1.nav : stack1)) != null ? stack1.search : stack1), depth0))
    + "</a></li>\n    <li><a href=\"/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.T : depth0)) != null ? stack1.locale : stack1), depth0))
    + "/trips.html\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.T : depth0)) != null ? stack1.nav : stack1)) != null ? stack1.mytrips : stack1), depth0))
    + "</a></li>\n    <li><a href=\"/"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.T : depth0)) != null ? stack1.locale : stack1), depth0))
    + "/settings.html\"><i class=\"fa fa-cog\"></i></a></li>\n  </ul>\n\n  </div>\n";
},"3":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "  <div class=\"header-guest\">\n    <a href=\"#\" modal-open=\"signin\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.T : depth0)) != null ? stack1.nav : stack1)) != null ? stack1.signin : stack1), depth0))
    + "</a>\n    <a href=\"#\" modal-open=\"signup\" class=\"button\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.T : depth0)) != null ? stack1.nav : stack1)) != null ? stack1.signup : stack1), depth0))
    + "</a>\n  </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, buffer = "";
  stack1 = helpers['if'].call(depth0, (depth0 != null ? depth0.loggedin : depth0), {"name":"if","hash":{},"fn":this.program(1, data),"inverse":this.program(3, data),"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"useData":true});
this["Tmpl"]["search_result"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "      <li class=\"journey-step "
    + escapeExpression(((helpers.transportIcon || (depth0 && depth0.transportIcon) || helperMissing).call(depth0, (depth0 != null ? depth0.type : depth0), {"name":"transportIcon","hash":{},"data":data})))
    + "\">\n        <h4 class=\"journey-step-title\">"
    + escapeExpression(((helpers.transportType || (depth0 && depth0.transportType) || helperMissing).call(depth0, (depth0 != null ? depth0.type : depth0), {"name":"transportType","hash":{},"data":data})))
    + " to <span class=\"place\">"
    + escapeExpression(lambda(((stack1 = (depth0 != null ? depth0.end : depth0)) != null ? stack1.description : stack1), depth0))
    + "</span></h4>\n        <div class=\"journey-step-info\">\n          "
    + escapeExpression(((helpers.time || (depth0 && depth0.time) || helperMissing).call(depth0, (depth0 != null ? depth0.departureTime : depth0), {"name":"time","hash":{},"data":data})))
    + " - "
    + escapeExpression(((helpers.time || (depth0 && depth0.time) || helperMissing).call(depth0, (depth0 != null ? depth0.arrivalTime : depth0), {"name":"time","hash":{},"data":data})))
    + "\n        </div>\n      </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda, buffer = "<section class=\"result--"
    + escapeExpression(((helpers.tripType || (depth0 && depth0.tripType) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.result : depth0)) != null ? stack1.type : stack1), {"name":"tripType","hash":{},"data":data})))
    + "\">\n  <header>\n    <i class=\"fa fa-"
    + escapeExpression(((helpers.tripTypeIcon || (depth0 && depth0.tripTypeIcon) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.result : depth0)) != null ? stack1.type : stack1), {"name":"tripTypeIcon","hash":{},"data":data})))
    + "\"></i>\n    <dl>\n      <dt>Cost</dt>\n      <dd>"
    + escapeExpression(((helpers.currency || (depth0 && depth0.currency) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.result : depth0)) != null ? stack1.price : stack1), ((stack1 = (depth0 != null ? depth0.result : depth0)) != null ? stack1.currency : stack1), {"name":"currency","hash":{},"data":data})))
    + "</dd>\n    </dl>\n    <dl>\n      <dt>Time</dt>\n      <dd>11h + night stop</dd>\n    </dl>\n  </header>\n  <ol class=\"journey\">\n";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.result : depth0)) != null ? stack1.outbound : stack1)) != null ? stack1.segments : stack1), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  buffer += "    <li class=\"journey-step appointment\">\n      <h4 class=\"journey-step-title\">Appointment with "
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.result : depth0)) != null ? stack1.outbound : stack1)) != null ? stack1.destination : stack1)) != null ? stack1.description : stack1), depth0))
    + "</h4>\n      <div class=\"journey-step-info\">\n        "
    + escapeExpression(((helpers.time || (depth0 && depth0.time) || helperMissing).call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.result : depth0)) != null ? stack1.outbound : stack1)) != null ? stack1.arrivalTime : stack1), {"name":"time","hash":{},"data":data})))
    + " - "
    + escapeExpression(((helpers.time || (depth0 && depth0.time) || helperMissing).call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.result : depth0)) != null ? stack1.outbound : stack1)) != null ? stack1.departureTime : stack1), {"name":"time","hash":{},"data":data})))
    + "\n      </div>\n    </li>\n";
  stack1 = helpers.each.call(depth0, ((stack1 = ((stack1 = (depth0 != null ? depth0.result : depth0)) != null ? stack1.inbound : stack1)) != null ? stack1.segments : stack1), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  </ol>\n  <aside>\n    <a href=\"#\" class=\"button\">Book now</a>\n    <a href=\"trip.html\" class=\"button--secondary\">Details</a>\n  </aside>\n</section>\n";
},"useData":true});
this["Tmpl"]["settings_preferences"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "checked";
  },"3":function(depth0,helpers,partials,data,depths) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "";
  stack1 = ((helpers.equal || (depth0 && depth0.equal) || helperMissing).call(depth0, (data && data.key), "priority", {"name":"equal","hash":{},"fn":this.program(4, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.equal || (depth0 && depth0.equal) || helperMissing).call(depth0, (data && data.key), "arrival", {"name":"equal","hash":{},"fn":this.program(6, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.equal || (depth0 && depth0.equal) || helperMissing).call(depth0, (data && data.key), "breakfast", {"name":"equal","hash":{},"fn":this.program(8, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.equal || (depth0 && depth0.equal) || helperMissing).call(depth0, (data && data.key), "buffer", {"name":"equal","hash":{},"fn":this.program(10, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  stack1 = ((helpers.equal || (depth0 && depth0.equal) || helperMissing).call(depth0, (data && data.key), "transfer", {"name":"equal","hash":{},"fn":this.program(12, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"4":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "      <fieldset>\n        <label for=\"\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depths[2] != null ? depths[2].T : depths[2])) != null ? stack1.settings : stack1)) != null ? stack1.preferences : stack1)) != null ? stack1.priority : stack1), depth0))
    + "</label>\n        <div class=\"value\">\n          <p>"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depths[2] != null ? depths[2].T : depths[2])) != null ? stack1.settings : stack1)) != null ? stack1.preferences : stack1)) != null ? stack1.options : stack1)) != null ? stack1.instruction : stack1), depth0))
    + "</p>\n          <ol id=\"sortable\" class=\"list--sortable\"></ol>\n        </div>\n      </fieldset>\n";
},"6":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "      <fieldset>\n        <label for=\"\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depths[2] != null ? depths[2].T : depths[2])) != null ? stack1.settings : stack1)) != null ? stack1.preferences : stack1)) != null ? stack1.arrival : stack1)) != null ? stack1.title : stack1), depth0))
    + "</label>\n        <div class=\"value\">\n            <input type=\"radio\" name=\"arrival\" id=\"arrival-morning\" value=\"0\" ";
  stack1 = ((helpers.equal || (depth0 && depth0.equal) || helperMissing).call(depth0, depth0, 0, {"name":"equal","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n            <label for=\"arrival-morning\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depths[2] != null ? depths[2].T : depths[2])) != null ? stack1.settings : stack1)) != null ? stack1.preferences : stack1)) != null ? stack1.arrival : stack1)) != null ? stack1.morning : stack1), depth0))
    + "</label>\n            <input type=\"radio\" name=\"arrival\" id=\"arrival-overnight\" value=\"1\" ";
  stack1 = ((helpers.equal || (depth0 && depth0.equal) || helperMissing).call(depth0, depth0, 1, {"name":"equal","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + ">\n            <label for=\"arrival-overnight\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depths[2] != null ? depths[2].T : depths[2])) != null ? stack1.settings : stack1)) != null ? stack1.preferences : stack1)) != null ? stack1.arrival : stack1)) != null ? stack1.overnight : stack1), depth0))
    + "</label>\n        </div>\n      </fieldset>\n";
},"8":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "      <fieldset>\n          <label for=\"\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depths[2] != null ? depths[2].T : depths[2])) != null ? stack1.settings : stack1)) != null ? stack1.preferences : stack1)) != null ? stack1.hotel : stack1), depth0))
    + "</label>\n          <div class=\"value\">\n            <input type=\"hidden\" name=\"breakfast\" value=\"0\">\n            <input type=\"checkbox\" name=\"breakfast\" value=\"1\" id=\"breakfast\" ";
  stack1 = ((helpers.equal || (depth0 && depth0.equal) || helperMissing).call(depth0, depth0, 1, {"name":"equal","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + ">\n          <label for=\"breakfast\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depths[2] != null ? depths[2].T : depths[2])) != null ? stack1.settings : stack1)) != null ? stack1.preferences : stack1)) != null ? stack1.breakfast : stack1), depth0))
    + "</label>\n        </div>\n      </fieldset>\n";
},"10":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "      <fieldset>\n          <label for=\"\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depths[2] != null ? depths[2].T : depths[2])) != null ? stack1.settings : stack1)) != null ? stack1.preferences : stack1)) != null ? stack1.buffer : stack1), depth0))
    + "</label>\n          <div class=\"value\">\n            <input type=\"text\" name=\""
    + escapeExpression(lambda((data && data.key), depth0))
    + "\" value=\""
    + escapeExpression(lambda(depth0, depth0))
    + "\" data-edit-key=\""
    + escapeExpression(lambda((data && data.key), depth0))
    + "\" />\n            <span class=\"indicator\"></span>\n          </div>\n      </fieldset>\n";
},"12":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "      <fieldset>\n        <label for=\"\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depths[2] != null ? depths[2].T : depths[2])) != null ? stack1.settings : stack1)) != null ? stack1.preferences : stack1)) != null ? stack1.transfer : stack1)) != null ? stack1.title : stack1), depth0))
    + "</label>\n        <div class=\"value\">\n             <input type=\"radio\" name=\"transfer\" id=\"transfer-short\" value=\"0\" ";
  stack1 = ((helpers.equal || (depth0 && depth0.equal) || helperMissing).call(depth0, depth0, 0, {"name":"equal","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n             <label for=\"transfer-short\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depths[2] != null ? depths[2].T : depths[2])) != null ? stack1.settings : stack1)) != null ? stack1.preferences : stack1)) != null ? stack1.transfer : stack1)) != null ? stack1['short'] : stack1), depth0))
    + "</label>\n\n             <input type=\"radio\" name=\"transfer\" id=\"transfer-medium\" value=\"1\" ";
  stack1 = ((helpers.equal || (depth0 && depth0.equal) || helperMissing).call(depth0, depth0, 1, {"name":"equal","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n             <label for=\"transfer-medium\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depths[2] != null ? depths[2].T : depths[2])) != null ? stack1.settings : stack1)) != null ? stack1.preferences : stack1)) != null ? stack1.transfer : stack1)) != null ? stack1.medium : stack1), depth0))
    + "</label>\n\n             <input type=\"radio\" name=\"transfer\" id=\"transfer-long\" value=\"2\" ";
  stack1 = ((helpers.equal || (depth0 && depth0.equal) || helperMissing).call(depth0, depth0, 2, {"name":"equal","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + ">\n             <label for=\"transfer-long\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depths[2] != null ? depths[2].T : depths[2])) != null ? stack1.settings : stack1)) != null ? stack1.preferences : stack1)) != null ? stack1.transfer : stack1)) != null ? stack1['long'] : stack1), depth0))
    + "</label>\n          </div>\n    </fieldset>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "<form id=\"settings-preferences\">\n  <fieldset class=\"hook-pref-options\">\n    <label for=\"\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.T : depth0)) != null ? stack1.settings : stack1)) != null ? stack1.preferences : stack1)) != null ? stack1.options : stack1)) != null ? stack1.title : stack1), depth0))
    + "</label>\n    <div class=\"value\">\n      <input type=\"hidden\" name=\"options_plane\" value=\"0\">\n      <input type=\"checkbox\" name=\"options_plane\" value=\"1\" id=\"cb-plane\" data-settings-key=\"options_plane\" ";
  stack1 = ((helpers.equal || (depth0 && depth0.equal) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.options_plane : stack1), 1, {"name":"equal","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n      <label for=\"cb-plane\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.T : depth0)) != null ? stack1.settings : stack1)) != null ? stack1.preferences : stack1)) != null ? stack1.options : stack1)) != null ? stack1.plane : stack1), depth0))
    + "</label>\n\n      <input type=\"hidden\" name=\"options_public\" value=\"0\">\n      <input type=\"checkbox\" name=\"options_public\" value=\"1\" id=\"cb-public\" data-settings-key=\"options_public\" ";
  stack1 = ((helpers.equal || (depth0 && depth0.equal) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.options_public : stack1), 1, {"name":"equal","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n      <label for=\"cb-public\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.T : depth0)) != null ? stack1.settings : stack1)) != null ? stack1.preferences : stack1)) != null ? stack1.options : stack1)) != null ? stack1['public'] : stack1), depth0))
    + "</label>\n\n      <input type=\"hidden\" name=\"options_taxi\" value=\"0\">\n      <input type=\"checkbox\" name=\"options_taxi\" value=\"1\" id=\"cb-taxi\" data-settings-key=\"options_taxi\" ";
  stack1 = ((helpers.equal || (depth0 && depth0.equal) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.options_taxi : stack1), 1, {"name":"equal","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n      <label for=\"cb-taxi\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.T : depth0)) != null ? stack1.settings : stack1)) != null ? stack1.preferences : stack1)) != null ? stack1.options : stack1)) != null ? stack1.taxi : stack1), depth0))
    + "</label>\n\n      <input type=\"hidden\" name=\"options_rental\" value=\"0\">\n      <input type=\"checkbox\" name=\"options_rental\" value=\"1\" id=\"cb-rental\" data-settings-key=\"options_rental\" ";
  stack1 = ((helpers.equal || (depth0 && depth0.equal) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.options_rental : stack1), 1, {"name":"equal","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  buffer += ">\n      <label for=\"cb-rental\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.T : depth0)) != null ? stack1.settings : stack1)) != null ? stack1.preferences : stack1)) != null ? stack1.options : stack1)) != null ? stack1.rental : stack1), depth0))
    + "</label>\n    </div>\n  </fieldset>\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.attributes : depth0), {"name":"each","hash":{},"fn":this.program(3, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "  <input type=\"submit\" class=\"button\" value=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.T : depth0)) != null ? stack1.settings : stack1)) != null ? stack1.preferences : stack1)) != null ? stack1.save : stack1), depth0))
    + "\" />\n</form>\n";
},"useData":true,"useDepths":true});
this["Tmpl"]["settings_privacy"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
  return "checked";
  },"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "<form id=\"settings-privacy\">\n  <fieldset>\n    <label>"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.T : depth0)) != null ? stack1.settings : stack1)) != null ? stack1.privacy : stack1)) != null ? stack1.newsletter : stack1), depth0))
    + "</label>\n    <div class=\"value\">\n      <input type=\"hidden\" name=\"newsletter\" value=\"0\">\n      <input type=\"checkbox\" name=\"newsletter\" value=\"1\" id=\"cb-newsletter\" ";
  stack1 = ((helpers.equal || (depth0 && depth0.equal) || helperMissing).call(depth0, ((stack1 = (depth0 != null ? depth0.attributes : depth0)) != null ? stack1.newsletter : stack1), 1, {"name":"equal","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + ">\n      <label for=\"cb-newsletter\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.T : depth0)) != null ? stack1.settings : stack1)) != null ? stack1.privacy : stack1)) != null ? stack1.newsletterreceive : stack1), depth0))
    + "</label>\n    </div>\n  </fieldset>\n  <input type=\"submit\" class=\"button\" value=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.T : depth0)) != null ? stack1.settings : stack1)) != null ? stack1.privacy : stack1)) != null ? stack1.save : stack1), depth0))
    + "\" />\n</form>\n";
},"useData":true});
this["Tmpl"]["settings_profile"] = Handlebars.template({"1":function(depth0,helpers,partials,data,depths) {
  var stack1, helperMissing=helpers.helperMissing, buffer = "  <fieldset>\n";
  stack1 = ((helpers.equal || (depth0 && depth0.equal) || helperMissing).call(depth0, (data && data.key), "twitter", {"name":"equal","hash":{},"fn":this.program(2, data, depths),"inverse":this.program(7, data, depths),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n  </fieldset>\n";
},"2":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, buffer = "    <label for=\"\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depths[2] != null ? depths[2].T : depths[2])) != null ? stack1.settings : stack1)) != null ? stack1.profile : stack1)) != null ? stack1.twitter : stack1)) != null ? stack1.twitter : stack1), depth0))
    + "</label>\n    <input type=\"hidden\" name=\""
    + escapeExpression(lambda((data && data.key), depth0))
    + "\" value=\""
    + escapeExpression(lambda(depth0, depth0))
    + "\">\n";
  stack1 = ((helpers.equal || (depth0 && depth0.equal) || helperMissing).call(depth0, depth0, "", {"name":"equal","hash":{},"fn":this.program(3, data, depths),"inverse":this.program(5, data, depths),"data":data}));
  if (stack1 != null) { buffer += stack1; }
  return buffer;
},"3":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, buffer = "      <a href=\"./connect/twitter\">";
  stack1 = lambda(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depths[3] != null ? depths[3].T : depths[3])) != null ? stack1.settings : stack1)) != null ? stack1.profile : stack1)) != null ? stack1.twitter : stack1)) != null ? stack1.connect : stack1), depth0);
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</a>\n";
},"5":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression;
  return "      <a href=\"//twitter.com/"
    + escapeExpression(lambda(depth0, depth0))
    + "\" target=\"_blank\">"
    + escapeExpression(lambda(depth0, depth0))
    + "</a> (<span id=\"unlink-twitter\" class=\"ttg-link\">"
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depths[3] != null ? depths[3].T : depths[3])) != null ? stack1.settings : stack1)) != null ? stack1.profile : stack1)) != null ? stack1.twitter : stack1)) != null ? stack1.unlink : stack1), depth0))
    + "</span>)\n";
},"7":function(depth0,helpers,partials,data,depths) {
  var stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, lambda=this.lambda;
  return "    <label for=\"\">"
    + escapeExpression(((helpers.key || (depth0 && depth0.key) || helperMissing).call(depth0, ((stack1 = ((stack1 = (depths[2] != null ? depths[2].T : depths[2])) != null ? stack1.settings : stack1)) != null ? stack1.profile : stack1), (data && data.key), {"name":"key","hash":{},"data":data})))
    + "</label>\n    <span class=\"value\">\n      <input type=\"text\" value=\""
    + escapeExpression(lambda(depth0, depth0))
    + "\" name=\""
    + escapeExpression(lambda((data && data.key), depth0))
    + "\" data-edit-key=\""
    + escapeExpression(lambda((data && data.key), depth0))
    + "\" />\n      <span class=\"indicator\"></span>\n    </span>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,depths) {
  var stack1, lambda=this.lambda, escapeExpression=this.escapeExpression, buffer = "<form id=\"settings-profile\">\n";
  stack1 = helpers.each.call(depth0, (depth0 != null ? depth0.attributes : depth0), {"name":"each","hash":{},"fn":this.program(1, data, depths),"inverse":this.noop,"data":data});
  if (stack1 != null) { buffer += stack1; }
  return buffer + "<input type=\"submit\" class=\"button\" value=\""
    + escapeExpression(lambda(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.T : depth0)) != null ? stack1.settings : stack1)) != null ? stack1.profile : stack1)) != null ? stack1.save : stack1), depth0))
    + "\" />\n</form>\n";
},"useData":true,"useDepths":true});