export default function() {
  this.transition(
    this.fromValue('pon-channel'),
    this.toValue('feeder-capacity'),
    this.use('toLeft', { duration: 500 }),
    this.reverse('toRight', { duration: 500 })
  );

  this.transition(
    this.fromValue('feeder-capacity'),
    this.toValue('distribution-network'),
    this.use('toLeft', { duration: 500 }),
    this.reverse('toRight', { duration: 500 })
  );

  this.transition(
    this.fromValue('pon-channel'),
    this.toValue('distribution-network'),
    this.use('toRight', { duration: 500 }),
    this.reverse('toLeft', { duration: 500 })
  );
}
