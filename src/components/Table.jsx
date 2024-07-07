import { useMemo, useContext } from 'react';
import {
   MaterialReactTable,
   createMRTColumnHelper,
   useMaterialReactTable,
} from 'material-react-table';
import { Box, Button, Typography } from '@mui/material';
import FileDownLoadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import { TicketContext } from '../context/ticketContext';

const Table = () => {
   const { listadoTicket } = useContext(TicketContext);
   const data = listadoTicket;
   const columns = useMemo(
      () => [
         { accessorKey: 'id', header: 'id', size: 150 },
         { accessorKey: 'titulo', header: 'Título', size: 100 },
         { accessorKey: 'descripcion', header: 'Descripción', size: 150 },
         { accessorKey: 'tipo', header: 'Tipo', size: 50 },
         { accessorKey: 'fechaHora', header: 'Fecha', size: 50 },
         { accessorKey: 'prioridad', header: 'Prioridad', size: 20 },
         { accessorKey: 'estado', header: 'Estado', size: 20 },
      ],
      []
   );

   const handleExportRows = (rows) => {
      const doc = new jsPDF();
      const tableData = rows.map((row) => Object.values(row.original));
      const tableHeaders = columns.map((c) => c.header);
      doc.autoTable({
         head: [tableHeaders],
         body: tableData,
         styles: { haling: 'center' },
         columnStyles: {
            0: { halign: 'center' },
            1: { halign: 'center' },
            2: { halign: 'center' },
            3: { halign: 'center' },
            4: { halign: 'center' },
            5: { halign: 'center' },
         },
      });

      doc.text('Listado de tickets', 20, 11);

      doc.save('mrt-pdf-Tickets.pdf');
   };

   const table = useMaterialReactTable({
      columns,
      data,
      enableEditing: true,
      // onEditingRowSave,
      enableRowSelection: true,
      columnFilterDisplayMode: 'popover',
      paginationDisplayMode: 'pages',
      positionToolbarAlertBanner: 'bottom',
      renderTopToolbarCustomActions: ({ table }) => (
         <Box
            sx={{
               display: 'flex',
               gap: '16px',
               padding: '8px',
               flexWrap: 'wrap',
            }}
         >
            <Typography variant="h4">Listado de tickets</Typography>
            <Button
               disabled={table.getPaginationRowModel().rows.length === 0}
               onClick={() =>
                  handleExportRows(table.getPrePaginationRowModel().rows)
               }
               startIcon={<FileDownLoadIcon />}
            >
               Exportar a PDF
            </Button>
         </Box>
      ),
   });

   return <MaterialReactTable table={table} />;
};

export default Table;
