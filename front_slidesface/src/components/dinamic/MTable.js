import esLocale from 'date-fns/locale/es'
import MaterialTable from 'material-table'

const MTable = ({ title, data, columns, grouping = true, detailPanel, withPagination, withSearcher, withFiltering, withExportButton}) => {

    return (
        <MaterialTable
            // parentChildData={(row, rows) => rows.find(a => a._id === row.user)}
            size={'small'}
            title={title ? title : ''}
            data={data}
            columns={columns}
            // actions={actions}
            options={{
                // defaultGroupSort: 'desc',
                // defaultSort: 'desc',
                // selection: true,
                // actionsColumnIndex: parseInt(actionsColIndex),
                search: withSearcher,
                paging: withPagination,
                filtering: withFiltering,
                exportButton: withExportButton,
                // columnsButton: true,
                // detailPanelType: 'multiple',
                // draggable: true,
                exportAllData: true,
                sorting: true,
                columnResizable: true,
                // showTextRowsSelected: true,
                tableLayout: 'auto',
                padding: 'dense',
                grouping: grouping,
                pageSize: 3,
                // cspNonce: 'sdkjfhsdkfh'
            }}
            detailPanel={detailPanel}
            localization={{
                body: {
                    dateTimePickerLocalization: esLocale,
                    emptyDataSourceMessage: "No hay registros para mostrar",
                    filterRow: {
                        filterTooltip: 'Filtrar'
                    },
                },
                grouping: {
                    placeholder: "Arrastra los encabezados aquí para agruparlos",
                    groupedBy: 'Agrupado por:'
                },
                header: {
                    actions: 'Acciones'
                },
                pagination: {
                    labelDisplayedRows: '{from}-{to} de {count}',
                    labelRowsSelect: 'filas',
                    labelRowsPerPage: 'filas por página:',
                    firstAriaLabel: 'Primer página',
                    firstTooltip: 'Primer página',
                    previousAriaLabel: 'página anterior',
                    previousTooltip: 'página anterior',
                    nextAriaLabel: 'página siguiente',
                    nextTooltip: 'página siguiente',
                    lastAriaLabel: 'Última página',
                    lastTooltip: 'Última página'
                },
                toolbar: {
                    exportTitle: 'Exportar',
                    exportAriaLabel: 'Exportar',
                    exportName: 'Exportar como CSV',
                    searchTooltip: 'Buscar',
                    searchPlaceholder: 'Buscar'
                }
            }}

        />
    )
}

export default MTable
