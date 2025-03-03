import {IntegerColumn, ReferenceColumn, StringColumn, Table} from "@servicenow/sdk/core"

export const x_snc_pnrbasecase_pnr = Table({
    name: "x_snc_pnrbasecase_pnr",
    label: "Passenger Name Record",
    scriptable_table: false,
    allow_web_service_access: true,
    allow_new_fields: false,
    allow_client_scripts: false,
    allow_ui_actions: false,
    extensible: false,
    actions: ["read"],
    schema: {
        number: StringColumn({
            label: "Number",
            attributes: {
                ignore_filter_on_new: true
            },
            maxLength: 40,
            default: "javascript:global.getNextObjNumberPadded();",
            read_only: true
        }),
        reference: StringColumn({
            label: "Reference",
            maxLength: 100
        }),
        queueingoffice_id: ReferenceColumn({
            label: "Queueing office id",
            maxLength: 32,
            referenceTable: "cmn_location",
            attributes: {
                encode_utf8: false
            }
        }),
        owner_office_id: ReferenceColumn({
            label: "Owner office ID",
            maxLength: 32,
            referenceTable: "cmn_location",
            attributes: {
                encode_utf8: false
            }
        }),
        version: IntegerColumn({
            label: "Version",
            maxLength: 40
        }),
        nip: IntegerColumn({
            label: "Number of passengers",
            maxLength: 40
        })
    },
    display: "number",
    index: [
        { "name": "index", "element": "owner_office_id", "unique": false },
        { "name": "index2", "element": "queueingoffice_id", "unique": false }
    ]
})