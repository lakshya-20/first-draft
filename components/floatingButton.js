import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
const FloatingButton = () => {
    return ( 
        <div>                                
            <Fab
                // mainButtonStyles={mainButtonStyles}
                // actionButtonStyles={actionButtonStyles}
                // style={style}
                icon={<i className="fa fa-plus"></i>}
                // event={event}
                alwaysShowTitle={true}
                // onClick={someFunctionForTheMainButton}
            >
            <Action data-toggle="tooltip" data-placement="right" title="Login"
                // text="About"
                // onClick={handleEmailOnClick}
            >
                <i className="fa fa-sign-in"></i>
            </Action>
            <Action data-toggle="tooltip" data-placement="left" title="About"
                // text="Login"
                // onClick={handleHelpOnClick}
            >
                <i className="fa fa-info" />
            </Action>            
            </Fab>
        </div>
     );
}
 
export default FloatingButton;