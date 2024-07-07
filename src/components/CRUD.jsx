import { useContext, useMemo, useState } from 'react';
import {
   MRT_EditActionButtons,
   MaterialReactTable,
   createMRTColumnHelper,
   // createRow,
   useMaterialReactTable,
} from 'material-react-table';
import {
   Box,
   Button,
   DialogActions,
   DialogContent,
   DialogTitle,
   IconButton,
   Tooltip,
} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { jsPDF } from 'jspdf'; //or use your library of choice here
import autoTable from 'jspdf-autotable';
import {
   QueryClient,
   QueryClientProvider,
   useMutation,
   useQuery,
   useQueryClient,
} from '@tanstack/react-query';
// import { fakeData, usStates } from './makeData';
import { TicketContext } from '../context/ticketContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Example = () => {
   const usEstados = ['abierto', 'cerrado', 'pendiente'];
   const usPrioridad = ['baja', 'media', 'alta'];
   const usTipos = ['tecnico', 'funcional'];
   const [validationErrors, setValidationErrors] = useState({});
   const { listadoTicket } = useContext(TicketContext);

   const collumnHelper = createMRTColumnHelper();

   const columns = useMemo(
      () => [
         {
            accessorKey: 'id',
            header: 'Id',
            enableEditing: false,
            size: 80,
         },
         {
            accessorKey: 'titulo',
            header: 'Título',
            muiEditTextFieldProps: {
               required: true,
               error: !!validationErrors?.titulo,
               helperText: validationErrors?.titulo,
               //remove any previous validation errors when ticket focuses on the input
               onFocus: () =>
                  setValidationErrors({
                     ...validationErrors,
                     titulo: undefined,
                  }),
               //optionally add validation checking for onBlur or onChange
            },
         },
         {
            accessorKey: 'descripcion',
            header: 'Descripcion',
            muiEditTextFieldProps: {
               required: true,
               error: !!validationErrors?.descripcion,
               helperText: validationErrors?.descripcion,
               //remove any previous validation errors when ticket focuses on the input
               onFocus: () =>
                  setValidationErrors({
                     ...validationErrors,
                     descripcion: undefined,
                  }),
            },
         },
         {
            accessorKey: 'tipo',
            header: 'Tipo',
            editVariant: 'select',
            editSelectOptions: usTipos,
            muiEditTextFieldProps: {
               type: 'text',
               required: true,
               error: !!validationErrors?.tipo,
               helperText: validationErrors?.tipo,
               //remove any previous validation errors when ticket focuses on the input
               onFocus: () =>
                  setValidationErrors({
                     ...validationErrors,
                     tipo: undefined,
                  }),
            },
         },
         {
            accessorKey: 'prioridad',
            header: 'Prioridad',
            editVariant: 'select',
            editSelectOptions: usPrioridad,
            muiEditTextFieldProps: {
               select: true,
               error: !!validationErrors?.prioridad,
               helperText: validationErrors?.prioridad,
            },
         },
         {
            accessorKey: 'estado',
            header: 'Estado',
            editVariant: 'select',
            editSelectOptions: usEstados,
            muiEditTextFieldProps: {
               select: true,
               error: !!validationErrors?.estado,
               helperText: validationErrors?.estado,
            },
         },
      ],
      [validationErrors]
   );

   const handleExportRows = (rows) => {
      const doc = new jsPDF();
      const tableData = rows.map((row) => Object.values(row.original));
      const tableHeaders = columns.map((c) => c.header);

      autoTable(doc, {
         head: [tableHeaders],
         body: tableData,
      });

      doc.save('mrt-pdf-example.pdf');
   };

   //call CREATE hook
   const { mutateAsync: createTicket, isPending: isCreatingTicket } =
      useCreateTicket();
   //call READ hook
   const {
      data: fetchedTicket = [],
      // isError: isLoadingTicketsError,
      // isFetching: isFetchingTickets,
      isLoading: isLoadingTickets,
   } = useGetTickets();
   //call UPDATE hook
   const { mutateAsync: updateTicket, isPending: isUpdatingTicket } =
      useUpdateTicket();
   //call DELETE hook
   const { mutateAsync: deleteTicket, isPending: isDeletingTicket } =
      useDeleteTicket();

   //CREATE action
   const handleCreateTicket = async ({ values, table }) => {
      const newValidationErrors = validateTicket(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
         setValidationErrors(newValidationErrors);
         return;
      }
      setValidationErrors({});
      await createTicket(values);
      table.setCreatingRow(null); //exit creating mode
   };

   //UPDATE action
   const handleSaveTicket = async ({ values, table }) => {
      const newValidationErrors = validateTicket(values);
      if (Object.values(newValidationErrors).some((error) => error)) {
         setValidationErrors(newValidationErrors);
         return;
      }
      setValidationErrors({});
      await updateTicket(values);
      table.setEditingRow(null); //exit editing mode
   };

   //DELETE action
   const openDeleteConfirmModal = (row) => {
      if (window.confirm('Are you sure you want to delete this ticket?')) {
         deleteTicket(row.original.id);
      }
   };

   const table = useMaterialReactTable({
      columns,
      data: listadoTicket,
      enableRowSelection: true,
      columnFilterDisplayMode: 'popover',
      paginationDisplayMode: 'pages',
      positionToolbarAlertBanner: 'bottom',
      createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
      editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
      enableEditing: true,
      getRowId: (row) => row.id,
      // muiToolbarAlertBannerProps: isLoadingTicketError
      //    ? {
      //         color: 'error',
      //         children: 'Error loading data',
      //      }
      //    : undefined,
      muiTableContainerProps: {
         sx: {
            minHeight: '500px',
         },
      },
      onCreatingRowCancel: () => setValidationErrors({}),
      onCreatingRowSave: handleCreateTicket,
      onEditingRowCancel: () => setValidationErrors({}),
      onEditingRowSave: handleSaveTicket,
      //optionally customize modal content
      renderCreateRowDialogContent: ({
         table,
         row,
         internalEditComponents,
      }) => (
         <>
            <DialogTitle variant="h3">Create New Ticket</DialogTitle>
            <DialogContent
               sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
            >
               {internalEditComponents}{' '}
               {/* or render custom edit components here */}
            </DialogContent>
            <DialogActions>
               <MRT_EditActionButtons variant="text" table={table} row={row} />
            </DialogActions>
         </>
      ),
      //optionally customize modal content
      renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
         <>
            <DialogTitle variant="h3">Editar Ticket</DialogTitle>
            <DialogContent
               sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
               {internalEditComponents}{' '}
               {/* or render custom edit components here */}
            </DialogContent>
            <DialogActions>
               <MRT_EditActionButtons variant="text" table={table} row={row} />
            </DialogActions>
         </>
      ),
      renderRowActions: ({ row, table }) => (
         <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip title="Edit">
               <IconButton onClick={() => table.setEditingRow(row)}>
                  <EditIcon />
               </IconButton>
            </Tooltip>
            {/* <Tooltip title="Delete">
               <IconButton
                  color="error"
                  onClick={() => openDeleteConfirmModal(row)}
               >
                  <DeleteIcon />
               </IconButton>
            </Tooltip> */}
         </Box>
      ),
      renderTopToolbarCustomActions: ({ table }) => (
         <>
            <h1 className="text-3xl pb-10">Listado de tickets</h1>
            <Button
               disabled={table.getPrePaginationRowModel().rows.length === 0}
               //export all rows, including from the next page, (still respects filtering and sorting)
               onClick={() =>
                  handleExportRows(table.getPrePaginationRowModel().rows)
               }
               startIcon={<FileDownloadIcon />}
            >
               Export All Rows
            </Button>
         </>
      ),
      state: {
         isLoading: isLoadingTickets,
         isSaving: isCreatingTicket || isUpdatingTicket || isDeletingTicket,
         // showAlertBanner: isLoadingTicketsError,
         // showProgressBars: isFetchingTicket,
      },
   });

   return <MaterialReactTable table={table} />;
};

