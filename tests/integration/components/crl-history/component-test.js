import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'noovis-app2-ember2/tests/helpers/ember-test-selectors';

moduleForComponent('crl-history', 'Integration | Component | crl history', {
  integration: true
});

test('it renders', function(assert) {
  let versions = [{
    user: {
      id: '1',
      email: 'user@example.com'
    },
    event_type: 'update',
    changes: {
      room: [
        'N/A',
        '456'
      ],
      updated_at: [
        '2016-05-12T22:55:15.895Z',
        '2016-05-14T21:37:22.569Z'
      ],
      notes: [
        '',
        'Follow up in 2 weeks'
      ]
    },
    cable_run: {
      ont_sn: '90EF1'
    }
  }, {
    user: {
      id: '1',
      email: 'user@example.com'
    },
    event_type: 'delete',
    changes: {
      updated_at: [
        '2016-05-12T22:55:15.895Z',
        '2016-05-14T21:37:22.569Z'
      ]
    }
  }];

  this.set('versions', versions);
  this.render(hbs`{{crl-history versions=versions}}`);

  assert.ok(this.$('.history-description').text().includes('ONT 90EF1 UPDATED'),
     'card for UPDATE change shows correct description');
  assert.ok(this.$('.history-description').text().includes('ONT undefined DELETED'),
     'card for DELETE change shows correct description');

  let diffs = this.$(testSelector('selector', 'diff-text')).text().replace(/\s+/g, ' ').trim();
  assert.ok(diffs.includes('changed from - to Follow up in 2 weeks'), 
      'shows the diffs');
});
