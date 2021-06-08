const DateString = ({dateString}) => {
    var now= new Date(dateString);
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var date = now.getDate();
    now = new Date(year+"/"+month+"/"+date)
    now = now.toDateString();
    const style = {
        color : "#666666",
        fontFamily : "Cursive",
        fontSize : "small"
    }
    return ( 
        <div style={style}>            
            {now}            
        </div>
     );
}
 
export default DateString;