export const ROUTE_PATHS = { 

   products: 'products', // страница для справочника товаров 
    
   individuals: 'individuals', // страница для справочника физ. лиц 
    
   organizations: 'organizations', // страница для справочника организаций 

   clas: 'clas',

   marks: 'marks',
    
  proxy: { 
    
    list: 'proxy',// страница списка документов доверенность 
    
    proxy: 'proxy/:id',
    
    create: 'proxy/create',// страница конкретного документа доверенности со списком товаров  
    
   },
   
   doc: { 
    
      list: 'doc',// страница списка документов доверенность 
      
      doc: 'doc/:id',

      create: 'doc/create', // страница конкретного документа доверенности со списком товаров  
      
     }, 
    
      create: 'create', // страница записи документа доверенности 
    
 } 