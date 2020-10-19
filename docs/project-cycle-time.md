# project-cycle-time

Calculates the average and 80th percentile cycle time of issues moving from in-progress to done.

## Config Options

The config values below are optional with the values shown being the defaults if not supplied.

```yaml
reports:
..
    sections:
      - name: "project-cycle-time"
        config:
          report-on-label: 'Feature'
          limit: 21
          bucket-count': 4
          bucket-days': 7
          window-days': 28
      - name: "project-cycle-time"
        config:
          window-days': 7
```

### report-on-label

Filters by this label. Typically a card type like `Feature`.

**Default**: `Feature`

### limit

Flag cycle times over this number of days

**Default**: 21

### bucket-count, days and windows-days

Calculate cycle time now and then for bucket-count periods of bucket-days. For each calculation do an average and 80th percentile over a window of window-days days.

For example, with the default of 4, 7 and 28, it will show a 28th rolling 80th and average for now and the previous 4 weeks.

In the sample config above it will show two cycle time charts. The second has a rolling average equal to the default bucket-days so that will show the cycle time for items inclusive of that week. The default is 28 days since the sample size is typically low and a rolling window of 4 weeks typically shows a more realistic stable cycle time.
