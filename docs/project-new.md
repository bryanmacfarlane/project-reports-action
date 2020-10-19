# project-new

![project-new](./project-new.png)

## Config Options

The config values below are optional with the values shown being the defaults if not supplied.

```yaml
reports:
..
    sections:
      - name: "project-new"
        config:
          report-on-label: 'Feature'
          daysAgo: 7
```

### report-on-label

Filters by this label. Typically a card type like Epic.

**Default**: `Feature`
**any**: `*` is supported which represents all cards.

### daysAgo

Filters by cards **added** (project_added_at) greater than this number of days ago

**Default**: 7
