export const formateTimeToDDMMYYY = (lastDate) => {
    if(lastDate){

        const date=new Date(lastDate )  ;
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return date?.toLocaleDateString(undefined, options);
    }
    return ""
  };
export const formatTimeToHHMMSS = (lastDate) => {
    if(lastDate){
        const date=new Date(lastDate )  ;
        const options = { hour: '2-digit', minute: '2-digit' };
        return date?.toLocaleTimeString(undefined, options);
    }
    return ""
  };