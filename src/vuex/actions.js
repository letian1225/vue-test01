import {controls} from '../api/api';

export const GetControlsList = ({
  commit
}) => {
  return new Promise((resolve) => {
    controls().then((res) => {
      commit('SET_CONTROLS', res.data);
      console.log(res)
      resolve();

    })
  })
}