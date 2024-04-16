const {constants}=require('../Constants')

const errorhandler = (err,req,res,next)=>{

    const statuscode= res.statuscode ? res.statuscode:500;
    switch(statuscode){
        case 400:
            res.json({
                title:"validation failed",
                message:err.message,
                stackTrace:err.stack,
            });
            break;
            case constants.NOT_FOUND:
                res.json({
                    title:"Not found",
                    message:err.message,
                    stackTrace:err.stack,
                });
            
             break;
            case constants.NOT_FOUND:
                res.json({
                    title:"Not found",
                    message:err.message,
                    stackTrace:err.stack,
                });

                case constants.UNAUTHERIZED:
                    res.json({
                        title:"un autherized",
                        message:err.message,
                        stackTrace:err.stack,
                    });
        
        
                    case constants.FORBIDDEN:
                        res.json({
                            title:"Forbidden",
                            message:err.message,
                            stackTrace:err.stack,
                        });

                        case constants.SERVER_ERROR:
                            res.json({
                                title:"server Error",
                                message:err.message,
                                stackTrace:err.stack,
                            });
            default:
                console.log("no error , all good")
                break;
    }
res.json({title:"not found",message:err.message,stackTrace:err.stack});

}

module.exports= errorhandler