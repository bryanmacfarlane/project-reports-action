# project-done

![project-done](./project-done.png)

## Config Options

The config values below are optional with the values shown being the defaults if not supplied.

```yaml
reports:
..
    sections:
      - name: "project-done"
        config:
          report-on-label: 'Feature'
          daysAgo: 7
```

### report-on-label

Filters by this label. Typically a card type like Epic.

**Default**: `Feature`
**any**: `*` is supported which represents all cards.

### daysAgo

Filters by cards **completed** (project_done_at) greater than this number of days ago. A card is completed when it reaches one of the columns mapped to the `Done` stage.

**Default**: 7
