const Redmine = require('node-redmine');
const csv = require('csvtojson');
const moment = require('moment');

// protocol required in Hostname, supports both HTTP and HTTPS
const hostname = process.env.REDMINE_HOST;
const config = {
  apiKey: process.env.REDMINE_APIKEY
};

/**
 * Showing time entries by issue_id
 */
Redmine.prototype.get_time_entries_by_issue_id = function(issueId, callback) {
  this.request('GET', `/time_entries.json?issue_id=${issueId}`, {}, callback);
};

const redmine = new Redmine(hostname, config);

(async () => {
  // rte path/to/file.csv
  const entries = await csv().fromFile(process.argv[2]);
  console.log('Creating entries...');

  for (let entry of entries) {
    console.log(`Time entry for issue #${entry.issue_id}`);
    const start = moment(`${entry.spent_on} ${entry.start_time}`);
    const end = moment(`${entry.spent_on} ${entry.end_time}`);
    const hours = end.diff(start, 'minutes') / 60;
    entry.hours = hours.toFixed(2);

    await new Promise((resolve, reject) => {
      redmine.create_time_entry({ time_entry: entry }, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
  console.log('Done!');
})();
