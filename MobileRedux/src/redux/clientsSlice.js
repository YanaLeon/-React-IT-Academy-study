import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  clientsMobile: [ 
  {id: 1, fam:"Иванов", im:"Иван", otch:"Иванович", balance:200}, 
  {id: 2, fam:"Сидоров", im:"Сидор", otch:"Сидорович", balance:250}, 
  {id: 3, fam:"Петров", im:"Пётр", otch:"Петрович", balance:180},
  {id: 4, fam:"Григорьев", im:"Григорий", otch:"Григорьевич", balance:-220},
]};

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {

    clientDelete: (state,action) => {
      state.clientsMobile = state.clientsMobile.filter(client => {
        return client.id !== action.payload;
      });
    },

    clientChange: (state,action) => {
      state = state.clientsMobile.forEach(client => {
        if(client.id === action.payload.id) {
          client.fam = action.payload.fam;
          client.im = action.payload.im;
          client.otch = action.payload.otch;
          client.balance = action.payload.balance;
        }
      });
    },

    clientAdd: (state,action) => {
      let min = state.clientsMobile[0].id;
      let max = min;
      for (let i = 1; i < state.clientsMobile.length; ++i) {
            if (state.clientsMobile[i].id > max) {
              max = state.clientsMobile[i].id;
            }
            if (state.clientsMobile[i].id < min) {
              min = state.clientsMobile[i].id
            };
      }
      console.log(max)
      state = state.clientsMobile.push({id: max + 1, fam: action.payload.fam, 
      im: action.payload.im, otch: action.payload.otch, balance: action.payload.balance})
    }

  },
});

export const { clientDelete, clientChange, clientAdd } = clientsSlice.actions;

export default clientsSlice.reducer;
