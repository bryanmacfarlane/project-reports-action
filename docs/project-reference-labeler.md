# project-reference-labeler

For a board, follows issue references (url, mention) in a work checklist and adds labels to the target issue.

A label will be added for the column the epic is in on the epic board and another label is added for the issue that is referencing the work in a checklist.

As an example, the [sample epic](https://github.com/bryanmacfarlane/sample-reports/projects/2) has initiatives like Papercuts and Reliability. Each with epics. Each epic has work checklist that mentions features. After processing, the [features on the feature board](https://github.com/bryanmacfarlane/sample-reports/projects/1) have a (`>`) label for the initiative (column) it belongs to and a (`>>`) label for the epic that it belongs to.

This allows you to filter items on the board easily by clicking on an initiative or epic label. [example](https://github.com/bryanmacfarlane/sample-reports/projects/1?card_filter_query=label%3A%22%3E+Papercuts%22)

This also allows you to generate reports like the [project-groupby-status](./project-groupby-status.md) to group by initiatives, epics or any labeling scheme.

## Config Options

The config values below are optional with the values shown being the defaults if not supplied.

```yaml
processing:
..
  - name: project-reference-labeler
    target: "epic-board"
    config:
      process-with-label: 'Feature'
      column-label-prefix': '> '
      linked-label-prefix': '>> '
      label-color': 'FFFFFF'
      skip-columns': ['Done', 'Complete']
```

### target

The name of the target board to process which is part of your targets configuration

### process-with-label

Add labels to the target issue from the checklist if it has this label. This typically means only add labels if the mentioned issue in an epic is a feature.

**Default**: `Feature`

### column-label-prefix

Prefix column labels with this. Note that the space after the example symbol is signficant so you can group reporting by > and not match >>.

**Default**:

```yaml
column-label-prefix': '> '
```

### linked-label-prefix

Prefix linked labels with this. Note that the space after the example symbol is signficant.

**Default**:

```yaml
linked-label-prefix': '>> '
```

### label-color

The color of the label created. Do not put a `#` in front of the color value.

**Default**: FFFFFF

### skip-columns

Do not process these columns.

**Default**: ['Done', 'Complete']
