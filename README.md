# redmine time entries

Tiny helper to register you work on Redmine using a CSV file.

# install

```
$ npm install -g git+https://git@github.com/codiumsa/rte.git
```

# configuration

Set the following env variables:

```
export REDMINE_HOST=http://redmine.example.com
export REDMINE_APIKEY=<your token>
```

Check [here](http://www.redmine.org/boards/2/topics/53956) for how to get your token.

# CSV file

Your CSV file should have the following format

```
issue_id,spent_on,start_time,end_time,activity_id,comments
1830,2018-08-30,18:30,20:25,9,"started working"
1830,2018-08-30,20:30,21:05,9,"some progress, beer time"
```

* **issue_id:** the issue id to log time on
* **spent_on:** the date the time was spent
* **start_time:** the time you started working on the issue
* **end_time:** the time you finished or stopped working on the issue

More info [here](http://www.redmine.org/projects/redmine/wiki/Rest_TimeEntries#Creating-a-time-entry)

# run

```
$ rte /path/to/data.csv
```

# License

MIT