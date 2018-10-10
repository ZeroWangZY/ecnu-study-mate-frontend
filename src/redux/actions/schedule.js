import { getMonthScheduleAPI, addScheduleAPI, updateScheduleAPI, deleteScheduleAPI } from '../../api/api'
import { setSnackText } from './app';

export const refreshSchedule = () => {
    console.log("12111212");
  return dispatch => {
    getMonthScheduleAPI().then(data => {
        console.log("33333");
    //    writeObj(data);
      dispatch(setSchedule(data));
    });
  }
}

export const addSchedule = (title, desc, start, end) => {
  return dispatch => {
    addScheduleAPI(title, desc, start, end)
      .then(res => {
        dispatch(refreshSchedule());
        dispatch(setSnackText('添加成功'));
      })
  }
}

export const updateSchedule = (id, title, desc, start, end) => {
  return dispatch => {
    updateScheduleAPI(id, title, desc, start, end)
      .then(res => {
        dispatch(refreshSchedule());
        dispatch(setSnackText('更新成功'));
      })
  }
}

export const deleteSchedule = (id) => {
  return dispatch => {
    deleteScheduleAPI(id)
      .then(res => {
        dispatch(refreshSchedule());
        dispatch(setSnackText('删除成功'));
      })
  }
}

const setSchedule = (data) => ({
  type: 'SET_SCHEDULE',
  data: data
})

function writeObj(obj){
    var description = "";
    var des2='';
    for(var i in obj){
        var property=obj[i];
        description+=i+" = "+property+"\n";
        for(var j in property){
            var a=property[j];
            des2+=j+" = " +a+"\n";
        }
        console.log(des2);
    }
    //alert(description);
    console.log(description);
}

function writeObj2(obj){
    var description = "";
    for(var i in obj){
        var property=obj[i];
        description+=i+" = "+property+"\n";
    }
    console.log(description);
}

