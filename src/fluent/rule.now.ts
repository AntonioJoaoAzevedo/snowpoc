import { BooleanColumn, ConditionsColumn, Table, TableNameColumn, StringColumn, ReferenceColumn } from '@servicenow/sdk/core'
 
export const x_snc_pnrbasecase_rule = Table({
    name: 'x_snc_pnrbasecase_rule',
    label: 'Rule',
    display: "number",
    schema: {
        condition: ConditionsColumn({
            label: 'Condition', mandatory: true,
            maxLength: 10000,
            dependent_on_field: "applies_to",
            dynamic_value_definitions: {
                type: "dependent_field",
                column_name: "applies_to"
            }
        }),
        active: BooleanColumn({
            label: 'Active',
            default: "true"
        }),
        applies_to: TableNameColumn({
            label: "Applies to",
            mandatory: true,
            maxLength: 80,
            attributes: {
                tableChoicesScript: "RuleTableFilter",
                base_start: true
            }
        }),
        number: StringColumn({
            label: "Number",
            read_only: true,
            attributes: {
                ignore_filter_on_new: true
            },
            maxLength: 40,
            default: "javascript:global.getNextObjNumberPadded();"
        }),
        assigned_to: ReferenceColumn({
            label: "Assigned to",
            attributes: {
                encode_utf8: false
            },
            mandatory: true,
            dynamic_default_value: "90d1921e5f510100a9ad2572f2b477fe",
            maxLength: 32,
            referenceTable: "sys_user",
            default: "javascript:gs.getUserID()"
        }),
        short_description: StringColumn({
            label: "Short description",
            maxLength: 100
        })
    },
    auto_number: {
        prefix: 'RULE',
        number: 100,
        number_of_digits: 9
    },
    index: [
        { "name": "index", "element": "assigned_to", "unique": false }
    ]
})
 