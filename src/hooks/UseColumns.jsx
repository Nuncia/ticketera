import { useMemo } from 'react';

const UseColumns = (data) => {
   const columns = useMemo(
      () => [
         {
            header: 'ID',
            accessorKey: 'id',
         },
         {
            header: 'Título',
            accessorKey: 'titulo',
         },
         {
            header: 'Descripción',
            accessorKey: 'descripcion',
         },
         {
            header: 'Tipo',
            accessorKey: 'tipo',
         },
         {
            header: 'Prioridad',
            accessorKey: 'prioridad',
         },
         {
            header: 'Estado',
            accessorKey: 'estado',
         },
      ],
      []
   );
};

export default UseColumns;