//CREATE hook (post new ticket to api)
function useCreateTicket() {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: async (ticket) => {
         //send api update request here
         await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
         return Promise.resolve();
      },
      //client side optimistic update
      onMutate: (newTicketInfo) => {
         queryClient.setQueryData(['ticket'], (prevTicket) => [
            ...prevTicket,
            {
               ...newTicketInfo,
               id: (Math.random() + 1).toString(36).substring(7),
            },
         ]);
      },
      // onSettled: () => queryClient.invalidateQueries({ queryKey: ['tickets'] }), //refetch tickets after mutation, disabled for demo
   });
}

//READ hook (get tickets from api)
function useGetTickets() {
   return useQuery({
      queryKey: ['ticket'],
      queryFn: async () => {
         //send api request here
         await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
         return Promise.resolve(listadoTicket);
      },
      refetchOnWindowFocus: false,
   });
}

//UPDATE hook (put ticket in api)
function useUpdateTicket() {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: async (ticket) => {
         //send api update request here
         await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
         return Promise.resolve();
      },
      //client side optimistic update
      onMutate: (newTicketInfo) => {
         queryClient.setQueryData(['ticket'], (prevTickets) =>
            prevTickets?.map((prevTicket) =>
               prevTicket.id === newTicketInfo.id ? newTicketInfo : prevTicket
            )
         );
      },
      // onSettled: () => queryClient.invalidateQueries({ queryKey: ['tickets'] }), //refetch tickets after mutation, disabled for demo
   });
}

//DELETE hook (delete ticket in api)
function useDeleteTicket() {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: async (Id) => {
         //send api update request here
         await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
         return Promise.resolve();
      },
      //client side optimistic update
      onMutate: (Id) => {
         queryClient.setQueryData(['Tickets'], (prevTickets) =>
            prevTickets?.filter((ticket) => ticket.id !== ticketId)
         );
      },
      // onSettled: () => queryClient.invalidateQueries({ queryKey: ['tickets'] }), //refetch tickets after mutation, disabled for demo
   });
}

const queryClient = new QueryClient();

const ExampleWithProviders = () => (
   //Put this with your other react-query providers near root of your app
   <QueryClientProvider client={queryClient}>
      <Example />
   </QueryClientProvider>
);

export default ExampleWithProviders;

const validateRequired = (value) => !!value.length;
// const validateEmail = (email) =>
//    !!email.length &&
//    email
//       .toLowerCase()
//       .match(
//          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//       );

function validateTicket(ticket) {
   return {
      titulo: !validateRequired(ticket.titulo) ? 'Título es requerido' : '',
      descripcion: !validateRequired(ticket.descripcion)
         ? 'Descripción es requerido'
         : '',
      tipo: !validateRequired(ticket.tipo) ? 'Tipo es requerido' : '',
      prioridad: !validateRequired(ticket.prioridad)
         ? 'Prioridad es requerido'
         : '',
   };
}
