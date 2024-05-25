import { number } from 'prop-types';
import create from 'zustand';


const useStore = create((set) => ({
    id:null,
    items:[],
    openModal: false,
    total: 0 ,
    totalCount:0,
    basketOpen:true,
    setBackMyCount: (id) => set((state) => ({
      items: state.items.map(item =>
        item.id === id ? { ...item, myCount: 1 } : item
      )
    })),
    setBakerOpen:(data)=> set(()=>({ basketOpen:data })),
    calculateTotalCount: () => set((state) => ({
        totalCount: state.items.reduce((total, item) => total + Number(item.count), 0)
    })),
    totalCalc: () => set((state) => ({...state,total: state.items?.reduce((total, item) => total + Number(item.price), 0)})),      
    setIsOpen: (status) => set(() => ({ openModal: status })),
      addItem: (data) => set((state) => {
        const existingItem = state.items.find(item => item.id === data.id);
    
        if (existingItem) {
          // Öğenin zaten mevcut olduğunu belirten bir işlem yapabilirsiniz
          // Örneğin, öğenin sayısını artırabilirsiniz
          return {
            items: state.items.map(item =>
              item.id === data.id
                ? { ...item,price: Number(item.price) + Number(data.price), count: item.count + 1,myCount:item.myCount + 1 ,status:false }
                : item
            ),
          };
        } else {
          // Öğe mevcut değilse, yeni öğeyi ekleyin
          return {
            items: [...state.items, { id: data.id, img: data.image, title: data.title, price: data.price, count: 1, myCount:1 }],
          };
        }
      }),
      deleteItem:(id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      changeStatus: (id) => set((state) => ({
        items: state.items.map(item => 
          item.id === id ? { ...item, status: !item.status } : item
        )
      })), 
      inc: (id,price) => set((state) => ({
        items: state.items.map(item =>
          item.id === id
            ? { ...item, price: Number(item.price) + Number(price / item.count ), count: item.count + 1,myCount:item.count+1 }
            : item
        ),
      })),
      dec: (id, price) => set((state) => ({
        items: state.items.map(item =>
          item.id === id
            ? { 
                ...item, 
                myCount: item.myCount !== 0 ? item.myCount - 1 : 0,
                price: item.count > 1 ? Number(item.price) - Number(price / item.count) : item.price,
                count: item.count > 1 ? item.count - 1 : 1 // Eğer count 1'den büyükse, azalt, değilse 1 olarak tut
              }
            : item
        ),
      })),
    getElementId: (data) => set(() => ({ id:data }))
}))



export default useStore;
