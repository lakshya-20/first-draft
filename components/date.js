const DateString = ({dateString}) => {
    var now= new Date(dateString);
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var date = now.getDate();
    now = new Date(year+"/"+month+"/"+date)
    now = now.toDateString();
    return ( 
        <div>            
            {now}            
        </div>
     );
}
 
export default DateString;