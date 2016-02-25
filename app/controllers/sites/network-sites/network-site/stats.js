import Ember from 'ember';

export default Ember.Controller.extend({
  chartStatTypes: [
    {
      title: "PON Channel Utilization", 
      activeLabel: "Active Channels", 
      otherLabel: "Standby Channels"
    },
    {
      title: "Feeder Capacity", 
      activeLabel: "Active PON Ports", 
      otherLabel: "Spare Feeder Fibers"
    },
    {
      title: "Noovis Distribution Network", 
      activeLabel: "Active Distribution Ports", 
      otherLabel: "Spare Distribution Ports"
    }
  ],

});
